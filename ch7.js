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

      /* ==================== 7-1 分裝與平分（升級版：互動分類器） ==================== */
      {
        sec: '7-1', secName: '分裝與平分',
        title: '【互動分類】分裝（包含除）vs 平分（等分除）情境判斷器',
        points: [
          '**分裝（包含除）**：已知每幾顆裝一袋，求可以裝成幾袋？（例：15 顆蘋果，每 3 顆裝一袋 ➔ \\(15 \\div 3 = 5\\) 袋）。',
          '**平分（等分除）**：已知平分給幾個人，求每人分到幾顆？（例：15 顆蘋果，平分給 3 人 ➔ \\(15 \\div 3 = 5\\) 顆）。',
          '讀完題目情境後，點選「分裝」或「平分」分類！'
        ],
        formula: { label: '除法基本算式', tex: '\\text{被除數} \\div \\text{除數} = \\text{商}' },
        visual: (h) => {
          const QUESTIONS = [
            { q: '有 12 顆蘋果，每 3 顆裝一袋，可以裝幾袋？', ans: 'PACK', n: 12, k: 3, unit: '袋' },
            { q: '有 15 顆糖果，平均分給 5 個小朋友，每人分到幾顆？', ans: 'SHARE', n: 15, k: 5, unit: '顆' },
            { q: '有 18 顆橘子，每 6 顆裝一盒，可以裝幾盒？', ans: 'PACK', n: 18, k: 6, unit: '盒' },
            { q: '有 20 顆糖果，平均分給 4 個人，每人分到幾顆？', ans: 'SHARE', n: 20, k: 4, unit: '顆' },
            { q: '有 24 顆果凍，每 8 顆裝一包，可以裝幾包？', ans: 'PACK', n: 24, k: 8, unit: '包' },
          ];
          let qi = 0, score = 0, answered = false;

          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div id="qCard" style="background:#f0f9ff; border:2px solid #0284c7; border-radius:12px; padding:14px 12px; margin-bottom:10px; min-height:60px;">
                <div style="font-size:12px; font-weight:800; color:#0369a1; margin-bottom:4px;">📖 讀題：第 <span id="qNum">1</span>/5 題</div>
                <div id="qText" style="font-size:14px; font-weight:900; color:#0f172a; line-height:1.5;"></div>
              </div>
              <div style="display:flex; gap:10px; margin-bottom:8px;">
                <button id="packBtn" style="flex:1; padding:10px; border-radius:10px; border:2px solid #0284c7; background:#e0f2fe; color:#0369a1; font-weight:900; font-size:13px; cursor:pointer;">📦 這是分裝（包含除）<br><span style="font-size:11px;">問：能裝幾袋/盒/包？</span></button>
                <button id="shareBtn" style="flex:1; padding:10px; border-radius:10px; border:2px solid #059669; background:#d1fae5; color:#047857; font-weight:900; font-size:13px; cursor:pointer;">🤝 這是平分（等分除）<br><span style="font-size:11px;">問：每人分到幾顆？</span></button>
              </div>
              <div id="resultBox" style="min-height:52px; text-align:center;"></div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                <div style="font-size:13px; font-weight:800; color:#475569;">得分：<span id="scoreDisplay" style="color:#d97706;">0</span> / 5</div>
                <button id="nextBtn" style="padding:5px 14px; border-radius:8px; border:none; background:#d97706; color:#fff; font-weight:900; font-size:13px; cursor:pointer; display:none;">下一題 →</button>
              </div>
            </div>
          `;

          const qNum = h.querySelector('#qNum');
          const qText = h.querySelector('#qText');
          const packBtn = h.querySelector('#packBtn');
          const shareBtn = h.querySelector('#shareBtn');
          const resultBox = h.querySelector('#resultBox');
          const nextBtn = h.querySelector('#nextBtn');
          const scoreDisplay = h.querySelector('#scoreDisplay');

          function showQ() {
            answered = false;
            const cur = QUESTIONS[qi];
            qNum.textContent = qi + 1;
            qText.textContent = cur.q;
            resultBox.innerHTML = '';
            nextBtn.style.display = 'none';
            packBtn.style.opacity = '1'; shareBtn.style.opacity = '1';
            packBtn.style.border = '2px solid #0284c7'; shareBtn.style.border = '2px solid #059669';
          }

          function answer(choice) {
            if (answered) return;
            answered = true;
            const cur = QUESTIONS[qi];
            const correct = choice === cur.ans;
            if (correct) score++;
            scoreDisplay.textContent = score;

            const emoji = correct ? '🎉' : '❌';
            const msg = correct ? '答對了！' : '再想想看！';
            const typeLabel = cur.ans === 'PACK' ? '分裝（包含除）' : '平分（等分除）';
            const formula = `${cur.n} ÷ ${cur.k} ＝ ${cur.n / cur.k}（${cur.unit}）`;

            resultBox.innerHTML = `<div style="background:${correct ? '#f0fdf4' : '#fff1f2'}; border:1.5px solid ${correct ? '#059669' : '#e11d48'}; border-radius:8px; padding:8px 12px; text-align:left; font-size:13px;">
              <b style="color:${correct ? '#059669' : '#e11d48'}; font-size:15px;">${emoji} ${msg}</b><br>
              這是 <b>${typeLabel}</b>，算式：<b style="color:#0284c7;">${formula}</b>
            </div>`;

            if (choice === 'PACK') { packBtn.style.border = `2px solid ${correct ? '#059669' : '#e11d48'}`; }
            else { shareBtn.style.border = `2px solid ${correct ? '#059669' : '#e11d48'}`; }

            if (qi < QUESTIONS.length - 1) {
              nextBtn.style.display = 'inline-block';
            } else {
              resultBox.innerHTML += `<div style="margin-top:6px; text-align:center; font-size:14px; font-weight:900; color:#d97706;">🏆 全部完成！得分 ${score}/5</div>`;
            }
          }

          packBtn.onclick = () => answer('PACK');
          shareBtn.onclick = () => answer('SHARE');
          nextBtn.onclick = () => { qi++; showQ(); };
          showQ();
        },
        caption: '讀題時注意：問「幾袋/幾組」是分裝，問「每人幾顆/每份幾個」是平分。',
        example: {
          q: '有 24 顆果凍，每 6 顆裝成 1 包，可以裝成幾包？',
          steps: [
            '1. 全部的果凍共有 24 顆（被除數）。',
            '2. 每包裝 6 顆（除數），問裝幾包 ➔ 分裝（包含除）。',
            '3. 算式：24 ÷ 6 ＝ 4。',
            '4. 答：可以裝成 4 包。'
          ],
          ans: '4 包'
        }
      },

      /* ==================== 7-2 二位數除以一位數與餘數（升級：商補0特訓模式） ==================== */
      {
        sec: '7-2', secName: '二位數除以一位數與餘數',
        title: '【餘數與單位 ＋ 商補0特訓】分裝 vs 平分中文單位高亮示範器',
        points: [
          '**分裝 (包含除)**：商代表<span class="k">「包/袋數」</span>，餘數代表<span class="k">「剩下的顆數」</span>。',
          '**平分 (等分除)**：商代表<span class="k">「每人分到的顆數」</span>，餘數代表<span class="k">「剩下的顆數」</span>。',
          '⚠️ **核心鉄律**：<span class="k">餘數必須小於除數</span>（餘數 ＜ 除數）。<br>⚠️ **商補0陷阱**：商只有個位時，直式的十位必須補 0！'
        ],
        formula: { label: '單位寫法核心', tex: '\\text{被除數 (顆)} \\div \\text{除數} = \\text{商 (組/顆)} \\dots \\text{餘數 (顆)}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button id="divPackModeBtn" style="padding:4px 10px; border-radius:6px; border:1px solid #0284c7; background:#0284c7; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">📦【分裝模式 (包含除)】</button>
                  <button id="divShareModeBtn" style="padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🤝【平分模式 (等分除)】</button>
                  <button id="divZeroBtn" style="padding:4px 10px; border-radius:6px; border:1.5px solid #e11d48; background:#fff1f2; color:#e11d48; font-weight:900; font-size:12px; cursor:pointer;">⚠️ 商補0特訓</button>
                </div>
                <div style="font-size:12px; font-weight:800; color:#059669;" id="remCheck">
                  ✅ 餘數 2 ＜ 除數 3
                </div>
              </div>

              <div id="divSimStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:185px; overflow:hidden;">
                <!-- SVG 動態陣列與直式渲染區 -->
              </div>

              <div style="margin-top:6px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div class="ictrl" style="margin:0;">
                  <label>被除數：<span class="ival" id="divNVal">17</span> 顆</label>
                  <input type="range" id="divNSlider" min="8" max="29" value="17" step="1" style="width:100px;">
                </div>
                <div class="ictrl" style="margin:0;">
                  <label>除數：<span class="ival" id="divKVal">3</span> <span id="kUnitText">顆/袋</span></label>
                  <input type="range" id="divKSlider" min="2" max="6" value="3" step="1" style="width:80px;">
                </div>
              </div>
              <div id="zeroDrillNotice" style="display:none; margin-top:4px; padding:6px 10px; background:#fff1f2; border:1.5px solid #e11d48; border-radius:8px; font-size:12px; font-weight:800; color:#9f1239;">
                ⚠️ 商補0特訓：21 ÷ 7 ＝ <b style="font-size:15px; color:#e11d48;">03</b>（商只有個位，十位必須補 <b>0</b>！）直式十位紅框標示提醒。
              </div>
            </div>
          `;

          let divMode = 'PACK'; // 'PACK' or 'SHARE'
          let zeroDrill = false;
          const nSlider = h.querySelector('#divNSlider');
          const kSlider = h.querySelector('#divKSlider');
          const nVal = h.querySelector('#divNVal');
          const kVal = h.querySelector('#divKVal');
          const kUnitText = h.querySelector('#kUnitText');
          const remCheck = h.querySelector('#remCheck');
          const packBtn = h.querySelector('#divPackModeBtn');
          const shareBtn = h.querySelector('#divShareModeBtn');
          const zeroBtn = h.querySelector('#divZeroBtn');
          const zeroDrillNotice = h.querySelector('#zeroDrillNotice');
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
            // 商補0特訓模式：強制被除數=21, 除數=7，商=3，十位補0
            const drillN = zeroDrill ? 21 : N;
            const drillK = zeroDrill ? 7 : K;
            const drillQ = Math.floor(drillN / drillK);
            const drillR = drillN % drillK;
            const showN = zeroDrill ? drillN : N;
            const showK = zeroDrill ? drillK : K;
            const showQ = zeroDrill ? drillQ : q;
            const showR = zeroDrill ? drillR : r;

            s += `<g transform="translate(10, 10)">`;
            const formulaTxt = zeroDrill
              ? `算式：${showN} 顆 ÷ ${showK} 人 ＝ 0${showQ} ${qUnit} ... ${showR} ${rUnit}`
              : `算式：${N} 顆 ÷ ${K} ${divMode === 'PACK' ? '顆' : '人'} ＝ ${q} ${qUnit} ... ${r} ${rUnit}`;
            s += TX(180, 15, formulaTxt, { fs: 13.5, c: zeroDrill ? RED : '#0f172a', anchor: 'middle', fw: '900' });
            s += `</g>`;

            // 左邊：物品分裝/平分圖示
            const dQ = showQ, dK = zeroDrill ? 7 : K, dN = showN, dR = showR;
            s += `<g transform="translate(10, 30)">`;
            const titleText = zeroDrill ? `共 ${dN} 顆 (平分給 ${dK} 個人)` : (divMode === 'PACK' ? `共 ${N} 顆 (每 ${K} 顆裝一袋)` : `共 ${N} 顆 (平分給 ${K} 個人)`);
            s += TX(85, 12, titleText, { fs: 11.5, c: '#334155', anchor: 'middle', fw: '800' });

            for (let b = 0; b < dQ; b++) {
              const bx = 5 + (b % 3) * 55;
              const by = 22 + Math.floor(b / 3) * 52;
              const boxBg = divMode === 'PACK' && !zeroDrill ? '#e0f2fe' : '#d1fae5';
              const boxBorder = divMode === 'PACK' && !zeroDrill ? '#0284c7' : '#059669';

              s += `<rect x="${bx}" y="${by}" width="50" height="46" rx="8" fill="${boxBg}" stroke="${boxBorder}" stroke-width="1.5"/>`;
              const label = divMode === 'PACK' && !zeroDrill ? `袋 ${b + 1}` : `人 ${b + 1}`;
              s += TX(bx + 25, by + 16, label, { fs: 10, c: boxBorder, anchor: 'middle', fw: '800' });
              s += TX(bx + 25, by + 34, `●`.repeat(Math.min(dK, 5)), { fs: 11, c: '#0f172a', anchor: 'middle' });
            }

            if (dR > 0) {
              const rx = 5 + (dQ % 3) * 55;
              const ry = 22 + Math.floor(dQ / 3) * 52;
              s += `<rect x="${rx}" y="${ry}" width="50" height="46" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="3 3"/>`;
              s += TX(rx + 25, ry + 16, `剩餘`, { fs: 10, c: RED, anchor: 'middle', fw: '900' });
              s += TX(rx + 25, ry + 34, `●`.repeat(dR), { fs: 11, c: RED, anchor: 'middle' });
            }
            s += `</g>`;

            // 右邊：直式除法
            s += `<g transform="translate(210, 30)">`;
            const boxStroke = zeroDrill ? RED : '#cbd5e1';
            s += BOX(0, 0, 150, 140, { fill: zeroDrill ? '#fff1f2' : '#fff', stroke: boxStroke, r: 8, sw: zeroDrill ? 2.5 : 1.8 });
            s += TX(75, 18, zeroDrill ? '⚠️ 商補0！看十位' : '直式與商/餘數單位', { fs: 11.5, c: zeroDrill ? RED : '#64748b', anchor: 'middle', fw: '900' });

            const sx = 45, sy = 55;
            s += TX(sx - 15, sy + 18, dK.toString(), { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

            // 商：特訓模式顯示 0X 格式，十位0以紅框高亮
            if (zeroDrill) {
              s += `<rect x="${sx + 15}" y="${sy - 22}" width="22" height="22" rx="4" fill="#fee2e2" stroke="${RED}" stroke-width="2.5"/>`;
              s += TX(sx + 26, sy - 6, '0', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
              s += TX(sx + 48, sy - 6, `${dQ}`, { fs: 16, c: '#059669', anchor: 'middle', fw: '900' });
              s += TX(sx + 62, sy - 6, qUnit, { fs: 11, c: '#059669', fw: '900' });
            } else {
              s += TX(sx + 35, sy - 8, `${showQ}`, { fs: 16, c: divMode === 'PACK' ? SKY : GRN, anchor: 'middle', fw: '900' });
              s += TX(sx + 52, sy - 8, qUnit, { fs: 11, c: divMode === 'PACK' ? SKY : GRN, fw: '900' });
            }

            s += `<line x1="${sx - 2}" y1="${sy}" x2="${sx + 65}" y2="${sy}" stroke="#0f172a" stroke-width="2"/>`;
            s += `<path d="M ${sx - 2} ${sy} Q ${sx - 8} ${sy + 10} ${sx - 2} ${sy + 28}" fill="none" stroke="#0f172a" stroke-width="2"/>`;

            const nStr = dN.toString().padStart(2, ' ');
            s += TX(sx + 20, sy + 18, nStr[0], { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += TX(sx + 38, sy + 18, nStr[1], { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

            const prodStr = (dK * dQ).toString().padStart(2, ' ');
            s += TX(sx + 20, sy + 40, prodStr[0] === ' ' ? '' : prodStr[0], { fs: 15, c: '#0369a1', anchor: 'middle', fw: '900' });
            s += TX(sx + 38, sy + 40, prodStr[1], { fs: 15, c: '#0369a1', anchor: 'middle', fw: '900' });

            s += `<line x1="${sx + 8}" y1="${sy + 46}" x2="${sx + 50}" y2="${sy + 46}" stroke="#0f172a" stroke-width="1.8"/>`;

            // 餘數
            s += TX(sx + 38, sy + 66, `${dR}`, { fs: 16, c: RED, anchor: 'middle', fw: '900' });
            s += TX(sx + 52, sy + 66, rUnit, { fs: 11, c: RED, fw: '900' });

            // 底部提示
            const unitTip = zeroDrill ? '⚠️ 十位補 0！商是 03，不是 3！' : (divMode === 'PACK' ? `商的單位：${qUnit}，餘數單位：${rUnit}` : `商的單位：${qUnit}，餘數單位：${rUnit}`);
            s += TX(75, 128, unitTip, { fs: 10.5, c: zeroDrill ? RED : (divMode === 'PACK' ? SKY : GRN), anchor: 'middle', fw: '900' });

            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          packBtn.onclick = () => {
            divMode = 'PACK'; zeroDrill = false;
            packBtn.style.background = '#0284c7'; packBtn.style.color = '#fff'; packBtn.style.borderColor = '#0284c7';
            shareBtn.style.background = '#fff'; shareBtn.style.color = '#334155'; shareBtn.style.borderColor = '#cbd5e1';
            zeroBtn.style.background = '#fff1f2'; zeroBtn.style.color = '#e11d48';
            zeroDrillNotice.style.display = 'none';
            renderDiv();
          };

          shareBtn.onclick = () => {
            divMode = 'SHARE'; zeroDrill = false;
            shareBtn.style.background = '#059669'; shareBtn.style.color = '#fff'; shareBtn.style.borderColor = '#059669';
            packBtn.style.background = '#fff'; packBtn.style.color = '#334155'; packBtn.style.borderColor = '#cbd5e1';
            zeroBtn.style.background = '#fff1f2'; zeroBtn.style.color = '#e11d48';
            zeroDrillNotice.style.display = 'none';
            renderDiv();
          };

          zeroBtn.onclick = () => {
            zeroDrill = true; divMode = 'SHARE';
            zeroBtn.style.background = '#e11d48'; zeroBtn.style.color = '#fff';
            shareBtn.style.background = '#fff'; shareBtn.style.color = '#334155'; shareBtn.style.borderColor = '#cbd5e1';
            packBtn.style.background = '#fff'; packBtn.style.color = '#334155'; packBtn.style.borderColor = '#cbd5e1';
            zeroDrillNotice.style.display = 'block';
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

      /* ==================== 7-3 除法驗算與應用（升級：互動驗算填空） ==================== */
      {
        sec: '7-3', secName: '除法驗算與應用',
        title: '【互動驗算填空】用「除數 × 商 ＋ 餘數 ＝ 被除數」驗算是否正確',
        points: [
          '**除法驗算公式**：<span class="k">除數 × 商 ＋ 餘數 ＝ 被除數</span>。',
          '無餘數時（整除）：\\(\\text{除數} \\times \\text{商} = \\text{被除數}\\)。',
          '下方題目讓你點選驗算結果，填對得到 🎉 成就卡！'
        ],
        formula: { label: '除法驗算公式', tex: '\\text{除數} \\times \\text{商} + \\text{餘數} = \\text{被除數}' },
        visual: (h) => {
          const DRILLS = [
            { div: '38 ÷ 5 ＝ 7 ... 3', d: 5, q: 7, r: 3 },
            { div: '27 ÷ 4 ＝ 6 ... 3', d: 4, q: 6, r: 3 },
            { div: '43 ÷ 6 ＝ 7 ... 1', d: 6, q: 7, r: 1 },
          ];
          let di = 0;

          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="background:#f0f9ff; border:2px solid #0284c7; border-radius:10px; padding:10px 12px; margin-bottom:8px;">
                <div style="font-size:12px; font-weight:800; color:#0369a1;">🔍 驗算練習 第 <span id="drillNum">1</span>/3 題</div>
                <div id="drillFormula" style="font-size:15px; font-weight:900; color:#0f172a; margin:4px 0;"></div>
                <div id="drillQuestion" style="font-size:13px; color:#334155; font-weight:800;"></div>
              </div>
              <div id="drillChoices" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;"></div>
              <div id="drillResult" style="min-height:50px;"></div>
              <div style="display:flex; justify-content:flex-end; margin-top:4px;">
                <button id="drillNext" style="padding:5px 14px; border-radius:8px; border:none; background:#0284c7; color:#fff; font-weight:900; font-size:13px; cursor:pointer; display:none;">下一題 →</button>
              </div>
            </div>
          `;

          const drillNum = h.querySelector('#drillNum');
          const drillFormula = h.querySelector('#drillFormula');
          const drillQuestion = h.querySelector('#drillQuestion');
          const drillChoices = h.querySelector('#drillChoices');
          const drillResult = h.querySelector('#drillResult');
          const drillNext = h.querySelector('#drillNext');

          function showDrill() {
            const cur = DRILLS[di];
            drillNum.textContent = di + 1;
            drillFormula.textContent = `原算式：${cur.div}`;
            const ans = cur.d * cur.q + cur.r;
            drillQuestion.textContent = `驗算：${cur.d} × ${cur.q} ＋ ${cur.r} ＝ ？  點選正確答案 ↓`;
            drillResult.innerHTML = '';
            drillNext.style.display = 'none';

            // 生成 3 個選項（正確答案＋兩個干擾值）
            const opts = [ans, ans - 1, ans + 2].sort(() => Math.random() - 0.5);
            drillChoices.innerHTML = opts.map(opt =>
              `<button class="drill-opt" data-v="${opt}" style="flex:1; padding:10px; border-radius:10px; border:2px solid #7dd3fc; background:#f0f9ff; color:#0369a1; font-weight:900; font-size:18px; cursor:pointer;">${opt}</button>`
            ).join('');

            drillChoices.querySelectorAll('.drill-opt').forEach(btn => {
              btn.onclick = () => {
                const chosen = parseInt(btn.dataset.v, 10);
                const correct = chosen === ans;
                drillChoices.querySelectorAll('.drill-opt').forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
                btn.style.opacity = '1';
                btn.style.border = `2px solid ${correct ? '#059669' : '#e11d48'}`;
                btn.style.background = correct ? '#f0fdf4' : '#fff1f2';

                if (correct) {
                  drillResult.innerHTML = `<div style="background:#f0fdf4; border:1.5px solid #059669; border-radius:8px; padding:8px 12px; font-size:13px; font-weight:800;">
                    🎉 <b style="color:#059669;">驗算正確！</b> ${cur.d} × ${cur.q} ＋ ${cur.r} ＝ <b style="color:#0284c7; font-size:16px;">${ans}</b>，與被除數相同，答案正確！
                  </div>`;
                } else {
                  drillResult.innerHTML = `<div style="background:#fff1f2; border:1.5px solid #e11d48; border-radius:8px; padding:8px 12px; font-size:13px; font-weight:800;">
                    ❌ 再想想！正確答案是 <b style="color:#059669; font-size:16px;">${ans}</b>：${cur.d} × ${cur.q} ＝ ${cur.d * cur.q}，加上餘數 ${cur.r} ＝ ${ans}。
                  </div>`;
                }

                if (di < DRILLS.length - 1) drillNext.style.display = 'inline-block';
                else drillResult.innerHTML += `<div style="margin-top:6px; text-align:center; font-size:14px; font-weight:900; color:#d97706;">🏆 3 題全部完成！驗算技能解鎖！</div>`;
              };
            });
          }

          drillNext.onclick = () => { di++; showDrill(); };
          showDrill();
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
