/* ============ 第 4 章　乘法 ============
   依康軒國小 3 上第 4 單元：
   4-1 整十與整百的乘法
   4-2 二位數乘以一位數
   4-3 三位數乘以一位數
   4-4 乘法估算與連乘應用
   對應課綱代碼：n-II-2 理解萬以內數的加減計算與乘法運算，並能運用於生活解題與估算。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#d97706'; // 琥珀金/黃橘色主調 (Chapter 4 乘法)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  window.DECK.push({
    ch: 4,
    title: '乘法',
    color: C,
    sections: ['4-1 整十與整百的乘法', '4-2 二位數乘以一位數', '4-3 三位數乘以一位數', '4-4 乘法估算與連乘應用'],
    slides: [

      /* ==================== 4-1 整十與整百的乘法 ==================== */
      {
        sec: '4-1', secName: '整十與整百的乘法',
        title: '先算前面的數字相乘，被乘數位尾有幾個0就補幾個0',
        points: [
          '**整十乘以一位數**：例如 \\(20 \\times 3\\)。\\(20\\) 是 2 個十，\\(2 \\times 3 = 6\\) 個十，就是 <span class="k">60</span>。',
          '**整百乘以一位數**：例如 \\(200 \\times 4\\)。\\(200\\) 是 2 個百，\\(2 \\times 4 = 8\\) 個百，就是 <span class="k">800</span>。',
          '**末尾 0 快捷律**：先算前面非 0 的數字相乘，再補回末尾的 0。',
          '注意陷阱：如 \\(40 \\times 5 = 200\\)，因 \\(4 \\times 5 = 20\\) 本身帶有 0，補 0 後共有 2 個 0。'
        ],
        formula: { label: '整十整百乘法法則', tex: '20 \\times 3 = (2 \\times 3) \\times 10 = 60' },
        visual: (h) => {
          let out = '';
          // 左卡：整十乘法
          out += BOX(15, 15, 188, 225, { fill: '#fffbeb', stroke: AMB, r: 12 });
          out += TX(109, 38, '【整十乘法】20 × 3', { fs: 14, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(109, 60, '2 個十 × 3 ＝ 6 個十 ＝ 60', { fs: 12, c: '#b45309', anchor: 'middle' });

          // 積木條圖示 (3 組，每組 2 條)
          for (let g = 0; g < 3; g++) {
            const gx = 35 + g * 52;
            out += BOX(gx, 75, 42, 100, { fill: '#fef3c7', stroke: '#f59e0b', r: 6 });
            out += TX(gx + 21, 90, `第 ${g + 1} 組`, { fs: 10, c: AMB, anchor: 'middle' });
            // 2 條十格積木
            out += `<rect x="${gx + 8}" y="100" width="10" height="65" fill="${AMB}" rx="2"/>`;
            out += `<rect x="${gx + 24}" y="100" width="10" height="65" fill="${AMB}" rx="2"/>`;
          }
          out += TX(109, 212, '算式：2 × 3 ＝ 6 ➔ 20 × 3 ＝ 60', { fs: 11.5, c: RED, anchor: 'middle', fw: '900' });

          // 右卡：整百乘法
          out += BOX(217, 15, 188, 225, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(311, 38, '【整百乘法】200 × 4', { fs: 14, c: BLU, anchor: 'middle', fw: '900' });
          out += TX(311, 60, '2 個百 × 4 ＝ 8 個百 ＝ 800', { fs: 12, c: '#1e40af', anchor: 'middle' });

          // 百格板簡圖 (4 組，每組 2 個百格板)
          for (let g = 0; g < 4; g++) {
            const gx = 230 + (g % 2) * 80;
            const gy = 78 + Math.floor(g / 2) * 58;
            out += BOX(gx, gy, 70, 50, { fill: '#dbeafe', stroke: '#3b82f6', r: 6 });
            out += `<rect x="${gx + 8}" y="${gy + 10}" width="24" height="30" fill="${BLU}" rx="3"/>`;
            out += `<rect x="${gx + 38}" y="${gy + 10}" width="24" height="30" fill="${BLU}" rx="3"/>`;
            out += TX(gx + 35, gy + 46, `200`, { fs: 10, c: BLU, anchor: 'middle' });
          }
          out += TX(311, 212, '算式：2 × 4 ＝ 8 ➔ 200 × 4 ＝ 800', { fs: 11.5, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '被乘數代表「幾個十」或「幾個百」，相乘後把 0 補回末尾即為答案。',
        example: {
          q: '一包紅包有 500 元，小明拿到 4 包，共有多少元？',
          steps: [
            '1. 算式：500 × 4。',
            '2. 先算 5 × 4 ＝ 20。',
            '3. 500 末尾有 2 個 0，所以 20 後面補 2 個 0 ➔ 2000 元。'
          ],
          ans: '2000 元'
        }
      },

      /* ==================== 4-1 互動教具：整十/整百乘法與末尾 0 規律推演器 ==================== */
      {
        sec: '4-1', secName: '整十與整百的乘法',
        title: '【末尾 0 規律】整十/整百乘法與積木陣列動態推演器',
        points: [
          '切換「整十乘法」或「整百乘法」，並調整位數與乘數 (1~9)。',
          '觀察基礎乘法 (A × B) 如何延伸到末尾加 0 (A0 × B = C0)！',
          '特別觀察相乘產生額外 0 的題目（如 40 × 5 ＝ 200）。'
        ],
        formula: { label: '補 0 規律', tex: 'A00 \\times B = (A \\times B)00' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; gap:10px; margin-bottom:10px;">
                <button id="m10Btn" style="flex:1; padding:6px; border-radius:8px; border:1.5px solid #d97706; background:#d97706; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">整十乘法 (10, 20, 30...)</button>
                <button id="m100Btn" style="flex:1; padding:6px; border-radius:8px; border:1.5px solid #cbd5e1; background:#fff; color:#334155; font-weight:900; font-size:13px; cursor:pointer;">整百乘法 (100, 200, 300...)</button>
              </div>

              <div id="mRuleStage" style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:14px; min-height:140px; text-align:center;">
                <!-- 動態展現推演過程與圖示 -->
              </div>

              <div style="margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="ictrl">
                  <label>被乘數：<span class="ival" id="baseVal">30</span></label>
                  <input type="range" id="baseSlider" min="1" max="9" value="3" step="1" style="width:100%;">
                </div>
                <div class="ictrl">
                  <label>乘數 (倍數)：<span class="ival" id="kVal">4</span></label>
                  <input type="range" id="kSlider" min="1" max="9" value="4" step="1" style="width:100%;">
                </div>
              </div>
            </div>
          `;

          let type = 10; // 10 or 100
          const m10Btn = h.querySelector('#m10Btn');
          const m100Btn = h.querySelector('#m100Btn');
          const bSlider = h.querySelector('#baseSlider');
          const kSlider = h.querySelector('#kSlider');
          const baseVal = h.querySelector('#baseVal');
          const kVal = h.querySelector('#kVal');
          const stage = h.querySelector('#mRuleStage');

          function renderRule() {
            const digit = parseInt(bSlider.value, 10);
            const k = parseInt(kSlider.value, 10);
            const num = digit * type;
            const baseProd = digit * k;
            const finalProd = num * k;

            baseVal.textContent = num;
            kVal.textContent = k;

            let s = '';
            s += `<div style="font-size:22px; font-weight:900; color:#0f172a; margin-bottom:8px;">`;
            s += `<span style="color:#d97706;">${num}</span> × <span style="color:#2563eb;">${k}</span> ＝ <span style="color:#e11d48;">${finalProd}</span>`;
            s += `</div>`;

            // 推演三步驟解析
            s += `<div style="display:flex; justify-content:center; align-items:center; gap:8px; flex-wrap:wrap; font-size:13px; font-weight:800; color:#334155;">`;
            s += `<div style="background:#fff; border:1px solid #d97706; padding:6px 12px; border-radius:8px;">1️⃣ 基礎乘法：${digit} × ${k} ＝ <b>${baseProd}</b></div>`;
            s += `<span>➔</span>`;
            s += `<div style="background:#fff; border:1px solid #e11d48; padding:6px 12px; border-radius:8px;">2️⃣ 補末尾 ${type === 10 ? '1' : '2'} 個 0 ➔ <b style="color:#e11d48; font-size:15px;">${finalProd}</b></div>`;
            s += `</div>`;

            // 視覺圖示 (被乘數的陣列)
            let svgStr = '';
            const boxCount = Math.min(k, 6);
            for (let b = 0; b < boxCount; b++) {
              const bx = 20 + b * 60;
              svgStr += `<rect x="${bx}" y="10" width="52" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>`;
              svgStr += `<text x="${bx + 26}" y="32" text-anchor="middle" font-size="12" font-weight="900" fill="#b45309">${num}</text>`;
            }
            if (k > 6) {
              svgStr += `<text x="${20 + 6 * 60}" y="32" font-size="14" font-weight="900" fill="#d97706">... 共 ${k} 組</text>`;
            }

            s += `<div style="margin-top:10px;">${svg('0 0 400 55', svgStr)}</div>`;
            stage.innerHTML = s;
          }

          m10Btn.onclick = () => {
            type = 10;
            m10Btn.style.background = '#d97706'; m10Btn.style.color = '#fff'; m10Btn.style.borderColor = '#d97706';
            m100Btn.style.background = '#fff'; m100Btn.style.color = '#334155'; m100Btn.style.borderColor = '#cbd5e1';
            renderRule();
          };
          m100Btn.onclick = () => {
            type = 100;
            m100Btn.style.background = '#d97706'; m100Btn.style.color = '#fff'; m100Btn.style.borderColor = '#d97706';
            m10Btn.style.background = '#fff'; m10Btn.style.color = '#334155'; m10Btn.style.borderColor = '#cbd5e1';
            renderRule();
          };

          bSlider.oninput = renderRule;
          kSlider.oninput = renderRule;
          renderRule();
        },
        caption: '無論是整十還是整百，將非 0 數字相乘後補回相同數量的 0 即可快速完成計算。',
        example: {
          q: '計算 600 × 5 的結果是多少？',
          steps: [
            '1. 先算 6 × 5 ＝ 30。',
            '2. 600 末尾有 2 個 0。',
            '3. 在 30 後面補上 2 個 0 ➔ 3000。'
          ],
          ans: '3000'
        }
      },

      /* ==================== 4-2 二位數乘以一位數 ==================== */
      {
        sec: '4-2', secName: '二位數乘以一位數',
        title: '將二位數拆成「幾個十」與「幾個一」分別相乘',
        points: [
          '二位數乘法的核心：<span class="k">位值拆解觀念</span>（乘法分配律概念）。',
          '例如 \\(43 \\times 2\\)：個位 \\(3 \\times 2 = 6\\)、十位 \\(40 \\times 2 = 80\\)，合計 <span class="k">86</span>。',
          '**直式進位**（如 \\(36 \\times 4\\)）：',
          '個位 \\(6 \\times 4 = 24\\)，寫 4 向十位進 2 (②)。',
          '十位 \\(3 \\times 4 = 12\\)，加上進位的 2 變 \\(14\\)，結果為 <span class="k">144</span>。'
        ],
        formula: { label: '拆解法則', tex: '(30 + 6) \\times 4 = 30 \\times 4 + 6 \\times 4 = 120 + 24 = 144' },
        visual: (h) => {
          let out = '';
          // 左邊：不進位直式與拆解
          out += BOX(15, 15, 188, 225, { fill: '#fffbeb', stroke: AMB, r: 12 });
          out += TX(109, 38, '【不進位】43 × 2', { fs: 14, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(109, 58, '43 拆成 40 與 3', { fs: 12, c: '#b45309', anchor: 'middle' });

          out += TX(75, 90, '百', { fs: 12, c: '#94a3b8', anchor: 'middle' });
          out += TX(105, 90, '十', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(135, 90, '個', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(105, 118, '4', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 118, '3', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(45, 142, '×', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 142, '2', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="40" y1="152" x2="155" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(105, 178, '8', { fs: 17, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(135, 178, '6', { fs: 17, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(109, 215, '40×2＝80, 3×2＝6', { fs: 11.5, c: AMB, anchor: 'middle', fw: '900' });

          // 右邊：進位直式 (36 × 4)
          out += BOX(217, 15, 188, 225, { fill: '#fff1f2', stroke: RED, r: 12 });
          out += TX(311, 38, '【含進位】36 × 4', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
          out += TX(311, 58, '個位滿 20 向十位進 2', { fs: 12, c: '#9f1239', anchor: 'middle' });

          out += TX(267, 90, '百', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(297, 90, '十', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(327, 90, '個', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(297, 76, '②', { fs: 13, c: RED, anchor: 'middle', fw: '900' });

          out += TX(297, 118, '3', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(327, 118, '6', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(237, 142, '×', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(327, 142, '4', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="232" y1="152" x2="347" y2="152" stroke="#0f172a" stroke-width="2"/>`;

          out += TX(267, 178, '1', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(297, 178, '4', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(327, 178, '4', { fs: 17, c: RED, anchor: 'middle', fw: '900' });
          out += TX(311, 215, '6×4＝24, 30×4＋20＝140', { fs: 11, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '個位相乘結果滿幾十，就向十位進幾；十位乘完後要記得把進上來的數字加上去。',
        example: {
          q: '一包餅乾有 48 塊，買了 3 包，一共有多少塊餅乾？',
          steps: [
            '1. 直式計算 48 × 3。',
            '2. 個位：8 × 3 ＝ 24 ➔ 寫 4，向十位進 2 (②)。',
            '3. 十位：4 × 3 ＝ 12 ➔ 12 ＋ 2 (進位) ＝ 14。',
            '4. 得到 144 塊。'
          ],
          ans: '144 塊'
        }
      },

      /* ==================== 4-2 互動教具：二位數乘法 CPA 面積拆解對照器 ==================== */
      {
        sec: '4-2', secName: '二位數乘以一位數',
        title: '【CPA 矩形面積拆解】二位數乘法直式與區域面積對照器',
        points: [
          '拉動「被乘數 (二位數)」與「乘數 (一位數)」。',
          '觀察左側「矩形區域面積」如何將二位數拆解成十位（長方形）與個位（小長方形）。',
          '右側同步對照直式計算的每一步算式！'
        ],
        formula: { label: '面積拆解法則', tex: '(\\text{十位} + \\text{個位}) \\times \\text{乘數}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div id="cpaAreaStage" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:12px; height:185px;">
                <!-- SVG 圖案由 JS 繪製 -->
              </div>

              <div style="margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="ictrl">
                  <label>被乘數 (10~99)：<span class="ival" id="cpaNumVal">36</span></label>
                  <input type="range" id="cpaNumSlider" min="12" max="98" value="36" step="1" style="width:100%;">
                </div>
                <div class="ictrl">
                  <label>乘數 (1~9)：<span class="ival" id="cpaKVal">4</span></label>
                  <input type="range" id="cpaKSlider" min="2" max="9" value="4" step="1" style="width:100%;">
                </div>
              </div>
            </div>
          `;

          const numSlider = h.querySelector('#cpaNumSlider');
          const kSlider = h.querySelector('#cpaKSlider');
          const numVal = h.querySelector('#cpaNumVal');
          const kVal = h.querySelector('#cpaKVal');
          const stage = h.querySelector('#cpaAreaStage');

          function renderCPA() {
            const N = parseInt(numSlider.value, 10);
            const K = parseInt(kSlider.value, 10);
            const tens = Math.floor(N / 10) * 10;
            const ones = N % 10;

            const areaTens = tens * K;
            const areaOnes = ones * K;
            const total = N * K;

            numVal.textContent = N;
            kVal.textContent = K;

            let s = '';
            // 左半部：矩形面積拆解圖
            s += `<g transform="translate(10, 15)">`;
            s += TX(80, 12, `${N} (拆成 ${tens} ＋ ${ones})`, { fs: 12, c: '#334155', anchor: 'middle', fw: '900' });

            // 十位矩形
            const tensW = 100;
            const onesW = 40;
            const rectH = 80;

            s += `<rect x="10" y="20" width="${tensW}" height="${rectH}" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8" rx="4"/>`;
            s += TX(10 + tensW / 2, 20 + rectH / 2, `${tens} × ${K} = ${areaTens}`, { fs: 11.5, c: AMB, anchor: 'middle', fw: '900' });

            // 個位矩形
            s += `<rect x="${10 + tensW}" y="20" width="${onesW}" height="${rectH}" fill="#fee2e2" stroke="#ef4444" stroke-width="1.8" rx="4"/>`;
            s += TX(10 + tensW + onesW / 2, 20 + rectH / 2, `${ones}×${K}=${areaOnes}`, { fs: 10.5, c: RED, anchor: 'middle', fw: '900' });

            s += TX(10 + (tensW + onesW) / 2, 20 + rectH + 20, `總面積 ＝ ${areaTens} ＋ ${areaOnes} ＝ ${total}`, { fs: 12.5, c: BLU, anchor: 'middle', fw: '900' });
            s += `</g>`;

            // 右半部：對照直式
            s += `<g transform="translate(240, 15)">`;
            s += BOX(0, 0, 130, 150, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
            s += TX(65, 20, '直式計算對照', { fs: 12, c: '#64748b', anchor: 'middle', fw: '800' });

            const digitTen = Math.floor(N / 10);
            s += TX(55, 48, digitTen.toString(), { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += TX(85, 48, ones.toString(), { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += TX(25, 72, '×', { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });
            s += TX(85, 72, K.toString(), { fs: 16, c: '#0f172a', anchor: 'middle', fw: '900' });

            s += `<line x1="20" y1="80" x2="110" y2="80" stroke="#0f172a" stroke-width="1.8"/>`;

            const carry = Math.floor(areaOnes / 10);
            if (carry > 0) {
              s += TX(55, 34, `(${carry})`, { fs: 11, c: RED, anchor: 'middle', fw: '900' });
            }

            const resStr = total.toString();
            s += TX(65, 110, resStr, { fs: 18, c: RED, anchor: 'middle', fw: '900' });
            s += `</g>`;

            stage.innerHTML = `<svg viewBox="0 0 380 180" style="width:100%; height:100%;">${s}</svg>`;
          }

          numSlider.oninput = renderCPA;
          kSlider.oninput = renderCPA;
          renderCPA();
        },
        caption: '把二位數拆成十位與個位分別乘以乘數，兩區域面積相加就是直式計算的解答。',
        example: {
          q: '用拆解法計算 36 × 4 的結果？',
          steps: [
            '1. 36 拆成 30 與 6。',
            '2. 30 × 4 ＝ 120。',
            '3. 6 × 4 ＝ 24。',
            '4. 120 ＋ 24 ＝ 144。'
          ],
          ans: '144'
        }
      },

      /* ==================== 4-3 三位數乘以一位數 ==================== */
      {
        sec: '4-3', secName: '三位數乘以一位數',
        title: '個、十、百位依序相乘，注意「中間有0」的進位陷阱',
        points: [
          '**三位數直式計算**：由右至左依序算「個位相乘 ➔ 十位相乘 ➔ 百位相乘」。',
          '**一般進位**（如 \\(158 \\times 5 = 790\\)）：個位 \\(8 \\times 5 = 40\\) 進 4，十位 \\(5 \\times 5 = 25\\) 加上進位的 4 變 29，進 2 到百位。',
          '⚠️ **中間有 0 陷阱題**（如 \\(205 \\times 8\\)）：',
          '十位是 0，\\(0 \\times 8 = 0\\)，但必須把個位進上來的 4 <span class="k">直接寫在十位</span>！',
          '最終答案：<span class="k">1640</span>（千萬不要漏加進上來的數！）。'
        ],
        formula: { label: '中間有0法則', tex: '205 \\times 8 \\Rightarrow (0 \\times 8) + 4 = 4' },
        visual: (h) => {
          let out = '';
          // 左邊：一般三位數 (158 × 5)
          out += BOX(15, 15, 188, 225, { fill: '#ecfdf5', stroke: GRN, r: 12 });
          out += TX(109, 38, '【多次進位】158 × 5', { fs: 14, c: GRN, anchor: 'middle', fw: '900' });

          out += TX(50, 85, '千', { fs: 11, c: '#94a3b8', anchor: 'middle' });
          out += TX(75, 85, '百', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(105, 85, '十', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(135, 85, '個', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(75, 70, '②', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
          out += TX(105, 70, '④', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          out += TX(75, 110, '1', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(105, 110, '5', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 110, '8', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(35, 134, '×', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(135, 134, '5', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="30" y1="144" x2="155" y2="144" stroke="#0f172a" stroke-width="1.8"/>`;

          out += TX(75, 168, '7', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
          out += TX(105, 168, '9', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
          out += TX(135, 168, '0', { fs: 16, c: RED, anchor: 'middle', fw: '900' });

          out += TX(109, 212, '8×5=40, 5×5+4=29, 1×5+2=7', { fs: 10.5, c: GRN, anchor: 'middle', fw: '800' });

          // 右邊：中間有 0 陷阱題 (205 × 8)
          out += BOX(217, 15, 188, 225, { fill: '#fff1f2', stroke: RED, r: 12 });
          out += TX(311, 38, '⚠️【中間有0陷阱】205 × 8', { fs: 13.5, c: RED, anchor: 'middle', fw: '900' });

          out += TX(242, 85, '千', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(267, 85, '百', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(297, 85, '十', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });
          out += TX(327, 85, '個', { fs: 12, c: '#64748b', anchor: 'middle', fw: '900' });

          out += TX(297, 70, '④', { fs: 12, c: RED, anchor: 'middle', fw: '900' });

          out += TX(267, 110, '2', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(297, 110, '0', { fs: 15, c: RED, anchor: 'middle', fw: '900' });
          out += TX(327, 110, '5', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(227, 134, '×', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });
          out += TX(327, 134, '8', { fs: 15, c: '#0f172a', anchor: 'middle', fw: '900' });

          out += `<line x1="222" y1="144" x2="347" y2="144" stroke="#0f172a" stroke-width="1.8"/>`;

          out += TX(242, 168, '1', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
          out += TX(267, 168, '6', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
          out += TX(297, 168, '4', { fs: 16, c: RED, anchor: 'middle', fw: '900' });
          out += TX(327, 168, '0', { fs: 16, c: RED, anchor: 'middle', fw: '900' });

          out += TX(311, 212, '十位 0×8＝0 加上進位 4 ➔ 4', { fs: 11, c: RED, anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '當十位數是 0 時，0 乘以任何數都是 0，但如果個位有進位，要記得把進位的數字寫在十位。',
        example: {
          q: '一個遊樂園門票 205 元，買了 8 張，一共要付多少元？',
          steps: [
            '1. 直式計算 205 × 8。',
            '2. 個位：5 × 8 ＝ 40 ➔ 寫 0，進 4 到十位 (④)。',
            '3. 十位：0 × 8 ＝ 0 ➔ 0 ＋ 4 (進位) ＝ 4 ➔ 十位寫 4。',
            '4. 百位：2 × 8 ＝ 16 ➔ 百位寫 6，千位寫 1。',
            '5. 得到 1640 元。'
          ],
          ans: '1640 元'
        }
      },

      /* ==================== 4-3 互動教具：三位數乘法直式步驟解剖器 ==================== */
      {
        sec: '4-3', secName: '三位數乘以一位數',
        title: '【直式分步解剖】三位數乘法（含中間有0特效陷阱）步驟推演器',
        points: [
          '點擊「下一步 Step」觀察三位數乘法直式運算。',
          '可切換「【一般三位數】158 × 5」與「【中間有0陷阱】205 × 8」。',
          '特別注意十位數是 0 時，進位數字如何填入十位！'
        ],
        formula: { label: '運算順序', tex: '\\text{個位相乘} \\rightarrow \\text{十位相乘(加進位)} \\rightarrow \\text{百位相乘}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="display:flex; gap:10px; margin-bottom:10px;">
                <button id="tModeNormal" style="flex:1; padding:6px; border-radius:8px; border:1.5px solid #059669; background:#059669; color:#fff; font-weight:900; font-size:13px; cursor:pointer;">【一般三位數】158 × 5</button>
                <button id="tModeZero" style="flex:1; padding:6px; border-radius:8px; border:1.5px solid #cbd5e1; background:#fff; color:#334155; font-weight:900; font-size:13px; cursor:pointer;">⚠️【中間有0陷阱】205 × 8</button>
              </div>

              <div id="threeSimStage" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:12px; height:185px;">
                <!-- 動態展現 -->
              </div>

              <div style="display:flex; gap:10px; align-items:center; margin-top:10px;">
                <button id="threeResetBtn" style="padding:6px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#fff; font-weight:800; font-size:13px; cursor:pointer;">↺ 重置</button>
                <button id="threeNextBtn" style="flex:1; padding:7px; border-radius:8px; border:none; background:linear-gradient(120deg, #d97706, #e11d48); color:#fff; font-weight:900; font-size:14px; cursor:pointer; box-shadow:0 4px 12px rgba(217,119,6,0.25);">下一步 Step →</button>
              </div>
            </div>
          `;

          let mode = 'NORMAL'; // 'NORMAL' or 'ZERO'
          let step = 0; // 0, 1, 2, 3

          const stage = h.querySelector('#threeSimStage');
          const nBtn = h.querySelector('#tModeNormal');
          const zBtn = h.querySelector('#tModeZero');
          const rBtn = h.querySelector('#threeResetBtn');
          const xBtn = h.querySelector('#threeNextBtn');

          function renderThree() {
            let out = '';
            const thX = 100, bX = 140, tX = 180, oX = 220, startY = 35;

            // 位值標題
            out += TX(thX, startY, '千', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
            out += TX(bX, startY, '百', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
            out += TX(tX, startY, '十', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });
            out += TX(oX, startY, '個', { fs: 13, c: '#64748b', anchor: 'middle', fw: '900' });

            if (mode === 'NORMAL') {
              // 158 × 5
              out += TX(bX, startY + 30, '1', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });
              out += TX(tX, startY + 30, '5', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });
              out += TX(oX, startY + 30, '8', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });

              out += TX(thX - 35, startY + 55, '×', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });
              out += TX(oX, startY + 55, '5', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });

              out += `<line x1="${thX - 45}" y1="${startY + 66}" x2="${oX + 25}" y2="${startY + 66}" stroke="#0f172a" stroke-width="2"/>`;

              if (step >= 1) {
                out += TX(tX, startY + 12, '④', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX, startY + 92, '0', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 45, '8×5＝40 (寫0進4)', { fs: 11.5, c: RED, fw: '800' });
              }
              if (step >= 2) {
                out += TX(bX, startY + 12, '②', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
                out += TX(tX, startY + 92, '9', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 65, '5×5＋4＝29 (寫9進2)', { fs: 11.5, c: RED, fw: '800' });
              }
              if (step >= 3) {
                out += TX(bX, startY + 92, '7', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 85, '1×5＋2＝7 ➔ 790', { fs: 12, c: GRN, fw: '900' });
              }
            } else {
              // 205 × 8
              out += TX(bX, startY + 30, '2', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });
              out += TX(tX, startY + 30, '0', { fs: 18, c: RED, anchor: 'middle', fw: '900' });
              out += TX(oX, startY + 30, '5', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });

              out += TX(thX - 35, startY + 55, '×', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });
              out += TX(oX, startY + 55, '8', { fs: 18, c: '#0f172a', anchor: 'middle', fw: '900' });

              out += `<line x1="${thX - 45}" y1="${startY + 66}" x2="${oX + 25}" y2="${startY + 66}" stroke="#0f172a" stroke-width="2"/>`;

              if (step >= 1) {
                out += TX(tX, startY + 12, '④', { fs: 14, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX, startY + 92, '0', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 45, '5×8＝40 (寫0進4)', { fs: 11.5, c: RED, fw: '800' });
              }
              if (step >= 2) {
                out += TX(tX, startY + 92, '4', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 65, '0×8＋4＝4 (十位寫4)', { fs: 11.5, c: RED, fw: '900' });
              }
              if (step >= 3) {
                out += TX(thX, startY + 92, '1', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(bX, startY + 92, '6', { fs: 19, c: RED, anchor: 'middle', fw: '900' });
                out += TX(oX + 45, startY + 85, '2×8＝16 ➔ 1640', { fs: 12, c: GRN, fw: '900' });
              }
            }

            // 說明文字
            let desc = '';
            if (step === 0) desc = '點擊「下一步 Step」開啟直式計算分步推演。';
            else if (step === 1) desc = mode === 'NORMAL' ? '【Step 1】個位相乘：8 × 5 ＝ 40，寫 0 進 4 到十位。' : '【Step 1】個位相乘：5 × 8 ＝ 40，寫 0 進 4 到十位。';
            else if (step === 2) desc = mode === 'NORMAL' ? '【Step 2】十位相乘：5 × 5 ＝ 25，加上進位的 4 變成 29，寫 9 進 2 到百位。' : '【Step 2】十位相乘：0 × 8 ＝ 0，加上個位進上來的 4 變 4，十位寫 4！';
            else desc = mode === 'NORMAL' ? '【Step 3】百位相乘：1 × 5 ＝ 5，加上進位的 2 變 7。答案為 790。' : '【Step 3】百位相乘：2 × 8 ＝ 16，百位寫 6、千位寫 1。答案為 1640。';

            out += BOX(15, 135, 350, 36, { fill: '#fff', stroke: '#cbd5e1', r: 8 });
            out += TX(190, 157, desc, { fs: 12, c: '#0f172a', anchor: 'middle', fw: '800' });

            stage.innerHTML = `<svg viewBox="0 0 380 180" style="width:100%; height:100%;">${out}</svg>`;
          }

          nBtn.onclick = () => {
            mode = 'NORMAL'; step = 0;
            nBtn.style.background = '#059669'; nBtn.style.color = '#fff'; nBtn.style.borderColor = '#059669';
            zBtn.style.background = '#fff'; zBtn.style.color = '#334155'; zBtn.style.borderColor = '#cbd5e1';
            renderThree();
          };
          zBtn.onclick = () => {
            mode = 'ZERO'; step = 0;
            zBtn.style.background = '#059669'; zBtn.style.color = '#fff'; zBtn.style.borderColor = '#059669';
            nBtn.style.background = '#fff'; nBtn.style.color = '#334155'; nBtn.style.borderColor = '#cbd5e1';
            renderThree();
          };

          rBtn.onclick = () => { step = 0; renderThree(); };
          xBtn.onclick = () => { step = (step + 1) % 4; renderThree(); };

          renderThree();
        },
        caption: '觀察十位數為 0 時的處理步驟，確保個位進上來的數字能精準累加寫在十位。',
        example: {
          q: '計算 306 × 4 的結果是多少？',
          steps: [
            '1. 個位：6 × 4 ＝ 24 ➔ 寫 4，進 2 到十位。',
            '2. 十位：0 × 4 ＝ 0 ➔ 0 ＋ 2 (進位) ＝ 2 ➔ 十位寫 2。',
            '3. 百位：3 × 4 ＝ 12 ➔ 百位寫 2，千位寫 1。',
            '4. 得到 1224。'
          ],
          ans: '1224'
        }
      },

      /* ==================== 4-4 乘法估算與連乘應用 ==================== */
      {
        sec: '4-4', secName: '乘法估算與連乘應用',
        title: '把數字看成最接近的整十估算，以及兩步驟連乘應用',
        points: [
          '**乘法估算**：當不需要精確數值或進行快速心算時，將二位數或三位數看成最接近的整十或整百。',
          '例如：每本故事書 29 元，買 7 本大約多少元？看成 \\(30 \\times 7 = 210\\) 元。',
          '**兩步驟連乘應用**：先算每組多少，再算總共有幾組。',
          '例如：每盒餅乾有 6 塊，每箱有 5 盒，買 4 箱一共有幾塊？',
          '算式：\\(6 \\times 5 = 30\\)（一箱塊數），\\(30 \\times 4 = 120\\) 塊。'
        ],
        formula: { label: '估算與連乘', tex: '29 \\times 7 \\approx 30 \\times 7 = 210 \\quad | \\quad (6 \\times 5) \\times 4 = 120' },
        visual: (h) => {
          let out = '';
          // 左卡：估算對照
          out += BOX(15, 15, 188, 225, { fill: '#fffbeb', stroke: AMB, r: 12 });
          out += TX(109, 38, '🎯【乘法估算】', { fs: 14, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(109, 60, '每本 29 元，買 7 本約多少？', { fs: 11.5, c: '#b45309', anchor: 'middle' });

          out += TX(109, 95, '29 看成最接近的 30', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
          out += TX(109, 125, '30 × 7 ＝ 210 (元)', { fs: 17, c: AMB, anchor: 'middle', fw: '900' });
          out += TX(109, 155, '(精確值：29 × 7 ＝ 203 元)', { fs: 11.5, c: '#64748b', anchor: 'middle' });
          out += TX(109, 195, '估算結果 210 元非常接近！', { fs: 12, c: GRN, anchor: 'middle', fw: '900' });

          // 右卡：兩步驟連乘
          out += BOX(217, 15, 188, 225, { fill: '#eff6ff', stroke: BLU, r: 12 });
          out += TX(311, 38, '📦【兩步驟連乘】', { fs: 14, c: BLU, anchor: 'middle', fw: '900' });
          out += TX(311, 60, '每盒 6 塊，一箱 5 盒，買 4 箱', { fs: 11, c: '#1e40af', anchor: 'middle' });

          out += BOX(232, 85, 158, 42, { fill: '#dbeafe', stroke: stroke = '#3b82f6', r: 6 });
          out += TX(311, 103, '步驟 1: 6 × 5 ＝ 30 (塊/箱)', { fs: 11.5, c: BLU, anchor: 'middle', fw: '900' });

          out += TX(311, 140, '↓', { fs: 14, c: BLU, anchor: 'middle' });

          out += BOX(232, 152, 158, 42, { fill: '#eff6ff', stroke: RED, r: 6 });
          out += TX(311, 170, '步驟 2: 30 × 4 ＝ 120 (塊)', { fs: 11.5, c: RED, anchor: 'middle', fw: '900' });

          out += TX(311, 212, '連乘算式：6 × 5 × 4 ＝ 120', { fs: 11.5, c: '#0f172a', anchor: 'middle', fw: '900' });

          h.innerHTML = svg('0 0 420 250', out);
        },
        caption: '估算時把數字看成最接近的整十或整百，能幫助快速判斷答案的大致範圍。',
        example: {
          q: '一包軟糖有 12 顆，一盒裝 5 包，買 3 盒共有多少顆軟糖？',
          steps: [
            '1. 先算一盒有幾顆：12 × 5 ＝ 60 (顆)。',
            '2. 再算 3 盒共有幾顆：60 × 3 ＝ 180 (顆)。',
            '3. 答：180 顆。'
          ],
          ans: '180 顆'
        }
      },

      /* ==================== 4-4 互動教具：生活購物連乘與估算模擬器 ==================== */
      {
        sec: '4-4', secName: '乘法估算與連乘應用',
        title: '【生活購物】兩步驟連乘與精準 vs 估算對照模擬器',
        points: [
          '選擇購物商品，調整每包件數與購買包數。',
          '下方即時同步輸出「精準兩步驟連乘」與「整十估算結果」。',
          '體會估算在生活購物中的便利性！'
        ],
        formula: { label: '精確 vs 估算', tex: '\\text{單價} \\times \\text{件數} \\times \\text{包數} \\approx \\text{估算單價} \\times \\text{件數} \\times \\text{包數}' },
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%; font-family:sans-serif;">
              <div style="background:#fff1f2; border:1.5px solid #e11d48; border-radius:12px; padding:12px; margin-bottom:10px;">
                <div style="font-size:13px; font-weight:800; color:#9f1239;">選擇購物商品：</div>
                <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap;">
                  <button class="shop-btn active" data-p="38" data-n="繪本" style="padding:4px 10px; border-radius:6px; border:1px solid #e11d48; background:#e11d48; color:#fff; font-weight:800; font-size:12px; cursor:pointer;">繪本 ($38/本)</button>
                  <button class="shop-btn" data-p="49" data-n="彩色筆" style="padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">彩色筆 ($49/盒)</button>
                  <button class="shop-btn" data-p="98" data-n="樂高包" style="padding:4px 10px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:800; font-size:12px; cursor:pointer;">樂高包 ($98/包)</button>
                </div>
              </div>

              <div id="shopSimStage" style="background:#fff; border:1px solid #cbd5e1; border-radius:10px; padding:12px; min-height:125px;">
                <!-- 圖解結果由 JS 呈現 -->
              </div>

              <div style="margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="ictrl">
                  <label>每套件數：<span class="ival" id="shopItemVal">2</span></label>
                  <input type="range" id="shopItemSlider" min="1" max="6" value="2" step="1" style="width:100%;">
                </div>
                <div class="ictrl">
                  <label>購買套數：<span class="ival" id="shopPackVal">4</span></label>
                  <input type="range" id="shopPackSlider" min="1" max="8" value="4" step="1" style="width:100%;">
                </div>
              </div>
            </div>
          `;

          let price = 38;
          let prodName = '繪本';

          const btns = h.querySelectorAll('.shop-btn');
          const itemS = h.querySelector('#shopItemSlider');
          const packS = h.querySelector('#shopPackSlider');
          const itemVal = h.querySelector('#shopItemVal');
          const packVal = h.querySelector('#shopPackVal');
          const stage = h.querySelector('#shopSimStage');

          function renderShop() {
            const items = parseInt(itemS.value, 10);
            const packs = parseInt(packS.value, 10);

            itemVal.textContent = items;
            packVal.textContent = packs;

            const estPrice = Math.round(price / 10) * 10;
            const exactTotal = price * items * packs;
            const estTotal = estPrice * items * packs;

            let s = '';
            s += `<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">`;

            // 精確計算
            s += `<div style="background:#f0fdf4; border:1px solid #059669; border-radius:8px; padding:10px;">`;
            s += `<div style="font-size:13px; font-weight:900; color:#047857;">💯 精確兩步驟連乘：</div>`;
            s += `<div style="font-size:12px; color:#334155; margin-top:4px;">1. 單套金額：${price} × ${items} ＝ ${price * items} 元</div>`;
            s += `<div style="font-size:12px; color:#334155;">2. 總共金額：${price * items} × ${packs} ＝ <b style="color:#059669; font-size:15px;">${exactTotal} 元</b></div>`;
            s += `</div>`;

            // 估算計算
            s += `<div style="background:#fffbeb; border:1px solid #d97706; border-radius:8px; padding:10px;">`;
            s += `<div style="font-size:13px; font-weight:900; color:#b45309;">🎯 整十快速估算：</div>`;
            s += `<div style="font-size:12px; color:#334155; margin-top:4px;">${price} 看成最接近的 <b>${estPrice}</b></div>`;
            s += `<div style="font-size:12px; color:#334155;">估算金額：${estPrice} × ${items} × ${packs} ＝ <b style="color:#d97706; font-size:15px;">${estTotal} 元</b></div>`;
            s += `</div>`;

            s += `</div>`;

            const diff = Math.abs(exactTotal - estTotal);
            s += `<div style="margin-top:8px; text-align:center; font-size:12.5px; font-weight:800; color:#475569;">`;
            s += `估算與精確值相差僅 <span style="color:#e11d48;">${diff}</span> 元，估算非常便利實用！`;
            s += `</div>`;

            stage.innerHTML = s;
          }

          btns.forEach(btn => {
            btn.onclick = () => {
              btns.forEach(b => {
                b.style.background = '#fff'; b.style.color = '#334155'; b.style.borderColor = '#cbd5e1';
              });
              btn.style.background = '#e11d48'; btn.style.color = '#fff'; btn.style.borderColor = '#e11d48';
              price = parseInt(btn.dataset.p, 10);
              prodName = btn.dataset.n;
              renderShop();
            };
          });

          itemS.oninput = renderShop;
          packS.oninput = renderShop;
          renderShop();
        },
        caption: '估算時將價格湊成最接近的整十或整百，能幫助快速算出一份訂單大約需要多少預算。',
        example: {
          q: '一包餅乾 49 元，小明買了 2 包，大約要花幾十元？精確算出來是多少元？',
          steps: [
            '1. 估算：49 元看成 50 元 ➔ 50 × 2 ＝ 100 元 (約 100 元)。',
            '2. 精確計算：49 × 2 ＝ 98 元。',
            '3. 答：約 100 元，精確算出來是 98 元。'
          ],
          ans: '約 100 元 (精確 98 元)'
        }
      }
    ]
  });
})();
