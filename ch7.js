/* ============ 第 7 章　除法 ============
   依康軒國小 3 上第 7 單元：
   7-1 分裝與平分
   7-2 二位數除以一位數與餘數
   7-3 除法驗算與應用
   對應課綱代碼：n-II-2 理解除法的意義，能進行二位數除以一位數之直式計算與驗算。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#0284c7'; // 深天藍色主調 (Chapter 7 除法)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', SKY = '#0284c7';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 7,
    title: '除法',
    color: C,
    sections: ['7-1 分裝與平分', '7-2 二位數除以一位數與餘數', '7-3 除法驗算與應用'],
    slides: [

      /* ==================== 7-1 分裝與平分 ==================== */
      {
        sec: '7-1', secName: '分裝與平分',
        title: '分裝（包含除）與平分（等分除）都是除法運算',
        points: [
          '**分裝（包含除）**：已知每幾顆裝一袋，求可以裝成幾袋？（例：15 顆蘋果，每 3 顆裝一袋 ➔ \\(15 \\div 3 = 5\\) 袋）。',
          '**平分（等分除）**：已知平分給幾個人，求每人分到幾顆？（例：15 顆蘋果，平分給 3 人 ➔ \\(15 \\div 3 = 5\\) 顆）。',
          '除法算式結構：<span class="k">被除數 ÷ 除數 ＝ 商</span>。'
        ],
        formula: { label: '除法基本算式', tex: '\\text{被除數} \\div \\text{除數} = \\text{商}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#f0f9ff', stroke: SKY, r: 12 });
          out += TX(109, 38, '📦【分裝】包含除', { fs: 14, c: SKY, anchor: 'middle', fw: '900' });
          out += TX(109, 58, '12 顆草莓，每 3 顆裝 1 盤', { fs: 11.5, c: '#0369a1', anchor: 'middle' });

          for (let p = 0; p < 4; p++) {
            const px = 30 + (p % 2) * 85;
            const py = 75 + Math.floor(p / 2) * 55;
            out += BOX(px, py, 75, 45, { fill: '#e0f2fe', stroke: '#38bdf8', r: 8 });
            out += TX(px + 37, py + 26, '🍓 🍓 🍓', { fs: 12, anchor: 'middle' });
          }
          out += TX(109, 212, '算式：12 ÷ 3 ＝ 4 (盤)', { fs: 13, c: RED, anchor: 'middle', fw: '900' });

          out += BOX(217, 15, 188, 225, { fill: '#ecfdf5', stroke: GRN, r: 12 });
          out += TX(311, 38, '🤝【平分】等分除', { fs: 14, c: GRN, anchor: 'middle', fw: '900' });
          out += TX(311, 58, '12 顆草莓，平分給 4 個人', { fs: 11.5, c: '#047857', anchor: 'middle' });

          for (let p = 0; p < 4; p++) {
            const px = 232 + (p % 2) * 85;
            const py = 75 + Math.floor(p / 2) * 55;
            out += BOX(px, py, 75, 45, { fill: '#d1fae5', stroke: '#34d399', r: 8 });
            out += TX(px + 37, py + 18, `👤第 ${p + 1} 人`, { fs: 10.5, c: GRN, anchor: 'middle', fw: '800' });
            out += TX(px + 37, py + 34, '🍓 🍓 🍓', { fs: 11, anchor: 'middle' });
          }
          out += TX(311, 212, '算式：12 ÷ 4 ＝ 3 (顆)', { fs: 13, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '不論是求能分成幾組（分裝），或是求一組有多少個（平分），都可以用除法解決。',
        example: {
          q: '有 24 顆果凍，每 6 顆裝成 1 包，可以裝成幾包？',
          steps: [
            '1. 全部的果凍共有 24 顆（被除數）。',
            '2. 每包裝 6 顆（除數）。',
            '3. 算式：24 ÷ 6 ＝ 4。',
            '4. 答：可以裝成 4 包。'
          ],
          ans: '4 包'
        }
      },

      /* ==================== 7-2 二位數除以一位數與餘數 (升級版：分裝 vs 平分 商與餘數中文單位高亮) ==================== */
      {
        sec: '7-2', secName: '二位數除以一位數與餘數',
        title: '【餘數與單位】分裝 vs 平分之商與餘數中文單位高亮示範器',
        points: [
          '**分裝 (包含除)**：商代表<span class="k">「包/袋數」</span>，餘數代表<span class="k">「剩下的顆數」</span>。',
          '**平分 (等分除)**：商代表<span class="k">「每人分到的顆數」</span>，餘數代表<span class="k">「剩下的顆數」</span>。',
          '⚠️ **核心鉄律**：<span class="k">餘數必須小於除數</span>（餘數 ＜ 除數）。'
        ],
        formula: { label: '單位寫法核心', tex: '\\text{被除數 (顆)} \\div \\text{除數} = \\text{商 (組/顆)} \\dots \\text{餘數 (顆)}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                <div style="display:flex; gap:6px;">
                  <button id="divPackModeBtn" style="padding:4px 10px; border-radius:6px; border:1px solid #0284c7; background:#0284c7; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">📦【分裝模式 (包含除)】</button>
                  <button id="divShareModeBtn" style="padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🤝【平分模式 (等分除)】</button>
                </div>
                <div style="font-size:12px; font-weight:800; color:#059669;" id="remCheck">
                  ✅ 餘數 2 ＜ 除數 3
                </div>
              </div>

              <div id="divSimStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:185px; overflow:hidden;">
                <!-- SVG 動態陣列與直式渲染區 -->
              </div>

              <div style="margin-top:8px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="ictrl">
                  <label>被除數 (水果總數)：<span class="ival" id="divNVal">17</span> 顆</label>
                  <input type="range" id="divNSlider" min="8" max="29" value="17" step="1" style="width:100%;">
                </div>
                <div class="ictrl">
                  <label>除數：<span class="ival" id="divKVal">3</span> <span id="kUnitText">顆/袋</span></label>
                  <input type="range" id="divKSlider" min="2" max="6" value="3" step="1" style="width:100%;">
                </div>
              </div>
            </div>
          `;

          let divMode = 'PACK'; // 'PACK' or 'SHARE'
          const nSlider = h.querySelector('#divNSlider');
          const kSlider = h.querySelector('#divKSlider');
          const nVal = h.querySelector('#divNVal');
          const kVal = h.querySelector('#divKVal');
          const kUnitText = h.querySelector('#kUnitText');
          const remCheck = h.querySelector('#remCheck');
          const packBtn = h.querySelector('#divPackModeBtn');
          const shareBtn = h.querySelector('#divShareModeBtn');
          const stage = h.querySelector('#divSimStage');

          function renderDiv() {
            const N = parseInt(nSlider.value, 10);
            const K = parseInt(kSlider.value, 10);
            const q = Math.floor(N / K);
            const r = N % K;

            nVal.textContent = N;
            kVal.textContent = K;
            kUnitText.textContent = divMode === 'PACK' ? '顆/袋' : '人';
            remCheck.textContent = r < K ? `✅ 餘數 ${r} ＜ 除數 ${K}` : `❌ 錯誤！`;

            let s = '';
            // 上方清晰算式與單位 Badge
            const qUnit = divMode === 'PACK' ? '袋' : '顆';
            const rUnit = '顆';

            s += `<g transform="translate(10, 10)">`;
            s += TX(180, 15, `算式：${N} 顆 ÷ ${K} ${divMode === 'PACK' ? '顆' : '人'} ＝ ${q} ${qUnit} ... ${r} ${rUnit}`, { fs: 14, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += `</g>`;

            // 左邊：物品分裝/平分圖示
            s += `<g transform="translate(10, 30)">`;
            const titleText = divMode === 'PACK' ? `共 ${N} 顆 (每 ${K} 顆裝一袋)` : `共 ${N} 顆 (平分給 ${K} 個人)`;
            s += TX(85, 12, titleText, { fs: 11.5, c: '#334155', anchor: 'middle', fw: '800' });

            for (let b = 0; b < q; b++) {
              const bx = 5 + (b % 3) * 55;
              const by = 22 + Math.floor(b / 3) * 52;
              const boxBg = divMode === 'PACK' ? '#e0f2fe' : '#d1fae5';
              const boxBorder = divMode === 'PACK' ? '#0284c7' : '#059669';

              s += `<rect x="${bx}" y="${by}" width="50" height="46" rx="8" fill="${boxBg}" stroke="${boxBorder}" stroke-width="1.5"/>`;
              const label = divMode === 'PACK' ? `袋 ${b + 1}` : `人 ${b + 1}`;
              s += TX(bx + 25, by + 16, label, { fs: 10, c: boxBorder, anchor: 'middle', fw: '800' });
              s += TX(bx + 25, by + 34, `●`.repeat(Math.min(K, 5)), { fs: 11, c: '#0f172a', anchor: 'middle' });
            }

            if (r > 0) {
              const rx = 5 + (q % 3) * 55;
              const ry = 22 + Math.floor(q / 3) * 52;
              s += `<rect x="${rx}" y="${ry}" width="50" height="46" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="3 3"/>`;
              s += TX(rx + 25, ry + 16, `剩餘`, { fs: 10, c: RED, anchor: 'middle', fw: '900' });
              s += TX(rx + 25, ry + 34, `●`.repeat(r), { fs: 11, c: RED, anchor: 'middle' });
            }
            s += `</g>`;

            // 右邊：直式除法與單位高亮標註
            s += `<g transform="translate(210, 30)">`;
            s += BOX(0, 0, 150, 140, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
            s += TX(75, 18, '直式與商/餘數單位', { fs: 11.5, c: '#64748b', anchor: 'middle', fw: '800' });

            const sx = 45, sy = 55;
            s += TX(sx - 15, sy + 18, K.toString(), { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

            // 商 (加上單位顏色)
            s += TX(sx + 35, sy - 8, `${q}`, { fs: 16, c: divMode === 'PACK' ? SKY : GRN, anchor: 'middle', fw: '900' });
            s += TX(sx + 52, sy - 8, qUnit, { fs: 11, c: divMode === 'PACK' ? SKY : GRN, fw: '900' });

            s += `<line x1="${sx - 2}" y1="${sy}" x2="${sx + 65}" y2="${sy}" stroke="#0f172a" stroke-width="2"/>`;
            s += `<path d="M ${sx - 2} ${sy} Q ${sx - 8} ${sy + 10} ${sx - 2} ${sy + 28}" fill="none" stroke="#0f172a" stroke-width="2"/>`;

            const nStr = N.toString().padStart(2, ' ');
            s += TX(sx + 20, sy + 18, nStr[0], { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += TX(sx + 38, sy + 18, nStr[1], { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

            const prodStr = (K * q).toString().padStart(2, ' ');
            s += TX(sx + 20, sy + 40, prodStr[0] === ' ' ? '' : prodStr[0], { fs: 15, c: '#0369a1', anchor: 'middle', fw: '900' });
            s += TX(sx + 38, sy + 40, prodStr[1], { fs: 15, c: '#0369a1', anchor: 'middle', fw: '900' });

            s += `<line x1="${sx + 8}" y1="${sy + 46}" x2="${sx + 50}" y2="${sy + 46}" stroke="#0f172a" stroke-width="1.8"/>`;

            // 餘數
            s += TX(sx + 38, sy + 66, `${r}`, { fs: 16, c: RED, anchor: 'middle', fw: '900' });
            s += TX(sx + 52, sy + 66, rUnit, { fs: 11, c: RED, fw: '900' });

            // 底部提示
            const unitTip = divMode === 'PACK' ? `商的單位：${qUnit}，餘數單位：${rUnit}` : `商的單位：${qUnit}，餘數單位：${rUnit}`;
            s += TX(75, 128, unitTip, { fs: 10.5, c: divMode === 'PACK' ? SKY : GRN, anchor: 'middle', fw: '900' });

            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          packBtn.onclick = () => {
            divMode = 'PACK';
            packBtn.style.background = '#0284c7'; packBtn.style.color = '#fff'; packBtn.style.borderColor = '#0284c7';
            shareBtn.style.background = '#fff'; shareBtn.style.color = '#334155'; shareBtn.style.borderColor = '#cbd5e1';
            renderDiv();
          };

          shareBtn.onclick = () => {
            divMode = 'SHARE';
            shareBtn.style.background = '#059669'; shareBtn.style.color = '#fff'; shareBtn.style.borderColor = '#059669';
            packBtn.style.background = '#fff'; packBtn.style.color = '#334155'; packBtn.style.borderColor = '#cbd5e1';
            renderDiv();
          };

          nSlider.oninput = renderDiv;
          kSlider.oninput = renderDiv;
          renderDiv();
        },
        caption: '餘數必須比除數小。切換分裝與平分時，注意商的單位中文標註差別！',
        example: {
          q: '老師把 27 枝鉛筆分給 4 個同學，每人分到幾枝？還剩下幾枝？（注意單位）',
          steps: [
            '1. 直式計算 27 ÷ 4。',
            '2. 商為 6 枝（每人分到的數量）。',
            '3. 餘數為 3 枝（剩下的數量）。',
            '4. 答：每人分到 6 枝，還剩下 3 枝。'
          ],
          ans: '每人分到 6 枝，還剩下 3 枝'
        }
      },

      /* ==================== 7-3 除法驗算與應用 ==================== */
      {
        sec: '7-3', secName: '除法驗算與應用',
        title: '用「除數 × 商 ＋ 餘數 ＝ 被除數」驗算答案是否正確',
        points: [
          '**除法驗算公式**：<span class="k">除數 × 商 ＋ 餘數 ＝ 被除數</span>。',
          '無餘數時（整除）：\\(\\text{除數} \\times \\text{商} = \\text{被除數}\\)。',
          '有餘數時：先算乘法，再加上餘數，結果必須等於原本的被除數！'
        ],
        formula: { label: '除法驗算公式', tex: '\\text{除數} \\times \\text{商} + \\text{餘數} = \\text{被除數}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 390, 110, { fill: '#f0f9ff', stroke: SKY, r: 12 });
          out += TX(210, 40, '🔍 除法驗算三步驟', { fs: 16, c: SKY, anchor: 'middle', fw: '900' });

          out += BOX(30, 55, 170, 55, { fill: '#fff', stroke: '#7dd3fc', r: 8 });
          out += TX(115, 75, '原算式：38 ÷ 5 ＝ 7 ... 3', { fs: 12.5, c: '#0369a1', anchor: 'middle', fw: '900' });
          out += TX(115, 96, '除數=5, 商=7, 餘數=3', { fs: 11, c: '#64748b', anchor: 'middle' });

          out += BOX(215, 55, 170, 55, { fill: '#ecfdf5', stroke: GRN, r: 8 });
          out += TX(300, 75, '驗算：5 × 7 ＋ 3', { fs: 13, c: GRN, anchor: 'middle', fw: '900' });
          out += TX(300, 96, '＝ 35 ＋ 3 ＝ 38 (正確!)', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          out += BOX(15, 140, 390, 105, { fill: '#fff1f2', stroke: RED, r: 12 });
          out += TX(210, 165, '💡 生活解題：裝箱進位問題', { fs: 15, c: RED, anchor: 'middle', fw: '900' });
          out += TX(35, 190, '例：25 顆蘋果，每 4 顆裝 1 盒，全部裝完需要幾盒？', { fs: 12, c: '#9f1239', fw: '800' });
          out += TX(35, 212, '算式：25 ÷ 4 ＝ 6 ... 1 (剩 1 顆也要裝 1 盒)', { fs: 12, c: '#0f172a', fw: '800' });
          out += TX(35, 232, '答：6 ＋ 1 ＝ 7 盒 (剩餘的需要多準備 1 盒)', { fs: 13, c: RED, fw: '900' });

          h.innerHTML = svg('0 0 420 260', out);
        },
        caption: '驗算時將「除數乘以商」再加上「餘數」，檢查是否等於原本的被除數。',
        example: {
          q: '驗算 43 ÷ 6 ＝ 7 ... 1 的結果是否正確？',
          steps: [
            '1. 找出除數 (6)、商 (7)、餘數 (1)。',
            '2. 算式：6 × 7 ＋ 1 ＝ 42 ＋ 1 ＝ 43。',
            '3. 計算結果 43 與被除數 43 相同，驗算正確！'
          ],
          ans: '驗算正確（6 × 7 ＋ 1 ＝ 43）'
        }
      }
    ]
  });
})();
