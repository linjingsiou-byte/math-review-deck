/* ============ 第 9 章　分數 ============
   節次：9-1 真分數、假分數與帶分數、9-2 假分數與帶分數的互換、9-3 同分母分數的加法與減法、9-4 分數的整數倍
   對應課綱代碼：N-4-5 真分數、假分數與帶分數。互換與同分母加減法。分數的整數倍。
   課綱邊界：中年級僅限同分母分數加減法與整數倍，不涉及異分母通分（通分留在五上）；不涉及分數乘分數。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#0d9488';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', TEA = '#0d9488';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  // HTML 原生垂直分數卡產生器（用於按鈕、滑桿標籤）
  const hFrac = (a, b) => `<span class="mfrac"><span class="num">${a}</span><span class="den">${b}</span></span>`;
  const hMix = (w, a, b) => `<span class="mmix"><span class="whole">${w}</span><span class="mfrac"><span class="num">${a}</span><span class="den">${b}</span></span></span>`;

  // SVG 原生垂直分數向量組件（100% 還原課本橫線上下堆疊格式）
  const FRAC = (x, y, num, den, opts = {}) => {
    const fs = opts.fs || 13;
    const color = opts.c || '#172033';
    const numStr = String(num), denStr = String(den);
    const maxLen = Math.max(numStr.length, denStr.length);
    const barW = opts.w || Math.max(14, maxLen * fs * 0.72 + 4);
    let s = `<g transform="translate(${x}, ${y})">`;
    if (opts.whole !== undefined && opts.whole !== null && opts.whole !== '') {
      const wholeFs = opts.wholeFs || (fs + 2);
      s += `<text x="${-barW / 2 - 4}" y="${fs * 0.35}" text-anchor="end" font-size="${wholeFs}" font-weight="900" fill="${color}">${opts.whole}</text>`;
    }
    s += `<text x="0" y="${-fs * 0.28}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${num}</text>`;
    s += `<line x1="${-barW / 2}" y1="0" x2="${barW / 2}" y2="0" stroke="${color}" stroke-width="${opts.sw || 1.6}" stroke-linecap="round"/>`;
    s += `<text x="0" y="${fs * 0.85}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${den}</text>`;
    s += `</g>`;
    return s;
  };

  window.DECK.push({
    ch: 9,
    title: '分數',
    color: C,
    sections: ['9-1 真分數、假分數與帶分數', '9-2 假分數與帶分數的互換', '9-3 同分母分數的加法與減法', '9-4 分數的整數倍'],
    slides: [

      // 9-1 Slide 1: 真分數、假分數與帶分數
      {
        sec: '9-1', secName: '真分數、假分數與帶分數',
        title: '分子小叫真分數，分子大等於分母叫假分數',
        points: [
          '分子小於分母：<span class="k">真分數</span>（比 1 小，如 \\(\\frac{3}{4}\\)）。',
          '分子大於或等於分母：<span class="k">假分數</span>（大於或等於 1，如 \\(\\frac{4}{4}、\\frac{7}{4}\\)）。',
          '整數和真分數合起來：<span class="k">帶分數</span>（如 \\(1\\frac{3}{4}\\)）。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>選擇吃掉塊數：<span class="ival" id="pieVal"></span></label>
                <input type="range" id="pieRange" min="1" max="9" step="1" value="7">
              </div>
            </div>`;

          const draw = () => {
            const n = +h.querySelector('#pieRange').value;
            const full = Math.floor(n / 4);
            const rem = n % 4;

            let typeColor = '';
            if (n < 4) {
              typeColor = BLU;
              h.querySelector('#pieVal').innerHTML = `${n} 塊（＝ ${hFrac(n, 4)} 個披薩）`;
            } else if (n === 4) {
              typeColor = GRN;
              h.querySelector('#pieVal').innerHTML = `4 塊（＝ ${hFrac(4, 4)} 個 ＝ 1 個完整披薩）🎉`;
            } else {
              typeColor = TEA;
              h.querySelector('#pieVal').innerHTML = `${n} 塊（＝ ${hFrac(n, 4)} 個 ＝ ${hMix(full, rem, 4)} 個披薩）🎉`;
            }

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 頂部狀態徽章（垂直分數）
            s += BOX(25, 16, 390, 32, { fill: typeColor, stroke: '#fff', r: 8 });
            if (n < 4) {
              s += TX(185, 36, '【 真 分 數 】（', { fs: 13, c: '#fff', anchor: 'middle', fw: 900 });
              s += FRAC(245, 32, n, 4, { fs: 12, c: '#fff', sw: 1.8 });
              s += TX(268, 36, '個）', { fs: 13, c: '#fff', anchor: 'middle', fw: 900 });
            } else if (n === 4) {
              s += TX(160, 36, '【 假 分 數 】（', { fs: 13, c: '#fff', anchor: 'middle', fw: 900 });
              s += FRAC(218, 32, 4, 4, { fs: 12, c: '#fff', sw: 1.8 });
              s += TX(292, 36, '＝ 1 個完整披薩）🎉', { fs: 13, c: '#fff', anchor: 'middle', fw: 900 });
            } else {
              s += TX(96, 36, '【 假分數：', { fs: 12.5, c: '#fff', anchor: 'middle', fw: 900 });
              s += FRAC(148, 32, n, 4, { fs: 12, c: '#fff', sw: 1.8 });
              s += TX(212, 36, '個 】＝【 帶分數：', { fs: 12.5, c: '#fff', anchor: 'middle', fw: 900 });
              s += FRAC(290, 32, rem, 4, { whole: String(full), fs: 12, c: '#fff', sw: 1.8 });
              s += TX(325, 36, '個 】🎉', { fs: 12.5, c: '#fff', anchor: 'middle', fw: 900 });
            }

            // 繪製 3 盤披薩 (每盤 4 塊)
            const pans = [
              { cx: 85, cy: 96, count: Math.min(4, Math.max(0, n)) },
              { cx: 220, cy: 96, count: Math.min(4, Math.max(0, n - 4)) },
              { cx: 355, cy: 96, count: Math.min(4, Math.max(0, n - 8)) }
            ];

            pans.forEach((p, pIdx) => {
              const r = 38;
              // 盤名標籤（置於盤頂上方）
              s += TX(p.cx, 55, `第 ${pIdx + 1} 盤`, { fs: 11, c: '#64748b', anchor: 'middle', fw: 800 });
              // 圓盤底盤
              s += `<circle cx="${p.cx}" cy="${p.cy}" r="${r}" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>`;
              // 4 片扇形
              for (let i = 0; i < 4; i++) {
                const isFilled = (i < p.count);
                const a0 = i * 90 - 90, a1 = (i + 1) * 90 - 90;
                const r0 = a0 * Math.PI / 180, r1 = a1 * Math.PI / 180;
                const x0 = p.cx + r * Math.cos(r0), y0 = p.cy + r * Math.sin(r0);
                const x1 = p.cx + r * Math.cos(r1), y1 = p.cy + r * Math.sin(r1);
                s += `<path d="M${p.cx},${p.cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${isFilled ? '#2dd4bf' : '#f8fafc'}" stroke="#0f766e" stroke-width="1.5"/>`;
              }
              // 盤下標籤（垂直分數置於盤底下方，安全間隔清楚）
              s += FRAC(p.cx - 8, 148, p.count, 4, { fs: 12, c: '#0f766e', sw: 1.6 });
              s += TX(p.cx + 14, 152, '個', { fs: 11.5, c: '#64748b', anchor: 'middle', fw: 700 });
            });

            // 下方解說卡（完全避開上方標籤，留有至少 12px 安全距離）
            s += BOX(25, 168, 390, 66, { fill: '#fff', stroke: '#99f6e4', r: 8 });
            if (n < 4) {
              s += TX(38, 193, `真分數：分子 ${n} ＜ 分母 4，不到 1 個完整披薩。`, { fs: 12.5, c: BLU, fw: 900 });
              s += TX(38, 217, '分子小於分母，代表數值一定小於 1。', { fs: 11.5, c: '#475569' });
            } else if (n === 4) {
              s += TX(38, 193, '假分數：分子 4 ＝ 分母 4，剛好湊成 1 個完整披薩！', { fs: 12.5, c: GRN, fw: 900 });
              s += TX(38, 217, '分子等於分母時，數值剛好等於 1。', { fs: 11.5, c: '#475569' });
            } else {
              s += TX(38, 191, `帶分數：有 ${full} 個完整披薩 ＋ 剩下的`, { fs: 11.5, c: TEA, fw: 900 });
              s += FRAC(275, 186, rem, 4, { fs: 11, c: TEA, sw: 1.5 });
              s += TX(295, 191, '個 ➔ 記作', { fs: 11.5, c: TEA, fw: 900 });
              s += FRAC(380, 186, rem, 4, { whole: String(full), fs: 11, c: TEA, sw: 1.5 });
              s += TX(402, 191, '個', { fs: 11.5, c: TEA, fw: 900 });

              s += TX(38, 217, '假分數', { fs: 11.5, c: '#475569', fw: 700 });
              s += FRAC(90, 212, n, 4, { fs: 11, c: '#0f766e', sw: 1.5 });
              s += TX(110, 217, '與 帶分數', { fs: 11.5, c: '#475569', fw: 700 });
              s += FRAC(186, 212, rem, 4, { whole: String(full), fs: 11, c: '#0f766e', sw: 1.5 });
              s += TX(216, 217, '表示的數量完全一樣！', { fs: 11.5, c: '#475569', fw: 700 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#pieRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿觀察：每滿 4 塊披薩就湊成 1 個整數披薩，體會假分數與帶分數的意義。',
        example: {
          q: '一塊披薩平分成 4 片，哥哥吃了 7 片，用假分數和帶分數分別怎麼表示？',
          steps: [
            '每片是 \\(\\frac{1}{4}\\) 個披薩。',
            '吃了 7 片，假分數記作 \\(\\frac{7}{4}\\) 個披薩。',
            '4 片剛好是 1 個，還剩 3 片是 \\(\\frac{3}{4}\\) 個。',
            '帶分數記作 \\(1\\frac{3}{4}\\) 個披薩。'
          ],
          ans: '\\(\\frac{7}{4}\\) 個（\\(1\\frac{3}{4}\\) 個）'
        }
      },

      // 9-2 Slide 2: 假分數與帶分數的互換
      {
        sec: '9-2', secName: '假分數與帶分數的互換',
        title: '假化帶用除法求商餘，帶化假用整數乘分母加分子',
        points: [
          '假分數化帶分數：<span class="k">分子 ÷ 分母</span>，商為整數，餘數為分子（如 \\(\\frac{11}{4} = 2\\frac{3}{4}\\)）。',
          '帶分數化假分數：<span class="k">整數 × 分母 ＋ 原分子</span>，分母不變（如 \\(2\\frac{3}{4} = \\frac{11}{4}\\)）。',
          '轉換前後代表的分數大小<span class="k">完全相同</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn cvt-btn" data-c="imp2mix" style="font-size:12px; padding:4px 10px;">🔄 假分數化帶分數：<span class="mfrac"><span class="num">11</span><span class="den">4</span></span> ➔ 2<span class="mfrac"><span class="num">3</span><span class="den">4</span></span></button>
                <button class="nav-btn cvt-btn" data-c="mix2imp" style="font-size:12px; padding:4px 10px;">🔄 帶分數化假分數：2<span class="mfrac"><span class="num">3</span><span class="den">4</span></span> ➔ <span class="mfrac"><span class="num">11</span><span class="den">4</span></span></button>
              </div>
            </div>`;

          const render = (c) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '假分數 ⇄ 帶分數 互相轉換原理', { fs: 15, c: TEA, anchor: 'middle', fw: 900 });

            if (c === 'imp2mix') {
              s += BOX(30, 45, 380, 115, { fill: '#fff', stroke: '#99f6e4', r: 8 });
              // 標題（垂直分數）
              s += TX(165, 68, '假分數化帶分數：', { fs: 15.5, c: TEA, anchor: 'middle', fw: 900 });
              s += FRAC(245, 64, 11, 4, { fs: 14, c: TEA });
              s += TX(285, 68, '➔  ？', { fs: 16, c: TEA, anchor: 'middle', fw: 900 });

              // 輔導專家優化：三色對應卡
              s += TX(220, 95, '分子 ÷ 分母： 11 ÷ 4 ＝ 2 ⋯⋯ 餘 3', { fs: 15, c: '#1e293b', anchor: 'middle', fw: 900 });

              // 三色徽章
              s += BOX(45, 110, 105, 26, { fill: '#dbeafe', stroke: '#3b82f6', r: 4 });
              s += TX(97, 127, '商 2 ➔ 整數 2', { fs: 11.5, c: '#1d4ed8', anchor: 'middle', fw: 900 });

              s += BOX(165, 110, 110, 26, { fill: '#ffedd5', stroke: '#ea580c', r: 4 });
              s += TX(220, 127, '餘數 3 ➔ 分子 3', { fs: 11.5, c: '#c2410c', anchor: 'middle', fw: 900 });

              s += BOX(290, 110, 105, 26, { fill: '#dcfce7', stroke: '#16a34a', r: 4 });
              s += TX(342, 127, '除數 4 ➔ 分母 4', { fs: 11.5, c: '#15803d', anchor: 'middle', fw: 900 });

              // 合體為帶分數（垂直分數）
              s += TX(165, 150, '合體為帶分數：', { fs: 15.5, c: '#0f766e', anchor: 'middle', fw: 900 });
              s += FRAC(240, 146, 3, 4, { whole: '2', fs: 15, c: '#0f766e', wholeFs: 18 });
              s += TX(275, 150, '🎉', { fs: 16, anchor: 'middle' });

              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 198, '💡 訣竅口訣：用除法！「商當整數，餘數當分子，分母永遠照抄」。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 218, '三色對照：商(藍)變整數，餘數(橘)變新分子，除數(綠)是原分母！', { fs: 11, c: '#15803d', fw: 800 });
            } else {
              s += BOX(30, 45, 380, 115, { fill: '#fff', stroke: '#fde68a', r: 8 });
              // 標題（垂直分數）
              s += TX(165, 68, '帶分數化假分數：', { fs: 15.5, c: AMB, anchor: 'middle', fw: 900 });
              s += FRAC(245, 64, 3, 4, { whole: '2', fs: 14, c: AMB, wholeFs: 17 });
              s += TX(285, 68, '➔  ？', { fs: 16, c: AMB, anchor: 'middle', fw: 900 });

              // 乘加運算
              s += TX(220, 96, '整數 × 分母 ＋ 原分子： 2 × 4 ＋ 3 ＝ 11', { fs: 15, c: RED, anchor: 'middle', fw: 900 });
              s += TX(220, 122, '• 2 個完整披薩有 2 × 4 ＝ 8 塊； 加上原有的 3 塊，共有 11 塊！', { fs: 12, c: '#b45309', anchor: 'middle', fw: 800 });

              // 記作（垂直分數）
              s += TX(185, 148, '記作：', { fs: 16, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(228, 144, 11, 4, { fs: 15, c: '#15803d' });
              s += TX(260, 148, '🎉', { fs: 16, anchor: 'middle' });

              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 218, '算出來的 11 當新分子，分母照抄 4，也就是', { fs: 11.5, c: '#475569' });
              s += FRAC(290, 213.5, 11, 4, { fs: 11, c: '#0f766e' });
              s += TX(308, 218, '。', { fs: 11.5, c: '#475569' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.cvt-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.c);
          });
          render('imp2mix');
        },
        caption: '點擊切換查看：假分數化帶分數用除法求商餘；帶分數化假分數用乘加算總分子。',
        example: {
          q: '把假分數 \\(\\frac{11}{4}\\) 化成帶分數，並把帶分數 \\(2\\frac{3}{4}\\) 化成假分數？',
          steps: [
            '假化帶：11 ÷ 4 ＝ 2 ⋯⋯ 3，記作 \\(2\\frac{3}{4}\\)。',
            '帶化假：整數乘分母加分子：2 × 4 ＋ 3 ＝ 11。',
            '分母不變，記作 \\(\\frac{11}{4}\\)。',
            '答：分別是 \\(2\\frac{3}{4}\\) 與 \\(\\frac{11}{4}\\)。'
          ],
          ans: '\\(2\\frac{3}{4}\\) 與 \\(\\frac{11}{4}\\)'
        }
      },

      // 9-3 Slide 3: 同分母分數的加法與減法
      {
        sec: '9-3', secName: '同分母分數的加法與減法',
        title: '整數分數分開算，不夠減時整數借一化假分數',
        points: [
          '同分母加減法：<span class="k">分母保持不變，只算分子</span>。',
          '分數不夠減：向整數<span class="k">借 1 化成同分母假分數</span>再減。',
          '例如：\\(3\\frac{1}{5} - 1\\frac{4}{5} = 2\\frac{6}{5} - 1\\frac{4}{5} = 1\\frac{2}{5}\\)。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn subf-btn" data-s="orig" style="font-size:12px; padding:4px 10px;">📋 題目： 3<span class="mfrac"><span class="num">1</span><span class="den">5</span></span> － 1<span class="mfrac"><span class="num">4</span><span class="den">5</span></span></button>
                <button class="nav-btn subf-btn" data-s="borr" style="font-size:12px; padding:4px 10px;">✂️ 整數借 1 化為 2<span class="mfrac"><span class="num">6</span><span class="den">5</span></span></button>
                <button class="nav-btn subf-btn" data-s="res" style="font-size:12px; padding:4px 10px;">🎉 相減完成得 1<span class="mfrac"><span class="num">2</span><span class="den">5</span></span></button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 標題（垂直分數，間距優化）
            s += TX(105, 28, '帶分數退位減法：', { fs: 14.5, c: TEA, anchor: 'middle', fw: 900 });
            s += FRAC(190, 23, 1, 5, { whole: '3', fs: 13, c: TEA });
            s += TX(222, 28, '－', { fs: 15, c: TEA, anchor: 'middle', fw: 900 });
            s += FRAC(252, 23, 4, 5, { whole: '1', fs: 13, c: TEA });
            s += TX(284, 28, '＝', { fs: 15, c: TEA, anchor: 'middle', fw: 900 });
            s += FRAC(316, 23, 2, 5, { whole: '1', fs: 13, c: TEA });

            s += BOX(25, 38, 390, 125, { fill: '#fff', stroke: '#cbd5e1', r: 8 });

            if (st === 'orig') {
              // 算式（垂直分數）
              s += TX(135, 62, '算式：', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
              s += FRAC(185, 57, 1, 5, { whole: '3', fs: 15, c: '#1e293b' });
              s += TX(220, 62, '－', { fs: 16, c: '#1e293b', anchor: 'middle', fw: 900 });
              s += FRAC(255, 57, 4, 5, { whole: '1', fs: 15, c: '#1e293b' });

              // 披薩描述
              s += TX(165, 88, '🍕 3 個完整披薩 ＋', { fs: 13, c: TEA, anchor: 'middle', fw: 800 });
              s += FRAC(245, 83, 1, 5, { fs: 12, c: TEA });
              s += TX(285, 88, '片披薩', { fs: 13, c: TEA, anchor: 'middle', fw: 800 });

              s += TX(155, 114, '⚠️ 發現問題：分數部分的', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(250, 109, 1, 5, { fs: 12, c: RED });
              s += TX(290, 114, '不夠減', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(330, 109, 4, 5, { fs: 12, c: RED });
              s += TX(350, 114, '！', { fs: 13, c: RED, anchor: 'middle', fw: 900 });

              // 點擊提示（垂直分數）
              s += TX(140, 142, '👉 請點擊下方「✂️ 借 1 化為', { fs: 12, c: '#0f766e', anchor: 'middle', fw: 800 });
              s += FRAC(245, 137, 6, 5, { whole: '2', fs: 12, c: '#0f766e' });
              s += TX(310, 142, '」切開 1 個披薩！', { fs: 12, c: '#0f766e', anchor: 'middle', fw: 800 });
            } else if (st === 'borr') {
              // 借 1 切披薩（垂直分數）
              s += TX(130, 60, '借 1 切披薩：', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(195, 55, 1, 5, { whole: '3', fs: 15, c: RED });
              s += TX(235, 60, '➔', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(275, 55, 6, 5, { whole: '2', fs: 15, c: RED });

              // 借 1 化 5/5 視覺標籤
              s += BOX(55, 75, 145, 26, { fill: '#ecfeff', stroke: '#0891b2', r: 6 });
              s += TX(127, 92, '整數 3 借 1 剩下 2', { fs: 12, c: '#0891b2', anchor: 'middle', fw: 900 });

              s += TX(220, 92, '➔', { fs: 18, c: RED, anchor: 'middle', fw: 900 });

              s += BOX(240, 75, 145, 26, { fill: '#fef3c7', stroke: '#d97706', r: 6 });
              s += TX(280, 92, '借來的 1 切成', { fs: 12, c: '#b45309', anchor: 'middle', fw: 900 });
              s += FRAC(342, 87, 5, 5, { fs: 11.5, c: '#b45309' });

              // 加法合成（垂直分數）
              s += FRAC(60, 117, 5, 5, { fs: 12, c: RED });
              s += TX(80, 122, '＋', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(100, 117, 1, 5, { fs: 12, c: RED });
              s += TX(120, 122, '＝', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              s += FRAC(140, 117, 6, 5, { fs: 12, c: RED });
              s += TX(275, 122, '（注意！借 1 是切成 5 份，不是十進制！）', { fs: 11.5, c: RED, anchor: 'middle', fw: 900 });

              s += TX(130, 146, '被減數變成：', { fs: 13, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(190, 141, 6, 5, { whole: '2', fs: 13, c: '#15803d' });
              s += TX(255, 146, '（夠減', { fs: 13, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(295, 141, 4, 5, { whole: '1', fs: 13, c: '#15803d' });
              s += TX(325, 146, '了！）', { fs: 13, c: '#15803d', anchor: 'middle', fw: 900 });
            } else {
              // 計算過程（垂直分數）
              s += TX(130, 62, '計算過程：', { fs: 16, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(190, 57, 6, 5, { whole: '2', fs: 15, c: '#15803d' });
              s += TX(225, 62, '－', { fs: 16, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(260, 57, 4, 5, { whole: '1', fs: 15, c: '#15803d' });

              s += TX(220, 92, '• 整數相減： 2 － 1 ＝ 1', { fs: 14, c: '#334155', anchor: 'middle', fw: 800 });

              // 分數相減（垂直分數）
              s += TX(120, 118, '• 分數相減：', { fs: 14, c: '#334155', anchor: 'middle', fw: 800 });
              s += FRAC(180, 113, 6, 5, { fs: 13, c: '#334155' });
              s += TX(205, 118, '－', { fs: 14, c: '#334155', anchor: 'middle', fw: 800 });
              s += FRAC(230, 113, 4, 5, { fs: 13, c: '#334155' });
              s += TX(255, 118, '＝', { fs: 14, c: '#334155', anchor: 'middle', fw: 800 });
              s += FRAC(280, 113, 2, 5, { fs: 13, c: '#334155' });

              s += TX(175, 146, '合起來答案：', { fs: 17, c: '#15803d', anchor: 'middle', fw: 900 });
              s += FRAC(245, 141, 2, 5, { whole: '1', fs: 16, c: '#15803d', wholeFs: 19 });
              s += TX(280, 146, '🎉', { fs: 17, anchor: 'middle' });
            }

            s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#86efac', r: 8 });
            s += TX(40, 194, '💡 輔導員解題秘笈：分數不夠減時，向整數借 1。', { fs: 12.5, c: '#15803d', fw: 900 });
            s += TX(40, 214, '借出來的 1 是切成「分母份數」，跟原來的分子合併後再減！', { fs: 11.5, c: '#15803d', fw: 800 });
            s += TX(40, 228, '千萬不要受十進制影響！分母是 5 就切 5 塊，借 1 換 5 份！', { fs: 11, c: RED, fw: 800 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.subf-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.s);
          });
          render('orig');
        },
        caption: '點擊步驟觀察借位：\\(\\frac{1}{5}\\) 不夠減 \\(\\frac{4}{5}\\)，向整數 3 借 1 化成 \\(\\frac{5}{5}\\)，合併為 \\(\\frac{6}{5}\\) 就能輕鬆減。',
        example: {
          q: '一瓶果汁有 \\(3\\frac{1}{5}\\) 公升，弟弟喝了 \\(1\\frac{4}{5}\\) 公升，還剩下多少公升？',
          steps: [
            '列出算式：\\(3\\frac{1}{5} - 1\\frac{4}{5}\\)。',
            '\\(\\frac{1}{5}\\) 不夠減 \\(\\frac{4}{5}\\)，向整數借 1 化成 \\(\\frac{5}{5}\\)。',
            '\\(3\\frac{1}{5}\\) 變成 \\(2\\frac{6}{5}\\)。',
            '\\(2\\frac{6}{5} - 1\\frac{4}{5} = 1\\frac{2}{5}\\)（公升）。'
          ],
          ans: '\\(1\\frac{2}{5}\\) 公升'
        }
      },

      // 9-4 Slide 4: 分數的整數倍
      {
        sec: '9-4', secName: '分數的整數倍',
        title: '分數乘整數，只乘分子分母不變',
        points: [
          '分數乘整數：表示「幾個相同分數相加」。',
          '計算時：<span class="k">分母保持不變，整數乘上分子</span>。',
          '滿分母換整數：\\(\\frac{3}{5} \\times 4 = \\frac{3 \\times 4}{5} = \\frac{12}{5} = 2\\frac{2}{5}\\)。'
        ],
        visual: (h) => {
          let showMixed = true;
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:4px; align-items:center;">
                <button class="nav-btn ans-toggle-btn" style="font-size:11.5px; padding:3px 8px; background:#0d9488; color:#fff;">🔄 切換顯示：帶分數模式</button>
              </div>
              <div class="ictrl" style="margin-top:6px;">
                <label>杯數（每杯 <span class="mfrac"><span class="num">3</span><span class="den">5</span></span> 公升）：<span class="ival" id="cupVal"></span></label>
                <input type="range" id="cupRange" min="1" max="5" step="1" value="4">
              </div>
            </div>`;

          const draw = () => {
            const cups = +h.querySelector('#cupRange').value;
            const totalParts = 3 * cups;
            const wholeCups = Math.floor(totalParts / 5);
            const remParts = totalParts % 5;

            const dispHtml = showMixed 
              ? (wholeCups > 0 ? (remParts > 0 ? hMix(wholeCups, remParts, 5) : `${wholeCups}`) : hFrac(remParts, 5))
              : hFrac(totalParts, 5);

            h.querySelector('#cupVal').innerHTML = `${cups} 杯 ＝ ${dispHtml} 公升`;

            let s = '';
            s += BOX(12, 8, 416, 232, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 頂部標題（垂直分數下移對齊，防切頂）
            s += TX(30, 29, '分數整數倍：', { fs: 14, c: TEA, fw: 900 });
            s += FRAC(128, 24.5, 3, 5, { fs: 13, c: TEA, sw: 1.8 });
            s += TX(144, 29, `× ${cups} ＝ `, { fs: 14, c: TEA, fw: 900 });
            if (showMixed) {
              if (wholeCups > 0 && remParts > 0) {
                s += FRAC(220, 24.5, remParts, 5, { whole: String(wholeCups), fs: 13, c: TEA, sw: 1.8 });
                s += TX(238, 29, '公升', { fs: 14, c: TEA, fw: 900 });
              } else if (wholeCups > 0 && remParts === 0) {
                s += TX(202, 29, `${wholeCups} 公升整`, { fs: 14, c: TEA, fw: 900 });
              } else {
                s += FRAC(208, 24.5, remParts, 5, { fs: 13, c: TEA, sw: 1.8 });
                s += TX(224, 29, '公升', { fs: 14, c: TEA, fw: 900 });
              }
            } else {
              s += FRAC(208, 24.5, totalParts, 5, { fs: 13, c: TEA, sw: 1.8 });
              s += TX(224, 29, '公升', { fs: 14, c: TEA, fw: 900 });
            }

            // 左側：顯示單杯（每杯 3/5 公升）
            s += TX(24, 52, `注入 ${cups} 杯果汁（每杯`, { fs: 11, c: '#475569', fw: 700 });
            s += FRAC(155, 47.5, 3, 5, { fs: 10, c: '#0f766e' });
            s += TX(167, 52, '公升）：', { fs: 11, c: '#475569', fw: 700 });

            for (let i = 0; i < cups; i++) {
              const cx = 24 + i * 36, cy = 62, cw = 30, ch = 52;
              s += BOX(cx, cy, cw, ch, { fill: '#fff', stroke: '#64748b', r: 3 });
              // 裝 3/5 水
              const hw = (ch * 3) / 5;
              s += `<rect x="${cx + 1}" y="${cy + ch - hw}" width="${cw - 2}" height="${hw}" fill="#2dd4bf" opacity="0.85"/>`;
              // 杯中垂直分數
              s += FRAC(cx + cw / 2, cy + ch - hw / 2, 3, 5, { fs: 9.5, c: '#0f766e', w: 12 });
            }

            // 右側：大量筒展示（展示滿 1 杯 5 格進位）
            const ry = 44, rh = 100;
            // 繪製 3 個量筒（每個 1 公升，分 5 格）
            for (let b = 0; b < 3; b++) {
              const bx = 228 + b * 63;
              s += BOX(bx, ry, 52, rh, { fill: '#fff', stroke: '#0f766e', sw: 1.8, r: 4 });
              s += TX(bx + 26, ry + rh + 14, `第 ${b + 1} 大杯`, { fs: 10, c: '#64748b', anchor: 'middle', fw: 700 });

              // 5 等分刻度
              for (let k = 1; k < 5; k++) {
                const ly = ry + rh - (rh * k) / 5;
                s += `<line x1="${bx}" y1="${ly}" x2="${bx + 7}" y2="${ly}" stroke="#cbd5e1" stroke-width="1"/>`;
              }

              // 計算此大杯裝了多少格 (最多 5 格)
              const cupFillParts = Math.max(0, Math.min(5, totalParts - b * 5));
              if (cupFillParts > 0) {
                const hWater = (rh * cupFillParts) / 5;
                const isFull = (cupFillParts === 5);
                s += `<rect x="${bx + 2}" y="${ry + rh - hWater}" width="${48}" height="${hWater}" fill="${isFull ? '#0d9488' : '#2dd4bf'}" opacity="0.85"/>`;
                if (isFull) {
                  s += TX(bx + 26, ry + rh - hWater / 2 + 4, '滿 1 杯', { fs: 11, c: '#fff', anchor: 'middle', fw: 900 });
                } else {
                  // 量筒中垂直分數
                  s += FRAC(bx + 26, ry + rh - hWater / 2, cupFillParts, 5, { fs: 10.5, c: '#fff', w: 14 });
                }
              }
            }

            // 下方解說卡（完全消除重疊，坐標嚴格依序排列）
            s += BOX(20, 166, 400, 68, { fill: '#fff', stroke: '#86efac', r: 8 });

            // 第一行：乘法計算過程（分數線 y = 181.5）
            s += TX(30, 186, '算式：', { fs: 12.5, c: '#15803d', fw: 900 });
            s += FRAC(80, 181.5, 3, 5, { fs: 11.5, c: '#15803d', sw: 1.5 });
            s += TX(94, 186, `× ${cups} ＝`, { fs: 12.5, c: '#15803d', fw: 900 });
            s += FRAC(156, 181.5, `3×${cups}`, 5, { fs: 11, c: '#15803d', w: 26, sw: 1.5 });
            s += TX(176, 186, '＝', { fs: 12.5, c: '#15803d', fw: 900 });
            s += FRAC(206, 181.5, totalParts, 5, { fs: 11.5, c: '#15803d', sw: 1.5 });
            s += TX(224, 186, '公升', { fs: 12.5, c: '#15803d', fw: 900 });

            // 第二行：滿分母換整數進位（分數線 y = 203）
            if (wholeCups > 0 && remParts > 0) {
              s += TX(30, 207, '滿 5 格換 1 大杯：', { fs: 12, c: RED, fw: 900 });
              s += FRAC(154, 202.5, totalParts, 5, { fs: 11.5, c: RED, sw: 1.5 });
              s += TX(170, 207, '＝', { fs: 12, c: RED, fw: 900 });
              s += FRAC(208, 202.5, remParts, 5, { whole: String(wholeCups), wholeFs: 13, fs: 11.5, c: RED, sw: 1.5 });
              s += TX(224, 207, '公升 🎉', { fs: 12, c: RED, fw: 900 });
            } else if (wholeCups > 0 && remParts === 0) {
              s += TX(30, 207, '剛好裝滿大杯：', { fs: 12, c: RED, fw: 900 });
              s += FRAC(132, 202.5, totalParts, 5, { fs: 11.5, c: RED, sw: 1.5 });
              s += TX(150, 207, `＝ ${wholeCups} 公升整 🎉`, { fs: 12, c: RED, fw: 900 });
            } else {
              s += TX(30, 207, '還不滿 1 大杯：共有', { fs: 12, c: '#15803d', fw: 900 });
              s += FRAC(156, 202.5, totalParts, 5, { fs: 11.5, c: '#15803d', sw: 1.5 });
              s += TX(174, 207, '公升果汁。', { fs: 12, c: '#15803d', fw: 900 });
            }

            // 第三行：口訣提示
            s += TX(30, 225, '💡 口訣：分母永遠不變，分子相乘得總份數，滿分母換整數！', { fs: 10.8, c: '#475569', fw: 700 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('.ans-toggle-btn').onclick = () => {
            showMixed = !showMixed;
            h.querySelector('.ans-toggle-btn').innerHTML = showMixed 
              ? '🔄 切換顯示：帶分數模式' 
              : '🔄 切換顯示：假分數模式';
            draw();
          };

          h.querySelector('#cupRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿觀察：每滿 5 格（\\(\\frac{5}{5}\\)）就進位為 1 整杯，假分數輕鬆化為帶分數。',
        example: {
          q: '一盒餅乾重 \\(\\frac{3}{5}\\) 公斤，買了 4 盒，一共重多少公斤？（用帶分數回答）',
          steps: [
            '列出乘法算式：\\(\\frac{3}{5} \\times 4\\)。',
            '分母不變，整數只乘分子：\\(\\frac{3 \\times 4}{5} = \\frac{12}{5}\\)（公斤）。',
            '\\(\\frac{12}{5}\\) 滿 5 是 1，12 ÷ 5 ＝ 2 餘 2。',
            '化成帶分數：\\(2\\frac{2}{5}\\) 公斤，答：\\(2\\frac{2}{5}\\) 公斤。'
          ],
          ans: '\\(2\\frac{2}{5}\\) 公斤'
        }
      }

    ]
  });
})();
