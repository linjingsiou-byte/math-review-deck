/* ============================================================
   SV：共用 SVG 幾何工具（皆回傳 SVG 字串片段）
   座標採「數學慣例」：y 向上為正；helper 內部自動翻轉成螢幕座標。
   ============================================================ */
const SV = (() => {
  const RAD = Math.PI / 180;

  // 極座標 → 螢幕座標（y 向下）；deg 為數學角度（逆時針為正）
  const pt = (cx, cy, r, deg) => [cx + r * Math.cos(deg * RAD), cy - r * Math.sin(deg * RAD)];

  // 兩點連線角度（數學角度 0~360）
  const angleOf = (cx, cy, x, y) => {
    let d = Math.atan2(-(y - cy), x - cx) / RAD;
    return (d + 360) % 360;
  };

  // 以「取樣折線」畫角弧（避免 SVG arc 的 sweep 方向 bug）
  // 從 d0 沿逆時針到 d1（若 d1<d0 自動 +360）
  const arcPoints = (cx, cy, r, d0, d1, steps = 40) => {
    if (d1 < d0) d1 += 360;
    let s = '';
    for (let i = 0; i <= steps; i++) {
      const d = d0 + (d1 - d0) * (i / steps);
      const [x, y] = pt(cx, cy, r, d);
      s += `${x.toFixed(1)},${y.toFixed(1)} `;
    }
    return s.trim();
  };

  // 角弧 + 角度標記文字；color 顏色；label 文字（可含度數）
  const angle = (cx, cy, r, d0, d1, color, label, opt = {}) => {
    const pts = arcPoints(cx, cy, r, d0, d1);
    let dm = (d0 + ((d1 < d0 ? d1 + 360 : d1) - d0) / 2);
    const lr = r + (opt.lr || 20);
    const [lx, ly] = pt(cx, cy, lr, dm);
    let out = `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="${opt.w || 2.5}"/>`;
    if (opt.fill) {
      const [x0, y0] = pt(cx, cy, r, d0);
      const [x1, y1] = pt(cx, cy, r, d1);
      out = `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 0 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${color}" opacity="0.14"/>` + out;
    }
    if (label) out += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="middle" class="lbl" font-size="${opt.fs || 16}" fill="${color}">${label}</text>`;
    return out;
  };

  // 直角小方框（在頂點 V，介於方向 d0、d1 之間）
  const rightAngle = (cx, cy, d0, d1, size = 14, color = '#657187') => {
    const [ax, ay] = pt(cx, cy, size, d0);
    const [bx, by] = pt(cx, cy, size, d1);
    const dx = (ax - cx) + (bx - cx), dy = (ay - cy) + (by - cy);
    return `<path d="M${ax.toFixed(1)},${ay.toFixed(1)} L${(cx + dx).toFixed(1)},${(cy + dy).toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)}" fill="none" stroke="${color}" stroke-width="2"/>`;
  };

  // 邊上的等邊刻度記號（tick），n 條；p、q 為端點，用於標「相等的邊」
  const ticks = (x1, y1, x2, y2, n = 1, color = '#e11d48', len = 7) => {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const nx = Math.cos(ang + Math.PI / 2), ny = Math.sin(ang + Math.PI / 2);
    const tx = Math.cos(ang), ty = Math.sin(ang);
    let out = '';
    const gap = 5;
    const start = -(n - 1) * gap / 2;
    for (let i = 0; i < n; i++) {
      const off = start + i * gap;
      const bx = mx + tx * off, by = my + ty * off;
      out += `<line x1="${(bx - nx * len).toFixed(1)}" y1="${(by - ny * len).toFixed(1)}" x2="${(bx + nx * len).toFixed(1)}" y2="${(by + ny * len).toFixed(1)}" stroke="${color}" stroke-width="2.4"/>`;
    }
    return out;
  };

  // 端點小圓點
  const dot = (x, y, color = '#172033', r = 4.5) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;

  // 頂點標籤
  const vlabel = (x, y, text, color = '#172033', fs = 17) =>
    `<text x="${x}" y="${y}" class="lbl" font-size="${fs}" fill="${color}">${text}</text>`;

  // 線段
  const seg = (x1, y1, x2, y2, color = '#172033', w = 2.6, dash = '') =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>`;

  // 多邊形（給頂點陣列 [[x,y],...]）
  const poly = (points, fill = 'rgba(37,99,235,0.08)', stroke = '#2563eb', w = 2.6) =>
    `<polygon points="${points.map(p => p.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"/>`;

  // 箭頭定義（在 svg 開頭放一次）
  const arrowDefs = (color = '#2563eb', id = 'arrow') =>
    `<defs><marker id="${id}" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${color}"/></marker></defs>`;

  // 坐標平面：回傳 {svg內容, X, Y} —— X(mathx)、Y(mathy) 轉螢幕座標
  const plane = (opt) => {
    const { x0 = 60, y0 = 40, w = 420, h = 360, xmin = -6, xmax = 6, ymin = -6, ymax = 6, step = 1 } = opt;
    const sx = w / (xmax - xmin), sy = h / (ymax - ymin);
    const X = mx => x0 + (mx - xmin) * sx;
    const Y = my => y0 + (ymax - my) * sy;
    let g = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#fff" stroke="none"/>`;
    // 格線
    for (let x = Math.ceil(xmin); x <= xmax; x += step) {
      const px = X(x);
      g += `<line x1="${px}" y1="${y0}" x2="${px}" y2="${y0 + h}" stroke="${x === 0 ? '#c3ccdb' : '#e9eef6'}" stroke-width="${x === 0 ? 0 : 1}"/>`;
    }
    for (let y = Math.ceil(ymin); y <= ymax; y += step) {
      const py = Y(y);
      g += `<line x1="${x0}" y1="${py}" x2="${x0 + w}" y2="${py}" stroke="${y === 0 ? '#c3ccdb' : '#e9eef6'}" stroke-width="${y === 0 ? 0 : 1}"/>`;
    }
    // 軸
    g += `<line x1="${x0}" y1="${Y(0)}" x2="${x0 + w}" y2="${Y(0)}" stroke="#5b6478" stroke-width="2" marker-end="url(#axArrow)"/>`;
    g += `<line x1="${X(0)}" y1="${y0 + h}" x2="${X(0)}" y2="${y0}" stroke="#5b6478" stroke-width="2" marker-end="url(#axArrow)"/>`;
    g += `<text x="${x0 + w - 2}" y="${Y(0) + 20}" text-anchor="end" class="mth" font-size="15" fill="#5b6478">x</text>`;
    g += `<text x="${X(0) + 12}" y="${y0 + 12}" class="mth" font-size="15" fill="#5b6478">y</text>`;
    // 刻度數字
    for (let x = Math.ceil(xmin); x <= xmax; x += step) {
      if (x === 0) continue;
      g += `<text x="${X(x)}" y="${Y(0) + 16}" text-anchor="middle" font-size="11" fill="#96a0b3">${x}</text>`;
    }
    for (let y = Math.ceil(ymin); y <= ymax; y += step) {
      if (y === 0) continue;
      g += `<text x="${X(0) - 8}" y="${Y(y) + 4}" text-anchor="end" font-size="11" fill="#96a0b3">${y}</text>`;
    }
    g += `<text x="${X(0) - 8}" y="${Y(0) + 16}" text-anchor="end" font-size="11" fill="#96a0b3">O</text>`;
    return { svg: g, X, Y, defs: `<defs><marker id="axArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5b6478"/></marker></defs>` };
  };

  // MathJax 公式卡（HTML，交由 slide 的 typeset 排版）
  // rows: [{label, tex, note, color, fill, border, size}]
  const fbox = (rows, opt = {}) => {
    return `<div style="width:100%;display:flex;flex-direction:column;gap:${opt.gap || 12}px;align-items:center;justify-content:center">` +
      rows.map(r => {
        const ac = r.color || '#2563eb';
        return `<div style="width:${r.w || opt.w || '90%'};background:${r.fill || '#fff'};border:1.5px solid ${r.border || '#dce3ee'};border-radius:14px;padding:${r.pad || '11px 16px'};text-align:center;box-shadow:0 4px 14px rgba(30,42,68,.06)">` +
          (r.label ? `<div style="font-size:12px;font-weight:900;letter-spacing:.04em;color:${ac};margin-bottom:3px">${r.label}</div>` : '') +
          `<div style="font-size:${r.size || 17}px;color:#172033">\\(${r.tex}\\)</div>` +
          (r.note ? `<div style="font-size:12.5px;color:#657187;margin-top:4px">${r.note}</div>` : '') +
          `</div>`;
      }).join('') + `</div>`;
  };

  // 步驟講解器：滑桿逐步展示一個性質的推理過程
  // steps: [{ t: '步驟說明(HTML)', d: (k)=>SVG片段 }]，k 為該步驟內 0~1 的連續進度
  // opt.acc=false 時每步只畫自己（d 需畫出完整場景）；預設 true＝疊加之前所有步驟
  const stepper = (h, vb, steps, opt = {}) => {
    const acc = opt.acc !== false;
    const N = steps.length;
    h.innerHTML = `<div style="width:100%;text-align:center">
      <svg viewBox="${vb}" style="max-width:100%"><g class="stepg"></g></svg>
      <div class="ictrl">
        <div class="step-txt"></div>
        <label>步驟 <span class="ival stepv">1</span> / ${N}　<span class="step-hint">→ 拖滑桿</span></label>
        <input class="steps-r" type="range" min="0" max="${N}" step="0.01" value="1">
      </div></div>`;
    const g = h.querySelector('.stepg'), txt = h.querySelector('.step-txt'),
      vEl = h.querySelector('.stepv'), sl = h.querySelector('.steps-r');
    const draw = () => {
      const v = +sl.value;
      const i = Math.max(0, Math.min(N - 1, Math.ceil(v) - 1));
      const k = Math.max(0, Math.min(1, v - i));
      vEl.textContent = i + 1;
      txt.innerHTML = `<b>步驟 ${i + 1}</b>｜${steps[i].t || ''}`;
      let s = '';
      if (acc) for (let j = 0; j < i; j++) { if (steps[j].d) s += steps[j].d(1); }
      if (steps[i].d) s += steps[i].d(k);
      g.innerHTML = s;
    };
    sl.oninput = draw; draw();
  };

  // 1. 鐘面圖工具（時針、分針角度計算）
  const clock = (opt = {}) => {
    const { cx = 150, cy = 150, r = 100, hour = 10, minute = 10, showTicks = true, showNumbers = true, color = '#2563eb' } = opt;
    let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${color}" stroke-width="4"/>`;
    for (let i = 1; i <= 12; i++) {
      const ang = (i * 30 - 90) * RAD;
      const x1 = cx + (r - 10) * Math.cos(ang);
      const y1 = cy + (r - 10) * Math.sin(ang);
      const x2 = cx + r * Math.cos(ang);
      const y2 = cy + r * Math.sin(ang);
      if (showTicks) {
        out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#64748b" stroke-width="2.5"/>`;
      }
      if (showNumbers) {
        const nx = cx + (r - 24) * Math.cos(ang);
        const ny = cy + (r - 24) * Math.sin(ang) + 5;
        out += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="#334155">${i}</text>`;
      }
    }
    if (showTicks) {
      for (let i = 0; i < 60; i++) {
        if (i % 5 === 0) continue;
        const ang = (i * 6 - 90) * RAD;
        const x1 = cx + (r - 5) * Math.cos(ang);
        const y1 = cy + (r - 5) * Math.sin(ang);
        const x2 = cx + r * Math.cos(ang);
        const y2 = cy + r * Math.sin(ang);
        out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#cbd5e1" stroke-width="1.2"/>`;
      }
    }
    const mDeg = (minute * 6 - 90) * RAD;
    const hDeg = (((hour % 12) + minute / 60) * 30 - 90) * RAD;
    const mx = cx + (r - 20) * Math.cos(mDeg);
    const my = cy + (r - 20) * Math.sin(mDeg);
    out += `<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>`;
    const hx = cx + (r - 45) * Math.cos(hDeg);
    const hy = cy + (r - 45) * Math.sin(hDeg);
    out += `<line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="6" fill="#1e293b"/>`;
    return out;
  };

  // 2. 分數長條條形圖切分工具
  const fractionBar = (opt = {}) => {
    const { x = 20, y = 30, w = 360, h = 40, total = 4, parts = 1, colors = ['#3b82f6', '#f1f5f9'], labels = [] } = opt;
    const itemW = w / total;
    let out = `<g class="fraction-bar">`;
    for (let i = 0; i < total; i++) {
      const fill = i < parts ? (colors[0] || '#3b82f6') : (colors[1] || '#f1f5f9');
      const bx = x + i * itemW;
      out += `<rect x="${bx.toFixed(1)}" y="${y}" width="${itemW.toFixed(1)}" height="${h}" fill="${fill}" stroke="#475569" stroke-width="2"/>`;
      if (labels && labels[i]) {
        out += `<text x="${(bx + itemW / 2).toFixed(1)}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${i < parts ? '#ffffff' : '#334155'}">${labels[i]}</text>`;
      }
    }
    out += `</g>`;
    return out;
  };

  // 3. 分數圓形派圖切分工具
  const fractionPie = (opt = {}) => {
    const { cx = 150, cy = 150, r = 90, total = 4, parts = 1, colors = ['#3b82f6', '#f1f5f9'] } = opt;
    let out = `<g class="fraction-pie">`;
    const step = 360 / total;
    for (let i = 0; i < total; i++) {
      const d0 = i * step - 90;
      const d1 = (i + 1) * step - 90;
      const fill = i < parts ? (colors[0] || '#3b82f6') : (colors[1] || '#f1f5f9');
      const [x0, y0] = [cx + r * Math.cos(d0 * RAD), cy + r * Math.sin(d0 * RAD)];
      const [x1, y1] = [cx + r * Math.cos(d1 * RAD), cy + r * Math.sin(d1 * RAD)];
      const largeArc = step > 180 ? 1 : 0;
      out += `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${largeArc} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${fill}" stroke="#334155" stroke-width="2"/>`;
    }
    out += `</g>`;
    return out;
  // 3.5 2D 向量 SVG 垂直分數（可在 SVG 內部直接繪製真分數）
  const fracSVG = (x, y, num, den, opt = {}) => {
    const fs = opt.fs || 12;
    const color = opt.c || '#172033';
    const w = opt.w || 14;
    return `<g transform="translate(${x}, ${y})">
      <text x="0" y="-3" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${num}</text>
      <line x1="${-w/2}" y1="1" x2="${w/2}" y2="1" stroke="${color}" stroke-width="1.4"/>
      <text x="0" y="${fs + 3}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${color}">${den}</text>
    </g>`;
  };

  // 4. 位值對齊板（萬、千、百、十、個位 / 十分位 / 百分位）
  const placeValueTable = (opt = {}) => {
    const { x = 10, y = 10, w = 360, h = 140, cols = ['千位', '百位', '十位', '個位'], rows = [], color = '#0284c7', highlightCol = -1 } = opt;
    const colW = w / cols.length;
    const rowH = h / (rows.length + 1);
    let out = `<g class="place-value-table">`;
    cols.forEach((col, i) => {
      const bx = x + i * colW;
      const isHl = (i === highlightCol);
      out += `<rect x="${bx.toFixed(1)}" y="${y}" width="${colW.toFixed(1)}" height="${rowH.toFixed(1)}" rx="4" fill="${isHl ? '#e11d48' : color}" stroke="#ffffff" stroke-width="1.5"/>`;
      out += `<text x="${(bx + colW / 2).toFixed(1)}" y="${y + rowH / 2 + 5}" text-anchor="middle" font-size="15" font-weight="800" fill="#ffffff">${col}</text>`;
    });
    rows.forEach((row, rIdx) => {
      const ry = y + (rIdx + 1) * rowH;
      row.forEach((val, cIdx) => {
        const bx = x + cIdx * colW;
        const isHl = (cIdx === highlightCol);
        const bg = isHl ? '#fee2e2' : (rIdx % 2 === 0 ? '#ffffff' : '#f8fafc');
        const txtColor = isHl ? '#dc2626' : '#0f172a';
        out += `<rect x="${bx.toFixed(1)}" y="${ry.toFixed(1)}" width="${colW.toFixed(1)}" height="${rowH.toFixed(1)}" fill="${bg}" stroke="#cbd5e1" stroke-width="1.2"/>`;
        out += `<text x="${(bx + colW / 2).toFixed(1)}" y="${ry + rowH / 2 + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="${txtColor}">${val !== undefined ? val : ''}</text>`;
      });
    });
    out += `</g>`;
    return out;
  };

  // 5. 直式運算對齊與進退位記號
  const verticalMath = (opt = {}) => {
    const { x = 120, y = 30, op = '+', num1 = '325', num2 = '148', ans = '473', carries = [], color = '#e11d48' } = opt;
    const maxLen = Math.max(num1.toString().length, num2.toString().length, ans ? ans.toString().length : 0);
    const charW = 28;
    const startX = x + maxLen * charW;
    let out = `<g class="vertical-math" font-family="monospace" font-weight="700">`;
    carries.forEach(c => {
      const cx = startX - c.pos * charW - charW / 2;
      out += `<text x="${cx.toFixed(1)}" y="${y - 8}" text-anchor="middle" font-size="13" fill="${color}">${c.val}</text>`;
    });
    const n1 = num1.toString();
    for (let i = 0; i < n1.length; i++) {
      const cx = startX - (n1.length - 1 - i) * charW - charW / 2;
      out += `<text x="${cx.toFixed(1)}" y="${y + 24}" text-anchor="middle" font-size="22" fill="#1e293b">${n1[i]}</text>`;
    }
    out += `<text x="${x - 10}" y="${y + 60}" text-anchor="middle" font-size="22" fill="#0f172a">${op}</text>`;
    const n2 = num2.toString();
    for (let i = 0; i < n2.length; i++) {
      const cx = startX - (n2.length - 1 - i) * charW - charW / 2;
      out += `<text x="${cx.toFixed(1)}" y="${y + 60}" text-anchor="middle" font-size="22" fill="#1e293b">${n2[i]}</text>`;
    }
    out += `<line x1="${x - charW / 2}" y1="${y + 72}" x2="${startX + 10}" y2="${y + 72}" stroke="#334155" stroke-width="2.5"/>`;
    if (ans !== undefined && ans !== null && ans !== '') {
      const aStr = ans.toString();
      for (let i = 0; i < aStr.length; i++) {
        const cx = startX - (aStr.length - 1 - i) * charW - charW / 2;
        out += `<text x="${cx.toFixed(1)}" y="${y + 102}" text-anchor="middle" font-size="24" fill="${color}">${aStr[i]}</text>`;
      }
    }
    out += `</g>`;
    return out;
  };

  // 6. 3D 立體千格積木 (1000 Cube)
  const cube1000 = (opt = {}) => {
    const { x = 120, y = 70, s = 80, color = '#2563eb' } = opt;
    const d = Math.round(s * 0.35);
    let out = `<g class="cube1000">`;
    out += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${color}" fill-opacity="0.35" stroke="${color}" stroke-width="1.8"/>`;
    for (let i = 1; i < 10; i++) {
      const gx = x + i * (s / 10);
      const gy = y + i * (s / 10);
      out += `<line x1="${gx.toFixed(1)}" y1="${y}" x2="${gx.toFixed(1)}" y2="${y + s}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
      out += `<line x1="${x}" y1="${gy.toFixed(1)}" x2="${x + s}" y2="${gy.toFixed(1)}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
    }
    const t_pts = `${x},${y} ${x + d},${y - d} ${x + s + d},${y - d} ${x + s},${y}`;
    out += `<polygon points="${t_pts}" fill="${color}" fill-opacity="0.5" stroke="${color}" stroke-width="1.8"/>`;
    for (let i = 1; i < 10; i++) {
      const t_x = x + i * (s / 10);
      out += `<line x1="${t_x.toFixed(1)}" y1="${y}" x2="${(t_x + d).toFixed(1)}" y2="${y - d}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
      const t_dz = i * (d / 10);
      out += `<line x1="${(x + t_dz).toFixed(1)}" y1="${(y - t_dz).toFixed(1)}" x2="${(x + s + t_dz).toFixed(1)}" y2="${(y - t_dz).toFixed(1)}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
    }
    const r_pts = `${x + s},${y} ${x + s + d},${y - d} ${x + s + d},${y + s - d} ${x + s},${y + s}`;
    out += `<polygon points="${r_pts}" fill="${color}" fill-opacity="0.65" stroke="${color}" stroke-width="1.8"/>`;
    for (let i = 1; i < 10; i++) {
      const r_y = y + i * (s / 10);
      out += `<line x1="${x + s}" y1="${r_y.toFixed(1)}" x2="${x + s + d}" y2="${(r_y - d).toFixed(1)}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
      const r_dz = i * (d / 10);
      out += `<line x1="${(x + s + r_dz).toFixed(1)}" y1="${(y - r_dz).toFixed(1)}" x2="${(x + s + r_dz).toFixed(1)}" y2="${(y + s - r_dz).toFixed(1)}" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
    }
    out += `</g>`;
    return out;
  };

  // 7. 3D 立體百格板 (100 Flat)
  const flat100 = (opt = {}) => {
    const { x = 40, y = 40, s = 70, color = '#2563eb', thick = 8, showGrid = true, opacity = 1 } = opt;
    let out = `<g class="flat100">`;
    out += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#ffffff" fill-opacity="${0.95 * opacity}"/>`;
    out += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#eff6ff" fill-opacity="${0.9 * opacity}" stroke="${color}" stroke-width="1.6"/>`;
    if (showGrid) {
      for (let i = 1; i < 10; i++) {
        const gx = x + i * (s / 10);
        const gy = y + i * (s / 10);
        out += `<line x1="${gx.toFixed(1)}" y1="${y}" x2="${gx.toFixed(1)}" y2="${y + s}" stroke="${color}" stroke-width="0.6" opacity="0.45"/>`;
        out += `<line x1="${x}" y1="${gy.toFixed(1)}" x2="${x + s}" y2="${gy.toFixed(1)}" stroke="${color}" stroke-width="0.6" opacity="0.45"/>`;
      }
    }
    if (thick > 0) {
      const t_pts = `${x},${y} ${x + thick},${y - thick} ${x + s + thick},${y - thick} ${x + s},${y}`;
      const r_pts = `${x + s},${y} ${x + s + thick},${y - thick} ${x + s + thick},${y + s - thick} ${x + s},${y + s}`;
      out += `<polygon points="${t_pts}" fill="#dbeafe" fill-opacity="${0.95 * opacity}" stroke="${color}" stroke-width="1.2"/>`;
      out += `<polygon points="${r_pts}" fill="#bfdbfe" fill-opacity="${0.95 * opacity}" stroke="${color}" stroke-width="1.2"/>`;
    }
    out += `</g>`;
    return out;
  };

  // 8. 3D 百格板 ➔ 1000千格塊 動態堆疊合體 (Hundred to Thousand Stack)
  const hundredToThousandStack = (opt = {}) => {
    const { x = 30, y = 100, n = 10, s = 75, color = '#2563eb' } = opt;
    let out = `<g class="ht-stack">`;
    if (n < 10) {
      const dx = 11, dy = 8;
      for (let i = 0; i < n; i++) {
        const bx = x + i * dx;
        const by = y - i * dy;
        const isFront = (i === n - 1);
        out += flat100({ x: bx, y: by, s: s, color: isFront ? color : '#3b82f6', thick: 9 });
        const topX = bx + 9;
        const topY = by - 12;
        out += `<circle cx="${topX.toFixed(1)}" cy="${topY.toFixed(1)}" r="4.5" fill="${isFront ? '#e11d48' : '#2563eb'}"/>`;
        if (n <= 5 || i === 0 || i === n - 1 || (i + 1) % 2 === 0) {
          out += `<text x="${topX.toFixed(1)}" y="${(topY - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="800" fill="${isFront ? '#e11d48' : '#1e293b'}">${(i + 1) * 100}</text>`;
        }
      }
      const lastX = x + (n - 1) * dx + s + 25;
      out += `<g transform="translate(${lastX.toFixed(1)}, ${y - (n - 1) * dy / 2 + 10})">`;
      out += `<rect x="0" y="-30" width="160" height="75" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.8"/>`;
      out += `<text x="80" y="-5" text-anchor="middle" font-size="15" font-weight="800" fill="#334155">共有 <tspan font-size="20" fill="${color}">${n}</tspan> 個百格板</text>`;
      out += `<text x="80" y="26" text-anchor="middle" font-size="20" font-weight="900" fill="${color}">＝ ${n * 100}</text>`;
      out += `</g>`;
    } else {
      out += cube1000({ x: x + 30, y: y - 10, s: s, color: color });
      out += `<g transform="translate(${x + s + 95}, ${y + 5})">`;
      out += `<rect x="0" y="-25" width="180" height="75" rx="14" fill="#eff6ff" stroke="${color}" stroke-width="2.2"/>`;
      out += `<text x="90" y="2" text-anchor="middle" font-size="16" font-weight="800" fill="${color}">10 個百格板合體</text>`;
      out += `<text x="90" y="32" text-anchor="middle" font-size="22" font-weight="900" fill="#e11d48">＝ 1 個千格積木</text>`;
      out += `<text x="90" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="#059669">(1000)</text>`;
      out += `</g>`;
    }
    out += `</g>`;
    return out;
  };

  // 9. 百格板 / 十格棒 / 1積木 (Base-Ten Blocks 3D 4分欄組合板 - 嚴格遵循 1:10:100:1000 體積比例原則)
  const unitCube1 = (opt = {}) => {
    const { x = 0, y = 0, u = 5.2, color = '#d97706' } = opt;
    const d = Math.round(u * 0.4);
    let out = `<g class="unit1">`;
    out += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#ffffff"/>`;
    out += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#fef3c7" stroke="${color}" stroke-width="0.9"/>`;
    const t_pts = `${x},${y} ${x + d},${y - d} ${x + u + d},${y - d} ${x + u},${y}`;
    const r_pts = `${x + u},${y} ${x + u + d},${y - d} ${x + u + d},${y + u - d} ${x + u},${y + u}`;
    out += `<polygon points="${t_pts}" fill="#fde68a" stroke="${color}" stroke-width="0.9"/>`;
    out += `<polygon points="${r_pts}" fill="#fcd34d" stroke="${color}" stroke-width="0.9"/>`;
    out += `</g>`;
    return out;
  };

  const tenRod10 = (opt = {}) => {
    const { x = 0, y = 0, u = 5.2, color = '#059669' } = opt;
    const h = u * 10;
    const d = Math.round(u * 0.4);
    let out = `<g class="ten10">`;
    out += `<rect x="${x}" y="${y}" width="${u}" height="${h}" fill="#ffffff"/>`;
    out += `<rect x="${x}" y="${y}" width="${u}" height="${h}" fill="#ecfdf5" stroke="${color}" stroke-width="1.0"/>`;
    for (let i = 1; i < 10; i++) {
      out += `<line x1="${x}" y1="${y + i * u}" x2="${x + u}" y2="${y + i * u}" stroke="${color}" stroke-width="0.6"/>`;
    }
    const t_pts = `${x},${y} ${x + d},${y - d} ${x + u + d},${y - d} ${x + u},${y}`;
    const r_pts = `${x + u},${y} ${x + u + d},${y - d} ${x + u + d},${y + h - d} ${x + u},${y + h}`;
    out += `<polygon points="${t_pts}" fill="#a7f3d0" stroke="${color}" stroke-width="0.8"/>`;
    out += `<polygon points="${r_pts}" fill="#6ee7b7" stroke="${color}" stroke-width="0.8"/>`;
    for (let i = 1; i < 10; i++) {
      const ry = y + i * u;
      out += `<line x1="${x + u}" y1="${ry}" x2="${x + u + d}" y2="${ry - d}" stroke="${color}" stroke-width="0.5"/>`;
    }
    out += `</g>`;
    return out;
  };

  const baseTenBlocks = (opt = {}) => {
    const { x = 10, y = 10, thousands = 1, hundreds = 2, tens = 3, units = 4 } = opt;
    let out = `<g class="base-ten-blocks">`;
    const colW = 92;
    const colNames = ['千格塊 (1000)', '百格板 (100)', '十格棒 (10)', '一積木 (1)'];
    const colColors = ['#dc2626', '#2563eb', '#059669', '#d97706'];
    const u = 5.2; // 1個單元邊長 = 5.2px (千格塊 10u=52px, 百格板 52px, 十格棒 52px高)
    const s1000 = u * 10;

    for (let c = 0; c < 4; c++) {
      const cx = x + c * colW;
      out += `<rect x="${cx}" y="${y}" width="${colW - 4}" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.4"/>`;
      out += `<rect x="${cx}" y="${y}" width="${colW - 4}" height="24" rx="8 8 0 0" fill="${colColors[c]}"/>`;
      out += `<text x="${cx + (colW - 4)/2}" y="${y + 16}" text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff">${colNames[c]}</text>`;
    }

    // 1. 千格塊 (Thousands Column) - 52x52x52 立體大塊
    const tX = x + 10;
    const tY = y + 36;
    for (let i = 0; i < Math.min(thousands, 4); i++) {
      const bx = tX + i * 5;
      const by = tY + i * 16;
      out += cube1000({ x: bx, y: by, s: s1000, color: '#dc2626' });
    }
    out += `<text x="${x + colW/2 - 2}" y="${y + 164}" text-anchor="middle" font-size="12.5" font-weight="900" fill="#dc2626">${thousands} 個千 (＝ ${thousands * 1000})</text>`;

    // 2. 百格板 (Hundreds Column) - 52x52x5.2 立體平版 (厚度為千格塊 1/10)
    const hX = x + colW + 10;
    const hY = y + 36;
    for (let i = 0; i < Math.min(hundreds, 5); i++) {
      const bx = hX + (i % 2) * 8;
      const by = hY + Math.floor(i / 2) * 22;
      out += flat100({ x: bx, y: by, s: s1000, color: '#2563eb', thick: u });
    }
    out += `<text x="${x + colW + colW/2 - 2}" y="${y + 164}" text-anchor="middle" font-size="12.5" font-weight="900" fill="#2563eb">${hundreds} 個百 (＝ ${hundreds * 100})</text>`;

    // 3. 十格棒 (Tens Column) - 5.2x52x5.2 立體長條棒
    const tenX = x + colW * 2 + 12;
    const tenY = y + 38;
    for (let i = 0; i < Math.min(tens, 6); i++) {
      const bx = tenX + (i % 3) * 22;
      const by = tenY + Math.floor(i / 3) * 56;
      out += tenRod10({ x: bx, y: by, u: u, color: '#059669' });
    }
    out += `<text x="${x + colW * 2 + colW/2 - 2}" y="${y + 164}" text-anchor="middle" font-size="12.5" font-weight="900" fill="#059669">${tens} 個十 (＝ ${tens * 10})</text>`;

    // 4. 一積木 (Units Column) - 5.2x5.2x5.2 立體小方塊
    const uX = x + colW * 3 + 14;
    const uY = y + 42;
    for (let i = 0; i < Math.min(units, 9); i++) {
      const bx = uX + (i % 3) * 20;
      const by = uY + Math.floor(i / 3) * 20;
      out += unitCube1({ x: bx, y: by, u: u, color: '#d97706' });
    }
    out += `<text x="${x + colW * 3 + colW/2 - 2}" y="${y + 164}" text-anchor="middle" font-size="12.5" font-weight="900" fill="#d97706">${units} 個一 (＝ ${units})</text>`;

    out += `</g>`;
    return out;
  };

  return { pt, angleOf, arcPoints, angle, rightAngle, ticks, dot, vlabel, seg, poly, arrowDefs, plane, RAD, fbox, stepper, clock, fractionBar, fractionPie, fracSVG, placeValueTable, verticalMath, baseTenBlocks, cube1000, flat100, hundredToThousandStack, unitCube1, tenRod10 };
})();

// 互動視覺更新後，重新排版該區塊的 MathJax
window.MJ = (el) => { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise(el ? [el] : undefined).catch(() => {}); };



