/* ============ 第 8 章　整數四則計算 ============
   節次：8-1 由左往右算與括號先算、8-2 先乘除後加減、8-3 有括號的四則混合計算
   對應課綱代碼：N-4-3 整數四則計算：由左往右算、先乘除後加減、括號先算、併式記錄。
   課綱邊界：中年級不涉及中括號、大括號；不涉及負數四則運算；不涉及分配律公式化教學（分配律留在五上）。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#ea580c';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', ORG = '#ea580c';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 8,
    title: '整數四則計算',
    color: C,
    sections: ['8-1 由左往右算與括號先算', '8-2 先乘除後加減', '8-3 有括號的四則混合計算'],
    slides: [

      // 8-1 Slide 1: 由左往右算與括號先算
      {
        sec: '8-1', secName: '由左往右算與括號先算',
        title: '由左往右依序算，有括號的要先算',
        points: [
          '只有加減法：<span class="k">由左往右依序算</span>。',
          '算式中有括號：<span class="k">括號裡面的先算</span>。',
          '括號能改變運算順序，算出完全不同的結果！'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn seq-btn" data-m="left" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">① 無括號（由左向右）</button>
                <button class="nav-btn seq-btn" data-m="brk" style="font-size:11.5px; padding:3px 8px;">② 括號先算（改變順序）</button>
                <button class="nav-btn seq-btn" data-m="subsum" style="font-size:11.5px; padding:3px 8px;">💡 連減定律（購物生活對照）</button>
              </div>
            </div>`;

          const render = (m) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (m === 'left') {
              s += TX(220, 26, '括號的魔力：改變運算順序與結果對照', { fs: 14.5, c: ORG, anchor: 'middle', fw: 900 });
              s += BOX(30, 40, 380, 115, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(220, 68, '算式： 80 － 27 ＋ 33', { fs: 17, c: '#1e293b', anchor: 'middle', fw: 900 });

              // 步驟 1
              s += TX(110, 100, '① 先算 80 － 27 ＝ 53', { fs: 13, c: BLU, fw: 800 });
              // 步驟 2
              s += TX(260, 100, '② 再算 53 ＋ 33 ＝ 86', { fs: 13, c: GRN, fw: 900 });

              s += BOX(25, 168, 390, 66, { fill: '#fff', stroke: '#93c5fd', r: 8 });
              s += TX(40, 190, '規則：算式只有加減法時，依序「由左往右」計算。', { fs: 12.5, c: BLU, fw: 900 });
              s += TX(40, 210, '先減 27 得 53，再加 33 得 86，答：86。', { fs: 11.5, c: '#334155' });
              s += TX(40, 224, '沒有括號就老老實實排隊依序算！', { fs: 11, c: '#64748b' });
            } else if (m === 'brk') {
              s += TX(220, 26, '括號的魔力：改變運算順序與結果對照', { fs: 14.5, c: ORG, anchor: 'middle', fw: 900 });
              s += BOX(30, 40, 380, 115, { fill: '#fef3c7', stroke: '#f59e0b', r: 8 });
              s += TX(220, 68, '算式： 80 － (27 ＋ 33)', { fs: 17, c: ORG, anchor: 'middle', fw: 900 });

              // 括號先算標註
              s += TX(110, 100, '① 括號先算：27 ＋ 33 ＝ 60', { fs: 13, c: RED, fw: 900 });
              s += TX(275, 100, '② 再算：80 － 60 ＝ 20', { fs: 13, c: GRN, fw: 900 });

              s += BOX(25, 168, 390, 66, { fill: '#fff', stroke: '#fde68a', r: 8 });
              s += TX(40, 190, '規則：有括號一定要先算括號裡面的數字！', { fs: 12.5, c: RED, fw: 900 });
              s += TX(40, 210, '括號算得 60，80 － 60 ＝ 20（結果和 86 完全不同！）。', { fs: 11.5, c: '#b45309' });
              s += TX(40, 224, '括號宛如VIP通道，有括號誰先算！', { fs: 11, c: RED, fw: 800 });
            } else {
              // 連減定律生活對照
              s += TX(220, 26, '💡 連減定律生活對照：連減等於減去和！', { fs: 14, c: '#7c3aed', anchor: 'middle', fw: 900 });

              s += BOX(25, 38, 390, 120, { fill: '#fff', stroke: '#c084fc', r: 8 });
              s += TX(220, 56, '情境：帶 1000 元，買故事書 250 元，又買鉛筆盒 150 元', { fs: 12, c: '#334155', anchor: 'middle' });

              // 兩種算法對比
              s += BOX(35, 68, 175, 78, { fill: '#eff6ff', stroke: BLU, r: 6 });
              s += TX(122, 86, '方法一：一筆一筆扣', { fs: 11.5, c: BLU, anchor: 'middle', fw: 800 });
              s += TX(122, 106, '1000 － 250 － 150', { fs: 12, c: '#0f172a', anchor: 'middle', fw: 900 });
              s += TX(122, 128, '＝ 750 － 150 ＝ 600', { fs: 12, c: BLU, anchor: 'middle', fw: 900 });

              s += BOX(230, 68, 175, 78, { fill: '#fdf2f8', stroke: '#db2777', r: 6 });
              s += TX(317, 86, '方法二：加總一次付', { fs: 11.5, c: '#db2777', anchor: 'middle', fw: 800 });
              s += TX(317, 106, '1000 － (250 ＋ 150)', { fs: 12, c: '#0f172a', anchor: 'middle', fw: 900 });
              s += TX(317, 128, '＝ 1000 － 400 ＝ 600', { fs: 12, c: '#db2777', anchor: 'middle', fw: 900 });

              s += BOX(25, 168, 390, 66, { fill: '#fffbeb', stroke: '#f59e0b', r: 8 });
              s += TX(40, 190, '🎉 兩種方法結果完全相同：都剩下 600 元！', { fs: 12.5, c: '#15803d', fw: 900 });
              s += TX(40, 210, '公式直觀記憶： a － b － c ＝ a － (b ＋ c)', { fs: 13, c: RED, fw: 900 });
              s += TX(40, 225, '把所有要花的花費加起來一次扣，既快又不容易扣錯！', { fs: 11, c: '#b45309', fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.seq-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.seq-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.m);
            };
          });
          render('left');
        },
        caption: '點擊按鈕切換觀察：括號具有最優先權，會完全改變計算順序與最終結果。',
        example: {
          q: '公車上原有 80 人，第一站下車 27 人，第二站上車 33 人，現在車上有幾人？',
          steps: [
            '列出算式：80 － 27 ＋ 33。',
            '只有加減法，由左往右依序計算。',
            '第一步：80 － 27 ＝ 53。',
            '第二步：53 ＋ 33 ＝ 86，答：86 人。'
          ],
          ans: '86 人'
        }
      },

      // 8-2 Slide 2: 先乘除後加減
      {
        sec: '8-2', secName: '先乘除後加減',
        title: '先乘除後加減，乘除優先第一名',
        points: [
          '算式同時有加減和乘除：<span class="k">先算乘除，後算加減</span>。',
          '即使乘除法排在後面，<span class="k">也必須先算</span>。',
          '千萬不能直接由左往右算，否則順序全錯！'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn pri-btn" data-p="cor" style="font-size:12px; padding:4px 10px;">✅ 正確順序（先乘除後加減）🎉</button>
                <button class="nav-btn pri-btn" data-p="err" style="font-size:12px; padding:4px 10px;">❌ 錯誤順序（直接由左往右算）</button>
              </div>
            </div>`;

          const render = (p) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '四則運算規則： 15 ＋ 6 × 4 ＝ ？', { fs: 15, c: ORG, anchor: 'middle', fw: 900 });

            if (p === 'cor') {
              s += BOX(25, 42, 390, 125, { fill: '#f0fdf4', stroke: '#16a34a', sw: 2, r: 8 });

              // 第一行：原算式（分欄對齊，不遮擋任何文字）
              s += TX(62, 66, '原算式：', { fs: 14.5, c: '#15803d', fw: 900 });
              s += TX(175, 66, '15 ＋', { fs: 17, c: '#1e293b', anchor: 'middle', fw: 900 });

              // 6 × 4 優先算標記框（底色與邊框置於文字底層，文字絕對清晰）
              s += BOX(232, 48, 66, 26, { fill: '#fef3c7', stroke: '#f59e0b', sw: 1.8, r: 6 });
              s += TX(265, 66, '6 × 4', { fs: 17, c: RED, anchor: 'middle', fw: 900 });
              // 膠囊標籤
              s += BOX(240, 32, 50, 15, { fill: '#f59e0b', r: 7.5 });
              s += TX(265, 43, '① 先乘法', { fs: 9, c: '#fff', anchor: 'middle', fw: 900 });

              // 中間層：雙軌導引箭頭（最關鍵的板書教學指引！）
              // 1. 左側照抄導引箭頭
              s += `<line x1="175" y1="72" x2="175" y2="93" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="3,2"/>`;
              s += `<polygon points="175,97 172,91 178,91" fill="#2563eb"/>`;
              s += TX(181, 86, '照抄移下', { fs: 8.5, c: '#2563eb', fw: 900 });

              // 2. 右側先算收斂箭頭
              s += `<line x1="265" y1="74" x2="265" y2="93" stroke="${RED}" stroke-width="2"/>`;
              s += `<polygon points="265,97 262,91 268,91" fill="${RED}"/>`;
              s += TX(272, 86, '6×4＝24', { fs: 9, c: RED, fw: 900 });

              // 第二行：逐行化簡（等號垂直對齊，15＋ 與 24 垂直對齊上方）
              s += TX(115, 114, '＝', { fs: 17, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(175, 114, '15 ＋', { fs: 17, c: '#1e293b', anchor: 'middle', fw: 900 });
              s += TX(265, 114, '24', { fs: 17, c: RED, anchor: 'middle', fw: 900 });

              // 第三行：計算總和（等號上下絕對齊頭）
              s += TX(115, 145, '＝', { fs: 17, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(175, 145, '39', { fs: 20, c: '#15803d', anchor: 'middle', fw: 900 });

              // 完成徽章
              s += BOX(215, 131, 100, 22, { fill: '#dcfce7', stroke: '#16a34a', r: 11 });
              s += TX(265, 146, '計算完成 🎉', { fs: 11, c: '#15803d', anchor: 'middle', fw: 900 });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 195, '✅ 標準板書格式：由上而下逐行化簡，等號「＝」上下嚴格對齊！', { fs: 12.5, c: '#15803d', fw: 900 });
              s += TX(40, 216, '① 先算乘除：6 × 4 ＝ 24； ② 沒算到的 15 ＋ 順著箭頭原封不動移下來！', { fs: 11.5, c: '#15803d' });
            } else {
              s += BOX(25, 42, 390, 125, { fill: '#fef2f2', stroke: '#dc2626', sw: 2, r: 8 });

              s += TX(62, 66, '原算式：', { fs: 14.5, c: RED, fw: 900 });
              s += BOX(140, 48, 70, 26, { fill: '#fee2e2', stroke: '#ef4444', sw: 1.8, r: 6 });
              s += TX(175, 66, '15 ＋ 6', { fs: 17, c: RED, anchor: 'middle', fw: 900 });
              s += TX(265, 66, '× 4', { fs: 17, c: '#64748b', anchor: 'middle', fw: 900 });

              s += BOX(150, 32, 50, 15, { fill: '#ef4444', r: 7.5 });
              s += TX(175, 43, '❌ 誤先算', { fs: 9, c: '#fff', anchor: 'middle', fw: 900 });

              // 箭頭
              s += `<line x1="175" y1="74" x2="175" y2="93" stroke="${RED}" stroke-width="2"/>`;
              s += `<polygon points="175,97 172,91 178,91" fill="${RED}"/>`;
              s += TX(181, 86, '15＋6＝21', { fs: 9, c: RED, fw: 900 });

              s += TX(115, 114, '＝', { fs: 17, c: RED, anchor: 'middle', fw: 900 });
              s += TX(175, 114, '21', { fs: 17, c: RED, anchor: 'middle', fw: 900 });
              s += TX(265, 114, '× 4', { fs: 17, c: '#64748b', anchor: 'middle', fw: 900 });

              s += TX(115, 145, '＝', { fs: 17, c: RED, anchor: 'middle', fw: 900 });
              s += TX(175, 145, '84', { fs: 20, c: RED, anchor: 'middle', fw: 900 });

              s += BOX(215, 131, 115, 22, { fill: '#fee2e2', stroke: '#dc2626', r: 11 });
              s += TX(272, 146, '❌ 順序顛倒算錯！', { fs: 10.5, c: RED, anchor: 'middle', fw: 900 });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 195, '❌ 常見錯誤：學生習慣由左往右算，忘記「先乘除後加減」！', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 216, '輔導員口訣：乘除號就像強力磁鐵，一定要先把乘除算完，才能算加減！', { fs: 11, c: '#b91c1c' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.pri-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.p);
          });
          render('cor');
        },
        caption: '點擊切換查看：四則運算先乘除後加減，乘除法具有優先計算權。',
        example: {
          q: '小智買了 1 包 15 元的餅乾和 6 瓶各 4 元的養樂多，一共要付多少元？',
          steps: [
            '列出算式：15 ＋ 6 × 4。',
            '先算 6 瓶養樂多價錢（先乘除）：6 × 4 ＝ 24 元。',
            '再加上餅乾價錢（後加減）：15 ＋ 24 ＝ 39 元。',
            '答：一共要付 39 元。'
          ],
          ans: '39 元'
        }
      },

      // 8-3 Slide 3: 有括號的四則混合計算
      {
        sec: '8-3', secName: '有括號的四則混合計算',
        title: '括號裡面的先算，算完再算括號外',
        points: [
          '四則運算金字塔：<span class="k">括號第一、乘除第二、加減最後</span>。',
          '括號算完脫去括號，再進行下一層計算。',
          '列生活併式時，想先算的部分<span class="k">加上括號</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn t-btn" data-st="1" style="font-size:12px; padding:3px 7px;">題目：(25＋15)×3</button>
                <button class="nav-btn t-btn" data-st="2" style="font-size:12px; padding:3px 7px;">Step 1: 括號先算 40</button>
                <button class="nav-btn t-btn" data-st="3" style="font-size:12px; padding:3px 7px;">Step 2: 外層相乘 120 🎉</button>
                <button class="nav-btn cmp-brk-btn" style="font-size:12px; padding:3px 9px; background:#fef3c7; border:1px solid #d97706; color:#b45309; font-weight:900;">🍔 買套餐 vs 買單品對照</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 6, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (st === 'cmp') {
              s += TX(220, 24, '生活情境對照：為什麼需要發明括號？', { fs: 15, c: ORG, anchor: 'middle', fw: 900 });

              // 左欄：有括號 (套餐)
              s += BOX(25, 38, 190, 128, { fill: '#ecfeff', stroke: '#06b6d4', r: 8 });
              s += TX(120, 58, '🍱 買 3 份套餐', { fs: 13, c: '#0891b2', anchor: 'middle', fw: 900 });
              s += TX(120, 80, '(25 ＋ 15) × 3', { fs: 14, c: RED, anchor: 'middle', fw: 900 });
              s += TX(120, 104, '＝ 40 × 3', { fs: 13, c: '#334155', anchor: 'middle' });
              s += TX(120, 130, '＝ 120 元', { fs: 15, c: '#0891b2', anchor: 'middle', fw: 900 });
              s += TX(120, 150, '（一包麵包＋牛奶捆綁3份）', { fs: 9.5, c: '#64748b', anchor: 'middle' });

              // 右欄：無括號 (單品)
              s += BOX(225, 38, 190, 128, { fill: '#fef2f2', stroke: '#ef4444', r: 8 });
              s += TX(320, 58, '🍞 買1個麵包＋3瓶牛奶', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
              s += TX(320, 80, '25 ＋ 15 × 3', { fs: 14, c: RED, anchor: 'middle', fw: 900 });
              s += TX(320, 104, '＝ 25 ＋ 45', { fs: 13, c: '#334155', anchor: 'middle' });
              s += TX(320, 130, '＝ 70 元', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
              s += TX(320, 150, '（只買1個麵包，牛奶買3瓶）', { fs: 9.5, c: '#64748b', anchor: 'middle' });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#fcd34d', r: 8 });
              s += TX(40, 196, '💡 輔導員啟發：120 元 vs 70 元！差了整整 50 元！', { fs: 13, c: '#b45309', fw: 900 });
              s += TX(40, 218, '括號就是「把東西打包成一組」的魔法袋，日常生活一定要會用！', { fs: 11.5, c: '#334155' });
            } else {
              s += TX(220, 24, '樹狀圖分解： (25 ＋ 15) × 3 ＝ 120', { fs: 15, c: ORG, anchor: 'middle', fw: 900 });

              // 樹狀結構圖
              const cx = 220, cy = 48;
              s += BOX(cx - 110, cy, 100, 36, { fill: (st >= 2 ? '#dbeafe' : '#fff'), stroke: BLU, r: 6 });
              s += TX(cx - 60, cy + 24, '(25 ＋ 15)', { fs: 14, c: BLU, anchor: 'middle', fw: 900 });

              s += TX(cx + 10, cy + 24, '×', { fs: 18, c: ORG, anchor: 'middle', fw: 900 });

              s += BOX(cx + 30, cy, 60, 36, { fill: '#fff', stroke: '#cbd5e1', r: 6 });
              s += TX(cx + 60, cy + 24, '3', { fs: 16, anchor: 'middle', fw: 800 });

              if (st >= 2) {
                // 箭頭收斂到 40
                s += `<line x1="${cx - 60}" y1="${cy + 36}" x2="${cx - 60}" y2="${cy + 65}" stroke="${BLU}" stroke-width="2"/>`;
                s += BOX(cx - 90, cy + 65, 60, 30, { fill: '#fef3c7', stroke: AMB, r: 6 });
                s += TX(cx - 60, cy + 85, '40', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
              }

              if (st >= 3) {
                // 40 x 3 = 120
                s += `<line x1="${cx - 60}" y1="${cy + 95}" x2="${cx}" y2="${cy + 115}" stroke="${ORG}" stroke-width="2"/>`;
                s += `<line x1="${cx + 60}" y1="${cy + 36}" x2="${cx}" y2="${cy + 115}" stroke="${ORG}" stroke-width="2"/>`;
                s += BOX(cx - 50, cy + 115, 100, 34, { fill: '#f0fdf4', stroke: '#16a34a', sw: 2, r: 8 });
                s += TX(cx, cy + 138, '＝ 120 🎉', { fs: 17, c: '#15803d', anchor: 'middle', fw: 900 });
              }

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#93c5fd', r: 6 });
              if (st === '1' || st === 1) {
                s += TX(40, 196, '題目：買 3 份（25 元麵包 ＋ 15 元牛奶）套餐，共多少元？', { fs: 12, c: '#1e293b', fw: 800 });
                s += TX(40, 218, '括號表示「先算一包套餐的價錢」。', { fs: 11, c: '#64748b' });
              } else if (st === '2' || st === 2) {
                s += TX(40, 196, 'Step 1: 先算括號內部的加法：25 ＋ 15 ＝ 40（一包套餐 40 元）。', { fs: 12, c: BLU, fw: 900 });
                s += TX(40, 218, '括號算完後，算式簡化為 40 × 3。', { fs: 11, c: '#64748b' });
              } else {
                s += TX(40, 196, 'Step 2: 再算外層乘法：40 × 3 ＝ 120 元！', { fs: 13, c: '#15803d', fw: 900 });
                s += TX(40, 218, '答：一共 120 元 🎉', { fs: 12, c: '#15803d', fw: 800 });
              }
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.t-btn').forEach(btn => {
            btn.onclick = () => render(+btn.dataset.st);
          });
          h.querySelector('.cmp-brk-btn').onclick = () => render('cmp');
          render(1);
        },
        caption: '點擊步驟按鈕觀察樹狀圖收斂：括號內先算收斂成單一數值，再進行外層計算。',
        example: {
          q: '買 3 個每個 25 元的麵包和 3 瓶每瓶 15 元的牛奶，用一個算式記下來並算算看？',
          steps: [
            '先算一份麵包加牛奶（用括號）：(25 ＋ 15) ＝ 40 元。',
            '買 3 份再乘 3：(25 ＋ 15) × 3。',
            '計算：40 × 3 ＝ 120 元。',
            '答：一共 120 元。'
          ],
          ans: '120 元'
        }
      }

    ]
  });
})();
