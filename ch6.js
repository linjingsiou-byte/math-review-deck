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
        title: '【互動找反例】周長相同時，面積不一定相同！',
        points: [
          '⚡ **致命迷思破解**：「周長大，面積就一定大」——這是錯的！',
          '拉動下方滑桿，固定「周長 = 24 cm」，調整長邊，觀察面積如何改變！',
          '找出讓面積最大（或最小）的形狀，驗證<span class="k">周長相同，面積不同</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px; text-align:center;">
                <div style="background:#fff1f2; border:2px solid #e11d48; border-radius:10px; padding:8px;">
                  <div style="font-size:11px; font-weight:800; color:#9f1239;">周長 (固定)</div>
                  <div style="font-size:22px; font-weight:900; color:#e11d48;">24 cm</div>
                </div>
                <div id="areaDisplay" style="background:#f0fdf4; border:2px solid #059669; border-radius:10px; padding:8px;">
                  <div style="font-size:11px; font-weight:800; color:#065f46;">面積 (變化中!)</div>
                  <div id="areaNum" style="font-size:22px; font-weight:900; color:#059669;">— cm²</div>
                </div>
              </div>
              <div id="perimStage" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:160px;"></div>
              <div class="ictrl" style="margin-top:10px;">
                <label style="font-weight:800;">長邊：<span id="lenVal" style="color:#2563eb; font-weight:900;">10</span> cm（短邊自動 = <span id="shortVal">2</span> cm）</label>
                <input type="range" id="lenSlider" min="2" max="11" step="1" value="10" style="width:100%; accent-color:#2563eb;">
              </div>
              <div id="perimTip" style="margin-top:6px; background:#fef3c7; border:1.5px solid #d97706; border-radius:8px; padding:6px 10px; font-size:12.5px; font-weight:800; color:#92400e; display:none;"></div>
            </div>
          `;

          const lenSlider = h.querySelector('#lenSlider');
          const lenVal = h.querySelector('#lenVal');
          const shortVal = h.querySelector('#shortVal');
          const areaNum = h.querySelector('#areaNum');
          const stage = h.querySelector('#perimStage');
          const tip = h.querySelector('#perimTip');

          // 記錄最小最大面積用於比較
          let maxArea = 0, minArea = 99999;

          function renderPerim() {
            const L = parseInt(lenSlider.value, 10);
            const W = 12 - L; // 周長 24 = 2*(L+W)，故 L+W=12
            const area = L * W;
            lenVal.textContent = L;
            shortVal.textContent = W;
            areaNum.textContent = `${area} cm²`;

            if (area > maxArea) maxArea = area;
            if (area < minArea) minArea = area;

            // 繪製矩形
            const maxW = 280, maxH = 130;
            const scale = Math.min(maxW / (L * 12), maxH / (W * 12), 8);
            const rW = Math.round(L * scale * 10);
            const rH = Math.round(W * scale * 10);
            const rx = (350 - rW) / 2;
            const ry = (145 - rH) / 2;

            // 格線（單位格）
            let gridLines = '';
            for (let gi = 1; gi < L; gi++) {
              gridLines += `<line x1="${rx + gi * rW / L}" y1="${ry}" x2="${rx + gi * rW / L}" y2="${ry + rH}" stroke="#fde68a" stroke-width="0.8"/>`;
            }
            for (let gi = 1; gi < W; gi++) {
              gridLines += `<line x1="${rx}" y1="${ry + gi * rH / W}" x2="${rx + rW}" y2="${ry + gi * rH / W}" stroke="#fde68a" stroke-width="0.8"/>`;
            }

            let out = '';
            // 面積填充
            out += `<rect x="${rx}" y="${ry}" width="${rW}" height="${rH}" fill="#fef08a" stroke="#eab308" stroke-width="1"/>`;
            out += gridLines;
            // 周長邊框
            out += `<rect x="${rx}" y="${ry}" width="${rW}" height="${rH}" fill="none" stroke="#e11d48" stroke-width="3"/>`;

            // 尺寸標註
            out += `<text x="${rx + rW/2}" y="${ry - 6}" text-anchor="middle" font-size="13" font-weight="900" fill="#1d4ed8">${L} cm</text>`;
            out += `<text x="${rx - 6}" y="${ry + rH/2 + 4}" text-anchor="end" font-size="13" font-weight="900" fill="#1d4ed8">${W} cm</text>`;

            // 公式
            out += `<text x="175" y="140" text-anchor="middle" font-size="12.5" font-weight="900" fill="#0f172a">${L} × ${W} = ${area} cm²（面積）</text>`;

            stage.innerHTML = `<svg viewBox="0 0 350 150" style="width:100%; height:100%;">${out}</svg>`;

            // 提示語
            if (W <= 1) {
              tip.style.display = 'block';
              tip.innerHTML = `⚠️ 長邊 ${L} cm × 短邊 ${W} cm → 面積 ${area} cm²，超細長的形狀面積最小！`;
            } else if (L === 6) {
              tip.style.display = 'block';
              tip.innerHTML = `✨ 正方形！6 × 6 = 36 cm² → 同周長下，正方形的面積最大！`;
            } else {
              tip.style.display = 'none';
            }
          }

          lenSlider.oninput = renderPerim;
          renderPerim();
        },
        caption: '重大結論：周長相同（都是24cm），長寬不同時面積也不同！最大面積是正方形（6×6=36cm²），最小是最細長的形狀。',
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
              <div style="display:flex; justify-content:space-between; align-items:center; background:#ecfdf5; border:1.5px solid #059669; border-radius:10px; padding:8px 12px; margin-bottom:8px;">
                <div style="font-size:13.5px; font-weight:900; color:#047857;">
                  已鋪滿：<span id="filledCount" style="color:#e11d48; font-size:18px;">0</span> / <span id="totalCells">12</span> cm²
                </div>
                  <button class="ashape-btn active" data-type="rect" style="padding:4px 8px; border-radius:6px; border:1px solid #059669; background:#059669; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">長方形 (4x3)</button>
                  <button class="ashape-btn" data-type="square" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">正方形 (3x3)</button>
                  <button class="ashape-btn" data-type="L-shape" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">L 型多邊形</button>
                  <button class="ashape-btn" data-type="tri" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">📐 含半格三角形 (5cm²)</button>
                </div>
              </div>

              <div id="gridAreaStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:8px; height:175px; overflow:hidden;">
                <!-- 網格與圖形渲染區 -->
              </div>

              <div class="ictrl" style="margin-top:6px; display:flex; justify-content:center; gap:8px;">
                <button id="addTileBtn" style="padding:5px 14px; border-radius:8px; border:1.5px solid #059669; background:#ecfdf5; color:#059669; font-weight:900; font-size:13px; cursor:pointer;">🧩 點擊鋪滿 1 格 (1 cm²)</button>
                <button id="fillAllBtn" style="padding:5px 14px; border-radius:8px; border:1.5px solid #2563eb; background:#eff6ff; color:#2563eb; font-weight:900; font-size:13px; cursor:pointer;">✨ 全部自動鋪滿</button>
                <button id="resetTileBtn" style="padding:5px 14px; border-radius:8px; border:1.5px solid #cbd5e1; background:#fff; color:#64748b; font-weight:800; font-size:13px; cursor:pointer;">🔄 重置清除</button>
              </div>
            </div>
          `;

          let shapeType = 'rect';
          let filledCount = 0;
          const stage = h.querySelector('#gridAreaStage');
          const filledLabel = h.querySelector('#filledCount');
          const totalLabel = h.querySelector('#totalCells');
          const btns = h.querySelectorAll('.ashape-btn');
          const addBtn = h.querySelector('#addTileBtn');
          const fillBtn = h.querySelector('#fillAllBtn');
          const resetBtn = h.querySelector('#resetTileBtn');

          function getShapeCells() {
            let cells = [];
            if (shapeType === 'rect') {
              for (let r = 0; r < 3; r++) { for (let c = 0; c < 4; c++) cells.push({ r, c }); }
            } else if (shapeType === 'square') {
              for (let r = 0; r < 3; r++) { for (let c = 0; c < 3; c++) cells.push({ r, c }); }
            } else if (shapeType === 'L-shape') {
              for (let r = 0; r < 4; r++) cells.push({ r, c: 0 });
              for (let r = 0; r < 4; r++) cells.push({ r, c: 1 });
              cells.push({ r: 3, c: 2 });
              cells.push({ r: 3, c: 3 });
            } else {
              // 含有 2 個半格 (三角形) 的複合圖形：4 個整格 + 2 個半格 (= 5 cm²)
              for (let r = 0; r < 2; r++) { for (let c = 0; c < 2; c++) cells.push({ r, c, isHalf: false }); }
              cells.push({ r: 2, c: 0, isHalf: true, dir: 'TL' });
              cells.push({ r: 2, c: 1, isHalf: true, dir: 'TR' });
            }
            return cells;
          }

          function renderGrid() {
            const cells = getShapeCells();
            const totalArea = cells.reduce((sum, c) => sum + (c.isHalf ? 0.5 : 1), 0);
            
            // 計算目前已被鋪滿的累積面積
            let currentFilledArea = 0;
            for (let i = 0; i < filledCount && i < cells.length; i++) {
              currentFilledArea += cells[i].isHalf ? 0.5 : 1;
            }

            totalLabel.textContent = totalArea;
            filledLabel.textContent = currentFilledArea;

            const gridUnit = 28;
            const startX = 30, startY = 15;
            let s = '';

            // 背景 1cm² 網格
            for (let r = 0; r < 5; r++) {
              for (let c = 0; c < 10; c++) {
                s += `<rect x="${startX + c * gridUnit}" y="${startY + r * gridUnit}" width="${gridUnit}" height="${gridUnit}" fill="none" stroke="#e2e8f0" stroke-width="1"/>`;
              }
            }

            // 圖形輪廓與鋪滿格
            cells.forEach((cell, idx) => {
              const cx = startX + cell.c * gridUnit;
              const cy = startY + cell.r * gridUnit;
              const isFilled = idx < filledCount;
              const fillColor = isFilled ? 'rgba(5, 150, 105, 0.45)' : '#f8fafc';
              const strokeColor = isFilled ? '#059669' : '#94a3b8';
              const sw = isFilled ? '2' : '1.2';

              s += `<g cursor="pointer" class="cell-g" data-idx="${idx}">`;

              if (cell.isHalf) {
                // 畫半格對角三角形 (0.5 cm²)
                let pts = '';
                if (cell.dir === 'TL') {
                  pts = `${cx},${cy} ${cx + gridUnit},${cy} ${cx},${cy + gridUnit}`;
                } else {
                  pts = `${cx},${cy} ${cx + gridUnit},${cy} ${cx + gridUnit},${cy + gridUnit}`;
                }
                s += `<polygon points="${pts}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${sw}"/>`;
                
                const tx = cell.dir === 'TL' ? cx + gridUnit * 0.35 : cx + gridUnit * 0.65;
                const ty = cy + gridUnit * 0.45;
                if (isFilled) {
                  s += `<text x="${tx}" y="${ty}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#047857">0.5</text>`;
                } else {
                  s += `<text x="${tx}" y="${ty}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#94a3b8">+0.5</text>`;
                }
              } else {
                // 畫正方形完整格 (1 cm²)
                s += `<rect x="${cx}" y="${cy}" width="${gridUnit}" height="${gridUnit}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${sw}"/>`;
                if (isFilled) {
                  s += `<text x="${cx + gridUnit / 2}" y="${cy + gridUnit / 2 + 4}" text-anchor="middle" font-size="11" font-weight="900" fill="#047857">${idx + 1}</text>`;
                } else {
                  s += `<text x="${cx + gridUnit / 2}" y="${cy + gridUnit / 2 + 4}" text-anchor="middle" font-size="9" font-weight="700" fill="#94a3b8">+1</text>`;
                }
              }
              s += `</g>`;
            });

            // 右側 1cm² 說明與成就卡
            s += `<g transform="translate(305, 15)">`;
            s += `<rect x="0" y="0" width="35" height="35" fill="rgba(225,29,72,0.15)" stroke="#e11d48" stroke-width="2" rx="4"/>`;
            s += `<text x="17.5" y="22" text-anchor="middle" font-size="11" font-weight="900" fill="#e11d48">1cm²</text>`;
            s += `<text x="17.5" y="50" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">1平方公分</text>`;

            if (currentFilledArea === totalArea) {
              s += `<rect x="-10" y="70" width="70" height="42" fill="#ecfdf5" stroke="#059669" stroke-width="2" rx="8"/>`;
              s += `<text x="25" y="88" text-anchor="middle" font-size="11" font-weight="900" fill="#059669">🎉 成功鋪滿</text>`;
              s += `<text x="25" y="104" text-anchor="middle" font-size="12" font-weight="900" fill="#e11d48">${totalArea} cm²！</text>`;
            }
            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 380 160" style="width:100%; height:100%;">${s}</svg>`;

            // 幫圖形上的每格綁定點擊鋪滿
            stage.querySelectorAll('.cell-g').forEach(g => {
              g.onclick = () => {
                const targetIdx = parseInt(g.dataset.idx, 10);
                if (targetIdx >= filledCount) {
                  filledCount = targetIdx + 1;
                } else {
                  filledCount = targetIdx;
                }
                renderGrid();
              };
            });
          }

          btns.forEach(btn => {
            btn.onclick = () => {
              btns.forEach(b => { b.style.background = '#fff'; b.style.color = '#334155'; b.style.borderColor = '#cbd5e1'; });
              btn.style.background = '#059669'; btn.style.color = '#fff'; btn.style.borderColor = '#059669';
              shapeType = btn.dataset.type;
              filledCount = 0;
              renderGrid();
            };
          });

          addBtn.onclick = () => {
            const total = getShapeCells().length;
            if (filledCount < total) { filledCount++; renderGrid(); }
          };

          fillBtn.onclick = () => {
            filledCount = getShapeCells().length;
            renderGrid();
          };

          resetBtn.onclick = () => {
            filledCount = 0;
            renderGrid();
          };

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
