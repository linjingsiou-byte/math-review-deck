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
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif; text-align:center;">
              <div style="background:#faf5ff; border:1.5px solid #7c3aed; border-radius:12px; padding:10px; margin-bottom:10px;">
                <div style="font-size:14px; font-weight:900; color:#6b21a8;">🧪 1000 mL ＝ 1 L 容量核心關係</div>
                <div style="display:flex; justify-content:center; gap:16px; margin-top:6px; font-size:13px; font-weight:800;">
                  <span style="background:#fff; border:1px solid #c084fc; padding:4px 10px; border-radius:6px; color:#7c3aed;">眼藥水 1 滴 ≒ 1 mL</span>
                  <span style="background:#fff; border:1px solid #e11d48; padding:4px 10px; border-radius:6px; color:#e11d48;">1 L ＝ 1000 mL</span>
                </div>
              </div>

              <div id="itemDetailStage" style="background:#eff6ff; border:1.5px solid #2563eb; border-radius:12px; padding:10px; min-height:85px; margin-bottom:8px;">
                <!-- 容器詳情由 JS 渲染 -->
              </div>

              <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
                <button class="cnt-btn active" data-ml="100" data-name="養樂多" data-icon="🥤" style="padding:4px 8px; border-radius:6px; border:1px solid #2563eb; background:#2563eb; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">🥤 養樂多</button>
                <button class="cnt-btn" data-ml="250" data-name="鋁箔包" data-icon="🧃" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🧃 鋁箔包</button>
                <button class="cnt-btn" data-ml="600" data-name="寶特瓶" data-icon="🍾" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🍾 寶特瓶</button>
                <button class="cnt-btn" data-ml="1000" data-name="鮮奶壺" data-icon="🥛" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🥛 鮮奶壺</button>
                <button class="cnt-btn" data-ml="5000" data-name="大水桶" data-icon="🪣" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">🪣 大水桶</button>
              </div>
            </div>
          `;

          const btns = h.querySelectorAll('.cnt-btn');
          const detailStage = h.querySelector('#itemDetailStage');

          function renderDetail(ml, name, icon) {
            const l = Math.floor(ml / 1000);
            const rem = ml % 1000;
            const lStr = l > 0 ? `${l} L ${rem > 0 ? rem + ' mL' : ''}` : `${ml} mL`;

            let out = `
              <div style="font-size:16px; font-weight:900; color:#1e3a8a;">
                ${icon} <span style="color:#2563eb;">${name}</span> 容量大約是 <span style="color:#e11d48; font-size:20px;">${ml} mL</span>
              </div>
              <div style="margin-top:6px; font-size:13.5px; font-weight:800; color:#0369a1;">
                公升毫示換算：<span style="background:#fff; border:1px solid #0284c7; padding:2px 8px; border-radius:6px; color:#0284c7;">${ml} mL ＝ ${lStr}</span>
              </div>
            `;
            detailStage.innerHTML = out;
          }

          btns.forEach(b => {
            b.onclick = () => {
              btns.forEach(btn => { btn.style.background = '#fff'; btn.style.color = '#334155'; btn.style.borderColor = '#cbd5e1'; });
              b.style.background = '#2563eb'; b.style.color = '#fff'; b.style.borderColor = '#2563eb';
              const ml = +b.getAttribute('data-ml');
              const name = b.getAttribute('data-name');
              const icon = b.getAttribute('data-icon');
              renderDetail(ml, name, icon);
            };
          });

          renderDetail(100, '養樂多', '🥤');
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

      /* ==================== 8-2 容量的實測與換算 (升級版：注水按鈕 + 倒水轉化動畫) ==================== */
      {
        sec: '8-2', secName: '容量的實測與換算',
        title: '【動態量杯】刻度量杯與視線平視/凹面指示模擬器＋注水累積体驗',
        points: [
          '點擊 `[💧 注入 250 mL]` 逐次累積到 1000 mL，或拉動滑桿任意調整。',
          '👁️ **讀數規範**：<span class="k">視線必須與水面中央最低處 (凹面) 平視</span>。',
          '水量累積到 1000 mL 後，點擊 `[🪴 倒入 1L 鮮奶壺]` 解鎖轉化動畫！'
        ],
        formula: { label: '雙向容量換算', tex: 'A\\text{ L } B\\text{ mL} \\iff (1000 \\times A + B)\\text{ mL}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="background:#faf5ff; border:1.5px solid #7c3aed; border-radius:12px; padding:10px; text-align:center; margin-bottom:8px;">
                <div style="font-size:13px; font-weight:800; color:#6b21a8;">當前量杯水量：</div>
                <div style="font-size:22px; font-weight:900; color:#0f172a; margin:4px 0;">
                  <span id="cupL" style="color:#7c3aed;">0</span> 公升 
                  <span id="cupML" style="color:#e11d48;">0</span> 毫升
                  ＝ <span id="cupTotal" style="color:#2563eb;">0</span> mL
                </div>
              </div>

              <div id="cupSimStage" style="position:relative; background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:160px; overflow:hidden;">
                <!-- 量杯水面 SVG 由 JS 渲染 -->
              </div>

              <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
                <button id="pourBtn" style="flex:1; padding:6px; border-radius:8px; border:1.5px solid #7c3aed; background:#eff6ff; color:#7c3aed; font-weight:900; font-size:13px; cursor:pointer;">💧 注入 250 mL</button>
                <button id="pourAllBtn" style="padding:6px 10px; border-radius:8px; border:1.5px solid #7c3aed; background:#fff; color:#7c3aed; font-weight:800; font-size:12px; cursor:pointer;">渴满 (1000mL)</button>
                <button id="pourResetBtn" style="padding:6px 10px; border-radius:8px; border:1.5px solid #cbd5e1; background:#fff; color:#64748b; font-weight:800; font-size:12px; cursor:pointer;">↺ 清空</button>
                <button id="milkBtn" style="padding:6px 12px; border-radius:8px; border:2px solid #e11d48; background:#fff1f2; color:#e11d48; font-weight:900; font-size:13px; cursor:pointer; display:none;">🪴 倒入 1L 鮮奶壺！</button>
              </div>
              <div class="ictrl" style="margin-top:8px;">
                <label>或拉動滑桿：<span class="ival" id="mlSliderVal">0</span> mL</label>
                <input type="range" id="mlSlider" min="0" max="2800" value="0" step="50" style="width:100%;">
              </div>
              <div id="milkConvertCard" style="display:none; margin-top:6px; background:#fef3c7; border:2px solid #d97706; border-radius:10px; padding:8px 12px; text-align:center;">
                <div style="font-size:15px; font-weight:900; color:#d97706;">🎉 1000 mL ⇒ 1 L ！全部倒入鮮奶壺！</div>
                <div id="milkBottleCount" style="font-size:13px; color:#92400e; font-weight:800;"></div>
              </div>
            </div>
          `;

          let currentML = 0;
          let milkBottles = 0;
          const slider = h.querySelector('#mlSlider');
          const sliderVal = h.querySelector('#mlSliderVal');
          const cupL = h.querySelector('#cupL');
          const cupML = h.querySelector('#cupML');
          const cupTotal = h.querySelector('#cupTotal');
          const stage = h.querySelector('#cupSimStage');
          const pourBtn = h.querySelector('#pourBtn');
          const pourAllBtn = h.querySelector('#pourAllBtn');
          const pourResetBtn = h.querySelector('#pourResetBtn');
          const milkBtn = h.querySelector('#milkBtn');
          const milkConvertCard = h.querySelector('#milkConvertCard');
          const milkBottleCount = h.querySelector('#milkBottleCount');

          function renderCup() {
            const total = currentML;
            const L = Math.floor(total / 1000);
            const mL = total % 1000;

            sliderVal.textContent = total;
            slider.value = total;
            cupL.textContent = L;
            cupML.textContent = mL;
            cupTotal.textContent = total;

            // 顯示倒入鮮奶壺按鈕
            milkBtn.style.display = (total >= 1000 && total % 1000 === 0 && total > 0) ? 'inline-block' : 'none';

            let s = '';
            const cy1 = 15, cw = 85, ch = 120;

            // 第 1 量杯
            s += `<rect x="40" y="${cy1}" width="${cw}" height="${ch}" fill="#f8fafc" stroke="#7c3aed" stroke-width="2" rx="4"/>`;
            const fillH1 = Math.min(ch, (Math.min(total, 1000) / 1000) * ch);
            if (fillH1 > 0) {
              s += `<rect x="42" y="${cy1 + ch - fillH1}" width="${cw - 4}" height="${fillH1}" fill="rgba(124, 58, 237, 0.45)" rx="2"/>`;
            }
            // 刷度線 250/500/750
            [250, 500, 750].forEach(mark => {
              const my = cy1 + ch - (mark / 1000) * ch;
              s += `<line x1="40" y1="${my}" x2="60" y2="${my}" stroke="#a78bfa" stroke-width="1.2"/>`;
              s += `<text x="35" y="${my + 4}" text-anchor="end" font-size="9" fill="#7c3aed" font-weight="800">${mark}</text>`;
            });
            s += TX(82, cy1 + ch + 15, `第 1 量杯 (1000mL)`, { fs: 10, c: VIO, anchor: 'middle', fw: '900' });

            // 第 2 量杯
            s += `<rect x="155" y="${cy1}" width="${cw}" height="${ch}" fill="#f8fafc" stroke="#7c3aed" stroke-width="2" rx="4"/>`;
            const remML = Math.max(0, total - 1000);
            const fillH2 = Math.min(ch, (Math.min(remML, 1000) / 1000) * ch);
            if (fillH2 > 0) {
              const waterY = cy1 + ch - fillH2;
              s += `<rect x="157" y="${waterY}" width="${cw - 4}" height="${fillH2}" fill="rgba(124, 58, 237, 0.45)" rx="2"/>`;
              s += `<line x1="155" y1="${waterY}" x2="260" y2="${waterY}" stroke="#e11d48" stroke-width="1.8" stroke-dasharray="3 3"/>`;
              s += TX(268, waterY + 4, '👁️ 平視凹面', { fs: 9.5, c: RED, fw: '900' });
            }
            s += TX(197, cy1 + ch + 15, `第 2 量杯`, { fs: 10, c: VIO, anchor: 'middle', fw: '900' });

            // 鮮奶壺圖示
            s += `<g transform="translate(280, 20)">`;
            s += BOX(0, 0, 75, 105, { fill: '#faf5ff', stroke: '#c084fc', r: 6 });
            s += TX(37, 20, '換算拆解', { fs: 10.5, c: VIO, anchor: 'middle', fw: '900' });
            const dispL = Math.floor(total / 1000);
            const dispML = total % 1000;
            s += TX(37, 45, `${dispL} L`, { fs: 14, c: VIO, anchor: 'middle', fw: '900' });
            s += TX(37, 63, `＝${dispL * 1000}mL`, { fs: 9.5, c: '#64748b', anchor: 'middle' });
            s += TX(37, 82, `＋${dispML}mL`, { fs: 11.5, c: RED, anchor: 'middle', fw: '900' });
            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 370 155" style="width:100%; height:100%;">${s}</svg>`;
          }

          pourBtn.onclick = () => {
            if (currentML < 1000) {
              currentML = Math.min(1000, currentML + 250);
              renderCup();
            }
          };
          pourAllBtn.onclick = () => { currentML = 1000; renderCup(); };
          pourResetBtn.onclick = () => {
            currentML = 0; milkBottles = 0;
            milkConvertCard.style.display = 'none';
            milkBottleCount.textContent = '';
            renderCup();
          };
          milkBtn.onclick = () => {
            milkBottles++;
            currentML = Math.max(0, currentML - 1000);
            milkConvertCard.style.display = 'block';
            milkBottleCount.textContent = `目前已倒入 ${milkBottles} 瓶 (${milkBottles} L)！`;
            milkBtn.style.display = 'none';
            renderCup();
          };

          slider.oninput = () => { currentML = parseInt(slider.value, 10); renderCup(); };
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

      /* ==================== 8-3 容量的加減計算（升級：步驟推演器） ==================== */
      {
        sec: '8-3', secName: '容量的加減計算',
        title: '公升對公升、毫升對毫升，滿1000毫升要進1公升、不足減要借位（分步推演器）',
        points: [
          '**同單位對齊**：直式計算分成「公升 (L)」與「毫升 (mL)」兩欄。',
          '點擊 `[Step 1 ~ Step 3]` 按鈕，分步觀察加法進位與減法借位的直式步驟。',
          '切換「加法」與「減法」兩種範例，比較進/借位處理方式的差異。'
        ],
        formula: { label: '進借位規則', tex: '1000\\text{ mL} \\rightleftarrows 1\\text{ L}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; gap:8px; margin-bottom:8px;">
                <button id="capAddBtn" style="flex:1; padding:5px; border-radius:8px; border:1.5px solid #059669; background:#059669; color:#fff; font-weight:900; font-size:12px; cursor:pointer;">➕ 加法進位</button>
                <button id="capSubBtn" style="flex:1; padding:5px; border-radius:8px; border:1.5px solid #cbd5e1; background:#fff; color:#334155; font-weight:900; font-size:12px; cursor:pointer;">➖ 減法借位</button>
              </div>
              <div id="capCalcStage" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; height:170px; overflow:hidden;"></div>
              <div style="display:flex; gap:8px; margin-top:8px; align-items:center;">
                <button id="capReset" style="padding:5px 12px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-weight:800; font-size:12px; cursor:pointer;">↺ 重置</button>
                <button id="capNext" style="flex:1; padding:6px; border-radius:8px; border:none; background:linear-gradient(120deg, #059669, #0284c7); color:#fff; font-weight:900; font-size:13px; cursor:pointer;">Step N: 下一步 →</button>
              </div>
            </div>
          `;

          let mode = 'ADD'; // 'ADD' or 'SUB'
          let step = 0;

          const addBtn = h.querySelector('#capAddBtn');
          const subBtn = h.querySelector('#capSubBtn');
          const stage = h.querySelector('#capCalcStage');
          const capReset = h.querySelector('#capReset');
          const capNext = h.querySelector('#capNext');

          const STEPS = {
            ADD: [
              '點擊「下一步」，觀察「2 L 600 mL ＋ 1 L 550 mL」直式。',
              'Step 1：毫升欄相加 — 600 ＋ 550 ＝ 1150 mL。',
              'Step 2：1150 mL 滿 1000 mL → 寫 150，向公升欄進 1！',
              'Step 3：公升欄：2 ＋ 1 ＋進位 1 ＝ 4 L。答案：4 L 150 mL ✅'
            ],
            SUB: [
              '點擊「下一步」，觀察「4 L 200 mL － 1 L 450 mL」直式。',
              'Step 1：毫升欄 200 不夠減 450，需向公升欄借 1 L！',
              'Step 2：借 1 L 換 1000 mL → 毫升欄變 1200 mL，1200 － 450 ＝ 750 mL。',
              'Step 3：公升欄：4L 借出 1 剩 3，3 － 1 ＝ 2 L。答案：2 L 750 mL ✅'
            ]
          };

          function renderCapCalc() {
            const isAdd = mode === 'ADD';
            let s = '';

            if (isAdd) {
              const lCol = 55, rCol = 135;
              s += TX(lCol, 18, 'L', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
              s += TX(rCol, 18, 'mL', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

              // 進位標記
              if (step >= 2) s += TX(lCol, 8, '①', { fs: 13, c: RED, anchor: 'middle', fw: '900' });

              s += TX(lCol, 46, '2', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(rCol, 46, '600', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(20, 68, '＋', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(lCol, 68, '1', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(rCol, 68, '550', { fs: 15, c: step >= 1 ? AMB : '#0f172a', anchor: 'middle', fw: '900' });

              s += `<line x1="16" y1="78" x2="175" y2="78" stroke="#0f172a" stroke-width="2"/>`;

              if (step >= 1) s += TX(rCol, 103, step >= 2 ? '150' : '1150', { fs: 15, c: step >= 2 ? GRN : AMB, anchor: 'middle', fw: '900' });
              if (step >= 3) s += TX(lCol, 103, '4', { fs: 17, c: GRN, anchor: 'middle', fw: '900' });

              // 右側說明
              s += `<rect x="185" y="8" width="175" height="130" rx="8" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>`;
              const desc = STEPS.ADD[step];
              const lines = []; let tmp = desc;
              while (tmp.length > 18) { lines.push(tmp.slice(0, 18)); tmp = tmp.slice(18); }
              lines.push(tmp);
              lines.forEach((ln, i) => { s += TX(272, 32 + i * 22, ln, { fs: 11.5, c: '#065f46', anchor: 'middle', fw: '800' }); });

            } else {
              const lCol = 55, rCol = 135;
              s += TX(lCol, 18, 'L', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
              s += TX(rCol, 18, 'mL', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

              // 借位標記
              if (step >= 1) {
                s += `<line x1="48" y1="35" x2="62" y2="51" stroke="${RED}" stroke-width="2"/>`;
                s += TX(lCol, 28, '3', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
              }
              if (step >= 2) {
                s += TX(rCol, 28, '1200', { fs: 10.5, c: RED, anchor: 'middle', fw: '900' });
              }

              s += TX(lCol, 46, '4', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(rCol, 46, '200', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(20, 68, '－', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(lCol, 68, '1', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
              s += TX(rCol, 68, '450', { fs: 15, c: step >= 1 ? AMB : '#0f172a', anchor: 'middle', fw: '900' });

              s += `<line x1="16" y1="78" x2="175" y2="78" stroke="#0f172a" stroke-width="2"/>`;

              if (step >= 2) s += TX(rCol, 103, '750', { fs: 15, c: RED, anchor: 'middle', fw: '900' });
              if (step >= 3) s += TX(lCol, 103, '2', { fs: 17, c: RED, anchor: 'middle', fw: '900' });

              s += `<rect x="185" y="8" width="175" height="130" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5"/>`;
              const desc = STEPS.SUB[step];
              const lines = []; let tmp = desc;
              while (tmp.length > 18) { lines.push(tmp.slice(0, 18)); tmp = tmp.slice(18); }
              lines.push(tmp);
              lines.forEach((ln, i) => { s += TX(272, 32 + i * 22, ln, { fs: 11.5, c: '#9f1239', anchor: 'middle', fw: '800' }); });
            }

            stage.innerHTML = `<svg viewBox="0 0 370 155" style="width:100%; height:100%;">${s}</svg>`;
            capNext.textContent = step < 3 ? `Step ${step + 1}: 下一步 →` : '✅ 完成！';
          }

          addBtn.onclick = () => {
            mode = 'ADD'; step = 0;
            addBtn.style.background = '#059669'; addBtn.style.color = '#fff'; addBtn.style.borderColor = '#059669';
            subBtn.style.background = '#fff'; subBtn.style.color = '#334155'; subBtn.style.borderColor = '#cbd5e1';
            renderCapCalc();
          };
          subBtn.onclick = () => {
            mode = 'SUB'; step = 0;
            subBtn.style.background = '#e11d48'; subBtn.style.color = '#fff'; subBtn.style.borderColor = '#e11d48';
            addBtn.style.background = '#fff'; addBtn.style.color = '#334155'; addBtn.style.borderColor = '#cbd5e1';
            renderCapCalc();
          };
          capReset.onclick = () => { step = 0; renderCapCalc(); };
          capNext.onclick = () => { step = (step + 1) % 4; renderCapCalc(); };

          renderCapCalc();
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
