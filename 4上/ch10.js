/* ============ 第 10 章　統計圖 ============
   節次：10-1 報讀長條圖與縱橫軸判讀、10-2 報讀折線圖與連續變化趨勢、10-3 折線圖的省略符號
   對應課綱代碼：D-4-1 報讀與繪製長條圖。報讀折線圖與連續量變化。
   課綱邊界：中年級不涉及圓形百分圖（圓形圖留在六上）；不涉及雙折線圖與複式長條圖之複雜統計指標。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#8b5cf6';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', PUR = '#8b5cf6';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 15}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 10,
    title: '統計圖',
    color: C,
    sections: ['10-1 報讀長條圖與縱橫軸判讀', '10-2 報讀折線圖與連續變化趨勢', '10-3 折線圖的省略符號'],
    slides: [

      // 10-1 Slide 1: 報讀長條圖與縱橫軸判讀
      {
        sec: '10-1', secName: '報讀長條圖與縱橫軸判讀',
        title: '長條高低比數量，看清一格代表多少',
        points: [
          '長條的長度或高度：<span class="k">代表數量的多寡</span>。',
          '報讀第一步：<span class="k">看清縱軸與橫軸代表什麼</span>。',
          '特別注意：看清楚<span class="k">每一小格代表多少單位</span>。'
        ],
        visual: (h) => {
          let unitMode = 2; // 2 or 5
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn u-btn" data-u="2" style="font-size:11.5px; padding:3px 8px; background:#2563eb; color:#fff;">標準模式：一小格＝2人</button>
                <button class="nav-btn u-btn" data-u="5" style="font-size:11.5px; padding:3px 8px;">⚠️ 迷思挑戰：一小格＝5人（不能只數格子！）</button>
              </div>
              <div style="display:flex; justify-content:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
                <button class="nav-btn f-btn" data-i="0" style="font-size:11px; padding:2px 6px;">🍎 蘋果</button>
                <button class="nav-btn f-btn" data-i="1" style="font-size:11px; padding:2px 6px;">🥭 芒果</button>
                <button class="nav-btn f-btn" data-i="2" style="font-size:11px; padding:2px 6px;">🍉 西瓜</button>
                <button class="nav-btn f-btn" data-i="3" style="font-size:11px; padding:2px 6px;">🍌 香蕉</button>
              </div>
            </div>`;

          const data2 = [
            { name: '蘋果', val: 12, c: RED },
            { name: '芒果', val: 16, c: AMB },
            { name: '西瓜', val: 22, c: GRN },
            { name: '香蕉', val: 8, c: '#ca8a04' }
          ];

          const data5 = [
            { name: '蘋果', val: 15, c: RED },  // 3格
            { name: '芒果', val: 25, c: AMB },  // 5格
            { name: '西瓜', val: 35, c: GRN },  // 7格
            { name: '香蕉', val: 10, c: '#ca8a04' } // 2格
          ];

          let selIdx = 2;

          const render = () => {
            const curData = (unitMode === 2) ? data2 : data5;
            const maxVal = (unitMode === 2) ? 24 : 40;
            const stepVal = (unitMode === 2) ? 4 : 10;
            const item = curData[selIdx];

            let s = '';
            s += BOX(15, 8, 410, 238, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, `四年級最喜歡的水果長條圖（一小格代表 ${unitMode} 人）`, { fs: 14, c: PUR, anchor: 'middle', fw: 900 });

            // 坐標軸
            const ox = 70, oy = 155, pw = 320, ph = 115;
            s += `<line x1="${ox}" y1="${oy}" x2="${ox + pw}" y2="${oy}" stroke="#334155" stroke-width="2"/>`;
            s += `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - ph}" stroke="#334155" stroke-width="2"/>`;
            s += TX(ox - 10, oy - ph - 4, '(人)', { fs: 10, c: '#64748b' });

            // 縱軸刻度
            for (let v = 0; v <= maxVal; v += stepVal) {
              const y = oy - (v / maxVal) * ph;
              s += `<line x1="${ox - 4}" y1="${y}" x2="${ox}" y2="${y}" stroke="#334155" stroke-width="1.5"/>`;
              s += `<line x1="${ox}" y1="${y}" x2="${ox + pw}" y2="${y}" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>`;
              s += TX(ox - 8, y + 4, `${v}`, { fs: 10, c: '#475569', anchor: 'end' });
            }

            // 繪製 4 個長條
            const barW = 42, gap = 70;
            curData.forEach((d, i) => {
              const bx = ox + 25 + i * gap;
              const bh = (d.val / maxVal) * ph;
              const by = oy - bh;
              const isSel = (i === selIdx);

              s += BOX(bx, by, barW, bh, { fill: isSel ? d.c : '#cbd5e1', stroke: isSel ? '#0f172a' : '#94a3b8', sw: isSel ? 2 : 1, r: 3 });
              s += TX(bx + barW / 2, oy + 16, d.name, { fs: 12, c: isSel ? d.c : '#334155', anchor: 'middle', fw: isSel ? 900 : 700 });

              if (isSel) {
                s += `<line x1="${ox}" y1="${by}" x2="${bx + barW}" y2="${by}" stroke="${RED}" stroke-width="1.8" stroke-dasharray="3,2"/>`;
                s += TX(bx + barW / 2, by - 6, `${d.val}人`, { fs: 12, c: RED, anchor: 'middle', fw: 900 });
              }
            });

            // 解說卡
            const gridCount = item.val / unitMode;
            s += BOX(25, 172, 390, 64, { fill: '#fff', stroke: unitMode === 5 ? '#f59e0b' : '#c4b5fd', r: 8 });
            if (unitMode === 2) {
              s += TX(40, 192, `選取【${item.name}】：長條高度對齊縱軸刻度 ${item.val} 人。`, { fs: 12.5, c: PUR, fw: 900 });
              s += TX(40, 212, `計算：共有 ${gridCount} 小格長，每一小格代表 2 人 ➔ ${gridCount} × 2 ＝ ${item.val} 人。`, { fs: 11.5, c: '#334155' });
              s += TX(40, 226, '報讀時直接對齊左邊縱軸刻度數字最快最準！', { fs: 10.5, c: '#15803d' });
            } else {
              s += TX(40, 192, `⚠️ 陷阱示警：【${item.name}】有 ${gridCount} 小格長，但絕對不是 ${gridCount} 人！`, { fs: 12.5, c: RED, fw: 900 });
              s += TX(40, 212, `因為「一小格代表 5 人」！真實數量 ＝ ${gridCount} 格 × 5 人 ＝ ${item.val} 人 🎉`, { fs: 12.5, c: '#b45309', fw: 900 });
              s += TX(40, 226, '口訣：先看縱軸一格是幾單位，千萬不要把格子數當成數量！', { fs: 11, c: '#15803d', fw: 800 });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.u-btn').forEach(btn => {
            btn.onclick = () => {
              unitMode = +btn.dataset.u;
              h.querySelectorAll('.u-btn').forEach(b => {
                b.style.background = (b === btn) ? '#2563eb' : '';
                b.style.color = (b === btn) ? '#fff' : '';
              });
              render();
            };
          });

          h.querySelectorAll('.f-btn').forEach(btn => {
            btn.onclick = () => {
              selIdx = +btn.dataset.i;
              render();
            };
          });

          render();
        },
        caption: '切換一格代表量觀察：一小格可能是 2 人或 5 人，數量＝格子數×一格代表量。',
        example: {
          q: '下圖是四年級最喜歡的水果長條圖，喜歡芒果的有幾人？哪一種水果最受歡迎？',
          steps: [
            '檢查縱軸刻度：一大格代表 4 人，一小格代表 2 人。',
            '看「芒果」長條頂端對齊刻度 16，表示有 16 人。',
            '最高長條是「西瓜」，對齊刻度 22 人。',
            '答：芒果 16 人，西瓜最受歡迎。'
          ],
          ans: '芒果 16 人，西瓜最受歡迎'
        }
      },

      // 10-2 Slide 2: 報讀折線圖與連續變化趨勢
      {
        sec: '10-2', secName: '報讀折線圖與連續變化趨勢',
        title: '折線往上是增加，折線往下是減少',
        points: [
          '折線圖：點代表數量，線代表<span class="k">隨時間的連續變化</span>。',
          '線段往右上傾斜：表示數量<span class="k">增加（上升）</span>。',
          '線段往右下傾斜：表示數量<span class="k">減少（下降）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div class="ictrl">
                <label>選擇觀測區間：<span class="ival" id="dayVal">週一 ➔ 週二（升溫）</span></label>
                <input type="range" id="dayRange" min="1" max="4" step="1" value="1">
              </div>
            </div>`;

          const temps = [
            { day: '週一', t: 22 },
            { day: '週二', t: 25 },
            { day: '週三', t: 23 },
            { day: '週四', t: 20 },
            { day: '週五', t: 26 }
          ];

          const draw = () => {
            const raw = +h.querySelector('#dayRange').value || 1;
            const step = Math.min(4, Math.max(1, raw));
            const d1 = temps[step - 1] || temps[0], d2 = temps[step] || temps[1];
            const diff = d2.t - d1.t;
            const diffStr = diff > 0 ? `上升 ＋${diff}°C 📈` : `下降 ${diff}°C 📉`;
            h.querySelector('#dayVal').textContent = `${d1.day} ➔ ${d2.day} （${diffStr}）`;

            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '某週氣溫連續變化折線圖（看升降趨勢）', { fs: 14, c: PUR, anchor: 'middle', fw: 900 });

            // 坐標軸
            const ox = 70, oy = 160, pw = 310, ph = 120;
            s += `<line x1="${ox}" y1="${oy}" x2="${ox + pw}" y2="${oy}" stroke="#334155" stroke-width="2"/>`;
            s += `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - ph}" stroke="#334155" stroke-width="2"/>`;
            s += TX(ox - 10, oy - ph - 4, '(°C)', { fs: 10, c: '#64748b' });

            // 刻度 18 ~ 28 (每 2 度一格)
            for (let v = 18; v <= 28; v += 2) {
              const y = oy - ((v - 18) / 10) * ph;
              s += `<line x1="${ox - 4}" y1="${y}" x2="${ox}" y2="${y}" stroke="#334155" stroke-width="1.5"/>`;
              s += `<line x1="${ox}" y1="${y}" x2="${ox + pw}" y2="${y}" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>`;
              s += TX(ox - 8, y + 4, `${v}`, { fs: 10, c: '#475569', anchor: 'end' });
            }

            // 計算 5 個點的坐標
            const pts = temps.map((d, i) => {
              const x = ox + 35 + i * 60;
              const y = oy - ((d.t - 18) / 10) * ph;
              return { x, y, ...d };
            });

            // 連線
            for (let i = 0; i < pts.length - 1; i++) {
              const isHl = (i === step - 1);
              const col = isHl ? (diff > 0 ? RED : BLU) : '#94a3b8';
              s += `<line x1="${pts[i].x}" y1="${pts[i].y}" x2="${pts[i+1].x}" y2="${pts[i+1].y}" stroke="${col}" stroke-width="${isHl ? 4.5 : 2}"/>`;
              
              // 輔導專家優化：高亮線段上方浮現語意趨勢標籤
              if (isHl) {
                const midX = (pts[i].x + pts[i+1].x) / 2;
                const midY = (pts[i].y + pts[i+1].y) / 2 - 14;
                s += BOX(midX - 32, midY - 9, 64, 18, { fill: diff > 0 ? '#fee2e2' : '#eff6ff', stroke: diff > 0 ? '#ef4444' : '#3b82f6', r: 4 });
                s += TX(midX, midY + 4, diff > 0 ? '升溫 ↗' : '降溫 ↘', { fs: 10, c: diff > 0 ? RED : BLU, anchor: 'middle', fw: 900 });
              }
            }

            // 畫點與標籤
            pts.forEach((p, i) => {
              s += `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#fff" stroke="#4338ca" stroke-width="2.5"/>`;
              s += TX(p.x, p.y - 8, `${p.t}°`, { fs: 10, c: '#1e293b', anchor: 'middle', fw: 700 });
              s += TX(p.x, oy + 16, p.day, { fs: 11, c: '#475569', anchor: 'middle' });
            });

            // 下方解說卡
            s += BOX(25, 185, 390, 52, { fill: '#fff', stroke: '#c4b5fd', r: 8 });
            s += TX(40, 206, `${d1.day}(${d1.t}°C) 到 ${d2.day}(${d2.t}°C)：線段${diff > 0 ? '往右上傾斜（上升）' : '往右下傾斜（下降）'}。`, { fs: 12, c: PUR, fw: 900 });
            s += TX(40, 224, `氣溫變化：${diffStr}，傾斜越陡峭代表變化越劇烈！`, { fs: 11, c: '#334155' });

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelector('#dayRange').oninput = draw;
          draw();
        },
        caption: '滑動滑桿觀察：折線圖往右上傾斜表示數量增加，往右下傾斜表示數量減少。',
        example: {
          q: '週一到週五的氣溫分別是 22°C、25°C、23°C、20°C、26°C，哪一天最熱？哪兩天降溫最多？',
          steps: [
            '看折線圖最高點：週五是 26°C，為最熱的一天。',
            '看線段向下傾斜：週二到週三降 2°C，週三到週四降 3°C。',
            '週三到週四降了 3°C，降溫最多。',
            '答：週五最熱，週三到週四降溫最多。'
          ],
          ans: '週五最熱，週三到週四降最多'
        }
      },

      // 10-3 Slide 3: 折線圖的省略符號
      {
        sec: '10-3', secName: '折線圖的省略符號',
        title: '波浪省略沒數據，拉大間距看得清',
        points: [
          '當數據較大且集中時：使用<span class="k">波浪省略符號（〰️）</span>。',
          '省略符號略過<span class="k">完全沒有數據的區間</span>。',
          '好處：放大刻度間距，讓細微變化一目了然！'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%">
              <div id="fig"></div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                <button class="nav-btn w-btn" data-m="wave" style="font-size:12px; padding:4px 10px;">✅ 有省略符號（波浪線放大幅度）🎉</button>
                <button class="nav-btn w-btn" data-m="nowave" style="font-size:12px; padding:4px 10px;">❌ 無省略符號（數據擠在頂部看不清）</button>
              </div>
            </div>`;

          const render = (m) => {
            let s = '';
            s += BOX(15, 10, 410, 235, { fill: '#f8fafc', stroke: '#cbd5e1' });
            s += TX(220, 26, '身高變化折線圖（138cm ~ 143cm）：省略符號對照', { fs: 13, c: PUR, anchor: 'middle', fw: 900 });

            const ox = 70, oy = 160, pw = 310, ph = 120;
            s += `<line x1="${ox}" y1="${oy}" x2="${ox + pw}" y2="${oy}" stroke="#334155" stroke-width="2"/>`;

            if (m === 'wave') {
              // 有波浪線省略 0~135：縱軸分上下兩段，中間為課本標準雙波浪省略符號
              s += `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - 6}" stroke="#334155" stroke-width="2"/>`;
              s += `<line x1="${ox}" y1="${oy - 22}" x2="${ox}" y2="${oy - ph}" stroke="#334155" stroke-width="2"/>`;

              // 課本標準雙波浪符號（兩條平行水平正弦波折線）
              // 下波浪
              s += `<path d="M${ox - 9},${oy - 11} Q${ox - 4.5},${oy - 15} ${ox},${oy - 11} T${ox + 9},${oy - 11}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>`;
              // 上波浪
              s += `<path d="M${ox - 9},${oy - 17} Q${ox - 4.5},${oy - 21} ${ox},${oy - 17} T${ox + 9},${oy - 17}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>`;

              // 原點 0 標籤
              s += TX(ox - 8, oy + 4, '0', { fs: 10, c: '#475569', anchor: 'end', fw: 800 });

              // 省略符號教學引導框
              s += BOX(ox + 16, oy - 23, 150, 18, { fill: '#eff6ff', stroke: '#3b82f6', sw: 1.2, r: 4 });
              s += TX(ox + 22, oy - 10, '≈ 雙波浪：省略 0~135', { fs: 9.5, c: '#1d4ed8', fw: 900 });
              s += `<line x1="${ox + 16}" y1="${oy - 14}" x2="${ox + 10}" y2="${oy - 14}" stroke="#3b82f6" stroke-width="1.2"/>`;

              // 刻度 135 ~ 145
              for (let v = 135; v <= 145; v += 2) {
                const y = oy - 25 - ((v - 135) / 10) * (ph - 30);
                s += `<line x1="${ox - 4}" y1="${y}" x2="${ox}" y2="${y}" stroke="#334155" stroke-width="1.5"/>`;
                s += `<line x1="${ox}" y1="${y}" x2="${ox + pw}" y2="${y}" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>`;
                s += TX(ox - 8, y + 4, `${v}`, { fs: 10, c: '#475569', anchor: 'end' });
              }

              // 點 (138, 140, 141, 143)
              const data = [138, 140, 141, 143];
              const pArr = data.map((v, i) => ({
                x: ox + 40 + i * 75,
                y: oy - 25 - ((v - 135) / 10) * (ph - 30),
                v
              }));

              for (let i = 0; i < pArr.length - 1; i++) {
                s += `<line x1="${pArr[i].x}" y1="${pArr[i].y}" x2="${pArr[i+1].x}" y2="${pArr[i+1].y}" stroke="${PUR}" stroke-width="3"/>`;
              }
              pArr.forEach((p, i) => {
                s += `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#fff" stroke="${PUR}" stroke-width="2.5"/>`;
                s += TX(p.x, p.y - 8, `${p.v}cm`, { fs: 10, c: PUR, anchor: 'middle', fw: 800 });
                s += TX(p.x, oy + 16, `第${i+1}次`, { fs: 10, c: '#475569', anchor: 'middle' });
              });

              s += BOX(25, 185, 390, 52, { fill: '#fff', stroke: '#86efac', r: 8 });
              s += TX(40, 206, '✅ 善用省略符號：略過沒有數據的 0~135 公分，拉大 135~145 間距。', { fs: 12, c: '#15803d', fw: 900 });
              s += TX(40, 224, '身高每次長高的起伏清清楚楚，是極佳的統計圖設計！', { fs: 11, c: '#15803d' });
            } else {
              // 無波浪線 (0 ~ 150)：縱軸為連續完整直線
              s += `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - ph}" stroke="#334155" stroke-width="2"/>`;
              for (let v = 0; v <= 150; v += 30) {
                const y = oy - (v / 150) * ph;
                s += `<line x1="${ox - 4}" y1="${y}" x2="${ox}" y2="${y}" stroke="#334155" stroke-width="1.5"/>`;
                s += `<line x1="${ox}" y1="${y}" x2="${ox + pw}" y2="${y}" stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2"/>`;
                s += TX(ox - 8, y + 4, `${v}`, { fs: 10, c: '#475569', anchor: 'end' });
              }

              const data = [138, 140, 141, 143];
              const pArr = data.map((v, i) => ({
                x: ox + 40 + i * 75,
                y: oy - (v / 150) * ph,
                v
              }));

              for (let i = 0; i < pArr.length - 1; i++) {
                s += `<line x1="${pArr[i].x}" y1="${pArr[i].y}" x2="${pArr[i+1].x}" y2="${pArr[i+1].y}" stroke="${RED}" stroke-width="2"/>`;
              }
              pArr.forEach((p, i) => {
                s += `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${RED}"/>`;
                s += TX(p.x, oy + 16, `第${i+1}次`, { fs: 10, c: '#475569', anchor: 'middle' });
              });

              s += BOX(25, 185, 390, 52, { fill: '#fff', stroke: '#fca5a5', r: 8 });
              s += TX(40, 206, '❌ 無省略符號缺點：從 0 畫起，0~130 都是空的，折線全被壓扁在最頂部！', { fs: 12, c: RED, fw: 900 });
              s += TX(40, 224, '根本看不出身高長高了多少，失去統計圖直觀觀察變化的價值。', { fs: 11, c: '#b91c1c' });
            }

            h.querySelector('#fig').innerHTML = svg('0 0 440 245', s);
          };

          h.querySelectorAll('.w-btn').forEach(btn => {
            btn.onclick = () => render(btn.dataset.m);
          });
          render('wave');
        },
        caption: '點擊切換對照：使用波浪省略符號省略空白區間，拉大刻度讓微小變化一目了然。',
        example: {
          q: '小智四年級的身高在 138cm 到 143cm 之間，為什麼折線圖縱軸要畫波浪線？',
          steps: [
            '0 到 135 公分之間完全沒有身高數據。',
            '若從 0 畫起，所有折線會擠在最上面，扁平看不清楚。',
            '用波浪線省略 0~135，可以放大 135~145 公分的刻度。',
            '答：省略空白區間，放大刻度讓微小變化看得更清楚。'
          ],
          ans: '省略空白區間，放大刻度看得清楚'
        }
      }

    ]
  });
})();
