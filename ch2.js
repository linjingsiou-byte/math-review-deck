/* ============ 第 2 章　四位數的加減 ============
   節次：2-1 四位數的加法、2-2 四位數的減法、2-3 加減估算與應用驗算、2-4 易錯關卡
   對應課綱代碼：n-II-2 理解萬以內數的加減計算，並能運用於生活解題與估算。
   課綱邊界：不含萬以上的大數計算、不含小數/分數加減、不含異分母。
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#7c3aed'; // 紫色主調 (Chapter 2)
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  const TX = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" ${o.anchor ? `text-anchor="${o.anchor}"` : ''} font-size="${o.fs || 14}" font-weight="${o.fw || 800}" fill="${o.c || '#172033'}">${s}</text>`;
  const BOX = (x, y, w, h, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 10}" fill="${o.fill || '#fff'}" stroke="${o.stroke || '#dce3ee'}" stroke-width="${o.sw || 1.8}"/>`;

  /* ================= 實體積木繪製模組 (CPA 國小三年級專用) ================= */
  // 1. 個位小方塊 (12x12)
  function drawUnitCube(x, y, color = '#e11d48') {
    return `<g transform="translate(${x},${y})">
      <rect width="12" height="12" rx="2" fill="${color}" stroke="#9f1239" stroke-width="1.2"/>
      <rect x="2" y="2" width="4" height="4" rx="1" fill="#fff" opacity="0.35"/>
    </g>`;
  }

  // 2. 十位長條積木 (12x60, 內含10小格)
  function drawTenRod(x, y, color = '#7c3aed') {
    let out = `<g transform="translate(${x},${y})">
      <rect width="12" height="60" rx="2" fill="${color}" stroke="#5b21b6" stroke-width="1.2"/>`;
    for (let i = 1; i < 10; i++) {
      out += `<line x1="1" y1="${i * 6}" x2="11" y2="${i * 6}" stroke="#ffffff" stroke-width="0.8" opacity="0.6"/>`;
    }
    out += `<rect x="2" y="2" width="4" height="4" rx="1" fill="#fff" opacity="0.35"/></g>`;
    return out;
  }

  // 3. 百位百格板 (45x45, 內含10x10格)
  function drawHundredGrid(x, y, color = '#059669') {
    let out = `<g transform="translate(${x},${y})">
      <rect width="45" height="45" rx="3" fill="${color}" stroke="#065f46" stroke-width="1.2"/>`;
    for (let i = 1; i < 9; i++) {
      out += `<line x1="${i * 5}" y1="1" x2="${i * 5}" y2="44" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>`;
      out += `<line x1="1" y1="${i * 5}" x2="44" y2="${i * 5}" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>`;
    }
    out += `<rect x="2" y="2" width="8" height="8" rx="1" fill="#fff" opacity="0.35"/></g>`;
    return out;
  }

  // 4. 千位立體塊 (45x45 3D)
  function drawThousandCube(x, y, color = '#0284c7') {
    return `<g transform="translate(${x},${y})">
      <rect x="0" y="8" width="38" height="38" rx="2" fill="${color}" stroke="#0369a1" stroke-width="1.2"/>
      <polygon points="0,8 8,0 46,0 38,8" fill="#38bdf8" stroke="#0369a1" stroke-width="1.2"/>
      <polygon points="38,8 46,0 46,38 38,46" fill="#075985" stroke="#0369a1" stroke-width="1.2"/>
    </g>`;
  }

  // 100% 精準位值對齊直式繪製 Helper
  function renderVerticalMath(op, numA, numB, result, startX, startY, opt = {}) {
    const colW = opt.colW || 24;
    const cols = [
      startX,               // 0: 運算子 (+) 或 (-)
      startX + colW,        // 1: 千位
      startX + colW * 2,    // 2: 百位
      startX + colW * 3,    // 3: 十位
      startX + colW * 4     // 4: 個位
    ];
    
    const strA = numA.toString().padStart(4, ' ');
    const strB = numB.toString().padStart(4, ' ');
    const strRes = result.toString().padStart(4, ' ');
    
    let out = '';
    
    // 第一列 (被加數/被減數 A)
    for (let i = 0; i < 4; i++) {
      const char = strA[i];
      if (char !== ' ') {
        out += TX(cols[i + 1], startY, char, { fs: opt.fs || 16, anchor: 'middle', c: opt.colorA || '#172033' });
      }
    }

    // 第二列 (運算子 + 數 B)
    out += TX(cols[0], startY + 25, op, { fs: opt.fs || 16, c: opt.opColor || VIO, anchor: 'middle' });
    for (let i = 0; i < 4; i++) {
      const char = strB[i];
      if (char !== ' ') {
        out += TX(cols[i + 1], startY + 25, char, { fs: opt.fs || 16, anchor: 'middle', c: opt.colorB || '#172033' });
      }
    }

    // 橫線
    out += `<line x1="${cols[0] - 8}" y1="${startY + 33}" x2="${cols[4] + 12}" y2="${startY + 33}" stroke="#172033" stroke-width="2"/>`;

    // 第三列 (結果 Result)
    for (let i = 0; i < 4; i++) {
      const char = strRes[i];
      if (char !== ' ') {
        out += TX(cols[i + 1], startY + 56, char, { fs: (opt.fs || 16) + 1, c: opt.colorRes || RED, anchor: 'middle', fw: '900' });
      }
    }

    return out;
  }

  window.DECK.push({
    ch: 2,
    title: '四位數的加減',
    color: C,
    sections: ['2-1 四位數的加法', '2-2 四位數的減法', '2-3 加減估算與應用驗算', '2-4 【易錯關卡】加減法陷阱'],
    slides: [

      /* ---------- 2-1 四位數的加法 ---------- */
      {
        sec: '2-1', secName: '四位數的加法',
        title: '從個位加起，滿10個一進位到十位',
        points: [
          '四位數直式計算時，位值要<b>對齊（個對個、十對十）</b>。',
          '相加<b>滿 10 就要向高一位進 1</b>（逢十進位）。',
          '例如：\\(891 + 446 = 1337\\)。'
        ],
        formula: { label: '四位數加法規則', tex: '891 + 446 = 1337' },
        visual: (h) => {
          let out = BOX(30, 15, 340, 150, { fill: '#faf5ff', stroke: VIO });
          out += TX(200, 38, '891 ＋ 446 的直式計算與進位', { fs: 15, c: VIO, anchor: 'middle' });
          
          out += BOX(50, 50, 60, 24, { fill: '#ede9fe', stroke: 'none' });
          out += TX(80, 67, '千位', { fs: 13, c: VIO, anchor: 'middle' });
          out += BOX(120, 50, 60, 24, { fill: '#e0e7ff', stroke: 'none' });
          out += TX(150, 67, '百位', { fs: 13, c: BLU, anchor: 'middle' });
          out += BOX(190, 50, 60, 24, { fill: '#dcfce7', stroke: 'none' });
          out += TX(220, 67, '十位', { fs: 13, c: GRN, anchor: 'middle' });
          out += BOX(260, 50, 60, 24, { fill: '#ffe4e6', stroke: 'none' });
          out += TX(290, 67, '個位', { fs: 13, c: RED, anchor: 'middle' });

          out += TX(80, 84, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(150, 84, '1', { fs: 12, c: RED, anchor: 'middle' });

          out += TX(80, 102, ' ', { anchor: 'middle' });
          out += TX(150, 102, '8', { fs: 16, anchor: 'middle' });
          out += TX(220, 102, '9', { fs: 16, anchor: 'middle' });
          out += TX(290, 102, '1', { fs: 16, anchor: 'middle' });

          out += TX(42, 122, '＋', { fs: 16, c: VIO, anchor: 'middle' });
          out += TX(150, 122, '4', { fs: 16, anchor: 'middle' });
          out += TX(220, 122, '4', { fs: 16, anchor: 'middle' });
          out += TX(290, 122, '6', { fs: 16, anchor: 'middle' });

          out += `<line x1="45" y1="128" x2="325" y2="128" stroke="#172033" stroke-width="2"/>`;

          out += TX(80, 148, '1', { fs: 17, c: VIO, anchor: 'middle' });
          out += TX(150, 148, '3', { fs: 17, c: VIO, anchor: 'middle' });
          out += TX(220, 148, '3', { fs: 17, c: VIO, anchor: 'middle' });
          out += TX(290, 148, '7', { fs: 17, c: VIO, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 180', out);
        },
        caption: '對齊位值後從個位開始加，9+4=13 寫 3 進 1 到百位，8+4+1=13 進 1 到千位。',
        example: {
          q: '計算：584 ＋ 627 ＝ (  )',
          steps: [
            '個位：4 ＋ 7 ＝ 11（寫 1 進 1 到十位）',
            '十位：1 ＋ 8 ＋ 2 ＝ 11（寫 1 進 1 到百位）',
            '百位：1 ＋ 5 ＋ 6 ＝ 12（寫 12，千位寫 1）'
          ],
          ans: '1211'
        }
      },

      /* ---------- 升級版 2-1-2 「圈圈換長條」純圖形積木進位模擬器 ---------- */
      {
        sec: '2-1', secName: '四位數的加法',
        title: '看圖理解：圈起10個小方塊，換成1條長積木！',
        points: [
          '點擊下方<b>【進位動畫】</b>按鈕，看黃色圈圈如何把 10 個小方塊包起來。',
          '<b>10 個小方塊 ➔ 換成 1 條長積木</b>移到十位。',
          '直式十位數上方會同步出現紅圈 <span class="k">①</span>！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="addg"></div>
            <div class="ictrl" style="margin-top:6px;display:flex;justify-content:center;gap:8px">
              <button class="sbtn btn-0 dbtn active">⏮️ 135 ＋ 247 原圖</button>
              <button class="sbtn btn-1 dbtn">🟡 圈起10個小方塊</button>
              <button class="sbtn btn-2 dbtn">✨ 換成1條長積木進位！</button>
            </div>
          </div>`;

          let step = 0;
          const a = 135, b = 247, sum = 382;

          const update = () => {
            h.querySelectorAll('.sbtn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#faf5ff', stroke: VIO });

            // 左側積木圖解區 (x=20~230)
            out += BOX(20, 20, 220, 135, { fill: '#fff', stroke: '#ddd' });
            
            // 位值欄標題 (百, 十, 個)
            out += TX(55, 36, '百格板', { fs: 11, c: GRN, anchor: 'middle' });
            out += TX(120, 36, '十格條', { fs: 11, c: VIO, anchor: 'middle' });
            out += TX(185, 36, '小方塊', { fs: 11, c: RED, anchor: 'middle' });
            out += `<line x1="20" y1="42" x2="240" y2="42" stroke="#eee" stroke-width="1"/>`;

            // 被加數 135 的積木 (1板, 3條, 5個)
            out += drawHundredGrid(33, 48);
            for(let i=0; i<3; i++) out += drawTenRod(100 + i*14, 48);
            for(let i=0; i<5; i++) out += drawUnitCube(165 + (i%3)*14, 48 + Math.floor(i/3)*14);

            // 加數 247 的積木 (2板, 4條, 7個)
            out += drawHundredGrid(33, 98);
            out += drawHundredGrid(60, 98);
            for(let i=0; i<4; i++) out += drawTenRod(100 + i*14, 98);
            for(let i=0; i<7; i++) out += drawUnitCube(165 + (i%3)*14, 95 + Math.floor(i/3)*14);

            // 步驟 1: 黃圈圈包住 10 個小方塊 (5個上 + 5個下)
            if (step === 1) {
              out += `<rect x="160" y="44" width="48" height="70" rx="8" fill="rgba(245,158,11,.15)" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4"/>`;
              out += TX(185, 128, '🟡 滿10個！', { fs: 11, c: AMB, anchor: 'middle', fw: '900' });
            }

            // 步驟 2: 變成 1 條十格條移向十位，個位留 2 個！
            if (step === 2) {
              out += `<path d="M 160 80 Q 140 70 135 80" fill="none" stroke="${AMB}" stroke-width="3.5" marker-end="url(#arrow)"/>`;
              out += drawTenRod(128, 48, '#f59e0b'); // 發光的新長條
              out += TX(185, 142, '個位留下 2 個！', { fs: 11, c: RED, anchor: 'middle', fw: '900' });
            }

            // 右側直式區域 (x=250~375)
            out += BOX(250, 20, 130, 135, { fill: '#fff', stroke: '#cbd5e1' });
            out += TX(315, 38, '對齊直式', { fs: 12, c: '#64748b', anchor: 'middle' });

            // 直式標頭小紅圈 ①
            if (step === 2) {
              out += `<circle cx="305" cy="50" r="7" fill="${RED}"/>`;
              out += TX(305, 54, '1', { fs: 10, c: '#fff', anchor: 'middle', fw: '900' });
            }

            const resVal = step === 0 ? '' : (step === 1 ? '' : ' 382');
            out += renderVerticalMath('＋', a, b, resVal, 260, 58, { fs: 15, colW: 22, colorRes: RED, opColor: VIO });

            h.querySelector('.addg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.btn-0').onclick = () => { step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { step = 2; update(); };
          update();
        },
        caption: '觀察畫面：黃色圈圈把 10 個小方塊包起來，變成 1 條長積木移到十位，直式上面記下 ①！',
        example: {
          q: '阿哲有 135 張貼紙，妹妹有 247 張貼紙，兩人共有幾張貼紙？',
          steps: [
            '個位：5 ＋ 7 ＝ 12（10個小方塊圈起來換成1條長積木，寫2進1）',
            '十位：1 ＋ 3 ＋ 4 ＝ 8（8條長積木）',
            '百位：1 ＋ 2 ＝ 3（3張百格板）'
          ],
          ans: '382 張'
        }
      },

      {
        sec: '2-1', secName: '四位數的加法',
        title: '逢十就進位，注意千位進位到萬位',
        points: [
          '當千位相加滿 10 時，會進位到 <span class="k">萬位</span>。',
          '例如：\\(626 + 4374 = 5000\\)，或 \\(1323 + 1699 = 3022\\)。',
          '位數不同的加法（如三位數＋四位數）<b>個位務必對齊</b>。'
        ],
        formula: { label: '進位到萬位', tex: '626 + 4374 = 5000' },
        visual: (h) => {
          let out = BOX(40, 15, 320, 150, { fill: '#f0fdf4', stroke: GRN });
          out += TX(200, 38, '626 ＋ 4374 ＝ 5000 的進位過渡', { fs: 15, c: GRN, anchor: 'middle' });

          const cols = [80, 120, 160, 200, 240, 280];
          out += TX(cols[1], 60, '萬', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[2], 60, '千', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[3], 60, '百', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[4], 60, '十', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[5], 60, '個', { fs: 12, c: '#64748b', anchor: 'middle' });

          out += TX(cols[1], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[2], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[3], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[4], 76, '1', { fs: 12, c: RED, anchor: 'middle' });

          out += TX(cols[3], 95, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 95, '2', { fs: 16, anchor: 'middle' });
          out += TX(cols[5], 95, '6', { fs: 16, anchor: 'middle' });

          out += TX(cols[0], 118, '＋', { fs: 16, c: GRN, anchor: 'middle' });
          out += TX(cols[2], 118, '4', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 118, '3', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 118, '7', { fs: 16, anchor: 'middle' });
          out += TX(cols[5], 118, '4', { fs: 16, anchor: 'middle' });

          out += `<line x1="70" y1="124" x2="295" y2="124" stroke="#172033" stroke-width="2"/>`;

          out += TX(cols[2], 146, '5', { fs: 18, c: GRN, anchor: 'middle' });
          out += TX(cols[3], 146, '0', { fs: 18, c: GRN, anchor: 'middle' });
          out += TX(cols[4], 146, '0', { fs: 18, c: GRN, anchor: 'middle' });
          out += TX(cols[5], 146, '0', { fs: 18, c: GRN, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 180', out);
        },
        caption: '三位數 626 與四位數 4374 相加時，個位靠右對齊，連續進位後得 5000。',
        example: {
          q: '球場門票上午售出 626 張，下午售出 4374 張，一天共售出幾張門票？',
          steps: [
            '列式：626 ＋ 4374',
            '個位 6＋4＝10（寫0進1），十位 1＋2＋7＝10（寫0進1）',
            '百位 1＋6＋3＝10（寫0進1），千位 1＋4＝5'
          ],
          ans: '5000 張'
        }
      },

      /* ---------- 2-2 四位數的減法 ---------- */
      {
        sec: '2-2', secName: '四位數的減法',
        title: '不夠減時，向高一位借 1 當作 10 個',
        points: [
          '直式減法同樣從<b>個位開始減</b>。',
          '如果某一位不夠減，要向<b>高一位借 1</b>，在該位當作 <b>10</b>。',
          '例如：\\(345 - 88 = 257\\)。'
        ],
        formula: { label: '四位數減法規則', tex: '345 - 88 = 257' },
        visual: (h) => {
          let out = BOX(30, 15, 340, 150, { fill: '#fff1f2', stroke: RED });
          out += TX(200, 38, '345 － 88 ＝ 257 的退位借位示範', { fs: 15, c: RED, anchor: 'middle' });

          out += BOX(100, 50, 60, 22, { fill: '#e0e7ff', stroke: 'none' });
          out += TX(130, 66, '百位', { fs: 12, c: BLU, anchor: 'middle' });
          out += BOX(170, 50, 60, 22, { fill: '#dcfce7', stroke: 'none' });
          out += TX(200, 66, '十位', { fs: 12, c: GRN, anchor: 'middle' });
          out += BOX(240, 50, 60, 22, { fill: '#ffe4e6', stroke: 'none' });
          out += TX(270, 66, '個位', { fs: 12, c: RED, anchor: 'middle' });

          out += TX(270, 80, '15', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(200, 80, '13 (被借1剩3)', { fs: 10, c: RED, anchor: 'middle' });

          out += TX(130, 102, '3', { fs: 16, anchor: 'middle' });
          out += TX(200, 102, '4', { fs: 16, anchor: 'middle' });
          out += TX(270, 102, '5', { fs: 16, anchor: 'middle' });

          out += TX(80, 122, '－', { fs: 16, c: RED, anchor: 'middle' });
          out += TX(200, 122, '8', { fs: 16, anchor: 'middle' });
          out += TX(270, 122, '8', { fs: 16, anchor: 'middle' });

          out += `<line x1="75" y1="128" x2="300" y2="128" stroke="#172033" stroke-width="2"/>`;

          out += TX(130, 148, '2', { fs: 17, c: RED, anchor: 'middle' });
          out += TX(200, 148, '5', { fs: 17, c: RED, anchor: 'middle' });
          out += TX(270, 148, '7', { fs: 17, c: RED, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 180', out);
        },
        caption: '個位 5-8 不夠減，向十位借 1 當 10（15-8=7）；十位剩 3 向百位借 1（13-8=5）。',
        example: {
          q: '計算：462 － 294 ＝ (  )',
          steps: [
            '個位：2 不夠減 4，向十位借 1 當 10（12 － 4 ＝ 8）',
            '十位：5 不夠減 9，向百位借 1 當 10（15 － 9 ＝ 6）',
            '百位：3 － 2 ＝ 1'
          ],
          ans: '168'
        }
      },

      /* ---------- 升級版 2-2-2 「長條拆小塊」純圖形積木退位模擬器 ---------- */
      {
        sec: '2-2', secName: '四位數的減法',
        title: '看圖解密：1張百格板拆成10條長積木，中間0變9！',
        points: [
          '點擊下方<b>【退位拆解】</b>按鈕，看大積木如何拆成小積木。',
          '<b>1 張百格板 ➔ 拆成 10 條長積木</b>（百位剩 2，十位有 10）。',
          '再取 <b>1 條長積木 ➔ 拆成 10 個小方塊</b>（十位剩 9，個位有 10）！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="subg"></div>
            <div class="ictrl" style="margin-top:6px;display:flex;justify-content:center;gap:6px">
              <button class="sbtn btn-0 dbtn active">⏮️ 300 － 147 原圖</button>
              <button class="sbtn btn-1 dbtn">✂️ 拆1張百格板到十位</button>
              <button class="sbtn btn-2 dbtn">✂️ 拆1條長積木到個位</button>
              <button class="sbtn btn-3 dbtn">✨ 完成扣減(153)</button>
            </div>
          </div>`;

          let step = 0;
          const a = 300, b = 147, diff = 153;

          const update = () => {
            h.querySelectorAll('.sbtn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#fef2f2', stroke: RED });

            // 左側積木圖解區 (x=20~240)
            out += BOX(20, 20, 220, 135, { fill: '#fff', stroke: '#ddd' });

            out += TX(55, 36, '百格板', { fs: 11, c: GRN, anchor: 'middle' });
            out += TX(120, 36, '十格條', { fs: 11, c: VIO, anchor: 'middle' });
            out += TX(185, 36, '小方塊', { fs: 11, c: RED, anchor: 'middle' });
            out += `<line x1="20" y1="42" x2="240" y2="42" stroke="#eee" stroke-width="1"/>`;

            // 步驟 0: 300 (3張百格板)
            if (step === 0) {
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              out += drawHundredGrid(40, 98);
              out += TX(120, 85, '(0條)', { fs: 11, c: '#94a3b8', anchor: 'middle' });
              out += TX(185, 85, '(0個)', { fs: 11, c: '#94a3b8', anchor: 'middle' });
            } else if (step === 1) {
              // 百位剩2張，十位得到10條長積木！
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              for(let i=0; i<5; i++) out += drawTenRod(95 + i*13, 48);
              for(let i=0; i<5; i++) out += drawTenRod(95 + i*13, 80);
              out += TX(55, 108, '百位剩 2 張', { fs: 10, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(125, 142, '1張百格板 ➔ 拆成 10 條長積木！', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 2) {
              // 十位剩 9 條長積木，個位得到 10 個小方塊！
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              for(let i=0; i<9; i++) out += drawTenRod(90 + (i%5)*13, 48 + Math.floor(i/5)*38);
              for(let i=0; i<10; i++) out += drawUnitCube(165 + (i%2)*14, 48 + Math.floor(i/2)*14);
              out += TX(120, 142, '十位剩 9 條，個位得到 10 個小方塊！', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 3) {
              // 完成扣減 153 (1板, 5條, 3個)
              out += drawHundredGrid(40, 60);
              for(let i=0; i<5; i++) out += drawTenRod(100 + i*13, 60);
              for(let i=0; i<3; i++) out += drawUnitCube(175, 50 + i*16);
              out += TX(120, 142, '🎉 扣除147後，剩下 153！', { fs: 11, c: GRN, anchor: 'middle', fw: '900' });
            }

            // 右側直式區域 (x=250~375)
            out += BOX(250, 20, 130, 135, { fill: '#fff', stroke: '#cbd5e1' });
            out += TX(315, 38, '對齊直式', { fs: 12, c: '#64748b', anchor: 'middle' });

            // 直式標頭與劃線
            if (step >= 1) {
              out += TX(288, 50, '2', { fs: 10, c: RED, anchor: 'middle' });
              out += TX(310, 50, '10', { fs: 10, c: RED, anchor: 'middle' });
            }
            if (step >= 2) {
              out += TX(310, 50, '9', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
              out += TX(332, 50, '10', { fs: 10, c: RED, anchor: 'middle' });
            }

            const resVal = step === 3 ? ' 153' : '';
            out += renderVerticalMath('－', a, b, resVal, 260, 58, { fs: 15, colW: 22, colorRes: GRN, opColor: RED });

            h.querySelector('.subg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.btn-0').onclick = () => { step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { step = 2; update(); };
          h.querySelector('.btn-3').onclick = () => { step = 3; update(); };
          update();
        },
        caption: '觀察畫面：1張百格板拆成10條長積木，再拿1條長積木拆成10個小方塊！所以百位剩2、十位剩9！',
        example: {
          q: '小健有 300 元，買故事書花了 147 元，還剩下多少元？',
          steps: [
            '個位 0 － 7 不夠減，向十位借（十位是0）',
            '先將 1 張百格板拆成 10 條長積木（百位剩 2，十位有 10）',
            '再將 1 條長積木拆成 10 個小方塊（十位剩 9，個位有 10）',
            '計算：10 － 7 ＝ 3，9 － 4 ＝ 5，2 － 1 ＝ 1'
          ],
          ans: '153 元'
        }
      },

      {
        sec: '2-2', secName: '四位數的減法',
        title: '四位數連續退位減法：標記退位不漏算',
        points: [
          '四位數減法（如 \\(6000 - 2685\\)），千位借 1 後百/十位變成 9。',
          '務必在頭頂寫下<b>退位標記</b>，才不會忘記減 1。',
          '例如：\\(6000 - 2685 = 3315\\)。'
        ],
        formula: { label: '整千數退位減法', tex: '6000 - 2685 = 3315' },
        visual: (h) => {
          let out = BOX(40, 15, 320, 150, { fill: '#fffbe8', stroke: AMB });
          out += TX(200, 38, '6000 － 2685 ＝ 3315 的連續退位標記', { fs: 15, c: AMB, anchor: 'middle' });

          const cols = [90, 130, 170, 210, 250];
          out += TX(cols[1], 58, '千', { fs: 11, c: '#64748b', anchor: 'middle' });
          out += TX(cols[2], 58, '百', { fs: 11, c: '#64748b', anchor: 'middle' });
          out += TX(cols[3], 58, '十', { fs: 11, c: '#64748b', anchor: 'middle' });
          out += TX(cols[4], 58, '個', { fs: 11, c: '#64748b', anchor: 'middle' });

          out += TX(cols[1], 75, '5', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[2], 75, '9', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[3], 75, '9', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[4], 75, '10', { fs: 12, c: RED, anchor: 'middle' });

          out += TX(cols[1], 96, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[2], 96, '0', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 96, '0', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 96, '0', { fs: 16, anchor: 'middle' });

          out += TX(cols[0], 118, '－', { fs: 16, c: AMB, anchor: 'middle' });
          out += TX(cols[1], 118, '2', { fs: 16, anchor: 'middle' });
          out += TX(cols[2], 118, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 118, '8', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 118, '5', { fs: 16, anchor: 'middle' });

          out += `<line x1="80" y1="124" x2="265" y2="124" stroke="#172033" stroke-width="2"/>`;

          out += TX(cols[1], 146, '3', { fs: 18, c: AMB, anchor: 'middle' });
          out += TX(cols[2], 146, '3', { fs: 18, c: AMB, anchor: 'middle' });
          out += TX(cols[3], 146, '1', { fs: 18, c: AMB, anchor: 'middle' });
          out += TX(cols[4], 146, '5', { fs: 18, c: AMB, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 180', out);
        },
        caption: '向千位 6 借 1 後，千位變 5，百位與十位變 9，個位獲得 10。',
        example: {
          q: '小健目標一天走 6000 步，目前已走了 2685 步，還要走幾步才達標？',
          steps: [
            '列式：6000 － 2685',
            '個位：10 － 5 ＝ 5',
            '十位：9 － 8 ＝ 1',
            '百位：9 － 6 ＝ 3，千位：5 － 2 ＝ 3'
          ],
          ans: '3315 步'
        }
      },

      /* ---------- 2-3 加減估算與應用驗算 ---------- */
      {
        sec: '2-3', secName: '加減估算與應用驗算',
        title: '先把數字看成整百或整千，快速掌握大約數量',
        points: [
          '<b>估算</b>是用大約的數（整百或整千）進行快速計算。',
          '例如：\\(3852\\) 公尺大約是 <span class="k">4000 公尺</span>（4千公尺）。',
          '估算能幫助我們快速判斷結果是否合理。'
        ],
        formula: { label: '概數估算', tex: '3852 \\approx 4000' },
        visual: (h) => {
          let out = BOX(30, 20, 340, 140, { fill: '#f0f9ff', stroke: BLU });
          out += TX(200, 42, '3852 公尺在數線上的估算（接近 4000）', { fs: 14, c: BLU, anchor: 'middle' });

          out += `<line x1="60" y1="90" x2="340" y2="90" stroke="#334155" stroke-width="3"/>`;
          out += `<polygon points="340,85 350,90 340,95" fill="#334155"/>`;

          out += `<line x1="80" y1="83" x2="80" y2="97" stroke="#334155" stroke-width="2"/>`;
          out += TX(80, 118, '3000', { fs: 13, anchor: 'middle' });

          out += `<line x1="200" y1="85" x2="200" y2="95" stroke="#94a3b8" stroke-width="2"/>`;
          out += TX(200, 118, '3500', { fs: 12, c: '#64748b', anchor: 'middle' });

          out += `<line x1="320" y1="83" x2="320" y2="97" stroke="#334155" stroke-width="2"/>`;
          out += TX(320, 118, '4000', { fs: 13, c: GRN, anchor: 'middle' });

          out += `<circle cx="302" cy="90" r="7" fill="#e11d48"/>`;
          out += TX(302, 72, '3852', { fs: 13, c: RED, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 170', out);
        },
        caption: '3852 超過 3500 且非常接近 4000，因此估算大約是 4000（4千）。',
        example: {
          q: '一條登山步道全長 3852 公尺，大約是幾千公尺？',
          steps: [
            '觀察 3852 位在 3000 與 4000 之間',
            '百位數字是 8（大於或等於 5），比較接近 4000',
            '大約是 4000 公尺（4 千公尺）'
          ],
          ans: '大約 4000 公尺（4千公尺）'
        }
      },

      {
        sec: '2-3', secName: '加減估算與應用驗算',
        title: '用加減法的互逆關係（和－加數＝被加數）驗算',
        points: [
          '<b>加法的驗算</b>：可以用「和 － 加數 ＝ 被加數」。',
          '<b>減法的驗算</b>：可以用「差 ＋ 減數 ＝ 被減數」。',
          '點擊按鈕切換，學習如何驗算自己的答案。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="ckg"></div>
            <div class="ictrl" style="margin-top:8px">
              <button class="btn-add-ck dbtn active" style="padding:4px 12px;margin-right:8px">加法驗算示範</button>
              <button class="btn-sub-ck dbtn" style="padding:4px 12px">減法驗算示範</button>
            </div>
          </div>`;

          let mode = 'add';
          const update = () => {
            let out = BOX(30, 15, 340, 140, { fill: mode === 'add' ? '#f5f3ff' : '#f0fdf4', stroke: mode === 'add' ? VIO : GRN });
            if (mode === 'add') {
              out += TX(200, 42, '加法驗算：1323 ＋ 1699 ＝ 3022', { fs: 14, c: VIO, anchor: 'middle' });
              out += BOX(50, 60, 140, 75, { fill: '#fff', stroke: '#ddd' });
              out += TX(120, 80, '【計算算式】', { fs: 11, c: '#64748b', anchor: 'middle' });
              out += TX(120, 105, '1323 ＋ 1699 ＝ 3022', { fs: 12, c: VIO, anchor: 'middle' });

              out += TX(200, 98, '➔ 驗算', { fs: 14, c: RED, anchor: 'middle' });

              out += BOX(210, 60, 140, 75, { fill: '#fff', stroke: '#ddd' });
              out += TX(280, 80, '【用減法驗算】', { fs: 11, c: '#64748b', anchor: 'middle' });
              out += TX(280, 105, '3022 － 1699 ＝ 1323', { fs: 12, c: GRN, anchor: 'middle' });
            } else {
              out += TX(200, 42, '減法驗算：3000 － 2184 ＝ 816', { fs: 14, c: GRN, anchor: 'middle' });
              out += BOX(50, 60, 140, 75, { fill: '#fff', stroke: '#ddd' });
              out += TX(120, 80, '【原計算算式】', { fs: 11, c: '#64748b', anchor: 'middle' });
              out += TX(120, 105, '3000 － 2184 ＝ 816', { fs: 12, c: RED, anchor: 'middle' });

              out += TX(200, 98, '➔ 驗算', { fs: 14, c: BLU, anchor: 'middle' });

              out += BOX(210, 60, 140, 75, { fill: '#fff', stroke: '#ddd' });
              out += TX(280, 80, '【用加法驗算】', { fs: 11, c: '#64748b', anchor: 'middle' });
              out += TX(280, 105, '816 ＋ 2184 ＝ 3000', { fs: 12, c: VIO, anchor: 'middle' });
            }

            h.querySelector('.ckg').innerHTML = svg('0 0 400 170', out);
          };

          const bAdd = h.querySelector('.btn-add-ck');
          const bSub = h.querySelector('.btn-sub-ck');
          bAdd.onclick = () => { mode = 'add'; update(); };
          bSub.onclick = () => { mode = 'sub'; update(); };
          update();
        },
        caption: '算完題目後，透過加減互逆關係驗算，能確保計算 100% 正確。',
        example: {
          q: '買字典 856 元與畫筆 1328 元，付 3000 元找回多少元？並驗算。',
          steps: [
            '第一步：856 ＋ 1328 ＝ 2184 元（共花了 2184 元）',
            '第二步：3000 － 2184 ＝ 816 元（找回 816 元）',
            '驗算：816 ＋ 2184 ＝ 3000 元（與付出的 3000 元相同，正確！）'
          ],
          ans: '找回 816 元'
        }
      },

      /* ---------- 2-4 【易錯關卡】加減法陷阱 ---------- */
      {
        sec: '2-4', secName: '易錯關卡',
        title: '【易錯關卡】注意位值對齊、進退位與借0陷阱',
        points: [
          '<b>陷阱 1 位值未對齊</b>：三位數與四位數相加，誤把百位對到千位。',
          '<b>陷阱 2 忘記寫進/退位標記</b>：滿10忘記進1，或借1後忘記減1。',
          '<b>陷阱 3 中間有 0 借位誤算</b>：向 0 借位時，忘記中間的 0 會變成 9。'
        ],
        visual: (h) => {
          let out = BOX(20, 15, 175, 145, { fill: '#fff1f2', stroke: RED });
          out += TX(107, 36, '❌ 常見錯誤', { fs: 14, c: RED, anchor: 'middle' });
          out += renderVerticalMath('－', 3010, 1947, 1163, 40, 52, { fs: 14, colW: 22, colorRes: RED, opColor: RED });
          out += TX(107, 142, '（百位忘記變 9！）', { fs: 11, c: RED, anchor: 'middle' });

          out += BOX(205, 15, 175, 145, { fill: '#f0fdf4', stroke: GRN });
          out += TX(292, 36, '✅ 正確算法', { fs: 14, c: GRN, anchor: 'middle' });
          out += renderVerticalMath('－', 3010, 1947, 1063, 225, 52, { fs: 14, colW: 22, colorRes: GRN, opColor: GRN });
          out += TX(292, 142, '（百位 9－9＝0）', { fs: 11, c: GRN, anchor: 'middle' });

          h.innerHTML = svg('0 0 400 175', out);
        },
        caption: '向千位借 1 給個位時，中間的 0 借 1 出去後會變成 9，減法時千萬別忘記！',
        example: {
          q: '小明計算 3010 － 1947 得到 1163，請問他錯在哪裡？',
          steps: [
            '百位向千位借 1 後變 10，但因為又借給十位/個位，所以百位留下的應該是 9',
            '百位計算應為 9 － 9 ＝ 0',
            '正確答案應該是 1063'
          ],
          ans: '正確答案為 1063（百位應為 0）'
        }
      }

    ]
  });
})();
