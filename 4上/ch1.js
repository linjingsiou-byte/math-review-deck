/* ============ 第 1 章　一億以內的數 ============
   節次：1-1 十萬以內的數、1-2 一億以內的數、1-3 數的大小比較、1-4 大數的加減法
   對應課綱代碼：N-4-1 一億以內的數：位值概念與讀寫計算。
   課綱邊界：中年級不涉及億以上的數（如兆），不引入負數與未知數 x/y。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#2563eb';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 1,
    title: '一億以內的數',
    color: C,
    sections: ['1-1 十萬以內的數', '1-2 一億以內的數', '1-3 數的大小比較', '1-4 大數的加減法'],
    slides: [

      // 1-1 Slide 1: 十萬以內的數詞與位值
      {
        sec: '1-1', secName: '十萬以內的數',
        title: '十個一千是一萬，十個一萬是十萬',
        points: [
          '10 張千元鈔票可以換 <span class="k">1 張一萬元</span>。',
          '10 個一萬合起來就是 <span class="k">十萬（100000）</span>。',
          '定位板滿十向前一位進位。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>千元鈔票張數：<span class="ival" id="cntVal">8</span> 張</label>
                <input type="range" id="cntRange" min="1" max="10" step="1" value="8">
              </div>
            </div>`;

          const draw = () => {
            const n = +h.querySelector('#cntRange').value;
            h.querySelector('#cntVal').textContent = n;
            const total = n * 1000;
            let s = '';

            // 背景卡片
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (n < 10) {
              s += TX(220, 35, `目前共有 ${n} 張 1000 元 ＝ ${total} 元`, { fs: 15, c: BLU, anchor: 'middle' });
              // 繪製千元鈔票縮圖網格
              for (let i = 0; i < n; i++) {
                const rx = 35 + (i % 5) * 75;
                const ry = 55 + Math.floor(i / 5) * 45;
                s += BOX(rx, ry, 68, 38, { fill: '#e0f2fe', stroke: '#0284c7', r: 6 });
                s += TX(rx + 34, ry + 24, '1000', { fs: 13, c: '#0369a1', anchor: 'middle', fw: 900 });
              }
            } else {
              // 滿十進一！金色萬元大鈔
              s += BOX(30, 45, 380, 75, { fill: '#fef3c7', stroke: '#d97706', sw: 2.5, r: 12 });
              s += TX(220, 75, '🎉 滿 10 個一千！換成 1 張一萬元！', { fs: 15, c: '#b45309', anchor: 'middle', fw: 900 });
              s += TX(220, 105, '10000 元（一萬）', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
            }

            // 定位板對照
            const wan = Math.floor(total / 10000);
            const qian = Math.floor((total % 10000) / 1000);
            const cols = ['十萬位', '萬位', '千位', '百位', '十位', '個位'];
            const vals = [0, wan, qian, 0, 0, 0];
            const colW = 60, startX = 35, tableY = 145;

            cols.forEach((col, idx) => {
              const bx = startX + idx * colW;
              const isHl = (idx === 1 && wan > 0) || (idx === 2 && qian > 0);
              s += BOX(bx, tableY, colW, 28, { fill: isHl ? C : '#64748b', stroke: '#fff', r: 4 });
              s += TX(bx + colW / 2, tableY + 19, col, { fs: 12, c: '#fff', anchor: 'middle' });
              s += BOX(bx, tableY + 28, colW, 35, { fill: isHl ? '#eff6ff' : '#fff', stroke: '#e2e8f0', r: 0 });
              s += TX(bx + colW / 2, tableY + 52, vals[idx], { fs: 18, c: isHl ? RED : '#334155', anchor: 'middle', fw: 900 });
            });

            h.querySelector('#fig').innerHTML = svg('0 0 440 255', s);
          };

          h.querySelector('#cntRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿觀察：每滿 10 個一千，就向左邊的萬位進 1。',
        example: {
          q: '皮包裡有 8 張千元鈔票，媽媽再放進 2 張千元鈔票，合起來是多少元？',
          steps: [
            '8 張千元是 8000 元，再加 2 張千元是 2000 元。',
            '8 個千加 2 個千合起來是 10 個千。',
            '滿 10 個一千就是一萬（10000 元）。'
          ],
          ans: '10000 元'
        }
      },

      // 1-2 Slide 2: 一億以內的位值與四位一節
      {
        sec: '1-2', secName: '一億以內的數',
        title: '四位一國：萬位國與個位國分開讀',
        points: [
          '由右向左每 4 位成一國：<span class="k">個位國</span> 與 <span class="k">萬位國</span>（數學稱個級與萬級）。',
          '萬位國讀完加上「萬」，個位國照一般讀法。',
          '滿 10 個一千萬就是 <span class="k">一億（100000000）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn btn-sample" data-n="2345678" style="font-size:12px; padding:4px 10px;">臺北人口: 234萬5678</button>
                <button class="nav-btn btn-sample" data-n="5003020" style="font-size:12px; padding:4px 10px;">圖書藏量: 500萬3020</button>
                <button class="nav-btn btn-sample" data-n="98765432" style="font-size:12px; padding:4px 10px;">高鐵人次: 9876萬5432</button>
              </div>
            </div>`;

          const render = (numStr) => {
            const pad = numStr.padStart(8, '0');
            const wanPart = pad.slice(0, 4);
            const gePart = pad.slice(4, 8);
            let s = '';

            // 大背景
            s += BOX(10, 10, 420, 230, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 標題與分國提示
            s += BOX(25, 22, 190, 32, { fill: '#dbeafe', stroke: '#3b82f6', r: 8 });
            s += TX(120, 43, '【 萬 位 國 】（讀完加萬）', { fs: 13, c: '#1d4ed8', anchor: 'middle', fw: 900 });

            s += BOX(225, 22, 190, 32, { fill: '#dcfce7', stroke: '#22c55e', r: 8 });
            s += TX(320, 43, '【 個 位 國 】（一般讀法）', { fs: 13, c: '#15803d', anchor: 'middle', fw: 900 });

            // 8 格定位板
            const titles = ['千萬', '百萬', '十萬', '萬', '千', '百', '十', '個'];
            const startX = 25, colW = 47.5, tableY = 65;

            titles.forEach((t, i) => {
              const bx = startX + i * colW;
              const isWan = i < 4;
              s += BOX(bx, tableY, colW, 26, { fill: isWan ? '#2563eb' : '#059669', stroke: '#fff', r: 3 });
              s += TX(bx + colW / 2, tableY + 18, t, { fs: 12, c: '#fff', anchor: 'middle' });

              const d = pad[i];
              const isZero = (d === '0');
              s += BOX(bx, tableY + 26, colW, 36, { fill: isZero ? '#f1f5f9' : '#fff', stroke: '#e2e8f0', r: 0 });
              s += TX(bx + colW / 2, tableY + 51, d, { fs: 18, c: isZero ? '#94a3b8' : '#0f172a', anchor: 'middle', fw: 900 });
            });

            // 輔導專家優化：千位與萬位之間的四位一節分界線與標籤
            s += `<line x1="215" y1="58" x2="215" y2="132" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,2"/>`;
            s += BOX(187, 122, 56, 19, { fill: '#f59e0b', stroke: '#d97706', r: 4 });
            s += TX(215, 136, '四位一節', { fs: 11, c: '#fff', anchor: 'middle', fw: 900 });

            // 讀法展示卡
            const wanVal = parseInt(wanPart, 10);
            const geVal = parseInt(gePart, 10);
            s += BOX(25, 140, 390, 85, { fill: '#fff', stroke: '#93c5fd', r: 8 });
            s += TX(40, 165, `阿拉伯數字：${parseInt(numStr, 10).toLocaleString()}`, { fs: 14, c: '#475569' });
            s += TX(40, 190, `分成萬位國：${wanVal} 萬 ＋ 個位國：${geVal}`, { fs: 14, c: BLU, fw: 900 });

            // 中文報讀字串
            let readText = '';
            if (numStr === '2345678') readText = '二百三十四萬 五千六百七十八';
            else if (numStr === '5003020') readText = '五百萬 三千零二十';
            else readText = '九千八百七十六萬 五千四百三十二';

            s += TX(40, 213, `國字讀作：${readText}`, { fs: 14, c: RED, fw: 900 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.btn-sample').forEach(btn => {
            btn.onclick = () => render(btn.dataset.n);
          });
          render('2345678');
        },
        caption: '點擊按鈕查看不同數值：先讀萬位國加上「萬」，再讀個位國。',
        example: {
          q: '臺灣某鐵路車站一年的旅客人次是 2345678 人次，請問怎麼讀？',
          steps: [
            '四位一國切分：萬位國是 234，個位國是 5678。',
            '萬位國讀作：二百三十四萬。',
            '個位國讀作：五千六百七十八。',
            '合起來讀作：二百三十四萬五千六百七十八。'
          ],
          ans: '二百三十四萬五千六百七十八'
        }
      },

      // 1-3 Slide 3: 大數讀法與零的迷思
      {
        sec: '1-2', secName: '一億以內的數',
        title: '中間連續好幾個零，通通只讀一個零',
        points: [
          '每個國中間連續出現零，<span class="k">只讀一個「零」</span>。',
          '國家的最後面如果有零，<span class="k">全部都不讀出來</span>。',
          '四位一國切開讀，就不會漏掉零。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn ex-btn" data-id="1" style="font-size:12px; padding:4px 10px;">範例 1: 40050800</button>
                <button class="nav-btn ex-btn" data-id="2" style="font-size:12px; padding:4px 10px;">範例 2: 30000050</button>
                <button class="nav-btn ex-btn" data-id="3" style="font-size:12px; padding:4px 10px;">範例 3: 70809000</button>
              </div>
            </div>`;

          const data = {
            1: { num: '40050800', cor: '四千零五萬 零八百', err: '四千零零五萬 八百零零', note: '中間 00 只讀一個「零」；末尾 00 不讀！' },
            2: { num: '30000050', cor: '三千萬 零五十', err: '三千萬 零零五十', note: '萬位國是三千；個位國中間 000 只讀一個「零」，尾數 0 不讀！' },
            3: { num: '70809000', cor: '七千零八十萬 九千', err: '七千零八十萬 九千零零零', note: '千位後面連續三個 0 都不讀出來！' }
          };

          const show = (id) => {
            const item = data[id];
            let s = '';

            s += BOX(15, 8, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });
            
            // 迷你 8 格定位板展示該數
            const titles = ['千萬', '百萬', '十萬', '萬', '千', '百', '十', '個'];
            const pad = item.num.padStart(8, '0');
            const colW = 46, startX = 36;
            titles.forEach((t, i) => {
              const bx = startX + i * colW;
              const isWan = i < 4;
              const d = pad[i];
              const isZero = (d === '0');
              s += BOX(bx, 18, colW, 20, { fill: isWan ? '#3b82f6' : '#10b981', r: 2 });
              s += TX(bx + colW / 2, 33, t, { fs: 11, c: '#fff', anchor: 'middle' });
              s += BOX(bx, 38, colW, 24, { fill: isZero ? '#fef3c7' : '#fff', stroke: isZero ? '#f59e0b' : '#cbd5e1', r: 0 });
              s += TX(bx + colW / 2, 55, d, { fs: 15, c: isZero ? '#d97706' : '#0f172a', anchor: 'middle', fw: 900 });
            });
            // 四位一節分界
            s += `<line x1="${startX + 4 * colW}" y1="16" x2="${startX + 4 * colW}" y2="64" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="3,2"/>`;

            // 正確 vs 錯誤對比方塊
            s += BOX(25, 68, 390, 52, { fill: '#f0fdf4', stroke: '#16a34a', sw: 2, r: 8 });
            s += TX(38, 90, '✅ 正確讀法：', { fs: 13, c: '#15803d', fw: 900 });
            s += TX(130, 90, item.cor, { fs: 15, c: '#15803d', fw: 900 });
            s += TX(38, 109, item.note, { fs: 11.5, c: '#166534', fw: 700 });

            s += BOX(25, 126, 390, 48, { fill: '#fef2f2', stroke: '#dc2626', sw: 1.8, r: 8 });
            s += TX(38, 148, '❌ 常見迷思：', { fs: 13, c: RED, fw: 900 });
            s += TX(130, 148, item.err, { fs: 13.5, c: RED, fw: 800 });
            s += TX(38, 164, '（誤把連續的 0 重複讀出，或把末尾的 0 讀出來）', { fs: 11, c: '#991b1b' });

            // 輔導專家記憶口訣卡
            s += BOX(25, 180, 390, 56, { fill: '#fef3c7', stroke: '#d97706', r: 8 });
            s += TX(220, 199, '💡 輔導員讀數心法（零的聚光燈）', { fs: 12.5, c: '#b45309', anchor: 'middle', fw: 900 });
            s += TX(220, 222, '「中間連零只讀一零，末尾有零通通不讀」', { fs: 14.5, c: '#9a3412', anchor: 'middle', fw: 900 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 255', s);
          };

          h.querySelectorAll('.ex-btn').forEach(btn => {
            btn.onclick = () => show(btn.dataset.id);
          });
          show('1');
        },
        caption: '點擊不同範例：牢記中間零與末尾零的讀法原則。',
        example: {
          q: '工廠生產了 40050800 個零件，國字讀作什麼？',
          steps: [
            '四位一切：4005 萬 ＋ 0800。',
            '4005 中間有兩個 0，只讀一個零：四千零五萬。',
            '0800 前面有 0 要讀零，後面 00 不讀：零八百。',
            '合起來讀作：四千零五萬零八百。'
          ],
          ans: '四千零五萬零八百'
        }
      },

      // 1-4 Slide 4: 數的大小比較
      {
        sec: '1-3', secName: '數的大小比較',
        title: '先比位數多，位數相同從最高位比',
        points: [
          '<span class="k">位數多的數比較大</span>（七位數大於六位數）。',
          '位數相同時，從<span class="k">最左邊最高位</span>逐位比。',
          '只要出現較大的數，就能決定大小。'
        ],
        visual: (h) => {
          let mode = 'same'; // 'same' or 'diff'
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:4px;">
                <button class="nav-btn m-btn" data-m="same" style="font-size:12px; padding:3px 8px; background:#2563eb; color:#fff;">情境一：位數相同（看高位）</button>
                <button class="nav-btn m-btn" data-m="diff" style="font-size:12px; padding:3px 8px;">情境二：位數不同陷阱（先數數位）</button>
              </div>
              <div class="ictrl" id="stepCtrl" style="margin-top:6px;">
                <label>比對進度：<span class="ival" id="stepName">第 1 步：看位數</span></label>
                <input type="range" id="stepRange" min="1" max="4" step="1" value="1">
              </div>
            </div>`;

          const draw = () => {
            const stepCtrl = h.querySelector('#stepCtrl');
            let s = '';

            if (mode === 'same') {
              stepCtrl.style.display = 'flex';
              const step = +h.querySelector('#stepRange').value;
              const names = ['第 1 步：看位數', '第 2 步：比百萬位', '第 3 步：比十萬位', '第 4 步：比萬位（勝負已分！）'];
              h.querySelector('#stepName').textContent = names[step - 1];

              const n1 = '3524000';
              const n2 = '3519000';

              s += BOX(15, 8, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });
              s += TX(220, 28, '比比看： 3524000  與  3519000', { fs: 14.5, c: BLU, anchor: 'middle', fw: 900 });

              const cols = ['百萬', '十萬', '萬', '千', '百', '十', '個'];
              const startX = 35, colW = 52, y1 = 44, y2 = 92;

              cols.forEach((col, i) => {
                const bx = startX + i * colW;
                const isFocus = (step === 2 && i === 0) || (step === 3 && i === 1) || (step === 4 && i === 2);
                const hlColor = isFocus ? (step === 4 ? RED : AMB) : '#64748b';

                s += BOX(bx, y1, colW, 20, { fill: hlColor, stroke: '#fff', r: 3 });
                s += TX(bx + colW / 2, y1 + 14, col, { fs: 11, c: '#fff', anchor: 'middle' });

                s += BOX(bx, y1 + 20, colW, 26, { fill: isFocus ? '#fef2f2' : '#fff', stroke: '#cbd5e1', r: 0 });
                s += TX(bx + colW / 2, y1 + 38, n1[i], { fs: 16, c: isFocus ? RED : '#0f172a', anchor: 'middle', fw: 900 });

                s += BOX(bx, y2 + 20, colW, 26, { fill: isFocus ? '#fef2f2' : '#fff', stroke: '#cbd5e1', r: 0 });
                s += TX(bx + colW / 2, y2 + 38, n2[i], { fs: 16, c: isFocus ? RED : '#0f172a', anchor: 'middle', fw: 900 });
              });

              s += BOX(30, 150, 380, 85, { fill: '#fff', stroke: '#93c5fd', r: 8 });
              if (step === 1) {
                s += TX(45, 175, '第 1 步：先數數看兩數的位數。', { fs: 13.5, c: '#1e293b', fw: 800 });
                s += TX(45, 200, '兩數都是七位數，位數相同！需要由最高位往右比。', { fs: 12.5, c: BLU });
              } else if (step === 2) {
                s += TX(45, 175, '第 2 步：比最左邊的百萬位。', { fs: 13.5, c: '#1e293b', fw: 800 });
                s += TX(45, 200, '甲數百萬位是 3，乙數百萬位也是 3（一樣大，繼續比下一位）。', { fs: 12.5, c: AMB });
              } else if (step === 3) {
                s += TX(45, 175, '第 3 步：比十萬位。', { fs: 13.5, c: '#1e293b', fw: 800 });
                s += TX(45, 200, '甲數十萬位是 5，乙數十萬位也是 5（一樣大，再比下一位）。', { fs: 12.5, c: AMB });
              } else {
                s += TX(45, 175, '第 4 步：比萬位，勝負揭曉！', { fs: 13.5, c: RED, fw: 900 });
                s += TX(45, 200, '甲數萬位是 2，乙數萬位是 1。因為 2 ＞ 1，所以：', { fs: 12.5, c: RED });
                s += TX(220, 222, '🎉 3524000 ＞ 3519000', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
              }
            } else {
              // 模式 B：位數不同陷阱
              stepCtrl.style.display = 'none';
              s += BOX(15, 8, 410, 240, { fill: '#fffbeb', stroke: '#f59e0b', sw: 2 });
              s += TX(220, 28, '⚠️ 易錯大陷阱： 985000  vs  1020000', { fs: 14.5, c: '#b45309', anchor: 'middle', fw: 900 });

              // 兩個數字卡片對比
              s += BOX(25, 42, 185, 80, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(117, 65, '甲數：985000', { fs: 15, c: '#0f172a', anchor: 'middle', fw: 900 });
              s += BOX(40, 78, 155, 32, { fill: '#fef2f2', stroke: RED, r: 6 });
              s += TX(117, 99, '數數位：共 6 位數', { fs: 13.5, c: RED, anchor: 'middle', fw: 900 });

              s += BOX(230, 42, 185, 80, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(322, 65, '乙數：1020000', { fs: 15, c: '#0f172a', anchor: 'middle', fw: 900 });
              s += BOX(245, 78, 155, 32, { fill: '#f0fdf4', stroke: GRN, r: 6 });
              s += TX(322, 99, '數數位：共 7 位數（勝）', { fs: 13.5, c: GRN, anchor: 'middle', fw: 900 });

              // 輔導員診斷框
              s += BOX(25, 132, 390, 106, { fill: '#fff', stroke: '#f59e0b', r: 8 });
              s += TX(38, 153, '❌ 常見迷思：直接看最高位 9 ＞ 1，就誤以為 985000 比較大！', { fs: 12.5, c: RED, fw: 800 });
              s += TX(38, 175, '✅ 正確觀念：比大小「先數有幾位」，位數多的絕對比較大！', { fs: 12.5, c: GRN, fw: 900 });
              s += TX(38, 195, '• 1020000 已經突破一百萬（七位數）', { fs: 12, c: '#334155' });
              s += TX(38, 214, '• 985000 還不到一百萬（六位數） ➔ 985000 ＜ 1020000', { fs: 12.5, c: BLU, fw: 900 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 255', s);
          };

          h.querySelectorAll('.m-btn').forEach(btn => {
            btn.onclick = () => {
              mode = btn.dataset.m;
              h.querySelectorAll('.m-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              draw();
            };
          });

          h.querySelector('#stepRange').oninput = draw;
          draw();
        },
        caption: '切換情境：牢記「先數數位，位數多者大；位數相同才比最高位」。',
        example: {
          q: '甲圖書館有 3524000 冊書，乙圖書館有 3519000 冊書，哪一個圖書館的藏書比較多？',
          steps: [
            '都是七位數，從最高位開始比。',
            '百萬位都是 3，十萬位都是 5。',
            '萬位：甲是 2 萬，乙是 1 萬，2 ＞ 1。',
            '所以 3524000 ＞ 3519000。'
          ],
          ans: '甲圖書館比較多'
        }
      },

      // 1-5 Slide 5: 大數的加減法
      {
        sec: '1-4', secName: '大數的加減法',
        title: '相同位數要對齊，滿十進一，不夠借一',
        points: [
          '直式計算時，<span class="k">個位對齊個位</span>由右向左算。',
          '加法滿十向左進 1，減法不夠向左借 1 當 10。',
          '標註進位數字 ①，計算細心不漏加。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn s-btn" data-s="1" style="font-size:12px; padding:4px 8px;">Step 1: 個位</button>
                <button class="nav-btn s-btn" data-s="2" style="font-size:12px; padding:4px 8px;">Step 2: 十位</button>
                <button class="nav-btn s-btn" data-s="3" style="font-size:12px; padding:4px 8px;">Step 3: 百位與千位</button>
                <button class="nav-btn s-btn" data-s="4" style="font-size:12px; padding:4px 8px;">Step 4: 萬位總和</button>
              </div>
            </div>`;

          const renderStep = (st) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 30, '直式計算： 72097 ＋ 66889 ＝ ？', { fs: 15, c: BLU, anchor: 'middle', fw: 900 });

            // 直式對齊區域
            const startX = 140, y = 50, colW = 26;
            const cols = ['十萬', '萬', '千', '百', '十', '個'];
            cols.forEach((col, i) => {
              s += TX(startX + i * colW + 13, y, col, { fs: 11, c: '#64748b', anchor: 'middle' });
            });

            // 被乘數 72097 / 乘數 66889
            // 進位標記
            if (st >= 1) s += TX(startX + 4 * colW + 13, y + 16, '①', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 2) s += TX(startX + 3 * colW + 13, y + 16, '①', { fs: 13, c: RED, anchor: 'middle', fw: 900 });

            // 兩數
            s += TX(startX + 1 * colW + 13, y + 36, '7', { fs: 18, anchor: 'middle' });
            s += TX(startX + 2 * colW + 13, y + 36, '2', { fs: 18, anchor: 'middle' });
            s += TX(startX + 3 * colW + 13, y + 36, '0', { fs: 18, anchor: 'middle' });
            s += TX(startX + 4 * colW + 13, y + 36, '9', { fs: 18, anchor: 'middle' });
            s += TX(startX + 5 * colW + 13, y + 36, '7', { fs: 18, anchor: 'middle' });

            s += TX(startX - 15, y + 62, '＋', { fs: 18, c: BLU, anchor: 'middle', fw: 900 });
            s += TX(startX + 1 * colW + 13, y + 62, '6', { fs: 18, anchor: 'middle' });
            s += TX(startX + 2 * colW + 13, y + 62, '6', { fs: 18, anchor: 'middle' });
            s += TX(startX + 3 * colW + 13, y + 62, '8', { fs: 18, anchor: 'middle' });
            s += TX(startX + 4 * colW + 13, y + 62, '8', { fs: 18, anchor: 'middle' });
            s += TX(startX + 5 * colW + 13, y + 62, '9', { fs: 18, anchor: 'middle' });

            // 橫線
            s += `<line x1="${startX - 20}" y1="${y + 72}" x2="${startX + 6 * colW}" y2="${y + 72}" stroke="#334155" stroke-width="2"/>`;

            // 答案逐位浮現
            if (st >= 1) s += TX(startX + 5 * colW + 13, y + 95, '6', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 2) s += TX(startX + 4 * colW + 13, y + 95, '8', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 3) {
              s += TX(startX + 3 * colW + 13, y + 95, '9', { fs: 18, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(startX + 2 * colW + 13, y + 95, '8', { fs: 18, c: BLU, anchor: 'middle', fw: 900 });
            }
            if (st >= 4) {
              s += TX(startX + 1 * colW + 13, y + 95, '3', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(startX + 0 * colW + 13, y + 95, '1', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });
            }

            // 解說說明框
            s += BOX(30, 165, 380, 70, { fill: '#fff', stroke: '#93c5fd', r: 8 });
            if (st === 1) {
              s += TX(45, 190, 'Step 1: 個位相加', { fs: 14, c: RED, fw: 900 });
              s += TX(45, 215, '7 ＋ 9 ＝ 16，個位寫 6，向十位進 ①。', { fs: 13, c: '#334155' });
            } else if (st === 2) {
              s += TX(45, 190, 'Step 2: 十位相加', { fs: 14, c: RED, fw: 900 });
              s += TX(45, 215, '9 ＋ 8 ＋ ① ＝ 18，十位寫 8，向百位進 ①。', { fs: 13, c: '#334155' });
            } else if (st === 3) {
              s += TX(45, 190, 'Step 3: 百位與千位相加', { fs: 14, c: BLU, fw: 900 });
              s += TX(45, 215, '百位 0 ＋ 8 ＋ ① ＝ 9；千位 2 ＋ 6 ＝ 8（無進位）。', { fs: 13, c: '#334155' });
            } else {
              s += TX(45, 190, 'Step 4: 萬位相加與總和 🎉', { fs: 14, c: GRN, fw: 900 });
              s += TX(45, 215, '萬位 7 ＋ 6 ＝ 13，十萬位寫 1，萬位寫 3，總和 138986！', { fs: 13, c: GRN, fw: 900 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 255', s);
          };

          h.querySelectorAll('.s-btn').forEach(btn => {
            btn.onclick = () => renderStep(+btn.dataset.s);
          });
          renderStep(1);
        },
        caption: '點擊 Step 按鈕依序觀察：直式計算滿十向左進位並標註 ①。',
        example: {
          q: '全臺灣民國 111 年男嬰出生 72097 人，女嬰出生 66889 人，共出生幾人？',
          steps: [
            '列出直式算式：72097 ＋ 66889。',
            '個位：7 ＋ 9 ＝ 16，寫 6 向十位進 1。',
            '十位：9 ＋ 8 ＋ 1 ＝ 18，寫 8 向百位進 1。',
            '百千位無進位，萬位 7 ＋ 6 ＝ 13，總和為 138986。'
          ],
          ans: '138986 人'
        }
      }

    ]
  });
})();
