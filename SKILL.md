---
name: math-review-deck
description: >
  互動視覺化複習簡報產生器（純前端、零金鑰、零建置）。把一個科目／一冊教材，
  做成「一頁一重點、左邊講觀念、右邊看圖、拖滑桿就會動」的網頁簡報，並可一鍵部署上線。

  當使用者要求製作「互動網頁簡報」、「網頁複習簡報」、「全冊視覺化教材網站」、「拖滑桿教學簡報」、
  「一頁一重點網頁投影片」、「線上複習網頁」，或提出「跑輔導員試教診斷」、「做試教檢驗」、
  「用輔導員角度試教優化」，以及針對既有網頁簡報進行改寫、維護與雙向互動升級時，請一定要使用此技能。
  （注意：若使用者要求製作 PowerPoint .pptx 簡報檔案，應使用一般的 PPT 或 SOIL 簡報技能；本技能專用於純前端 HTML+SVG+JS 互動簡報網站）。

  也適用於：需要投影上課、老師要在畫面上用雷射筆與畫筆講解、
  需要把圖解或例題放大成整頁的教學情境。

  產出為單一資料夾的靜態網頁（index.html + engine.js + style.css + svg.js + chN.js），
  可直接用瀏覽器開，或部署到 Cloudflare Pages／Netlify／GitHub Pages。
  數學排版用 MathJax（唯一外部相依），其餘皆為原生 SVG，不需要任何 API 金鑰。
---

# 互動視覺化複習簡報（math-review-deck）

## 這個框架長什麼樣

一份簡報 = 一個資料夾。每一章一個 `chN.js`，章與章之間互不干擾。

```
我的複習網站/
├── index.html      # 骨架（封面／目錄／舞台／控制列／教具列）
├── engine.js       # 導覽與渲染引擎        ← 共用，不要改
├── style.css       # 全部樣式              ← 共用，不要改
├── svg.js          # SV 幾何工具庫         ← 共用，不要改
└── ch1.js ~ chN.js # 各章投影片內容        ← 你只需要寫這個
```

每一張投影片是**左右兩欄**：

- **左：概念欄** — 徽章、標題（就是這一頁的唯一重點）、公式卡、2~4 條要點、範例（可展開解答）
- **右：視覺欄** — 一張 SVG 圖／公式卡／表格，可加**滑桿**或**步驟滑桿**做成互動

引擎自帶：鍵盤翻頁、章節目錄、**一頁一螢幕自動縮放**（內容過高自動等比縮小，投影不必捲動）、
**雷射筆／畫筆／全螢幕教具列**、**把範例或圖解放大成整頁**（HTML 內容會連字級一起放大）。

## 工作流程

### 1. 先確定「教什麼、不教什麼」

**動手寫投影片前，一定要先把範圍釘死。** 這是這個框架最容易出錯的地方——
不是程式壞掉，而是內容超出該年級的範圍，或是漏掉課綱明列的子項目。

請先和使用者確認、或從教材／課綱文件中整理出：

- 章、節的**逐字名稱**與順序（別自己發明）
- 每一節要涵蓋的**具體重點**（細到「一個重點一頁」的程度）
- **這一冊刻意不教什麼**——屬於前後冊、或課綱備註明文排除的內容

把這些寫進每個 `chN.js` 的檔頭註解，之後接手的人才知道邊界在哪。

> 若使用者提供課綱／課程計畫文件，**以文件原文為準**，特別注意「備註」欄裡
> 「不處理」「不涉及」「以…為限」這類字眼——那是硬性紅線。

### 2. 產生骨架

```bash
python scripts/new_deck.py --out 我的複習網站 \
    --title "國中數學 七上 全冊複習" \
    --eyebrow "108 課綱國中數學 · 第 1 冊（七上）" \
    --cover-title "七上全冊複習" \
    --sub "整數的運算 · 分數的運算 · 一元一次方程式" \
    --home "七上複習" \
    --chapters "整數的運算::1-1 負數與數線,1-2 整數的加減" \
               "分數的運算::2-1 因數與倍數,2-2 最大公因數"
```

