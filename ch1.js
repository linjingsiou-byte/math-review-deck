/* ============ 第 1 章　10000以內的數 ============
   依康軒國小 3 上第 1 單元：
   1-1 認識10000以內的數
   1-2 位值與換算
   1-3 數的大小比較
   1-4 認識數線
   ============================================================ */
window.DECK = window.DECK || [];
(function () {
  const C = '#2563eb';
  const RED = '#e11d48', GRN = '#059669', BLU = '#2563eb', VIO = '#7c3aed', AMB = '#d97706';

  function svg(vb, inner) {
    return `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${inner}</svg></div>`;
  }

  window.DECK.push({
    ch: 1,
    title: '10000以內的數',
    color: C,
    sections: ['1-1 認識10000以內的數', '1-2 位值與換算', '1-3 數的大小比較', '1-4 認識數線'],
    slides: [

      /* ---------- 1-1 認識10000以內的數 ---------- */
      {
        sec: '1-1',
        secName: '認識10000以內的數',
        title: '10個一百合起來就是一千',
        points: [
          '10 個百格積木合起來是 <span class="k">1 個千格積木</span>。',
          '10 個 100 是 <span class="k">1000</span>，讀作一千。'
        ],
        formula: { label: '千的組成', tex: '100 \\times 10 = 1000' },
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <svg viewBox="0 0 400 210" style="max-width:100%">
              <g class="stackg"></g>
            </svg>
            <div class="ictrl">
              <label>百格積木數量：<span class="ival numv">10</span> 個 (＝ <span class="ival totalv">1000</span>)</label>
              <input class="num-r" type="range" min="1" max="10" step="1" value="10">
            </div>
          </div>`;
          const sl = h.querySelector('.num-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), stackg = h.querySelector('.stackg');
          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.textContent = n * 100;
            stackg.innerHTML = SV.hundredToThousandStack({ x: 30, y: 75, n: n, s: 75, color: '#2563eb' });
          };
          sl.oninput();
        },
        caption: '拖動滑桿，觀察 10 個百格板堆疊合體成 1 個立體千格大積木！',
        example: {
          q: '漁民昨天捕撈了 1000 隻飛魚，用百格積木來表示，需要幾個百格積木？',
          steps: [
            '10 個百合起來是 1000',
            '所以需要 10 個百格積木（等於 1 個立體千格積木）'
          ],
          ans: '10 個百格積木（1 個千格積木）'
        }
      },

      {
        sec: '1-1',
        secName: '認識10000以內的數',
        title: '10個一千合起來就是一萬',
        points: [
          '從 1000、2000... 數到 9000 再加 1000 就是 <span class="k">10000</span>。',
          '在定位板上記在 <span class="k">萬位</span>，讀作一萬。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;padding:4px;text-align:center">
            <!-- 3D 千格積木動態區 -->
            <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:12px;padding:6px;margin-bottom:8px">
              <div style="font-size:13px;font-weight:900;color:#2563eb;margin-bottom:4px">【3D 立體千格積木（1000）動態累積】</div>
              <svg viewBox="0 0 400 135" style="max-width:100%;display:block;margin:auto">
                <g class="cubes-g"></g>
              </svg>
            </div>

            <!-- 萬位定位板 -->
            <div class="pv-wan-board" style="max-width:390px;margin:auto;background:#ffffff;border:2.5px solid #7c3aed;border-radius:14px;padding:10px;box-shadow:0 6px 16px rgba(124,58,237,0.12)">
              <div style="font-size:14.5px;font-weight:900;color:#7c3aed;margin-bottom:6px">萬位定位板</div>
              <table style="width:100%;border-collapse:collapse;text-align:center;font-weight:800;border:1.5px solid #c4b5fd">
                <thead>
                  <tr style="background:#7c3aed;color:#ffffff;font-size:14px">
                    <th class="th-wan" style="padding:6px;border:1px solid #c4b5fd;width:20%;background:#7c3aed">萬位</th>
                    <th class="th-thousand" style="padding:6px;border:1px solid #c4b5fd;width:20%;background:#2563eb">千位</th>
                    <th style="padding:6px;border:1px solid #c4b5fd;width:20%">百位</th>
                    <th style="padding:6px;border:1px solid #c4b5fd;width:20%">十位</th>
                    <th style="padding:6px;border:1px solid #c4b5fd;width:20%">個位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background:#fff">
                    <td class="col-wan" style="padding:8px;border:1px solid #ddd;font-size:22px;color:#dc2626;font-weight:900"></td>
                    <td class="col-thousand" style="padding:8px;border:1px solid #ddd;font-size:22px;color:#1e293b">1</td>
                    <td style="padding:8px;border:1px solid #ddd;font-size:22px;color:#1e293b">0</td>
                    <td style="padding:8px;border:1px solid #ddd;font-size:22px;color:#1e293b">0</td>
                    <td style="padding:8px;border:1px solid #ddd;font-size:22px;color:#1e293b">0</td>
                  </tr>
                </tbody>
              </table>
              <div class="pv-wan-box" style="margin-top:8px;padding:8px;border-radius:10px;background:#eff6ff;border:1.5px solid #93c5fd;font-size:14px;font-weight:800;color:#1e40af">
                共有 1 個千格塊 ＝ 1000
              </div>
            </div>

            <!-- 控制滑桿 -->
            <div class="ictrl" style="margin-top:10px;background:#f1f5f9;padding:8px 12px;border-radius:10px;border:1px solid #cbd5e1">
              <label style="font-weight:800;font-size:14.5px">拖動滑桿增加千格塊：<span class="ival numv" style="color:#2563eb;font-size:18px">1</span> 個千 (＝ <span class="ival totalv" style="color:#e11d48;font-size:18px">1000</span>)</label>
              <input class="wan-r" type="range" min="1" max="10" step="1" value="1" style="width:90%;margin-top:6px">
            </div>
          </div>`;
          const sl = h.querySelector('.wan-r'), numv = h.querySelector('.numv'), totalv = h.querySelector('.totalv'), wanBox = h.querySelector('.pv-wan-box');
          const colWan = h.querySelector('.col-wan'), colTh = h.querySelector('.col-thousand'), thWan = h.querySelector('.th-wan'), thTh = h.querySelector('.th-thousand');
          const cubesG = h.querySelector('.cubes-g');

          const drawCubes = (n) => {
            let out = '';
            for (let i = 0; i < n; i++) {
              const col = i % 5;
              const row = Math.floor(i / 5);
              const cx = 18 + col * 74;
              const cy = 16 + row * 54;
              const is10th = (n === 10 && i === 9);
              const color = is10th ? '#e11d48' : '#2563eb';

              out += SV.cube1000({ x: cx, y: cy, s: 38, color: color });
              out += `<rect x="${cx + 4}" y="${cy + 13}" width="30" height="14" rx="3" fill="#ffffff" fill-opacity="0.92"/>`;
              out += `<text x="${cx + 19}" y="${cy + 24}" text-anchor="middle" font-size="10.5" font-weight="900" fill="${color}">1000</text>`;
              out += `<text x="${cx + 19}" y="${cy - 3}" text-anchor="middle" font-size="9.5" font-weight="800" fill="#475569">第${i + 1}個千</text>`;
            }
            cubesG.innerHTML = out;
          };

          sl.oninput = () => {
            const n = +sl.value;
            numv.textContent = n;
            totalv.textContent = n * 1000;
            drawCubes(n);
            if (n < 10) {
              colWan.textContent = '';
              colTh.textContent = n;
              colWan.style.background = '';
              colTh.style.background = '#fef08a';
              thWan.style.background = '#7c3aed';
              thTh.style.background = '#2563eb';
              wanBox.style.background = '#eff6ff';
              wanBox.style.borderColor = '#93c5fd';
              wanBox.style.color = '#1e40af';
              wanBox.innerHTML = `共有 <b style="font-size:17px">${n}</b> 個千格塊 ＝ <b style="font-size:17px">${n * 1000}</b>`;
            } else {
              colWan.textContent = '1';
              colTh.textContent = '0';
              colWan.style.background = '#fee2e2';
              colTh.style.background = '';
              thWan.style.background = '#e11d48';
              thTh.style.background = '#7c3aed';
              wanBox.style.background = '#fef2f2';
              wanBox.style.borderColor = '#fca5a5';
              wanBox.style.color = '#991b1b';
              wanBox.innerHTML = `<b>10 個千</b> 合起來進位到萬位 ＝ <b style="font-size:19px;color:#dc2626">10000</b>（讀作一萬）！`;
            }
          };
          sl.oninput();
        },
        caption: '拖動滑桿，觀察從 1000 到 9000，當達到 10 個千時進位到「萬位」！',
        example: {
          q: '9000 再加 1000 是幾個千？合起來是多少？在定位板上記記看。',
          steps: [
            '9 個千加 1 個千是 10 個千',
            '10 個千合起來是 10000'
          ],
          ans: '10 個千，合起來是 10000（一萬）'
        }
      },

      {
        sec: '1-1',
        secName: '認識10000以內的數',
        title: '中間有零讀一個零，末尾的零不讀',
        points: [
          '數字中間有零時，<span class="k">只讀出一個「零」</span>（如 3005 讀作三千零五）。',
          '數字末尾的零，<span class="k">完全不必讀出來</span>（如 3700 讀作三千七百）。'
        ],
        visual: (h) => {
          h.innerHTML = SV.fbox([
            { label: '中間有零', tex: '3005 \\longrightarrow \\text{三千零五}', color: RED, fill: '#fff1f2', note: '連續兩個零只讀一個「零」' },
            { label: '末尾有零', tex: '3700 \\longrightarrow \\text{三千七百}', color: GRN, fill: '#f0fdf4', note: '末尾的零都不讀' },
            { label: '中間與末尾都有零', tex: '5010 \\longrightarrow \\text{五千零十}', color: BLU, fill: '#eff6ff', note: '只讀中間的零，末尾零不讀' }
          ], { gap: 10 });
        },
        caption: '觀察不同位置的「0」，讀法大不相同！',
        example: {
          q: '請寫出「四千零二十」的阿拉伯數字與讀法。',
          steps: [
            '四千 ➔ 千位 4',
            '零 ➔ 百位 0',
            '二十 ➔ 十位 2、個位 0'
          ],
          ans: '記作 4020，讀作四千零二十'
        }
      },

      {
        sec: '1-1',
        secName: '認識10000以內的數',
        title: '【易錯關卡】四位數的讀法與寫法',
        points: [
          '✗ <span style="color:#e11d48">1300 讀作一千三</span> ➔ 正確應讀作 <span class="k">一千三百</span>。',
          '✗ <span style="color:#e11d48">3005 讀作三千零零五</span> ➔ 中間連續零 <span class="k">只讀一個零</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <table style="width:95%;margin:auto;border-collapse:collapse;font-size:15px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
              <tr style="background:#2563eb;color:#fff;font-weight:700">
                <th style="padding:8px;border:1px solid #cbd5e1">數字</th>
                <th style="padding:8px;border:1px solid #cbd5e1">常見錯誤 (✗)</th>
                <th style="padding:8px;border:1px solid #cbd5e1">正確讀法 (✓)</th>
              </tr>
              <tr style="background:#fff">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">1300</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">一千三</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">一千三百</td>
              </tr>
              <tr style="background:#f8fafc">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">3005</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">三千零零五</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">三千零五</td>
              </tr>
              <tr style="background:#fff">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">4020</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">四千零二十零</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">四千零二十</td>
              </tr>
            </table>
          </div>`;
        },
        caption: '請記住：口語可以簡稱，但正式讀法必須把位名完整的讀出來！'
      },

      /* ---------- 1-2 位值與換算 ---------- */
      {
        sec: '1-2',
        secName: '位值與換算',
        title: '四位數由千、百、十、個位積木合成',
        points: [
          '4235 是由 <span class="k">4個千</span>、<span class="k">2個百</span>、<span class="k">3個十</span>和 <span class="k">5個一</span> 合起來的。',
          '也可以用 4張1000元、2張100元、3個10元與5個1元來付錢。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <div class="mode-g" style="margin-bottom:8px"></div>
            <div class="ictrl">
              <label>顯示模式：<span class="ival mode-lbl">3D積木視覺</span></label>
              <input class="mode-r" type="range" min="1" max="2" step="1" value="1">
            </div>
          </div>`;
          const sl = h.querySelector('.mode-r'), modeLbl = h.querySelector('.mode-lbl'), modeG = h.querySelector('.mode-g');
          sl.oninput = () => {
            const m = +sl.value;
            if (m === 1) {
              modeLbl.textContent = '3D積木視覺';
              modeG.innerHTML = `<svg viewBox="0 0 400 190" style="max-width:100%">
                ${SV.baseTenBlocks({ x: 10, y: 5, thousands: 4, hundreds: 2, tens: 3, units: 5 })}
              </svg>`;
            } else {
              modeLbl.textContent = '錢幣位值板';
              modeG.innerHTML = `<svg viewBox="0 0 400 190" style="max-width:100%">
                ${SV.placeValueTable({ x: 10, y: 15, w: 370, h: 140, cols: ['千位(1000元)', '百位(100元)', '十位(10元)', '個位(1元)'], rows: [['4張', '2張', '3個', '5個']], color: GRN })}
              </svg>`;
            }
          };
          sl.oninput();
        },
        caption: '切換滑桿：觀察 4235 在【3D積木分欄】與【錢幣位值板】上的對應。',
        example: {
          q: '7309 是幾個千、幾個百、幾個十和幾個一合起來的？',
          steps: [
            '千位數字是 7 ➔ 7 個千格塊',
            '百位數字是 3 ➔ 3 個百格板',
            '十位數字是 0 ➔ 0 個十格棒',
            '個位數字是 9 ➔ 9 個一積木'
          ],
          ans: '7 個千、3 個百、0 個十、9 個一'
        }
      },

      {
        sec: '1-2',
        secName: '位值與換算',
        title: '拖動滑桿，自由組合四位數積木',
        points: [
          '千位數字代表 <span class="k">幾個一千</span>，百位代表 <span class="k">幾個一百</span>。',
          '十位代表 <span class="k">幾個十</span>，個位代表 <span class="k">幾個一</span>。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <svg viewBox="0 0 400 190" style="max-width:100%">
              <g class="blockg"></g>
            </svg>
            <div class="ictrl">
              <label>千位:<span class="ival thv">2</span> | 百位:<span class="ival huv">3</span> | 十位:<span class="ival tev">4</span> | 個位:<span class="ival unv">5</span></label>
              <input class="comb-r" type="range" min="1" max="3" step="1" value="2">
            </div>
          </div>`;
          const bg = h.querySelector('.blockg'), thv = h.querySelector('.thv'), huv = h.querySelector('.huv'), tev = h.querySelector('.tev'), unv = h.querySelector('.unv'), sl = h.querySelector('.comb-r');
          sl.oninput = () => {
            const v = +sl.value;
            const th = v, hu = v + 1, te = v + 2, un = v + 3;
            thv.textContent = th; huv.textContent = hu; tev.textContent = te; unv.textContent = un;
            bg.innerHTML = SV.baseTenBlocks({ x: 10, y: 10, thousands: th, hundreds: hu, tens: te, units: un });
          };
          sl.oninput();
        },
        caption: '拖動滑桿，動態觀察四位數 3D 積木的數量分欄。',
        example: {
          q: '一組休閒桌椅 2145 元，若要用最少張錢幣與積木付錢，要怎麼付？',
          steps: [
            '2145 拆成 2個千、1個百、4個十、5個一',
            '千位需要 2 個千格塊 (2000)',
            '百位需要 1 個百格板 (100)',
            '十位需要 4 個十格棒 (40)，個位需要 5 個一積木 (5)'
          ],
          ans: '2個千格塊、1個百格板、4個十格棒、5個一積木'
        }
      },

      {
        sec: '1-2',
        secName: '位值與換算',
        title: '【積木換算】滿10個百進位成1個千格塊',
        points: [
          '10 個百格板可 <span class="k">進位換成 1 個千格大積木</span>。',
          '12 個百等於 <span class="k">1 個千 和 2 個百 (1200)</span>，絕不是 120。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <svg viewBox="0 0 400 180" style="max-width:100%">
              <g class="ex-g"></g>
            </svg>
            <div class="ictrl">
              <label>百格板數量：<span class="ival cntv">12</span> 個百格板</label>
              <input class="ex-r" type="range" min="8" max="12" step="1" value="12">
            </div>
          </div>`;
          const sl = h.querySelector('.ex-r'), cntv = h.querySelector('.cntv'), exG = h.querySelector('.ex-g');
          sl.oninput = () => {
            const num = +sl.value;
            cntv.textContent = num;
            if (num < 10) {
              exG.innerHTML = SV.hundredToThousandStack({ x: 30, y: 95, n: num, s: 70, color: '#2563eb' });
            } else {
              const rem = num - 10;
              let remFlatsSvg = '';
              for (let i = 0; i < rem; i++) {
                remFlatsSvg += SV.flat100({ x: 135 + i * 12, y: 55 - i * 6, s: 65, color: '#2563eb', thick: 6 });
              }
              const cardX = 205 + Math.min(rem, 2) * 12;
              exG.innerHTML = `<g transform="translate(10, 10)">
                ${SV.cube1000({ x: 15, y: 55, s: 65, color: '#dc2626' })}
                ${remFlatsSvg}
                <g transform="translate(${cardX}, 45)">
                  <rect x="0" y="-15" width="155" height="75" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
                  <text x="77" y="10" text-anchor="middle" font-size="14" font-weight="800" fill="#1e293b">${num} 個百合起來</text>
                  <text x="77" y="32" text-anchor="middle" font-size="16" font-weight="900" fill="#dc2626">＝ 1個千 與 ${rem}個百</text>
                  <text x="77" y="50" text-anchor="middle" font-size="16" font-weight="900" fill="#2563eb">＝ ${num * 100}</text>
                </g>
              </g>`;
            }
          };
          sl.oninput();
        },
        caption: '拖動滑桿觀察：當百格板達到 10 個以上時，自動進位合體成千格大積木！'
      },

      /* ---------- 1-3 數的大小比較 ---------- */
      {
        sec: '1-3',
        secName: '數的大小比較',
        title: '比較四位數，從最高位（千位）開始比',
        points: [
          '位數不同時，<span class="k">位數多的數比較大</span>（如四位數 > 三位數）。',
          '位數相同時，從 <span class="k">千位開始比</span>；千位相同再比百位。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;padding:5px;text-align:center">
            <div class="pv-compare-board" style="max-width:370px;margin:auto;background:#ffffff;border:2.5px solid #7c3aed;border-radius:14px;padding:12px;box-shadow:0 6px 16px rgba(124,58,237,0.12)">
              <div style="font-size:15px;font-weight:900;color:#7c3aed;margin-bottom:8px">定位板比較器</div>
              <table style="width:100%;border-collapse:collapse;text-align:center;font-weight:800;border:1.5px solid #c4b5fd">
                <thead>
                  <tr style="background:#7c3aed;color:#ffffff;font-size:16px">
                    <th style="padding:8px;border:1px solid #c4b5fd;width:25%">千位</th>
                    <th style="padding:8px;border:1px solid #c4b5fd;width:25%">百位</th>
                    <th style="padding:8px;border:1px solid #c4b5fd;width:25%">十位</th>
                    <th style="padding:8px;border:1px solid #c4b5fd;width:25%">個位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background:#fff">
                    <td class="col-thousand" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">3</td>
                    <td class="col-hundred" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">9</td>
                    <td class="col-ten" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">5</td>
                    <td class="col-unit" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">2</td>
                  </tr>
                  <tr style="background:#f8fafc">
                    <td class="col-thousand" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">3</td>
                    <td class="col-hundred" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">5</td>
                    <td class="col-ten" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">6</td>
                    <td class="col-unit" style="padding:10px;border:1px solid #ddd;font-size:24px;color:#1e293b">0</td>
                  </tr>
                </tbody>
              </table>
              <div class="pv-result-box" style="margin-top:12px;padding:10px;border-radius:10px;background:#eff6ff;border:1.5px solid #93c5fd;font-size:15px;font-weight:800;color:#1e40af">
                步驟 1：千位都是 3 (相同) ➔ 繼續比百位
              </div>
            </div>
            <div class="ictrl" style="margin-top:10px">
              <label>比對步驟：<span class="ival stepv">1</span> / 2</label>
              <input class="step-r" type="range" min="1" max="2" step="1" value="1">
            </div>
          </div>`;
          const sl = h.querySelector('.step-r'), stepv = h.querySelector('.stepv'), resBox = h.querySelector('.pv-result-box');
          const thCells = h.querySelectorAll('.col-thousand'), huCells = h.querySelectorAll('.col-hundred');
          sl.oninput = () => {
            const step = +sl.value;
            stepv.textContent = step;
            if (step === 1) {
              thCells.forEach(el => { el.style.background = '#fef08a'; el.style.color = '#854d0e'; el.style.fontWeight = '900'; });
              huCells.forEach(el => { el.style.background = ''; el.style.color = '#1e293b'; el.style.fontWeight = '800'; });
              resBox.style.background = '#eff6ff';
              resBox.style.borderColor = '#93c5fd';
              resBox.style.color = '#1e40af';
              resBox.innerHTML = '【步驟 1：比千位】千位都是 <b style="font-size:18px">3</b> (相同) ➔ 繼續往右比百位！';
            } else {
              thCells.forEach(el => { el.style.background = ''; el.style.color = '#1e293b'; el.style.fontWeight = '800'; });
              huCells.forEach(el => { el.style.background = '#fee2e2'; el.style.color = '#dc2626'; el.style.fontWeight = '900'; });
              resBox.style.background = '#fef2f2';
              resBox.style.borderColor = '#fca5a5';
              resBox.style.color = '#991b1b';
              resBox.innerHTML = '【步驟 2：比百位】百位 <b style="font-size:20px;color:#dc2626">9 > 5</b> ➔ 比出結果：<b style="font-size:20px;color:#dc2626">3952 > 3560</b>！';
            }
          };
          sl.oninput();
        },
        caption: '拖動滑桿切換比對步驟：千位相同時，比較百位即可分出大小！',
        example: {
          q: '比較 3560 與 3952 的大小，填入 > 或 <。',
          steps: [
            '千位數字都是 3，無法分出大小',
            '比較百位數字：9 大於 5',
            '所以 3952 > 3560'
          ],
          ans: '3560 < 3952'
        }
      },

      {
        sec: '1-3',
        secName: '數的大小比較',
        title: '【易錯關卡】數的大小比較常錯的事',
        points: [
          '✗ <span style="color:#e11d48">999 比 1002 大</span> ➔ 錯！999 是三位數，1002 是四位數，四位數必定大於三位數。',
          '✗ <span style="color:#e11d48">比較大小從個位開始看</span> ➔ 錯！必須從 <span class="k">最高位（千位）</span> 開始比。'
        ],
        visual: (h) => {
          h.innerHTML = `<div style="width:100%;text-align:center">
            <table style="width:95%;margin:auto;border-collapse:collapse;font-size:15px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.06)">
              <tr style="background:#7c3aed;color:#fff;font-weight:700">
                <th style="padding:8px;border:1px solid #cbd5e1">比較題目</th>
                <th style="padding:8px;border:1px solid #cbd5e1">常見錯誤 (✗)</th>
                <th style="padding:8px;border:1px solid #cbd5e1">正確判斷 (✓)</th>
              </tr>
              <tr style="background:#fff">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">999 與 1002</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">999 > 1002 (只看9)</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">999 < 1002 (4位數>3位數)</td>
              </tr>
              <tr style="background:#f8fafc">
                <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">4020 與 4009</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#e11d48">4009 > 4020 (看個位9)</td>
                <td style="padding:8px;border:1px solid #cbd5e1;color:#059669;font-weight:700">4020 > 4009 (十位2>0)</td>
              </tr>
            </table>
          </div>`;
        },
        caption: '請記住：先看位數，位數相同再從最左邊（千位）一路往右比！'
      },

      /* ---------- 1-4 認識數線 ---------- */
      {
        sec: '1-4',
        secName: '認識數線',
        title: '數線起點是0，越往右邊數字越大',
        points: [
          '數線的三要素：<span class="k">原點 0</span>、<span class="k">等長刻度</span> 和 <span class="k">向右箭頭</span>。',
          '在數線上，<span class="k">往右走代表數字變大</span>，往左走代表數字變小。'
        ],
        visual: (h) => {
          SV.stepper(h, '0 0 420 180', [
            {
              t: '畫一條直線與原點 <b>0</b>',
              d: (k) => `<line x1="20" y1="90" x2="380" y2="90" stroke="#334155" stroke-width="2.5"/>` +
                `<circle cx="40" cy="90" r="4" fill="#e11d48"/>` +
                `<text x="40" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="#e11d48">0(原點)</text>`
            },
            {
              t: '加上<b>等長刻度</b>與標記數字',
              d: (k) => `<line x1="100" y1="80" x2="100" y2="100" stroke="#334155" stroke-width="2"/>` +
                `<text x="100" y="120" text-anchor="middle" font-size="14">1000</text>` +
                `<line x1="160" y1="80" x2="160" y2="100" stroke="#334155" stroke-width="2"/>` +
                `<text x="160" y="120" text-anchor="middle" font-size="14">2000</text>` +
                `<line x1="220" y1="80" x2="220" y2="100" stroke="#334155" stroke-width="2"/>` +
                `<text x="220" y="120" text-anchor="middle" font-size="14">3000</text>`
            },
            {
              t: '加上<b>向右箭頭</b>，代表越右邊越大',
              d: (k) => `<path d="M370,83 L385,90 L370,97 Z" fill="#334155"/>` +
                `<text x="350" y="65" text-anchor="middle" font-size="13" fill="#2563eb" font-weight="700">越右邊越大 →</text>`
            }
          ], { acc: true });
        },
        caption: '拖動滑桿，一步步觀察數線的三大要素！',
        example: {
          q: '小青蛙原本停在數線上 800 的位置，往右跳了 600，會停在哪裡？',
          steps: [
            '往右跳代表加法：\\(800 + 600\\)',
            '計算結果：\\(1400\\)'
          ],
          ans: '停在 1400 的位置'
        }
      },

      {
        sec: '1-4',
        secName: '認識數線',
        title: '【易錯關卡】數線觀察最常錯的事',
        points: [
          '✗ <span style="color:#e11d48">數線的刻度距離可以隨意畫</span> ➔ 錯！每一個小格的長度必須 <span class="k">完全相等</span>。',
          '✗ <span style="color:#e11d48">往左移動數字會變大</span> ➔ 錯！往右才是變大（加），<span class="k">往左是變小（減）</span>。'
        ],
        visual: (h) => {
          h.innerHTML = SV.fbox([
            { label: '數線三要素', tex: '\\text{原點 } 0 \\quad + \\quad \\text{等長刻度} \\quad + \\quad \\text{向右箭頭}', color: BLU, fill: '#eff6ff' },
            { label: '往右位移（加法）', tex: '800 \\xrightarrow{\\text{向右 } +600} 1400', color: GRN, fill: '#f0fdf4' },
            { label: '往左位移（減法）', tex: '1400 \\xrightarrow{\\text{向左 } -500} 900', color: RED, fill: '#fff1f2' }
          ], { gap: 10 });
        },
        caption: '只要牢記「右加左減」，數線上的計算題就能輕鬆搞定！'
      }

    ]
  });
})();
