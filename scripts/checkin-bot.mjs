#!/usr/bin/env node
// scripts/checkin-bot.mjs — 自動化打卡生成腳本 (支持 Google Places API 或命令行參數直寫)
import fs from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

async function resolvePlace(query, fallbackCity = "San Francisco") {
  if (!GOOGLE_PLACES_KEY) {
    return {
      place: query,
      cityZh: fallbackCity,
      cityEn: fallbackCity,
      coordinates: { lat: 37.7749, lng: -122.4194 },
    };
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location",
    },
    body: JSON.stringify({ textQuery: query }),
  });
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) throw new Error("Google Places API 未找到對應地點: " + query);

  return {
    place: place.displayName.text,
    cityZh: place.formattedAddress,
    cityEn: place.formattedAddress,
    coordinates: {
      lat: place.location.latitude,
      lng: place.location.longitude,
    },
  };
}

async function main() {
  const placeInput = args.place || args.query || "Blue Bottle Coffee";
  const cityInput = args.city || "San Francisco";
  const preset = args.preset || "cafe";
  const friendInput = args.friend || "";

  const resolved = await resolvePlace(placeInput, cityInput);
  const now = new Date();
  const dateIso = now.toISOString().slice(0, 10);
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slug = `${dateIso}-${resolved.place.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  const companions = friendInput
    ? friendInput.split(",").map((item) => {
        const [name, url] = item.split("|");
        return { name: name.trim(), url: (url || "https://x.com").trim() };
      })
    : [];

  const record = {
    date: dateIso,
    dateZh: `${month}月${day}日`,
    dateEn: `${monthNames[now.getMonth()]} ${day}`,
    relZh: "剛剛",
    relEn: "just now",
    place: resolved.place,
    cityZh: resolved.cityZh,
    cityEn: resolved.cityEn,
    preset,
    ...(args.dayImage ? { dayImage: args.dayImage } : {}),
    ...(args.nightImage ? { nightImage: args.nightImage } : {}),
    coordinates: resolved.coordinates,
    companions,
  };

  const outDir = path.join(process.cwd(), "src/content/checkins");
  await fs.mkdir(outDir, { recursive: true });
  const targetPath = path.join(outDir, `${slug}.json`);
  await fs.writeFile(targetPath, JSON.stringify(record, null, 2) + "\n", "utf8");
  console.log(`✅ 已生成打卡記錄: ${targetPath}`);
}

main().catch((err) => {
  console.error("❌ 打卡生成失敗:", err);
  process.exit(1);
});
