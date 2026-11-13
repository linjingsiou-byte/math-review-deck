/* ============ 第 6 章　三角形 ============
   節次：6-1 依邊長分類、6-2 依角的種類分類、6-3 三角形邊長關係、6-4 全等圖形
   對應課綱代碼：S-4-4 三角形：邊長分類（等腰、正/等邊、不等邊）、角分類（直角、銳角、鈍角三角形）、邊長關係、全等概念。
   課綱邊界：中年級不涉及三角形內角和 180° 的代數計算（內角和在後續或五上深化）；不引入全等性質證明（如 SSS, SAS）。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#0891b2';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', CYN = '#0891b2';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 6,
    title: '三角形',
    color: C,
    sections: ['6-1 依邊長分類', '6-2 依角的種類分類', '6-3 三角形邊長關係', '6-4 全等圖形'],
    slides: [

      // 6-1 Slide 1: 依邊長分類
      {
        sec: '6-1', secName: '依邊長分類',
        title: '兩邊相等是等腰，三邊相等叫正三角形',
        points: [
          '兩邊等長是 <span class="k">等腰三角形</span>，兩個底角也相等。',
          '三邊等長是 <span class="k">正三角形</span>，三個角都是 60°。',
          '三邊都不等長叫作 <span class="k">不等邊三角形</span>。'
        ],
        visual: (h) => {
          let currentType = 'iso';
          let showFold = false;

          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn tri-btn" data-t="iso" style="font-size:12px; padding:4px 8px;">📐 等腰三角形（兩邊相等）</button>
                <button class="nav-btn tri-btn" data-t="equ" style="font-size:12px; padding:4px 8px;">⭐ 正三角形（三邊相等）</button>
                <button class="nav-btn tri-btn" data-t="sca" style="font-size:12px; padding:4px 8px;">📏 不等邊三角形</button>
                <button class="nav-btn fold-btn" style="font-size:12px; padding:4px 10px; background:#fef3c7; border:1.5px solid #d97706; color:#b45309; font-weight:900;">✂️ 等腰對稱軸摺疊</button>
              </div>
            </div>`;

          const render = () => {
            const type = currentType;
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '三角形依「邊長」分類特性圖解', { fs: 15, c: CYN, anchor: 'middle', fw: 900 });

            const cx = 220, cy = 158;

            if (type === 'iso') {
              // 等腰三角形
              s += `<polygon points="${cx},55 ${cx - 75},${cy} ${cx + 75},${cy}" fill="#ecfeff" stroke="${CYN}" stroke-width="3"/>`;

              // 兩腰等長 tick 標記
              s += `<line x1="${cx - 42}" y1="102" x2="${cx - 32}" y2="108" stroke="${RED}" stroke-width="2.5"/>`;
              s += `<line x1="${cx + 42}" y1="102" x2="${cx + 32}" y2="108" stroke="${RED}" stroke-width="2.5"/>`;

              // 兩底角弧線
              s += `<path d="M${cx - 55},${cy} A20,20 0 0 0 ${cx - 65},${cy - 14}" fill="none" stroke="${RED}" stroke-width="2"/>`;
              s += `<path d="M${cx + 55},${cy} A20,20 0 0 1 ${cx + 65},${cy - 14}" fill="none" stroke="${RED}" stroke-width="2"/>`;

              s += TX(cx, 45, '頂點', { fs: 11, c: '#475569', anchor: 'middle' });
              s += TX(cx - 50, 85, '腰', { fs: 12, c: RED, fw: 900 });
              s += TX(cx + 40, 85, '腰', { fs: 12, c: RED, fw: 900 });
              s += TX(cx, cy + 18, '底邊', { fs: 11, c: '#475569', anchor: 'middle' });

              // 對稱軸摺疊效果
              if (showFold) {
                s += `<line x1="${cx}" y1="55" x2="${cx}" y2="${cy}" stroke="${RED}" stroke-width="2.5" stroke-dasharray="4,2"/>`;
                s += BOX(cx + 6, 95, 80, 20, { fill: '#fee2e2', stroke: '#ef4444', r: 4 });
                s += TX(cx + 46, 109, '對稱軸（對摺）', { fs: 10, c: RED, anchor: 'middle', fw: 900 });
                // 翻摺弧線
                s += `<path d="M${cx - 55},${cy - 8} Q${cx},${cy - 35} ${cx + 55},${cy - 8}" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="3,2"/>`;
              }

              s += BOX(25, 178, 390, 58, { fill: '#fff', stroke: '#a5f3fc', r: 8 });
              s += TX(40, 200, '【等腰三角形】：兩條相等的邊叫「腰」，底下的邊叫「底邊」。', { fs: 12, c: CYN, fw: 900 });
              s += TX(40, 220, showFold ? '✨ 沿著對稱軸對摺，兩個底角完全重疊，證明「兩底角必定相等」！' : '重要性質：兩腰等長，兩個底角也完全一樣大！', { fs: 12, c: RED, fw: 900 });
            } else if (type === 'equ') {
              // 正三角形
              s += `<polygon points="${cx},50 ${cx - 65},${cy} ${cx + 65},${cy}" fill="#fef3c7" stroke="${AMB}" stroke-width="3"/>`;

              // 三邊 tick 標記
              s += `<line x1="${cx - 36}" y1="102" x2="${cx - 26}" y2="108" stroke="${RED}" stroke-width="2.5"/>`;
              s += `<line x1="${cx + 36}" y1="102" x2="${cx + 26}" y2="108" stroke="${RED}" stroke-width="2.5"/>`;
              s += `<line x1="${cx - 3}" y1="${cy - 6}" x2="${cx - 3}" y2="${cy + 6}" stroke="${RED}" stroke-width="2.5"/>`;

              s += TX(cx - 45, cy - 8, '60°', { fs: 11, c: RED, fw: 900 });
              s += TX(cx + 25, cy - 8, '60°', { fs: 11, c: RED, fw: 900 });
              s += TX(cx - 10, 75, '60°', { fs: 11, c: RED, fw: 900 });

              s += BOX(25, 178, 390, 58, { fill: '#fff', stroke: '#fde68a', r: 8 });
              s += TX(40, 200, '【正三角形（等邊三角形）】：三條邊都一樣長。', { fs: 12, c: AMB, fw: 900 });
              s += TX(40, 220, '重要性質：三個角都一樣大，每一個角都是 60°！', { fs: 12, c: RED, fw: 900 });
            } else {
              // 不等邊三角形
              s += `<polygon points="${cx - 40},55 ${cx - 90},${cy} ${cx + 80},${cy}" fill="#f1f5f9" stroke="#64748b" stroke-width="3"/>`;
              s += TX(cx - 80, 100, '邊 a', { fs: 11, c: '#64748b' });
              s += TX(cx + 30, 95, '邊 b', { fs: 11, c: '#64748b' });
              s += TX(cx, cy + 18, '邊 c', { fs: 11, c: '#64748b', anchor: 'middle' });

              s += BOX(25, 178, 390, 58, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(40, 200, '【不等邊三角形】：三條邊的長度都不一樣長。', { fs: 12, c: '#334155', fw: 900 });
              s += TX(40, 220, '三個角的角度也都不一樣大。', { fs: 12, c: '#64748b' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.tri-btn').forEach(btn => {
            btn.onclick = () => {
              currentType = btn.dataset.t;
              render();
            };
          });
          h.querySelector('.fold-btn').onclick = () => {
            currentType = 'iso';
            showFold = !showFold;
            h.querySelector('.fold-btn').textContent = showFold ? '✅ 展開等腰三角形' : '✂️ 等腰對稱軸摺疊';
            render();
          };
          render();
        },
        caption: '點擊切換查看：等腰三角形兩腰等長兩底角相等；正三角形三邊相等三角皆為 60°。',
        example: {
          q: '一個三角形三邊長分別是 6 公分、6 公分、8 公分，這是什麼三角形？它的兩個底角一樣大嗎？',
          steps: [
            '觀察三邊長：有兩邊都是 6 公分，長度相等。',
            '兩邊等長的三角形叫「等腰三角形」。',
            '等腰三角形兩腰相等，且兩個底角一樣大。',
            '答：是等腰三角形，兩個底角一樣大。'
          ],
          ans: '等腰三角形，兩底角相等'
        }
      },

      // 6-2 Slide 2: 依角的種類分類
      {
        sec: '6-2', secName: '依角的種類分類',
        title: '有一個直角是直角三角形，有一個鈍角是鈍角三角形',
        points: [
          '有一個角是直角（90°）：<span class="k">直角三角形</span>。',
          '有一個角是鈍角（＞90°）：<span class="k">鈍角三角形</span>。',
          '三個角都是銳角（＜90°）：<span class="k">銳角三角形</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn ang-btn" data-a="rt" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">📐 直角 (1直角)</button>
                <button class="nav-btn ang-btn" data-a="ob" style="font-size:11.5px; padding:3px 8px;">⚡ 鈍角 (1鈍角)</button>
                <button class="nav-btn ang-btn" data-a="ac" style="font-size:11.5px; padding:3px 8px;">✨ 銳角 (3銳角)</button>
                <button class="nav-btn ang-btn" data-a="sum" style="font-size:11.5px; padding:3px 8px;">✂️ 撕角拼平角 (內角和180°)</button>
              </div>
            </div>`;

          const render = (angType) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            const cx = 220, cy = 150;

            if (angType === 'rt') {
              s += TX(220, 26, '三角形依「角」分類：看最大的一個角', { fs: 14.5, c: CYN, anchor: 'middle', fw: 900 });
              // 直角三角形
              s += `<polygon points="${cx - 70},${cy} ${cx + 70},${cy} ${cx - 70},55" fill="#ecfeff" stroke="${CYN}" stroke-width="3"/>`;
              s += `<rect x="${cx - 70}" y="${cy - 20}" width="20" height="20" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
              s += TX(cx - 45, cy - 25, '直角 (90°)', { fs: 12, c: RED, fw: 900 });
              s += TX(cx + 45, cy - 8, '銳角', { fs: 11, c: '#475569' });
              s += TX(cx - 65, 75, '銳角', { fs: 11, c: '#475569' });

              s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#a5f3fc', r: 8 });
              s += TX(40, 193, '【直角三角形】：有一個角剛好是直角（90°）。', { fs: 12.5, c: CYN, fw: 900 });
              s += TX(40, 212, '另外兩個角一定都是銳角，且兩銳角相加剛好也是 90°！', { fs: 11, c: '#475569' });
            } else if (angType === 'ob') {
              s += TX(220, 26, '三角形依「角」分類：看最大的一個角', { fs: 14.5, c: RED, anchor: 'middle', fw: 900 });
              // 鈍角三角形
              s += `<polygon points="${cx - 30},${cy} ${cx + 80},${cy} ${cx - 90},85" fill="#fef2f2" stroke="${RED}" stroke-width="3"/>`;
              s += `<path d="M${cx - 10},${cy} A20,20 0 0 0 ${cx - 45},${cy - 12}" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
              s += TX(cx - 30, cy - 22, '鈍角 (＞90°)', { fs: 12, c: RED, fw: 900 });
              s += TX(cx + 55, cy - 8, '銳角', { fs: 11, c: '#475569' });
              s += TX(cx - 80, 105, '銳角', { fs: 11, c: '#475569' });

              s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 193, '【鈍角三角形】：有一個角是大於 90° 的鈍角。', { fs: 12.5, c: RED, fw: 900 });
              s += TX(40, 212, '另外兩個角一樣都是銳角！一個三角形絕不可能有兩個鈍角。', { fs: 11, c: '#475569' });
            } else if (angType === 'ac') {
              s += TX(220, 26, '三角形依「角」分類：看最大的一個角', { fs: 14.5, c: GRN, anchor: 'middle', fw: 900 });
              // 銳角三角形
              s += `<polygon points="${cx},55 ${cx - 70},${cy} ${cx + 70},${cy}" fill="#f0fdf4" stroke="${GRN}" stroke-width="3"/>`;
              s += TX(cx, 75, '銳角', { fs: 11, c: GRN, anchor: 'middle' });
              s += TX(cx - 45, cy - 8, '銳角', { fs: 11, c: GRN });
              s += TX(cx + 25, cy - 8, '銳角', { fs: 11, c: GRN });

              s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 193, '【銳角三角形】：三個角通通都小於 90°（都是銳角）。', { fs: 12.5, c: GRN, fw: 900 });
              s += TX(40, 212, '💡 輔導員筆記：任何三角形都至少有兩個銳角，看最大角決定分類！', { fs: 11, c: '#15803d', fw: 800 });
            } else {
              // 撕角拼平角動態
              s += TX(220, 26, '✂️ 幾何神技：三角形三內角撕角拼成平角（180°）', { fs: 14, c: '#7c3aed', anchor: 'middle', fw: 900 });

              // 底部平角直線
              const py = 120;
              s += `<line x1="80" y1="${py}" x2="360" y2="${py}" stroke="#1e293b" stroke-width="3"/>`;
              s += `<circle cx="${cx}" cy="${py}" r="4" fill="${RED}"/>`;

              // 扇形拼角 (角1: 65° 藍色, 角2: 55° 琥珀色, 角3: 60° 綠色 ➔ 合計 180°)
              const r = 75;
              // 角 1 (從 0° 到 65°)
              const a1 = 65 * Math.PI / 180;
              const x1 = cx + r * Math.cos(a1), y1 = py - r * Math.sin(a1);
              s += `<path d="M${cx},${py} L${cx + r},${py} A${r},${r} 0 0 0 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="rgba(37, 99, 235, 0.3)" stroke="#2563eb" stroke-width="2"/>`;
              s += TX(cx + 38, py - 18, '∠1 (65°)', { fs: 11, c: BLU, fw: 900 });

              // 角 2 (從 65° 到 120°)
              const a2 = 120 * Math.PI / 180;
              const x2 = cx + r * Math.cos(a2), y2 = py - r * Math.sin(a2);
              s += `<path d="M${cx},${py} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="rgba(217, 119, 6, 0.3)" stroke="#d97706" stroke-width="2"/>`;
              s += TX(cx, py - 46, '∠2 (55°)', { fs: 11, c: AMB, anchor: 'middle', fw: 900 });

              // 角 3 (從 120° 到 180°)
              s += `<path d="M${cx},${py} L${x2.toFixed(1)},${y2.toFixed(1)} A${r},${r} 0 0 0 ${cx - r},${py} Z" fill="rgba(16, 185, 129, 0.3)" stroke="#059669" stroke-width="2"/>`;
              s += TX(cx - 38, py - 18, '∠3 (60°)', { fs: 11, c: GRN, fw: 900 });

              s += BOX(25, 172, 390, 62, { fill: '#fff', stroke: '#c084fc', r: 8 });
              s += TX(40, 193, '🎉 剛好拼成一直線！ ∠1 ＋ ∠2 ＋ ∠3 ＝ 180°（平角）', { fs: 12.5, c: '#7c3aed', fw: 900 });
              s += TX(40, 212, '無論是銳角、直角還是鈍角三角形，三個內角相加永遠等於 180 度！', { fs: 11.5, c: '#334155' });
              s += TX(40, 226, '這就是為什麼三角形不可能有兩個直角或兩個鈍角的原因！', { fs: 10.5, c: '#15803d', fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.ang-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.ang-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.a);
            };
          });
          render('rt');
        },
        caption: '點擊切換查看：看最大角分類，並透過撕角拼平角見證內角和恆為 180°。',
        example: {
          q: '一個三角形的三個角分別是 35°、55°、90°，這是哪一種三角形？',
          steps: [
            '檢查三個角的度數：35°、55°、90°。',
            '找出最大的一個角：剛好是 90°（直角）。',
            '只要有一個角是直角，就是「直角三角形」。',
            '答：直角三角形。'
          ],
          ans: '直角三角形'
        }
      },

      // 6-3 Slide 3: 三角形兩邊之和大於第三邊
      {
        sec: '6-3', secName: '三角形邊長關係',
        title: '任意兩邊合，一定要大於第三邊',
        points: [
          '三角形任意兩邊長相加，<span class="k">一定大於第三邊</span>。',
          '快速檢查法：<span class="k">最短兩邊之和 ＞ 最長邊</span>。',
          '若兩邊合小於或等於第三邊，兩端碰不到，<span class="k">圍不成三角形</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn try-btn" data-c="fail" style="font-size:12px; padding:3px 8px;">❌ 組合 A: 3, 4, 8cm (懸空碰不到)</button>
                <button class="nav-btn try-btn" data-c="flat" style="font-size:12px; padding:3px 8px; background:#fef3c7; border:1px solid #d97706; color:#b45309;">⚠️ 組合 B: 3, 5, 8cm (剛好躺平重疊)</button>
                <button class="nav-btn try-btn" data-c="pass" style="font-size:12px; padding:3px 8px; background:#dcfce7; border:1.5px solid #22c55e; color:#15803d; font-weight:900;">✅ 組合 C: 3, 4, 5cm (成功閉合) 🎉</button>
              </div>
            </div>`;

          const renderCase = (c) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '三根木條能否圍成三角形實驗室', { fs: 15, c: CYN, anchor: 'middle', fw: 900 });

            const cx = 220, cy = 135;

            if (c === 'fail') {
              // 3, 4, 8 -> 8cm 底邊
              const bLen = 180;
              s += `<line x1="${cx - bLen / 2}" y1="${cy}" x2="${cx + bLen / 2}" y2="${cy}" stroke="#1e293b" stroke-width="4"/>`;
              s += TX(cx, cy + 20, '最長邊 8 cm', { fs: 12, c: '#1e293b', anchor: 'middle', fw: 900 });

              // 左邊 3cm 與 右邊 4cm
              s += `<line x1="${cx - bLen / 2}" y1="${cy}" x2="${cx - bLen / 2 + 55}" y2="${cy - 30}" stroke="${RED}" stroke-width="4"/>`;
              s += TX(cx - bLen / 2 + 25, cy - 25, '3 cm', { fs: 11, c: RED, fw: 800 });

              s += `<line x1="${cx + bLen / 2}" y1="${cy}" x2="${cx + bLen / 2 - 70}" y2="${cy - 30}" stroke="${RED}" stroke-width="4"/>`;
              s += TX(cx + bLen / 2 - 45, cy - 25, '4 cm', { fs: 11, c: RED, fw: 800 });

              // 中間碰不到的斷裂虛線
              s += `<line x1="${cx - bLen / 2 + 55}" y1="${cy - 30}" x2="${cx + bLen / 2 - 70}" y2="${cy - 30}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3"/>`;
              s += TX(cx - 5, cy - 35, '❌ 碰不到！', { fs: 12, c: RED, anchor: 'middle', fw: 900 });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 198, '❌ 檢驗：3 ＋ 4 ＝ 7 cm ＜ 8 cm（兩短邊相加比最長邊短！）。', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 220, '兩條木條懸空無法相交，因此「圍不成三角形」！', { fs: 12, c: RED });
            } else if (c === 'flat') {
              // 3, 5, 8
              const bLen = 180;
              s += `<line x1="${cx - bLen / 2}" y1="${cy}" x2="${cx + bLen / 2}" y2="${cy}" stroke="#1e293b" stroke-width="4"/>`;
              s += TX(cx, cy + 20, '最長邊 8 cm', { fs: 12, c: '#1e293b', anchor: 'middle', fw: 900 });

              // 躺平重疊
              s += `<line x1="${cx - bLen / 2}" y1="${cy - 8}" x2="${cx - bLen / 2 + 67}" y2="${cy - 8}" stroke="${RED}" stroke-width="3.5"/>`;
              s += TX(cx - bLen / 2 + 33, cy - 14, '3 cm', { fs: 11, c: RED, anchor: 'middle', fw: 900 });
              s += `<line x1="${cx - bLen / 2 + 67}" y1="${cy - 8}" x2="${cx + bLen / 2}" y2="${cy - 8}" stroke="#d97706" stroke-width="3.5"/>`;
              s += TX(cx + 25, cy - 14, '5 cm', { fs: 11, c: '#d97706', anchor: 'middle', fw: 900 });

              s += TX(cx, cy - 35, '⚠️ 剛好躺平重疊成一條直線！', { fs: 12.5, c: '#b45309', anchor: 'middle', fw: 900 });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#fcd34d', r: 8 });
              s += TX(40, 198, '⚠️ 臨界迷思：3 ＋ 5 ＝ 8 cm ＝ 8 cm（兩短邊相加剛好等於最長邊）。', { fs: 12, c: '#b45309', fw: 900 });
              s += TX(40, 220, '兩根木條剛好貼在底邊上變成一條直線，沒有任何高度，依然圍不成三角形！', { fs: 11.5, c: '#b45309', fw: 800 });
            } else {
              // 3, 4, 5
              const bLen = 140;
              s += `<polygon points="${cx - bLen / 2},${cy} ${cx + bLen / 2},${cy} ${cx - bLen / 2},${cy - 84}" fill="#ecfeff" stroke="${GRN}" stroke-width="3"/>`;
              s += TX(cx, cy + 20, '底邊 4 cm', { fs: 12, c: '#1e293b', anchor: 'middle', fw: 900 });
              s += TX(cx - bLen / 2 - 35, cy - 40, '3 cm', { fs: 12, c: BLU, fw: 900 });
              s += TX(cx + 15, cy - 45, '最長邊 5 cm', { fs: 12, c: GRN, fw: 900 });

              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 198, '✅ 檢驗：3 ＋ 4 ＝ 7 cm ＞ 5 cm（兩短邊相加比最長邊長！）。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 220, '三根木條成功交會於頂點，順利圍成三角形 🎉', { fs: 12, c: '#15803d' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.try-btn').forEach(btn => {
            btn.onclick = () => renderCase(btn.dataset.c);
          });
          renderCase('fail');
        },
        caption: '點擊按鈕對照：只要「較短的兩邊長相加 ＞ 最長邊」，就能成功圍成三角形。',
        example: {
          q: '有三根吸管長度分別是 3 公分、4 公分、8 公分，能圍成一個三角形嗎？',
          steps: [
            '找出最長邊是 8 公分，另外兩邊是 3 公分和 4 公分。',
            '最短兩邊長相加：3 ＋ 4 ＝ 7 公分。',
            '比較大小：7 公分 ＜ 8 公分（比最長邊還短，碰不到）。',
            '答：不能圍成三角形。'
          ],
          ans: '不能圍成三角形'
        }
      },

      // 6-4 Slide 4: 全等圖形
      {
        sec: '6-4', secName: '全等圖形',
        title: '完全疊合叫全等，對應邊相等對應角也相等',
        points: [
          '形狀大小完全一樣，能完全疊合的圖形叫 <span class="k">全等圖形</span>。',
          '疊合時重疊的頂點叫 <span class="k">對應頂點</span>。',
          '重疊的邊長相等叫 <span class="k">對應邊</span>，重疊的角叫 <span class="k">對應角</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn m-btn" data-s="sep" style="font-size:12px; padding:4px 10px;">🔍 圖形分開：甲三角形 與 乙三角形</button>
                <button class="nav-btn m-btn" data-s="fit" style="font-size:12px; padding:4px 10px;">✨ 旋轉平移完全疊合 🎉</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '全等圖形：透過旋轉平移能完全疊合', { fs: 15, c: CYN, anchor: 'middle', fw: 900 });

            if (st === 'sep') {
              // 兩個分開的三角形 (甲在左，乙在右)
              // 甲
              s += `<polygon points="70,140 160,140 70,60" fill="rgba(225, 29, 72, 0.15)" stroke="${RED}" stroke-width="2.5"/>`;
              s += TX(100, 115, '甲', { fs: 16, c: RED, fw: 900 });
              s += TX(60, 55, 'A', { fs: 12, c: RED, fw: 800 });
              s += TX(55, 145, 'B', { fs: 12, c: RED, fw: 800 });
              s += TX(165, 145, 'C', { fs: 12, c: RED, fw: 800 });

              // 乙 (稍微旋轉對調)
              s += `<polygon points="280,140 370,140 280,60" fill="rgba(8, 145, 178, 0.15)" stroke="${CYN}" stroke-width="2.5"/>`;
              s += TX(310, 115, '乙', { fs: 16, c: CYN, fw: 900 });
              s += TX(270, 55, 'D', { fs: 12, c: CYN, fw: 800 });
              s += TX(265, 145, 'E', { fs: 12, c: CYN, fw: 800 });
              s += TX(375, 145, 'F', { fs: 12, c: CYN, fw: 800 });

              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(40, 198, '觀察：甲三角形與乙三角形，形狀和大小看起來一樣。', { fs: 12, c: '#1e293b', fw: 900 });
              s += TX(40, 218, '點擊「旋轉平移完全疊合」按鈕，看看它們能否完全重疊！', { fs: 12, c: CYN, fw: 800 });
            } else {
              // 疊合狀態
              const cx = 220;
              s += `<polygon points="${cx - 45},140 ${cx + 45},140 ${cx - 45},60" fill="rgba(16, 185, 129, 0.25)" stroke="${GRN}" stroke-width="3.5"/>`;
              s += TX(cx, 115, '甲 ＝ 乙', { fs: 16, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(cx - 55, 55, 'A(D)', { fs: 12, c: GRN, fw: 900 });
              s += TX(cx - 60, 145, 'B(E)', { fs: 12, c: GRN, fw: 900 });
              s += TX(cx + 50, 145, 'C(F)', { fs: 12, c: GRN, fw: 900 });

              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 198, '🎉 完美疊合！甲與乙是「全等三角形」。', { fs: 13, c: '#15803d', fw: 900 });
              s += TX(40, 218, '對應邊等長（AB＝DE, BC＝EF, AC＝DF）；對應角相等（∠A＝∠D）。', { fs: 11, c: '#334155' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.m-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.s);
          });
          render('sep');
        },
        caption: '點擊按鈕觀察：能完全疊合的圖形稱為全等，對應邊等長、對應角相等。',
        example: {
          q: '三角形甲與三角形乙完全疊合（全等），甲的三邊長是 5cm、6cm、7cm，乙的三邊長是多少？',
          steps: [
            '因為三角形甲與三角形乙全等。',
            '全等圖形的對應邊長度完全相等。',
            '乙的三邊長和甲的對應邊完全相同。',
            '答：5 公分、6 公分、7 公分。'
          ],
          ans: '5cm、6cm、7cm'
        }
      }

    ]
  });
})();
