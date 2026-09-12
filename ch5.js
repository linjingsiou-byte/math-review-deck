/* ============ 第 5 章　角 ============
   依康軒國小 3 上第 5 單元：
   5-1 認識角與邊頂點
   5-2 角的大小比較與直角
   5-3 三角板與正方形長方形的角
   對應課綱代碼：s-II-1 理解角與直角的概念，並能進行簡單的比較與繪製。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#0891b2'; // 海洋青色主調 (Chapter 5 角)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706', CYN = '#0891b2';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 5,
    title: '角',
    color: C,
    sections: ['5-1 認識角與邊頂點', '5-2 角的大小比較與直角', '5-3 三角板與正方形長方形的角'],
    slides: [

      /* ==================== 5-1 認識角與邊頂點 ==================== */
      {
        sec: '5-1', secName: '認識角與邊頂點',
        title: '由同一頂點引出的兩條直直的邊，所夾成的圖形就是角',
        points: [
          '**角的三要素**：<span class="k">1 個頂點</span> 與 <span class="k">2 條直直的邊</span>。',
          '**角的大小**：取決於<span class="k">兩條邊張開程度的大小</span>，張得越開角越大。',
          '與邊畫得長或短無關（邊長拉長，角的大小不會改變）。'
        ],
        formula: { label: '角的三要素', tex: '\\text{角} = 1\\text{ 個頂點} + 2\\text{ 條直邊}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#ecfeff', stroke: CYN, r: 12 });
          out += TX(109, 38, '【角的三要素圖解】', { fs: 14, c: CYN, anchor: 'middle', fw: '900' });

          const vx = 50, vy = 160;
          const r = 100;
          const a1 = 0;
          const a2 = -60 * (Math.PI / 180);

          const x1 = vx + r * Math.cos(a1);
          const y1 = vy + r * Math.sin(a1);
          const x2 = vx + r * Math.cos(a2);
          const y2 = vy + r * Math.sin(a2);

          out += `<line x1="${vx}" y1="${vy}" x2="${x1}" y2="${y1}" stroke="${CYN}" stroke-width="3"/>`;
          out += `<line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}" stroke="${CYN}" stroke-width="3"/>`;

          out += `<circle cx="${vx}" cy="${vy}" r="6" fill="${RED}"/>`;
          out += TX(vx - 20, vy + 20, '頂點', { fs: 13, c: RED, fw: '900' });

          out += TX(vx + 60, vy + 18, '邊', { fs: 13, c: CYN, fw: '900' });
          out += TX(vx + 45, vy - 40, '邊', { fs: 13, c: CYN, fw: '900' });

          out += `<path d="M ${vx + 30} ${vy} A 30 30 0 0 0 ${vx + 30 * Math.cos(a2)} ${vy + 30 * Math.sin(a2)}" fill="rgba(8,145,178,0.2)" stroke="${CYN}" stroke-width="2"/>`;

          out += BOX(217, 15, 188, 225, { fill: '#fffbeb', stroke: AMB, r: 12 });
          out += TX(311, 38, '【重要觀念】邊長 vs 角大小', { fs: 13.5, c: AMB, anchor: 'middle', fw: '900' });

          out += TX(311, 70, '角的大小只看「張開幅度」', { fs: 12, c: '#b45309', anchor: 'middle', fw: '800' });
          out += TX(311, 90, '與邊畫得長或短完全無關！', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          const vx2 = 250, vy2 = 180;
          out += `<line x1="${vx2}" y1="${vy2}" x2="${vx2 + 50}" y2="${vy2}" stroke="#334155" stroke-width="2.5"/>`;
          out += `<line x1="${vx2}" y1="${vy2}" x2="${vx2 + 35}" y2="${vy2 - 35}" stroke="#334155" stroke-width="2.5"/>`;
          out += TX(vx2 + 25, vy2 + 18, '短邊 45°', { fs: 11, c: '#334155' });

          const vx3 = 330, vy3 = 180;
          out += `<line x1="${vx3}" y1="${vy3}" x2="${vx3 + 70}" y2="${vy3}" stroke="${CYN}" stroke-width="2.5"/>`;
          out += `<line x1="${vx3}" y1="${vy3}" x2="${vx3 + 49}" y2="${vy3 - 49}" stroke="${CYN}" stroke-width="2.5"/>`;
          out += TX(vx3 + 35, vy3 + 18, '長邊 45°', { fs: 11, c: CYN, fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '角由 1 個頂點與 2 條邊組成，張開得越開角度越大，邊畫得長短不影響角的大小。',
        example: {
          q: '下面哪一個說法是正確的？\n① 邊畫得越長，角就越大。\n② 兩條邊張開得越開，角就越大。',
          steps: [
            '1. 角的大小取決於兩條邊張開的幅度。',
            '2. 把邊延長或縮短，張開的幅度並沒有改變，所以角的大小不變。',
            '3. 正確答案是 ②。'
          ],
          ans: '② 兩條邊張開得越開，角就越大'
        }
      },

      {
        sec: '5-1', secName: '認識角與邊頂點',
        title: '【破除迷思】動態拉長邊長，觀察角度是否改變！',
        points: [
          '⚡ **致命迷思破解**：三年級學生常以為「邊長畫越長，角就越大」。',
          '試著拖動下方的「邊長」滑桿，觀察<span class="k">兩邊張開的角度始終不變</span>！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 400 180" style="max-width:100%">
              <g class="armg"></g>
            </svg>
            <div class="ictrl" style="margin-top:6px;background:#ecfeff;padding:8px 12px;border-radius:10px;border:1.5px solid #0891b2">
              <label style="font-weight:900;font-size:14.5px;color:#0891b2">拖動邊長長度：<span class="ival lenv" style="font-size:17px;color:#e11d48">60</span> px</label>
              <input class="len-r" type="range" min="40" max="110" step="5" value="60" style="width:85%;margin-top:4px">
            </div>
          </div>`;
          const sl = h.querySelector('.len-r'), lenv = h.querySelector('.lenv'), armg = h.querySelector('.armg');
          sl.oninput = () => {
            const L = +sl.value;
            lenv.textContent = L;
            const vx = 140, vy = 140, ang = 45;
            const rad = ang * Math.PI / 180;
            const x1 = vx + L;
            const y1 = vy;
            const x2 = vx + L * Math.cos(-rad);
            const y2 = vy + L * Math.sin(-rad);

            let out = `<rect x="10" y="10" width="380" height="160" rx="12" fill="#fafafa" stroke="#cbd5e1" stroke-width="1.8"/>`;
            // 角兩條邊
            out += `<line x1="${vx}" y1="${vy}" x2="${x1}" y2="${y1}" stroke="#0891b2" stroke-width="4" stroke-linecap="round"/>`;
            out += `<line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}" stroke="#0891b2" stroke-width="4" stroke-linecap="round"/>`;
            out += `<circle cx="${vx}" cy="${vy}" r="6" fill="#e11d48"/>`;
            
            // 弧線
            out += `<path d="M ${vx + 35} ${vy} A 35 35 0 0 0 ${vx + 35 * Math.cos(-rad)} ${vy + 35 * Math.sin(-rad)}" fill="rgba(8,145,178,0.25)" stroke="#0891b2" stroke-width="2"/>`;
            out += `<text x="${vx + 48}" y="${vy - 12}" font-size="15" font-weight="900" fill="#0891b2">45°</text>`;

            // 邊長虛線指示
            out += `<line x1="${vx}" y1="${vy + 12}" x2="${x1}" y2="${vy + 12}" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="4,3"/>`;
            out += `<text x="${(vx + x1)/2}" y="${vy + 26}" text-anchor="middle" font-size="12" font-weight="900" fill="#e11d48">邊長 ＝ ${L} px</text>`;

            // 右側結論框
            out += `<rect x="250" y="30" width="130" height="110" rx="10" fill="#f0fdf4" stroke="#059669" stroke-width="2"/>`;
            out += `<text x="315" y="55" text-anchor="middle" font-size="13" font-weight="900" fill="#059669">檢驗結論</text>`;
            out += `<text x="315" y="80" text-anchor="middle" font-size="12" font-weight="800" fill="#1e293b">張角恆為 45°</text>`;
            out += `<text x="315" y="102" text-anchor="middle" font-size="12" font-weight="900" fill="#e11d48">邊長改變</text>`;
            out += `<text x="315" y="122" text-anchor="middle" font-size="12" font-weight="900" fill="#059669">角的大小不變！</text>`;

            armg.innerHTML = out;
          };
          sl.oninput();
        },
        caption: '動態拖動邊長：兩邊無論延伸多長，張開幅度與角度數值完全一樣，角的大小絕不受邊長影響！',
        example: {
          q: '大偉拿放大鏡看一個 30 度的角，透過放大鏡看，這個角會變大嗎？',
          steps: [
            '1. 放大鏡放大的是邊長與整體圖像。',
            '2. 兩條邊張開的程度（角度）保持不變。',
            '3. 所以角度依然是 30 度。'
          ],
          ans: '不會變大，依然是 30 度'
        }
      },

      /* ==================== 5-1/5-2 互動教具：角的動態開合與三角板直角檢測模擬器 (升級版：自動旋轉對齊檢測) ==================== */
      {
        sec: '5-1', secName: '認識角與邊頂點',
        title: '【動態開合與檢測】角的旋轉與三角板自動對齊檢測模擬器',
        points: [
          '拉動「張開角度 (15° ~ 165°)」滑桿。',
          '點擊 📐 **【三角板自動對齊檢測】**：示範三角板頂點對齊角落、底邊貼齊。',
          '觀察另一邊落在哪裡：<span class="k">重合 (直角 90°)</span>、<span class="k">落於內部 (銳角)</span>、<span class="k">落於外部 (鈍角)</span>。'
        ],
        formula: { label: '直角檢測原則', tex: '\\text{三角板一邊貼齊} \\quad \\text{頂點重合} \\Rightarrow \\text{比對另一邊}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; justify-content:space-between; align-items:center; background:#ecfeff; border:1.5px solid #0891b2; border-radius:10px; padding:8px 12px; margin-bottom:8px;">
                <div style="font-size:14px; font-weight:900; color:#0e7490;">
                  角度：<span id="angleDeg" style="color:#e11d48; font-size:18px;">90</span>° 
                  (<span id="angleType" style="color:#059669;">直角</span>)
                </div>
                <button id="toggleTriBtn" style="padding:4px 10px; border-radius:6px; border:1px solid #0891b2; background:#fff; color:#0891b2; font-weight:800; font-size:12px; cursor:pointer;">📐 三角板自動對齊貼齊</button>
              </div>

              <div id="angleStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:180px; overflow:hidden;">
                <!-- SVG 角落與三角板繪製區 -->
              </div>

              <div class="ictrl" style="margin-top:8px;">
                <label>張開角度：<span class="ival" id="degSliderVal">90</span>°</label>
                <input type="range" id="degSlider" min="15" max="165" value="90" step="5" style="width:100%;">
              </div>
            </div>
          `;

          let deg = 90;
          let showTri = false;

          const stage = h.querySelector('#angleStage');
          const slider = h.querySelector('#degSlider');
          const sliderVal = h.querySelector('#degSliderVal');
          const degText = h.querySelector('#angleDeg');
          const typeText = h.querySelector('#angleType');
          const triBtn = h.querySelector('#toggleTriBtn');

          function renderAngle() {
            deg = parseInt(slider.value, 10);
            sliderVal.textContent = deg;
            degText.textContent = deg;

            let tipText = '';
            if (deg === 90) {
              typeText.textContent = '直角 (Right Angle)';
              typeText.style.color = '#059669';
              tipText = '一邊恰好與三角板直角邊重合 ➔ 直角 (90°) └┐';
            } else if (deg < 90) {
              typeText.textContent = '比直角小 (銳角)';
              typeText.style.color = '#2563eb';
              tipText = '另一邊落在三角板內部 ➔ 比直角小 (銳角)';
            } else {
              typeText.textContent = '比直角大 (鈍角)';
              typeText.style.color = '#d97706';
              tipText = '另一邊落在三角板外部 ➔ 比直角大 (鈍角)';
            }

            const vx = 150, vy = 135, len = 120;
            const rad = deg * (Math.PI / 180);

            const x1 = vx + len;
            const y1 = vy;

            const x2 = vx + len * Math.cos(-rad);
            const y2 = vy + len * Math.sin(-rad);

            let s = '';

            // 1. 三角板自動貼齊 (直角頂點疊合在 vx, vy，底邊貼齊)
            if (showTri) {
              s += `<polygon points="${vx},${vy} ${vx + 115},${vy} ${vx},${vy - 115}" fill="rgba(245, 158, 11, 0.28)" stroke="#f59e0b" stroke-width="2.5"/>`;
              s += `<rect x="${vx}" y="${vy - 16}" width="16" height="16" fill="none" stroke="#b45309" stroke-width="1.5"/>`;
              s += TX(vx + 32, vy - 35, '三角板直角 (90°)', { fs: 11.5, c: '#b45309', fw: '900' });
            }

            // 2. 兩條邊
            s += `<line x1="${vx}" y1="${vy}" x2="${x1}" y2="${y1}" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round"/>`;
            s += `<line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round"/>`;

            // 3. 頂點
            s += `<circle cx="${vx}" cy="${vy}" r="5.5" fill="#e11d48"/>`;
            s += `<text x="${vx - 18}" y="${vy + 18}" font-size="12" font-weight="900" fill="#e11d48">頂點</text>`;

            // 4. 角度標示
            if (deg === 90) {
              s += `<rect x="${vx}" y="${vy - 20}" width="20" height="20" fill="rgba(5, 150, 105, 0.2)" stroke="#059669" stroke-width="2"/>`;
              s += `<text x="${vx + 28}" y="${vy - 28}" font-size="13" font-weight="900" fill="#059669">直角 └┐</text>`;
            } else {
              const arcR = 35;
              const ax2 = vx + arcR * Math.cos(-rad);
              const ay2 = vy + arcR * Math.sin(-rad);
              s += `<path d="M ${vx + arcR} ${vy} A ${arcR} ${arcR} 0 0 0 ${ax2} ${ay2}" fill="rgba(8,145,178,0.18)" stroke="#0891b2" stroke-width="2"/>`;
              s += `<text x="${vx + 45}" y="${vy - 15}" font-size="13" font-weight="900" fill="#0891b2">${deg}°</text>`;
            }

            // 底部比對提示
            if (showTri) {
              s += `<rect x="15" y="145" width="340" height="24" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2"/>`;
              s += `<text x="185" y="161" text-anchor="middle" font-size="11.5" font-weight="900" fill="#b45309">${tipText}</text>`;
            }

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          triBtn.onclick = () => {
            showTri = !showTri;
            triBtn.style.background = showTri ? '#0891b2' : '#fff';
            triBtn.style.color = showTri ? '#fff' : '#0891b2';
            renderAngle();
          };

          slider.oninput = renderAngle;
          renderAngle();
        },
        caption: '將三角板直角頂點與角落疊合、一邊貼齊，即可精準判定直角、銳角與鈍角。',
        example: {
          q: '拿三角板的直角去量某個角，發現那個角比三角板的直角還大，這是什麼角？',
          steps: [
            '1. 三角板上的直角固定是 90 度。',
            '2. 比直角 (90°) 張得更開的角稱為鈍角（比直角大）。',
            '3. 答案是比直角大 (鈍角)。'
          ],
          ans: '比直角大 (鈍角)'
        }
      },

      /* ==================== 5-3 三角板與正方形長方形的角 ==================== */
      {
        sec: '5-3', secName: '三角板與正方形長方形的角',
        title: '正方形與長方形都有 4 個直角，且對邊相等',
        points: [
          '**正方形**：4 條邊都一樣長，而且有 <span class="k">4 個直角</span>。',
          '**長方形**：相對的邊一樣長（對邊相等），也有 <span class="k">4 個直角</span>。',
          '**檢驗直角**：拿三角板上的直角頂點疊合圖形的角，邊重合即為直角。'
        ],
        formula: { label: '四邊形直角特性', tex: '\\text{正方形/長方形} \\Rightarrow 4\\text{ 個角都是直角 (90}^\\circ)' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#ecfeff', stroke: CYN, r: 12 });
          out += TX(109, 38, '【正方形】4直角 + 4邊等長', { fs: 13.5, c: CYN, anchor: 'middle', fw: '900' });

          const sx = 59, sy = 65, sw = 100;
          out += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sw}" fill="#cff4fc" stroke="${CYN}" stroke-width="2.5" rx="4"/>`;

          out += `<rect x="${sx}" y="${sy}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${sx + sw - 14}" y="${sy}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${sx}" y="${sy + sw - 14}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${sx + sw - 14}" y="${sy + sw - 14}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;

          out += TX(109, 195, '4 個角都是直角 └┐', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
          out += TX(109, 215, '4 條邊等長', { fs: 12, c: CYN, anchor: 'middle', fw: '800' });

          out += BOX(217, 15, 188, 225, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(311, 38, '【長方形】4直角 + 對邊相等', { fs: 13.5, c: BLU, anchor: 'middle', fw: '900' });

          const rx = 246, ry = 80, rw = 130, rh = 75;
          out += `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#dbeafe" stroke="${BLU}" stroke-width="2.5" rx="4"/>`;

          out += `<rect x="${rx}" y="${ry}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${rx + rw - 14}" y="${ry}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${rx}" y="${ry + rh - 14}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;
          out += `<rect x="${rx + rw - 14}" y="${ry + rh - 14}" width="14" height="14" fill="none" stroke="${RED}" stroke-width="1.8"/>`;

          out += TX(311, 195, '4 個角都是直角 └┐', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
          out += TX(311, 215, '上下邊相等，左右邊相等', { fs: 11.5, c: BLU, anchor: 'middle', fw: '800' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '正方形與長方形的共同點：都有 4 個頂點、4 條邊與 4 個直角。',
        example: {
          q: '長方形和正方形有什麼相同點與不同點？',
          steps: [
            '1. 相同點：都有 4 個角，且 4 個角都是直角。',
            '2. 不同點：正方形 4 條邊都一樣長；長方形只有相對的兩條邊一樣長。'
          ],
          ans: '相同點：都有 4 個直角；不同點：正方形 4 邊等長，長方形對邊相等'
        }
      }
    ]
  });
})();
