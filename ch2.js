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

  // 100% 精準位值對齊直式繪製 Helper (解決個/十/百/千位位值錯位問題)
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
          
          // 位值欄位頭
          out += BOX(50, 50, 60, 24, { fill: '#ede9fe', stroke: 'none' });
          out += TX(80, 67, '千位', { fs: 13, c: VIO, anchor: 'middle' });
          out += BOX(120, 50, 60, 24, { fill: '#e0e7ff', stroke: 'none' });
          out += TX(150, 67, '百位', { fs: 13, c: BLU, anchor: 'middle' });
          out += BOX(190, 50, 60, 24, { fill: '#dcfce7', stroke: 'none' });
          out += TX(220, 67, '十位', { fs: 13, c: GRN, anchor: 'middle' });
          out += BOX(260, 50, 60, 24, { fill: '#ffe4e6', stroke: 'none' });
          out += TX(290, 67, '個位', { fs: 13, c: RED, anchor: 'middle' });

          // 進位標記 (紅圈/紅字 1)
          out += TX(80, 84, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(150, 84, '1', { fs: 12, c: RED, anchor: 'middle' });

          // 數字列 1: 891
          out += TX(80, 102, ' ', { anchor: 'middle' });
          out += TX(150, 102, '8', { fs: 16, anchor: 'middle' });
          out += TX(220, 102, '9', { fs: 16, anchor: 'middle' });
          out += TX(290, 102, '1', { fs: 16, anchor: 'middle' });

          // 數字列 2: + 446
          out += TX(42, 122, '＋', { fs: 16, c: VIO, anchor: 'middle' });
          out += TX(150, 122, '4', { fs: 16, anchor: 'middle' });
          out += TX(220, 122, '4', { fs: 16, anchor: 'middle' });
          out += TX(290, 122, '6', { fs: 16, anchor: 'middle' });

          // 橫線
          out += `<line x1="45" y1="128" x2="325" y2="128" stroke="#172033" stroke-width="2"/>`;

          // 結果列: 1337
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

      /* ---------- Option A: 2-1-2 「滿10進1」積木聚合與直式動態推演器 ---------- */
      {
        sec: '2-1', secName: '四位數的加法',
        title: '分步觀察：滿10個小積木如何聚合成十格條進位',
        points: [
          '點擊下方<b>【分步推演】</b>按鈕，觀察位值積木的進位過程。',
          '當個位積木滿 10 個，會<b>聚合成 1 條十格條</b>進到十位。',
          '直式十位數上方會同步出現小紅字 <span class="k">＋1</span>！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="addg"></div>
            <div class="ictrl" style="margin-top:6px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap">
              <button class="sbtn btn-0 dbtn active">⏮️ 重置</button>
              <button class="sbtn btn-1 dbtn">▶️ 1.個位7+8=15</button>
              <button class="sbtn btn-2 dbtn">▶️ 2.滿10進1到十位</button>
              <button class="sbtn btn-3 dbtn">▶️ 3.十位/百位進位</button>
              <button class="sbtn btn-4 dbtn">▶️ 4.完成(2135)</button>
            </div>
          </div>`;

          let step = 0;
          const a = 1257, b = 878, sum = 2135;

          const update = () => {
            // 更新按鈕高亮
            h.querySelectorAll('.sbtn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#f8fafc', stroke: VIO });
            out += TX(200, 30, `加法「滿10進1」分步演練：1257 ＋ 878`, { fs: 15, c: VIO, anchor: 'middle' });

            // 左側 (x=20~220)：積木視覺看板 (千, 百, 十, 個)
            out += BOX(25, 42, 195, 112, { fill: '#fff', stroke: '#cbd5e1' });
            const colsX = [30, 75, 120, 165]; // 千, 百, 十, 個
            out += TX(48, 58, '千(📦)', { fs: 10, c: BLU, anchor: 'middle' });
            out += TX(93, 58, '百(🔳)', { fs: 10, c: GRN, anchor: 'middle' });
            out += TX(138, 58, '十(❚)', { fs: 10, c: VIO, anchor: 'middle' });
            out += TX(183, 58, '個(▪)', { fs: 10, c: RED, anchor: 'middle' });
            out += `<line x1="25" y1="63" x2="220" y2="63" stroke="#cbd5e1" stroke-width="1"/>`;

            // 根據步驟繪製積木
            if (step === 0) {
              out += TX(48, 90, '1 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '2 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '5 條', { fs: 12, anchor: 'middle' });
              out += TX(183, 90, '7 個', { fs: 12, anchor: 'middle' });
              out += TX(122, 140, '點擊按鈕一步步觀察進位 ➔', { fs: 11, c: VIO, anchor: 'middle' });
            } else if (step === 1) {
              out += TX(48, 90, '1 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '2 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '5 條', { fs: 12, anchor: 'middle' });
              out += TX(183, 90, '15 個', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
              out += BOX(168, 75, 30, 24, { fill: 'rgba(225,29,72,.1)', stroke: RED });
              out += TX(122, 140, '個位：7＋8 ＝ 15 個小積木', { fs: 11, c: RED, anchor: 'middle' });
            } else if (step === 2) {
              out += TX(48, 90, '1 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '2 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '5＋1條', { fs: 12, c: VIO, anchor: 'middle', fw: '900' });
              out += TX(183, 90, '留 5 個', { fs: 12, c: RED, anchor: 'middle' });
              // 聚合動畫標記
              out += `<path d="M 175 75 Q 150 65 145 75" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="3,3"/>`;
              out += TX(122, 140, '10個小積木 ➔ 聚合成1條飛入十位！', { fs: 11, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 3) {
              out += TX(48, 90, '1＋1塊', { fs: 12, c: BLU, anchor: 'middle', fw: '900' });
              out += TX(93, 90, '留 1 板', { fs: 12, c: GRN, anchor: 'middle' });
              out += TX(138, 90, '留 3 條', { fs: 12, c: VIO, anchor: 'middle' });
              out += TX(183, 90, '留 5 個', { fs: 12, c: RED, anchor: 'middle' });
              out += TX(122, 140, '十位滿10進1到百位、百位滿10進1！', { fs: 11, c: GRN, anchor: 'middle', fw: '900' });
            } else if (step === 4) {
              out += TX(48, 90, '2 塊', { fs: 13, c: BLU, anchor: 'middle', fw: '900' });
              out += TX(93, 90, '1 板', { fs: 13, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(138, 90, '3 條', { fs: 13, c: VIO, anchor: 'middle', fw: '900' });
              out += TX(183, 90, '5 個', { fs: 13, c: RED, anchor: 'middle', fw: '900' });
              out += TX(122, 140, '🎉 計算完成：合起來是 2135！', { fs: 11, c: GRN, anchor: 'middle', fw: '900' });
            }

            // 右側 (x=235~375)：連動直式筆記
            out += BOX(230, 42, 150, 112, { fill: '#fff', stroke: '#cbd5e1' });
            out += TX(305, 58, '直式筆記連動', { fs: 11, c: '#64748b', anchor: 'middle' });

            // 直式標頭與小紅字進位
            if (step >= 2) out += TX(320, 68, '+1', { fs: 10, c: RED, anchor: 'middle' });
            if (step >= 3) {
              out += TX(298, 68, '+1', { fs: 10, c: RED, anchor: 'middle' });
              out += TX(276, 68, '+1', { fs: 10, c: RED, anchor: 'middle' });
            }

            // 直式 1257 + 878
            const resVal = step === 0 ? '' : (step === 1 ? '' : (step === 2 ? '   5' : (step === 3 ? ' 135' : '2135')));
            out += renderVerticalMath('＋', a, b, resVal, 248, 76, { fs: 14, colW: 22, colorRes: RED, opColor: VIO });

            h.querySelector('.addg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.btn-0').onclick = () => { step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { step = 2; update(); };
          h.querySelector('.btn-3').onclick = () => { step = 3; update(); };
          h.querySelector('.btn-4').onclick = () => { step = 4; update(); };
          update();
        },
        caption: '分步點擊按鈕，觀察 10 個小積木如何聚合成 1 條十格條飛入十位並在直式記下進位 +1！',
        example: {
          q: '阿哲參觀展覽，第一天有 1257 人，第二天有 878 人，兩天共有幾人？',
          steps: [
            '個位：7 ＋ 8 ＝ 15（10個小積木換成1條十格條進位到十位，寫5進1）',
            '十位：1 ＋ 5 ＋ 7 ＝ 13（10條十格條換成1張百格板進位到百位，寫3進1）',
            '百位：1 ＋ 2 ＋ 8 ＝ 11（寫1進1），千位：1 ＋ 1 ＝ 2'
          ],
          ans: '2135 人'
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

      /* ---------- Option B: 2-2-2 「借1當10」積木拆解與直式動態推演器 ---------- */
      {
        sec: '2-2', secName: '四位數的減法',
        title: '破解難關：解密中間有0退位時，0為什麼會變成9？',
        points: [
          '點擊下方<b>【分步推演】</b>按鈕，觀察向千位/百位借位的物理過程。',
          '當個位 $0-7$ 不夠減，且十位/百位是 $0$ 時，必須向<b>高位借位拆解</b>。',
          '千格塊拆給百位 ➔ 百格板再拆 1 給十位，所以<b>中間的 0 會變成 9</b>！'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="subg"></div>
            <div class="ictrl" style="margin-top:6px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap">
              <button class="sbtn btn-0 dbtn active">⏮️ 重置</button>
              <button class="sbtn btn-1 dbtn">▶️ 1.個位0-7不夠減</button>
              <button class="sbtn btn-2 dbtn">▶️ 2.向十位借1條拆10個</button>
              <button class="sbtn btn-3 dbtn">▶️ 3.解密中間0變9</button>
              <button class="sbtn btn-4 dbtn">▶️ 4.完成(1063)</button>
            </div>
          </div>`;

          let step = 0;
          const a = 3010, b = 1947, diff = 1063;

          const update = () => {
            h.querySelectorAll('.sbtn').forEach((btn, idx) => {
              btn.classList.toggle('active', idx === step);
            });

            let out = BOX(10, 10, 380, 155, { fill: '#fef2f2', stroke: RED });
            out += TX(200, 30, `減法「借1當10」分步演練：3010 － 1947`, { fs: 15, c: RED, anchor: 'middle' });

            // 左側 (x=25~220)：積木拆解看板 (千, 百, 十, 個)
            out += BOX(25, 42, 195, 112, { fill: '#fff', stroke: '#fca5a5' });
            out += TX(48, 58, '千(📦)', { fs: 10, c: BLU, anchor: 'middle' });
            out += TX(93, 58, '百(🔳)', { fs: 10, c: GRN, anchor: 'middle' });
            out += TX(138, 58, '十(❚)', { fs: 10, c: VIO, anchor: 'middle' });
            out += TX(183, 58, '個(▪)', { fs: 10, c: RED, anchor: 'middle' });
            out += `<line x1="25" y1="63" x2="220" y2="63" stroke="#fca5a5" stroke-width="1"/>`;

            if (step === 0) {
              out += TX(48, 90, '3 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '0 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '1 條', { fs: 12, anchor: 'middle' });
              out += TX(183, 90, '0 個', { fs: 12, anchor: 'middle' });
              out += TX(122, 140, '點擊【步驟 1】開始觀察借位拆解！', { fs: 11, c: RED, anchor: 'middle' });
            } else if (step === 1) {
              out += TX(48, 90, '3 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '0 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '1 條', { fs: 12, anchor: 'middle' });
              out += TX(183, 90, '0 個(不夠減)', { fs: 11, c: RED, anchor: 'middle', fw: '900' });
              out += TX(122, 140, '個位 0 不夠減 7！準備向十位借1條', { fs: 11, c: RED, anchor: 'middle' });
            } else if (step === 2) {
              out += TX(48, 90, '3 塊', { fs: 12, anchor: 'middle' });
              out += TX(93, 90, '0 板', { fs: 12, anchor: 'middle' });
              out += TX(138, 90, '剩0條(被借)', { fs: 10, c: RED, anchor: 'middle' });
              out += TX(183, 90, '換10個小積木', { fs: 10, c: GRN, anchor: 'middle', fw: '900' });
              out += `<path d="M 140 75 Q 160 65 180 75" fill="none" stroke="${GRN}" stroke-width="2" stroke-dasharray="3,3"/>`;
              out += TX(122, 140, '1條十格條向右拆成10個小積木！(10-7=3)', { fs: 10, c: GRN, anchor: 'middle', fw: '900' });
            } else if (step === 3) {
              out += TX(48, 90, '剩 2 塊', { fs: 11, c: RED, anchor: 'middle' });
              out += TX(93, 90, '變 9 板!', { fs: 12, c: RED, anchor: 'middle', fw: '900' });
              out += TX(138, 90, '得 10 條', { fs: 12, c: GRN, anchor: 'middle', fw: '900' });
              out += TX(183, 90, '留 3 個', { fs: 11, anchor: 'middle' });
              out += TX(122, 140, '解密：千位拆10板，拿1板拆10條，百位剩9！', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
            } else if (step === 4) {
              out += TX(48, 90, '1 塊', { fs: 12, c: BLU, anchor: 'middle' });
              out += TX(93, 90, '0 板', { fs: 12, c: GRN, anchor: 'middle' });
              out += TX(138, 90, '6 條', { fs: 12, c: VIO, anchor: 'middle' });
              out += TX(183, 90, '3 個', { fs: 12, c: RED, anchor: 'middle' });
              out += TX(122, 140, '🎉 計算完成：相減結果為 1063！', { fs: 11, c: GRN, anchor: 'middle', fw: '900' });
            }

            // 右側 (x=230~380)：連動直式筆記
            out += BOX(230, 42, 150, 112, { fill: '#fff', stroke: '#fca5a5' });
            out += TX(305, 58, '直式筆記退位標記', { fs: 11, c: '#64748b', anchor: 'middle' });

            // 劃線與退位數字標籤
            if (step >= 2) {
              out += TX(340, 68, '10', { fs: 10, c: RED, anchor: 'middle' });
              out += `<line x1="330" y1="74" x2="336" y2="82" stroke="${RED}" stroke-width="1.5"/>`; // 十位 1 劃掉
            }
            if (step >= 3) {
              out += TX(274, 68, '2', { fs: 10, c: RED, anchor: 'middle' });
              out += TX(296, 68, '9', { fs: 10, c: RED, anchor: 'middle', fw: '900' });
              out += TX(318, 68, '10', { fs: 10, c: RED, anchor: 'middle' });
            }

            const resVal = step === 0 ? '' : (step === 1 ? '' : (step === 2 ? '   3' : (step === 3 ? ' 63' : '1063')));
            out += renderVerticalMath('－', a, b, resVal, 248, 76, { fs: 14, colW: 22, colorRes: GRN, opColor: RED });

            h.querySelector('.subg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.btn-0').onclick = () => { step = 0; update(); };
          h.querySelector('.btn-1').onclick = () => { step = 1; update(); };
          h.querySelector('.btn-2').onclick = () => { step = 2; update(); };
          h.querySelector('.btn-3').onclick = () => { step = 3; update(); };
          h.querySelector('.btn-4').onclick = () => { step = 4; update(); };
          update();
        },
        caption: '分步觀察向高位借位拆解的過程，明白百位的 0 在借給十位後為何會變成 9！',
        example: {
          q: '大賣場進貨 3010 箱蘋果，賣出 1947 箱，還剩下幾箱蘋果？',
          steps: [
            '個位 0 － 7 不夠減，向十位 1 借 1 條拆成 10 個小積木（10 － 7 ＝ 3）',
            '十位 0 － 4 不夠減，千位 3 塊拆 1 塊給百位，百位 10 板拆 1 板給十位（百位變 9，十位變 10）',
            '十位 10 － 4 ＝ 6，百位 9 － 9 ＝ 0，千位 2 － 1 ＝ 1'
          ],
          ans: '1063 箱'
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

          // 退位標記 5, 9, 9, 10
          out += TX(cols[1], 75, '5', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[2], 75, '9', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[3], 75, '9', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[4], 75, '10', { fs: 12, c: RED, anchor: 'middle' });

          // 6000
          out += TX(cols[1], 96, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[2], 96, '0', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 96, '0', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 96, '0', { fs: 16, anchor: 'middle' });

          // - 2685
          out += TX(cols[0], 118, '－', { fs: 16, c: AMB, anchor: 'middle' });
          out += TX(cols[1], 118, '2', { fs: 16, anchor: 'middle' });
          out += TX(cols[2], 118, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 118, '8', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 118, '5', { fs: 16, anchor: 'middle' });

          out += `<line x1="80" y1="124" x2="265" y2="124" stroke="#172033" stroke-width="2"/>`;

          // 3315
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
