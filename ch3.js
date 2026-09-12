/* ============ 第 3 章　毫米 (mm) ============
   依康軒國小 3 上第 3 單元：
   3-1 認識毫米 (mm)
   3-2 長度的換算與比較
   3-3 長度的加減計算
   對應課綱代碼：n-II-1 理解長度單位「毫米」，並能作長度之實測、估測、比較、換算與加減計算。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#059669'; // 翡翠綠主調 (Chapter 3 毫米)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 3,
    title: '毫米',
    color: C,
    sections: ['3-1 認識毫米 (mm)', '3-2 長度的換算與比較', '3-3 長度的加減計算'],
    slides: [

      /* ==================== 3-1 認識毫米 (mm) ==================== */
      {
        sec: '3-1', secName: '認識毫米 (mm)',
        title: '直尺上 1 公分分成 10 小格，每 1 小格就是 1 毫米',
        points: [
          '測量較薄或較短物品的長度時，使用更小的長度單位：<span class="k">毫米 (mm)</span>。',
          '直尺上 1 公分 (cm) 平均分成 10 小格，<span class="k">每 1 小格長度就是 1 毫米 (1 mm)</span>。',
          '單位關係：\\(1\\text{ cm} = 10\\text{ mm}\\)。',
          '生活範例：10 塊 1 元硬幣疊起來厚度約 <span class="k">15 mm</span>、健保卡/信用卡厚度約 <span class="k">1 mm</span>。'
        ],
        formula: { label: '公分與毫米關係', tex: '1\\text{ cm} = 10\\text{ mm}' },
        visual: (h) => {
          let out = '';
          out += BOX(20, 20, 380, 100, { fill: '#f8fafc', stroke: '#94a3b8', r: 8 });
          out += TX(30, 40, '刻度直尺 (放大圖解)', { fs: 13, c: '#64748b' });

          const startX = 60;
          for (let mm = 0; mm <= 25; mm++) {
            const x = startX + mm * 12;
            let tickH = 15;
            let strokeW = 1.2;
            let strokeC = '#64748b';

            if (mm % 10 === 0) {
              tickH = 35; strokeW = 2.2; strokeC = '#0f172a';
              const cmVal = mm / 10;
              out += TX(x, 105, cmVal.toString(), { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
            } else if (mm % 5 === 0) {
              tickH = 24; strokeW = 1.8; strokeC = '#334155';
            }
            out += `<line x1="${x}" y1="50" x2="${x}" y2="${50 + tickH}" stroke="${strokeC}" stroke-width="${strokeW}"/>`;
          }

          out += `<rect x="${startX + 3 * 12}" y="48" width="12" height="40" fill="rgba(225,29,72,0.2)" stroke="${RED}" stroke-width="1.8" rx="2"/>`;
          out += `<line x1="${startX + 3.5 * 12}" y1="88" x2="${startX + 3.5 * 12}" y2="125" stroke="${RED}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
          out += BOX(startX + 3.5 * 12 - 45, 125, 90, 26, { fill: RED, stroke: 'none', r: 13 });
          out += TX(startX + 3.5 * 12, 143, '1 毫米 (1 mm)', { fs: 12, c: '#fff', anchor: 'middle', fw: '900' });

          out += BOX(20, 165, 380, 85, { fill: '#ecfdf5', stroke: GRN, r: 10 });
          out += TX(35, 190, '💳 健保卡/信用卡厚度 ≒ 1 mm', { fs: 14, c: GRN, fw: '900' });
          out += TX(35, 215, '🪙 10 塊 1 元硬幣疊高 ≒ 15 mm (1 cm 5 mm)', { fs: 14, c: '#047857', fw: '800' });
          out += TX(35, 238, '🪙 1 塊 1 元硬幣厚度 ≒ 1.5 mm', { fs: 13, c: '#059669', fw: '700' });

          h.innerHTML = svg('0 0 420 265', out);
        },
        caption: '直尺上最小的 1 小格就是 1 毫米 (mm)，1 公分包含了 10 個 1 毫米。',
        example: {
          q: '測量一塊錢硬幣的厚度約是 1.5 毫米還是 1.5 公分？',
          steps: [
            '1. 1 公分 (cm) 約是手指的寬度，相當於 10 毫米。',
            '2. 1 毫米 (mm) 約是一張信用卡的厚度。',
            '3. 1 塊錢硬幣相當薄，厚度約為 1.5 毫米。'
          ],
          ans: '1.5 毫米'
        }
      },

      /* ==================== 3-1 互動教具：放大鏡直尺實測模擬器 (升級版：支援移開 0 刻度實測) ==================== */
      {
        sec: '3-1', secName: '認識毫米 (mm)',
        title: '【實測體驗】用直尺與放大鏡，精準量出物品長度 (含移開0刻度實測)',
        points: [
          '**對齊 0 刻度**：長度即為右端刻度。',
          '⚡ **移開 0 刻度**：<span class="k">長度 ＝ 右端刻度 － 左端刻度</span>（破解只看右端數字的迷思！）。',
          '請切換模式與物品，拖動滑桿移動「放大鏡」，觀察細微毫米刻度！'
        ],
        formula: { label: '長度實測公式', tex: '\\text{物品長度} = \\text{右端刻度} - \\text{左端刻度}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                <div style="display:flex; gap:6px; align-items:center;">
                  <span style="font-size:12.5px; font-weight:800; color:#0f172a;">物品：</span>
                  <button class="mitem-btn active" data-len="45" data-name="橡皮擦" style="padding:3px 8px; border-radius:6px; border:1px solid #059669; background:#059669; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">橡皮擦(45mm)</button>
                  <button class="mitem-btn" data-len="28" data-name="迴紋針" style="padding:3px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">迴紋針(28mm)</button>
                  <button class="mitem-btn" data-len="63" data-name="短鉛筆" style="padding:3px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">短鉛筆(63mm)</button>
                </div>
                <div style="display:flex; gap:6px;">
                  <button id="alignZeroBtn" style="padding:3px 8px; border-radius:6px; border:1px solid #059669; background:#059669; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">【對齊 0 刻度】</button>
                  <button id="shiftZeroBtn" style="padding:3px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">⚡【移開 0 刻度】</button>
                </div>
              </div>

              <div id="rulerStage" style="position:relative; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:185px; overflow:hidden;">
                <!-- SVG 主繪圖區由 JS 渲染 -->
              </div>

              <div class="ictrl" style="margin-top:6px;">
                <label>🔍 放大鏡探針位置：<span class="ival" id="magVal">45</span> mm</label>
                <input type="range" id="magRange" min="0" max="80" value="45" step="1" style="width:100%;">
              </div>
            </div>
          `;

          let currentLen = 45;
          let currentName = '橡皮擦';
          let offsetMm = 0; // 0 or 20 mm
          let probeMm = 45;

          const stage = h.querySelector('#rulerStage');
          const range = h.querySelector('#magRange');
          const valLabel = h.querySelector('#magVal');
          const btns = h.querySelectorAll('.mitem-btn');
          const alignBtn = h.querySelector('#alignZeroBtn');
          const shiftBtn = h.querySelector('#shiftZeroBtn');

          function renderRuler() {
            valLabel.textContent = probeMm;
            const pxPerMm = 3.6; // 0 ~ 80 mm = 288 px
            const startX = 35;
            const rulerY = 65;

            let s = '';

            // 1. 直尺主體 (0 ~ 8 cm = 80 mm)
            s += `<rect x="${startX - 10}" y="${rulerY}" width="${80 * pxPerMm + 20}" height="65" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.8" rx="6"/>`;

            // 直尺刻度
            for (let mm = 0; mm <= 80; mm++) {
              const x = startX + mm * pxPerMm;
              let h = 10;
              let color = '#64748b';
              let sw = 1;

              if (mm % 10 === 0) {
                h = 24; color = '#0f172a'; sw = 1.8;
                s += `<text x="${x}" y="${rulerY + 42}" text-anchor="middle" font-size="12" font-weight="900" fill="#0f172a">${mm / 10}</text>`;
              } else if (mm % 5 === 0) {
                h = 16; color = '#334155'; sw = 1.4;
              }

              s += `<line x1="${x}" y1="${rulerY}" x2="${x}" y2="${rulerY + h}" stroke="${color}" stroke-width="${sw}"/>`;
            }
            s += `<text x="${startX + 80 * pxPerMm + 8}" y="${rulerY + 55}" font-size="10" font-weight="800" fill="#64748b">cm</text>`;

            // 2. 物品放置位置 (加上 offsetMm)
            const itemLeftX = startX + offsetMm * pxPerMm;
            const itemW = currentLen * pxPerMm;
            const itemY = rulerY - 30;

            s += `<rect x="${itemLeftX}" y="${itemY}" width="${itemW}" height="26" fill="#fda4af" stroke="${RED}" stroke-width="1.8" rx="4"/>`;
            s += `<text x="${itemLeftX + itemW / 2}" y="${itemY + 17}" text-anchor="middle" font-size="11" font-weight="900" fill="#0f172a">${currentName} (${currentLen} mm)</text>`;

            // 起點與終點對齊虛線
            s += `<line x1="${itemLeftX}" y1="${itemY}" x2="${itemLeftX}" y2="${rulerY + 45}" stroke="${GRN}" stroke-width="1.8" stroke-dasharray="3 3"/>`;
            s += `<line x1="${itemLeftX + itemW}" y1="${itemY}" x2="${itemLeftX + itemW}" y2="${rulerY + 45}" stroke="${RED}" stroke-width="1.8" stroke-dasharray="3 3"/>`;

            if (offsetMm > 0) {
              s += `<text x="${itemLeftX}" y="${rulerY - 36}" text-anchor="middle" font-size="11" font-weight="900" fill="${GRN}">左端: ${offsetMm}mm</text>`;
              s += `<text x="${itemLeftX + itemW}" y="${rulerY - 36}" text-anchor="middle" font-size="11" font-weight="900" fill="${RED}">右端: ${offsetMm + currentLen}mm</text>`;
            }

            // 3. 探針紅線
            const probeX = startX + probeMm * pxPerMm;
            s += `<line x1="${probeX}" y1="15" x2="${probeX}" y2="145" stroke="${BLU}" stroke-width="2"/>`;

            // 4. 🔍 放大鏡畫面 (右上角 305, 60，直徑 90px)
            const cx = 310, cy = 60, cr = 44;
            s += `<circle cx="${cx}" cy="${cy}" r="${cr}" fill="#fff" stroke="${GRN}" stroke-width="3.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>`;

            const zoomK = 2.4;
            for (let dmm = -5; dmm <= 5; dmm++) {
              const curMm = probeMm + dmm;
              if (curMm < 0 || curMm > 80) continue;
              const zx = cx + dmm * pxPerMm * zoomK;
              if (zx < cx - cr + 4 || zx > cx + cr - 4) continue;

              let zh = 12; let zc = '#64748b'; let zsw = 1.5;
              if (curMm % 10 === 0) {
                zh = 26; zc = '#0f172a'; zsw = 2.5;
                s += `<text x="${zx}" y="${cy + 22}" text-anchor="middle" font-size="11" font-weight="900" fill="#0f172a">${curMm / 10}</text>`;
              } else if (curMm % 5 === 0) {
                zh = 18; zc = '#334155'; zsw = 2;
              }
              s += `<line x1="${zx}" y1="${cy - 18}" x2="${zx}" y2="${cy - 18 + zh}" stroke="${zc}" stroke-width="${zsw}"/>`;
            }
            s += `<line x1="${cx}" y1="${cy - cr + 4}" x2="${cx}" y2="${cy + cr - 4}" stroke="${RED}" stroke-width="2" stroke-dasharray="2 2"/>`;

            // 下方計算卡片 (特別是移開 0 刻度時)
            const rightMm = offsetMm + currentLen;
            let calcDesc = '';
            if (offsetMm === 0) {
              calcDesc = `左端對齊 0 刻度 ➔ 長度 ＝ 右端刻度 ＝ ${currentLen} mm`;
            } else {
              calcDesc = `⚡ 移開0刻度解法：右端 (${rightMm}mm) － 左端 (${offsetMm}mm) ＝ ${currentLen} mm`;
            }
            s += `<rect x="25" y="145" width="325" height="24" rx="6" fill="${offsetMm > 0 ? '#fff1f2' : '#ecfdf5'}" stroke="${offsetMm > 0 ? RED : GRN}" stroke-width="1.2"/>`;
            s += `<text x="187" y="161" text-anchor="middle" font-size="11.5" font-weight="900" fill="${offsetMm > 0 ? RED : GRN}">${calcDesc}</text>`;

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          btns.forEach(btn => {
            btn.onclick = () => {
              btns.forEach(b => { b.style.background = '#fff'; b.style.color = '#334155'; b.style.borderColor = '#cbd5e1'; });
              btn.style.background = '#059669'; btn.style.color = '#fff'; btn.style.borderColor = '#059669';
              currentLen = parseInt(btn.dataset.len, 10);
              currentName = btn.dataset.name;
              probeMm = offsetMm + currentLen;
              range.value = probeMm;
              renderRuler();
            };
          });

          alignBtn.onclick = () => {
            offsetMm = 0;
            alignBtn.style.background = '#059669'; alignBtn.style.color = '#fff'; alignBtn.style.borderColor = '#059669';
            shiftBtn.style.background = '#fff'; shiftBtn.style.color = '#334155'; shiftBtn.style.borderColor = '#cbd5e1';
            probeMm = currentLen;
            range.value = probeMm;
            renderRuler();
          };

          shiftBtn.onclick = () => {
            offsetMm = 20; // 移至 20 mm (2 cm) 處
            shiftBtn.style.background = '#e11d48'; shiftBtn.style.color = '#fff'; shiftBtn.style.borderColor = '#e11d48';
            alignBtn.style.background = '#fff'; alignBtn.style.color = '#334155'; alignBtn.style.borderColor = '#cbd5e1';
            probeMm = offsetMm + currentLen;
            range.value = probeMm;
            renderRuler();
          };

          range.oninput = () => {
            probeMm = parseInt(range.value, 10);
            renderRuler();
          };

          renderRuler();
        },
        caption: '遇到起點未對齊 0 刻度時，物品長度等於「右端刻度減去左端刻度」。',
        example: {
          q: '將橡皮擦左端放在 2 公分刻度處，右端落在 6 公分 5 毫米，橡皮擦長幾毫米？',
          steps: [
            '1. 左端刻度：2 公分 ＝ 20 毫米。',
            '2. 右端刻度：6 公分 5 毫米 ＝ 65 毫米。',
            '3. 長度計算：65 毫米 － 20 毫米 ＝ 45 毫米。'
          ],
          ans: '45 毫米'
        }
      },

      /* ==================== 3-2 長度的換算與比較 ==================== */
      {
        sec: '3-2', secName: '長度的換算與比較',
        title: '幾公分幾毫米與幾毫米的快速雙向互換',
        points: [
          '**複名數轉單名數**：1 公分 ＝ 10 毫米。',
          '例如：\\(3\\text{ cm } 7\\text{ mm} = 30\\text{ mm} + 7\\text{ mm} = 37\\text{ mm}\\)。',
          '**單名數轉複名數**：十位數即為公分，個位數即為毫米。',
          '例如：\\(58\\text{ mm} = 50\\text{ mm} + 8\\text{ mm} = 5\\text{ cm } 8\\text{ mm}\\)。',
          '**長度比較**：先將單位統一化為「毫米」，比較數字大小即可。'
        ],
        formula: { label: '單位換算法則', tex: 'A\\text{ cm } B\\text{ mm} = (A \\times 10 + B)\\text{ mm}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 390, 110, { fill: '#f0fdf4', stroke: GRN, r: 12 });
          out += TX(210, 40, '🔄 長度單位換算秘訣', { fs: 16, c: GRN, anchor: 'middle', fw: '900' });

          out += BOX(30, 55, 170, 55, { fill: '#fff', stroke: '#a7f3d0', r: 8 });
          out += TX(115, 75, '4 cm 2 mm', { fs: 14, c: '#065f46', anchor: 'middle', fw: '900' });
          out += TX(115, 96, '↓ 40 mm + 2 mm = 42 mm', { fs: 12, c: GRN, anchor: 'middle' });

          out += BOX(215, 55, 170, 55, { fill: '#fff', stroke: '#a7f3d0', r: 8 });
          out += TX(300, 75, '69 mm', { fs: 14, c: '#065f46', anchor: 'middle', fw: '900' });
          out += TX(300, 96, '↓ 60 mm + 9 mm = 6 cm 9 mm', { fs: 12, c: GRN, anchor: 'middle' });

          out += BOX(15, 140, 390, 105, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(210, 165, '⚖️ 長度大小比較範例', { fs: 15, c: BLU, anchor: 'middle', fw: '900' });
          out += TX(35, 192, '比較 5 cm 3 mm 與 49 mm 的大小：', { fs: 13, c: '#1e3a8a', fw: '800' });
          out += TX(35, 215, '法一 (換毫米)：5 cm 3 mm ＝ 53 mm，53 mm ＞ 49 mm', { fs: 13, c: RED, fw: '800' });
          out += TX(35, 235, '結論：5 cm 3 mm  ＞  49 mm', { fs: 14, c: '#0f172a', fw: '900' });

          h.innerHTML = svg('0 0 420 260', out);
        },
        caption: '換算時只要記住「1 公分 ＝ 10 毫米」，公分數直接乘以 10 即可換成毫米。',
        example: {
          q: '小明的鉛筆長 8 公分 4 毫米，小華的鉛筆長 79 毫米，誰的鉛筆比較長？長多少毫米？',
          steps: [
            '1. 小明的鉛筆：8 cm 4 mm ＝ 80 mm ＋ 4 mm ＝ 84 mm。',
            '2. 小華的鉛筆：79 mm。',
            '3. 84 mm ＞ 79 mm，所以小明的比較長。',
            '4. 相差：84 － 79 ＝ 5 (mm)。'
          ],
          ans: '小明的比較長，長 5 毫米'
        }
      },

      /* ==================== 3-2 互動教具：長度換算與位值拆解推演器 ==================== */
      {
        sec: '3-2', secName: '長度的換算與比較',
        title: '【動態拆解】拉動公分與毫米，觀察雙向單位轉換',
        points: [
          '拉動下方「公分 (cm)」與「毫米 (mm)」滑桿。',
          '觀察動態圖解如何把公分拆成每 10 mm 一組，算出總毫米數！',
          '掌握公分與毫米之間的位值對應關係。'
        ],
        formula: { label: '雙向單位轉換', tex: 'X\\text{ cm } Y\\text{ mm} \\iff (X \\times 10 + Y)\\text{ mm}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="background:#f0fdf4; border:1.5px solid #059669; border-radius:12px; padding:14px; text-align:center; margin-bottom:12px;">
                <div style="font-size:13px; font-weight:800; color:#047857;">當前設定長度：</div>
                <div style="font-size:24px; font-weight:900; color:#0f172a; margin:4px 0;">
                  <span id="dispCm" style="color:#059669;">3</span> 公分 
                  <span id="dispMm" style="color:#e11d48;">7</span> 毫米
                  ＝ <span id="dispTotal" style="color:#2563eb;">37</span> 毫米 (mm)
                </div>
              </div>

              <div id="convertCalcStage" style="background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px; min-height:120px;">
                <!-- 拆解計算區由 JS 渲染 -->
              </div>

              <div style="margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="ictrl">
                  <label>公分 (cm)：<span class="ival" id="cmVal">3</span></label>
                  <input type="range" id="cmSlider" min="0" max="10" value="3" step="1" style="width:100%;">
                </div>
                <div class="ictrl">
                  <label>毫米 (mm)：<span class="ival" id="mmVal">7</span></label>
                  <input type="range" id="mmSlider" min="0" max="9" value="7" step="1" style="width:100%;">
                </div>
              </div>
            </div>
          `;

          const cmS = h.querySelector('#cmSlider');
          const mmS = h.querySelector('#mmSlider');
          const dispCm = h.querySelector('#dispCm');
          const dispMm = h.querySelector('#dispMm');
          const dispTotal = h.querySelector('#dispTotal');
          const cmVal = h.querySelector('#cmVal');
          const mmVal = h.querySelector('#mmVal');
          const calcStage = h.querySelector('#convertCalcStage');

          function updateCalc() {
            const cm = parseInt(cmS.value, 10);
            const mm = parseInt(mmS.value, 10);
            const total = cm * 10 + mm;

            dispCm.textContent = cm;
            dispMm.textContent = mm;
            dispTotal.textContent = total;
            cmVal.textContent = cm;
            mmVal.textContent = mm;

            let s = '';
            s += `<div style="font-size:14px; font-weight:800; color:#334155; margin-bottom:8px;">拆解計算推演：</div>`;
            s += `<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:14px; font-weight:900;">`;
            s += `<span style="background:#ecfdf5; border:1px solid #059669; padding:4px 10px; border-radius:6px; color:#059669;">${cm} cm ＝ ${cm} × 10 ＝ ${cm * 10} mm</span>`;
            s += `<span>＋</span>`;
            s += `<span style="background:#fff1f2; border:1px solid #e11d48; padding:4px 10px; border-radius:6px; color:#e11d48;">${mm} mm</span>`;
            s += `<span>＝</span>`;
            s += `<span style="background:#eff6ff; border:1px solid #2563eb; padding:4px 10px; border-radius:6px; color:#2563eb; font-size:16px;">${total} mm</span>`;
            s += `</div>`;

            let svgContent = '';
            const barW = 340;
            const barStartX = 30;

            svgContent += `<rect x="${barStartX}" y="15" width="${barW}" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>`;

            const fillW = Math.min(barW, (total / 109) * barW);
            if (fillW > 0) {
              svgContent += `<rect x="${barStartX}" y="15" width="${fillW}" height="20" rx="4" fill="url(#gradCm)"/>`;
            }

            svgContent += `<defs>
              <linearGradient id="gradCm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#059669"/>
                <stop offset="100%" stop-color="#2563eb"/>
              </linearGradient>
            </defs>`;

            for (let c = 0; c <= 10; c++) {
              const x = barStartX + (c * 10 / 109) * barW;
              svgContent += `<line x1="${x}" y1="15" x2="${x}" y2="38" stroke="#0f172a" stroke-width="1.2"/>`;
              svgContent += `<text x="${x}" y="52" text-anchor="middle" font-size="11" font-weight="800" fill="#64748b">${c}cm</text>`;
            }

            s += `<div style="margin-top:12px;">${svg('0 0 400 60', svgContent)}</div>`;
            calcStage.innerHTML = s;
          }

          cmS.oninput = updateCalc;
          mmS.oninput = updateCalc;
          updateCalc();
        },
        caption: '幾公分代表有幾個 10 毫米，再加上剩餘的毫米數，就是總毫米數。',
        example: {
          q: '把 7 公分 3 毫米換算成毫米，算式該怎麼寫？',
          steps: [
            '1. 先算公分換毫米：7 公分 ＝ 7 × 10 ＝ 70 毫米。',
            '2. 再加上 3 毫米：70 毫米 ＋ 3 毫米 ＝ 73 毫米。'
          ],
          ans: '73 毫米'
        }
      },

      /* ==================== 3-3 長度的加減計算 ==================== */
      {
        sec: '3-3', secName: '長度的加減計算',
        title: '公分對公分、毫米對毫米，滿10毫米要進位',
        points: [
          '進行長度複名數（幾公分幾毫米）直式計算時：',
          '**同單位對齊**：分成「公分」與「毫米」兩欄。',
          '**加法進位**：毫米相加滿 10 mm，向公分欄**進 1 cm**。',
          '**減法借位**：毫米欄不夠減時，向公分欄**借 1 cm (換成 10 mm)** 再減。'
        ],
        formula: { label: '進借位核心', tex: '10\\text{ mm} \\rightleftarrows 1\\text{ cm}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#ecfdf5', stroke: GRN, r: 12 });
          out += TX(109, 38, '【加法進位】範例', { fs: 14, c: GRN, anchor: 'middle', fw: '900' });
          out += TX(109, 58, '4 cm 8 mm ＋ 1 cm 5 mm', { fs: 12, c: '#065f46', anchor: 'middle' });

          out += TX(65, 90, 'cm', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(135, 90, 'mm', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(65, 118, '4', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 118, '8', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(35, 142, '＋', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(65, 142, '1', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 142, '5', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="30" y1="152" x2="165" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(65, 76, '①', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
          out += TX(65, 178, '6', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(135, 178, '3', { fs: 17, c: RED, anchor: 'middle', fw: '900' });

          out += TX(109, 215, '答：6 cm 3 mm', { fs: 14, c: RED, anchor: 'middle', fw: '900' });

          out += BOX(217, 15, 188, 225, { fill: '#fff1f2', stroke: RED, r: 12 });
          out += TX(311, 38, '【減法借位】範例', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
          out += TX(311, 58, '5 cm 2 mm － 2 cm 7 mm', { fs: 12, c: '#9f1239', anchor: 'middle' });

          out += TX(267, 90, 'cm', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(337, 90, 'mm', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += `<line x1="260" y1="108" x2="274" y2="124" stroke="${RED}" stroke-width="2"/>`;
          out += TX(267, 76, '4', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
          out += TX(337, 76, '10', { fs: 13, c: RED, anchor: 'middle', fw: '900' });

          out += TX(267, 118, '5', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(337, 118, '2', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(237, 142, '－', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(267, 142, '2', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(337, 142, '7', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="232" y1="152" x2="367" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(267, 178, '2', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(337, 178, '5', { fs: 17, c: RED, anchor: 'middle', fw: '900' });

          out += TX(311, 215, '答：2 cm 5 mm', { fs: 14, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '8＋5＝13 毫米，寫 3 毫米進 1 公分；減法 2 毫米不夠減 7 毫米，向公分借 1 當 10。',
        example: {
          q: '藍色絲帶長 6 公分 3 毫米，紅色絲帶長 3 公分 8 毫米，兩條絲帶相差多少公分多少毫米？',
          steps: [
            '1. 直式對齊：6 cm 3 mm － 3 cm 8 mm。',
            '2. 毫米不夠減 (3 － 8)：向 6 cm 借 1 cm 變 5 cm，毫米變成 10 ＋ 3 ＝ 13 mm。',
            '3. 毫米算：13 － 8 ＝ 5 mm。',
            '4. 公分算：5 － 3 ＝ 2 cm。'
          ],
          ans: '相差 2 公分 5 毫米'
        }
      }
    ]
  });
})();