會複製好共用資產、產生 `index.html` 與各章骨架（靜態頁／互動頁交替）。
章色留空會自動套用內建配色（藍→紫→綠→琥珀→玫紅→青）。

### 3. 寫各章內容

編輯 `chN.js`。
- **國中/高中簡報規格**：見 `references/slide-spec.md`。
- **國小中年級簡報規格**：見 `references/slide-spec-elementary.md`（遵循 CPA 具體到抽象教學法、極簡文字與國小專用教具）。

`SV` 工具庫（包含鐘面、分數圖、位值板、直式運算與幾何圖形）的完整 API 見 `references/svg-toolkit.md`，
互動的常見寫法見 `references/interaction-patterns.md`。

一頁投影片的骨架：

```js
{
  sec: '1-2', secName: '整數的加減',
  title: '同號相加照抄符號，異號相加取「大的」符號',   // 這一頁的唯一重點
  points: [ '…', '…', '…' ],                          // 2~4 條，每條 ≤45 字
  formula: { label: '公式標籤', tex: 'a+b=b+a' },      // 選填
  visual: (h) => { /* 畫圖或做互動，見 §規格 */ },
  caption: '圖下方一行說明。',                          // 選填
  example: { q: '…', steps: ['…','…'], ans: '…' }      // 強烈建議每頁都有
}
```

### 4. 驗證（每次改完都要跑）

```bash
node scripts/verify_deck.js 我的複習網站
```

這個檢查**不需要瀏覽器**，會把每一張投影片的 `visual()` 實際執行一遍，
並**掃過每一個滑桿的每一個值**，因此能抓出「只有拖到某個值才會爆」的錯誤。
同時檢查必要欄位、`\( \)` 是否成對、viewBox 版面、index.html 載入一致性、快取版本號。

要一併擋掉超綱字詞：

```bash
node scripts/verify_deck.js 我的複習網站 --forbid "連比,判別式,斜率,函數"
```

### 5. 本機預覽

```bash
python -m http.server 8890 --directory 我的複習網站
```

> ⚠️ 用 `file://` 直接開，部分預覽環境會當成靜態快照而不執行 JS，一定要起伺服器。

深連結：`index.html#present` 直接進簡報、`index.html#p=20` 直接跳到第 20 張。

### 6. 部署

見 `references/deploy.md`（Cloudflare Pages／Netlify／GitHub Pages 三種）。最短路徑：

```bash
npx wrangler pages deploy 我的複習網站 --project-name 我的專案名 --branch main --commit-dirty=true
```

## 硬性規則（踩過坑才寫下來的）

1. **改了 `chN.js` 就要同步更新 `index.html` 的 `?v=` 版本號**，
   否則使用者的瀏覽器會拿到快取的舊章節，你會以為改動沒生效。
2. **`visual` 內只能用 `h.querySelector`，禁用 `document.getElementById`**——
   所有投影片共用同一個文件，id 會跨頁打架。
3. **`formula.tex` 裡不要寫 `$$`**，引擎會自動包。行內數學一律 `\\( … \\)`。
4. **SVG `viewBox` 寬高比不要低於 1.35**、高度控制在 320 以內
   （有滑桿的頁 ≤300，因為要留位置給控制列）。太高的圖會被自動縮到看不清楚。
5. **`points` 最多 4 條、每條 ≤45 字**；超過會擠爆左欄。
6. **視覺欄不要留白**——沒有幾何圖也要用 `SV.fbox` 公式卡、對照表或流程圖填滿。
   但**易錯對照表用 HTML 表格是好的**，不要為了「看起來像圖」硬塞 SVG。
7. **每章至少 3~5 頁要有互動**。代數一樣可以互動：拖係數看解怎麼變、
   拖滑桿看面積模型怎麼拆、用步驟滑桿逐步展開推理。
8. **例題要自己實際算一遍**再寫進去。這是最常見的錯誤來源。
9. **章色不要重複**，同一份簡報內每章一個顏色。
10. 一頁只講一件事。`title` 就是那件事，寫成**學生可以直接背起來的一句話**。

## 內容品質的判準與三輪試教診斷管道

