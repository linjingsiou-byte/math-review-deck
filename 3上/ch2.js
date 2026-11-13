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

  // 2. 十位長條積木 (14x60, 獨立邊框與清晰10刻度，防止多條連在一起看不清數量)
  function drawTenRod(x, y, color = '#7c3aed') {
    let out = `<g transform="translate(${x},${y})">
      <rect width="13" height="60" rx="3" fill="${color}" stroke="#3b0764" stroke-width="1.5"/>`;
    for (let i = 1; i < 10; i++) {
      out += `<line x1="1" y1="${i * 6}" x2="12" y2="${i * 6}" stroke="#ffffff" stroke-width="1.2" opacity="0.8"/>`;
    }
    out += `<rect x="2" y="2" width="4" height="4" rx="1" fill="#fff" opacity="0.4"/></g>`;
    return out;
  }

  // 3. 百位百格板 (45x45, 內含10x10格)
  function drawHundredGrid(x, y, color = '#059669') {
    let out = `<g transform="translate(${x},${y})">
      <rect width="45" height="45" rx="3" fill="${color}" stroke="#065f46" stroke-width="1.5"/>`;
    for (let i = 1; i < 9; i++) {
      out += `<line x1="${i * 5}" y1="1" x2="${i * 5}" y2="44" stroke="#ffffff" stroke-width="0.6" opacity="0.5"/>`;
      out += `<line x1="1" y1="${i * 5}" x2="44" y2="${i * 5}" stroke="#ffffff" stroke-width="0.6" opacity="0.5"/>`;
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

      /* ---------- 升級版 2-1-2 「頂部步驟按鈕 ＋ 獨立十格條 ＋ 精準10個框」進位模擬器 ---------- */
      {
        sec: '2-1', secName: '四位數的加法',
        title: '看圖理解：圈起10個小方塊，換成1條長積木！',
        points: [
          '點擊上方<b>【步驟按鈕】</b>觀察進位過程。',
          '黃色虛線框<b>精準圈住 10 個小方塊</b>（下有 2 個留著）。',
          '<b>10 個小方塊 ➔ 換成 1 條長積木</b>移到十位（直式記 ①）。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:2px">
            <div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;align-items:center">
              <button class="play-btn btn-play">▶️ 播放動畫</button>
              <button class="step-btn btn-0 active">Step 1: 原圖(135+247)</button>
              <button class="step-btn btn-1">Step 2: 🟡 圈選10個</button>
              <button class="step-btn btn-2">Step 3: ✨ 換成1條進位</button>
            </div>
            <div class="addg"></div>
          </div>`;

          let step = 0;
          let timer = null;
          const a = 135, b = 247, sum = 382;

          const stopTimer = () => {
            if (timer) { clearInterval(timer); timer = null; }
            const playBtn = h.querySelector('.btn-play');
            if (playBtn) {
              playBtn.classList.remove('playing');
              playBtn.innerHTML = '▶️ 播放動畫';
            }
          };

          const update = () => {
            h.querySelectorAll('.step-btn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#faf5ff', stroke: VIO });

            // 左側積木圖解區 (x=20~240, w=220)
            out += BOX(20, 20, 220, 135, { fill: '#fff', stroke: '#ddd' });
            
            // 位值欄標題 (百, 十, 個)
            out += TX(55, 36, '百格板', { fs: 11, c: GRN, anchor: 'middle' });
            out += TX(125, 36, '十格條', { fs: 11, c: VIO, anchor: 'middle' });
            out += TX(198, 36, '個位小方塊', { fs: 11, c: RED, anchor: 'middle' });
            out += `<line x1="20" y1="42" x2="240" y2="42" stroke="#eee" stroke-width="1"/>`;

            // 1. 百格板 (135 有 1 張, 247 有 2 張)
            out += drawHundredGrid(30, 48);
            out += drawHundredGrid(30, 98);
            out += drawHundredGrid(55, 98);

            // 2. 十格條 (拉開間距 step=18px，獨立清晰)
            // 135 有 3 條 (上列)
            for (let i = 0; i < 3; i++) out += drawTenRod(92 + i * 18, 48);
            // 247 有 4 條 (下列)
            for (let i = 0; i < 4; i++) out += drawTenRod(92 + i * 18, 98);

            // 標示十格條數量標籤
            if (step === 0 || step === 1) {
              out += TX(125, 144, '十位：上3條＋下4條＝7條', { fs: 9.5, c: VIO, anchor: 'middle', fw: '900' });
            } else if (step === 2) {
              out += TX(125, 144, '十位：3條＋4條＋1進位＝8條', { fs: 9.5, c: AMB, anchor: 'middle', fw: '900' });
            }

            // 3. 個位小方塊 (135 有 5 個 排第1排; 247 有 7 個 排第2排[5個]與第3排[2個])
            if (step === 0 || step === 1) {
              for (let i = 0; i < 5; i++) out += drawUnitCube(162 + i * 15, 48);
              for (let i = 0; i < 5; i++) out += drawUnitCube(162 + i * 15, 66);
              for (let i = 0; i < 2; i++) out += drawUnitCube(162 + i * 15, 88);
            } else if (step === 2) {
              // 步驟 3: 10 個小方塊換成 1 條進位到十位，個位只留下第 3 排 2 個！
              for (let i = 0; i < 2; i++) out += drawUnitCube(162 + i * 15, 88);
            }

            // 步驟 1: 黃色虛線框精準圈選 10 個小方塊！
            if (step === 1) {
              out += `<rect x="158" y="44" width="82" height="38" rx="6" fill="rgba(245,158,11,.18)" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5,3"/>`;
              out += TX(199, 120, '黃框內剛好 10 個！', { fs: 10, c: AMB, anchor: 'middle', fw: '900' });
            }

            // 步驟 2: 換成 1 條發光十格積木進到十位！
            if (step === 2) {
              out += drawTenRod(146, 48, '#f59e0b'); // 新進位的發光黃長條
              out += `<path d="M 158 63 Q 150 50 148 63" fill="none" stroke="${AMB}" stroke-width="2.5" stroke-dasharray="3,3"/>`;
              out += TX(199, 120, '個位留下 2 個！', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
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

          const playBtn = h.querySelector('.btn-play');
          playBtn.onclick = () => {
            if (timer) {
              stopTimer();
            } else {
              playBtn.classList.add('playing');
              playBtn.innerHTML = '⏸️ 暫停動畫';
              timer = setInterval(() => {
                step = (step + 1) % 3;
                update();
              }, 1600);
            }
          };

          h.querySelector('.btn-0').onclick = () => { stopTimer(); step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { stopTimer(); step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { stopTimer(); step = 2; update(); };
          update();
        },
        caption: '觀察畫面：黃色虛線框精準圈起 10 個小方塊，換成 1 條長積木移到十位，直式上記下 ①！',
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
        title: '逢十就進位，連續進位過渡概念',
        points: [
          '當某一位數相加滿 10 時，向左邊高一位 <span class="k">進位 1</span>。',
          '例如：\\(626 + 4374 = 5000\\)，個、十、百位連續進位後得 5000。',
          '位數不同的加法（如三位數＋四位數）<b>個位務必對齊</b>。'
        ],
        formula: { label: '連續進位過渡', tex: '626 + 4374 = 5000' },
        visual: (h) => {
          let out = BOX(40, 15, 320, 150, { fill: '#f0fdf4', stroke: GRN });
          out += TX(200, 38, '626 ＋ 4374 ＝ 5000 的進位過渡', { fs: 15, c: GRN, anchor: 'middle' });

          const cols = [80, 120, 160, 200, 240, 280];
          out += TX(cols[1], 60, '萬', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[2], 60, '千', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[3], 60, '百', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[4], 60, '十', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[5], 60, '個', { fs: 12, c: '#64748b', anchor: 'middle' });

          // 進位標記 (個位 6+4=10 進1到十位、十位 2+7+1=10 進1到百位、百位 6+3+1=10 進1到千位；千位 4+1=5 不必進位到萬位)
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
          '點擊上方<b>【步驟按鈕】</b>看大積木如何拆成小積木。',
          '<b>1 張百格板 ➔ 拆成 10 條長積木</b>（百位剩 2，十位有 10）。',
          '再取 <b>1 條長積木 ➔ 拆成 10 個小方塊</b>（十位剩 9，個位有 10）！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:2px">
            <div style="display:flex;justify-content:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;align-items:center">
              <button class="play-btn btn-play">▶️ 播放動畫</button>
              <button class="step-btn btn-0 active">Step 1: 原圖(300)</button>
              <button class="step-btn btn-1">Step 2: ✂️ 拆1百格板到十位</button>
              <button class="step-btn btn-2">Step 3: ✂️ 拆1長條到個位</button>
              <button class="step-btn btn-3">Step 4: ✨ 扣減剩153</button>
            </div>
            <div class="subg"></div>
          </div>`;

          let step = 0;
          let timer = null;
          const a = 300, b = 147, diff = 153;

          const stopTimer = () => {
            if (timer) { clearInterval(timer); timer = null; }
            const playBtn = h.querySelector('.btn-play');
            if (playBtn) {
              playBtn.classList.remove('playing');
              playBtn.innerHTML = '▶️ 播放動畫';
            }
          };

          const update = () => {
            h.querySelectorAll('.step-btn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#fef2f2', stroke: RED });

            // 左側積木圖解區 (x=20~240)
            out += BOX(20, 20, 220, 135, { fill: '#fff', stroke: '#ddd' });

            out += TX(55, 36, '百格板', { fs: 11, c: GRN, anchor: 'middle' });
            out += TX(125, 36, '十格條', { fs: 11, c: VIO, anchor: 'middle' });
            out += TX(198, 36, '個位小方塊', { fs: 11, c: RED, anchor: 'middle' });
            out += `<line x1="20" y1="42" x2="240" y2="42" stroke="#eee" stroke-width="1"/>`;

            // 步驟 0: 300 (3張百格板)
            if (step === 0) {
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              out += drawHundredGrid(40, 98);
              out += TX(125, 85, '十位：【0 條】', { fs: 11, c: '#94a3b8', anchor: 'middle', fw: '900' });
              out += TX(198, 85, '個位：【0 個】', { fs: 11, c: '#94a3b8', anchor: 'middle', fw: '900' });
            } else if (step === 1) {
              // 百位剩2張，十位得到10條獨立十格積木 (每條間距15px，清晰可數)
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              for(let i=0; i<5; i++) out += drawTenRod(88 + i*15, 48);
              for(let i=0; i<5; i++) out += drawTenRod(88 + i*15, 82);
              out += TX(55, 108, '百位剩 2 張', { fs: 10, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(125, 142, '十位得到：【剛好 10 條！】', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 2) {
              // 十位剩 9 條長積木，個位得到 10 個小方塊！
              out += drawHundredGrid(25, 48);
              out += drawHundredGrid(55, 48);
              for(let i=0; i<9; i++) out += drawTenRod(85 + (i%5)*15, 48 + Math.floor(i/5)*38);
              for(let i=0; i<10; i++) out += drawUnitCube(175 + (i%2)*15, 48 + Math.floor(i/2)*14);
              out += TX(125, 142, '十位【剩 9 條】，個位【10 個小方塊】', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 3) {
              // 完成扣減 153 (1板, 5條, 3個)
              out += drawHundredGrid(40, 60);
              for(let i=0; i<5; i++) out += drawTenRod(100 + i*15, 60);
              for(let i=0; i<3; i++) out += drawUnitCube(188, 50 + i*16);
              out += TX(125, 142, '🎉 扣除147後，十位剩【5 條】＝ 153！', { fs: 10, c: GRN, anchor: 'middle', fw: '900' });
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

          const playBtn = h.querySelector('.btn-play');
          playBtn.onclick = () => {
            if (timer) {
              stopTimer();
            } else {
              playBtn.classList.add('playing');
              playBtn.innerHTML = '⏸️ 暫停動畫';
              timer = setInterval(() => {
                step = (step + 1) % 4;
                update();
              }, 1600);
            }
          };

          h.querySelector('.btn-0').onclick = () => { stopTimer(); step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { stopTimer(); step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { stopTimer(); step = 2; update(); };
          h.querySelector('.btn-3').onclick = () => { stopTimer(); step = 3; update(); };
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
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="sub6g"></div>
            <div class="ictrl" style="margin-top:6px; display:flex; flex-wrap:wrap; justify-content:center; gap:6px;">
              <button class="bstep-0" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; font-weight:800; font-size:12px; cursor:pointer;">0. 初始題目</button>
              <button class="bstep-1" style="padding:4px 8px; border-radius:6px; border:1px solid #7c3aed; background:#f5f3ff; color:#7c3aed; font-weight:900; font-size:12px; cursor:pointer;">1. 千位借位 (6➔5,百10)</button>
              <button class="bstep-2" style="padding:4px 8px; border-radius:6px; border:1px solid #2563eb; background:#eff6ff; color:#2563eb; font-weight:900; font-size:12px; cursor:pointer;">2. 百位借位 (百9,十10)</button>
              <button class="bstep-3" style="padding:4px 8px; border-radius:6px; border:1px solid #d97706; background:#fffbeb; color:#d97706; font-weight:900; font-size:12px; cursor:pointer;">3. 十位借位 (十9,個10)</button>
              <button class="bstep-4" style="padding:4px 8px; border-radius:6px; border:1px solid #059669; background:#ecfdf5; color:#059669; font-weight:900; font-size:12px; cursor:pointer;">4. 完成減法計算</button>
            </div>
          </div>`;

          let bstep = 0;
          const stage = h.querySelector('.sub6g');

          const update = (sVal) => {
            bstep = sVal;
            let out = BOX(40, 15, 320, 150, { fill: '#fffbe8', stroke: AMB });
            out += TX(200, 35, '6000 － 2685 ＝ 3315 分步退位標記連動', { fs: 14, c: AMB, anchor: 'middle', fw: '900' });

            const cols = [90, 130, 170, 210, 250];
            out += TX(cols[1], 54, '千', { fs: 11, c: '#64748b', anchor: 'middle' });
            out += TX(cols[2], 54, '百', { fs: 11, c: '#64748b', anchor: 'middle' });
            out += TX(cols[3], 54, '十', { fs: 11, c: '#64748b', anchor: 'middle' });
            out += TX(cols[4], 54, '個', { fs: 11, c: '#64748b', anchor: 'middle' });

            // 頂頭標記
            if (bstep >= 1) {
              out += TX(cols[1], 68, '5', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
              out += `<line x1="124" y1="78" x2="136" y2="92" stroke="${RED}" stroke-width="2"/>`;
              out += TX(cols[2], 68, bstep >= 2 ? '9' : '10', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
            }
            if (bstep >= 2) {
              out += `<line x1="164" y1="78" x2="176" y2="92" stroke="${RED}" stroke-width="2"/>`;
              out += TX(cols[3], 68, bstep >= 3 ? '9' : '10', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
            }
            if (bstep >= 3) {
              out += `<line x1="204" y1="78" x2="216" y2="92" stroke="${RED}" stroke-width="2"/>`;
              out += TX(cols[4], 68, '10', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
            }

            out += TX(cols[1], 90, '6', { fs: 16, anchor: 'middle' });
            out += TX(cols[2], 90, '0', { fs: 16, anchor: 'middle' });
            out += TX(cols[3], 90, '0', { fs: 16, anchor: 'middle' });
            out += TX(cols[4], 90, '0', { fs: 16, anchor: 'middle' });

            out += TX(cols[0], 112, '－', { fs: 16, c: AMB, anchor: 'middle' });
            out += TX(cols[1], 112, '2', { fs: 16, anchor: 'middle' });
            out += TX(cols[2], 112, '6', { fs: 16, anchor: 'middle' });
            out += TX(cols[3], 112, '8', { fs: 16, anchor: 'middle' });
            out += TX(cols[4], 112, '5', { fs: 16, anchor: 'middle' });

            out += `<line x1="80" y1="118" x2="265" y2="118" stroke="#172033" stroke-width="2"/>`;

            if (bstep === 4) {
              out += TX(cols[1], 142, '3', { fs: 18, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(cols[2], 142, '3', { fs: 18, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(cols[3], 142, '1', { fs: 18, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(cols[4], 142, '5', { fs: 18, c: GRN, anchor: 'middle', fw: '900' });
            }

            stage.innerHTML = svg('0 0 400 160', out);
          };

          h.querySelector('.bstep-0').onclick = () => update(0);
          h.querySelector('.bstep-1').onclick = () => update(1);
          h.querySelector('.bstep-2').onclick = () => update(2);
          h.querySelector('.bstep-3').onclick = () => update(3);
          h.querySelector('.bstep-4').onclick = () => update(4);

          update(3);
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
          h.innerHTML = `
            <div style="width:100%;text-align:center;font-family:sans-serif;padding:4px;">
              <svg viewBox="0 0 400 135" style="max-width:100%;background:#f0f9ff;border:1px solid #cbd5e1;border-radius:12px;">
                <g class="estg"></g>
              </svg>
              <div class="ictrl" style="margin-top:8px;background:#e0f2fe;padding:8px 12px;border-radius:10px;border:1.5px solid #0284c7;">
                <label style="font-weight:900;font-size:14px;color:#0369a1;">拖動數線數值：<span class="ival numv" style="font-size:17px;color:#e11d48">3852</span> 公尺</label>
                <input class="num-sl" type="range" min="3000" max="4000" step="10" value="3852" style="width:100%;margin-top:4px;">
              </div>
            </div>
          `;

          const sl = h.querySelector('.num-sl');
          const numv = h.querySelector('.numv');
          const estg = h.querySelector('.estg');

          function render() {
            const v = +sl.value;
            numv.textContent = v;

            const minV = 3000, maxV = 4000;
            const startX = 60, endX = 340, y = 75;
            const cx = startX + ((v - minV) / (maxV - minV)) * (endX - startX);
            const nearV = v >= 3500 ? 4000 : 3000;
            const nearColor = v >= 3500 ? '#059669' : '#2563eb';

            let out = '';
            out += TX(200, 26, `數值 ${v} 在數線上的估算（百位為 ${Math.floor((v%1000)/100)}）`, { fs: 13, c: '#0369a1', anchor: 'middle', fw: '900' });

            // 數線主體
            out += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="#334155" stroke-width="3"/>`;
            out += `<polygon points="${endX},${y-5} ${endX+10},${y} ${endX},${y+5}" fill="#334155"/>`;

            // 刻度
            out += `<line x1="${startX}" y1="${y-7}" x2="${startX}" y2="${y+7}" stroke="#334155" stroke-width="2"/>`;
            out += TX(startX, y + 24, '3000', { fs: 12, anchor: 'middle', fw: '900', c: nearV === 3000 ? '#2563eb' : '#64748b' });

            out += `<line x1="200" y1="${y-5}" x2="200" y2="${y+5}" stroke="#94a3b8" stroke-width="2"/>`;
            out += TX(200, y + 24, '3500', { fs: 11, c: '#64748b', anchor: 'middle' });

            out += `<line x1="${endX}" y1="${y-7}" x2="${endX}" y2="${y+7}" stroke="#334155" stroke-width="2"/>`;
            out += TX(endX, y + 24, '4000', { fs: 12, anchor: 'middle', fw: '900', c: nearV === 4000 ? '#059669' : '#64748b' });

            // 動態紅點
            out += `<circle cx="${cx}" cy="${y}" r="6.5" fill="#e11d48"/>`;
            out += TX(cx, y - 12, `${v}`, { fs: 12.5, c: '#e11d48', anchor: 'middle', fw: '900' });

            // 估算結果卡
            out += `<rect x="80" y="105" width="240" height="24" rx="6" fill="${nearV === 4000 ? '#dcfce7' : '#dbeafe'}" stroke="${nearColor}" stroke-width="1.2"/>`;
            out += TX(200, 121, `➔ 靠近 ${nearV}，大約估算為 ${nearV}！`, { fs: 11.5, c: nearColor, anchor: 'middle', fw: '900' });

            estg.innerHTML = out;
          }

          sl.oninput = render;
          render();
        },
        caption: '拖動數線滑桿：當百位數大於等於 5（超過 3500）時靠近 4000；反之則靠近 3000！',
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
        title: '【互動驗算】運用加減法互逆關係親自挑戰驗算！',
        points: [
          '<b>加法的驗算</b>：用「和 － 加數 ＝ 被加數」。',
          '<b>減法的驗算</b>：用「差 ＋ 減數 ＝ 被減數」。',
          '點擊下方題目，選出正確的驗算算式吧！'
        ],
        visual: (h) => {
          h.innerHTML = `
            <div style="width:100%;text-align:center;font-family:sans-serif;padding:4px;">
              <div id="ckQuizStage" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px;min-height:150px;"></div>
              <div style="display:flex;justify-content:center;gap:8px;margin-top:8px;">
                <button class="cktab active" data-m="add" style="padding:4px 12px;border-radius:6px;border:1px solid #2563eb;background:#2563eb;color:#fff;font-weight:800;font-size:12px;cursor:pointer;">加法題：1323 + 1699 = 3022</button>
                <button class="cktab" data-m="sub" style="padding:4px 12px;border-radius:6px;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-weight:800;font-size:12px;cursor:pointer;">減法題：3000 - 2184 = 816</button>
              </div>
            </div>
          `;

          let currMode = 'add';
          const stage = h.querySelector('#ckQuizStage');
          const tabs = h.querySelectorAll('.cktab');

          function renderQuiz() {
            const isAdd = currMode === 'add';
            const titleStr = isAdd ? '1323 ＋ 1699 ＝ 3022' : '3000 － 2184 ＝ 816';
            const opts = isAdd
              ? [{ text: '3022 － 1699 ＝ 1323', ok: true }, { text: '1323 ＋ 3022 ＝ 4345', ok: false }]
              : [{ text: '816 ＋ 2184 ＝ 3000', ok: true }, { text: '3000 ＋ 816 ＝ 3816', ok: false }];

            let out = `
              <div style="font-size:15px;font-weight:900;color:#0f172a;margin-bottom:8px;">
                要驗算算式 <span style="color:#2563eb;">${titleStr}</span>，哪一個才是正確的驗算算式？
              </div>
              <div style="display:flex;gap:10px;justify-content:center;margin:10px 0;">
            `;
            opts.forEach((o, i) => {
              out += `<button class="ck-opt" data-ok="${o.ok}" style="padding:8px 14px;border-radius:8px;border:1.5px solid #cbd5e1;background:#fff;font-size:13.5px;font-weight:800;color:#334155;cursor:pointer;">${o.text}</button>`;
            });
            out += `</div><div id="ckFeedback" style="min-height:36px;"></div>`;
            stage.innerHTML = out;

            const optBtns = stage.querySelectorAll('.ck-opt');
            const fb = stage.querySelector('#ckFeedback');

            optBtns.forEach(btn => {
              btn.onclick = () => {
                const ok = btn.getAttribute('data-ok') === 'true';
                if (ok) {
                  btn.style.background = '#dcfce7'; btn.style.borderColor = '#059669'; btn.style.color = '#047857';
                  fb.innerHTML = `<div style="background:#f0fdf4;border:1.5px solid #059669;border-radius:8px;padding:6px;color:#047857;font-weight:900;font-size:13px;">🎉 答對了！ ${isAdd ? '加法用減法驗算（和 - 加數 = 被加數）' : '減法用加法驗算（差 + 減數 = 被減數）'}</div>`;
                } else {
                  btn.style.background = '#fee2e2'; btn.style.borderColor = '#ef4444'; btn.style.color = '#991b1b';
                  fb.innerHTML = `<div style="background:#fff1f2;border:1.5px solid #ef4444;border-radius:8px;padding:6px;color:#991b1b;font-weight:900;font-size:13px;">❌ 答錯囉！請用互逆關係（加變減、減變加）來驗算！</div>`;
                }
              };
            });
          }

          tabs.forEach(tab => {
            tab.onclick = () => {
              tabs.forEach(t => { t.style.background = '#fff'; t.style.color = '#334155'; t.style.borderColor = '#cbd5e1'; });
              tab.style.background = '#2563eb'; tab.style.color = '#fff'; tab.style.borderColor = '#2563eb';
              currMode = tab.getAttribute('data-m');
              renderQuiz();
            };
          });

          renderQuiz();
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
