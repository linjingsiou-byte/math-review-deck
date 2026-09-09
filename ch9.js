/* ============ 第 9 章　分數 ============
   依康軒國小 3 上第 9 單元：
   9-1 幾分之幾（一）
   9-2 幾分之幾（二）
   9-3 分數的數線與序列
   9-4 同分母分數的大小比較
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#0ea5e9';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  // HTML 原生垂直分數卡產生器（用於動態 JS 滑桿標籤，避免非同步 TeX 排版未觸發問題）
  const hFrac = (a, b) => `<span class="mfrac"><span class="num">${a}</span><span class="den">${b}</span></span>`;

  window.DECK.push({
    ch: 9,
    title: '分數',
    color: C,
    sections: ['9-1 幾分之幾（一）', '9-2 幾分之幾（二）', '9-3 分數的數線與序列', '9-4 同分母分數的大小比較'],
    slides: [

      /* ---------- 9-1 幾分之幾（一） ---------- */
      {
        sec: '9-1',
        secName: '幾分之幾（一）',
        title: '平分成幾份，其中1份就是幾分之一',
        points: [
          '一張蔥油餅平分成 4 片，1 片是 <span class="k">\\(\\frac{1}{4}\\) 張蔥油餅</span>。',
          '2 片是 <span class="k">\\(\\frac{2}{4}\\) 張</span>，3 片是 <span class="k">\\(\\frac{3}{4}\\) 張</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 170" style="max-width:100%">
              <g class="pieg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>拿取片數：<span class="ival numv">3</span> 片 (＝ <span class="ival totalv"></span> 張蔥油餅)</label>
              <input class="pie-r" type="range" min="1" max="4" step="1" value="3">
            </div>
          </div>`;
          const sl = h.querySelector('.pie-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), pieg = h.querySelector('.pieg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = hFrac(n, 4);
            let out = SV.fractionPie({ cx: 200, cy: 85, r: 70, total: 4, parts: n, colors: ['#0ea5e9', '#f1f5f9'] });
            for (let i = 0; i < 4; i++) {
              const ang = i * 90 + 45 - 90;
              const rad = ang * Math.PI / 180;
              const tx = 200 + 48 * Math.cos(rad);
              const ty = 85 + 48 * Math.sin(rad);
              out += SV.fracSVG(tx, ty - 6, 1, 4, { fs: 12, c: i < n ? '#ffffff' : '#475569' });
            }
            pieg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '拖動滑桿，觀察平分成 4 片時，1片、2片、3片、4片代表的分數。',
        example: {
          q: '一個披薩平分成 8 片，品妍吃了 3 片，是吃了幾個披薩？',
          steps: [
            '1 片是 \\(\\frac{1}{8}\\) 個披薩',
            '3 片是 3 個 \\(\\frac{1}{8}\\)，合起來是 \\(\\frac{3}{8}\\) 個披薩'
          ],
          ans: '\\(\\frac{3}{8}\\) 個披薩'
        }
      },

      {
        sec: '9-1',
        secName: '幾分之幾（一）',
        title: '分母代表平分總份數，分子代表佔有份數',
        points: [
          '分數線下方的數字叫做 <span class="k">分母</span>（代表平分成的總份數）。',
          '分數線上方的數字叫做 <span class="k">分子</span>（代表佔了其中的幾份）。'
        ],
        visual: (h) => {
          h.innerHTML = SV.fbox([
            { label: '分數的構造', tex: '\\frac{\\text{分子}}{\\text{分母}} = \\frac{3}{4}', color: C, fill: '#f0f9ff', note: '分母在下（平分4份），分子在上（佔3份）' },
            { label: '讀法與記法', tex: '\\text{記作 } \\frac{3}{4} \\longrightarrow \\text{讀作「四分之三」}', color: VIO, fill: '#f5f3ff', note: '注意：讀法從分母先讀！' }
          ], { gap: 12 });
        },
        caption: '牢記分數的結構：分母在下，分子在上，讀法從分母先讀！',
        example: {
          q: '在分數 \\(\\frac{5}{8}\\) 中，分母是多少？分子是多少？讀作什麼？',
          steps: [
            '線下方的數字是分母 ➔ 8',
            '線上方的數字是分子 ➔ 5',
            '讀法從分母先讀 ➔ 八分之五'
          ],
          ans: '分母是 8，分子是 5，讀作八分之五'
        }
      },

      {
        sec: '9-1',
        secName: '幾分之幾（一）',
        title: '4個 \\(\\frac{1}{4}\\) 就是 \\(\\frac{4}{4}\\)，等於 1 個整體',
        points: [
          '4 片 \\(\\frac{1}{4}\\) 張蔥油餅合起來是 <span class="k">\\(\\frac{4}{4}\\) 張</span>。',
          '\\(\\frac{4}{4}\\) 張蔥油餅就是 <span class="k">1 張完整的蔥油餅</span>（\\(\\frac{4}{4} = 1\\)）。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 160" style="max-width:100%">
              <g class="fullg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>累積片數：<span class="ival numv">4</span> 片 (＝ <span class="ival totalv"></span>)</label>
              <input class="full-r" type="range" min="1" max="4" step="1" value="4">
            </div>
          </div>`;
          const sl = h.querySelector('.full-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), fullg = h.querySelector('.fullg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = n === 4 ? `${hFrac(4, 4)} ＝ 1` : hFrac(n, 4);
            let out = SV.fractionPie({ cx: 200, cy: 80, r: 65, total: 4, parts: n, colors: [n === 4 ? '#059669' : '#0ea5e9', '#f1f5f9'] });
            out += `<rect x="290" y="55" width="95" height="50" rx="10" fill="${n === 4 ? '#ecfdf5' : '#eff6ff'}" stroke="${n === 4 ? '#059669' : '#0ea5e9'}" stroke-width="1.8"/>`;
            out += `<text x="337" y="85" text-anchor="middle" font-size="15" font-weight="900" fill="${n === 4 ? '#059669' : '#0ea5e9'}">${n === 4 ? '等於 1 張！' : n + ' / 4'}</text>`;
            fullg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '拖動滑桿，當分子與分母相同時（如 \\(\\frac{4}{4}\\)），就等於完整的一個（1）！',
        example: {
          q: '一個檸檬派切成 6 片，宇翔吃了 6 片，是吃了幾個檸檬派？',
          steps: [
            '6 片 \\(\\frac{1}{6}\\) 合起來是 \\(\\frac{6}{6}\\) 個',
            '\\(\\frac{6}{6}\\) 等於 1 個完整的檸檬派'
          ],
          ans: '\\(\\frac{6}{6}\\) 個（等於 1 個檸檬派）'
        }
      },

      /* ---------- 9-2 幾分之幾（二） ---------- */
      {
        sec: '9-2',
        secName: '幾分之幾（二）',
        title: '離散量：一盒有10個果凍，3個就是 \\(\\frac{3}{10}\\) 盒',
        points: [
          '一盒果凍有 10 個，1 個是 <span class="k">\\(\\frac{1}{10}\\) 盒</span>。',
          '大寶吃了 3 個果凍，是吃了 <span class="k">\\(\\frac{3}{10}\\) 盒果凍</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 160" style="max-width:100%">
              <g class="boxg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>拿取果凍：<span class="ival numv">3</span> 個 (＝ <span class="ival totalv"></span> 盒)</label>
              <input class="box-r" type="range" min="1" max="10" step="1" value="3">
            </div>
          </div>`;
          const sl = h.querySelector('.box-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), boxg = h.querySelector('.boxg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = hFrac(n, 10);
            let out = `<rect x="30" y="20" width="340" height="110" rx="12" fill="#ffffff" stroke="#0ea5e9" stroke-width="2.2"/>`;
            out += `<text x="200" y="40" text-anchor="middle" font-size="13" font-weight="900" fill="#0ea5e9">【一盒果凍（10 個裝）】</text>`;
            for (let i = 0; i < 10; i++) {
              const col = i % 5;
              const row = Math.floor(i / 5);
              const cx = 65 + col * 68;
              const cy = 62 + row * 42;
              const isEaten = i < n;
              out += `<circle cx="${cx}" cy="${cy}" r="17" fill="${isEaten ? '#0ea5e9' : '#e2e8f0'}" stroke="${isEaten ? '#0284c7' : '#cbd5e1'}" stroke-width="1.6"/>`;
              out += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="11" font-weight="900" fill="${isEaten ? '#ffffff' : '#64748b'}">${i + 1}</text>`;
            }
            boxg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '拖動滑桿，觀察個數（顆/個）與盒裝分數之間的轉換對應。',
        example: {
          q: '一盒印章有 12 個，平分給 12 個小朋友，3 個小朋友一共分到幾盒印章？',
          steps: [
            '1 個印章是 \\(\\frac{1}{12}\\) 盒',
            '3 個印章是 3 個 \\(\\frac{1}{12}\\) 盒 ＝ \\(\\frac{3}{12}\\) 盒'
          ],
          ans: '\\(\\frac{3}{12}\\) 盒印章'
        }
      },

      {
        sec: '9-2',
        secName: '幾分之幾（二）',
        title: '離散量與剩餘量：吃掉幾盒，還剩下幾盒？',
        points: [
          '大寶吃了 3 個（\\(\\frac{3}{10}\\) 盒），小寶吃了 4 個（\\(\\frac{4}{10}\\) 盒）。',
          '兩人共吃了 <span class="k">7 個（\\(\\frac{7}{10}\\) 盒）</span>，還剩下 <span class="k">3 個（\\(\\frac{3}{10}\\) 盒）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = SV.fbox([
            { label: '吃掉的果凍', tex: '3 + 4 = 7 \\text{ 個} \\longrightarrow \\frac{7}{10} \\text{ 盒}', color: RED, fill: '#fff1f2', note: '大寶 3 個 ＋ 小寶 4 個 ＝ 共 7 個（\\(\\frac{7}{10}\\) 盒）' },
            { label: '剩下的果凍', tex: '10 - 7 = 3 \\text{ 個} \\longrightarrow \\frac{3}{10} \\text{ 盒}', color: GRN, fill: '#f0fdf4', note: '一盒 10 個扣掉 7 個，剩 3 個（\\(\\frac{3}{10}\\) 盒）' }
          ], { gap: 12 });
        },
        caption: '觀察：一盒有 10 個，剩下的個數直接對應剩餘的分數！',
        example: {
          q: '一盒甜甜圈有 6 個，妹妹拿走了 2 個，還剩下幾盒甜甜圈？',
          steps: [
            '一盒有 6 個，拿走 2 個，剩下 4 個',
            '4 個甜甜圈是 4 個 \\(\\frac{1}{6}\\) 盒 ＝ \\(\\frac{4}{6}\\) 盒'
          ],
          ans: '還剩下 \\(\\frac{4}{6}\\) 盒甜甜圈'
        }
      },

      /* ---------- 9-3 分數的數線與序列 ---------- */
      {
        sec: '9-3',
        secName: '分數的數線與序列',
        title: '把 1 公尺彩帶平分成 10 等分',
        points: [
          '1 公尺彩帶平分成 10 份，每一份是 <span class="k">\\(\\frac{1}{10}\\) 公尺</span>。',
          '5 份是 <span class="k">\\(\\frac{5}{10}\\) 公尺</span>（5 個 \\(\\frac{1}{10}\\) 公尺）。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 160" style="max-width:100%">
              <g class="ribg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>彩帶長度：<span class="ival numv">5</span> 份 (＝ <span class="ival totalv"></span> 公尺)</label>
              <input class="rib-r" type="range" min="1" max="10" step="1" value="5">
            </div>
          </div>`;
          const sl = h.querySelector('.rib-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), ribg = h.querySelector('.ribg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = hFrac(n, 10);
            let out = SV.fractionBar({ x: 20, y: 55, w: 360, h: 45, total: 10, parts: n, colors: ['#0ea5e9', '#f1f5f9'] });
            out += `<text x="200" y="30" text-anchor="middle" font-size="14" font-weight="900" fill="#0ea5e9">【1 公尺彩帶】</text>`;
            out += SV.fracSVG((20 + n * 36), 115, n, 10, { fs: 12, c: '#e11d48' });
            out += `<text x="${(20 + n * 36 + 26).toFixed(1)}" y="128" font-size="12" font-weight="900" fill="#e11d48">公尺</text>`;
            ribg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '拖動滑桿，拉長塗色彩帶，觀察長度與分數的對應。',
        example: {
          q: '彩帶長 1 公尺，綠色彩帶佔了其中 7 份，綠色彩帶長幾公尺？',
          steps: [
            '1 份是 \\(\\frac{1}{10}\\) 公尺',
            '7 份是 7 個 \\(\\frac{1}{10}\\) 公尺 ＝ \\(\\frac{7}{10}\\) 公尺'
          ],
          ans: '\\(\\frac{7}{10}\\) 公尺'
        }
      },

      {
        sec: '9-3',
        secName: '分數的數線與序列',
        title: '分數數線：從 \\(\\frac{1}{10}\\) 到 \\(\\frac{10}{10}\\)（等於1）',
        points: [
          '分數可以在數線上標示刻度與位置。',
          '\\(\\frac{1}{10}, \\frac{2}{10}, \\frac{3}{10} \\dots \\frac{10}{10}\\)，最右端 <span class="k">\\(\\frac{10}{10} = 1\\) 公尺</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 160" style="max-width:100%">
              <g class="lineg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>數線位置：<span class="ival numv">7</span> (＝ <span class="ival totalv"></span>)</label>
              <input class="line-r" type="range" min="1" max="10" step="1" value="7">
            </div>
          </div>`;
          const sl = h.querySelector('.line-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), lineg = h.querySelector('.lineg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = hFrac(n, 10);
            const startX = 30, endX = 370, y = 75, w = endX - startX, stepW = w / 10;
            let out = SV.seg(startX, y, endX, y, '#0ea5e9', 3);
            for (let i = 0; i <= 10; i++) {
              const tx = startX + i * stepW;
              out += `<line x1="${tx}" y1="${y - 8}" x2="${tx}" y2="${y + 8}" stroke="#0ea5e9" stroke-width="${i === 0 || i === 10 ? 2.5 : 1.5}"/>`;
              if (i === 0) {
                out += `<text x="${tx}" y="${y + 26}" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">0</text>`;
              } else if (i === 10) {
                out += `<text x="${tx}" y="${y + 26}" text-anchor="middle" font-size="11" font-weight="800" fill="#334155">1 (10/10)</text>`;
              } else {
                out += SV.fracSVG(tx, y + 16, i, 10, { fs: 10, c: i === n ? '#e11d48' : '#334155' });
              }
            }
            const dotX = startX + n * stepW;
            out += SV.dot(dotX, y, '#e11d48', 7);
            out += `<path d="M${startX},${y - 18} L${dotX},${y - 18}" stroke="#e11d48" stroke-width="2.5" stroke-dasharray="4,3"/>`;
            out += SV.fracSVG((startX + dotX) / 2, y - 36, n, 10, { fs: 12, c: '#e11d48' });
            lineg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '拖動滑桿，觀察分數點在數線上的累積推進！',
        example: {
          q: '在分數數線上，\\(\\frac{7}{10}\\) 是幾個 \\(\\frac{1}{10}\\)？位在 \\(\\frac{6}{10}\\) 的左邊還是右邊？',
          steps: [
            '\\(\\frac{7}{10}\\) 是 7 個 \\(\\frac{1}{10}\\)',
            '數字 7 比 6 大，因此位在 \\(\\frac{6}{10}\\) 的右邊'
          ],
          ans: '7 個 \\(\\frac{1}{10}\\)，在 \\(\\frac{6}{10}\\) 的右邊'
        }
      },

      /* ---------- 9-4 同分母分數的大小比較 ---------- */
      {
        sec: '9-4',
        secName: '同分母分數的大小比較',
        title: '同分母分數比較：條形長度越長，分數越大',
        points: [
          '思妤吃了 <span class="k">\\(\\frac{2}{5}\\) 條壽司</span>，詠安吃了 <span class="k">\\(\\frac{4}{5}\\) 條壽司</span>。',
          '因為 4 份比 2 份長，所以 <span class="k">\\(\\frac{4}{5} > \\frac{2}{5}\\)</span>（詠安吃的比較多）。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 160" style="max-width:100%">
              <g class="cmpg"></g>
            </svg>
            <div class="ictrl" style="margin-top:8px">
              <label>詠安吃的份數：<span class="ival numv">4</span> 份 (＝ <span class="ival totalv"></span> 條)</label>
              <input class="cmp-r" type="range" min="1" max="5" step="1" value="4">
            </div>
          </div>`;
          const sl = h.querySelector('.cmp-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), cmpg = h.querySelector('.cmpg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.innerHTML = hFrac(n, 5);
            let out = `<text x="25" y="42" font-size="13" font-weight="900" fill="#0ea5e9">思妤 (2/5):</text>`;
            out += SV.fractionBar({ x: 100, y: 25, w: 260, h: 30, total: 5, parts: 2, colors: ['#0ea5e9', '#f1f5f9'] });
            out += `<text x="25" y="92" font-size="13" font-weight="900" fill="#e11d48">詠安 (${n}/5):</text>`;
            out += SV.fractionBar({ x: 100, y: 75, w: 260, h: 30, total: 5, parts: n, colors: ['#e11d48', '#f1f5f9'] });
            const isMore = n > 2;
            const isEqual = n === 2;
            const sym = isEqual ? '＝' : (isMore ? '＞' : '＜');
            out += `<text x="200" y="145" text-anchor="middle" font-size="16" font-weight="900" fill="${isMore ? '#e11d48' : '#0ea5e9'}">${n}/5 ${sym} 2/5 ${isEqual ? '（一樣多）' : (isMore ? '（詠安比較多）' : '（思妤比較多）')}</text>`;
            cmpg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '觀察長條圖：塗色長度越長，代表的分數就越大！',
        example: {
          q: '承恩吃了 \\(\\frac{5}{8}\\) 個披薩，子晴吃了 \\(\\frac{3}{8}\\) 個披薩，誰吃的比較多？',
          steps: [
            '5 個 \\(\\frac{1}{8}\\) 比 3 個 \\(\\frac{1}{8}\\) 長',
            '\\(\\frac{5}{8} > \\frac{3}{8}\\)'
          ],
          ans: '承恩吃的比較多'
        }
      },

      {
        sec: '9-4',
        secName: '同分母分數的大小比較',
        title: '分母相同時，比較分子：分子越大，分數越大',
        points: [
          '平分的份數相同時（分母相同），<span class="k">分子越大，分數就越大</span>。',
          '例：\\(\\frac{7}{10} > \\frac{5}{10} > \\frac{3}{10}\\)。'
        ],
        visual: (h) => {
          h.innerHTML = SV.fbox([
            { label: '同分母比較口訣', tex: '\\text{分母相同比分子} \\longrightarrow \\text{分子大，分數就大！}', color: C, fill: '#f0f9ff', note: '例如：\\(\\frac{7}{10} > \\frac{5}{10}\\)（因為 7 > 5）' },
            { label: '同分母比較小', tex: '\\text{分子小，分數就小！}', color: RED, fill: '#fff1f2', note: '例如：\\(\\frac{3}{9} < \\frac{5}{9}\\)（因為 3 < 5）' }
          ], { gap: 12 });
        },
        caption: '分母相同時，只要比分子！分子大的分數就比較大。',
        example: {
          q: '一盒檸檬塔有 9 個。宥廷吃了 \\(\\frac{5}{9}\\) 盒，芯語吃了 \\(\\frac{3}{9}\\) 盒，誰吃的比較少？',
          steps: [
            '比較分子：3 比 5 小',
            '\\(\\frac{3}{9} < \\frac{5}{9}\\)'
          ],
          ans: '芯語吃的比較少'
        }
      },

      {
        sec: '9-4',
        secName: '同分母分數的大小比較',
        title: '【易錯關卡】注意單位的差別：「個」與「盒」大不同',
        points: [
          '✗ <span style="color:#e11d48">品妍拿 5 片餅乾（\\(\\frac{5}{10}\\) 盒），柏宇拿 \\(\\frac{4}{10}\\) 盒 ➔ 5 > \\(\\frac{4}{10}\\)？</span>',
          '✓ 先把單位統一：<span class="k">5 片餅乾 ＝ \\(\\frac{5}{10}\\) 盒（5 片）</span>，\\(\\frac{5}{10} \\text{ 盒} > \\frac{4}{10} \\text{ 盒}\\)！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <table style="width:95%;margin:auto;border-collapse:collapse;font-size:14.5px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
              <tr style="background:#0ea5e9;color:#fff;font-weight:700">
                <th style="padding:8px;border:1px solid #cbd5e1">題目條件</th>
                <th style="padding:8px;border:1px solid #cbd5e1">常見迷思 (✗)</th>
                <th style="padding:8px;border:1px solid #cbd5e1">正確觀念 (✓)</th>
              </tr>
              <tr style="background:#fff">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">品妍 5 片 vs 柏宇 \\(\\frac{4}{10}\\) 盒</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">直接用數字 5 和 4 比較（混淆個與盒）</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">5 片 ＝ \\(\\frac{5}{10}\\) 盒，\\(\\frac{5}{10} > \\frac{4}{10}\\) 盒</td>
              </tr>
              <tr style="background:#f8fafc">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">水蜜桃 6 顆 vs \\(\\frac{5}{12}\\) 盒</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">以為 6 個是一大包數字不確定</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">6 顆 ＝ \\(\\frac{6}{12}\\) 盒，\\(\\frac{6}{12} > \\frac{5}{12}\\) 盒</td>
              </tr>
            </table>
          </div>`;
        },
        caption: '解題關鍵：比較大小前，記得先把單位統一成相同的單位（都是盒）！',
        example: {
          q: '一盒水蜜桃有 12 顆。小明拿 6 顆，小華拿 \\(\\frac{5}{12}\\) 盒，誰拿的水蜜桃比較多？',
          steps: [
            '6 顆水蜜桃是 \\(\\frac{6}{12}\\) 盒',
            '\\(\\frac{6}{12} \\text{ 盒} > \\frac{5}{12} \\text{ 盒}\\)'
          ],
          ans: '小明拿的比較多'
        }
      }

    ]
  });
})();
