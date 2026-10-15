/**
 * @file data.js
 * @description 珠海景點打卡足跡列表 (checkins)
 * 每個景點包含詳細遊玩介紹 (guideZh / guideEn) 與實用遊玩指南 (guideDetailsZh / guideDetailsEn)
 * 景點標題與副標題 (titleZh / subZh / titleEn / subEn) 分離展示
 */

const checkins = [
  {
    dateZh: "10月15日",
    dateEn: "Oct 15",
    relZh: "10月15日",
    relEn: "on Oct 15",
    place: "珠海大劇院（日月貝）",
    titleZh: "珠海大劇院",
    subZh: "日月貝",
    titleEn: "Zhuhai Grand Theater",
    subEn: "Sun & Moon Shells",
    cityEn: "Zhuhai",
    preset: "zhuhai",
    dayImage: "public/images/zhuhai-opera-day.webp",
    nightImage: "public/images/zhuhai-opera-night.webp",
    guideZh: "中國唯一建設在海島上的大劇院，坐落於野狸島海韻城畔。設計靈感源自名畫《維納斯的誕生》與名句「珠生於貝，貝生於海」，由一大一小兩座通透白色貝殼組成。白天如白玉雕塑浮於碧波之上，入夜後泛光照明流光溢彩，是情侶路騎行、觀賞海面日落與浪漫夜景的城市地標。",
    guideEn: "The only opera house in China built on an island, the Zhuhai Grand Theater is situated on Yeli Island. Inspired by 'The Birth of Venus', it features two soaring translucent white shell structures rising from the sea. Glowing with dynamic illumination at night, it is Zhuhai's crown jewel for seaside cycling, sunset viewing, and cultural performances.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費進入（劇場內需演出票）" },
      { label: "開放時間", value: "海韻城及外圍全天開放" },
      { label: "建議用時", value: "1.5 – 2 小時" },
      { label: "最佳時段", value: "18:30–21:00 日落晚霞與亮燈" },
      { label: "地理位置", value: "香洲區野狸島情侶中路" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free entry (Theatre requires show ticket)" },
      { label: "Hours", value: "All day (Outdoor & Sea World mall)" },
      { label: "Duration", value: "1.5 – 2 Hours" },
      { label: "Best Time", value: "18:30–21:00 Sunset & Illumination" },
      { label: "Location", value: "Yeli Island, Lovers' Middle Road, Xiangzhou" }
    ]
  },
  {
    dateZh: "10月16日",
    dateEn: "Oct 16",
    relZh: "10月16日",
    relEn: "on Oct 16",
    place: "珠海圓明新園（正大光明殿）",
    titleZh: "珠海圓明新園",
    subZh: "正大光明殿",
    titleEn: "New Yuanming Palace",
    subEn: "Hall of Zhengda Guangming",
    cityEn: "Zhuhai",
    preset: "park",
    dayImage: "public/images/new-yuanming-palace-day.webp",
    nightImage: "public/images/new-yuanming-palace-night.webp",
    guideZh: "坐落於石景山下，按北京圓明園被焚毀前的盛時景觀 1:1 比例匠心復建。正大光明殿作為全園中軸線上的首要正殿，飛檐翹角、金碧輝煌，前臨漢白玉金水橋與威武石獅，殿內高懸御筆匾額，周圍環抱著江南福海湖景與西洋樓石柱群，盡顯清代皇家園林的雄偉氣象。",
    guideEn: "Set at the foot of Shijing Mountain, New Yuanming Palace is a 1:1 recreation of Beijing's Old Summer Palace before its destruction. The Hall of Zhengda Guangming serves as the central throne hall along the imperial axis, featuring sweeping golden eaves, white marble bridges, and imperial lions, surrounded by scenic lakes and Baroque-style Western Pavilions.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費入園（免預約）" },
      { label: "開放時間", value: "09:00 – 17:30（17:00 停止入園）" },
      { label: "建議用時", value: "2 – 3 小時" },
      { label: "最佳時段", value: "晴天上午或午後漫步" },
      { label: "地理位置", value: "香洲區九洲大道中段蘭埔路" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free admission (No reservation needed)" },
      { label: "Hours", "value": "09:00 – 17:30 (Last entry 17:00)" },
      { label: "Duration", "value": "2 – 3 Hours" },
      { label: "Best Time", "value": "Sunny morning or afternoon walk" },
      { label: "Location", "value": "Lanpu Road, Central Jiuzhou Ave, Xiangzhou" }
    ]
  },
  {
    dateZh: "10月17日",
    dateEn: "Oct 17",
    relZh: "10月17日",
    relEn: "on Oct 17",
    place: "珠海博物館",
    titleZh: "珠海博物館",
    subZh: "",
    titleEn: "Zhuhai Museum",
    subEn: "",
    cityEn: "Zhuhai",
    preset: "park",
    dayImage: "public/images/zhuhai-museum-day.webp",
    nightImage: "public/images/zhuhai-museum-night.webp",
    guideZh: "坐落於情侶中路海天公園旁，由德國 GMP 建築事務所操刀設計，與地標「日月貝」隔海相望。館內集珠海通史、海洋紀事與嶺南傳統民俗展廳於一體，三樓全景落地玻璃窗直面香爐灣海天一色的蔚藍景緻，是了解特區文脈與拍攝海景大片的必訪文化殿堂。",
    guideEn: "Nestled along Middle Lovers' Road beside Maritime Sky Park, the Zhuhai Museum was designed by German architectural firm gmp, facing the iconic 'Sun & Moon Shells' across the bay. It features rich exhibitions on Zhuhai's maritime history, Cantonese folklore, and modern heritage, with panoramic floor-to-ceiling glass windows on the third floor framing unobstructed ocean views.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費（需公眾號提前實名預約）" },
      { label: "開放時間", value: "週二至週日 09:00–17:00（週一閉館）" },
      { label: "建議用時", value: "2 – 3 小時" },
      { label: "最佳時段", value: "午後觀海 · 3 樓落地窗海景" },
      { label: "地理位置", value: "香洲區情侶中路 33 號（海天公園旁）" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free (Real-name reservation via WeChat)" },
      { label: "Hours", value: "Tue–Sun 09:00–17:00 (Closed Mondays)" },
      { label: "Duration", value: "2 – 3 Hours" },
      { label: "Best Time", value: "Afternoon sea view on 3rd floor" },
      { label: "Location", value: "No. 33 Middle Lovers' Rd (Beside Maritime Sky Park)" }
    ]
  },
  {
    dateZh: "10月18日",
    dateEn: "Oct 18",
    relZh: "10月18日",
    relEn: "on Oct 18",
    place: "珠海漁女",
    titleZh: "珠海漁女",
    subZh: "",
    titleEn: "Zhuhai Fisher Girl",
    subEn: "",
    cityEn: "Zhuhai",
    preset: "park",
    dayImage: "public/images/zhuhai-fisher-girl-day.webp",
    nightImage: "public/images/zhuhai-fisher-girl-night.webp",
    guideZh: "珠海最負盛名的城市地標與精神象徵，佇立於風景如畫的情侶中路香爐灣畔。這座高達 8.7 米的巨型花崗岩雕塑由著名雕塑家潘鶴傾心創作，描繪了一位頸戴珍珠、身披漁網、雙手高擎璀璨明珠的美麗漁女。清晨迎著初升海日，或傍晚漫步於香爐灣沙灘遠眺雕像剪影，海風拂面、浪濤陣陣，是感受這座浪漫海濱之城浪漫氣韻的必遊之地。",
    guideEn: "The defining emblem and poetic soul of Zhuhai, standing proudly amid the waves along scenic Lovers' Middle Road in Xianglu Bay. Created by celebrated master sculptor Pan He, this 8.7-meter granite masterpiece depicts a graceful maiden draped in a fishing net, holding aloft a gleaming pearl toward the heavens. Whether admiring the sunrise across the horizon or strolling along the golden crescent beach at sunset, it offers an unforgettable encounter with the romantic essence of this coastal city.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費開放（免預約）" },
      { label: "開放時間", value: "全天開放（室外濱海景點）" },
      { label: "建議用時", value: "0.5 – 1 小時" },
      { label: "最佳時段", value: "清晨日出 / 傍晚晚霞與夜景" },
      { label: "地理位置", value: "香洲區情侶中路香爐灣畔" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free (No reservation needed)" },
      { label: "Hours", value: "Open all day (Outdoor seaside landmark)" },
      { label: "Duration", value: "0.5 – 1 Hour" },
      { label: "Best Time", value: "Sunrise / Sunset glow & evening lights" },
      { label: "Location", value: "Xianglu Bay, Lovers' Middle Road, Xiangzhou" }
    ]
  },
  {
    dateZh: "10月19日",
    dateEn: "Oct 19",
    relZh: "10月19日",
    relEn: "on Oct 19",
    place: "香山湖公園",
    titleZh: "香山湖公園",
    subZh: "",
    titleEn: "Xiangshan Lake Park",
    subEn: "",
    cityEn: "Zhuhai",
    preset: "park",
    dayImage: "public/images/xiangshan-lake-park-day.webp",
    nightImage: "public/images/xiangshan-lake-park-night.webp",
    guideZh: "坐落於鳳凰山森林公園南麓，依山傍水、步移景異，是珠海最具代表性的嶺南傳統園林與現代生態湖泊公園。古色古香的入口青瓦木廊、環湖慢行步道、曲橋水榭與黑天鵝群相映成趣。夜幕降臨後，仿古亭廊燈火闌珊，湖面波光倒影、流光溢彩，兼具自然山水之幽與江南園林之秀，是市民與遊客登山吸氧、漫步野餐的城市綠洲。",
    guideEn: "Nestled at the southern foot of Fenghuang Mountain, Xiangshan Lake Park blends classical Cantonese garden architecture with pristine lake ecology. Characterized by traditional grey-tiled pavilions, waterside boardwalks, arched stone bridges, and resident black swans gliding across the water, the park transforms after dusk as warm lanterns illuminate the wooden corridors, casting luminous reflections upon the tranquil lake.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費入園（免預約）" },
      { label: "開放時間", value: "06:00 – 22:30（全天候開放）" },
      { label: "建議用時", value: "2 – 3 小時" },
      { label: "最佳時段", value: "清晨吸氧觀鳥 / 傍晚湖畔散步賞夜景" },
      { label: "地理位置", value: "香洲區健民路健民一路交叉口西南" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free admission (No reservation needed)" },
      { label: "Hours", value: "06:00 – 22:30 (Open daily)" },
      { label: "Duration", value: "2 – 3 Hours" },
      { label: "Best Time", value: "Early morning walk / Sunset & evening lights" },
      { label: "Location", value: "Jianmin Road, Xiangzhou, Zhuhai" }
    ]
  },
  {
    dateZh: "10月20日",
    dateEn: "Oct 20",
    relZh: "10月20日",
    relEn: "on Oct 20",
    place: "愛情郵局（愛情燈塔）",
    titleZh: "愛情郵局",
    subZh: "愛情燈塔",
    titleEn: "Love Post Office",
    subEn: "Love Lighthouse",
    cityEn: "Zhuhai",
    preset: "park",
    dayImage: "public/images/love-post-office-day.webp",
    nightImage: "public/images/love-post-office-night.webp",
    guideZh: "矗立於情侶中路海濱泳場北側的礁石之畔，是一座兼具郵政文化、海濱休閒與極致浪漫氛圍的城市地標。純白漸收的歐式圓形塔身、深色拱門與頂部金黃的守望燈室，沿著懸挑的圓形親水步道延伸至海天一色之間。白天憑欄遠眺港珠澳大橋如巨龍臥波，黃昏時分晚霞漫天、潮聲陣陣，夜幕降臨後燈塔暖光如炬照亮海面，是情侶漫步、寄出浪漫明信片與海邊打卡的必遊勝地。",
    guideEn: "Standing gracefully at the edge of the coastal rocks along Lovers' Middle Road beside Haibin Beach, the Love Post Office Lighthouse is a romantic coastal landmark of Zhuhai. Featuring a tapering white European-style tower, dark archways, and a radiant beacon glowing from its crown, the lighthouse extends out onto a circular seaside promenade over the waves. By day, visitors can gaze toward the Hong Kong-Zhuhai-Macao Bridge stretching across the sea; at twilight, sunset glow washes over the shore before the warm beacon illuminates the sea, making it an essential destination for romantic strolls and coastal memories.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費參觀（免預約，戶外景點）" },
      { label: "開放時間", value: "燈塔外觀全天開放；郵局展廳 09:00 – 21:00" },
      { label: "建議用時", value: "1 – 2 小時" },
      { label: "最佳時段", value: "傍晚日落霞光（17:30–18:30）及夜間亮燈" },
      { label: "地理位置", value: "香洲區情侶中路503號海濱泳場北側" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free admission (No reservation needed)" },
      { label: "Hours", value: "Lighthouse open 24/7; Post office 09:00 – 21:00" },
      { label: "Duration", value: "1 – 2 Hours" },
      { label: "Best Time", value: "Sunset glow (17:30–18:30) & evening illumination" },
      { label: "Location", value: "No. 503 Lovers' Middle Rd (North of Haibin Beach)" }
    ]
  },
  {
    dateZh: "10月21日",
    dateEn: "Oct 21",
    relZh: "10月21日",
    relEn: "on Oct 21",
    place: "港珠澳大橋（中國結雙塔）",
    titleZh: "港珠澳大橋",
    subZh: "中國結雙塔",
    titleEn: "Hong Kong-Zhuhai-Macao Bridge",
    subEn: "Chinese Knot Towers",
    cityEn: "Zhuhai",
    preset: "bridge",
    dayImage: "public/images/hong-kong-zhuhai-macao-bridge-day.webp",
    nightImage: "public/images/hong-kong-zhuhai-macao-bridge-night.webp",
    guideZh: "橫跨伶仃洋的世紀超級工程，青州航道橋作為大橋跨度最大、主塔最高的通航斜拉橋，巍然矗立著兩座高達 163 米的 H 型巨型鋼索塔。塔頂優雅鑲嵌著重達數百噸的「中國結」互鎖鋼結構撐架，將傳統中華文化符號與現代頂尖橋樑工程力學完美交融，象徵粵港澳三地心手相連、珠聯璧合。乘船出海穿行於伶仃洋上，仰望雙索面如琴弦般於碧海藍天間舒展，夜幕降臨後流光溢彩，宛若一條璀璨游龍飛架三地，展現出無與倫比的宏偉與浪漫。",
    guideEn: "A world-class engineering marvel spanning the Lingdingyang waters, the Qingzhou Channel Bridge boasts the longest span and tallest pylons of the Hong Kong-Zhuhai-Macao Bridge, crowned by two majestic 163-meter steel towers. Embedded atop each pylon is the iconic 'Chinese Knot' steel brace, seamlessly fusing traditional cultural iconography with modern bridge engineering to symbolize unity between Hong Kong, Zhuhai, and Macao. Greeted by harp-like stay cables stretching across the azure sea by day and illuminated by luminous floodlights at night, the bridge stands as a breathtaking testament to human ingenuity and coastal elegance.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "出海觀光免簽注 / 穿梭巴士需有效簽注" },
      { label: "開放時間", value: "大橋全天通車；觀光遊船 09:00 – 19:30" },
      { label: "建議用時", value: "1.5 – 2.5 小時（遊船觀光航程）" },
      { label: "最佳時段", value: "日落黃昏（17:30–18:30）及夜間景觀亮燈" },
      { label: "地理位置", value: "珠海公路口岸 / 九洲港客運碼頭觀光航線" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "No visa for sightseeing cruise / Visa required for shuttle bus" },
      { label: "Hours", value: "Bridge open 24/7; Sightseeing cruises 09:00 – 19:30" },
      { label: "Duration", value: "1.5 – 2.5 Hours" },
      { label: "Best Time", value: "Golden sunset (17:30–18:30) & evening illumination" },
      { label: "Location", value: "Zhuhai Port / Jiuzhou Port Sightseeing Cruise Terminal" }
    ]
  },
  {
    dateZh: "10月22日",
    dateEn: "Oct 22",
    relZh: "10月22日",
    relEn: "on Oct 22",
    place: "珠海長隆度假區（巨型鯨鯊館）",
    titleZh: "珠海長隆度假區",
    subZh: "巨型鯨鯊館",
    titleEn: "Zhuhai Chimelong Resort",
    subEn: "Whale Shark Aquarium",
    cityEn: "Zhuhai",
    preset: "ocean",
    dayImage: "public/images/zhuhai-chimelong-day.webp",
    nightImage: "public/images/zhuhai-chimelong-night.webp",
    guideZh: "長隆海洋王國的地標性建築與世界頂級海洋奇觀，高達 63 米的巨型藍鯨鯊雕塑躍出藍天，成為橫琴海畔最震撼的視覺標誌。展館內部擁有榮獲多項健力士世界紀錄的超巨型水族亞克力玻璃觀賞屏，蓄水量逾兩萬噸。漫步於幽藍清澈的巨幕與拱形海底隧道下，數萬條珍稀海洋生靈悠然洄游，巨大的鯨鯊舒展雙鰭宛若深海巡禮，蝠鱝輕盈掠過頭頂，帶來彷彿置身無垠大洋深處的奇幻沉浸體驗。夜幕降臨，鯨鯊雕塑投影與璀璨的煙花幻彩大巡遊交相輝映，是珠海不可錯過的夢幻勝境。",
    guideEn: "The signature icon of Chimelong Ocean Kingdom, featuring a colossal 63-meter leaping whale shark sculpture that commands the Hengqin skyline. Housing one of the world's largest aquarium viewing acrylic panels with over 20,000 tons of water, it offers an awe-inspiring underwater realm where majestic whale sharks, manta rays, and tens of thousands of exotic marine creatures glide peacefully above. By night, spectacular projection mapping on the sculpture combines with lake fireworks to deliver an unforgettable marine fantasy.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "海洋王國全票約 ¥395 起 / 需實名預訂" },
      { label: "開放時間", value: "10:00 – 20:30（煙花秀通常 20:00）" },
      { label: "建議用時", value: "全天遊覽（約 6 – 8 小時）" },
      { label: "最佳時段", value: "午後觀賞深海餵食秀，夜間觀看海洋幻彩煙花盛典" },
      { label: "地理位置", value: "珠海市香洲區橫琴新區環島東路長隆大道" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "From approx. ¥395 / Real-name booking" },
      { label: "Hours", value: "10:00 – 20:30 (Night Fireworks at 20:00)" },
      { label: "Duration", value: "Full Day (6 – 8 Hours)" },
      { label: "Best Time", value: "Afternoon feeding show & evening fireworks finale" },
      { label: "Location", "value": "Chimelong Ave, Hengqin New District, Zhuhai" }
    ]
  },
  {
    dateZh: "10月23日",
    dateEn: "Oct 23",
    relZh: "10月23日",
    relEn: "on Oct 23",
    place: "金灣市民藝術中心（扎哈·候鳥羽翼）",
    titleZh: "金灣市民藝術中心",
    subZh: "扎哈·候鳥羽翼",
    titleEn: "Jinwan Civic Art Centre",
    subEn: "Zaha Hadid Avian Canopy",
    cityEn: "Zhuhai",
    preset: "culture",
    dayImage: "public/images/jinwan-art-centre-day.webp",
    nightImage: "public/images/jinwan-art-centre-night.webp",
    guideZh: "由世界頂級建築大師扎哈·哈迪德建築事務所傾力操刀，坐落於金灣航空新城中心湖畔，是珠海當代建築美學的顛峰之作。整座建築以珠海南飛候鳥的「人字形」飛行編隊為靈感，大膽採用輕盈起伏的鋼網格冠狀流線頂棚，將大劇院、多功能廳、科技館與藝術館四大文化場館有機串聯於湖水中央。純白色的穿孔鋁板與水晶切割般的曲面玻璃幕牆倒映在碧波蕩漾的湖面之上，宛如展翅欲飛的銀白候鳥。夜晚星空燈帶與室內暖金燈光交織亮起，如夢如幻，被譽為大灣區西岸最閃耀的文化地標。",
    guideEn: "Designed by the renowned Zaha Hadid Architects and set within the Central Lake of Jinwan Aviation New Town, this architectural icon is inspired by the chevron flight formation of migratory birds soaring across Southern China. A dynamic, undulating canopy of perforated steel and crystal glass weaves together four premier venues: the Grand Theater, Multifunctional Hall, Science Center, and Art Museum. Resembling a monumental white avian sculpture gracefully resting above azure waters, the building radiates ethereal beauty both in broad daylight and under its shimmering golden nocturnal illumination.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "公共區域免費開放 / 演出與特展需購票" },
      { label: "開放時間", value: "園區全天開放；場館 09:30 – 17:30（週一閉館）" },
      { label: "建議用時", value: "2 – 3 小時（建築打卡與展覽參觀）" },
      { label: "最佳時段", value: "傍晚 17:30 欣賞日落天光與水景燈光秀" },
      { label: "地理位置", value: "珠海市金灣區三灶鎮航空新城中心湖公園" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free public access / Tickets required for performances" },
      { label: "Hours", value: "Plaza 24/7; Venues 09:30 – 17:30 (Closed Mondays)" },
      { label: "Duration", value: "2 – 3 Hours" },
      { label: "Best Time", value: "Sunset (17:30) for architectural reflections and night illumination" },
      { label: "Location", value: "Central Lake Park, Aviation New Town, Jinwan, Zhuhai" }
    ]
  },
  {
    dateZh: "10月24日",
    dateEn: "Oct 24",
    relZh: "10月24日",
    relEn: "on Oct 24",
    place: "景山公園（景山索道與峰頂觀景台）",
    titleZh: "景山公園",
    subZh: "景山索道與峰頂觀景台",
    titleEn: "Jingshan Park",
    subEn: "Scenic Cableway & Summit Pavilion",
    cityEn: "Zhuhai",
    preset: "mountain",
    dayImage: "public/images/jingshan-park-day.webp",
    nightImage: "public/images/jingshan-park-night.webp",
    guideZh: "依傍情侶中路、聳立於香爐灣畔的城市制高點，景山公園將翠綠的山林野趣與浩瀚海景無縫融合。乘坐標誌性的亮黃色復古纜車緩緩穿過青翠林海直達峰頂，眼前豁然開朗：香爐灣沙灘的優美弧線、情侶路如帶延伸、珠海大劇院日月貝與遠處橫跨伶仃洋的港珠澳大橋盡收眼底。峰頂觀景閣設有 360 度全景觀景台與觀鳥望遠鏡，下山更可體驗驚險刺激的山地衝鋒車，沿著千米不銹鋼滑道風馳電掣穿越山間密林，是俯瞰珠海「山、海、城」一體壯麗全景的最佳打卡地標。",
    guideEn: "Perched majestically beside Lovers' Road and Xianglu Bay, Jingshan Park is the prime mountain vantage point embracing Zhuhai's urban panorama and sea vistas. Ascend the lush hillside via the iconic bright-yellow vintage cableway gondolas to the summit observation terrace. From the top, gaze upon Xianglu Bay's golden crescent, the Sun & Moon Shell theater, and the sprawling Hong Kong-Zhuhai-Macao Bridge. For the descent, embark on the thrilling alpine toboggan slide that swoops down through verdant subtropical forest paths.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "公園免費入園 / 索道滑道套票約 ¥75–¥90" },
      { label: "開放時間", value: "公園 06:00 – 22:00；索道 09:00 – 17:30" },
      { label: "建議用時", value: "1.5 – 2.5 小時（纜車登頂與俯瞰全景）" },
      { label: "最佳時段", value: "清晨晴朗遠眺海灣，或下午 16:30 觀日落晚霞" },
      { label: "地理位置", value: "珠海市香洲區吉大街道海濱北路景山公園" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Park entry free / Cableway & Toboggan combo ~¥75–¥90" },
      { label: "Hours", value: "Park 06:00 – 22:00; Cableway 09:00 – 17:30" },
      { label: "Duration", value: "1.5 – 2.5 Hours" },
      { label: "Best Time", value: "Clear morning for bay views, or 16:30 for sunset glow" },
      { label: "Location", value: "Haibin North Road, Jida, Xiangzhou, Zhuhai" }
    ]
  },
  {
    dateZh: "10月25日",
    dateEn: "Oct 25",
    relZh: "10月25日",
    relEn: "on Oct 25",
    place: "珠海城市陽台（香爐灣退台觀景台）",
    titleZh: "珠海城市陽台",
    subZh: "香爐灣退台觀景台",
    titleEn: "Zhuhai City Balcony",
    subEn: "Xianglu Bay Cascading Terraces",
    cityEn: "Zhuhai",
    preset: "coast",
    dayImage: "public/images/zhuhai-city-balcony-day.webp",
    nightImage: "public/images/zhuhai-city-balcony-night.webp",
    guideZh: "依山傍海、臨風聽潮的城市會客廳，珠海城市陽台坐落於香爐灣畔的核心地段，完美連接景山公園與情侶路沙灘。建築大膽採用順應山勢的「退台式」立體流線設計，層層退落的綠意空中露台、純白浪潮欄杆與懸挑觀海平台巧妙交錯，宛如凝固在海邊的巨大海浪。漫步於露天步道上，海風拂面，腳下是香爐灣細膩的金色沙灘與浪花，對面則是佇立海中的珠海漁女。夜幕低垂時，退台燈帶宛如靈動光瀑順勢而下，配合濱海市集、景觀咖啡廳與悠揚海浪，是珠海最具浪漫氣息的生活休閒打卡地標。",
    guideEn: "Perched dramatically where lush green hills meet the sea at Xianglu Bay, the Zhuhai City Balcony is the city's premier oceanfront living room. Its award-winning cascading terrace architecture steps down organically toward the coastline, featuring sweeping white parapets reminiscent of rhythmic ocean waves and cantilevered glass viewing platforms. Offering seamless pedestrian connections between Jingshan Park and Lovers' Road beach, visitors can unwind at seaside open-air cafes while gazing across the bay at the Zhuhai Fisher Girl statue and the sparkling blue sea.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "免費開放 / 全天免預約通行" },
      { label: "開放時間", value: "公共觀景平台 24 小時開放；商業街區 10:00 – 22:00" },
      { label: "建議用時", value: "1.5 – 2.5 小時（露天觀景、下午茶與沙灘散步）" },
      { label: "最佳時段", value: "下午 17:00 伴隨落日漫步至夜晚天階亮燈" },
      { label: "地理位置", value: "珠海市香洲區情侶中路海濱公園旁（城市陽台）" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free admission / No reservation required" },
      { label: "Hours", value: "Observation Terraces 24/7; Retail & Dining 10:00 – 22:00" },
      { label: "Duration", value: "1.5 – 2.5 Hours" },
      { label: "Best Time", value: "Late afternoon (17:00) into sunset and evening light glow" },
      { label: "Location", value: "Lovers' Middle Road, Xianglu Bay, Xiangzhou, Zhuhai" }
    ]
  },
  {
    dateZh: "10月26日",
    dateEn: "Oct 26",
    relZh: "10月26日",
    relEn: "on Oct 26",
    place: "東澳島（蜜月閣海天懸崖亭）",
    titleZh: "東澳島",
    subZh: "蜜月閣海天懸崖亭",
    titleEn: "Dong'ao Island",
    subEn: "Honeymoon Cliff Pavilion",
    cityEn: "Zhuhai",
    preset: "island",
    dayImage: "public/images/dongao-island-day.webp",
    nightImage: "public/images/dongao-island-night.webp",
    guideZh: "萬山群島中最具浪漫詩意的璀璨明珠，東澳島以其保留原始純淨的「鑽石沙灘」南沙灣與險峻的懸崖礁石聞名於世。而巍峨聳立於蜜月山巔的花崗岩懸崖之上的「蜜月閣」，則是島上的最高點與精神象徵。這座三層古典八角重檐閣樓飛檐翹角、朱柱碧瓦，閣內高懸「蜜月鐘」，傳說情侶在此敲鐘祈福可許下一生誓願。沿著雕欄玉砌的石階棧道蜿蜒登頂，微風拂過，碧海湧動白浪，360度環視萬頃碧波與嶙峋海蝕奇觀，海天一色無比遼闊。入夜後閣樓飛檐紅燈籠亮起，在墨藍夜空與深邃海濤的襯托下宛若蓬萊仙境。",
    guideEn: "The jewel of the Wanshan Archipelago, Dong'ao Island is famed for its crystalline turquoise waters and powder-soft 'Diamond Beach' at Nansha Bay. Perched high upon the granite coastal cliff summit of Honeymoon Mountain stands the iconic Honeymoon Pavilion. Built with classical Lingnan flying eaves, cinnabar columns, and an auspicious ceremonial bronze bell inside, it offers a dramatic panoramic vantage point across the South China Sea. Clifftop stone pathways wind past ancient maritime foliage down to crashing azure ocean breakers, creating one of Zhuhai's most enchanting romantic island sanctuaries.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "島嶼免費開放 / 香洲港或橫琴碼頭乘船（往返約 ¥170–¥200）" },
      { label: "開放時間", value: "全天開放；高速客船通常 08:30 – 16:50 運營" },
      { label: "建議用時", value: "1 – 2 天（深度海島度假與徒步登山）" },
      { label: "最佳時段", value: "清晨登頂蜜月閣觀海上日出，午後在南沙灣踏浪衝浪" },
      { label: "地理位置", value: "珠海市萬山海洋開發試驗區東澳島蜜月山頂" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Island access free / Ferry from Xiangzhou or Hengqin (~¥170–¥200 roundtrip)" },
      { label: "Hours", value: "Island open 24/7; Ferry schedules approx. 08:30 – 16:50" },
      { label: "Duration", value: "1 – 2 Days (Island getaway & hiking)" },
      { label: "Best Time", value: "Early dawn for clifftop sunrise, afternoon for beach surf" },
      { label: "Location", value: "Summit of Honeymoon Mountain, Dong'ao Island, Zhuhai" }
    ]
  },
  {
    dateZh: "今天",
    dateEn: "Today",
    relZh: "剛剛",
    relEn: "just now",
    place: "唐家共樂園（田字綠亭與百年私園）",
    titleZh: "唐家共樂園",
    subZh: "田字綠亭與百年私園",
    titleEn: "Tangjia Gongle Garden",
    subEn: "Tian-Shaped Green Pavilion",
    cityEn: "Zhuhai",
    preset: "garden",
    dayImage: "public/images/gongle-garden-day.webp",
    nightImage: "public/images/gongle-garden-night.webp",
    guideZh: "近代嶺南名園的精華縮影，原為中華民國首任內閣總理唐紹儀的私家花園，後秉持「與民共樂」之精神無私捐贈給當地大眾。園內最負盛名的建築當屬造型精巧奇特的「田字綠亭」——整座兩層古典亭閣巧妙構建為漢字「田」之佈局，碧綠琉璃筒瓦重檐歇山頂與朱紅立柱相映成趣，上下兩層迴廊曲折、木雕欄杆細緻入微。亭前靜臥著融合中西風情的古樸法式石造噴泉，四周環抱著自東南亞及歐美引種的百年古荔枝林、黑羅漢松與參天古木。漫步於青石板路上，古意盎然、清幽深遠，承載著珠海近代中西文化交融與深厚的人文底蘊。",
    guideEn: "A magnificent jewel of modern Lingnan classical landscape gardens, Gongle Garden was originally the private estate of Tang Shaoyi, the first Premier of the Republic of China, who magnanimously donated it to the public under the motto 'Joy Shared with All'. Its crowning architectural wonder is the historic 'Tian'-shaped Green Pavilion, ingeniously framed in the floor plan of the Chinese character '田'. Topped with jade-green glazed porcelain tiles and supported by vermilion timber columns, it faces a century-old French classical stone fountain and stands encircled by rare exotic botanicals and ancient lychee groves. It remains an enduring emblem of Zhuhai's rich cultural heritage.",
    companions: [],
    guideDetailsZh: [
      { label: "門票預約", value: "公園免費開放 / 免預約入園" },
      { label: "開放時間", value: "08:30 – 17:30（全年開放）" },
      { label: "建議用時", value: "1.5 – 2.5 小時（名人故居與嶺南名園巡禮）" },
      { label: "最佳時段", value: "上午 09:00–11:00 晨光穿透百年古樹林蔭，幽靜怡人" },
      { label: "地理位置", value: "珠海市高新區唐家灣鎮山房路 99 號" }
    ],
    guideDetailsEn: [
      { label: "Tickets", value: "Free admission / No reservation needed" },
      { label: "Hours", value: "08:30 – 17:30 (Open daily)" },
      { label: "Duration", value: "1.5 – 2.5 Hours" },
      { label: "Best Time", value: "Morning (09:00–11:00) for soft sunlight filtering through century-old trees" },
      { label: "Location", value: "No. 99 Shanfang Road, Tangjiawan, High-tech Zone, Zhuhai" }
    ]
  }
];
