/* Point75 - Market Crashes (/market-crashes). A historical crash database in the One Shot layout.
   Index levels are closing prices, price index (no dividends), nominal. S&P 500 unless marked; 1929 uses the Dow.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  var K = window.P75KIT, C = K.C, tag = K.tag, col = K.col;

  // ---------- Data (all Facts unless an `a` field: Point75 analysis) ----------
  var NOW = { date: '2026-10-16', level: 7659.44, rec: 7818.93, recDate: '2026-10-06', marginGdp: 4.56, marginMonth: 'Sep 2026' };
  var CR = [
    { key: 'c1929', name: '1929 Great Crash', short: '1929', idx: 'Dow', type: 'credit',
      pk: ['1929-09-03', 381.17], tr: ['1932-07-08', 41.22], rc: '1954-11-23',
      cat: 'A margin-fuelled bubble broke in October 1929 (Black Thursday, Black Monday, Black Tuesday). Bank failures, a shrinking money supply and the 1930 Smoot-Hawley tariffs turned a crash into the Great Depression.',
      rates: 'The Fed raised its discount rate to 6% in August 1929 to cool speculation. After the crash it let the money supply shrink by about a third (1929–33).',
      credit: 'About 9,000 U.S. banks failed in 1930–33, with no deposit insurance until 1934.',
      lev: 'Brokers’ loans peaked near $8.5bn in October 1929, roughly 8% of GDP; buying with 10–20% down was common.',
      a: 'The depth came from the policy response, not the October crash itself. Money and credit were allowed to collapse for three years.',
      af: 'Margin calls forced selling into a falling market, and failing banks took deposits and credit with them. Leverage at both ends: in the market and in the banks.' },
    { key: 'c1973', name: '1973–74 oil & inflation bear', short: '1973–74', idx: 'S&P 500', type: 'rates',
      pk: ['1973-01-11', 120.24], tr: ['1974-10-03', 62.28], rc: '1980-07-17',
      cat: 'The end of Bretton Woods, the Arab oil embargo from October 1973 (oil roughly quadrupled), inflation above 12% and Watergate.',
      rates: 'Fed funds rose from about 6% to about 13% by July 1974.',
      credit: 'Franklin National Bank failed (October 1974), then the largest U.S. bank failure; Herstatt Bank collapsed in Germany (June 1974); REIT lenders defaulted.',
      lev: 'Margin requirements were 50–65%. The excess was valuation (the “Nifty Fifty”), not borrowing.',
      a: 'A geopolitical supply shock became an inflation shock, and the inflation shock forced rates up. That is the chain to watch in 2026.',
      af: 'Banks with funding gaps and property lenders broke, but the system held. Inflation, not leverage, did the damage, so the real (inflation-adjusted) loss lasted far longer than the nominal one.' },
    { key: 'c1987', name: '1987 Black Monday', short: '1987', idx: 'S&P 500', type: 'structure',
      pk: ['1987-08-25', 336.77], tr: ['1987-12-04', 223.92], rc: '1989-07-26',
      cat: 'On 19 October 1987 the S&P 500 fell 20.5% and the Dow 22.6% in one day, the largest one-day drops on record. Portfolio-insurance selling, rising yields and a falling dollar.',
      rates: 'The 10-year yield climbed from about 7% to about 10% during 1987. On 20 October the Fed pledged liquidity and fed funds fell about half a point.',
      credit: 'No credit crisis: the Fed pressed banks to keep lending to securities firms. No recession followed.',
      lev: 'The leverage sat in market plumbing (hedging programmes that sold as prices fell) more than in margin loans.',
      a: 'Fast and frightening, but shallow in time: with credit intact and a Fed backstop, the economy never noticed.',
      af: 'Mechanical selling fed on itself in a day. Once liquidity was promised, the forced sellers were done.' },
    { key: 'c1990', name: '1990 Gulf War bear', short: '1990', idx: 'S&P 500', type: 'shock',
      pk: ['1990-07-16', 368.95], tr: ['1990-10-11', 295.46], rc: '1991-02-13',
      cat: 'Iraq invaded Kuwait on 2 August 1990 and oil more than doubled, on top of a U.S. recession (July 1990–March 1991).',
      rates: 'The Fed was already cutting: fed funds fell from about 8% in mid-1990 toward 3% by late 1992.',
      credit: 'The savings-and-loan crisis and a bank “credit crunch”; Drexel Burnham, the junk-bond house, failed in February 1990.',
      lev: 'The late-1980s buyout and junk-bond leverage was unwinding.',
      a: 'The geopolitical precedent. Stocks bottomed in October 1990, three months before the air war began on 17 January 1991; on that day oil fell about a third and stocks rallied. The market priced the uncertainty, not the war.',
      af: 'A bank credit crunch made the oil shock bite harder than it would have in a healthy system.' },
    { key: 'c2000', name: 'Dot-com crash', short: '2000–02', idx: 'S&P 500', type: 'valuation',
      pk: ['2000-03-24', 1527.46], tr: ['2002-10-09', 776.76], rc: '2007-05-30',
      cat: 'The internet valuation bubble burst; the Nasdaq fell 78% (March 2000–October 2002). Then 9/11 and the Enron and WorldCom accounting scandals.',
      rates: 'The Fed raised to 6.5% (May 2000), then cut to 1.75% by December 2001 and 1.25% by November 2002. Cuts did not stop the fall.',
      credit: 'Telecom and corporate defaults rose sharply; the banking system stayed sound.',
      lev: 'Margin debt peaked at about 3.0% of GDP in March 2000, a record until 2021.',
      a: 'Valuation busts are slow: rate cuts cannot fix a price that was too high. The fall lasted 31 months.',
      af: 'Leverage was in investors’ margin accounts, not in the banks, so the economy had only a mild recession while stocks halved.' },
    { key: 'c2008', name: '2008 Financial Crisis', short: '2007–09', idx: 'S&P 500', type: 'credit',
      pk: ['2007-10-09', 1565.15], tr: ['2009-03-09', 676.53], rc: '2013-03-28',
      cat: 'The U.S. housing and subprime-mortgage bust; Bear Stearns (March 2008) and the Lehman Brothers bankruptcy (15 September 2008).',
      rates: 'Fed funds went from 5.25% (2007) to 0–0.25% (December 2008), then quantitative easing.',
      credit: 'Interbank lending froze and high-yield spreads neared 20 points (December 2008); Congress passed the TARP bank rescue.',
      lev: 'Investment banks ran about 30× leverage and household debt was near 100% of GDP.',
      a: 'The modern template for a credit crash: the second deepest fall here, and five and a half years to get back.',
      af: 'Leverage sat inside the banks themselves, so falling prices destroyed the lenders’ capital and the credit system stopped.' },
    { key: 'c2020', name: 'COVID crash', short: '2020', idx: 'S&P 500', type: 'shock',
      pk: ['2020-02-19', 3386.15], tr: ['2020-03-23', 2237.40], rc: '2020-08-18',
      cat: 'The COVID-19 pandemic and lockdowns; the fastest fall from a record into a bear market in S&P 500 history.',
      rates: 'The Fed cut to 0–0.25% on 15 March and announced open-ended QE on 23 March, the day of the low.',
      credit: 'High-yield spreads passed 10 points and even Treasuries sold off in the dash for cash; the Fed backstopped corporate bonds for the first time.',
      lev: 'Record corporate debt, and leveraged Treasury trades that had to unwind.',
      a: 'The deepest 33 days in the table, and among the fastest recoveries: the policy response was immediate and huge.',
      af: 'Leverage turned a health shock into a liquidity crisis within days; the Fed’s promise to buy credit ended it.' },
    { key: 'c2022', name: '2022 inflation bear', short: '2022', idx: 'S&P 500', type: 'rates',
      pk: ['2022-01-03', 4796.56], tr: ['2022-10-12', 3577.03], rc: '2024-01-19',
      cat: 'U.S. inflation hit 9.1% (June 2022). Russia invaded Ukraine on 24 February 2022, lifting energy and food prices.',
      rates: 'Fed funds went from 0–0.25% to 4.25–4.5% by December 2022, the fastest hikes since the early 1980s; the 10-year rose from about 1.5% to about 4.2%.',
      credit: 'Spreads widened but did not break; the UK gilt and pension (LDI) crisis hit in September 2022.',
      lev: 'FINRA margin debt had peaked in late 2021, at about 3.8% of GDP in August 2021.',
      a: 'A rate shock, not a credit shock: stocks and bonds fell together, the haven failed, and long-duration tech fell hardest.',
      af: 'Margin debt fell sharply through 2022: deleveraging was orderly because lenders were sound.' },
    { key: 'c2025', name: '2025 tariff shock', short: '2025', idx: 'S&P 500', type: 'shock',
      pk: ['2025-02-19', 6144.15], tr: ['2025-04-08', 4982.77], rc: '2025-06-27',
      cat: '“Liberation Day” tariffs announced on 2 April 2025; a 90-day pause followed on 9 April.',
      rates: 'The Fed held at 4.25–4.5%. Treasuries sold off alongside stocks in tariff week.',
      credit: 'Spreads widened briefly, with no default wave.',
      lev: 'Margin debt was near a record and unwound fast in early April.',
      a: 'A policy-made shock that policy could reverse: a 19% fall reversed within three months once the tariffs were paused.',
      af: 'Leverage made the week violent, but sound credit kept it a market event.' },
    { key: 'c2026', name: '2026 Iran war dip', short: '2026', idx: 'S&P 500', type: 'shock', approx: true,
      pk: ['2026-02-27', 6875], tr: ['2026-03-30', 6315], rc: '2026-04-14',
      cat: 'U.S.–Israeli strikes on Iran from 28 February 2026; the Strait of Hormuz effectively closed and Brent rose from $72 to above $110.',
      rates: 'An inflation shock: the Fed later raised rates in September 2026, to 3.75–4%.',
      credit: 'No credit break.',
      lev: 'Margin debt went on to a record $1.50tn in June 2026.',
      a: 'Levels are approximate (derived from reported percentages), and measured from the pre-war close, not a record. A war that shut the world’s key oil route cost the index about 8% for a month.',
      af: 'The war’s cost is arriving through inflation and yields, not a crash. See /geopolitical-risk.' }
  ];
  var TYPES = { credit: ['Credit bust', C.RED], valuation: ['Valuation bust', C.AMBER], rates: ['Inflation & rates', '#F2D27A'], structure: ['Market plumbing', '#D2CCBF'], shock: ['Outside shock', C.BLUE] };

  // ---------- Derived numbers ----------
  function d(s) { return new Date(s + 'T12:00:00Z'); }
  function days(a, b) { return Math.round((d(b) - d(a)) / 864e5); }
  CR.forEach(function (c) {
    c.dd = c.tr[1] / c.pk[1] - 1;
    c.fallD = days(c.pk[0], c.tr[0]);
    c.recD = days(c.tr[0], c.rc);
    c.totD = days(c.pk[0], c.rc);
  });
  var MAIN = CR.filter(function (c) { return !c.approx; });
  function median(a) { var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
  var MED_DD = median(MAIN.map(function (c) { return c.dd; }));
  var MED_REC = median(MAIN.map(function (c) { return c.recD; }));
  var NOW_DD = NOW.level / NOW.rec - 1;
  function byType(t, f) { var a = MAIN.filter(function (c) { return c.type === t; }); return a.length ? median(a.map(f)) : null; }
  var DEEP = MAIN.slice().sort(function (a, b) { return a.dd - b.dd; })[0];
  var FAST = MAIN.slice().sort(function (a, b) { return a.fallD - b.fallD; })[0];
  var LONG = MAIN.slice().sort(function (a, b) { return b.totD - a.totD; })[0];

  // ---------- Formatting ----------
  function pct(x, dp) { return (x < 0 ? '−' : '+') + Math.abs(x * 100).toFixed(dp == null ? 1 : dp) + '%'; }
  function dur(n) {
    if (n < 60) return n + ' days';
    var m = n / 30.44; if (m < 24) return Math.round(m) + ' months';
    return (n / 365.25).toFixed(1).replace(/\.0$/, '') + ' years';
  }
  function dt(s) { return d(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); }
  function lvl(c, v) { return (c.approx ? '≈' : '') + v.toLocaleString('en-US', { minimumFractionDigits: c.approx ? 0 : 2, maximumFractionDigits: 2 }); }
  function ap(c) { return c.approx ? '≈' : ''; }

  // ---------- Visualization 1: market drawdown as craters ----------
  // Each crash is a crater cut into the ground line. Depth = maximum drawdown (linear).
  // Left wall = time from peak to low, right wall = time from low back to the peak (both scaled by the square root of days,
  // so a 25-year recovery and a 2-month one both fit). The asymmetry is the story: crashes fall fast and climb slowly.
  var CRATER_ROWS = CR.concat([{ now: true, key: 'now', short: 'Now', name: 'S&P 500 today', dd: NOW_DD, fallD: days(NOW.recDate, NOW.date), recD: null }]);
  function craters() {
    return K.slot(function (el, W) {
      var multi = W < 640;
      var s = '', DEPTH = multi ? 150 : 250, G = multi ? 40 : 66, LAB = 'font-family="Manrope,sans-serif"';
      function crater(c, x0, wl, wr, g, depth, small) {
        var xt = x0 + wl, x1 = xt + wr, yb = g + depth * (-c.dd) / 0.9;
        var fill = c.now ? 'url(#p75cgN)' : 'url(#p75cg)', stroke = c.now ? C.GOLD : C.RED;
        var p = 'M' + x0 + ',' + g + ' C' + (x0 + wl * .55) + ',' + g + ' ' + (xt - wl * .3) + ',' + yb + ' ' + xt + ',' + yb;
        p += c.now ? ' L' + (xt + 2) + ',' + g : ' C' + (xt + wr * .3) + ',' + yb + ' ' + (x1 - wr * .55) + ',' + g + ' ' + x1 + ',' + g;
        var out = '<path d="' + p + ' Z" fill="' + fill + '"' + (c.approx ? ' fill-opacity=".6"' : '') + '/>' +
          '<path d="' + p + '" fill="none" stroke="' + stroke + '" stroke-width="2"' + (c.approx ? ' stroke-dasharray="4 3"' : '') + '/>';
        // depth tag at the bottom of the crater
        var lab = (c.approx ? '≈' : '') + pct(c.dd, 0);
        out += '<text x="' + xt + '" y="' + (yb + 17) + '" text-anchor="middle" font-size="' + (small ? 12.5 : 14) + '" font-weight="800" fill="#EDE8DC" ' + LAB + ' style="font-variant-numeric:tabular-nums">' + lab + '</text>';
        out += '<path class="hit" data-k="' + c.key + '" d="M' + (x0 - 4) + ',' + (g - 30) + ' L' + (x1 + 4) + ',' + (g - 30) + ' L' + (x1 + 4) + ',' + (yb + 24) + ' L' + (x0 - 4) + ',' + (yb + 24) + ' Z" fill="transparent"/>';
        return { svg: out, xt: xt, x1: x1 };
      }
      var defs = '<defs><linearGradient id="p75cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF6640" stop-opacity=".55"/><stop offset="1" stop-color="#5A1E10" stop-opacity=".95"/></linearGradient>' +
        '<linearGradient id="p75cgN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A227" stop-opacity=".7"/><stop offset="1" stop-color="#4A3A0A"/></linearGradient>' +
        '<pattern id="p75soil" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#24252A" stroke-width="2"/></pattern></defs>';
      var u = function (n) { return Math.sqrt(Math.max(n, 4)); };
      if (!multi) {
        // one ground line, chronological, widths shared out across the page
        var gap = 14, units = 0;
        CRATER_ROWS.forEach(function (c) { units += u(c.fallD) + (c.now ? 2 : u(c.recD)); });
        var k = (W - 20 - gap * (CRATER_ROWS.length - 1)) / units, H = G + DEPTH + 40, x = 10;
        s += '<rect x="0" y="' + G + '" width="' + W + '" height="' + (H - G) + '" fill="url(#p75soil)"/>';
        var med = G + DEPTH * (-MED_DD) / 0.9;
        var parts = [];
        CRATER_ROWS.forEach(function (c, i) {
          var wl = Math.max(u(c.fallD) * k, 9), wr = c.now ? 4 : Math.max(u(c.recD) * k, 9);
          var r = crater(c, x, wl, wr, G, DEPTH, false); parts.push(r.svg);
          var cx = c.now ? r.xt : (x + r.x1) / 2, hi = i % 2 ? 34 : 14;
          parts.push('<line x1="' + cx + '" x2="' + cx + '" y1="' + (G - 4) + '" y2="' + (G - hi + 18 + 4) + '" stroke="#4A4C52"/>' +
            '<text x="' + cx + '" y="' + (G - hi) + '" text-anchor="middle" font-size="13" font-weight="800" fill="' + (c.now ? '#F2D27A' : '#EDE8DC') + '" ' + LAB + '>' + c.short + '</text>');
          x = r.x1 + gap;
        });
        s += '<line x1="0" x2="' + W + '" y1="' + G + '" y2="' + G + '" stroke="#8A8D93" stroke-width="1.5"/>' + parts.join('');
        s += '<line x1="0" x2="' + W + '" y1="' + med + '" y2="' + med + '" stroke="#F2D27A" stroke-width="1.5" stroke-dasharray="5 5"/>' +
          '<text x="' + (W - 4) + '" y="' + (med - 7) + '" text-anchor="end" font-size="12.5" font-weight="800" fill="#F2D27A" ' + LAB + '>Median fall ' + pct(MED_DD, 0) + '</text>';
        el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Each crash as a crater: depth is the fall, left wall the time to the low, right wall the time back to the peak">' + defs + s + '</svg>';
      } else {
        // phones: small multiples, two across, same scales
        var cols = 3, cw = (W - 24) / cols, ch = 58 + DEPTH * .72, rows = Math.ceil(CRATER_ROWS.length / cols), Hm = rows * ch;
        var km = (cw - 10) / (u(8173) + u(1039));   // the widest crater (1929) fills a cell
        CRATER_ROWS.forEach(function (c, i) {
          var ox = (i % cols) * (cw + 12), oy = Math.floor(i / cols) * ch, g = oy + 34;
          var wl = Math.max(u(c.fallD) * km, 8), wr = c.now ? 4 : Math.max(u(c.recD) * km, 8);
          s += '<rect x="' + ox + '" y="' + g + '" width="' + cw + '" height="' + (ch - 40) + '" fill="url(#p75soil)"/>' +
            '<line x1="' + ox + '" x2="' + (ox + cw) + '" y1="' + g + '" y2="' + g + '" stroke="#8A8D93" stroke-width="1.5"/>' +
            '<text x="' + (ox + 2) + '" y="' + (g - 12) + '" font-size="13" font-weight="800" fill="' + (c.now ? '#F2D27A' : '#EDE8DC') + '" ' + LAB + '>' + c.short + '</text>';
          s += crater(c, ox + (cw - wl - wr) / 2, wl, wr, g, DEPTH * .72, true).svg;
        });
        el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + Hm + '" width="' + W + '" height="' + Hm + '" role="img" aria-label="Each crash as a crater: depth is the fall, left wall the time to the low, right wall the time back to the peak">' + defs + s + '</svg>';
      }
      el.querySelectorAll('.hit').forEach(function (h) {
        function show(e) {
          var key = h.getAttribute('data-k'), r = CRATER_ROWS.filter(function (c) { return c.key === key; })[0], p = e.touches ? e.touches[0] : e;
          K.tipAt(el, r.now
            ? '<div class="t">S&P 500 now</div>' + NOW.level.toLocaleString('en-US') + ' on ' + dt(NOW.date) + '<br>Record ' + NOW.rec.toLocaleString('en-US') + ' on ' + dt(NOW.recDate) + '<br><b>' + pct(NOW_DD) + '</b> from the record'
            : '<div class="t">' + r.name + '</div>' + r.idx + ' ' + lvl(r, r.pk[1]) + ' (' + dt(r.pk[0]) + ') → ' + lvl(r, r.tr[1]) + ' (' + dt(r.tr[0]) + ')<br><b>' + ap(r) + pct(r.dd) + '</b>: down in ' + dur(r.fallD) + ', back to the peak ' + dur(r.recD) + ' later', p.clientX, p.clientY);
        }
        h.addEventListener('mousemove', show); h.addEventListener('touchstart', show, { passive: true });
        h.addEventListener('mouseleave', function () { K.tipOff(el); });
      });
    }, 'craters');
  }
  function craterKey() {
    return '<div class="key" style="margin:0 0 6px"><span><b style="color:#EDE8DC">Depth</b> = the fall</span><span><b style="color:#EDE8DC">Left wall</b> = time to the low</span><span><b style="color:#EDE8DC">Right wall</b> = time back to the peak</span><span style="color:#C2BCAF">Walls scaled by the square root of time. Dashed: approximate.</span></div>';
  }
  // the asymmetry in numbers: how many times longer the climb took than the fall
  function climbTable() {
    return '<div class="cards three">' + MAIN.map(function (c) {
      var x = c.recD / c.fallD;
      return K.cd('', '', '<span style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><b style="font-size:14px">' + c.short + '</b><span class="big" style="font-size:26px;color:' + (x > 3 ? C.RED : x < 1.5 ? C.BLUE : '#F2D27A') + '">' + x.toFixed(1) + '×</span></span><p style="font-size:13px;color:#C2BCAF">' + dur(c.fallD) + ' down, ' + dur(c.recD) + ' back</p>');
    }).join('') + '</div>';
  }

  // ---------- Tabs ----------
  function takeaway() {
    var cr = MAIN.filter(function (c) { return c.type === 'credit'; }).map(function (c) { return c.totD / 365.25; }).sort(function (a, b) { return a - b; });
    var shock = byType('shock', function (c) { return c.totD; });
    var head = 'Across nine crashes since 1929 the median fall was ' + col(pct(MED_DD, 0), C.RED) + '. The two credit busts took ' + col(Math.round(cr[0]) + ' and ' + Math.round(cr[cr.length - 1]) + ' years', C.RED) +
      ' to get back to the peak; outside shocks, like wars and viruses, took a median ' + col(dur(shock), C.BLUE) + '. Today the S&P 500 is ' + col(pct(NOW_DD), '#F2D27A') + ' from its record, with margin debt at a record ' + col(NOW.marginGdp + '% of GDP', C.RED) + '.';
    return '<div class="tk"><p class="tk-head">' + head + '</p>' +
      '<p class="tk-watch"><b>Watch</b>Leverage, not the trigger, has decided how deep a crash goes. Margin debt is above its 2000 and 2021 peaks relative to GDP.</p>' +
      '<div class="ov">' +
      K.card({ tab: 'drawdown', head: 'Drawdown', dial: { v: -DEEP.dd * 100, min: 0, max: 100, color: C.RED, notch: -MED_DD * 100, ends: ['0', '100'], aria: 'Deepest fall ' + pct(DEEP.dd) }, value: pct(DEEP.dd, 0), color: C.RED, label: 'Deepest, ' + DEEP.short, note: 'The gold notch is the median fall: ' + pct(MED_DD, 0) + '.' }) +
      K.card({ tab: 'database', head: 'Speed', dial: { v: FAST.fallD, min: 0, max: 1100, color: C.BLUE, notch: median(MAIN.map(function (c) { return c.fallD; })), ends: ['0', '3y'], aria: 'Fastest fall ' + FAST.fallD + ' days' }, value: FAST.fallD + ' days', color: C.BLUE, label: 'Fastest, ' + FAST.short, note: 'Peak to trough; the slowest took ' + dur(MAIN.slice().sort(function (a, b) { return b.fallD - a.fallD; })[0].fallD) + '.' }) +
      K.card({ tab: 'database', head: 'Recovery', dial: { v: LONG.totD / 365.25, min: 0, max: 26, color: C.RED, notch: MED_REC / 365.25, ends: ['0', '26y'], aria: 'Longest round trip ' + dur(LONG.totD) }, value: dur(LONG.totD).replace(' years', 'y'), color: C.RED, label: 'Longest, ' + LONG.short, note: 'Peak back to peak. Median from the low: ' + dur(MED_REC) + '.' }) +
      K.card({ tab: 'conditions', head: 'Leverage now', dial: { v: NOW.marginGdp, min: 0, max: 6, color: C.RED, notch: 3.8, ends: ['0', '6%'], aria: 'Margin debt ' + NOW.marginGdp + '% of GDP' }, value: NOW.marginGdp + '%', color: C.RED, label: 'Margin debt / GDP', note: 'Record. Gold notch: the 2021 peak (3.8%).' }) +
      '</div></div>';
  }
  function drawdown() {
    var med = median(MAIN.map(function (c) { return c.recD / c.fallD; }));
    return '<h2>Market drawdown: the crater field</h2><p class="sub">Every crash since 1929, cut into the same ground. Hover or tap a crater for its dates.</p>' +
      K.sections('dd', [
        { key: 'depth', title: 'How deep, how long down, how long back', read: 'Median ' + pct(MED_DD, 0), readColor: C.RED,
          body: craterKey() + '<div class="cd" style="padding:12px 12px 10px">' + craters() + '</div>' },
        { key: 'climb', title: 'The climb out takes longer than the fall', small: 'Recovery time divided by the time it took to fall', read: 'Median ' + med.toFixed(1) + '×', readColor: '#F2D27A',
          body: climbTable() }
      ]);
  }
  function database() {
    return '<h2>The crash database</h2><p class="sub">Closing prices, price index, nominal. Recovery is the time from the low until the index closed above its old peak.</p>' +
      K.tagKey() +
      K.sections('db', CR.map(function (c) {
        var t = TYPES[c.type];
        return { key: c.key, title: c.name, small: c.idx + ' · ' + '<span style="color:' + t[1] + '" class="nb">' + t[0] + '</span>',
          read: ap(c) + pct(c.dd, 0), readColor: C.RED,
          info: { lesson: { h: 'What it teaches', html: '<p>' + tag('a') + c.a + '</p>' }, fuel: { h: 'What made it worse', html: '<p>' + tag('a') + c.af + '</p>' } },
          body: '<div class="stats">' +
            '<div class="st"><small>Peak</small><b>' + lvl(c, c.pk[1]) + '</b><span>' + dt(c.pk[0]) + '</span></div>' +
            '<div class="st"><small>Trough</small><b>' + lvl(c, c.tr[1]) + '</b><span>' + dt(c.tr[0]) + '</span></div>' +
            '<div class="st"><small>Max drawdown</small><b style="color:' + C.RED + '">' + ap(c) + pct(c.dd) + '</b><span>over ' + dur(c.fallD) + '</span></div>' +
            '<div class="st"><small>Recovery</small><b>' + dur(c.recD) + '</b><span>' + (c.approx ? '≈' : '') + 'back on ' + dt(c.rc) + '</span></div></div>' +
            '<div class="cards">' +
            K.cd('lesson', 'Catalyst', '<p>' + tag('f') + c.cat + '</p>') +
            K.cd('lesson', 'Interest rates', '<p>' + tag('f') + c.rates + '</p>') +
            K.cd('fuel', 'Credit', '<p>' + tag('f') + c.credit + '</p>') +
            K.cd('fuel', 'Leverage', '<p>' + tag('f') + c.lev + '</p>') + '</div>' };
      }), null);
  }
  function conditions() {
    var rowsT = Object.keys(TYPES).map(function (t) {
      var a = MAIN.filter(function (c) { return c.type === t; }); if (!a.length) return '';
      return '<tr><td><span class="nb" style="color:' + TYPES[t][1] + ';font-weight:800">' + TYPES[t][0] + '</span><br><span style="color:#C2BCAF;font-size:12.5px">' + a.map(function (c) { return c.short; }).join(', ') + '</span></td>' +
        '<td class="r num">' + pct(median(a.map(function (c) { return c.dd; })), 0) + '</td><td class="r num">' + dur(median(a.map(function (c) { return c.fallD; }))) + '</td><td class="r num">' + dur(median(a.map(function (c) { return c.totD; }))) + '</td></tr>';
    }).join('');
    var lev = [['1929', 8.2, 'Brokers’ loans, about 8% of GDP (approximate)'], ['2000', 3.0, 'FINRA/NYSE margin debt, March 2000'], ['2021', 3.8, 'FINRA margin debt, August 2021'], ['Now', NOW.marginGdp, 'FINRA margin debt, ' + NOW.marginMonth]];
    return '<h2>Rates, credit and leverage</h2><p class="sub">The trigger names a crash; the conditions underneath decide its depth.</p>' + K.tagKey() +
      K.sections('cond', [
        { key: 'kind', title: 'Depth and length by kind of crash', read: 'Credit busts worst', readColor: C.RED,
          info: { k: { h: 'What it means', html: '<p>' + tag('a') + 'When leverage sits inside the lenders (1929, 2008), falling prices destroy the credit system and the crash feeds itself for years. Outside shocks (1990, 2020, 2025) were sharp but quick because policy could respond and credit kept working.</p><p>' + tag('a') + 'Inflation-and-rates bears (1973–74, 2022) are the awkward middle: the central bank cannot cut to the rescue while it is fighting inflation.</p>' } },
          body: K.cd('k', 'Median by kind (two cases: their average; excludes the 2026 dip)', '<table><thead><tr><th>Kind</th><th class="r">Fall</th><th class="r">Peak to low</th><th class="r">Peak to peak</th></tr></thead><tbody>' + rowsT + '</tbody></table>') },
        { key: 'lev', title: 'Leverage then and now', small: 'Market borrowing as a share of GDP', read: NOW.marginGdp + '% now', readColor: C.RED,
          info: { lv: { h: 'What it means', html: '<p>' + tag('f') + 'Margin debt is a record ' + NOW.marginGdp + '% of GDP (' + NOW.marginMonth + '), above the 2000 and 2021 peaks. Relative to market value it is about 1.6%, middling, because the market itself is so large.</p><p>' + tag('a') + 'Margin debt measures fuel, not a spark: it rose for years before each peak. It is not inside the banks as in 2008, so the closer parallel is 2000 or 2021, where leverage deepened a fall without breaking credit.</p>' } },
          body: K.cd('lv', 'Margin borrowing, % of GDP', '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="width:150px;flex:none">' +
            K.dial({ v: NOW.marginGdp, min: 0, max: 9, color: C.RED, notch: 3.8, ends: ['0', '9%'], aria: 'Margin debt ' + NOW.marginGdp + '% of GDP' }) + '</div>' +
            '<table style="flex:1;min-width:220px"><tbody>' + lev.map(function (l) {
              return '<tr><td style="font-weight:800">' + l[0] + '</td><td class="r num" style="font-weight:800;color:' + (l[0] === 'Now' ? C.RED : '#EDE8DC') + '">' + l[1] + '%</td><td style="color:#C2BCAF;font-size:12.5px;padding-left:10px">' + l[2] + '</td></tr>';
            }).join('') + '</tbody></table></div>') },
        { key: 'rates', title: 'What rates were doing into each peak', read: 'Rising into 5 of 9', readColor: '#F2D27A',
          info: { r: { h: 'What it means', html: '<p>' + tag('a') + 'Rates were rising into five of the nine peaks: 1929, 1973, 1987, 2000 and 2022. In 2007 they had just topped out at 5.25% after a long hiking cycle. Cuts after the peak did not stop the 2000 and 2008 falls. In 2020 and 2025 the shock came from outside and rates were not the cause.</p><p>' + tag('a') + 'Today the Fed is raising rates into an oil shock (September 2026), which most resembles 1973 and 2022.</p>' } },
          body: '<div class="cards one">' + K.cd('r', '', '<table><thead><tr><th>Crash</th><th>Rates into the peak</th></tr></thead><tbody>' + MAIN.map(function (c) {
            return '<tr><td style="font-weight:800;white-space:nowrap">' + c.short + '</td><td>' + c.rates + '</td></tr>';
          }).join('') + '</tbody></table>') + '</div>' }
      ]);
  }

  var FOOT = 'Sources: S&P Dow Jones Indices and Dow Jones closing levels as compiled by Global Financial Data and Wikipedia (Closing milestones of the S&P 500; Black Monday 1987); ' +
    'FINRA margin statistics via thetrading.tools (margin debt/GDP); Backtest and Neo Reports (S&P 500 close 16 Oct 2026); Statista (2026 war drawdown, approximate). ' +
    'Price index, closing levels, nominal, no dividends. 1929 uses the Dow Jones Industrial Average. For education, not financial advice. © ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.';

  K.mount({
    cls: 'p75crash', eyebrow: 'History · Market Crashes', title: 'Historical Market Crashes',
    asof: 'Updated <b>19 Oct 2026</b>',
    lede: 'Nine crashes since 1929, plus this year’s war dip, measured the same way: how far the index fell from its record, how long the fall lasted, how long it took to get back, and the rates, credit and leverage behind each one. Today is the 39th anniversary of Black Monday.',
    strip: [['Median fall', pct(MED_DD, 0), C.RED], ['Now', pct(NOW_DD), '#F2D27A'], ['Margin / GDP', NOW.marginGdp + '%', C.RED]],
    tabs: [
      { key: 'takeaway', tab: 'Takeaway', html: takeaway },
      { key: 'drawdown', tab: 'Drawdown', html: drawdown },
      { key: 'database', tab: 'Database', short: 'Crashes', html: database },
      { key: 'conditions', tab: 'Rates, credit & leverage', short: 'Conditions', html: conditions }
    ],
    foot: FOOT
  });
})();