為確保網頁教材達到「國小數學領域輔導員 / 資深教學專家」標準，開發或修訂完成後，必須自動執行**「三輪輔導員試教診斷與迭代優化管道（3-Round Pedagogical Audit & Optimization Pipeline）」**：

### 🍎 三輪輔導員試教診斷流程

#### 📍 第一輪：CPA 具體抽象轉換與直式規範診斷
- **診斷重點**：
  1. **CPA 轉換**：具體物件（積木、單位量、圖卡）是否與抽象公式／直式建立「雙向動態高亮與同步」？
  2. **直式規範**：直式運算（加減、乘法、長除法、小數）是否採用「等寬欄位中線對齊（`drawDigits`）」？嚴禁 `text-anchor: end` 粗略靠右造成高位錯位！進位/借位標註（如 ①, ②）是否嚴格落在該欄中線？
  3. **幾何繪圖防呆**：角度與量角器繪圖是否遵守「開口向左極座標互補角（$180^\circ - \theta$）」與「$90^\circ$ 垂直中線直角檢驗」？嚴禁出現「文字標示 130° 鈍角卻畫成 50° 銳角」之幾何矛盾！
- **執行動作**：產出 `teacher_audit_report_v1.md` ➔ 立即執行第 1 輪程式碼修訂。

#### 📍 第二輪：學生迷思概念與高密度雙向互動診斷
- **診斷重點**：
  1. **迷思破解**：是否針對該單元難點（如商補0、中間/末尾0讀法、周長大面積不一定大、邊長拉長角度不變）提供「動態找反例」與迷思對照？
  2. **互動深度**：是否具備雙滑桿對照、鋪滿估算、點擊拆解等 4 大感官手動互動，避免純靜態與無意義觀看？
- **執行動作**：產出 `teacher_audit_report_v2.md` ➔ 立即執行第 2 輪程式碼修訂。

#### 📍 第三輪：全冊設計語言統一性與成就正向反饋診斷
- **診斷重點**：
  1. **步驟按鈕規範**：步驟式推演按鈕統一採用 `[Step N: 說明文字]` 編號格式。
  2. **顏色語意嚴格維持**：紅色（進/借位、迷思警示）、琥珀色（步驟/十位區）、藍色（主色/總積）、綠色（正確/驗算成功）。
  3. **正向成就反饋**：每個單元至少一頁提供 🎉 成就徽章與綠底高亮，增強學習專注力與成就感。
- **執行動作**：產出 `teacher_audit_report_v3.md` ➔ 立即執行第 3 輪程式碼修訂與 Node 語法/臨界值邊界測試。

---

## 版權與教學聲明頁規範（Copyright Page Specification）

每份視覺化教材網站引擎末頁（`s.type === 'copyright'`）必須包含標準版權與教學聲明頁。其中**教材來源與課綱對應之冊數**須依據實際製作的教材來源動態修改：

1. **版權頁四大部分結構**：
   - **📘 教材內容與指標來源**：註明對應課綱學習指標（如 `108 課綱國小數學第 5 冊（三上）`）與教材來源（如 `康軒文教事業（康軒版）國小三年級上冊數學課本與習作`）。冊數與版次依實際專案動態修改。
   - **⚖️ 著作權與權利宣告**：
     - 引擎聲明：`<b>視覺化動態教具與 Web 引擎</b>：感謝 <b>三師爸 (Sense Bar)</b> 分享視覺化動態教材技能，經<b>林敬修老師</b>修改技能後設計及開發。`
     - 內容聲明：`<b>課本品牌與原始內容權利</b>：<出版社簡稱>版課本與習作之原始文字、品牌與教材題型著作權歸原出版公司 <b><出版社全稱></b> 所有。`
   - **🎁 免費教育使用與授權條款**：宣告全台教師、學生、家長與輔導員免費非商業使用，嚴禁打包販售與商業盈利。
   - **🛠️ 引擎技術與致謝**：標註 HTML5 / SVG / Vanilla CSS / ES6+ Dynamic Engine 技術及 MathJax 公式引擎致謝。

