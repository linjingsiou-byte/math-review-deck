/* ============ 第 6 章　面積 ============
   依康軒國小 3 上第 6 單元：
   6-1 面積的直接比較與個別單位
   6-2 平方公分與平方公分板網格
   6-3 面積的拼貼與計算
   對應課綱代碼：n-II-1, s-II-3 理解面積的意義，認識平方公分，並能以個別單位或網格測量平面圖形面積。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#059669'; // 翡翠綠主調 (Chapter 6 面積)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 6,
    title: '面積',
    color: C,
    sections: ['6-1 面積的直接比較與個別單位', '6-2 平方公分與平方公分板網格', '6-3 面積的拼貼與計算'],
    slides: [

      /* ==================== 6-1 面積的直接比較與個別單位 ==================== */
      {
        sec: '6-1', secName: '面積的直接比較與個別單位',
        title: '平面圖形所佔平面的大小就是面積',
        points: [
          '**面積的定義**：物體表面或封閉平面圖形內部的<span class="k">平面大小</span>。',
          '**直接比較**：將兩個圖形重疊（疊合），看得出超出部分的大小。',
          '**個別單位比較**：使用相同的圖卡（如正方形、正三角形、圓形花紋）鋪滿圖形，比較用了幾個圖卡。'
        ],
        formula: { label: '面積比較', tex: '\\text{鋪滿圖卡個數越多} \\Rightarrow \\text{面積越大}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#ecfdf5', stroke: GRN, r: 12 });
          out += TX(109, 38, '【直接疊合比對】', { fs: 14, c: GRN, anchor: 'middle', fw: '900' });

          out += `<rect x="45" y="65" width="130" height="90" fill="#fca5a5" stroke="${RED}" stroke-width="2" rx="4"/>`;
          out += `<rect x="45" y="65" width="90" height="70" fill="#93c5fd" stroke="${BLU}" stroke-width="2" rx="4"/>`;

          out += TX(90, 100, '藍卡 (小)', { fs: 12, c: BLU, anchor: 'middle', fw: '900' });
          out += TX(145, 130, '紅卡超出部分', { fs: 11, c: RED, anchor: 'middle', fw: '900' });
          out += TX(109, 212, '紅卡包含藍卡且有超出 ➔ 紅卡較大', { fs: 11, c: GRN, anchor: 'middle', fw: '800' });

          out += BOX(217, 15, 188, 225, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(311, 38, '【個別單位鋪滿比較】', { fs: 14, c: BLU, anchor: 'middle', fw: '900' });

          const bx = 250, by = 65, unit = 30;
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 4; c++) {
              out += `<rect x="${bx + c * unit}" y="${by + r * unit}" width="${unit}" height="${unit}" fill="#bfdbfe" stroke="${BLU}" stroke-width="1.2"/>`;
            }
          }
          out += TX(311, 180, '共用了 3 × 4 ＝ 12 個小正方形', { fs: 11.5, c: BLU, anchor: 'middle', fw: '900' });
          out += TX(311, 212, '鋪滿個數越多 ➔ 面積越大', { fs: 11.5, c: RED, anchor: 'middle', fw: '800' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '比較面積時，可以使用直接重疊，或是用相同大小的個別單位鋪滿來比對。',
        example: {
          q: '甲桌面鋪滿了 15 張墊板，乙桌面鋪滿了 18 張同樣的墊板，哪一個桌面的面積比較大？',
          steps: [
            '1. 墊板的大小完全相同，作為個別單位。',
            '2. 甲桌面使用了 15 張，乙桌面使用了 18 張。',
            '3. 18 ＞ 15，所以乙桌面的面積比較大。'
          ],
          ans: '乙桌面的面積比較大'
        }
      },

      {
        sec: '6-1', secName: '面積的直接比較與個別單位',
        title: '【破除迷思】周長 vs 面積：周長大，面積不一定大！',
        points: [
          '⚡ **致命迷思破解**：學生常把「周長（圍起來的長度）」與「面積（面的大小）」混為一談。',
          '觀察下面兩個圖形：<span style="color:#e11d48">紅色外框（周長）</span> 與 <span style="color:#d97706">黃色面（面積）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 420 185" style="max-width:100%">
              <!-- 圖形 A -->
              <g transform="translate(15, 10)">
                <rect width="185" height="165" rx="12" fill="#fafafa" stroke="#cbd5e1" stroke-width="1.8"/>
                <text x="92" y="26" text-anchor="middle" font-size="14" font-weight="900" fill="#1e293b">圖形 A (長條形)</text>
                
                <!-- 5x1 網格 (格長 26) -->
                <g transform="translate(27, 45)">
                  <!-- 面黃色 -->
                  <rect x="0" y="0" width="130" height="26" fill="#fef08a" stroke="#eab308" stroke-width="1"/>
                  <line x1="26" y1="0" x2="26" y2="26" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <line x1="52" y1="0" x2="52" y2="26" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <line x1="78" y1="0" x2="78" y2="26" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <line x1="104" y1="0" x2="104" y2="26" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <!-- 紅框周長 -->
                  <rect x="0" y="0" width="130" height="26" fill="none" stroke="#e11d48" stroke-width="3.5"/>
                </g>

                <rect x="20" y="90" width="145" height="60" rx="8" fill="#fff1f2" stroke="#fda4af" stroke-width="1.5"/>
                <text x="92" y="112" text-anchor="middle" font-size="12.5" font-weight="900" fill="#e11d48">周長：(5＋1)×2 ＝ 12 cm</text>
                <text x="92" y="138" text-anchor="middle" font-size="12.5" font-weight="900" fill="#d97706">面積：5 × 1 ＝ 5 cm²</text>
              </g>

              <!-- 圖形 B -->
              <g transform="translate(220, 10)">
                <rect width="185" height="165" rx="12" fill="#fafafa" stroke="#cbd5e1" stroke-width="1.8"/>
                <text x="92" y="26" text-anchor="middle" font-size="14" font-weight="900" fill="#1e293b">圖形 B (方塊形)</text>
                
                <!-- 3x2 網格 (格長 26) -->
                <g transform="translate(53, 40)">
                  <rect x="0" y="0" width="78" height="52" fill="#fef08a" stroke="#eab308" stroke-width="1"/>
                  <line x1="26" y1="0" x2="26" y2="52" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <line x1="52" y1="0" x2="52" y2="52" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <line x1="0" y1="26" x2="78" y2="26" stroke="#ca8a04" stroke-dasharray="2,2"/>
                  <rect x="0" y="0" width="78" height="52" fill="none" stroke="#e11d48" stroke-width="3.5"/>
                </g>

                <rect x="20" y="102" width="145" height="52" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
                <text x="92" y="122" text-anchor="middle" font-size="12.5" font-weight="900" fill="#e11d48">周長：(3＋2)×2 ＝ 10 cm</text>
                <text x="92" y="144" text-anchor="middle" font-size="12.5" font-weight="900" fill="#059669">面積：3 × 2 ＝ 6 cm²</text>
              </g>
            </svg>
          </div>`;
        },
        caption: '重大結論：圖形 A 周長 (12cm) 比 圖形 B (10cm) 長，但面積 (5cm²) 反而比 B (6cm²) 小！周長與面積完全不同！',
        example: {
          q: '阿亮用 12 公分的鐵絲圍成不同的形狀，圍出來的圖形面積一定都一樣大嗎？',
          steps: [
            '1. 鐵絲長度代表「周長」（12 公分）。',
            '2. 可以圍成 5×1 的長方形（面積 5 平方公分）。',
            '3. 也可以圍成 4×2 的長方形（面積 8 平方公分）或 3×3 的正方形（面積 9 平方公分）。',
            '4. 所以周長相同時，面積不一定一樣大！'
          ],
          ans: '不一定一樣大！周長相同時，圍成的形狀不同，面積也會隨之改變。'
        }
      },

      /* ==================== 6-2 1平方公分與網格測量 ==================== */
      {
        sec: '6-2', secName: '平方公分與平方公分板網格',
        title: '【平方公分】1平方公分網格畫布與圖形鋪滿測量器',
        points: [
          '**標準面積單位**：邊長 1 公分的正方形，面積是 <span class="k">1 平方公分 (cm²)</span>。',
          '請切換圖形（長方形、正方形、L型）。',
          '點擊鋪滿小方塊，觀察 \(1\\text{ cm}^2\) 平方公分板如何累加算出總面積！'
        ],
        formula: { label: '平方公分定義', tex: '1\\text{ cm} \\times 1\\text{ cm} = 1\\text{ 平方公分 (cm}^2)' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; background:#ecfdf5; border:1.5px solid #059669; border-radius:10px; padding:10px 14px; margin-bottom:10px;">
                <div style="font-size:14px; font-weight:900; color:#047857;">
                  目前圖形面積：<span id="areaResult" style="color:#e11d48; font-size:18px;">12</span> 平方公分 (cm²)
                </div>
                <div style="display:flex; gap:6px;">
                  <button class="ashape-btn active" data-type="rect" style="padding:4px 8px; border-radius:6px; border:1px solid #059669; background:#059669; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">長方形 (4x3)</button>
                  <button class="ashape-btn" data-type="square" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">正方形 (3x3)</button>
                  <button class="ashape-btn" data-type="lshape" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">L 型多邊形</button>
                </div>
              </div>

              <div id="gridAreaStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:180px; overflow:hidden;">
                <!-- 網格與圖形渲染區 -->
              </div>
            </div>
          `;

          let shapeType = 'rect';
          const stage = h.querySelector('#gridAreaStage');
          const resLabel = h.querySelector('#areaResult');
          const btns = h.querySelectorAll('.ashape-btn');

          function renderGrid() {
            const gridUnit = 28;
            const startX = 30, startY = 15;
            let cells = [];

            if (shapeType === 'rect') {
              for (let r = 0; r < 3; r++) { for (let c = 0; c < 4; c++) cells.push({ r, c }); }
            } else if (shapeType === 'square') {
              for (let r = 0; r < 3; r++) { for (let c = 0; c < 3; c++) cells.push({ r, c }); }
            } else {
              for (let r = 0; r < 4; r++) cells.push({ r, c: 0 });
              for (let r = 0; r < 4; r++) cells.push({ r, c: 1 });
              cells.push({ r: 3, c: 2 });
              cells.push({ r: 3, c: 3 });
            }

            resLabel.textContent = cells.length;
            let s = '';

            for (let r = 0; r < 5; r++) {
              for (let c = 0; c < 10; c++) {
                s += `<rect x="${startX + c * gridUnit}" y="${startY + r * gridUnit}" width="${gridUnit}" height="${gridUnit}" fill="none" stroke="#e2e8f0" stroke-width="1"/>`;
              }
            }

            cells.forEach((cell, idx) => {
              const cx = startX + cell.c * gridUnit;
              const cy = startY + cell.r * gridUnit;
              s += `<rect x="${cx}" y="${cy}" width="${gridUnit}" height="${gridUnit}" fill="rgba(5, 150, 105, 0.25)" stroke="#059669" stroke-width="1.8"/>`;
              s += `<text x="${cx + gridUnit / 2}" y="${cy + gridUnit / 2 + 4}" text-anchor="middle" font-size="11" font-weight="900" fill="#047857">${idx + 1}</text>`;
            });

            s += `<rect x="310" y="15" width="28" height="28" fill="rgba(225,29,72,0.2)" stroke="#e11d48" stroke-width="1.8"/>`;
            s += `<text x="324" y="32" text-anchor="middle" font-size="9" font-weight="900" fill="#e11d48">1cm²</text>`;
            s += `<text x="324" y="58" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">1平方公分</text>`;

            stage.innerHTML = `<svg viewBox="0 0 370 160" style="width:100%; height:100%;">${s}</svg>`;
          }

          btns.forEach(btn => {
            btn.onclick = () => {
              btns.forEach(b => { b.style.background = '#fff'; b.style.color = '#334155'; b.style.borderColor = '#cbd5e1'; });
              btn.style.background = '#059669'; btn.style.color = '#fff'; btn.style.borderColor = '#059669';
              shapeType = btn.dataset.type;
              renderGrid();
            };
          });

          renderGrid();
        },
        caption: '每一個小方格代表 1 平方公分 (1 cm²)，計算鋪滿了幾個小方格就知道面積。',
        example: {
          q: '拿邊長 1 公分的正方形小方塊去鋪滿一個圖形，剛好用了 16 個，這個圖形的面積是多少平方公分？',
          steps: [
            '1. 1 個小方塊的面積是 1 平方公分。',
            '2. 鋪滿圖形用了 16 個小方塊。',
            '3. 1 × 16 ＝ 16 平方公分。'
          ],
          ans: '16 平方公分'
        }
      },

      /* ==================== 6-3 面積的拼貼與計算 (升級版：半格旋轉拼湊動畫) ==================== */
      {
        sec: '6-3', secName: '面積的拼貼與計算',
        title: '【動態合體】2個半格三角形旋轉拼湊成 1 平方公分',
        points: [
          '**半格的處理**：2 個半格正方形（二分之一格）可以拼成 <span class="k">1 個滿格 (1 cm²)</span>。',
          '點擊下方「動態合體」按鈕，觀察右側半格如何旋轉合體成完整的正方形！',
          '**數方格原則**：先數整格，再把半格兩兩湊成 1 格累加。'
        ],
        formula: { label: '半格拼貼', tex: '2 \\text{ 個半格} = 1 \\text{ 個滿格 (1 cm}^2)' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="font-size:13.5px; font-weight:900; color:#047857;">半格旋轉合體動態演示：</div>
                <button id="mergeTriBtn" style="padding:4px 12px; border-radius:6px; border:none; background:linear-gradient(120deg,#059669,#2563eb); color:#fff; font-weight:900; font-size:12px; cursor:pointer;">⚡ 點擊：半格動態旋轉合體</button>
              </div>

              <div id="halfMergeStage" style="position:relative; background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:10px; height:185px; overflow:hidden;">
                <!-- 旋轉合體動畫區 -->
              </div>
            </div>
          `;

          let isMerged = false;
          const btn = h.querySelector('#mergeTriBtn');
          const stage = h.querySelector('#halfMergeStage');

          function renderMerge() {
            let s = '';
            const sz = 55;
            const leftX = 70, leftY = 55;
            const rightX = isMerged ? 70 : 170;
            const rightY = leftY;

            // 左邊固定半格 (左下三角形)
            s += `<polygon points="${leftX},${leftY} ${leftX + sz},${leftY + sz} ${leftX},${leftY + sz}" fill="#fef08a" stroke="#d97706" stroke-width="2"/>`;
            s += TX(leftX + 16, leftY + 38, '½', { fs: 14, c: '#b45309', fw: '900' });

            // 右邊移動半格 (右上三角形 ➔ 動態移動旋轉貼合)
            s += `<g transform="translate(${rightX}, ${rightY}) ${isMerged ? '' : ''}">`;
            s += `<polygon points="${isMerged ? '0,0 55,0 55,55' : '0,0 55,0 55,55'}" fill="#fef08a" stroke="#d97706" stroke-width="2" style="transition: transform 0.6s ease;"/>`;
            s += TX(isMerged ? 38 : 38, isMerged ? 20 : 20, '½', { fs: 14, c: '#b45309', fw: '900' });
            s += `</g>`;

            // 加號與等號說明
            if (!isMerged) {
              s += TX(140, leftY + 33, '＋', { fs: 22, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(250, leftY + 33, '＝ ?', { fs: 20, c: RED, anchor: 'middle', fw: '900' });
              s += TX(310, leftY + 33, '點擊按鈕合體', { fs: 11.5, c: '#64748b', anchor: 'middle' });
            } else {
              s += `<rect x="${leftX}" y="${leftY}" width="${sz}" height="${sz}" fill="none" stroke="${RED}" stroke-width="2.5" rx="2"/>`;
              s += TX(220, leftY + 33, '＝ 1 平方公分 (1 cm²)', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
            }

            s += `<rect x="20" y="145" width="330" height="25" rx="6" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>`;
            const tipText = isMerged ? '✅ 2 個 ½ 半格合體成 1 個完整的 1 cm² 正方形！' : '💡 點擊右上角按鈕，觀察 2 個半格如何合體。';
            s += TX(185, 161, tipText, { fs: 12, c: isMerged ? RED : '#334155', anchor: 'middle', fw: '900' });

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          btn.onclick = () => {
            isMerged = !isMerged;
            btn.textContent = isMerged ? '↺ 還原分開半格' : '⚡ 點擊：半格動態旋轉合體';
            renderMerge();
          };

          renderMerge();
        },
        caption: '遇到半格時，可將 2 個半格組合成 1 平方公分，再與整格面積相加。',
        example: {
          q: '一個圖形包含 8 個整格和 4 個半格，這個圖形的面積是多少平方公分？',
          steps: [
            '1. 整格部分：8 個整格 ＝ 8 平方公分。',
            '2. 半格部分：4 個半格 ＝ 4 ÷ 2 ＝ 2 平方公分。',
            '3. 總面積：8 ＋ 2 ＝ 10 平方公分。'
          ],
          ans: '10 平方公分'
        }
      }
    ]
  });
})();
