/* ============ 第 3 章　角度 ============
   節次：3-1 認識量角器與度數、3-2 量角三步驟與角的分類、3-3 三角板的角與畫角、3-4 鐘面旋轉角、3-5 角的合成與分解
   對應課綱代碼：S-4-1 角度：「度」（°）、量角器操作、旋轉角、直角/銳角/鈍角/平角、角的合成與分解。
   課綱邊界：中年級不涉及對頂角定理、平行線同位角、內錯角及三角函數；不引入超過 360 度的角或負角度。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#059669';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 3,
    title: '角度',
    color: C,
    sections: ['3-1 認識量角器與度數', '3-2 量角三步驟與角的分類', '3-3 三角板的角與畫角', '3-4 鐘面旋轉角', '3-5 角的合成與分解'],
    slides: [

      // 3-1 Slide 1: 認識量角器與度數
      {
        sec: '3-1', secName: '認識量角器與度數',
        title: '半圓平分180格，一小格就是1度',
        points: [
          '角度的單位記作 <span class="k">度（°）</span>。',
          '量角器有<span class="k">中心點</span>與<span class="k">零度線</span>，分內外圈刻度。',
          '每一大格包含 10 小格，代表 <span class="k">10 度（10°）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>旋轉大格數：<span class="ival" id="gridDeg">40° (4 大格)</span></label>
                <input type="range" id="gridRange" min="10" max="180" step="10" value="40">
              </div>
            </div>`;

          const draw = () => {
            const deg = +h.querySelector('#gridRange').value;
            h.querySelector('#gridDeg').textContent = `${deg}° (${deg / 10} 大格)`;

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 30, '量角器刻度構造與度數累積', { fs: 15, c: GRN, anchor: 'middle', fw: 900 });

            // 繪製半圓量角器本體
            const cx = 220, cy = 190, r = 135;
            s += `<path d="M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy} Z" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>`;

            // 中心點與零度線
            s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#047857" stroke-width="2.5"/>`;
            s += `<circle cx="${cx}" cy="${cy}" r="4" fill="${RED}"/>`;
            s += TX(cx, cy + 18, '▲ 中心點', { fs: 11, c: RED, anchor: 'middle', fw: 900 });

            // 刻度線（每 10 度一大格）
            for (let d = 0; d <= 180; d += 10) {
              const rad = d * Math.PI / 180;
              const x1 = cx + r * Math.cos(rad);
              const y1 = cy - r * Math.sin(rad);
              const x2 = cx + (r - (d % 30 === 0 ? 14 : 8)) * Math.cos(rad);
              const y2 = cy - (r - (d % 30 === 0 ? 14 : 8)) * Math.sin(rad);
              s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#10b981" stroke-width="1.2"/>`;
            }

            // 當前選取角度扇形
            const endRad = deg * Math.PI / 180;
            const ex = cx + r * Math.cos(endRad);
            const ey = cy - r * Math.sin(endRad);
            const largeArc = deg > 180 ? 1 : 0;
            s += `<path d="M${cx},${cy} L${cx + r},${cy} A${r},${r} 0 ${largeArc} 0 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(16, 185, 129, 0.28)" stroke="${GRN}" stroke-width="2.5"/>`;

            // 邊射線
            s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="3"/>`;

            // 角度文字提示標籤
            s += BOX(25, 45, 110, 48, { fill: '#fff', stroke: '#a7f3d0', r: 6 });
            s += TX(80, 65, '目前角度：', { fs: 11, c: '#475569', anchor: 'middle' });
            s += TX(80, 85, `${deg}°`, { fs: 18, c: RED, anchor: 'middle', fw: 900 });

            s += BOX(305, 45, 110, 48, { fill: '#fff', stroke: '#a7f3d0', r: 6 });
            s += TX(360, 65, '大格數計算：', { fs: 11, c: '#475569', anchor: 'middle' });
            s += TX(360, 85, `10° × ${deg / 10}`, { fs: 15, c: GRN, anchor: 'middle', fw: 900 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelector('#gridRange').oninput = draw;
          draw();
        },
        caption: '拖動滑桿觀察：半圓量角器平分成 180 格，每一大格是 10°。',
        example: {
          q: '量角器上每大格平分成 10 小格，指針轉動 4 大格是多少度？',
          steps: [
            '每一小格代表 1 度（1°）。',
            '一大格有 10 小格，代表 10 度（10°）。',
            '4 大格：10° × 4 ＝ 40°。',
            '答：40 度（40°）。'
          ],
          ans: '40 度（40°）'
        }
      },

      // 3-2 Slide 2: 量角三步驟與內外圈判讀
      {
        sec: '3-2', secName: '量角三步驟與角的分類',
        title: '頂點對中心，一邊對零線，看準內外圈',
        points: [
          '角的頂點對齊量角器的 <span class="k">中心點</span>。',
          '角的一邊對齊 0° 線，從 <span class="k">0° 那一圈</span>讀起。',
          '若邊不夠長，可用直尺<span class="k">把邊畫長</span>再測量。'
        ],
        visual: (h) => {
          let currentType = 'left_130';
          let extendLine = false;

          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn p-btn" data-type="right_50" style="font-size:11.5px; padding:3px 8px;">👉 開口向右 (內圈 50° 銳角)</button>
                <button class="nav-btn p-btn" data-type="left_50" style="font-size:11.5px; padding:3px 8px;">👈 開口向左 (外圈 50° 銳角)</button>
                <button class="nav-btn p-btn" data-type="left_130" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">👈 開口向左 (外圈 130° 鈍角)</button>
                <button class="nav-btn ext-btn" style="font-size:11.5px; padding:3px 8px; background:#fef3c7; border:1.5px solid #d97706; color:#b45309; font-weight:900;">📐 邊不夠長？虛線延長工具</button>
              </div>
            </div>`;

          const render = () => {
            const type = currentType;
            let s = '';
            s += BOX(15, 8, 410, 240, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 24, '量角核心技能：正確判讀內圈 vs 外圈（直角檢驗防呆）', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });

            const cx = 220, cy = 155, r = 100;
            // 量角器半圓與底線
            s += `<path d="M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy} Z" fill="#f0fdf4" stroke="#059669" stroke-width="2"/>`;
            s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#047857" stroke-width="2"/>`;
            s += `<circle cx="${cx}" cy="${cy}" r="4" fill="${RED}"/>`;
            s += TX(cx, cy + 15, '▲ 中心點', { fs: 10, c: RED, anchor: 'middle', fw: 900 });

            // 關鍵刻度指示（0°, 90°, 180°）
            s += TX(cx + r - 4, cy - 6, '0°', { fs: 9.5, c: '#2563eb', fw: 900 });
            s += TX(cx - r + 4, cy - 6, '0°', { fs: 9.5, c: '#b91c1c', fw: 900 });
            s += TX(cx, cy - r + 13, '90°', { fs: 9.5, c: '#047857', anchor: 'middle', fw: 900 });
            // 90° 垂直參考線
            s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r}" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3,3"/>`;

            const shortR = extendLine ? 68 : r;

            if (type === 'right_50') {
              // 1. 開口向右（內圈 50° 銳角）
              const mathDeg = 50;
              const rad = mathDeg * Math.PI / 180;
              const ex = cx + shortR * Math.cos(rad);
              const ey = cy - shortR * Math.sin(rad);

              s += `<line x1="${cx}" y1="${cy}" x2="${cx + (extendLine ? 68 : r)}" y2="${cy}" stroke="${BLU}" stroke-width="4"/>`;
              s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="4"/>`;
              s += `<path d="M${cx},${cy} L${cx + shortR},${cy} A${shortR},${shortR} 0 0 0 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(37, 99, 235, 0.25)"/>`;

              if (extendLine) {
                const fullEx = cx + (r + 25) * Math.cos(rad);
                const fullEy = cy - (r + 25) * Math.sin(rad);
                s += `<line x1="${cx + 68}" y1="${cy}" x2="${cx + r + 22}" y2="${cy}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += `<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}" x2="${fullEx.toFixed(1)}" y2="${fullEy.toFixed(1)}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += BOX(cx + 35, cy - 75, 140, 18, { fill: '#fef3c7', stroke: '#d97706', r: 4 });
                s += TX(cx + 105, cy - 62, '✨ 虛線延長，角度不變！', { fs: 9.5, c: '#b45309', anchor: 'middle', fw: 900 });
              }

              // 刻度光暈
              s += BOX(cx + 30, cy - 20, 85, 18, { fill: '#dbeafe', stroke: '#3b82f6', sw: 1.5, r: 4 });
              s += TX(cx + 72, cy - 7, '👉 內圈 0° 起點', { fs: 10, c: '#1d4ed8', anchor: 'middle', fw: 900 });

              // 解說卡
              s += BOX(25, 172, 390, 68, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 191, '✅ 正確判讀：角的一邊落在右側 0° 線（內圈）。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 209, '順著內圈數到 50°，角小於直角 90°，所以此角是 50° 銳角！', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 226, '❌ 學生迷思：誤看外圈的 130°！防呆法：未滿直角，絕不可能是 130°！', { fs: 11, c: RED, fw: 800 });

            } else if (type === 'left_50') {
              // 2. 開口向左（外圈 50° 銳角）
              // 底邊向左（180°），順時針轉 50° -> 數學角為 180° - 50° = 130° (向左上)
              const mathDeg = 130;
              const rad = mathDeg * Math.PI / 180;
              const ex = cx + shortR * Math.cos(rad);
              const ey = cy - shortR * Math.sin(rad);

              s += `<line x1="${cx}" y1="${cy}" x2="${cx - (extendLine ? 68 : r)}" y2="${cy}" stroke="${BLU}" stroke-width="4"/>`;
              s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="4"/>`;
              s += `<path d="M${cx},${cy} L${cx - shortR},${cy} A${shortR},${shortR} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(16, 185, 129, 0.25)"/>`;

              if (extendLine) {
                const fullEx = cx + (r + 25) * Math.cos(rad);
                const fullEy = cy - (r + 25) * Math.sin(rad);
                s += `<line x1="${cx - 68}" y1="${cy}" x2="${cx - r - 22}" y2="${cy}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += `<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}" x2="${fullEx.toFixed(1)}" y2="${fullEy.toFixed(1)}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += BOX(cx - 175, cy - 75, 140, 18, { fill: '#fef3c7', stroke: '#d97706', r: 4 });
                s += TX(cx - 105, cy - 62, '✨ 虛線延長，角度不變！', { fs: 9.5, c: '#b45309', anchor: 'middle', fw: 900 });
              }

              // 外圈光暈
              s += BOX(cx - 115, cy - 20, 85, 18, { fill: '#fee2e2', stroke: '#ef4444', sw: 1.5, r: 4 });
              s += TX(cx - 72, cy - 7, '👈 外圈 0° 起點', { fs: 10, c: '#b91c1c', anchor: 'middle', fw: 900 });

              // 解說卡
              s += BOX(25, 172, 390, 68, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 191, '✅ 正確判讀：角的一邊落在左側 0° 線（外圈）。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 209, '順著外圈看另一邊指向 50°，角未超過 90°，是 50° 銳角！', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 226, '❌ 學生迷思：誤看成內圈的 130°！防呆法：開口向左連直角都沒過，是 50°！', { fs: 11, c: RED, fw: 800 });

            } else {
              // 3. 開口向左（外圈 130° 真正的鈍角！）
              // 底邊向左（180°），順時針轉 130° -> 跨過 90° 垂直線，數學角為 180° - 130° = 50° (向右上)
              const mathDeg = 50;
              const rad = mathDeg * Math.PI / 180;
              const ex = cx + shortR * Math.cos(rad);
              const ey = cy - shortR * Math.sin(rad);

              s += `<line x1="${cx}" y1="${cy}" x2="${cx - (extendLine ? 68 : r)}" y2="${cy}" stroke="${BLU}" stroke-width="4"/>`;
              s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="4"/>`;
              // 扇形覆蓋 130 度（大鈍角）
              s += `<path d="M${cx},${cy} L${cx - shortR},${cy} A${shortR},${shortR} 0 0 1 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(225, 29, 72, 0.25)"/>`;

              if (extendLine) {
                const fullEx = cx + (r + 25) * Math.cos(rad);
                const fullEy = cy - (r + 25) * Math.sin(rad);
                s += `<line x1="${cx - 68}" y1="${cy}" x2="${cx - r - 22}" y2="${cy}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += `<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}" x2="${fullEx.toFixed(1)}" y2="${fullEy.toFixed(1)}" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,3"/>`;
                s += BOX(cx + 35, cy - 75, 140, 18, { fill: '#fef3c7', stroke: '#d97706', r: 4 });
                s += TX(cx + 105, cy - 62, '✨ 虛線延長，角度不變！', { fs: 9.5, c: '#b45309', anchor: 'middle', fw: 900 });
              }

              // 外圈光暈與 130° 刻度標籤
              s += BOX(cx - 115, cy - 20, 85, 18, { fill: '#fee2e2', stroke: '#ef4444', sw: 1.5, r: 4 });
              s += TX(cx - 72, cy - 7, '👈 外圈 0° 起點', { fs: 10, c: '#b91c1c', anchor: 'middle', fw: 900 });

              s += BOX(ex - 15, ey - 22, 100, 18, { fill: '#fee2e2', stroke: '#ef4444', r: 4 });
              s += TX(ex + 35, ey - 9, '外圈 130° (內圈 50°)', { fs: 9, c: RED, anchor: 'middle', fw: 900 });

              // 解說卡
              s += BOX(25, 172, 390, 68, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 191, '✅ 正確判讀：角的一邊落在左側 0° 線（外圈）。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 209, '順著外圈數，張開明顯跨過垂直 90°，指向 130°，是 130° 鈍角！', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 226, '❌ 學生迷思：誤看內圈 50°！直角檢驗：張開比直角大，絕不是 50°！', { fs: 11, c: '#475569', fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.p-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.p-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              currentType = btn.dataset.type;
              render();
            };
          });
          h.querySelector('.ext-btn').onclick = () => {
            extendLine = !extendLine;
            h.querySelector('.ext-btn').textContent = extendLine ? '✅ 關閉延長線' : '📐 邊不夠長？虛線延長工具';
            render();
          };
          render();
        },
        caption: '點擊切換觀察：一邊對齊哪邊的 0° 線，就從那一圈刻度開始報讀。',
        example: {
          q: '角的一邊對齊右側 0° 線（內圈），另一邊指著刻度 50 與 130，這個角是幾度？',
          steps: [
            '檢查頂點是否對準量角器中心點。',
            '底邊對齊右側 0° 線，這是內圈刻度的起點。',
            '順著內圈刻度往上看，另一邊指著 50。',
            '答：50 度（50°）。'
          ],
          ans: '50 度（50°）'
        }
      },

      // 3-3 Slide 3: 角的分類：銳角、直角、鈍角、平角
      {
        sec: '3-2', secName: '量角三步驟與角的分類',
        title: '小於直角是銳角，平平直線叫平角',
        points: [
          '<span class="k">直角＝90°</span>，小於 90° 的角叫 <span class="k">銳角</span>。',
          '大於 90° 且小於 180° 的角叫 <span class="k">鈍角</span>。',
          '兩邊成一直線的角叫 <span class="k">平角＝180°</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>角度張開：<span class="ival" id="kindDeg">90°</span></label>
                <input type="range" id="kindRange" min="15" max="180" step="5" value="90">
              </div>
            </div>`;

          const draw = () => {
            const deg = +h.querySelector('#kindRange').value;
            h.querySelector('#kindDeg').textContent = `${deg}°`;

            let kindName = '', kindColor = '', note = '';
            if (deg < 90) {
              kindName = '尖尖的【 銳 角 】';
              kindColor = BLU;
              note = '小於 90° 的角叫作銳角。';
            } else if (deg === 90) {
              kindName = '🎉 剛好是【 直 角 】';
              kindColor = RED;
              note = '剛好等於 90° 的角，可用直角符號 ∟ 標記！';
            } else if (deg < 180) {
              kindName = '寬寬的【 鈍 角 】';
              kindColor = AMB;
              note = '大於 90° 且小於 180° 的角叫作鈍角。';
            } else {
              kindName = '🎉 一直線的【 平 角 】';
              kindColor = GRN;
              note = '剛好等於 180°，兩邊成一直線，等於 2 個直角！';
            }

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });

            // 狀態徽章
            s += BOX(110, 25, 220, 36, { fill: kindColor, stroke: '#fff', r: 18 });
            s += TX(220, 48, `${kindName} (${deg}°)`, { fs: 14, c: '#fff', anchor: 'middle', fw: 900 });

            // 繪製角
            const cx = 220, cy = 165, len = 120;
            // 固定邊（水平向右）
            s += `<line x1="${cx}" y1="${cy}" x2="${cx + len}" y2="${cy}" stroke="#334155" stroke-width="4" stroke-linecap="round"/>`;

            // 動態邊
            const rad = deg * Math.PI / 180;
            const ex = cx + len * Math.cos(rad);
            const ey = cy - len * Math.sin(rad);
            s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${kindColor}" stroke-width="4" stroke-linecap="round"/>`;

            // 角弧或直角記號
            if (deg === 90) {
              s += `<rect x="${cx}" y="${cy - 20}" width="20" height="20" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
            } else {
              const arcR = 38;
              const ax = cx + arcR * Math.cos(rad);
              const ay = cy - arcR * Math.sin(rad);
              const large = deg > 180 ? 1 : 0;
              s += `<path d="M${cx + arcR},${cy} A${arcR},${arcR} 0 ${large} 0 ${ax.toFixed(1)},${ay.toFixed(1)}" fill="none" stroke="${kindColor}" stroke-width="2.5"/>`;
            }
            s += `<circle cx="${cx}" cy="${cy}" r="5" fill="#0f172a"/>`;

            // 解說文字框
            s += BOX(30, 185, 380, 50, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
            s += TX(220, 208, note, { fs: 13, c: kindColor, anchor: 'middle', fw: 900 });
            s += TX(220, 226, '比較基準：直角是 90°，平角是 180°（2 個直角）', { fs: 11, c: '#64748b', anchor: 'middle' });

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelector('#kindRange').oninput = draw;
          draw();
        },
        caption: '拖動滑桿觀察：角度由小變大，體驗銳角 ➔ 直角(90°) ➔ 鈍角 ➔ 平角(180°) 的變化。',
        example: {
          q: '鐘面上 2 點整、3 點整、5 點整，兩針夾角分別是什麼角？',
          steps: [
            '3 點整：兩針夾角是 90°，稱為「直角」。',
            '2 點整：兩針夾角是 60°，小於 90°，稱為「銳角」。',
            '5 點整：兩針夾角是 150°，大於 90°，稱為「鈍角」。',
            '答：分別是銳角、直角、鈍角。'
          ],
          ans: '銳角、直角、鈍角'
        }
      },

      // 3-4 Slide 4: 三角板的角與量角器畫角
      {
        sec: '3-3', secName: '三角板的角與畫角',
        title: '三角板有兩套：45-45-90 與 30-60-90',
        points: [
          '等腰直角三角板：三個角是 <span class="k">45°、45°、90°</span>。',
          '細長直角三角板：三個角是 <span class="k">30°、60°、90°</span>。',
          '畫角四步驟：<span class="k">畫邊 ➔ 對零 ➔ 點點 ➔ 連線</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:6px; flex-wrap:wrap;">
                <button class="nav-btn d-btn" data-t="board" style="font-size:12px; padding:4px 8px;">📐 認識兩套三角板角度</button>
                <button class="nav-btn d-btn" data-t="step1" style="font-size:12px; padding:4px 8px;">Step 1: 畫射線</button>
                <button class="nav-btn d-btn" data-t="step2" style="font-size:12px; padding:4px 8px;">Step 2: 對齊中心</button>
                <button class="nav-btn d-btn" data-t="step3" style="font-size:12px; padding:4px 8px;">Step 3: 點記號</button>
                <button class="nav-btn d-btn" data-t="step4" style="font-size:12px; padding:4px 8px;">Step 4: 連線標角 🎉</button>
              </div>
            </div>`;

          const render = (view) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (view === 'board') {
              s += TX(220, 28, '課堂必備！兩套標準三角板角度規格', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });

              // 三角板 1: 等腰直角 (45-45-90)
              s += `<polygon points="40,165 150,165 40,55" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>`;
              s += `<rect x="40" y="147" width="18" height="18" fill="none" stroke="#2563eb" stroke-width="2"/>`;
              s += TX(95, 125, '等腰三角板', { fs: 12, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(130, 160, '45°', { fs: 12, c: RED, fw: 900 });
              s += TX(45, 75, '45°', { fs: 12, c: RED, fw: 900 });
              s += TX(65, 158, '90°', { fs: 12, c: BLU, fw: 900 });

              // 三角板 2: 30-60-90
              s += `<polygon points="230,165 390,165 230,75" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>`;
              s += `<rect x="230" y="147" width="18" height="18" fill="none" stroke="#d97706" stroke-width="2"/>`;
              s += TX(310, 130, '細長三角板', { fs: 12, c: AMB, anchor: 'middle', fw: 900 });
              s += TX(360, 160, '30°', { fs: 12, c: RED, fw: 900 });
              s += TX(235, 95, '60°', { fs: 12, c: RED, fw: 900 });
              s += TX(255, 158, '90°', { fs: 12, c: AMB, fw: 900 });

              // 下方說明
              s += BOX(25, 185, 390, 50, { fill: '#fff', stroke: '#86efac', r: 6 });
              s += TX(40, 207, '必背常識：等腰三角板是 45°、45°、90°。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 225, '細長三角板是 30°、60°、90°；兩個三角板最大的角都是直角 90°！', { fs: 12, c: '#15803d' });
            } else {
              s += TX(220, 28, '畫出 65° 角的標準四步驟演示', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });
              const cx = 130, cy = 135;

              // 步驟展示
              s += `<line x1="${cx}" y1="${cy}" x2="${cx + 140}" y2="${cy}" stroke="#1e293b" stroke-width="3"/>`;
              s += `<circle cx="${cx}" cy="${cy}" r="4" fill="${RED}"/>`;

              if (view === 'step1') {
                s += TX(cx, cy + 18, '頂點', { fs: 11, c: RED, anchor: 'middle', fw: 800 });
                s += BOX(25, 175, 390, 55, { fill: '#fff', stroke: '#93c5fd', r: 8 });
                s += TX(40, 198, 'Step 1: 先畫出一條平直的射線，並標出端點（角的頂點）。', { fs: 13, c: BLU, fw: 900 });
              } else if (view === 'step2') {
                // 半透明量角器
                s += `<path d="M${cx - 90},${cy} A90,90 0 0 1 ${cx + 90},${cy} Z" fill="rgba(16, 185, 129, 0.18)" stroke="#059669" stroke-width="1.5"/>`;
                s += BOX(25, 175, 390, 55, { fill: '#fff', stroke: '#93c5fd', r: 8 });
                s += TX(40, 198, 'Step 2: 量角器中心點對齊頂點，0° 線緊貼射線。', { fs: 13, c: BLU, fw: 900 });
              } else if (view === 'step3') {
                s += `<path d="M${cx - 90},${cy} A90,90 0 0 1 ${cx + 90},${cy} Z" fill="rgba(16, 185, 129, 0.18)" stroke="#059669" stroke-width="1.5"/>`;
                // 65 度位置
                const rad = 65 * Math.PI / 180;
                const px = cx + 90 * Math.cos(rad);
                const py = cy - 90 * Math.sin(rad);
                s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="${RED}"/>`;
                s += TX(px + 20, py - 5, '點記號 (65°)', { fs: 12, c: RED, fw: 900 });
                s += BOX(25, 175, 390, 55, { fill: '#fff', stroke: '#93c5fd', r: 8 });
                s += TX(40, 198, 'Step 3: 從內圈 0° 數到 65° 的刻度位置，點一個記號點。', { fs: 13, c: RED, fw: 900 });
              } else {
                const rad = 65 * Math.PI / 180;
                const px = cx + 130 * Math.cos(rad);
                const py = cy - 130 * Math.sin(rad);
                s += `<line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${RED}" stroke-width="3"/>`;
                s += `<path d="M${cx + 30},${cy} A30,30 0 0 0 ${(cx + 30 * Math.cos(rad)).toFixed(1)},${(cy - 30 * Math.sin(rad)).toFixed(1)}" fill="none" stroke="${RED}" stroke-width="2"/>`;
                s += TX(cx + 45, cy - 15, '65°', { fs: 14, c: RED, fw: 900 });
                s += BOX(25, 175, 390, 55, { fill: '#fff', stroke: '#86efac', r: 8 });
                s += TX(40, 198, 'Step 4: 拿開量角器，用直尺將頂點與記號點連線，標上 65° 🎉', { fs: 13, c: '#15803d', fw: 900 });
              }
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 250', s);
          };

          h.querySelectorAll('.d-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.t);
          });
          render('board');
        },
        caption: '點擊按鈕切換：查看三角板角度常識，或依序學習使用量角器畫角的 4 步驟。',
        example: {
          q: '拿出一副三角板，其中直角都是 90°，另外四個角各是多少度？',
          steps: [
            '等腰直角三角板的另外兩個角一樣大，都是 45°。',
            '細長直角三角板的另外兩個角分別是 30° 和 60°。',
            '兩塊三角板的四個銳角分別是 45°、45°、30°、60°。',
            '答：45°、45°、30°、60°。'
          ],
          ans: '45°、45°、30°、60°'
        }
      },

      // 3-5 Slide 5: 鐘面旋轉角
      {
        sec: '3-4', secName: '鐘面旋轉角',
        title: '鐘面一大格30度，順著指針轉是順時針',
        points: [
          '鐘面一圈 360° 平分成 12 大格，一大格是 <span class="k">30°</span>。',
          '與時針同方向轉動叫 <span class="k">順時針</span>，反方向叫 <span class="k">逆時針</span>。',
          '轉動總度數 ＝ <span class="k">大格數 × 30°</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>順時針轉動：<span class="ival" id="clkDeg">5 大格 ＝ 150°</span></label>
                <input type="range" id="clkRange" min="1" max="11" step="1" value="5">
              </div>
            </div>`;

          const draw = () => {
            const step = +h.querySelector('#clkRange').value;
            const deg = step * 30;
            h.querySelector('#clkDeg').textContent = `${step} 大格 ＝ ${deg}°`;

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '鐘面旋轉角：順時針轉動計算', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });

            // 鐘面外框
            const cx = 135, cy = 125, r = 75;
            s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#334155" stroke-width="2.5"/>`;

            // 12 個數字
            for (let i = 1; i <= 12; i++) {
              const ang = (i * 30 - 90) * Math.PI / 180;
              const tx = cx + (r - 15) * Math.cos(ang);
              const ty = cy + (r - 15) * Math.sin(ang) + 4;
              s += TX(tx.toFixed(1), ty.toFixed(1), `${i}`, { fs: 11, c: '#475569', anchor: 'middle', fw: 700 });
            }

            // 起點指針（指向 12）
            s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r + 18}" stroke="#64748b" stroke-width="3" stroke-dasharray="3,3"/>`;

            // 旋轉軌跡扇形
            const endAng = (step * 30 - 90) * Math.PI / 180;
            const ex = cx + (r - 18) * Math.cos(endAng);
            const ey = cy + (r - 18) * Math.sin(endAng);
            const large = step > 6 ? 1 : 0;
            s += `<path d="M${cx},${cy} L${cx},${cy - r + 18} A${r - 18},${r - 18} 0 ${large} 1 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(16, 185, 129, 0.25)"/>`;

            // 目前指針
            s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>`;
            s += `<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>`;

            // 右側計算說明卡
            s += BOX(240, 48, 175, 115, { fill: '#fff', stroke: '#86efac', r: 8 });
            s += TX(327, 72, '🕒 角度計算公式', { fs: 13, c: GRN, anchor: 'middle', fw: 900 });
            s += TX(255, 96, '• 一大格 ＝ 30°', { fs: 12, c: '#334155' });
            s += TX(255, 118, `• 走了 ${step} 個大格`, { fs: 12, c: BLU, fw: 800 });
            s += TX(255, 142, `30° × ${step} ＝ ${deg}°`, { fs: 15, c: RED, fw: 900 });

            // 下方解說
            s += BOX(25, 180, 390, 52, { fill: '#fff', stroke: '#93c5fd', r: 8 });
            s += TX(40, 202, `指針從 12 順時針轉到 ${step}，共走了 ${step} 大格。`, { fs: 13, c: '#1e293b', fw: 900 });
            s += TX(40, 222, `計算：30° × ${step} ＝ ${deg}°（旋轉了 ${deg} 度）。`, { fs: 13, c: RED, fw: 800 });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#clkRange').oninput = draw;
          draw();
        },
        caption: '拖動滑桿旋轉指針：鐘面一大格是 30°，走幾大格就乘上 30°。',
        example: {
          q: '鐘面上的分針從數字 12 順時針轉到數字 5，一共轉了幾度？',
          steps: [
            '從數字 12 轉到數字 5，總共經過 5 個大格。',
            '鐘面每一大格的角度是 30 度（30°）。',
            '計算算式：30° × 5 ＝ 150°。',
            '答：轉了 150 度（150°）。'
          ],
          ans: '150 度（150°）'
        }
      },

      // 3-6 Slide 6: 角的合成與分解
      {
        sec: '3-5', secName: '角的合成與分解',
        title: '合起來用加法，平角互補用180度減',
        points: [
          '兩個角拼在一起：度數直接 <span class="k">相加</span>。',
          '直線上的兩個角（平角）：<span class="k">180° 減已知角 ＝ 另一個角</span>。',
          '三角板拼角：\\(45^\\circ + 60^\\circ = 105^\\circ\\)。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn c-btn" data-m="add" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">➕ 角的合成（45°＋60°）</button>
                <button class="nav-btn c-btn" data-m="sub" style="font-size:11.5px; padding:3px 8px;">➖ 平角互補（180°－120°）</button>
                <button class="nav-btn c-btn" data-m="round" style="font-size:11.5px; padding:3px 8px;">🔄 周角一圈合成（360°）</button>
              </div>
            </div>`;

          const renderMode = (m) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });

            if (m === 'add') {
              s += TX(220, 26, '三角板拼角合成：45° ＋ 60° ＝ 105°', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });
              const cx = 200, cy = 140, r = 90;

              // 邊 1（水平 0°）
              s += `<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#334155" stroke-width="3"/>`;

              // 角 1 (45 度) 藍色
              const r1 = 45 * Math.PI / 180;
              const x1 = cx + r * Math.cos(r1);
              const y1 = cy - r * Math.sin(r1);
              s += `<line x1="${cx}" y1="${cy}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${BLU}" stroke-width="3"/>`;
              s += `<path d="M${cx},${cy} L${cx + r},${cy} A${r},${r} 0 0 0 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="rgba(37, 99, 235, 0.2)"/>`;
              s += TX(cx + 45, cy - 15, '45°', { fs: 12, c: BLU, fw: 900 });

              // 角 2 (再加 60 度到 105 度) 琥珀色
              const r2 = 105 * Math.PI / 180;
              const x2 = cx + r * Math.cos(r2);
              const y2 = cy - r * Math.sin(r2);
              s += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${AMB}" stroke-width="3"/>`;
              s += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="rgba(217, 119, 6, 0.2)"/>`;
              s += TX(cx + 10, cy - 50, '60°', { fs: 12, c: AMB, fw: 900 });

              // 總和弧線
              s += `<path d="M${cx + 60},${cy} A60,60 0 0 0 ${(cx + 60 * Math.cos(r2)).toFixed(1)},${(cy - 60 * Math.sin(r2)).toFixed(1)}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-dasharray="4,2"/>`;
              s += TX(cx + 75, cy - 75, '合起來 105°', { fs: 13, c: RED, fw: 900 });

              // 解說框
              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 198, '算式：45° ＋ 60° ＝ 105°（拼成一個鈍角）', { fs: 13.5, c: RED, fw: 900 });
              s += TX(40, 220, '說明：兩個角頂點與一邊疊合，度數相加即可得到總夾角。', { fs: 12, c: '#475569' });
            } else if (m === 'sub') {
              s += TX(220, 26, '平角互補分解：180° － 120° ＝ 60°', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });
              const cx = 220, cy = 140, r = 95;

              // 一直線（平角 180 度）
              s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#334155" stroke-width="3"/>`;

              // 分割射線（120 度）
              const rad = 120 * Math.PI / 180;
              const ex = cx + r * Math.cos(rad);
              const ey = cy - r * Math.sin(rad);
              s += `<line x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${RED}" stroke-width="3"/>`;

              // 左邊 120 度扇形
              s += `<path d="M${cx},${cy} L${cx + r},${cy} A${r},${r} 0 0 0 ${ex.toFixed(1)},${ey.toFixed(1)} Z" fill="rgba(37, 99, 235, 0.2)"/>`;
              s += TX(cx + 40, cy - 30, '∠A ＝ 120°', { fs: 12, c: BLU, fw: 900 });

              // 右邊未知角 ∠B (60 度)
              s += `<path d="M${cx},${cy} L${ex.toFixed(1)},${ey.toFixed(1)} A${r},${r} 0 0 0 ${cx - r},${cy} Z" fill="rgba(16, 185, 129, 0.25)"/>`;
              s += TX(cx - 55, cy - 30, '∠B ＝ ？', { fs: 13, c: GRN, fw: 900 });

              // 解說框
              s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 198, '算式：180° － 120° ＝ 60°（∠B ＝ 60°）', { fs: 13.5, c: RED, fw: 900 });
              s += TX(40, 220, '說明：直線上的角是平角（180°），用 180° 扣掉已知角就是答案！', { fs: 12, c: '#475569' });
            } else {
              // 周角一圈合成
              s += TX(220, 26, '🔄 旋轉一整圈：周角 360° ＝ 2 個平角 ＝ 4 個直角', { fs: 13.5, c: '#7c3aed', anchor: 'middle', fw: 900 });
              const cx = 220, cy = 102, r = 64;

              // 圓形周角雙色拼接（上半平角 180°，下半平角 180°）
              s += `<path d="M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy} Z" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" stroke-width="2"/>`;
              s += TX(cx, cy - 22, '上半圈平角 180°', { fs: 12, c: BLU, anchor: 'middle', fw: 900 });

              s += `<path d="M${cx - r},${cy} A${r},${r} 0 0 0 ${cx + r},${cy} Z" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" stroke-width="2"/>`;
              s += TX(cx, cy + 28, '下半圈平角 180°', { fs: 12, c: AMB, anchor: 'middle', fw: 900 });

              s += `<line x1="${cx - r - 10}" y1="${cy}" x2="${cx + r + 10}" y2="${cy}" stroke="#334155" stroke-width="2.5" stroke-dasharray="3,2"/>`;
              s += `<circle cx="${cx}" cy="${cy}" r="4" fill="${RED}"/>`;

              // 解說框
              s += BOX(25, 175, 390, 60, { fill: '#fff', stroke: '#c084fc', r: 8 });
              s += TX(40, 196, '💎 輔導員總結幾何關係：', { fs: 12, c: '#6b21a8', fw: 900 });
              s += TX(40, 214, '1 個周角 ＝ 360° ＝ 2 個平角（180°×2）＝ 4 個直角（90°×4）', { fs: 12.5, c: RED, fw: 900 });
              s += TX(40, 229, '指針繞一整圈又回到起點，轉動角度恰好是 360 度。', { fs: 11, c: '#475569' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.c-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.c-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              renderMode(btn.dataset.m);
            };
          });
          renderMode('add');
        },
        caption: '點擊切換觀察：角的合成、平角互補，以及旋轉一圈的周角（360°）關係。',
        example: {
          q: '一直線上有兩個相鄰角 ∠A 和 ∠B，已知 ∠A 是 120°，∠B 是幾度？',
          steps: [
            '一直線形成的是平角，度數是 180°。',
            '∠A ＋ ∠B ＝ 180°。',
            '算式：180° － 120° ＝ 60°。',
            '答：∠B 是 60 度（60°）。'
          ],
          ans: '60 度（60°）'
        }
      }

    ]
  });
})();
