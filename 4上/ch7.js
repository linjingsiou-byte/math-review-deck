/* ============ 第 7 章　小數 ============
   節次：7-1 二位小數與百分位的認識、7-2 二位小數的大小比較、7-3 二位小數的直式加減法
   對應課綱代碼：N-4-7 二位小數：位值概念、讀寫、大小比較、直式加減運算。
   課綱邊界：中年級以二位小數為限，不處理千分位與三位小數；不涉及小數乘除法。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#4f46e5';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', IND = '#4f46e5';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 7,
    title: '小數',
    color: C,
    sections: ['7-1 二位小數與百分位的認識', '7-2 二位小數的大小比較', '7-3 二位小數的直式加減法'],
    slides: [

      // 7-1 Slide 1: 二位小數與百分位的認識
      {
        sec: '7-1', secName: '二位小數與百分位的認識',
        title: '平分一百份，一份是0.01，百分位在小數點後第二位',
        points: [
          '把 1 平分成 100 份，每一份是 <span class="k">0.01（\\(\\frac{1}{100}\\)）</span>。',
          '小數點右邊第一位是 <span class="k">十分位</span>，第二位是 <span class="k">百分位</span>。',
          '0.25 讀作「<span class="k">零點二五</span>」（不讀二十五）。'
        ],
        visual: (h) => {
          let viewMode = 'grid'; // 'grid' 或 'strip'

          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>百格板著色：<span class="ival" id="gridVal">20</span> 格</label>
                <input type="range" id="gridRange" min="1" max="100" step="1" value="20">
              </div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn mode-strip-btn" style="font-size:12px; padding:3px 10px; background:#e0e7ff; border:1px solid #6366f1; color:#4338ca; font-weight:800;">條格對照：1 條(0.1) ＝ 10 格(0.01)</button>
              </div>
            </div>`;

          const draw = () => {
            const n = +h.querySelector('#gridRange').value;
            const fullStrips = Math.floor(n / 10);
            const remCells = n % 10;
            h.querySelector('#gridVal').textContent = `${n} 格 （即 0.${n < 10 ? '0' + n : n}）`;
            const decStr = (n / 100).toFixed(2);

            let s = '';
            s += BOX(15, 6, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 24, '百格板（10×10）與十分條/百分格解構', { fs: 15, c: IND, anchor: 'middle', fw: 900 });

            // 繪製 10x10 百格板
            const gx = 35, gy = 38, size = 120, cell = 12;
            s += BOX(gx, gy, size, size, { fill: '#fff', stroke: '#334155', r: 2 });
            for (let i = 0; i < 100; i++) {
              const r = Math.floor(i / 10), c = i % 10;
              const isFilled = (i < n);
              const isStrip = (viewMode === 'strip' && c < fullStrips);
              const cellColor = isStrip ? '#6366f1' : (isFilled ? '#818cf8' : '#fff');
              s += `<rect x="${gx + c * cell}" y="${gy + r * cell}" width="${cell}" height="${cell}" fill="${cellColor}" stroke="#cbd5e1" stroke-width="0.8"/>`;
            }

            // 右側數值卡與位值板
            s += BOX(175, 38, 240, 125, { fill: '#fff', stroke: '#c7d2fe', r: 8 });
            s += TX(295, 58, '二位小數解構與等值概念', { fs: 12.5, c: IND, anchor: 'middle', fw: 900 });
            s += TX(190, 80, `• 塗色份數：${n} / 100 ＝ ${decStr}`, { fs: 13, c: RED, fw: 900 });
            s += TX(190, 102, `• 解構：${fullStrips} 條 (0.1) ＋ ${remCells} 格 (0.01)`, { fs: 12, c: '#4338ca', fw: 800 });

            // 讀法
            let readP = '';
            if (n < 10) readP = `零點零${n}`;
            else {
              const s1 = Math.floor(n / 10), s2 = n % 10;
              const chn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
              readP = `零點${chn[s1]}${chn[s2]}`;
            }
            s += TX(190, 124, `• 讀作：${readP}`, { fs: 12, c: BLU, fw: 800 });

            if (n === 20 || (n % 10 === 0 && n > 0)) {
              s += TX(190, 146, `✨ 重要觀念：0.${n} ＝ 0.${n / 10}（末位 0 可省略）`, { fs: 11, c: '#059669', fw: 900 });
            } else {
              s += TX(190, 146, `十分位：${Math.floor(n / 10)}，百分位：${n % 10}`, { fs: 11, c: '#64748b' });
            }

            // 下方解說卡
            s += BOX(25, 172, 390, 64, { fill: '#fff', stroke: '#86efac', r: 8 });
            s += TX(40, 194, `💡 輔導員思維：10 小格合起來是 1 整條（0.1），100 格是一整張（1）。`, { fs: 12, c: '#15803d', fw: 900 });
            s += TX(40, 212, '位數多不一定比較大：0.2（2條＝20格）大於 0.19（19格）！', { fs: 12, c: RED, fw: 900 });
            s += TX(40, 228, '讀法切記：小數點後「一個字一個字唸」，不讀二十幾。', { fs: 10.5, c: '#334155' });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#gridRange').oninput = draw;
          h.querySelector('.mode-strip-btn').onclick = () => {
            viewMode = (viewMode === 'grid' ? 'strip' : 'grid');
            draw();
          };
          draw();
        },
        caption: '拖動滑桿觀察：百格板平分成 100 格，幾小格就是零點零幾或零點幾幾。',
        example: {
          q: '一條彩帶長 1 公尺，平分成 100 等份，25 等份是多少公尺？用小數怎麼記？',
          steps: [
            '1 等份是 \\(\\frac{1}{100}\\) 公尺，記作 0.01 公尺。',
            '25 等份是 25 個 0.01 公尺。',
            '記作 0.25 公尺。',
            '讀作「零點二五公尺」（不讀零點二十五）。'
          ],
          ans: '0.25 公尺'
        }
      },

      // 7-2 Slide 2: 二位小數的大小比較
      {
        sec: '7-2', secName: '二位小數的大小比較',
        title: '先比整數，再比十分位，最後比百分位',
        points: [
          '先比整數部分，整數大的小數比較大。',
          '整數相同時，比較 <span class="k">十分位</span>；十分位相同再比 <span class="k">百分位</span>。',
          '迷思防呆：<span class="k">1.5 ＝ 1.50 ＞ 1.47</span>，不是 47 ＞ 5！'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn cmp-btn" data-c="ex1" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">① 1.5 與 1.47 對照</button>
                <button class="nav-btn cmp-btn" data-c="ex2" style="font-size:11.5px; padding:3px 8px;">② 2.38 與 2.4 對照</button>
                <button class="nav-btn cmp-btn" data-c="lens" style="font-size:11.5px; padding:3px 8px;">🔍 數線放大鏡 (0.3 vs 0.19)</button>
              </div>
            </div>`;

          const render = (c) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (c === 'lens') {
              s += TX(220, 26, '🔍 數線放大鏡： 0.3（0.30） vs  0.19 誰比較大？', { fs: 14, c: IND, anchor: 'middle', fw: 900 });

              // 數線本體 (0 到 0.4，放大顯示)
              const sx = 50, sy = 100, len = 340;
              s += `<line x1="${sx}" y1="${sy}" x2="${sx + len}" y2="${sy}" stroke="#334155" stroke-width="3"/>`;

              // 主刻度 0, 0.1, 0.2, 0.3, 0.4 (每 0.1 為 80px)
              for (let i = 0; i <= 4; i++) {
                const x = sx + i * 80;
                s += `<line x1="${x}" y1="${sy - 8}" x2="${x}" y2="${sy + 8}" stroke="#334155" stroke-width="2.5"/>`;
                s += TX(x, sy + 24, (i * 0.1).toFixed(1), { fs: 13, c: '#0f172a', anchor: 'middle', fw: 900 });
              }

              // 細刻度 (每格 0.02)
              for (let i = 0; i <= 40; i++) {
                const x = sx + i * 8;
                if (i % 10 !== 0) {
                  s += `<line x1="${x}" y1="${sy - 4}" x2="${x}" y2="${sy + 4}" stroke="#94a3b8" stroke-width="1.2"/>`;
                }
              }

              // 標記 0.19 (x = 50 + 1.9 * 80 = 202)
              const x19 = sx + 1.9 * 80;
              s += `<circle cx="${x19}" cy="${sy}" r="5" fill="${RED}"/>`;
              s += `<line x1="${x19}" y1="${sy}" x2="${x19}" y2="${sy - 38}" stroke="${RED}" stroke-width="1.8" stroke-dasharray="2,2"/>`;
              s += BOX(x19 - 28, sy - 60, 56, 22, { fill: '#fee2e2', stroke: RED, r: 4 });
              s += TX(x19, sy - 44, '0.19', { fs: 12, c: RED, anchor: 'middle', fw: 900 });

              // 標記 0.30 (x = 50 + 3.0 * 80 = 290)
              const x30 = sx + 3.0 * 80;
              s += `<circle cx="${x30}" cy="${sy}" r="6" fill="#15803d"/>`;
              s += `<line x1="${x30}" y1="${sy}" x2="${x30}" y2="${sy - 38}" stroke="#15803d" stroke-width="1.8" stroke-dasharray="2,2"/>`;
              s += BOX(x30 - 36, sy - 60, 72, 22, { fill: '#dcfce7', stroke: '#15803d', r: 4 });
              s += TX(x30, sy - 44, '0.3 (0.30)', { fs: 12, c: '#15803d', anchor: 'middle', fw: 900 });

              // 解說卡
              s += BOX(25, 168, 390, 66, { fill: '#fff', stroke: '#c7d2fe', r: 8 });
              s += TX(40, 189, '❌ 學生迷思：看到 19 比 3 大，就誤以為 0.19 ＞ 0.3！', { fs: 12, c: RED, fw: 800 });
              s += TX(40, 209, '✅ 數線真相：0.3 ＝ 0.30（30 個 0.01），0.19 只有 19 個 0.01！', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 225, '數線上越往右邊越大，0.3 明顯在 0.19 的右邊一大截 ➔ 0.3 ＞ 0.19 🎉', { fs: 11.5, c: IND, fw: 800 });
            } else {
              s += TX(220, 26, '小數比大小：位值對齊逐位比（破解位數迷思）', { fs: 14.5, c: IND, anchor: 'middle', fw: 900 });

              const n1 = (c === 'ex1' ? '1.50' : '2.40');
              const n1_orig = (c === 'ex1' ? '1.5' : '2.4');
              const n2 = (c === 'ex1' ? '1.47' : '2.38');

              // 雙數對照卡
              s += BOX(30, 40, 380, 115, { fill: '#fff', stroke: '#c7d2fe', r: 8 });
              s += TX(220, 62, `比較題目： ${n1_orig}  與  ${n2}`, { fs: 15, c: IND, anchor: 'middle', fw: 900 });

              // 位值對齊
              const sx = 120, sy = 80;
              s += TX(sx + 30, sy, '個位', { fs: 11, c: '#64748b' });
              s += TX(sx + 60, sy, '•', { fs: 11, c: RED });
              s += TX(sx + 80, sy, '十分位', { fs: 11, c: RED, fw: 900 });
              s += TX(sx + 130, sy, '百分位', { fs: 11, c: '#64748b' });

              // 數 1
              s += TX(sx + 35, sy + 22, n1[0], { fs: 16, fw: 800 });
              s += TX(sx + 60, sy + 22, '.', { fs: 16, fw: 800 });
              s += TX(sx + 90, sy + 22, n1[2], { fs: 17, c: RED, fw: 900 });
              s += TX(sx + 140, sy + 22, '0', { fs: 14, c: '#94a3b8' });
              s += TX(sx + 165, sy + 22, `(末尾補 0)`, { fs: 10, c: '#94a3b8' });

              // 數 2
              s += TX(sx + 35, sy + 44, n2[0], { fs: 16, fw: 800 });
              s += TX(sx + 60, sy + 44, '.', { fs: 16, fw: 800 });
              s += TX(sx + 90, sy + 44, n2[2], { fs: 17, c: RED, fw: 900 });
              s += TX(sx + 140, sy + 44, n2[3], { fs: 16, fw: 800 });

              // 下方說明卡
              s += BOX(25, 168, 390, 66, { fill: '#fff', stroke: '#86efac', r: 8 });
              if (c === 'ex1') {
                s += TX(40, 190, '✅ 正確分析：整數都是 1，比十分位：5 ＞ 4，所以 1.5 ＞ 1.47！', { fs: 12, c: '#15803d', fw: 900 });
                s += TX(40, 210, '❌ 學生常見迷思：看到 47 比 5 大，誤以為 1.47 ＞ 1.5（大錯特錯！）。', { fs: 11, c: RED, fw: 800 });
                s += TX(40, 224, '秘訣：1.5 相當於 1.50，50 個 0.01 當然大於 47 個 0.01！', { fs: 11, c: '#334155' });
              } else {
                s += TX(40, 190, '✅ 正確分析：整數都是 2，比十分位：4 ＞ 3，所以 2.4 ＞ 2.38！', { fs: 12, c: '#15803d', fw: 900 });
                s += TX(40, 210, '2.4 ＝ 2.40，2.40 ＞ 2.38。比小數大小一定要先看十分位！', { fs: 11, c: '#15803d' });
                s += TX(40, 224, '兩位數長短不等時，先補齊位數（2.4 補 0 變 2.40）就不會看錯！', { fs: 11, c: '#334155' });
              }
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.cmp-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.cmp-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.c);
            };
          });
          render('ex1');
        },
        caption: '點擊切換查看：位值對齊比較法與數線幾何放大鏡，徹底消除字數長短迷思。',
        example: {
          q: '小明身高 1.47 公尺，哥哥身高 1.5 公尺，誰的身高比較高？',
          steps: [
            '先比整數部分：都是 1 公尺，一樣大。',
            '再比十分位：1.5 的十分位是 5，1.47 的十分位是 4。',
            '5 ＞ 4，所以 1.5 ＞ 1.47（1.50 公尺 ＞ 1.47 公尺）。',
            '答：哥哥比較高。'
          ],
          ans: '哥哥比較高'
        }
      },

      // 7-3 Slide 3: 二位小數的直式加減法
      {
        sec: '7-3', secName: '二位小數的直式加減法',
        title: '小數點對齊，末尾是零要劃掉',
        points: [
          '直式計算時，<span class="k">小數點一定要對齊</span>。',
          '由百分位算起，滿十向前進位，不夠向左借位。',
          '計算結果最末尾的 0 <span class="k">要劃除化簡</span>（如 1.80 記作 1.8）。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn d7-btn" data-s="1" style="font-size:12px; padding:4px 8px;">Step 1: 小數點對齊</button>
                <button class="nav-btn d7-btn" data-s="2" style="font-size:12px; padding:4px 8px;">Step 2: 百分位相減</button>
                <button class="nav-btn d7-btn" data-s="3" style="font-size:12px; padding:4px 8px;">Step 3: 十分位借位</button>
                <button class="nav-btn d7-btn" data-s="4" style="font-size:12px; padding:4px 8px;">Step 4: 末尾0劃掉化簡 🎉</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '直式減法與末位 0 劃除： 3.25 － 1.45 ＝ 1.8', { fs: 15, c: IND, anchor: 'middle', fw: 900 });

            // 直式繪製
            const sx = 120, sy = 40;
            s += BOX(sx - 35, sy, 180, 135, { fill: '#fff', stroke: '#cbd5e1', r: 8 });

            // 輔導專家優化：小數點垂直貫穿對齊光柱 (淡藍虛線與標籤)
            s += `<line x1="${sx + 35}" y1="${sy + 18}" x2="${sx + 35}" y2="${sy + 118}" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3,2"/>`;
            s += BOX(sx + 15, sy + 6, 40, 15, { fill: '#e0f2fe', stroke: '#38bdf8', r: 3 });
            s += TX(sx + 35, sy + 17, '對齊線', { fs: 9.5, c: '#0369a1', anchor: 'middle', fw: 900 });

            // 借位記號
            if (st >= 3) {
              s += TX(sx + 15, sy + 22, '2', { fs: 11, c: RED, fw: 900 });
              s += TX(sx + 55, sy + 22, '12', { fs: 11, c: RED, fw: 900 });
            }

            // 被減數 3.25
            s += TX(sx + 15, sy + 40, '3', { fs: 17, anchor: 'middle' });
            s += TX(sx + 35, sy + 40, '.', { fs: 17, c: RED, fw: 900, anchor: 'middle' });
            s += TX(sx + 55, sy + 40, '2', { fs: 17, anchor: 'middle' });
            s += TX(sx + 75, sy + 40, '5', { fs: 17, anchor: 'middle' });

            // 減數 1.45
            s += TX(sx - 15, sy + 64, '－', { fs: 18, c: RED, fw: 900, anchor: 'middle' });
            s += TX(sx + 15, sy + 64, '1', { fs: 17, anchor: 'middle' });
            s += TX(sx + 35, sy + 64, '.', { fs: 17, c: RED, fw: 900, anchor: 'middle' });
            s += TX(sx + 55, sy + 64, '4', { fs: 17, anchor: 'middle' });
            s += TX(sx + 75, sy + 64, '5', { fs: 17, anchor: 'middle' });

            s += `<line x1="${sx - 20}" y1="${sy + 74}" x2="${sx + 95}" y2="${sy + 74}" stroke="#334155" stroke-width="2"/>`;

            // 答案逐位
            if (st >= 2) s += TX(sx + 75, sy + 98, '0', { fs: 17, c: (st === 4 ? '#94a3b8' : RED), fw: 900, anchor: 'middle' });
            if (st >= 3) {
              s += TX(sx + 55, sy + 98, '8', { fs: 17, c: BLU, fw: 900, anchor: 'middle' });
              s += TX(sx + 35, sy + 98, '.', { fs: 17, c: RED, fw: 900, anchor: 'middle' });
              s += TX(sx + 15, sy + 98, '1', { fs: 17, c: GRN, fw: 900, anchor: 'middle' });
            }
            if (st === 4) {
              // 劃掉末尾 0 的斜線
              s += `<line x1="${sx + 68}" y1="${sy + 104}" x2="${sx + 82}" y2="${sy + 88}" stroke="${RED}" stroke-width="2.5"/>`;
              s += TX(sx + 115, sy + 98, '← 劃掉 0', { fs: 11, c: RED, fw: 900 });
            }

            // 下方解說卡
            s += BOX(25, 182, 390, 52, { fill: '#fff', stroke: '#86efac', r: 8 });
            if (st === 1) {
              s += TX(40, 204, 'Step 1: 先將兩個數的「小數點垂直對齊」，確保位值相同。', { fs: 12, c: BLU, fw: 900 });
            } else if (st === 2) {
              s += TX(40, 204, 'Step 2: 百分位相減：5 － 5 ＝ 0，寫在百分位。', { fs: 12, c: RED, fw: 900 });
            } else if (st === 3) {
              s += TX(40, 204, 'Step 3: 十分位 2 不夠減 4，向個位借 1 當 10：12 － 4 ＝ 8；個位 2 － 1 ＝ 1。', { fs: 11, c: '#334155' });
            } else {
              s += TX(40, 204, 'Step 4: 小數末尾若有 0，必須用斜線劃除化簡：1.80 記作 1.8 🎉', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 222, '標準答案記作 1.8 公尺（國小評量末位 0 未劃除常被扣分）。', { fs: 11, c: RED });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.d7-btn').forEach(btn => {
            btn.onclick = () => render(+btn.dataset.s);
          });
          render(1);
        },
        caption: '點擊 Step 觀察：直式小數點嚴格對齊，算完後小數最末尾的 0 必須劃掉化簡。',
        example: {
          q: '一條繩子原來長 3.25 公尺，綁禮盒用去 1.45 公尺後，還剩下多少公尺？',
          steps: [
            '小數點對齊列出直式：3.25 － 1.45。',
            '百分位：5 － 5 ＝ 0。',
            '十分位借位：12 － 4 ＝ 8；個位借 1 剩 2：2 － 1 ＝ 1。',
            '算得 1.80，末尾的 0 劃掉化簡為 1.8，答：1.8 公尺。'
          ],
          ans: '1.8 公尺'
        }
      }

    ]
  });
})();