2. **引擎標準 HTML 範本**：
```javascript
else if (s.type === 'copyright') {
  slideEl.className = 'slide copyright-page';
  slideEl.innerHTML = `
    <div class="cp-card">
      <div class="cp-header">
        <span class="cp-badge">© 版權與教學聲明</span>
        <h2 class="cp-title">${SUBJECT_TITLE} 全冊視覺化複習網站</h2>
      </div>
      <div class="cp-grid">
        <div class="cp-box">
          <div class="cp-box-title">📘 教材內容與指標來源</div>
          <ul class="cp-list">
            <li>本視覺化教材對應 <b>108 課綱${CURRICULUM_VOLUME_NAME}</b> 學習指標（${CURRICULUM_INDICATORS}）。</li>
            <li>單元章節、觀念進度與題型情境參考 <b>${TEXTBOOK_SOURCE_NAME}</b> 之架構設計。</li>
          </ul>
        </div>
        <div class="cp-box">
          <div class="cp-box-title">⚖️ 著作權與權利宣告</div>
          <ul class="cp-list">
            <li><b>視覺化動態教具與 Web 引擎</b>：感謝 <b>三師爸 (Sense Bar)</b> 分享視覺化動態教材技能，經<b>林敬修老師</b>修改技能後設計及開發。</li>
            <li><b>課本品牌與原始內容權利</b>：${TEXTBOOK_PUBLISHER_SHORT}版課本與習作之原始文字、品牌與教材題型著作權歸原出版公司 <b>${TEXTBOOK_PUBLISHER_FULL}</b> 所有。</li>
          </ul>
        </div>
        <div class="cp-box">
          <div class="cp-box-title">🎁 免費教育使用與授權條款</div>
          <ul class="cp-list">
            <li><b>非商業教育授權</b>：開放予全台國小教師、學生、家長與輔導員於學校課堂、公開課研討、線上教學及自主複習中<b>免費非商業使用</b>。</li>
            <li><b>嚴禁商業盈利行為</b>：未經原作者與版權方書面授權，禁止任何形式之打包販售、付費轉載或商業盈利行為。</li>
          </ul>
        </div>
        <div class="cp-box">
          <div class="cp-box-title">🛠️ 引擎技術與致謝</div>
          <ul class="cp-list">
            <li><b>核心開發技術</b>：HTML5 / SVG / Vanilla CSS / ES6+ Dynamic Engine。</li>
            <li><b>數學公式渲染</b>：感謝 MathJax (v3 es5 tex-svg) 開源數學引擎提供支援。</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
```

---

## 頁首單元與活動雙層超連結導航規範（Header Quick-Navigation Specification）

在課堂投影教學與學生自主複習情境中，頁首必須具備**雙層超連結快捷導航系統**，讓授課教師與學生無需依賴側邊目錄或多次點擊上一頁/下一頁，隨時隨地能一鍵直達全冊任一單元與當前單元的任一活動：

### 1. HTML 結構標準（`index.template.html` / `index.html`）

`header.topbar` 必須分為上層（標題與麵包屑）與下層（雙層導航膠囊列）：

```html
<header class="topbar">
  <div class="topbar-main">
    <button class="home-btn" id="homeBtn" title="回封面">✦ {{HOME_LABEL}}</button>
    <div class="crumb" id="crumb"></div>
    <div class="top-actions">
      <button class="ghost-btn" id="tocToggle" title="目錄">☰ 目錄</button>
    </div>
  </div>
  <nav class="topbar-nav" id="topbarNav">
    <div class="nav-units-bar" id="navUnitsBar"></div>
    <div class="nav-acts-bar" id="navActsBar"></div>
  </nav>
</header>
```

### 2. 雙層膠囊列職責與互動規範

1. **第一層【單元直達膠囊】（`#navUnitsBar`）**：
   - 網站初始化時透過 `buildQuickNav()` 動態產生全冊各單元按鈕（`U1`, `U2`, ... `UN`）。
   - 按鈕具備單元全名提示（如 `[U1 一億以內的數]`）。
   - 當前單元標籤在切換時自動套用 `.active` 高亮，並平滑水平滾動至視窗中間（`scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })`）。
   - 點擊按鈕一鍵跳轉至該單元的單元首頁或第一張投影片。

