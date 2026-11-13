# math-review-deck 國小中年級（三、四年級）簡報格式規格規範

> 本規範專為**國小中年級（3~4年級）康軒/翰林/南一數學教材**設計。
> 配合小學生的認知發展與閱讀能力，請務必遵照 CPA（具體➔圖像➔算式）教學法原則撰寫。

---

## 1. 核心原則：CPA 具體到抽象設計

國小中年級學生尚處於「具體運思期」，**嚴禁直接丟出抽象符號與純公式**。

- **C（Concrete / 具體）**：題目與引導需連結生活情境（如：切披薩、分蘋果、數積木、看鐘面）。
- **P（Pictorial / 圖像）**：右欄必須放置明確的視覺圖解（如 `SV.clock`、`SV.fractionPie`、`SV.baseTenBlocks`）。
- **A（Abstract / 算式）**：重點與答案寫出清楚的四則運算橫式與直式，不使用抽象代數未知數 $x, y$（未知數統一用 $\square$ 或 $( )$ 表示）。

---

## 2. 欄位撰寫與字數限制

### 左欄（觀念欄）
1. **`title`（頁面大標）**：
   - 必須是小學生**可以直接背起來的一句口訣**（如：「先算括號內，再算括號外」、「同分母相加，分母不變分子加」）。
   - 字數控制在 **12~20 字以內**。

2. **`points`（要點提示）**：
   - **最多 2~3 條**（切勿超過 3 條，避免小學生閱讀負擔過重）。
   - 每條字數限制在 **15~20 字以內**。
   - 用語白話直觀，重要關鍵字用 `<span class="k">口訣</span>` 標示。

3. **`example`（精選範例）**：
   - 強烈建議每頁都包含生活情境題。
   - `q`：生活情境題目（如：「小明有 12 顆糖果，平分給 3 人...」）。
   - `steps`：步驟分明，每一步附帶橫式或文字說明。
   - `ans`：明確標示單位（如：「4 顆」、「3 小時 20 分鐘」）。

---

---

## 3. 右欄（視覺欄）與國小中年級 4 大感官手動數學互動模式

除了基本的「滑桿（Slider）」控制外，為符合國小 3~4 年級具體運思期（Concrete Operational Stage）的學習特性，建議優先採用以下 **4 大感官手動數學互動模式**：

### 🖐️ 模式 1：動態拖曳與磁吸拼貼 (Drag & Snap Tiling)
- **具體操作**：學生可使用滑鼠/觸控筆拖曳 $1\text{ cm}^2$ 圖卡、分數扇形塊、三角板等具體教具進入指定圖形，當接近目標區域時自動「磁吸 (Snap-to-Grid)」對齊。
- **雙向聯動**：拖入 1 個拼貼塊，右側/下方計數器與算式立刻同步 $+1$。
- **適用單元**：第 6 章【面積鋪滿】、第 9 章【分數拼盤】、第 5 章【三角板貼齊直角】。

### 💥 模式 2：點擊爆破拆解與融合成型 (Click-to-Split & Merge)
- **具體操作**：點擊 1 個千格積木發光裂開成 10 個百格板；點擊 1 條十格積木裂開成 10 個小方塊（借位/退位）；點擊 2 個 $0.5\text{ cm}^2$ 半格三角形自動旋轉拼合為 $1\text{ cm}^2$ 正方形。
- **適用單元**：第 1 章【10000以內的數進位】、第 2 章【加減法退位拆解】、第 6 章【半格面積合體】。

### 🔄 模式 3：具體具象 ⇄ 抽象算式 雙向聯動 (Two-Way Synced Linking)
- **具體操作**：學生點擊或拖動具體圖像時，右側抽象符號/直式計算即時高亮對應步驟；反之點擊直式的某一位數時，左側對應的具體積木發光跳躍。
- **適用單元**：第 4 章【乘法陣列與直式高亮】、第 3 章【毫米直尺端點移開對照】、第 7 章【除法包含除/等分除切換】。

### ⭐ 模式 4：遊戲化探索與即時正向成就反饋 (Gamified Visual/Audio Badges)
- **具體操作**：學生完成鋪滿、拆解或答對情境題時，跳出正向徽章（✅「成功鋪滿 12 cm²！」）、歡呼粒子與柔和提示音效，大幅提升學習專注力。

---

## 4. 直式計算位值對齊硬性規範（Place-Value Column-Grid Standard）

在國小中年級（三、四年級）數學中，直式計算（大數加減、二位數×一位數/二位數、三位數×二位數中間有 0、長除法、小數加減）是教學與評量的核心。
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
5. **長除法規範**：
   - 商數與各層差數必須嚴格對齊被除數各個位數的中線，除號弧線與橫線比例清晰，不可遮蔽商數。

---

## 4.5 國小數學分數垂直排版硬性規範（Fraction Vertical Stacking Standard）

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

## 5. 量角器與幾何角度繪圖防呆規範（Protractor & Angle Geometry Standard）

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

## 6. 國小中年級禁用紅線（Forbid Terms）

撰寫 `chN.js` 時，**嚴禁出現以下超綱與過度抽象詞彙**：

- ❌ 未知數 $x, y$（用 $\square$ 或 $( )$ 代替）
- ❌ 負數、絕對值
- ❌ 異分母分數加減（中年級僅限同分母加減）
- ❌ 比例、連比、正反比
- ❌ 方程式、聯立方程式
- ❌ 函數、斜率、座標平面（小學叫位置對齊）
- ❌ 平方根、勾股定理/畢氏定理、三角函數

---

## 5. 範例：中年級標準投影片物件

```javascript
{
  sec: '1-2',
  secName: '分數的加法',
  title: '同分母分數相加，分母不變分子相加',
  points: [
    '把圓形平分成 <span class="k">8 份</span>，每一份是 \\(\\frac{1}{8}\\)。',
    '吃了 2 份再吃 3 份，合起來就是吃了 <span class="k">5 份</span>。'
  ],
  visual: (h) => {
    return SV.fractionPie({ cx: 160, cy: 140, r: 90, total: 8, parts: 5 });
  },
  caption: '圖中塗色部分代表 \\(\\frac{5}{8}\\) 個蛋糕。',
  example: {
    q: '媽媽買了一個披薩切成 8 塊，小明吃了 \\(\\frac{2}{8}\\) 個，妹妹吃了 \\(\\frac{3}{8}\\) 個，兩人一共吃了幾個披薩？',
    steps: [
      '分子相加：\\(2 + 3 = 5\\)',
      '分母保持不變：\\(8\\)',
      '答：\\(\\frac{5}{8}\\) 個披薩'
    ],
    ans: '\\(\\frac{5}{8}\\) 個'
  }
}
```
