/* ============ 第 5 章　公里 ============
   節次：5-1 認識長度單位「公里」、5-2 公里與公尺的位值換算、5-3 公里和公尺的複名數加減法
   對應課綱代碼：N-4-9 長度：「公里」（km）。1公里＝1000公尺。公里與公尺換算與計算。
   課綱邊界：中年級不涉及小數點表示的公里（如 1.5 公里留在後續單元處理）；不引入英里等非公制單位。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#e11d48';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 5,
    title: '公里',
    color: C,
    sections: ['5-1 認識長度單位「公里」', '5-2 公里與公尺的位值換算', '5-3 公里和公尺的複名數加減法'],
    slides: [

      // 5-1 Slide 1: 認識長度單位「公里」
      {
        sec: '5-1', secName: '認識長度單位「公里」',
        title: '操場跑五圈是一公里，一公里等於一千公尺',
        points: [
          '測量遠距離時使用長度單位 <span class="k">公里（km）</span>。',
          '<span class="k">1 公里 ＝ 1000 公尺</span>（1 km ＝ 1000 m）。',
          '學校 200 公尺操場跑 5 圈剛好是 1 公里。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>在操場跑了：<span class="ival" id="lapVal">5</span> 圈</label>
                <input type="range" id="lapRange" min="1" max="10" step="1" value="5">
              </div>
            </div>`;

          const draw = () => {
            const laps = +h.querySelector('#lapRange').value;
            const m = laps * 200;
            const km = Math.floor(m / 1000);
            const remM = m % 1000;
            h.querySelector('#lapVal').textContent = `${laps} 圈 （共 ${m} 公尺）`;

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, '生活長度量感：學校 200m 操場跑道', { fs: 15, c: RED, anchor: 'middle', fw: 900 });

            // 操場跑道跑圈示意圖
            const cx = 135, cy = 115, rx = 90, ry = 50;
            s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fef2f2" stroke="#e11d48" stroke-width="4"/>`;
            s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 25}" ry="${ry - 20}" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>`;
            s += TX(cx, cy + 4, '草地操場', { fs: 11, c: '#15803d', anchor: 'middle', fw: 800 });
            s += TX(cx, cy - ry + 12, '1 圈 ＝ 200 m', { fs: 11, c: RED, anchor: 'middle', fw: 900 });

            // 跑者目前位置點
            s += `<circle cx="${cx}" cy="${cy - ry}" r="6" fill="${RED}"/>`;

            // 右側計算卡
            s += BOX(245, 45, 170, 120, { fill: '#fff', stroke: '#fca5a5', r: 8 });
            s += TX(330, 68, '🏃 跑動距離換算', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
            s += TX(260, 92, `• 跑了 ${laps} 圈`, { fs: 12, c: '#334155' });
            s += TX(260, 114, `200m × ${laps} ＝ ${m} m`, { fs: 13, c: BLU, fw: 800 });

            if (m >= 1000) {
              s += TX(260, 142, `＝ ${km} km ${remM > 0 ? `${remM}m` : ''} 🎉`, { fs: 14, c: GRN, fw: 900 });
            } else {
              s += TX(260, 142, `還差 ${1000 - m} m 滿 1 km`, { fs: 11, c: AMB, fw: 800 });
            }

            // 下方解說卡
            s += BOX(25, 175, 390, 58, { fill: '#fff', stroke: '#86efac', r: 8 });
            if (laps === 5) {
              s += TX(40, 198, '🎉 剛好跑了 5 圈：200 × 5 ＝ 1000 公尺 ＝ 1 公里（1 km）！', { fs: 12, c: '#15803d', fw: 900 });
            } else {
              s += TX(40, 198, `目前跑了 ${laps} 圈，合計 ${m} 公尺（${km > 0 ? `${km} 公里 ${remM} 公尺` : '不到 1 公里'}）。`, { fs: 12, c: '#1e293b', fw: 900 });
            }
            s += TX(40, 218, '重要關係：1 公里 ＝ 1000 公尺；英文單位記作 km（公尺記作 m）。', { fs: 11, c: '#475569' });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#lapRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿觀察：操場跑 5 圈滿 1000 公尺，剛好等於 1 公里（1 km）。',
        example: {
          q: '小明在學校 200 公尺操場上練跑，跑了 5 圈，一共跑了幾公里？',
          steps: [
            '先算總公尺數：200 × 5 ＝ 1000（公尺）。',
            '因為 1000 公尺 ＝ 1 公里。',
            '1000 公尺剛好就是 1 公里。',
            '答：一共跑了 1 公里（1 km）。'
          ],
          ans: '1 公里（1 km）'
        }
      },

      // 5-2 Slide 2: 公里與公尺的位值換算
      {
        sec: '5-2', secName: '公里與公尺的位值換算',
        title: '公里化公尺加三零，公尺化公里退三位',
        points: [
          '公里換公尺：直接 <span class="k">乘 1000</span>。',
          '公尺換公里：由個位往左數 <span class="k">3 位進公里</span>。',
          '注意補 0 迷思：25 公尺換成公尺是 <span class="k">025</span>，不是 250。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn km-btn" data-ex="1" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">範例 1: 3 km 25 m</button>
                <button class="nav-btn km-btn" data-ex="2" style="font-size:11.5px; padding:3px 8px;">範例 2: 4008 m ＝ 4 km 8 m</button>
                <button class="nav-btn km-btn" data-ex="3" style="font-size:11.5px; padding:3px 8px;">⚠️ 陷阱對照: 5008 m 迷思</button>
              </div>
            </div>`;

          const render = (ex) => {
            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '公里與公尺換算：千位滿千防呆定位板', { fs: 14.5, c: RED, anchor: 'middle', fw: 900 });

            if (ex === '1') {
              // 3 km 25 m
              s += BOX(30, 40, 380, 48, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(50, 68, '複名數： 3 公里 25 公尺  ➔  換成幾公尺？', { fs: 13.5, c: RED, fw: 900 });

              // 4 格定位板 (千/百/十/個)
              const cols = ['千位 (km)', '百位', '十位', '個位'];
              const vals = ['3', '0', '2', '5'];
              const sx = 90, sy = 98, colW = 65;

              cols.forEach((c, i) => {
                const isKm = (i === 0);
                const isZero = (i === 1);
                s += BOX(sx + i * colW, sy, colW, 26, { fill: isKm ? RED : '#64748b', stroke: '#fff', r: 4 });
                s += TX(sx + i * colW + colW / 2, sy + 18, c, { fs: 11, c: '#fff', anchor: 'middle', fw: 800 });

                s += BOX(sx + i * colW, sy + 26, colW, 36, { fill: isZero ? '#fef2f2' : '#fff', stroke: '#cbd5e1', r: 0 });
                s += TX(sx + i * colW + colW / 2, sy + 51, vals[i], { fs: 18, c: isZero ? RED : '#0f172a', anchor: 'middle', fw: 900 });
              });

              // 解說卡
              s += BOX(25, 170, 390, 64, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 192, '✅ 正確答案：3025 公尺（百位沒有公尺要補 0！）。', { fs: 12.5, c: '#15803d', fw: 900 });
              s += TX(40, 212, '❌ 學生常見錯誤：寫成 3250 公尺（誤把 25 公尺當成 250 公尺）！', { fs: 11, c: RED, fw: 800 });
              s += TX(40, 226, '口訣：公尺滿三位，不足前面補 0。', { fs: 11, c: '#475569' });
            } else if (ex === '2') {
              // 4008 m
              s += BOX(30, 40, 380, 48, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
              s += TX(50, 68, '單名數： 4008 公尺  ➔  換成幾公里幾公尺？', { fs: 13.5, c: RED, fw: 900 });

              const cols = ['千位 (km)', '百位', '十位', '個位'];
              const vals = ['4', '0', '0', '8'];
              const sx = 90, sy = 98, colW = 65;

              cols.forEach((c, i) => {
                const isKm = (i === 0);
                s += BOX(sx + i * colW, sy, colW, 26, { fill: isKm ? RED : '#64748b', stroke: '#fff', r: 4 });
                s += TX(sx + i * colW + colW / 2, sy + 18, c, { fs: 11, c: '#fff', anchor: 'middle', fw: 800 });

                s += BOX(sx + i * colW, sy + 26, colW, 36, { fill: '#fff', stroke: '#cbd5e1', r: 0 });
                s += TX(sx + i * colW + colW / 2, sy + 51, vals[i], { fs: 18, c: isKm ? RED : '#0f172a', anchor: 'middle', fw: 900 });
              });

              s += BOX(25, 170, 390, 64, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 192, '✅ 正確答案：4 公里 8 公尺（千位 4 是 4 km，個位 8 是 8 m）。', { fs: 12.5, c: '#15803d', fw: 900 });
              s += TX(40, 212, '4008 m ＝ 4000 m ＋ 8 m ＝ 4 km 8 m。', { fs: 12, c: '#475569' });
              s += TX(40, 226, '注意百位和十位的 0 不讀，但代表沒有百公尺和十公尺。', { fs: 11, c: '#15803d' });
            } else {
              // 陷阱對照 5008 m
              s += BOX(30, 40, 380, 48, { fill: '#fffbeb', stroke: '#f59e0b', r: 8 });
              s += TX(50, 68, '⚠️ 陷阱大考驗： 5008 公尺 是 5km 幾 m？', { fs: 13.5, c: '#b45309', fw: 900 });

              // 兩個對比方塊
              s += BOX(35, 96, 175, 66, { fill: '#fef2f2', stroke: RED, r: 8 });
              s += TX(122, 116, '❌ 學生直覺誤寫：', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              s += TX(122, 137, '5 公里 800 公尺', { fs: 13, c: RED, anchor: 'middle', fw: 800 });
              s += TX(122, 153, '（或誤寫為 5 km 80 m）', { fs: 10, c: '#991b1b', anchor: 'middle' });

              s += BOX(230, 96, 175, 66, { fill: '#f0fdf4', stroke: GRN, r: 8 });
              s += TX(317, 116, '✅ 輔導員定位法：', { fs: 12, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(317, 137, '5 公里 8 公尺', { fs: 14, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(317, 153, '（8在個位，百位十位是0）', { fs: 10, c: '#166534', anchor: 'middle' });

              s += BOX(25, 170, 390, 64, { fill: '#fff', stroke: '#f59e0b', r: 8 });
              s += TX(40, 192, '💡 輔導員解析：千位切開 5008 ➔ 【5】公里 與 【008】公尺！', { fs: 12, c: '#b45309', fw: 900 });
              s += TX(40, 212, '• 008 公尺就是只有 8 公尺！若寫成 800 公尺就暴增 100 倍！', { fs: 11.5, c: RED, fw: 800 });
              s += TX(40, 226, '• 切出後三位，直接讀數字，前面 0 丟掉即得 8 公尺！', { fs: 11, c: '#15803d', fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.km-btn').forEach(btn => {
            btn.onclick = () => {
              h.querySelectorAll('.km-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render(btn.dataset.ex);
            };
          });
          render('1');
        },
        caption: '點擊切換查看：公里與公尺換算是「滿千進一」，百位沒有數字一定要補 0。',
        example: {
          q: '森林登山步道長 3 公里 25 公尺，換算成公尺是多少公尺？',
          steps: [
            '1 公里 ＝ 1000 公尺，所以 3 公里 ＝ 3000 公尺。',
            '3000 公尺 ＋ 25 公尺 ＝ 3025 公尺。',
            '特別注意：百位沒有數字要補 0，不是 3250 公尺！',
            '答：3025 公尺。'
          ],
          ans: '3025 公尺'
        }
      },

      // 5-3 Slide 3: 公里和公尺的複名數加減法
      {
        sec: '5-3', secName: '公里和公尺的複名數加減法',
        title: '公里公尺分開算，滿千進一，不夠借一千',
        points: [
          '直式分兩欄：<span class="k">左邊公里、右邊公尺</span>。',
          '加法：公尺滿 1000 <span class="k">向左進 1 公里</span>。',
          '減法：公尺不夠減，向公里借 1 當 <span class="k">1000 公尺</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn cal-btn" data-op="sub" style="font-size:12px; padding:4px 10px;">➖ 減法借位：42km 195m － 28km 500m</button>
                <button class="nav-btn cal-btn" data-op="add" style="font-size:12px; padding:4px 10px;">➕ 加法進位：3km 850m ＋ 2km 400m</button>
              </div>
            </div>`;

          const render = (op) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 28, `複名數直式：${op === 'sub' ? '減法借一當千' : '加法滿千進一'}`, { fs: 15, c: RED, anchor: 'middle', fw: 900 });

            const sx = 140, sy = 40;
            s += BOX(sx - 35, sy, 210, 135, { fill: '#fff', stroke: '#cbd5e1', r: 8 });

            // 欄位標題
            s += TX(sx + 20, sy + 22, '公里 (km)', { fs: 12, c: RED, anchor: 'middle', fw: 900 });
            s += TX(sx + 105, sy + 22, '公尺 (m)', { fs: 12, c: BLU, anchor: 'middle', fw: 900 });
            s += `<line x1="${sx + 60}" y1="${sy + 10}" x2="${sx + 60}" y2="${sy + 125}" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3,3"/>`;

            if (op === 'sub') {
              // 輔導專家優化：借位劃線與「借 1 換 1000m」標記
              // 劃掉 42
              s += `<line x1="${sx + 10}" y1="${sy + 64}" x2="${sx + 30}" y2="${sy + 48}" stroke="${RED}" stroke-width="2"/>`;
              s += TX(sx + 20, sy + 38, '41', { fs: 13, c: RED, anchor: 'middle', fw: 900 });
              
              // 借 1 換 1000 標籤
              s += BOX(sx + 65, sy + 25, 105, 19, { fill: '#fee2e2', stroke: '#ef4444', sw: 1.5, r: 4 });
              s += TX(sx + 117, sy + 39, '借 1km 換 +1000m', { fs: 10.5, c: RED, anchor: 'middle', fw: 900 });

              // 被減數與減數
              s += TX(sx + 20, sy + 58, '42', { fs: 16, anchor: 'middle' });
              s += TX(sx + 105, sy + 58, '195', { fs: 16, anchor: 'middle' });

              s += TX(sx - 20, sy + 82, '－', { fs: 18, c: RED, anchor: 'middle', fw: 900 });
              s += TX(sx + 20, sy + 82, '28', { fs: 16, anchor: 'middle' });
              s += TX(sx + 105, sy + 82, '500', { fs: 16, anchor: 'middle' });

              s += `<line x1="${sx - 25}" y1="${sy + 92}" x2="${sx + 165}" y2="${sy + 92}" stroke="#334155" stroke-width="2"/>`;

              // 答案
              s += TX(sx + 20, sy + 115, '13', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(sx + 105, sy + 115, '695', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });

              s += BOX(25, 182, 390, 52, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 202, '借位重點：195 不夠減 500，向公里借 1 km 是換成 1000 m（不是 10）！', { fs: 11.5, c: RED, fw: 900 });
              s += TX(40, 222, '1000 ＋ 195 ＝ 1195；1195 － 500 ＝ 695 m；41 － 28 ＝ 13 km。', { fs: 11, c: '#15803d' });
            } else {
              // 加法進位標記
              s += TX(sx + 20, sy + 38, '①', { fs: 13, c: RED, anchor: 'middle', fw: 900 });

              s += TX(sx + 20, sy + 58, '3', { fs: 16, anchor: 'middle' });
              s += TX(sx + 105, sy + 58, '850', { fs: 16, anchor: 'middle' });

              s += TX(sx - 20, sy + 82, '＋', { fs: 18, c: BLU, anchor: 'middle', fw: 900 });
              s += TX(sx + 20, sy + 82, '2', { fs: 16, anchor: 'middle' });
              s += TX(sx + 105, sy + 82, '400', { fs: 16, anchor: 'middle' });

              s += `<line x1="${sx - 25}" y1="${sy + 92}" x2="${sx + 165}" y2="${sy + 92}" stroke="#334155" stroke-width="2"/>`;

              // 答案
              s += TX(sx + 20, sy + 115, '6', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });
              s += TX(sx + 105, sy + 115, '250', { fs: 18, c: GRN, anchor: 'middle', fw: 900 });

              s += BOX(25, 182, 390, 52, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 204, '進位重點：公尺 850 ＋ 400 ＝ 1250 m，滿千向公里進 ①！', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 222, '公尺留 250 m，公里 3 ＋ 2 ＋ ① ＝ 6 km，總計 6 km 250 m。', { fs: 11, c: '#15803d' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.cal-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.op);
          });
          render('sub');
        },
        caption: '點擊切換加法與減法：公尺滿 1000 向左進 1 公里，不夠減向左借 1 當 1000。',
        example: {
          q: '馬拉松全長 42 公里 195 公尺，選手跑了 28 公里 500 公尺，還剩幾公里幾公尺？',
          steps: [
            '列出直式算式：42 km 195 m － 28 km 500 m。',
            '195 不夠減 500，向公里借 1 km 當作 1000 m。',
            '公尺：1000 ＋ 195 － 500 ＝ 695 公尺。',
            '公里：41 － 28 ＝ 13 公里，答：13 公里 695 公尺。'
          ],
          ans: '13 公里 695 公尺'
        }
      }

    ]
  });
})();