2. **第二層【活動直達膠囊】（`#navActsBar`）**：
   - 換頁時透過 `updateQuickNav(s)` 隨當前單元動態更新。
   - 包含該單元的「單元首頁」與所有活動按鈕（如 `[1-1 認識十萬和百萬]`、`[1-2 一億以內的數]`）。
   - 當前正在講授的活動標籤自動套用 `.active` 鮮豔高亮。
   - 點擊活動按鈕直接跳轉至該活動的第一張投影片。

3. **頁首麵包屑（Breadcrumb）全超連結化（`.crumb-btn`）**：
   - 導航軌跡為 `第 X 單元 [單元名稱]` / `[活動編號 活動名稱]` / `[重點標題]`。
   - 單元名與活動名必須為 `<button class="crumb-btn">`，點擊分別直達該單元首頁與活動首頁，滑鼠懸浮呈現底線與背景微光。

4. **封面章節卡片（Cover Cards）活動標題條列靠左對齊規範**：
   - **全面條列靠左對齊**：封面大卡片內的活動清單（`.cc-list`）必須採用垂直彈性盒（`display: flex; flex-direction: column; text-align: left;`）逐條列出，**嚴禁採用 inline 文字以空格平鋪**，徹底避免字詞被中斷折行（例如「一億以內」被折成「一」在第一行、「億以內」在第二行）。
   - **結構化分欄**：每個活動項目（`.cc-sec-item`）包含：
     - 活動序號（`.cc-sec-code`）：單元專色加粗（`font-weight: 900; color: var(--ct)`），如 `1-1`、`2-1`，靠左固定。
     - 活動標題（`.cc-sec-name`）：完整活動名稱（如 `十萬以內的數`），完全靠左對齊（`text-align: left`）。
   - **直達跳轉與動態懸浮**：項目綁定 `.cc-sec-link`，點擊直接進入簡報並跳轉該活動；滑鼠懸浮時呈現專色淡背景與微幅向右平移（`translateX(3px)`），提供清晰易讀的視覺層次。

5. **觸控與滾動體驗**：
   - 膠囊列必須套用 `overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;`，在大螢幕、電子白板與平板觸控下均能平滑滑動且不遮擋簡報主體。

---

## 直式計算位值對齊硬性規範（Place-Value Column-Grid Specification）

在國小中年級（三、四年級）數學中，直式計算（大數加減、整十倍乘法、二位數×二位數、三位數×二位數中間有 0、長除法、小數加減）是教學與評量的核心。
**嚴禁採用單一 X 座標配合 `text-anchor: end` 粗估寬度靠右堆疊**（因各數字寬度不同，多層運算時百位、千位、萬位必然歪斜）。所有直式運算必須遵守「等寬位值欄中線對齊」原則：

1. **建立等寬欄位中線系統（Monospace Column System）**：
   - 依運算位數建立固定欄位寬度（每欄建議寬度 18px ~ 24px）。
   - 預先定義各欄中線座標：
     ```javascript
     // 範例：五位數乘法直式欄位中線
     const colW = 19;
     const rightX = 212; // 個位中線
     const cols = {
       g: rightX,              // 個位中線
       t: rightX - colW,       // 十位中線
       b: rightX - colW * 2,   // 百位中線
       k: rightX - colW * 3,   // 千位中線
       w: rightX - colW * 4    // 萬位中線
     };
     ```
2. **頂部放置淺灰位值引導標籤**：
   - 在算式頂端標示【萬】【千】【百】【十】【個】（或小數【個】【十分位】【百分位】），字級 9.5~10px，顏色 `#94a3b8`，置中於對應中線。
3. **`drawDigits` 逆向位值填入演算法**：
   - 多層運算、各層乘積與總和一律使用統一函式填入，確保每個數字皆落在其位值中線：
     ```javascript
     const colArr = [cols.g, cols.t, cols.b, cols.k, cols.w];
     const drawDigits = (num, y, opts = {}) => {
       const str = String(num);
       const offset = opts.offset || 0; // 0: 個位起算, 1: 十位起算 (乘數十位), 2: 百位起算
       let out = '';
       for (let i = 0; i < str.length; i++) {
         const digit = str[str.length - 1 - i];
         const colIdx = offset + i;
         if (colIdx < colArr.length) {
           out += TX(colArr[colIdx], y, digit, { 
             fs: opts.fs || 13, 
             c: opts.c || '#1e293b', 
             anchor: 'middle', 
             fw: opts.fw || 900 
           });
         }
       }
       return out;
     };
     ```
