/* ============ 第 8 章　公升和毫升 ============
   依康軒國小 3 上第 8 單元：
   8-1 認識毫升與公升
   8-2 容量的實測與換算
   8-3 容量的加減計算
   對應課綱代碼：n-II-1 理解容量單位「公升」與「毫升」，能作實測、估測、比較、換算與加減計算。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#7c3aed'; // 玫瑰紫/靛藍色主調 (Chapter 8 公升和毫升)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 8,
    title: '公升和毫升',
    color: C,
    sections: ['8-1 認識毫升與公升', '8-2 容量的實測與換算', '8-3 容量的加減計算'],
    slides: [

      /* ==================== 8-1 認識毫升與公升 ==================== */
      {
        sec: '8-1', secName: '認識毫升與公升',
        title: '液體所占空間的大小叫容量，1公升等於1000毫升',
        points: [
          '**容量的定義**：容器所能裝載液體的最大數量。',
          '**常用單位**：<span class="k">公升 (L, liter)</span> 與 <span class="k">毫升 (mL, milliliter)</span>。',
          '**單位關係**：\\(1\\text{ 公升} = 1000\\text{ 毫升}\\)（\\(1\\text{ L} = 1000\\text{ mL}\\)）。',
          '生活感知：養樂多約 <span class="k">100 mL</span>、寶特瓶飲料約 <span class="k">600 mL</span>、家庭號鮮奶約 <span class="k">2 L</span>。'
        ],
        formula: { label: '容量核心關係', tex: '1\\text{ L} = 1000\\text{ mL}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 390, 110, { fill: '#faf5ff', stroke: VIO, r: 12 });
          out += TX(210, 40, '🧪 1000 mL ＝ 1 L 容量基準', { fs: 16, c: VIO, anchor: 'middle', fw: '900' });

          out += BOX(35, 55, 160, 55, { fill: '#fff', stroke: '#c084fc', r: 8 });
          out += TX(115, 76, '1 毫升 (mL)', { fs: 13, c: VIO, anchor: 'middle', fw: '900' });
          out += TX(115, 96, '眼藥水滴管 1 滴約 1 mL', { fs: 11, c: '#64748b', anchor: 'middle' });

          out += BOX(225, 55, 160, 55, { fill: '#fff', stroke: '#c084fc', r: 8 });
          out += TX(305, 76, '1 公升 (L)', { fs: 13, c: VIO, anchor: 'middle', fw: '900' });
          out += TX(305, 96, '＝ 1000 毫升 (mL)', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          out += BOX(15, 140, 390, 105, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(210, 165, '🥤 生活常見容器容量感度圖解', { fs: 14, c: BLU, anchor: 'middle', fw: '900' });

          out += TX(35, 192, '• 養樂多 ≒ 100 mL', { fs: 13, c: '#1e3a8a', fw: '800' });
          out += TX(200, 192, '• 鋁箔包飲料 ≒ 250 mL', { fs: 13, c: '#1e3a8a', fw: '800' });
          out += TX(35, 218, '• 運動飲料寶特瓶 ≒ 600 mL', { fs: 13, c: '#1e3a8a', fw: '800' });
          out += TX(200, 218, '• 家庭大鮮奶 ≒ 2 L (2000 mL)', { fs: 13, c: RED, fw: '900' });

          h.innerHTML = svg('0 0 420 260', out);
        },
        caption: '1 公升相當於 1000 個 1 毫升，測量大容器使用公升，小容器使用毫升。',
        example: {
          q: '一瓶寶特瓶紅茶容量是 600 毫升，買了 2 瓶一共是多少公升多少毫升？',
          steps: [
            '1. 算式：600 × 2 ＝ 1200 (毫升)。',
            '2. 1000 毫升 ＝ 1 公升。',
            '3. 1200 毫升 ＝ 1000 毫升 ＋ 200 毫升 ＝ 1 公升 200 毫升。'
          ],
          ans: '1 公升 200 毫升 (或 1200 mL)'
        }
      },

      {
        sec: '8-1', secName: '認識毫升與公升',
        title: '【易錯陷阱】毫升未滿百位要補「0」佔位！',
        points: [
          '⚡ **致命迷思破解**：$2\\text{ L } 50\\text{ mL}$ 換算成毫升時，學生常誤寫成 <span style="color:#e11d48">250 mL</span> 或 <span style="color:#e11d48">2500 mL</span>。',
          '記得：\\(1\\text{ L} = 1000\\text{ mL}\\)（千進位有三個 0），所以毫升部分要有 <span class="k">3 個數位</span>！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <svg viewBox="0 0 420 180" style="max-width:100%">
              <!-- 拆解運算卡片 -->
              <rect x="10" y="10" width="400" height="160" rx="12" fill="#faf5ff" stroke="#c084fc" stroke-width="2"/>
              <text x="210" y="36" text-anchor="middle" font-size="15" font-weight="900" fill="#7c3aed">2 公升 50 毫升 ＝ ？ 毫升</text>
              
              <!-- 步驟拆解 -->
              <g transform="translate(30, 50)">
                <!-- 2 L 轉化 -->
                <rect x="0" y="0" width="165" height="42" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
                <text x="82" y="26" text-anchor="middle" font-size="13.5" font-weight="900" fill="#1d4ed8">2 L ＝ 2000 mL</text>

                <!-- 50 mL 轉化 -->
                <rect x="195" y="0" width="165" height="42" rx="8" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.5"/>
                <text x="277" y="26" text-anchor="middle" font-size="13.5" font-weight="900" fill="#be185d">50 mL ＝ 050 mL</text>
              </g>

              <!-- 加總位值表 -->
              <g transform="translate(85, 108)">
                <rect width="250" height="52" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="2"/>
                <text x="125" y="25" text-anchor="middle" font-size="14" font-weight="900" fill="#1e293b">2000 ＋ 50 ＝ <tspan fill="#e11d48" font-size="18">2</tspan><tspan fill="#dc2626" font-size="18" font-weight="900">0</tspan><tspan fill="#e11d48" font-size="18">50</tspan> mL</text>
                <text x="125" y="44" text-anchor="middle" font-size="11.5" font-weight="900" fill="#dc2626">⚠️ 注意：百位是 0，絕不能漏掉！</text>
              </g>
            </svg>
          </div>`;
        },
        caption: '換算密訣：2 L 是 2000 mL，再加上 50 mL 是 2050 mL！百位的 0 必須寫出來！',
        example: {
          q: '3 公升 8 毫升等於多少毫升？',
          steps: [
            '1. 3 公升 ＝ 3000 毫升。',
            '2. 8 毫升在百位與十位都是 0（即 008）。',
            '3. 3000 ＋ 8 ＝ 3008 毫升。'
          ],
          ans: '3008 毫升'
        }
      },

      /* ==================== 8-2 容量的實測與換算 (升級版：量杯水面加繪 👁️ 視線平視凹面指示) ==================== */
      {
        sec: '8-2', secName: '容量的實測與換算',
        title: '【動態量杯】刻度量杯與視線平視/凹面指示模擬器',
        points: [
          '拉動「液體毫升數 (0 ~ 2800 mL)」。',
          '👁️ **讀數規範**：<span class="k">視線必須與水面中央最低處 (凹面) 平視</span>。',
          '滿 1000 mL 自動累積為 1 公升！'
        ],
        formula: { label: '雙向容量換算', tex: 'X\\text{ L } Y\\text{ mL} \\iff (X \\times 1000 + Y)\\text{ mL}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="background:#faf5ff; border:1.5px solid #7c3aed; border-radius:12px; padding:10px; text-align:center; margin-bottom:8px;">
                <div style="font-size:13px; font-weight:800; color:#6b21a8;">當前量杯水量：</div>
                <div style="font-size:22px; font-weight:900; color:#0f172a; margin:4px 0;">
                  <span id="cupL" style="color:#7c3aed;">1</span> 公升 
                  <span id="cupML" style="color:#e11d48;">450</span> 毫升
                  ＝ <span id="cupTotal" style="color:#2563eb;">1450</span> mL
                </div>
              </div>

              <div id="cupSimStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:180px; overflow:hidden;">
                <!-- 量杯水面 SVG 由 JS 渲染 -->
              </div>

              <div class="ictrl" style="margin-top:8px;">
                <label>倒入水量 (mL)：<span class="ival" id="mlSliderVal">1450</span> mL</label>
                <input type="range" id="mlSlider" min="100" max="2800" value="1450" step="50" style="width:100%;">
              </div>
            </div>
          `;

          const slider = h.querySelector('#mlSlider');
          const sliderVal = h.querySelector('#mlSliderVal');
          const cupL = h.querySelector('#cupL');
          const cupML = h.querySelector('#cupML');
          const cupTotal = h.querySelector('#cupTotal');
          const stage = h.querySelector('#cupSimStage');

          function renderCup() {
            const total = parseInt(slider.value, 10);
            const L = Math.floor(total / 1000);
            const mL = total % 1000;

            sliderVal.textContent = total;
            cupL.textContent = L;
            cupML.textContent = mL;
            cupTotal.textContent = total;

            let s = '';
            const cy1 = 20, cw = 85, ch = 130;

            // 第 1 量杯
            s += `<rect x="40" y="${cy1}" width="${cw}" height="${ch}" fill="#f8fafc" stroke="#7c3aed" stroke-width="2" rx="4"/>`;
            const fillH1 = Math.min(ch, (Math.min(total, 1000) / 1000) * ch);
            if (fillH1 > 0) {
              s += `<rect x="42" y="${cy1 + ch - fillH1}" width="${cw - 4}" height="${fillH1}" fill="rgba(124, 58, 237, 0.4)" rx="2"/>`;
            }
            s += TX(82, cy1 + ch + 16, '第 1 量杯 (1000mL)', { fs: 10.5, c: VIO, anchor: 'middle', fw: '900' });

            // 第 2 量杯
            s += `<rect x="160" y="${cy1}" width="${cw}" height="${ch}" fill="#f8fafc" stroke="#7c3aed" stroke-width="2" rx="4"/>`;
            const remML = Math.max(0, total - 1000);
            const fillH2 = Math.min(ch, (Math.min(remML, 1000) / 1000) * ch);
            if (fillH2 > 0) {
              const waterY = cy1 + ch - fillH2;
              s += `<rect x="162" y="${waterY}" width="${cw - 4}" height="${fillH2}" fill="rgba(124, 58, 237, 0.4)" rx="2"/>`;

              // 👁️ 視線平視指示線
              s += `<line x1="160" y1="${waterY}" x2="265" y2="${waterY}" stroke="${RED}" stroke-width="1.8" stroke-dasharray="3 3"/>`;
              s += TX(275, waterY + 4, '👁️ 平視凹面', { fs: 10, c: RED, fw: '900' });
            }
            s += TX(202, cy1 + ch + 16, '第 2 量杯', { fs: 10.5, c: VIO, anchor: 'middle', fw: '900' });

            // 右側計算說明卡
            s += `<g transform="translate(280, 20)">`;
            s += BOX(0, 0, 80, 120, { fill: '#faf5ff', stroke: '#c084fc', r: 6 });
            s += TX(40, 22, '換算拆解', { fs: 11, c: VIO, anchor: 'middle', fw: '900' });
            s += TX(40, 48, `${L} L`, { fs: 15, c: VIO, anchor: 'middle', fw: '900' });
            s += TX(40, 68, `＝${L * 1000}mL`, { fs: 10, c: '#64748b', anchor: 'middle' });
            s += TX(40, 90, `＋${mL}mL`, { fs: 12, c: RED, anchor: 'middle', fw: '900' });
            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 370 175" style="width:100%; height:100%;">${s}</svg>`;
          }

          slider.oninput = renderCup;
          renderCup();
        },
        caption: '1 公升 ＝ 1000 毫升。讀取刻度時視線必須平視水面最低處 (凹面)。',
        example: {
          q: '水壺裡裝了 3580 毫升的水，是多少公升多少毫升？',
          steps: [
            '1. 千位數字 3 代表有 3000 毫升 ＝ 3 公升。',
            '2. 剩下的 580 即為 580 毫升。',
            '3. 答：3 公升 580 毫升。'
          ],
          ans: '3 公升 580 毫升'
        }
      },

      /* ==================== 8-3 容量的加減計算 ==================== */
      {
        sec: '8-3', secName: '容量的加減計算',
        title: '公升對公升、毫升對毫升，滿1000毫升要進1公升',
        points: [
          '**同單位對齊**：直式計算分成「公升 (L)」與「毫升 (mL)」兩欄。',
          '**加法進位**：毫升欄相加滿 1000 mL，向公升欄<span class="k">進 1 L</span>。',
          '**減法借位**：毫升欄不夠減時，向公分欄<span class="k">借 1 L (換成 1000 mL)</span> 再減。'
        ],
        formula: { label: '進借位規則', tex: '1000\\text{ mL} \\rightleftarrows 1\\text{ L}' },
        visual: (h) => {
          let out = '';
          out += BOX(15, 15, 188, 225, { fill: '#faf5ff', stroke: VIO, r: 12 });
          out += TX(109, 38, '【加法進位】範例', { fs: 14, c: VIO, anchor: 'middle', fw: '900' });
          out += TX(109, 58, '2 L 750 mL ＋ 1 L 600 mL', { fs: 11.5, c: '#6b21a8', anchor: 'middle' });

          out += TX(65, 90, 'L', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(135, 90, 'mL', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(65, 118, '2', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 118, '750', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(35, 142, '＋', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(65, 142, '1', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 142, '600', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="30" y1="152" x2="165" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(65, 76, '①', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
          out += TX(65, 178, '4', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(135, 178, '350', { fs: 16, c: RED, anchor: 'middle', fw: '900' });

          out += TX(109, 215, '750+600=1350 ➔ 寫350進1L', { fs: 10.5, c: RED, anchor: 'middle', fw: '900' });

          out += BOX(217, 15, 188, 225, { fill: '#fff1f2', stroke: RED, r: 12 });
          out += TX(311, 38, '【減法借位】範例', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
          out += TX(311, 58, '4 L 200 mL － 1 L 450 mL', { fs: 11.5, c: '#9f1239', anchor: 'middle' });

          out += TX(267, 90, 'L', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(337, 90, 'mL', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += `<line x1="260" y1="108" x2="274" y2="124" stroke="${RED}" stroke-width="2"/>`;
          out += TX(267, 76, '3', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
          out += TX(337, 76, '1000', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          out += TX(267, 118, '4', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(337, 118, '200', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(237, 142, '－', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(267, 142, '1', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(337, 142, '450', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="232" y1="152" x2="367" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(267, 178, '2', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(337, 178, '750', { fs: 16, c: RED, anchor: 'middle', fw: '900' });

          out += TX(311, 215, '向 4L 借 1L 換 1000mL 再減', { fs: 10.5, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '容量相加滿 1000 毫升要向公升進 1，不夠減時向公升借 1 當 1000 毫升。',
        example: {
          q: '桶子裡原本有 5 公升的水，用去了 2 公升 350 毫升後，還剩下多少？',
          steps: [
            '1. 直式對齊：5 L 0 mL － 2 L 350 mL。',
            '2. 毫升欄 0 不夠減 350：向 5 L 借 1 L 變 4 L，毫升欄得到 1000 mL。',
            '3. 毫升算：1000 － 350 ＝ 650 mL。',
            '4. 公升算：4 － 2 ＝ 2 L。'
          ],
          ans: '2 公升 650 毫升'
        }
      }
    ]
  });
})();
