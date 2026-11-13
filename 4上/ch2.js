/* ============ 第 2 章　整數的乘法 ============
   節次：2-1 四位數×一位數、2-2 乘數是整十的乘法、2-3 二位數×二位數、2-4 三位數與四位數×二位數
   對應課綱代碼：N-4-2 較大位數的乘除法：乘數為二位數之整數乘法。
   課綱邊界：本章乘數以二位數為限，不處理三位數乘三位數；不引入小數與分數乘法。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#7c3aed';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 2,
    title: '整數的乘法',
    color: C,
    sections: ['2-1 四位數×一位數', '2-2 乘數是整十的乘法', '2-3 二位數×二位數', '2-4 三位數與四位數×二位數'],
    slides: [

      // 2-1 Slide 1: 四位數×一位數
      {
        sec: '2-1', secName: '四位數×一位數',
        title: '由個位依序乘起，滿十要向前進位',
        points: [
          '整千乘一位數：先算前面乘積，<span class="k">後面補 3 個 0</span>。',
          '四位數乘一位數：<span class="k">由個位依序往左乘</span>。',
          '進位數字記心裡或寫在上方，下一位記得<span class="k">加上去</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn m-btn" data-s="1" style="font-size:12px; padding:4px 8px;">Step 1: 5×3 個位</button>
                <button class="nav-btn m-btn" data-s="2" style="font-size:12px; padding:4px 8px;">Step 2: 6×3 十位</button>
                <button class="nav-btn m-btn" data-s="3" style="font-size:12px; padding:4px 8px;">Step 3: 2×3 百位</button>
                <button class="nav-btn m-btn" data-s="4" style="font-size:12px; padding:4px 8px;">Step 4: 1×3 千位</button>
              </div>
            </div>`;

          const render = (st) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 30, '直式計算： 1265 × 3 ＝ ？', { fs: 15, c: VIO, anchor: 'middle', fw: 900 });

            // 直式對齊
            const startX = 85, y = 50, colW = 28;
            const cols = ['千位', '百位', '十位', '個位'];
            cols.forEach((col, i) => {
              s += TX(startX + i * colW + 14, y, col, { fs: 11, c: '#64748b', anchor: 'middle' });
            });

            // 進位標記
            if (st >= 1) s += TX(startX + 2 * colW + 14, y + 16, '①', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 2) s += TX(startX + 1 * colW + 14, y + 16, '①', { fs: 13, c: RED, anchor: 'middle', fw: 900 });

            // 被乘數 1265
            const n1 = '1265';
            for (let i = 0; i < 4; i++) {
              s += TX(startX + i * colW + 14, y + 36, n1[i], { fs: 18, anchor: 'middle' });
            }
            // 乘號與乘數
            s += TX(startX - 15, y + 62, '×', { fs: 18, c: VIO, anchor: 'middle', fw: 900 });
            s += TX(startX + 3 * colW + 14, y + 62, '3', { fs: 18, anchor: 'middle' });

            // 橫線
            s += `<line x1="${startX - 20}" y1="${y + 72}" x2="${startX + 4 * colW + 5}" y2="${y + 72}" stroke="#334155" stroke-width="2"/>`;

            // 逐步答案
            if (st >= 1) s += TX(startX + 3 * colW + 14, y + 95, '5', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 2) s += TX(startX + 2 * colW + 14, y + 95, '9', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
            if (st >= 3) s += TX(startX + 1 * colW + 14, y + 95, '7', { fs: 18, c: BLU, anchor: 'middle', fw: 900 });
            if (st >= 4) s += TX(startX + 0 * colW + 14, y + 95, '3', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });

            // 右側視覺圖卡（具體積木概念）
            s += BOX(220, 50, 190, 85, { fill: '#fff', stroke: '#c4b5fd', r: 8 });
            s += TX(315, 70, '🧱 位值積木倍數累加', { fs: 12, c: VIO, anchor: 'middle', fw: 900 });
            if (st === 1) {
              s += TX(315, 95, '5 個一 × 3 ＝ 15 個一', { fs: 12, c: RED, anchor: 'middle', fw: 800 });
              s += TX(315, 115, '換成 1 個十 ＋ 5 個一', { fs: 11, c: '#475569', anchor: 'middle' });
            } else if (st === 2) {
              s += TX(315, 95, '6 個十 × 3 ＝ 18 個十', { fs: 12, c: RED, anchor: 'middle', fw: 800 });
              s += TX(315, 115, '18 個十 ＋ ① 個十 ＝ 19 個十', { fs: 11, c: '#475569', anchor: 'middle' });
            } else if (st === 3) {
              s += TX(315, 95, '2 個百 × 3 ＝ 6 個百', { fs: 12, c: BLU, anchor: 'middle', fw: 800 });
              s += TX(315, 115, '6 個百 ＋ ① 個百 ＝ 7 個百', { fs: 11, c: '#475569', anchor: 'middle' });
            } else {
              s += TX(315, 95, '1 個千 × 3 ＝ 3 個千', { fs: 12, c: GRN, anchor: 'middle', fw: 800 });
              s += TX(315, 115, '🎉 全部乘完！總積 3795', { fs: 12, c: GRN, anchor: 'middle', fw: 900 });
            }

            // 下方解說卡
            s += BOX(25, 150, 390, 85, { fill: '#fff', stroke: '#93c5fd', r: 8 });
            if (st === 1) {
              s += TX(40, 175, 'Step 1: 個位 5 × 3 ＝ 15', { fs: 14, c: RED, fw: 900 });
              s += TX(40, 200, '個位寫 5，向十位進 1（標註 ① 在十位上方）。', { fs: 13, c: '#334155' });
            } else if (st === 2) {
              s += TX(40, 175, 'Step 2: 十位 6 × 3 ＝ 18', { fs: 14, c: RED, fw: 900 });
              s += TX(40, 200, '別忘了加上剛才進位的 1：18 ＋ 1 ＝ 19，十位寫 9，向百位進 1。', { fs: 13, c: '#334155' });
            } else if (st === 3) {
              s += TX(40, 175, 'Step 3: 百位 2 × 3 ＝ 6', { fs: 14, c: BLU, fw: 900 });
              s += TX(40, 200, '加上進位的 1：6 ＋ 1 ＝ 7，百位寫 7（沒有進位）。', { fs: 13, c: '#334155' });
            } else {
              s += TX(40, 175, 'Step 4: 千位 1 × 3 ＝ 3 🎉', { fs: 14, c: GRN, fw: 900 });
              s += TX(40, 200, '千位寫 3，直式完整計算答案為 3795！', { fs: 13, c: GRN, fw: 900 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.m-btn').forEach(btn => {
            btn.onclick = () => render(+btn.dataset.s);
          });
          render(1);
        },
        caption: '點擊 Step 按鈕依序推演：四位數乘一位數由個位往左算，記得加上進位數字。',
        example: {
          q: '爸爸買吸塵器，一臺售價 1265 元，買 3 臺共要付多少元？',
          steps: [
            '列出乘法直式：1265 × 3。',
            '個位：5 × 3 = 15，寫 5 向十位進 1。',
            '十位：6 × 3 = 18，18 + 1 = 19，寫 9 向百位進 1。',
            '百千位：2 × 3 + 1 = 7，1 × 3 = 3，總共 3795 元。'
          ],
          ans: '3795 元'
        }
      },

      // 2-2 Slide 2: 乘數是整十的乘法
      {
        sec: '2-2', secName: '乘數是整十的乘法',
        title: '先乘前面非零數，乘數有幾個零就補幾個零',
        points: [
          '乘數是 10：相當於把被乘數放大 <span class="k">10 倍</span>（末尾補 0）。',
          '乘數是 30：先算乘 3，再把結果<span class="k">末尾補一個 0</span>。',
          '拆解法心算：\\(28 \\times 30 = 28 \\times 3 \\times 10 = 840\\)。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>乘數倍數：<span class="ival" id="tensVal">30</span> （即 3 個十）</label>
                <input type="range" id="tensRange" min="10" max="50" step="10" value="30">
              </div>
            </div>`;

          const draw = () => {
            const tens = +h.querySelector('#tensRange').value;
            h.querySelector('#tensVal').textContent = `${tens} （即 ${tens / 10} 個十）`;
            const base = 28;
            const single = tens / 10;
            const step1Ans = base * single;
            const totalAns = base * tens;

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 32, `直式計算： 28 × ${tens} ＝ ？`, { fs: 16, c: VIO, anchor: 'middle', fw: 900 });

            // 拆解心算法展示卡
            s += BOX(30, 48, 380, 68, { fill: '#f5f3ff', stroke: '#a78bfa', r: 8 });
            s += TX(45, 72, '💡 快速拆解法原理：', { fs: 13, c: VIO, fw: 900 });
            s += TX(45, 96, `28 × ${tens} ＝ 28 × ${single} × 10 ＝ ${step1Ans} × 10 ＝ ${totalAns}`, { fs: 14, c: RED, fw: 900 });

            // 直式末位補零展示卡片（嚴格位值對齊：千、百、十、個）
            const cx = 95, cy = 120, cw = 250, ch = 122;
            s += BOX(cx, cy, cw, ch, { fill: '#fff', stroke: '#cbd5e1', r: 8 });

            // 欄位中線座標（每欄 24px）
            const gx = 208, tx = 184, bx = 160, kx = 136;

            // 頂部位值淺灰標記
            s += TX(kx, cy + 16, '千', { fs: 11, c: '#94a3b8', anchor: 'middle' });
            s += TX(bx, cy + 16, '百', { fs: 11, c: '#94a3b8', anchor: 'middle' });
            s += TX(tx, cy + 16, '十', { fs: 11, c: '#94a3b8', anchor: 'middle' });
            s += TX(gx, cy + 16, '個', { fs: 11, c: '#94a3b8', anchor: 'middle' });

            // 第 1 列：被乘數 28
            const y1 = cy + 38;
            s += TX(tx, y1, '2', { fs: 19, fw: 900, anchor: 'middle' });
            s += TX(gx, y1, '8', { fs: 19, fw: 900, anchor: 'middle' });

            // 第 2 列：乘數 tens（如 50）
            const y2 = cy + 62;
            s += TX(kx - 18, y2, '×', { fs: 19, c: VIO, fw: 900, anchor: 'middle' });
            s += TX(tx, y2, `${single}`, { fs: 19, fw: 900, anchor: 'middle' });
            s += TX(gx, y2, '0', { fs: 19, fw: 900, anchor: 'middle' });

            // 橫線
            const yLine = cy + 71;
            s += `<line x1="${kx - 22}" y1="${yLine}" x2="${gx + 14}" y2="${yLine}" stroke="#334155" stroke-width="2"/>`;

            // 第 3 列：乘積（個位補 0，非零乘積精準對齊十位、百位、千位）
            const yAns = cy + 93;
            // 1. 個位補 0（紅色）
            s += TX(gx, yAns, '0', { fs: 19, c: RED, fw: 900, anchor: 'middle' });
            s += TX(gx + 18, yAns - 1, '← 個位補 0', { fs: 11, c: RED, fw: 800 });

            // 2. 28 × single 的積（藍色），從十位 (tx) 開始往左精準對齊排入
            const sStr = String(step1Ans);
            for (let k = 0; k < sStr.length; k++) {
              const char = sStr[sStr.length - 1 - k];
              const xPos = tx - k * 24;
              s += TX(xPos, yAns, char, { fs: 19, c: BLU, fw: 900, anchor: 'middle' });
            }

            // 底部總結算式
            s += TX(cx + cw / 2, cy + 113, `＝ ${totalAns}（先算 28×${single}＝${step1Ans}，末尾補 0）`, { fs: 11, c: GRN, fw: 900, anchor: 'middle' });

            h.querySelector('#fig').innerHTML = svg('0 0 440 252', s);
          };

          h.querySelector('#tensRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿改變乘數整十倍數：先算非零部分乘積，末尾補上一個 0。',
        example: {
          q: '學校影印視力檢查通知單，每班發 28 張，30 個班級共發幾張？',
          steps: [
            '列出直式算式：28 × 30。',
            '先算 28 × 3 ＝ 84（3 個十是 84 個十）。',
            '84 個十是 840（末尾補一個 0）。',
            '答：840 張。'
          ],
          ans: '840 張'
        }
      },

      // 2-3 Slide 3: 二位數×二位數
      {
        sec: '2-3', secName: '二位數×二位數',
        title: '先乘個位，再乘十位，兩層相加得總積',
        points: [
          '第一層：被乘數 × 乘數的<span class="k">個位</span>。',
          '第二層：被乘數 × 乘數的<span class="k">十位</span>（個位補 0 對齊十位）。',
          '兩層乘積按位數對齊，<span class="k">相加就是總積</span>。'
        ],
        visual: (h) => {
          let showGhostZero = false;
          let currentLayer = 1;

          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn l-btn" data-layer="1" style="font-size:12px; padding:4px 8px;">層 1: 24×2 (個位積)</button>
                <button class="nav-btn l-btn" data-layer="2" style="font-size:12px; padding:4px 8px;">層 2: 24×10 (十位積)</button>
                <button class="nav-btn l-btn" data-layer="3" style="font-size:12px; padding:4px 8px;">層 3: 兩層相加總積 🎉</button>
                <button class="nav-btn zero-toggle-btn" style="font-size:12px; padding:4px 10px; background:#fef3c7; border:1.5px solid #d97706; color:#b45309; font-weight:900;">👁️ 透視 0 開關</button>
              </div>
            </div>`;

          const render = () => {
            const ly = currentLayer;
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '直式與面積模型： 24 × 12 ＝ 288', { fs: 15, c: VIO, anchor: 'middle', fw: 900 });

            // 左側：直式計算（嚴格位值對齊：百、十、個）
            const sx = 75, sy = 40;
            s += BOX(sx - 25, sy, 145, 148, { fill: '#fff', stroke: '#cbd5e1', r: 8 });

            // 欄位中線座標（每欄 22px）
            const gx = sx + 52, tx = gx - 22, bx = tx - 22;

            // 頂部位值淺灰標記
            s += TX(bx, sy + 14, '百', { fs: 10.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(tx, sy + 14, '十', { fs: 10.5, c: '#94a3b8', anchor: 'middle' });
            s += TX(gx, sy + 14, '個', { fs: 10.5, c: '#94a3b8', anchor: 'middle' });

            // 被乘數 24
            s += TX(tx, sy + 34, '2', { fs: 17, fw: 900, anchor: 'middle' });
            s += TX(gx, sy + 34, '4', { fs: 17, fw: 900, anchor: 'middle' });

            // 乘數 12
            s += TX(bx - 16, sy + 52, '×', { fs: 17, c: VIO, anchor: 'middle', fw: 900 });
            s += TX(tx, sy + 52, '1', { fs: 17, fw: 900, anchor: 'middle' });
            s += TX(gx, sy + 52, '2', { fs: 17, fw: 900, anchor: 'middle' });
            s += `<line x1="${bx - 20}" y1="${sy + 58}" x2="${gx + 12}" y2="${sy + 58}" stroke="#334155" stroke-width="1.8"/>`;

            // 第一層 24 × 2 = 48
            const hl1 = (ly === 1 || ly === 3);
            s += BOX(bx - 6, sy + 62, 68, 18, { fill: hl1 ? '#dbeafe' : 'none', stroke: 'none', r: 3 });
            s += TX(tx, sy + 76, '4', { fs: 17, c: hl1 ? BLU : '#94a3b8', anchor: 'middle', fw: 900 });
            s += TX(gx, sy + 76, '8', { fs: 17, c: hl1 ? BLU : '#94a3b8', anchor: 'middle', fw: 900 });

            // 第二層 24 × 10 = 240
            const hl2 = (ly === 2 || ly === 3);
            s += BOX(bx - 6, sy + 80, 68, 18, { fill: hl2 ? '#fef3c7' : 'none', stroke: 'none', r: 3 });
            s += TX(bx, sy + 94, '2', { fs: 17, c: hl2 ? AMB : '#94a3b8', anchor: 'middle', fw: 900 });
            s += TX(tx, sy + 94, '4', { fs: 17, c: hl2 ? AMB : '#94a3b8', anchor: 'middle', fw: 900 });
            
            // 透視 0 呈現
            if (showGhostZero) {
              s += BOX(gx - 8, sy + 82, 16, 16, { fill: '#fee2e2', stroke: '#ef4444', sw: 1.5, r: 3 });
              s += TX(gx, sy + 94, '0', { fs: 14, c: RED, anchor: 'middle', fw: 900 });
              s += TX(gx + 14, sy + 94, '←補0', { fs: 9.5, c: RED, fw: 800 });
            } else {
              s += TX(gx, sy + 94, '0', { fs: 17, c: '#e2e8f0', anchor: 'middle', fw: 700 });
            }

            s += `<line x1="${bx - 20}" y1="${sy + 102}" x2="${gx + 12}" y2="${sy + 102}" stroke="#334155" stroke-width="1.8"/>`;

            // 總和 288
            const hl3 = (ly === 3);
            s += TX(bx, sy + 122, '2', { fs: 18, c: hl3 ? RED : '#94a3b8', anchor: 'middle', fw: 900 });
            s += TX(tx, sy + 122, '8', { fs: 18, c: hl3 ? RED : '#94a3b8', anchor: 'middle', fw: 900 });
            s += TX(gx, sy + 122, '8', { fs: 18, c: hl3 ? RED : '#94a3b8', anchor: 'middle', fw: 900 });

            // 右側：CPA 面積模型切割
            const ax = 210, ay = 40;
            s += BOX(ax, ay, 205, 148, { fill: '#fff', stroke: '#c4b5fd', r: 8 });
            s += TX(ax + 102, ay + 18, '📐 乘法面積切割模型', { fs: 12, c: VIO, anchor: 'middle', fw: 900 });

            // 矩形區塊 24 x 10 (琥珀色)
            const b2Fill = hl2 ? '#fef3c7' : '#f8fafc';
            const b2Stroke = hl2 ? AMB : '#e2e8f0';
            s += BOX(ax + 18, ay + 28, 168, 52, { fill: b2Fill, stroke: b2Stroke, sw: hl2 ? 2.2 : 1 });
            s += TX(ax + 102, ay + 59, '24 × 10 ＝ 240', { fs: 13, c: hl2 ? AMB : '#94a3b8', anchor: 'middle', fw: 800 });

            // 矩形區塊 24 x 2 (藍色)
            const b1Fill = hl1 ? '#dbeafe' : '#f8fafc';
            const b1Stroke = hl1 ? BLU : '#e2e8f0';
            s += BOX(ax + 18, ay + 82, 168, 30, { fill: b1Fill, stroke: b1Stroke, sw: hl1 ? 2.2 : 1 });
            s += TX(ax + 102, ay + 102, '24 × 2 ＝ 48', { fs: 13, c: hl1 ? BLU : '#94a3b8', anchor: 'middle', fw: 800 });

            s += TX(ax + 102, ay + 132, '總面積 ＝ 240 ＋ 48 ＝ 288', { fs: 12, c: hl3 ? RED : '#475569', anchor: 'middle', fw: 900 });

            // 下方解說卡
            s += BOX(25, 194, 390, 46, { fill: '#fff', stroke: '#93c5fd', r: 6 });
            if (showGhostZero) {
              s += TX(40, 221, '👁️ 透視 0 解密：第二層是乘 10，個位本來是 0，直式為求簡潔習慣省略不寫！', { fs: 11.5, c: RED, fw: 900 });
            } else if (ly === 1) {
              s += TX(40, 221, '第一層：乘數個位 2 × 24 ＝ 48（藍色區塊）。', { fs: 13, c: BLU, fw: 900 });
            } else if (ly === 2) {
              s += TX(40, 221, '第二層：乘數十位 1 個十 × 24 ＝ 240（琥珀區塊，個位對齊十位）。', { fs: 12.5, c: AMB, fw: 900 });
            } else {
              s += TX(40, 221, '兩層相加：48 ＋ 240 ＝ 288（總面積＝總積）🎉', { fs: 13, c: RED, fw: 900 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.l-btn').forEach(btn => {
            btn.onclick = () => {
              currentLayer = +btn.dataset.layer;
              render();
            };
          });
          h.querySelector('.zero-toggle-btn').onclick = () => {
            showGhostZero = !showGhostZero;
            h.querySelector('.zero-toggle-btn').textContent = showGhostZero ? '✅ 關閉透視 0' : '👁️ 透視 0 開關';
            render();
          };
          render();
        },
        caption: '點擊切換觀察：直式第一層與第二層分別對應面積模型的兩塊長方形。',
        example: {
          q: '學校健康操表演，一列有 24 人，排成 12 列，共有幾人表演？',
          steps: [
            '列出乘法直式：24 × 12。',
            '第一層算 2 列的人數：24 × 2 ＝ 48（人）。',
            '第二層算 10 列的人數：24 × 10 ＝ 240（人）。',
            '兩層相加：48 ＋ 240 ＝ 288，答：288 人。'
          ],
          ans: '288 人'
        }
      },

      // 2-4 Slide 4: 三位數與四位數×二位數（中間有零乘法）
      {
        sec: '2-4', secName: '三位數與四位數×二位數',
        title: '遇到零也要相乘，十位乘積個位要對齊',
        points: [
          '被乘數中間有 0：<span class="k">0 乘任何數都是 0</span>，有進位要加上去。',
          '乘數十位乘積寫在第二層，<span class="k">個位對齊十位開始寫</span>。',
          '千萬不能漏乘 0，否則位數會縮排算錯。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn mode-btn" data-m="cor" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">① 被乘數有 0（402×36）</button>
                <button class="nav-btn mode-btn" data-m="mid" style="font-size:11.5px; padding:3px 8px;">② 乘數中間有 0（236×305省行）</button>
                <button class="nav-btn mode-btn" data-m="err" style="font-size:11.5px; padding:3px 8px;">③ 學生漏乘 0 迷思</button>
              </div>
            </div>`;

          const showMode = (mode) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 欄位定義：五位數對齊（萬、千、百、十、個），每欄 19px
            const colW = 19;
            const gx = 212, tx = gx - colW, bx = tx - colW, kx = bx - colW, wx = kx - colW;

            // 輔助：位值中線排列整數
            const drawDigits = (num, y, opts = {}) => {
              const str = String(num);
              let h = '';
              const startX = gx - (opts.offset || 0) * colW;
              for (let i = 0; i < str.length; i++) {
                const char = str[str.length - 1 - i];
                const xPos = startX - i * colW;
                h += TX(xPos, y, char, { fs: opts.fs || 16, c: opts.c || '#0f172a', fw: opts.fw || 900, anchor: 'middle' });
              }
              return h;
            };

            const drawHeaders = (sy) => {
              let h = '';
              h += TX(wx, sy + 13, '萬', { fs: 10, c: '#94a3b8', anchor: 'middle' });
              h += TX(kx, sy + 13, '千', { fs: 10, c: '#94a3b8', anchor: 'middle' });
              h += TX(bx, sy + 13, '百', { fs: 10, c: '#94a3b8', anchor: 'middle' });
              h += TX(tx, sy + 13, '十', { fs: 10, c: '#94a3b8', anchor: 'middle' });
              h += TX(gx, sy + 13, '個', { fs: 10, c: '#94a3b8', anchor: 'middle' });
              return h;
            };

            const sx = 120, sy = 38;

            if (mode === 'cor') {
              s += TX(220, 26, '被乘數中間有 0： 402 × 36 ＝ 14472', { fs: 14, c: VIO, anchor: 'middle', fw: 900 });
              // 正確直式
              s += BOX(sx - 35, sy, 205, 140, { fill: '#f0fdf4', stroke: '#16a34a', sw: 2, r: 8 });
              s += drawHeaders(sy);

              // 被乘數 402 與 乘數 36
              s += drawDigits(402, sy + 33);
              s += TX(wx - 16, sy + 51, '×', { fs: 16, c: VIO, anchor: 'middle', fw: 900 });
              s += drawDigits(36, sy + 51);
              s += `<line x1="${wx - 22}" y1="${sy + 57}" x2="${gx + 12}" y2="${sy + 57}" stroke="#334155" stroke-width="1.8"/>`;

              // 第一層 402 × 6 = 2412
              s += drawDigits(2412, sy + 73, { c: BLU });
              s += TX(gx + 16, sy + 73, '← 402×6', { fs: 11, c: BLU });

              // 第二層 402 × 30 = 12060（對齊十位）
              s += drawDigits(1206, sy + 91, { c: AMB, offset: 1 });
              s += TX(gx, sy + 91, '0', { fs: 16, c: '#cbd5e1', anchor: 'middle', fw: 700 });
              s += TX(gx + 16, sy + 91, '← 402×30', { fs: 11, c: AMB });

              s += `<line x1="${wx - 22}" y1="${sy + 97}" x2="${gx + 12}" y2="${sy + 97}" stroke="#334155" stroke-width="1.8"/>`;

              // 總和 14472
              s += drawDigits(14472, sy + 117, { c: '#15803d', fs: 17.5 });

              // 解說框
              s += BOX(25, 184, 390, 54, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 203, '✅ 正確關鍵：十位 0 × 6 ＝ 0，加進位 1 寫 1；4 × 6 ＝ 24。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 222, '第二層 402 × 3 ＝ 1206，個位記得補 0 對齊十位！', { fs: 12, c: '#15803d', fw: 800 });
            } else if (mode === 'mid') {
              s += TX(220, 26, '🔥 乘數中間有 0 省行寫法： 236 × 305 ＝ 71980', { fs: 14, c: '#d97706', anchor: 'middle', fw: 900 });
              // 乘數中間有 0 的省行直式
              s += BOX(sx - 35, sy, 215, 140, { fill: '#fffbeb', stroke: '#d97706', sw: 2, r: 8 });
              s += drawHeaders(sy);

              s += drawDigits(236, sy + 33);
              s += TX(wx - 16, sy + 51, '×', { fs: 16, c: '#d97706', anchor: 'middle', fw: 900 });
              s += drawDigits(305, sy + 51);
              s += `<line x1="${wx - 22}" y1="${sy + 57}" x2="${gx + 12}" y2="${sy + 57}" stroke="#334155" stroke-width="1.8"/>`;

              // 第一層 236 × 5 = 1180
              s += drawDigits(1180, sy + 73, { c: BLU });
              s += TX(gx + 16, sy + 73, '← 236×5', { fs: 11, c: BLU });

              // 第二層 省略 0000，直接跨到百位 236 × 300 = 70800
              s += drawDigits(708, sy + 91, { c: RED, offset: 2 });
              s += TX(tx, sy + 91, '0', { fs: 16, c: '#cbd5e1', anchor: 'middle', fw: 700 });
              s += TX(gx, sy + 91, '0', { fs: 16, c: '#cbd5e1', anchor: 'middle', fw: 700 });
              s += TX(gx + 16, sy + 91, '← 236×300 (對齊百位)', { fs: 10, c: RED, fw: 800 });

              s += `<line x1="${wx - 22}" y1="${sy + 97}" x2="${gx + 12}" y2="${sy + 97}" stroke="#334155" stroke-width="1.8"/>`;

              // 總和 71980
              s += drawDigits(71980, sy + 117, { c: '#b45309', fs: 17.5 });

              // 解說框
              s += BOX(25, 184, 390, 54, { fill: '#fff', stroke: '#fcd34d', r: 8 });
              s += TX(40, 203, '💡 省行密技：乘數十位是 0，不用寫整排 000，直接省略十位！', { fs: 11.5, c: '#b45309', fw: 900 });
              s += TX(40, 222, '百位的 3×236＝708 直接對齊百位寫，簡單又不會漏算！', { fs: 11.5, c: '#b45309', fw: 800 });
            } else {
              s += TX(220, 26, '❌ 學生常見迷思： 402 × 36 漏乘中間 0', { fs: 14, c: RED, anchor: 'middle', fw: 900 });
              // 錯誤直式
              s += BOX(sx - 35, sy, 205, 140, { fill: '#fef2f2', stroke: '#dc2626', sw: 2, r: 8 });
              s += drawHeaders(sy);

              s += drawDigits(402, sy + 33);
              s += TX(wx - 16, sy + 51, '×', { fs: 16, c: RED, anchor: 'middle', fw: 900 });
              s += drawDigits(36, sy + 51);
              s += `<line x1="${wx - 22}" y1="${sy + 57}" x2="${gx + 12}" y2="${sy + 57}" stroke="#334155" stroke-width="1.8"/>`;

              // 錯誤第一層：漏乘 0 寫成 252
              s += drawDigits(252, sy + 73, { c: RED });
              s += TX(gx + 16, sy + 73, '❌ 漏乘 0！', { fs: 11, c: RED, fw: 900 });

              // 錯誤第二層
              s += drawDigits(126, sy + 91, { c: RED, offset: 1 });
              s += TX(gx + 16, sy + 91, '❌ 漏乘 0！', { fs: 11, c: RED, fw: 900 });

              s += `<line x1="${wx - 22}" y1="${sy + 97}" x2="${gx + 12}" y2="${sy + 97}" stroke="#334155" stroke-width="1.8"/>`;
              s += drawDigits(1512, sy + 117, { c: RED, fs: 17.5 });

              // 解說框
              s += BOX(25, 184, 390, 54, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 203, '❌ 常見迷思：學生直接跳過十位的 0，算成 42 × 36 ＝ 1512！', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 222, '警惕：400 × 30 就有一萬二千，1512 差太多了！0 也要乖乖乘！', { fs: 12, c: RED, fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.mode-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.mode-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              showMode(btn.dataset.m);
            };
          });
          showMode('cor');
        },
        caption: '點擊切換查看：被乘數有 0 與乘數中間有 0（省行寫法）的直式技巧。',
        example: {
          q: '飲料批發商進貨 36 箱冬瓜茶，每箱有 402 瓶，一共有多少瓶冬瓜茶？',
          steps: [
            '列出直式乘法：402 × 36。',
            '第一層算個位：402 × 6 ＝ 2412（瓶）。',
            '第二層算十位：402 × 30 ＝ 12060（瓶）。',
            '兩層相加：2412 ＋ 12060 ＝ 14472，答：14472 瓶。'
          ],
          ans: '14472 瓶'
        }
      }

    ]
  });
})();