4. **算子與橫線對齊規範**：
   - 運算符號（`×`、`+`、`−`）放置於最左側欄位外 15~20px 處。
   - 算式底線（分層線、總計線）左端延伸至算子左側，右端延伸至個位外 6~10px。
5. **長除法（直式除法）課本級標準規範**：
   - **除號圖形規格**：左端為流暢圓潤括弧弧線，頂端為平直水平橫線（Roof line），**嚴禁向上勾折**（如雨傘柄或問號狀）。在 SVG 中應使用單一平滑連續路徑繪製：
     ```javascript
     // 範例：x 為除號弧線基點，y_bot 為括弧底端，y_top 為頂橫線高度，x_end 為橫線右端
     `<path d="M ${x},${y_bot} C ${x-5},${(y_bot+y_top)/2+5} ${x-5},${(y_bot+y_top)/2-5} ${x},${y_top} L ${x_end},${y_top}" 
            fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
     ```
   - **計算過程不寫減號**：台灣國小除法直式計算過程中，**一律不寫減號「−」**，分層橫線僅畫在相減位數區間正下方。
   - **演進式多步並列與紅字標示**：示範步驟時，採用多步驟由左至右箭頭（`➜`）並列呈現（如三步或兩步全景）。當前步驟最新算出之數字（商數、減數、移下來之位數、餘數）一律標註鮮紅色（`#e11d48`），完成後之歷史步驟則轉為深黑色。
   - **位值標籤與指引箭頭**：商數頂部標註淺灰位值引導標籤【千 百 十 個】，直式下方繪製垂直向上指引箭頭（`↑`），精準標示當前步驟正在處理之位數。

---

## 國小數學分數垂直排版硬性規範（Fraction Vertical Stacking Specification）

在國小中年級（三、四年級）數學教材中，**嚴禁使用斜線（如 `3/4`、`7/4`、`2又3/4`）書寫分數**。台灣國小課本一律採用上下堆疊格式（分子在頂端、中間水平分數線、分母在底端，帶分數整數垂直置中置於左側）。

1. **HTML 內文、概念要點與範例**：
   - 必須一律使用 MathJax TeX 格式：真分數/假分數寫作 `\(\frac{a}{b}\)`，帶分數寫作 `\(2\frac{3}{4}\)`。
2. **HTML 動態控制項（按鈕文字、即時滑桿數值標籤）**：
   - 使用純 CSS 原生垂直分數卡片（`.mfrac` 與 `.mmix`），避免動態更新時 TeX 非同步排版問題：
     ```javascript
     const hFrac = (a, b) => `<span class="mfrac"><span class="num">${a}</span><span class="den">${b}</span></span>`;
     const hMix = (w, a, b) => `<span class="mmix"><span class="whole">${w}</span><span class="mfrac"><span class="num">${a}</span><span class="den">${b}</span></span></span>`;
     ```
