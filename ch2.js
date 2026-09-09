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

      {
        sec: '2-1', secName: '四位數的加法',
        title: '拖動滑桿，觀察積木滿10如何進位到高一位',
        points: [
          '當個位積木滿 10 個，會換成 <span class="k">1 個十格條</span>。',
          '當十位積木滿 10 條，會換成 <span class="k">1 個百格板</span>。',
          '當百位積木滿 10 板，會換成 <span class="k">1 個千格塊</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="addg"></div>
            <div class="ictrl" style="margin-top:8px">
              <label>被加數 A：<span class="ival av">1227</span></label>
              <input class="as" type="range" min="1000" max="2500" step="50" value="1227">
              <label style="margin-left:12px">加數 B：<span class="ival bv">878</span></label>
              <input class="bs" type="range" min="100" max="1500" step="50" value="878">
            </div>
          </div>`;

          const update = () => {
            const a = +h.querySelector('.as').value;
            const b = +h.querySelector('.bs').value;
            h.querySelector('.av').textContent = a;
            h.querySelector('.bv').textContent = b;
            const sum = a + b;

            let out = BOX(20, 10, 360, 150, { fill: '#f8fafc', stroke: BLU });
            out += TX(200, 32, `${a} ＋ ${b} ＝ ${sum}`, { fs: 17, c: BLU, anchor: 'middle' });

            // 繪製直式與進位
            out += TX(100, 60, `  ${a.toString().padStart(4, ' ')}`, { fs: 16, anchor: 'start' });
            out += TX(100, 85, `＋ ${b.toString().padStart(4, ' ')}`, { fs: 16, c: BLU, anchor: 'start' });
            out += `<line x1="95" y1="92" x2="200" y2="92" stroke="#334155" stroke-width="2"/>`;
            out += TX(100, 115, `= ${sum}`, { fs: 18, c: RED, anchor: 'start' });

            // 進位分析說明卡
            out += BOX(220, 45, 150, 100, { fill: '#fff', stroke: '#cbd5e1' });
            out += TX(230, 68, '位值滿十進位分析', { fs: 12, c: VIO });
            out += TX(230, 90, `個位: ${(a%10)}+${(b%10)} = ${a%10+b%10} ${a%10+b%10>=10?'(進1)':''}`, { fs: 11, c: RED });
            const c1 = (a%10+b%10>=10?1:0);
            const tSum = Math.floor((a%100)/10)+Math.floor((b%100)/10)+c1;
            out += TX(230, 110, `十位: +${c1} 滿10: ${tSum>=10?'進1':'無'}`, { fs: 11, c: GRN });
            out += TX(230, 130, `合起來：${sum}`, { fs: 12, c: BLU, fw: '900' });

            h.querySelector('.addg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.as').oninput = update;
          h.querySelector('.bs').oninput = update;
          update();
        },
        caption: '動態調整被加數與加數，觀察滿 10 個一進 1 個十、滿 10 個十進 1 個百。',
        example: {
          q: '阿哲參觀展覽，第一天有 1227 人，第二天有 878 人，兩天共有幾人？',
          steps: [
            '列式：1227 ＋ 878',
            '個位：7 ＋ 8 ＝ 15（寫 5 進 1）',
            '十位：1 ＋ 2 ＋ 7 ＝ 10（寫 0 進 1）',
            '百位：1 ＋ 2 ＋ 8 ＝ 11（寫 1 進 1），千位：1 ＋ 1 ＝ 2'
          ],
          ans: '2105 人'
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

          // 直式對齊 (萬, 千, 百, 十, 個)
          const cols = [80, 120, 160, 200, 240, 280];
          out += TX(cols[1], 60, '萬', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[2], 60, '千', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[3], 60, '百', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[4], 60, '十', { fs: 12, c: '#64748b', anchor: 'middle' });
          out += TX(cols[5], 60, '個', { fs: 12, c: '#64748b', anchor: 'middle' });

          // 進位小紅字
          out += TX(cols[1], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[2], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[3], 76, '1', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(cols[4], 76, '1', { fs: 12, c: RED, anchor: 'middle' });

          // 626
          out += TX(cols[3], 95, '6', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 95, '2', { fs: 16, anchor: 'middle' });
          out += TX(cols[5], 95, '6', { fs: 16, anchor: 'middle' });

          // + 4374
          out += TX(cols[0], 118, '＋', { fs: 16, c: GRN, anchor: 'middle' });
          out += TX(cols[2], 118, '4', { fs: 16, anchor: 'middle' });
          out += TX(cols[3], 118, '3', { fs: 16, anchor: 'middle' });
          out += TX(cols[4], 118, '7', { fs: 16, anchor: 'middle' });
          out += TX(cols[5], 118, '4', { fs: 16, anchor: 'middle' });

          out += `<line x1="70" y1="124" x2="295" y2="124" stroke="#172033" stroke-width="2"/>`;

          // 5000
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

          // 位值欄頭
          out += BOX(100, 50, 60, 22, { fill: '#e0e7ff', stroke: 'none' });
          out += TX(130, 66, '百位', { fs: 12, c: BLU, anchor: 'middle' });
          out += BOX(170, 50, 60, 22, { fill: '#dcfce7', stroke: 'none' });
          out += TX(200, 66, '十位', { fs: 12, c: GRN, anchor: 'middle' });
          out += BOX(240, 50, 60, 22, { fill: '#ffe4e6', stroke: 'none' });
          out += TX(270, 66, '個位', { fs: 12, c: RED, anchor: 'middle' });

          // 退位標記 (劃掉數字與上面小數字)
          out += TX(270, 80, '15', { fs: 12, c: RED, anchor: 'middle' });
          out += TX(200, 80, '13 (被借1剩3)', { fs: 10, c: RED, anchor: 'middle' });

          // 345
          out += TX(130, 102, '3', { fs: 16, anchor: 'middle' });
          out += TX(200, 102, '4', { fs: 16, anchor: 'middle' });
          out += TX(270, 102, '5', { fs: 16, anchor: 'middle' });

          // - 88
          out += TX(80, 122, '－', { fs: 16, c: RED, anchor: 'middle' });
          out += TX(200, 122, '8', { fs: 16, anchor: 'middle' });
          out += TX(270, 122, '8', { fs: 16, anchor: 'middle' });

          out += `<line x1="75" y1="128" x2="300" y2="128" stroke="#172033" stroke-width="2"/>`;

          // 257
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

      {
        sec: '2-2', secName: '四位數的減法',
        title: '遇到個位/十位是 0，一路向高位借 1 轉換',
        points: [
          '當被減數個位與十位都是 0 時（如 500），要向<b>百位或千位借位</b>。',
          '百位借 1 給十位當 10，十位再借 1 給個位當 10（十位剩 9）。',
          '拖動滑桿，觀察連續借位的變化。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center;padding:4px">
            <div class="subg"></div>
            <div class="ictrl" style="margin-top:8px">
              <label>被減數 A：<span class="ival av">3010</span></label>
              <input class="as" type="range" min="1000" max="6000" step="1000" value="3000">
              <label style="margin-left:12px">減數 B：<span class="ival bv">1947</span></label>
              <input class="bs" type="range" min="500" max="2500" step="100" value="1900">
            </div>
          </div>`;

          const update = () => {
            const rawA = +h.querySelector('.as').value;
            const b = +h.querySelector('.bs').value;
            const a = rawA === 3000 ? 3010 : rawA;
            h.querySelector('.av').textContent = a;
            h.querySelector('.bv').textContent = b;
            const diff = a - b;

            let out = BOX(20, 10, 360, 150, { fill: '#fef2f2', stroke: RED });
            out += TX(200, 32, `${a} － ${b} ＝ ${diff}`, { fs: 17, c: RED, anchor: 'middle' });

            out += TX(100, 60, `  ${a.toString().padStart(4, ' ')}`, { fs: 16, anchor: 'start' });
            out += TX(100, 85, `－ ${b.toString().padStart(4, ' ')}`, { fs: 16, c: RED, anchor: 'start' });
            out += `<line x1="95" y1="92" x2="200" y2="92" stroke="#334155" stroke-width="2"/>`;
            out += TX(100, 115, `= ${diff}`, { fs: 18, c: GRN, anchor: 'start' });

            out += BOX(220, 45, 150, 100, { fill: '#fff', stroke: '#fca5a5' });
            out += TX(230, 68, '中間有0退位提示', { fs: 12, c: RED, fw: '900' });
            out += TX(230, 90, '• 0 不夠減，向左借', { fs: 11 });
            out += TX(230, 110, '• 被借的 0 會變成 9', { fs: 11, c: VIO });
            out += TX(230, 130, `計算結果：${diff}`, { fs: 12, c: GRN, fw: '900' });

            h.querySelector('.subg').innerHTML = svg('0 0 400 170', out);
          };

          h.querySelector('.as').oninput = update;
          h.querySelector('.bs').oninput = update;
          update();
        },
        caption: '當十位或百位是 0 時，向更高位借 1 後，中間的 0 換成 9 再繼續減。',
        example: {
          q: '大賣場進貨 3010 箱蘋果，賣出 1947 箱，還剩下幾箱蘋果？',
          steps: [
            '列式：3010 － 1947',
            '個位 0 不夠減 7，向十位 1 借 1（10 － 7 ＝ 3）',
            '十位 0 不夠減 4，向千位 3 借 1（百位變 9，10 － 4 ＝ 6）',
            '百位 9 － 9 ＝ 0，千位 2 － 1 ＝ 1'
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

          // 數線主體
          out += `<line x1="60" y1="90" x2="340" y2="90" stroke="#334155" stroke-width="3"/>`;
          out += `<polygon points="340,85 350,90 340,95" fill="#334155"/>`;

          // 刻度 3000, 3500, 4000
          out += `<line x1="80" y1="83" x2="80" y2="97" stroke="#334155" stroke-width="2"/>`;
          out += TX(80, 118, '3000', { fs: 13, anchor: 'middle' });

          out += `<line x1="200" y1="85" x2="200" y2="95" stroke="#94a3b8" stroke-width="2"/>`;
          out += TX(200, 118, '3500', { fs: 12, c: '#64748b', anchor: 'middle' });

          out += `<line x1="320" y1="83" x2="320" y2="97" stroke="#334155" stroke-width="2"/>`;
          out += TX(320, 118, '4000', { fs: 13, c: GRN, anchor: 'middle' });

          // 3852 位置點 (x ≈ 302)
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
          out += TX(107, 65, ' 3010', { fs: 14, anchor: 'middle' });
          out += TX(107, 85, '－1947', { fs: 14, anchor: 'middle' });
          out += `<line x1="50" y1="92" x2="160" y2="92" stroke="#172033" stroke-width="1.8"/>`;
          out += TX(107, 115, ' 1163', { fs: 15, c: RED, anchor: 'middle' });
          out += TX(107, 140, '（百位忘記變 9！）', { fs: 11, c: RED, anchor: 'middle' });

          out += BOX(205, 15, 175, 145, { fill: '#f0fdf4', stroke: GRN });
          out += TX(292, 36, '✅ 正確算法', { fs: 14, c: GRN, anchor: 'middle' });
          out += TX(292, 65, ' 3010', { fs: 14, anchor: 'middle' });
          out += TX(292, 85, '－1947', { fs: 14, anchor: 'middle' });
          out += `<line x1="235" y1="92" x2="350" y2="92" stroke="#172033" stroke-width="1.8"/>`;
          out += TX(292, 115, ' 1063', { fs: 15, c: GRN, anchor: 'middle' });
          out += TX(292, 140, '（百位 9－9＝0）', { fs: 11, c: GRN, anchor: 'middle' });

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
