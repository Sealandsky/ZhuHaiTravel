/**
 * @file diorama-svg.js
 * @description 粘土 3D 微縮建築 SVG 矢量預設生成器
 * 當未配置圖片或圖片載入異常時提供無損純代碼降級渲染
 */

function renderZhuhaiOperaSVG(isNight) {
  const baseOuter = isNight ? "#1e2026" : "#4a4d52";
  const plaza = isNight ? "#5d5a54" : "#d8d5ce";
  const shell = isNight ? "#9a9da3" : "#e8e8e6";
  const glass = isNight ? "#f5c26b" : "#89a3b2";
  return `
    <svg viewBox="0 0 300 230" width="300" height="230" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="150" cy="158" rx="126" ry="52" fill="${baseOuter}" />
      <ellipse cx="150" cy="152" rx="120" ry="48" fill="${plaza}" />
      <!-- 小貝 (Moon Shell) -->
      <path d="M78 140 C68 86, 94 52, 108 46 C100 78, 102 116, 108 140 Z" fill="${shell}" />
      <path d="M90 140 C90 92, 108 66, 118 66 C126 92, 124 120, 116 140 Z" fill="${glass}" />
      <path d="M108 144 C112 88, 122 54, 134 50 C146 84, 140 122, 126 144 Z" fill="${shell}" />
      <!-- 大貝 (Sun Shell) -->
      <path d="M156 148 C144 74, 178 26, 202 20 C186 64, 184 114, 190 148 Z" fill="${shell}" />
      <path d="M168 148 C168 84, 194 46, 212 46 C220 84, 214 122, 202 148 Z" fill="${glass}" />
      <path d="M192 152 C194 78, 216 32, 236 28 C256 72, 248 126, 224 152 Z" fill="${shell}" />
    </svg>`;
}

function renderClayDioramaSVG(preset, isNight) {
  if (preset === "zhuhai") return renderZhuhaiOperaSVG(isNight);
  const baseColor = isNight ? "#2b2b30" : "#e6dfd5";
  const baseRim = isNight ? "#1f1f24" : "#d0c7ba";
  const wall = isNight ? "#3b322e" : "#edd8c4";
  const roof = isNight ? "#4a2c24" : "#a85743";
  const archWin = isNight ? "#ffba49" : "#6c7d87";
  return `
    <svg viewBox="0 0 260 210" width="260" height="210" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="158" width="204" height="18" rx="9" fill="${baseColor}" stroke="${baseRim}" stroke-width="2"/>
      <rect x="52" y="54" width="156" height="106" rx="11" fill="${wall}" />
      <rect x="48" y="46" width="164" height="14" rx="7" fill="${roof}" />
      <rect x="68" y="96" width="34" height="52" rx="17" fill="${archWin}"/>
      <rect x="113" y="96" width="34" height="62" rx="17" fill="${archWin}"/>
      <rect x="158" y="96" width="34" height="52" rx="17" fill="${archWin}"/>
    </svg>`;
}
