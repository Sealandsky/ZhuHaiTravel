import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const checkins = await getCollection("checkins");
  const sorted = checkins.sort((a, b) => b.data.date.localeCompare(a.data.date));

  return rss({
    title: "Peng Zheng · Check-ins",
    description: "Self-updating living website check-in timeline",
    site: context.site || "https://www.pengzhe.ng",
    items: sorted.map((entry) => ({
      title: `Last seen at ${entry.data.place} (${entry.data.cityEn})`,
      pubDate: new Date(entry.data.date),
      description: `Checked in at ${entry.data.place} in ${entry.data.cityEn}.`,
      link: `/cn`,
    })),
  });
}
