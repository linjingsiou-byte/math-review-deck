/* ============ 第 4 章　整數的除法 ============
   節次：4-1 四位數÷一位數、4-2 二位數÷二位數、4-3 三位數÷二位數、4-4 除法驗算公式
   對應課綱代碼：N-4-2 較大位數的除法：四位數÷一位數、二/三位數÷二位數、除法驗算。
   課綱邊界：中年級除數以二位數為限，不處理除數為三位數之除法；不引入小數與分數除法。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#d97706';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 4,
    title: '整數的除法',
    color: C,
    sections: ['4-1 四位數÷一位數', '4-2 二位數÷二位數', '4-3 三位數÷二位數', '4-4 除法驗算公式'],
    slides: [

      // 4-1 Slide 1: 四位數÷一位數
      {
        sec: '4-1', secName: '四位數÷一位數',
        title: '從最高位除起，不夠除商補零',
        points: [
          '除法直式<span class="k">由左往右最高位算起</span>。',
          '某一位不夠除時，<span class="k">商一定要補 0</span> 佔位。',
          '餘數一定要比除數<span class="k">小</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn d4-btn" data-s="all" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">📖 課本三步全景對照</button>
                <button class="nav-btn d4-btn" data-s="1" style="font-size:11.5px; padding:3px 8px;">Step 1: 前兩位 24÷8</button>
                <button class="nav-btn d4-btn" data-s="2" style="font-size:11.5px; padding:3px 8px;">Step 2: 十位 5 不夠除補0 ⚠️</button>
                <button class="nav-btn d4-btn" data-s="3" style="font-size:11.5px; padding:3px 8px;">Step 3: 個位 53÷8 餘5 🎉</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(12, 8, 416, 232, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '2453 ÷ 8 ＝ ( 306 ) ⋯⋯ ( 5 )', { fs: 14.5, c: AMB, anchor: 'middle', fw: 900 });

            // Step 1 卡片
            const c1Border = (st === 1 || st === '1') ? '#2563eb' : '#cbd5e1';
            const c1Sw = (st === 1 || st === '1') ? 2 : 1;
            s += `<g transform="translate(20, 36)">`;
            s += `<rect x="0" y="0" width="116" height="142" rx="6" fill="#fff" stroke="${c1Border}" stroke-width="${c1Sw}"/>`;
            s += TX(58, 16, 'Step 1：前兩位 24÷8', { fs: 11, c: BLU, anchor: 'middle', fw: 900 });
            s += TX(44, 32, '千', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 32, '百', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(72, 32, '十', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(86, 32, '個', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 47, '3', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            // 課本標準除號（左側圓潤括弧＋平整頂橫線）
            s += `<path d="M 31,72 C 26.5,66.5 26.5,56.5 31,51 L 95,51" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
            s += TX(20, 67, '8', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 67, '2', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 67, '4', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(72, 67, '5', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(86, 67, '3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 83, '2', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += TX(58, 83, '4', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += `<line x1="36" y1="87" x2="66" y2="87" stroke="#1e293b" stroke-width="1.3"/>`;
            // 課本向上指引箭頭
            s += `<line x1="51" y1="126" x2="51" y2="98" stroke="#a89a8c" stroke-width="1.5"/>`;
            s += `<polygon points="51,92 47.5,99 54.5,99" fill="#a89a8c"/>`;
            s += `</g>`;

            // 箭頭 1
            s += TX(149, 108, '➜', { fs: 18, c: '#94a3b8', anchor: 'middle' });

            // Step 2 卡片
            const c2Border = (st === 2 || st === '2') ? '#d97706' : '#cbd5e1';
            const c2Sw = (st === 2 || st === '2') ? 2 : 1;
            s += `<g transform="translate(162, 36)">`;
            s += `<rect x="0" y="0" width="116" height="142" rx="6" fill="#fff" stroke="${c2Border}" stroke-width="${c2Sw}"/>`;
            s += TX(58, 16, 'Step 2：十位補 0 ⚠️', { fs: 11, c: AMB, anchor: 'middle', fw: 900 });
            s += TX(44, 32, '千', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 32, '百', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(72, 32, '十', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(86, 32, '個', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 47, '3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(72, 47, '0', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            // 課本標準除號（左側圓潤括弧＋平整頂橫線）
            s += `<path d="M 31,72 C 26.5,66.5 26.5,56.5 31,51 L 95,51" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
            s += TX(20, 67, '8', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 67, '2', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 67, '4', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(72, 67, '5', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(86, 67, '3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 83, '2', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 83, '4', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += `<line x1="36" y1="87" x2="66" y2="87" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(72, 101, '5', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            // 課本向上指引箭頭
            s += `<line x1="72" y1="128" x2="72" y2="114" stroke="#a89a8c" stroke-width="1.5"/>`;
            s += `<polygon points="72,108 68.5,115 75.5,115" fill="#a89a8c"/>`;
            s += `</g>`;

            // 箭頭 2
            s += TX(291, 108, '➜', { fs: 18, c: '#94a3b8', anchor: 'middle' });

            // Step 3 卡片
            const c3Border = (st === 3 || st === '3' || st === 'all') ? '#16a34a' : '#cbd5e1';
            const c3Sw = (st === 3 || st === '3' || st === 'all') ? 2 : 1;
            s += `<g transform="translate(304, 36)">`;
            s += `<rect x="0" y="0" width="116" height="142" rx="6" fill="#fff" stroke="${c3Border}" stroke-width="${c3Sw}"/>`;
            s += TX(58, 16, 'Step 3：個位 53÷8 🎉', { fs: 11, c: '#16a34a', anchor: 'middle', fw: 900 });
            s += TX(44, 32, '千', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 32, '百', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(72, 32, '十', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(86, 32, '個', { fs: 9, c: '#94a3b8', anchor: 'middle' });
            s += TX(58, 47, '3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(72, 47, '0', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(86, 47, '6', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            // 課本標準除號（左側圓潤括弧＋平整頂橫線）
            s += `<path d="M 31,72 C 26.5,66.5 26.5,56.5 31,51 L 95,51" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
            s += TX(20, 67, '8', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 67, '2', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 67, '4', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(72, 67, '5', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(86, 67, '3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(44, 83, '2', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 83, '4', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += `<line x1="36" y1="87" x2="66" y2="87" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(72, 101, '5', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(86, 101, '3', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += TX(72, 117, '4', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += TX(86, 117, '8', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += `<line x1="64" y1="121" x2="94" y2="121" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(86, 134, '5', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
            s += `</g>`;

            // 下方解說卡
            s += BOX(20, 184, 400, 48, { fill: '#fff', stroke: '#93c5fd', r: 6 });
            if (st === 1 || st === '1') {
              s += TX(36, 203, 'Step 1: 千位 2 不夠除，看前兩位 24 ÷ 8 ＝ 3（商在百位，紅字 24 相減）。', { fs: 12, c: BLU, fw: 900 });
              s += TX(36, 221, '相減剛好除盡，下一步準備處理十位。', { fs: 11.5, c: '#475569' });
            } else if (st === 2 || st === '2') {
              s += TX(36, 203, 'Step 2: 移下十位 5，5 不夠 8 除，商的十位一定要補「0」佔位！', { fs: 12, c: RED, fw: 900 });
              s += TX(36, 221, '⚠️ 常見錯誤：漏補 0 會誤寫成 36 餘 5（驗算 36×8＝288 差十倍！）。', { fs: 11.5, c: '#b91c1c', fw: 800 });
            } else if (st === 3 || st === '3') {
              s += TX(36, 203, 'Step 3: 移下個位 3 合成 53，53 ÷ 8 ＝ 6 餘 5，商為 306 餘 5 🎉', { fs: 12, c: '#16a34a', fw: 900 });
              s += TX(36, 221, '驗算：8 × 306 ＋ 5 ＝ 2448 ＋ 5 ＝ 2453，完全正確！', { fs: 11.5, c: '#15803d' });
            } else {
              s += TX(36, 203, '💡 課本標準演進口訣（點擊上方按鈕可分步聚焦）：', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(36, 221, '① 24÷8＝3 ➔ ② 移下5不夠除「商補0」 ➔ ③ 移下3成53÷8＝6餘5 🎉', { fs: 11.5, c: '#334155' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.d4-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.d4-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.s);
            };
          });
          render('all');
        },
        caption: '點擊 Step 觀察：十位 5 不夠 8 除，商一定要在十位補 0，不能跳過！',
        example: {
          q: '糖果廠生產了 2453 顆牛軋糖，每 8 顆裝一盒，最多可裝幾盒？還剩幾顆？',
          steps: [
            '列出除法算式：2453 ÷ 8。',
            '千位 2 不夠除，看前兩位 24 ÷ 8 ＝ 3（商在百位）。',
            '十位 5 不夠 8 除，商的十位補 0。',
            '個位合起來 53 ÷ 8 ＝ 6 餘 5，答：306 盒，剩 5 顆。'
          ],
          ans: '306 盒，剩 5 顆'
        }
      },

      // 4-2 Slide 2: 二位數÷二位數
      {
        sec: '4-2', secName: '二位數÷二位數',
        title: '試商看頭位，餘數一定要比除數小',
        points: [
          '用乘法估商：把除數看成<span class="k">接近的整十</span>來想。',
          '乘積大於被除數：<span class="k">商太大，要調小</span>。',
          '餘數大於除數：<span class="k">商太小，要調大</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>選擇試商：商 ＝ <span class="ival" id="tryVal">3</span></label>
                <input type="range" id="tryRange" min="2" max="4" step="1" value="3">
              </div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn try-step-btn" data-val="4" style="font-size:12px; padding:3px 8px; background:#fee2e2; border:1px solid #ef4444; color:#b91c1c;">1. 試估商取 4 (太大)</button>
                <button class="nav-btn try-step-btn" data-val="3" style="font-size:12px; padding:3px 8px; background:#dcfce7; border:1.5px solid #22c55e; color:#15803d; font-weight:900;">2. 調小商取 3 (成功) 🎉</button>
                <button class="nav-btn try-step-btn" data-val="2" style="font-size:12px; padding:3px 8px; background:#fef3c7; border:1px solid #d97706; color:#b45309;">3. 試估商取 2 (太小)</button>
              </div>
            </div>`;

          const draw = () => {
            const q = +h.querySelector('#tryRange').value;
            h.querySelector('#tryVal').textContent = q;
            const div = 25, num = 87;
            const prod = div * q;
            const rem = num - prod;

            let s = '';
            s += BOX(15, 6, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 24, `試商調商實驗室： 87 ÷ 25 ＝ ？（除數 25）`, { fs: 15, c: AMB, anchor: 'middle', fw: 900 });

            // 試商結果卡片
            if (q === 2) {
              s += BOX(25, 38, 390, 110, { fill: '#fef2f2', stroke: '#dc2626', r: 8 });
              s += TX(220, 62, '❌ 商取 2： 25 × 2 ＝ 50', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
              s += TX(220, 86, '計算餘數：87 － 50 ＝ 37', { fs: 14, c: '#b91c1c', anchor: 'middle', fw: 800 });
              s += TX(220, 112, '⚠️ 警示：餘數 37 ＞ 除數 25！商太小了，必須調大！', { fs: 12.5, c: RED, anchor: 'middle', fw: 900 });
              s += TX(220, 134, '👉 下一步：把商調大為 3 試試看！', { fs: 12, c: '#b45309', anchor: 'middle', fw: 900 });
            } else if (q === 3) {
              s += BOX(25, 38, 390, 110, { fill: '#f0fdf4', stroke: '#16a34a', sw: 2, r: 8 });
              s += TX(220, 62, '🎉 剛好成功！ 商取 3： 25 × 3 ＝ 75', { fs: 15, c: '#15803d', anchor: 'middle', fw: 900 });
              s += TX(220, 86, '計算餘數：87 － 75 ＝ 12', { fs: 14, c: '#15803d', anchor: 'middle', fw: 800 });
              s += TX(220, 112, '✅ 檢驗：餘數 12 ＜ 除數 25，且 75 ＜ 87，完全符合！', { fs: 12.5, c: '#15803d', anchor: 'middle', fw: 900 });
              s += TX(220, 134, '完美！商 3 餘 12 就是正確解答！', { fs: 12, c: '#15803d', anchor: 'middle', fw: 800 });
            } else {
              s += BOX(25, 38, 390, 110, { fill: '#fef2f2', stroke: '#dc2626', sw: 2, r: 8 });
              s += TX(220, 62, '❌ 估商取 4： 25 × 4 ＝ 100', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
              s += TX(220, 86, '乘積 100 ＞ 被除數 87，根本不夠減！', { fs: 14, c: '#b91c1c', anchor: 'middle', fw: 800 });
              s += TX(220, 112, '⚠️ 警示：乘積爆掉啦！商估太大了，必須調小！', { fs: 12.5, c: RED, anchor: 'middle', fw: 900 });
              s += TX(220, 134, '👉 下一步：把商調小 1 級，改取 3 試試看！', { fs: 12, c: '#15803d', anchor: 'middle', fw: 900 });
            }

            // 輔導員秘笈卡
            s += BOX(25, 158, 390, 80, { fill: '#fff', stroke: '#fcd34d', r: 8 });
            s += TX(40, 180, '💡 輔導員試商心法（調商三部曲）：', { fs: 12.5, c: AMB, fw: 900 });
            s += TX(40, 200, '1. 乘積太大 ➔ 商調小（不夠減就退一級）。', { fs: 12, c: '#334155' });
            s += TX(40, 218, '2. 餘數比除數大 ➔ 商調大（還能再分就進一級）。', { fs: 12, c: '#334155' });
            s += TX(40, 233, '3. 試錯很正常！調商是鍛鍊數感最棒的過程！', { fs: 11.5, c: '#15803d', fw: 900 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#tryRange').oninput = draw;
          h.querySelectorAll('.try-step-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelector('#tryRange').value = btn.dataset.val;
              draw();
            };
          });
          draw();
        },
        caption: '拉動滑桿體驗試商：餘數比除數大表示商太小，乘積超過被除數表示商太大。',
        example: {
          q: '學校準備 87 瓶礦泉水，每班發 25 瓶，最多發給幾個班？還剩幾瓶？',
          steps: [
            '用 20 估算試商：25 × 3 ＝ 75。',
            '87 － 75 ＝ 12。',
            '檢查餘數：12 ＜ 25，符合除法規範。',
            '答：發給 3 個班，還剩下 12 瓶。'
          ],
          ans: '3 個班，剩 12 瓶'
        }
      },

      // 4-3 Slide 3: 三位數÷二位數
      {
        sec: '4-3', secName: '三位數÷二位數',
        title: '先看前兩位，夠除商在十位，不夠看三位',
        points: [
          '前兩位比除數大：商的第一位<span class="k">寫在十位</span>。',
          '前兩位比除數小：商的第一位<span class="k">寫在個位</span>。',
          '先除十位，再除個位，層次分明。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn p4-btn" data-st="all" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">📖 課本兩步全景對照</button>
                <button class="nav-btn p4-btn" data-st="1" style="font-size:11.5px; padding:3px 8px;">Step 1: 十位 67÷21＝3 (餘4)</button>
                <button class="nav-btn p4-btn" data-st="2" style="font-size:11.5px; padding:3px 8px;">Step 2: 個位 42÷21＝2 (除盡) 🎉</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(12, 8, 416, 232, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '672 ÷ 21 ＝ ( 32 )', { fs: 14.5, c: AMB, anchor: 'middle', fw: 900 });

            // Step 1 卡片
            const c1Border = (st === 1 || st === '1') ? '#2563eb' : '#cbd5e1';
            const c1Sw = (st === 1 || st === '1') ? 2 : 1;
            s += `<g transform="translate(30, 36)">`;
            s += `<rect x="0" y="0" width="168" height="142" rx="6" fill="#fff" stroke="${c1Border}" stroke-width="${c1Sw}"/>`;
            s += TX(84, 16, 'Step 1：十位 67 ÷ 21', { fs: 11.5, c: BLU, anchor: 'middle', fw: 900 });
            s += TX(88, 32, '百', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(112, 32, '十', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(136, 32, '個', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(112, 47, '3', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            // 課本標準除號（左側圓潤括弧＋平整頂橫線）
            s += `<path d="M 68,72 C 63,66.5 63,56.5 68,51 L 148,51" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
            s += TX(44, 67, '2', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 67, '1', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(88, 67, '6', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(112, 67, '7', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(136, 67, '2', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(88, 83, '6', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += TX(112, 83, '3', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += `<line x1="80" y1="87" x2="120" y2="87" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(112, 103, '4', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            // 課本向上指引箭頭
            s += `<line x1="112" y1="130" x2="112" y2="114" stroke="#a89a8c" stroke-width="1.5"/>`;
            s += `<polygon points="112,108 108.5,115 115.5,115" fill="#a89a8c"/>`;
            s += `</g>`;

            // 箭頭
            s += TX(220, 107, '➜', { fs: 22, c: '#94a3b8', anchor: 'middle' });

            // Step 2 卡片
            const c2Border = (st === 2 || st === '2' || st === 'all') ? '#16a34a' : '#cbd5e1';
            const c2Sw = (st === 2 || st === '2' || st === 'all') ? 2 : 1;
            s += `<g transform="translate(242, 36)">`;
            s += `<rect x="0" y="0" width="168" height="142" rx="6" fill="#fff" stroke="${c2Border}" stroke-width="${c2Sw}"/>`;
            s += TX(84, 16, 'Step 2：個位 42 ÷ 21 🎉', { fs: 11.5, c: '#16a34a', anchor: 'middle', fw: 900 });
            s += TX(88, 32, '百', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(112, 32, '十', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(136, 32, '個', { fs: 9.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(112, 47, '3', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(136, 47, '2', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            // 課本標準除號（左側圓潤括弧＋平整頂橫線）
            s += `<path d="M 68,72 C 63,66.5 63,56.5 68,51 L 148,51" fill="none" stroke="#1e293b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
            s += TX(44, 67, '2', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(58, 67, '1', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(88, 67, '6', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(112, 67, '7', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(136, 67, '2', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(88, 83, '6', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(112, 83, '3', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += `<line x1="80" y1="87" x2="120" y2="87" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(112, 101, '4', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
            s += TX(136, 101, '2', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += TX(112, 117, '4', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += TX(136, 117, '2', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += `<line x1="104" y1="121" x2="144" y2="121" stroke="#1e293b" stroke-width="1.3"/>`;
            s += TX(136, 134, '0', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
            s += TX(149, 134, '←除盡', { fs: 10, c: '#16a34a', fw: 800 });
            s += `</g>`;

            // 下方解說卡
            s += BOX(20, 184, 400, 48, { fill: '#fff', stroke: '#93c5fd', r: 6 });
            if (st === 1 || st === '1') {
              s += TX(36, 203, 'Step 1: 前兩位 67 ＞ 21 夠除，商的第一位寫在「十位」！', { fs: 12, c: BLU, fw: 900 });
              s += TX(36, 221, '21 × 3 ＝ 63，67 － 63 ＝ 4（餘 4 個十），下一步移下個位 2。', { fs: 11.5, c: '#475569' });
            } else if (st === 2 || st === '2') {
              s += TX(36, 203, 'Step 2: 移下個位 2 合成 42，42 ÷ 21 ＝ 2 剛好除盡！商為 32 🎉', { fs: 12, c: '#16a34a', fw: 900 });
              s += TX(36, 221, '驗算：21 × 32 ＝ 672，完全正確！商是二位數（32）。', { fs: 11.5, c: '#15803d' });
            } else {
              s += TX(36, 203, '💡 課本標準二步演進口訣（點擊上方按鈕可分步聚焦）：', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(36, 221, '① 67÷21＝3（商在十位）餘 4 ➔ ② 移下 2 成 42÷21＝2 剛好除盡 🎉', { fs: 11.5, c: '#334155' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.p4-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.p4-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.st);
            };
          });
          render('all');
        },
        caption: '點擊按鈕分層觀察：前兩位 67 比 21 大，商的第一位在十位，結果是二位數。',
        example: {
          q: '烘焙坊烤了 672 個蛋黃酥，每 21 個裝一盒，總共可以裝成幾盒？',
          steps: [
            '前兩位 67 ＞ 21，商的第一位在十位。',
            '67 ÷ 21 ＝ 3 餘 4（十位寫 3）。',
            '個位移下合成 42，42 ÷ 21 ＝ 2（個位寫 2）。',
            '答：剛好裝成 32 盒。'
          ],
          ans: '32 盒'
        }
      },

      // 4-4 Slide 4: 除法驗算公式
      {
        sec: '4-4', secName: '除法驗算公式',
        title: '除數乘商加餘數，算完等於被除數',
        points: [
          '驗算公式：<span class="k">除數 × 商 ＋ 餘數 ＝ 被除數</span>。',
          '若算出的結果等於被除數，表示<span class="k">完全正確</span>。',
          '除法算完一定要養成驗算好習慣。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn v-btn" data-st="bal" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">⚖️ 驗算天平（8×272＋4＝2180）</button>
                <button class="nav-btn v-btn" data-st="unit" style="font-size:11.5px; padding:3px 8px;">⚠️ 致命陷阱：商與餘數的單位</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (st === 'bal') {
              s += TX(220, 26, '除法驗算天平：【除數 × 商】＋【餘數】＝ 被除數', { fs: 13.5, c: AMB, anchor: 'middle', fw: 900 });

              // 繪製平衡天平
              const cx = 220, cy = 115;
              // 支點三角形與底座
              s += `<polygon points="${cx},${cy-10} ${cx-16},${cy+28} ${cx+16},${cy+28}" fill="#64748b"/>`;
              s += `<rect x="${cx-25}" y="${cy+28}" width="50" height="8" rx="2" fill="#475569"/>`;
              // 橫樑（完全水平，代表兩邊平衡相等）
              s += `<line x1="60" y1="${cy-10}" x2="380" y2="${cy-10}" stroke="#0f172a" stroke-width="4"/>`;
              // 兩端托盤掛線
              s += `<line x1="90" y1="${cy-10}" x2="65" y2="${cy+15}" stroke="#94a3b8" stroke-width="1.8"/>`;
              s += `<line x1="90" y1="${cy-10}" x2="115" y2="${cy+15}" stroke="#94a3b8" stroke-width="1.8"/>`;
              s += `<line x1="60" y1="${cy+15}" x2="120" y2="${cy+15}" stroke="#334155" stroke-width="3"/>`;

              s += `<line x1="350" y1="${cy-10}" x2="325" y2="${cy+15}" stroke="#94a3b8" stroke-width="1.8"/>`;
              s += `<line x1="350" y1="${cy-10}" x2="375" y2="${cy+15}" stroke="#94a3b8" stroke-width="1.8"/>`;
              s += `<line x1="320" y1="${cy+15}" x2="380" y2="${cy+15}" stroke="#334155" stroke-width="3"/>`;

              // 左盤：被除數大砝碼
              s += BOX(65, cy - 20, 50, 35, { fill: '#dbeafe', stroke: BLU, r: 6 });
              s += TX(90, cy + 2, '2180', { fs: 14, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(90, cy - 26, '被除數', { fs: 11, c: BLU, anchor: 'middle', fw: 800 });

              // 右盤：除數x商 (2176) + 餘數 (4)
              s += BOX(322, cy - 20, 36, 35, { fill: '#fef3c7', stroke: AMB, r: 6 });
              s += TX(340, cy + 2, '2176', { fs: 12, c: AMB, anchor: 'middle', fw: 900 });
              s += TX(340, cy - 26, '8×272', { fs: 10.5, c: AMB, anchor: 'middle', fw: 800 });

              s += TX(363, cy - 2, '＋', { fs: 13, c: '#475569', anchor: 'middle', fw: 900 });

              s += BOX(369, cy - 12, 22, 27, { fill: '#fee2e2', stroke: RED, r: 4 });
              s += TX(380, cy + 5, '4', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              s += TX(380, cy - 18, '餘數', { fs: 10, c: RED, anchor: 'middle', fw: 800 });

              // 天平等號徽章
              s += `<circle cx="${cx}" cy="${cy - 30}" r="15" fill="#10b981"/>`;
              s += TX(cx, cy - 24, '＝', { fs: 16, c: '#fff', anchor: 'middle', fw: 900 });

              // 解說卡
              s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 193, '🎉 完美平衡！ 2180 ＝ 8 × 272 ＋ 4', { fs: 13, c: '#15803d', fw: 900 });
              s += TX(40, 212, '• 被除數被分出去 272 份（共 2176），剩下的 4 補回來剛好等於原數。', { fs: 11, c: '#334155' });
              s += TX(40, 227, '• 記住口訣：算完除法乘回去，加上餘數見真章！', { fs: 11, c: '#15803d', fw: 800 });
            } else {
              // 致命單位陷阱
              s += TX(220, 26, '⚠️ 輔導員診斷：商與餘數的單位大陷阱！', { fs: 13.5, c: RED, anchor: 'middle', fw: 900 });

              // 情境卡
              s += BOX(25, 38, 390, 48, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(220, 58, '題目：85 顆糖果，每 8 顆裝一包，可以裝幾包？剩下幾顆？', { fs: 12.5, c: '#1e293b', anchor: 'middle', fw: 800 });
              s += TX(220, 75, '列式：85 ÷ 8 ＝ 10 ⋯⋯ 5', { fs: 14, c: BLU, anchor: 'middle', fw: 900 });

              // 兩個對比方塊
              s += BOX(25, 92, 190, 72, { fill: '#fef2f2', stroke: RED, r: 8 });
              s += TX(120, 112, '❌ 學生最常寫錯：', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              s += TX(120, 133, '答：可裝 10 包，剩 5 包', { fs: 12.5, c: RED, anchor: 'middle', fw: 800 });
              s += TX(120, 150, '（誤把餘數單位也寫成包！）', { fs: 10.5, c: '#991b1b', anchor: 'middle' });

              s += BOX(225, 92, 190, 72, { fill: '#f0fdf4', stroke: GRN, r: 8 });
              s += TX(320, 112, '✅ 正確標準寫法：', { fs: 12, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(320, 133, '答：可裝 10 包，剩 5 顆', { fs: 13, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(320, 150, '（餘數單位跟著被除數「顆」）', { fs: 10.5, c: '#166534', anchor: 'middle' });

              // 輔導員口訣
              s += BOX(25, 172, 390, 62, { fill: '#fffbeb', stroke: '#f59e0b', r: 8 });
              s += TX(40, 193, '💡 輔導員破題秘笈：', { fs: 12, c: '#b45309', fw: 900 });
              s += TX(40, 212, '• 商（10）是「分裝出來的新單位」➔ 包', { fs: 12, c: BLU, fw: 800 });
              s += TX(40, 227, '• 餘數（5）是「裝不滿一包剩下的」➔ 仍是糖果原本的單位「顆」！', { fs: 12, c: RED, fw: 900 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.v-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.v-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.st);
            };
          });
          render('bal');
        },
        caption: '切換檢視：用驗算天平確認計算，並牢記商與餘數的單位不能搞混！',
        example: {
          q: '2180 ÷ 8 ＝ 272 ⋯⋯ 4，用算式驗算看看答案是否正確？',
          steps: [
            '寫出驗算公式：除數 × 商 ＋ 餘數。',
            '第一步：8 × 272 ＝ 2176。',
            '第二步：2176 ＋ 4 ＝ 2180。',
            '算出的結果剛好等於被除數 2180，表示答案正確！'
          ],
          ans: '驗算正確'
        }
      }

    ]
  });
})();