3. **SVG 圖解內部（向量排版）**：
   - SVG `<text>` 無法直接被 MathJax 渲染，必須使用 SVG 原生向量垂直分數組件 `FRAC(x, y, num, den, opts)`：
     ```javascript
     const FRAC = (x, y, num, den, opts = {}) => {
       const fs = opts.fs || 13, color = opts.c || '#172033';
       const maxLen = Math.max(String(num).length, String(den).length);
       const barW = opts.w || Math.max(14, maxLen * fs * 0.72 + 4);
       let s = `<g transform="translate(${x}, ${y})">`;
       if (opts.whole !== undefined && opts.whole !== null && opts.whole !== '') {
         s += `<text x="${-barW / 2 - 4}" y="${fs * 0.35}" text-anchor="end" font-size="${opts.wholeFs || (fs + 2)}" font-weight="900" fill="${color}">${opts.whole}</text>`;
       }
       s += `<text x="0" y="${-fs * 0.28}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${num}</text>`;
       s += `<line x1="${-barW / 2}" y1="0" x2="${barW / 2}" y2="0" stroke="${color}" stroke-width="${opts.sw || 1.6}" stroke-linecap="round"/>`;
       s += `<text x="0" y="${fs * 0.85}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${den}</text>`;
       s += `</g>`;
       return s;
     };
     ```

---

## 量角器與幾何角度繪圖防呆規範（Protractor & Angle Geometry Specification）

在國小中年級（三、四年級）的角度與幾何單元中，量角器內外圈判讀與旋轉角是學生最常見的認知迷思。由於 SVG 螢幕座標系為「y 軸朝下」，且量角器具備雙向雙圈刻度（內圈順時針、外圈逆時針），幾何計算必須嚴格遵守以下防呆準則：

1. **極座標旋轉方向與互補角轉換公式**：
   - 半圓量角器中心為 $(cx, cy)$，頂點置於中心。
   - **開口向右（內圈 $0^\circ$ 起點，朝右方向 $0^\circ$）**：
     - $\text{mathDeg} = \theta$
     - $\text{rad} = \text{mathDeg} \times \pi / 180$
     - $ex = cx + r \times \cos(\text{rad}), \quad ey = cy - r \times \sin(\text{rad})$
   - **開口向左（外圈 $0^\circ$ 起點，朝左方向 $180^\circ$）**：
     - **重大防呆陷阱**：底邊在 $180^\circ$ 方向，角張開 $\theta$ 度時，射線在標準座標系中的角度為**互補角**：
       $$\text{mathDeg} = 180^\circ - \theta$$
     - *例 1*：開口向左張開 $50^\circ$（銳角）$\rightarrow \text{mathDeg} = 180^\circ - 50^\circ = 130^\circ$（射線朝左上方，夾角 $50^\circ$）。
     - *例 2*：開口向左張開 $130^\circ$（鈍角）$\rightarrow \text{mathDeg} = 180^\circ - 130^\circ = 50^\circ$（射線朝右上方，跨過頂部 $90^\circ$ 直角，夾角 $130^\circ$）。
     - **嚴禁直接將 $\theta$ 當作螢幕極座標代入，否則會出現「宣稱 130° 鈍角卻畫成 50° 銳角」的圖文矛盾！**

2. **直角檢驗（$90^\circ$ 垂直基準線）圖文一致性審查**：
   - 凡量角器圖示必須畫出 $(cx, cy) \rightarrow (cx, cy - r)$ 的 $90^\circ$ 垂直中線（建議採灰色虛線）。
   - 繪製完成後必須進行直角檢驗：
     - **銳角（$<90^\circ$）**：射線與扇形**嚴禁跨過 $90^\circ$ 垂直線**。
     - **鈍角（$>90^\circ$）**：射線與扇形**必須明顯跨過 $90^\circ$ 垂直線**。

3. **量角器互動必備三情境對照**：
   - 量角器判讀教學頁面必須具備三種情境切換按鈕，直接破解學生「看錯圈」的典型錯誤：
     1. **👉 開口向右（內圈銳角）**：底邊對齊右側 $0^\circ$，讀內圈刻度（破解誤看外圈鈍角）。
     2. **👈 開口向左（外圈銳角）**：底邊對齊左側 $0^\circ$，讀外圈刻度（破解誤看內圈鈍角）。
     3. **👈 開口向左（外圈鈍角）**：底邊對齊左側 $0^\circ$，跨過 $90^\circ$ 讀外圈鈍角（破解誤看內圈銳角）。

4. **「邊不夠長？虛線延長工具」**：
   - 針對中年級學生「邊越長角越大」的迷思，量角器互動應提供動態延長邊工具，以虛線延伸射線，直觀證明「邊延長、角度大小不變」。

---

## 延伸與維護

- **新增一冊**：重跑 `new_deck.py`，共用資產會自動複製。
- **改引擎或樣式**：`engine.js`／`style.css`／`svg.js` 是六份簡報共用的同一份，
  改完要**每一個資料夾都複製一次**再各自部署，否則規格會分歧。
- **只改某一頁**：直接編對應 `chN.js` 內那個投影片物件，其餘不受影響。
