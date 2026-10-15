/**
 * @file app.js
 * @description 核心交互邏輯與動畫控制器
 * 包含：FLIP 視圖切換無縫飛行動畫、時間軸刻度聯動、日夜亮燈模式、拖曳橫向滾動與模擬上傳抽屜
 */

let currentLang = "zh";
let currentTheme = "light";
let activeIndex = checkins.length - 1;
let isGalleryMode = true;
let isMorphing = false;

/**
 * 獲取卡片在指定日/夜狀態下的圖層內容 (圖片或降級 SVG)
 */
function getDioramaLayerContent(item, isNight) {
  if (item.dayImage && item.nightImage) {
    const src = isNight ? item.nightImage : item.dayImage;
    const fallback = src.startsWith("public/") ? src.replace(/^public\//, "") : "public/" + src.replace(/^\//, "");
    return `<img class="diorama-photo" src="${src}" alt="${item.place} ${isNight ? 'Night' : 'Day'}" onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src='${fallback}';}" />`;
  }
  return renderClayDioramaSVG(item.preset, isNight);
}

/**
 * 綁定圖片備用路徑重試機制
 */
function bindImgFallbacks(layerEl, initialSrc, preset, isNight) {
  const imgEl = layerEl?.querySelector("img");
  if (!imgEl || !initialSrc) return;
  const alternatives = [
    initialSrc,
    initialSrc.startsWith("public/") ? initialSrc.replace(/^public\//, "/") : "public/" + initialSrc.replace(/^\//, ""),
    initialSrc.replace(/^public\//, ""),
    initialSrc.replace(/\.webp$/i, ".png"),
    initialSrc.replace(/\.webp$/i, ".jpeg")
  ].filter((val, idx, arr) => arr.indexOf(val) === idx);
  let attempt = 0;
  imgEl.onerror = () => {
    attempt++;
    if (attempt < alternatives.length) {
      imgEl.src = alternatives[attempt];
    } else {
      layerEl.innerHTML = renderClayDioramaSVG(preset, isNight);
    }
  };
}

/**
 * 更新單體聚焦視圖下的所有文案、地圖鏈接與時間軸刻度
 */
function updateAll(crossfade = false) {
  const item = checkins[activeIndex];
  const card = document.getElementById("dioramaCard");
  const dayLayer = document.getElementById("dayLayer");
  const nightLayer = document.getElementById("nightLayer");

  const applyVisuals = () => {
    dayLayer.innerHTML = getDioramaLayerContent(item, false);
    nightLayer.innerHTML = getDioramaLayerContent(item, true);
    bindImgFallbacks(dayLayer, item.dayImage, item.preset, false);
    bindImgFallbacks(nightLayer, item.nightImage, item.preset, true);
  };

  if (crossfade) {
    card.classList.add("crossfading");
    setTimeout(() => { applyVisuals(); card.classList.remove("crossfading"); }, 150);
  } else {
    applyVisuals();
  }

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place + " " + item.cityEn)}`;

  document.getElementById("bioSection").innerHTML = currentLang === "zh"
    ? `<a href="${mapUrl}" target="_blank" rel="noopener"><strong>${item.place}</strong></a>：${item.guideZh || ""}`
    : `<a href="${mapUrl}" target="_blank" rel="noopener"><strong>${item.place}</strong></a>: ${item.guideEn || ""}`;

  const ticksEl = document.getElementById("timelineTicks");
  if (ticksEl) ticksEl.innerHTML = "";

  const details = currentLang === "zh" ? (item.guideDetailsZh || []) : (item.guideDetailsEn || []);
  const workHeading = document.getElementById("workHeading");
  if (workHeading) workHeading.textContent = currentLang === "zh" ? "遊玩指南" : "Travel Guide";

  document.getElementById("workList").innerHTML = details.map(d => {
    const isLocation = d.label === "地理位置" || d.label === "Location";
    const valueHtml = isLocation
      ? `<a href="${mapUrl}" target="_blank" rel="noopener" title="${currentLang === "zh" ? "在地圖中查看" : "View on Map"}">${d.value} ↗</a>`
      : d.value;
    return `
      <li class="work-item">
        <span class="guide-label">${d.label}</span>
        <span class="guide-value">${valueHtml}</span>
      </li>
    `;
  }).join("");

  const themeText = currentLang === "zh" ? (currentTheme === "light" ? "黑夜" : "白天") : (currentTheme === "light" ? "Night" : "Day");
  const themeLabel = document.getElementById("themeBtnLabel");
  if (themeLabel) themeLabel.textContent = themeText;
  else {
    const btn = document.getElementById("themeToggleBtn");
    if (btn) btn.textContent = themeText;
  }

  const langLabel = document.getElementById("langBtnLabel");
  if (langLabel) langLabel.textContent = currentLang === "zh" ? "EN" : "中文";

  const galleryTitle = document.getElementById("galleryTitle");
  if (galleryTitle) galleryTitle.textContent = currentLang === "zh" ? "珠海景点" : "Zhuhai Attractions";
}

/**
 * 解析景點主名稱與括號內的副標題（若有）
 */
function getPlaceNameParts(item, lang) {
  const isZh = lang === "zh";
  const explicitTitle = isZh ? item.titleZh : (item.titleEn || item.titleZh);
  const explicitSub = isZh ? item.subZh : (item.subEn ?? item.subZh);
  if (explicitTitle !== undefined) {
    return {
      title: explicitTitle,
      sub: explicitSub || ""
    };
  }
  const raw = isZh ? item.place : (item.placeEn || item.place);
  const match = (raw || "").match(/^(.*?)[（\(](.+?)[）\)](.*)$/);
  if (match) {
    return {
      title: (match[1] + match[3]).trim(),
      sub: match[2].trim()
    };
  }
  return { title: raw || "", sub: "" };
}

/**
 * 渲染全部景點宮格視圖中的所有微縮卡片列表
 */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  checkins.forEach((c, idx) => {
    const card = document.createElement("div");
    card.className = "gallery-card" + (idx === activeIndex ? " active" : "");
    card.setAttribute("data-idx", idx);
    const { title, sub } = getPlaceNameParts(c, currentLang);
    card.innerHTML = `
      <div class="gallery-diorama-wrap">
        <div class="diorama-card gallery-mini-card">
          <div class="diorama-layer day-layer">
            ${getDioramaLayerContent(c, false)}
          </div>
          <div class="diorama-layer night-layer">
            ${getDioramaLayerContent(c, true)}
          </div>
        </div>
      </div>
      <div class="gallery-card-meta">
        <div class="gallery-card-title">${title}</div>
        ${sub ? `<div class="gallery-card-sub subtitle">${sub}</div>` : ""}
      </div>
    `;

    const dLayer = card.querySelector(".gallery-mini-card .day-layer");
    const nLayer = card.querySelector(".gallery-mini-card .night-layer");
    bindImgFallbacks(dLayer, c.dayImage, c.preset, false);
    bindImgFallbacks(nLayer, c.nightImage, c.preset, true);

    card.onclick = () => {
      if (isMorphing) return;
      closeGallery(idx);
    };
    grid.appendChild(card);
  });
}

/**
 * 切換時間軸畫廊視圖 / 單體聚焦視圖
 */
function toggleTimelineGallery() {
  if (isMorphing) return;
  if (!isGalleryMode) {
    openGallery();
  } else {
    closeGallery(activeIndex);
  }
}

/**
 * 打開全部景點宮格畫廊（FLIP 連貫飛行動畫：Stage -> Mini Card）
 */
function openGallery() {
  if (isMorphing) return;
  isMorphing = true;
  isGalleryMode = true;

  const dioramaCard = document.getElementById("dioramaCard");
  const mainContainer = document.getElementById("mainContainer");
  const singleView = document.getElementById("singleViewSection");
  const galleryView = document.getElementById("galleryViewSection");
  const btnLabel = document.getElementById("timelineBtnLabel");
  const toggleBtn = document.getElementById("timelineToggleBtn");

  // 1. First: 測量當前舞台卡片在 Viewport 的幾何位置
  const firstRect = dioramaCard.getBoundingClientRect();

  // 2. 建立浮動 Morph Ghost (Stage 卡片的精確深拷貝)
  const ghost = dioramaCard.cloneNode(true);
  ghost.id = "morphGhost";
  ghost.className = "morph-ghost-card";
  ghost.style.position = "fixed";
  ghost.style.transformOrigin = "top left";
  ghost.style.margin = "0";
  ghost.style.pointerEvents = "none";
  ghost.style.zIndex = "9999";
  ghost.style.willChange = "transform";
  ghost.style.transition = "none";

  // 3. 更新按鈕狀態
  toggleBtn.classList.add("active");
  toggleBtn.setAttribute("aria-expanded", "true");
  if (btnLabel) btnLabel.textContent = currentLang === "zh" ? "返回" : "Back";

  // 4. 同步切換 DOM 佈局至畫廊視圖
  singleView.style.display = "none";
  mainContainer.classList.add("gallery-mode");
  galleryView.style.display = "flex";
  renderGallery();

  // 5. 定位當前景點卡片
  const grid = document.getElementById("galleryGrid");
  const targetCard = grid.children[activeIndex] || grid.children[0];
  const targetMini = targetCard.querySelector(".gallery-mini-card");

  targetCard.scrollIntoView({ behavior: "auto", block: "nearest" });

  // 6. Last: 測量目標卡片在最終穩定佈局中的精確幾何位置
  const lastRect = targetMini.getBoundingClientRect();
  targetMini.style.visibility = "hidden";

  // 暫時隱藏畫廊其他卡片以進行平滑交錯浮現
  Array.from(grid.children).forEach((c, idx) => {
    if (idx !== activeIndex) {
      c.style.opacity = "0";
      c.style.transform = "translateY(14px)";
      c.style.transition = "none";
    }
  });

  // 7. Invert: 將 Ghost 放置在 lastRect，並用 Transform 反轉回 firstRect 視覺起點
  ghost.style.left = `${lastRect.left}px`;
  ghost.style.top = `${lastRect.top}px`;
  ghost.style.width = `${lastRect.width}px`;
  ghost.style.height = `${lastRect.height}px`;

  const dx = firstRect.left - lastRect.left;
  const dy = firstRect.top - lastRect.top;
  const sx = firstRect.width / lastRect.width;
  const sy = firstRect.height / lastRect.height;

  ghost.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  document.body.appendChild(ghost);

  // 強制觸發重排以確保反轉 Transform 立刻生效
  ghost.getBoundingClientRect();

  // 8. Play: 啟動 GPU 加速平滑飛行插值，並交錯淡入相鄰卡片
  requestAnimationFrame(() => {
    ghost.style.transition = "transform 0.42s cubic-bezier(0.2, 0.9, 0.3, 1)";
    ghost.style.transform = "translate(0px, 0px) scale(1, 1)";

    Array.from(grid.children).forEach((c, idx) => {
      if (idx !== activeIndex) {
        const delay = 50 + Math.min(Math.abs(idx - activeIndex) * 30, 180);
        c.style.transition = `opacity 0.32s ease ${delay}ms, transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}ms`;
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      }
    });
  });

  // 9. 動畫平滑結束，無縫替換目標卡片
  setTimeout(() => {
    targetMini.style.visibility = "visible";
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    isMorphing = false;
  }, 440);
}

/**
 * 關閉全景畫廊並聚焦某個打卡點（FLIP 連貫回飛：Mini Card -> Stage）
 */
function closeGallery(targetIdx) {
  if (isMorphing) return;
  isMorphing = true;
  isGalleryMode = false;

  const dioramaCard = document.getElementById("dioramaCard");
  const mainContainer = document.getElementById("mainContainer");
  const singleView = document.getElementById("singleViewSection");
  const galleryView = document.getElementById("galleryViewSection");
  const btnLabel = document.getElementById("timelineBtnLabel");
  const toggleBtn = document.getElementById("timelineToggleBtn");
  const grid = document.getElementById("galleryGrid");

  // 1. First: 測量被點選卡片在畫廊中的精確幾何位置
  const sourceCard = grid.children[targetIdx] || grid.children[0];
  const sourceMini = sourceCard.querySelector(".gallery-mini-card");
  const firstRect = sourceMini.getBoundingClientRect();

  // 2. 建立浮動 Morph Ghost (從點擊卡片起飛)
  const ghost = sourceMini.cloneNode(true);
  ghost.id = "morphGhost";
  ghost.className = "morph-ghost-card";
  ghost.style.position = "fixed";
  ghost.style.transformOrigin = "top left";
  ghost.style.margin = "0";
  ghost.style.pointerEvents = "none";
  ghost.style.zIndex = "9999";
  ghost.style.willChange = "transform";
  ghost.style.transition = "none";

  sourceMini.style.visibility = "hidden";

  // 畫廊中其他卡片快速淡出
  Array.from(grid.children).forEach((c, idx) => {
    if (idx !== targetIdx) {
      c.style.transition = "opacity 0.18s ease, transform 0.18s ease";
      c.style.opacity = "0";
      c.style.transform = "translateY(10px)";
    }
  });

  // 3. 同步切換 DOM 佈局至單體聚焦視圖
  activeIndex = targetIdx;
  toggleBtn.classList.remove("active");
  toggleBtn.setAttribute("aria-expanded", "false");
  if (btnLabel) btnLabel.textContent = currentLang === "zh" ? "全部景點" : "All Spots";

  galleryView.style.display = "none";
  mainContainer.classList.remove("gallery-mode");
  singleView.style.display = "block";
  singleView.style.opacity = "0";

  // 更新聚焦舞台建築與相關文案
  updateAll(false);

  // 隱藏舞台卡片，等待 Ghost 飛回精確落點
  dioramaCard.style.visibility = "hidden";

  // 4. Last: 測量單體舞台卡片在最終佈局中的幾何位置
  const lastRect = dioramaCard.getBoundingClientRect();

  // 5. Invert: 將 Ghost 放置在 lastRect，並反轉回 firstRect 視覺起點
  ghost.style.left = `${lastRect.left}px`;
  ghost.style.top = `${lastRect.top}px`;
  ghost.style.width = `${lastRect.width}px`;
  ghost.style.height = `${lastRect.height}px`;

  const dx = firstRect.left - lastRect.left;
  const dy = firstRect.top - lastRect.top;
  const sx = firstRect.width / lastRect.width;
  const sy = firstRect.height / lastRect.height;

  ghost.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  document.body.appendChild(ghost);

  // 強制觸發重排
  ghost.getBoundingClientRect();

  // 6. Play: 啟動平滑回飛插值與單體視圖浮現
  requestAnimationFrame(() => {
    ghost.style.transition = "transform 0.42s cubic-bezier(0.2, 0.9, 0.3, 1)";
    ghost.style.transform = "translate(0px, 0px) scale(1, 1)";

    singleView.style.transition = "opacity 0.35s ease 0.05s";
    singleView.style.opacity = "1";
  });

  // 7. 動畫平滑結束，無縫交接給舞台卡片
  setTimeout(() => {
    dioramaCard.style.visibility = "visible";
    sourceMini.style.visibility = "visible";
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    isMorphing = false;
  }, 440);
}

/**
 * 切換深色模式 / 淺色模式
 */
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateAll(false);
}

/* ==========================================================================
   事件監聽與初始化 (Event Listeners & Init)
   ========================================================================== */
document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);
document.getElementById("dioramaStage")?.addEventListener("click", toggleTheme);
document.getElementById("timelineToggleBtn")?.addEventListener("click", toggleTimelineGallery);

document.getElementById("langToggleBtn")?.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  updateAll(false);
  if (isGalleryMode) renderGallery();
  const titleEl = document.getElementById("galleryTitle");
  if (titleEl) {
    titleEl.textContent = currentLang === "zh" ? "珠海景点" : "Zhuhai Attractions";
  }
  const btnLabel = document.getElementById("timelineBtnLabel");
  if (btnLabel) {
    btnLabel.textContent = isGalleryMode
      ? (currentLang === "zh" ? "返回" : "Back")
      : (currentLang === "zh" ? "全部景點" : "All Spots");
  }
  const hint = document.getElementById("galleryMetaHint");
  if (hint) {
    hint.querySelector("span").textContent = currentLang === "zh"
      ? "點擊任意景點查看 3D 微縮模型與遊玩介紹"
      : "Click any spot to view 3D diorama & travel guide";
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isGalleryMode) {
    closeGallery(activeIndex);
  } else if (e.key === "ArrowLeft") {
    if (!isGalleryMode && activeIndex > 0) {
      activeIndex--;
      updateAll(true);
    } else if (isGalleryMode && activeIndex > 0) {
      activeIndex--;
      renderGallery();
      const targetCard = document.getElementById("galleryGrid")?.children[activeIndex];
      targetCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  } else if (e.key === "ArrowRight") {
    if (!isGalleryMode && activeIndex < checkins.length - 1) {
      activeIndex++;
      updateAll(true);
    } else if (isGalleryMode && activeIndex < checkins.length - 1) {
      activeIndex++;
      renderGallery();
      const targetCard = document.getElementById("galleryGrid")?.children[activeIndex];
      targetCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
});

// 頁面初始化（默認展示全部景點畫廊列表）
updateAll(false);
renderGallery();
const initToggleBtn = document.getElementById("timelineToggleBtn");
const initBtnLabel = document.getElementById("timelineBtnLabel");
if (initToggleBtn) {
  initToggleBtn.classList.add("active");
  initToggleBtn.setAttribute("aria-expanded", "true");
}
if (initBtnLabel) {
  initBtnLabel.textContent = currentLang === "zh" ? "返回" : "Back";
}

