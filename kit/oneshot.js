/* Point75 One Shot kit: the page shell shared by /market-crashes and /geopolitical-risk.
   Header with inline eyebrow and title, fold-away top, Takeaway-first tabs, one-open collapsible sections
   with an info screen beside them, tools-style dials with an even needle sweep, and Fact / Point75 analysis / Scenario tags.
   Follows ONE-SHOT.md in point75-site. (c) Rahul Saxena. All rights reserved. */
(function () {
  if (window.P75KIT) return;
  var BLUE = '#1FC8FF', RED = '#FF6640', NEUT = '#9AA0A6', GOLD = '#C9A227', AMBER = '#FFB224', LIME = '#B6E04A', GREEN = '#2BFF88';

  var CSS =
    '.p75x{--ink:#111214;--panel:#17181B;--line:#2A2B2F;--cream:#EDE8DC;--soft:#E4DED1;--muted:#C2BCAF;--gold:#C9A227;--gold2:#FFD23F;' +
      'background:var(--ink);color:var(--cream);font-family:Manrope,system-ui,sans-serif;width:100%;box-sizing:border-box;min-height:100vh}' +
    '.p75x *{box-sizing:border-box}.p75x,.p75x *{overflow-anchor:none}' +
    '.p75x [style*="color:#FF6640"]:not(.nb){font-weight:800}' +
    '.p75x .wrap{max-width:1040px;margin:0 auto;padding:4px 20px 40px}' +
    '.p75x a{color:var(--gold2)}' +
    // header
    '.p75x .hd-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;margin:12px 0 8px}' +
    '.p75x .eyebrow{color:var(--gold);letter-spacing:.14em;font-size:12px;font-weight:700;text-transform:uppercase}' +
    '.p75x h1{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:28px;line-height:1.15;margin:0;letter-spacing:-.01em}' +
    '.p75x .asof{margin-left:auto;font-size:12.5px;color:var(--muted)}.p75x .asof b{color:var(--cream);font-weight:600}' +
    '.p75x .lede{color:var(--soft);font-size:16px;line-height:1.6;margin:0 0 4px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    '.p75x h2{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:23px;margin:32px 0 4px}' +
    '.p75x .view > h2:first-child,.p75x .view > .tk-back + h2{margin-top:16px}' +
    '.p75x .sub{color:var(--soft);font-size:14.5px;line-height:1.55;margin:0 0 12px;text-align:justify;hyphens:auto;-webkit-hyphens:auto}' +
    // fold-away top
    '.p75x .top,.p75x .fstrip{display:grid;transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s}' +
    '.p75x .top > div,.p75x .fstrip > div{min-height:0;overflow:hidden}' +
    '.p75x .top{grid-template-rows:1fr}.p75x .fstrip{grid-template-rows:0fr;opacity:0}' +
    '.p75x.folded .top{grid-template-rows:0fr;opacity:0}.p75x.folded .fstrip{grid-template-rows:1fr;opacity:1}' +
    '.p75x:not(.folded) .fstrip{visibility:hidden}.p75x.folded .top > div{visibility:hidden;transition:visibility 0s .5s}' +
    '.p75x .fold{display:flex;align-items:center;gap:8px 22px;flex-wrap:wrap;width:100%;min-height:44px;margin:8px 0 0;padding:5px 8px 5px 16px;border-radius:12px;background:var(--panel);border:1px solid var(--line);color:inherit;font:inherit;text-align:left;cursor:pointer}' +
    '.p75x .fold:hover{border-color:var(--gold)}.p75x .fold:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75x .fi{display:inline-flex;align-items:baseline;gap:8px;white-space:nowrap}.p75x .fi small{color:#D2CCBF;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}' +
    '.p75x .fi b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:22px;line-height:1}' +
    '.p75x .fi.ey small{color:var(--gold)}' +
    '.p75x .fo{margin-left:auto;display:inline-flex;align-items:center;gap:10px;color:var(--gold2);font-size:13px;font-weight:700}' +
    '.p75x .fo-c{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--gold);display:grid;place-items:center;animation:p75xbob 2.4s ease-in-out infinite}' +
    '.p75x .fo-c:after{content:"";width:7px;height:7px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-2px) rotate(45deg)}' +
    '@keyframes p75xbob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}' +
    // tabs
    '.p75x .tabs{position:sticky;top:var(--tabs-top,0px);z-index:6;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:10px -20px 0;padding:6px 20px;background:var(--ink);border-bottom:1px solid var(--line)}' +
    '.p75x .tabs::-webkit-scrollbar{display:none}' +
    '.p75x .tab{flex:none;display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:999px;border:1px solid #3A3C42;color:#F1ECE2;font-weight:700;font-size:14.5px;text-decoration:none;white-space:nowrap;transition:border-color .15s,background .15s}' +
    '.p75x .tab:hover{border-color:var(--gold);color:#fff}.p75x .tab.on{background:var(--gold);border-color:var(--gold);color:#111214}' +
    '.p75x .tab:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}.p75x .tab .ts{display:none}' +
    '.p75x .view{padding-top:12px}' +
    // takeaway
    '.p75x .tk{display:flex;flex-direction:column;gap:14px}' +
    '.p75x .tk-head{margin:0;padding:16px 22px;border-radius:16px;background:linear-gradient(180deg,#24262B 0%,#1A1B1F 100%);border:2px solid var(--gold);font-family:"Hedvig Letters Serif",Georgia,serif;font-size:24px;line-height:1.4;color:#fff}' +
    '.p75x .tk-watch{margin:0;font-size:15px;line-height:1.5;color:#F1ECE2}.p75x .tk-watch b{color:var(--gold2);letter-spacing:.12em;text-transform:uppercase;font-size:12px;margin-right:8px}' +
    '.p75x .ov{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}' +
    '.p75x .ovc{display:flex;flex-direction:column;gap:6px;padding:14px 16px;border-radius:14px;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--gold);color:inherit;text-decoration:none;cursor:pointer;transition:border-color .15s,transform .15s}' +
    '.p75x .ovc:hover,.p75x .ovc:focus-visible{border-color:var(--gold);outline:none}@media (hover:hover){.p75x .ovc:hover{transform:translateY(-2px)}}' +
    '.p75x .ovh{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E2DDD2;font-weight:800}' +
    '.p75x .go{flex:none;white-space:nowrap;color:var(--gold2);letter-spacing:.02em;text-transform:none;font-size:13px}' +
    '.p75x .ovm{display:flex;align-items:center;gap:10px}' +
    '.p75x .ovd{flex:0 0 auto;width:96px}.p75x .ovd svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.p75x .ovr{display:flex;flex-direction:column;gap:3px;min-width:0}' +
    '.p75x .ovr b{font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:32px;line-height:1;white-space:nowrap}' +
    '.p75x .ovr em{font-style:normal;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}' +
    '.p75x .ovn{font-size:14px;line-height:1.45;color:#F1ECE2;margin:0}' +
    '.p75x a.tk-back{display:inline-flex;align-items:center;gap:8px;min-height:44px;margin:0 0 4px;padding:0 16px;border-radius:99px;border:1px solid var(--gold);background:rgba(201,162,39,.1);color:var(--gold2);font-weight:800;font-size:14.5px;text-decoration:none}' +
    '.p75x a.tk-back:hover{background:rgba(201,162,39,.22)}' +
    // dials
    '.p75x .p75n{transition:transform 1.25s cubic-bezier(.37,0,.3,1)}' +
    '.p75x .p75f{stroke-dashoffset:100;transition:stroke-dashoffset 1.25s cubic-bezier(.37,0,.3,1)}.p75x .go-sweep .p75f{stroke-dashoffset:0}' +
    // sections
    '.p75x .sx{display:flex;flex-direction:column;gap:8px}' +
    '.p75x .sx-i{border-radius:14px;background:var(--panel);border:1px solid var(--line)}.p75x .sx-i.open{border-color:#4A4536}' +
    '.p75x .sx-h{display:flex;align-items:center;gap:14px;width:100%;min-height:52px;padding:8px 12px 8px 18px;background:none;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:14px}' +
    '.p75x .sx-h:focus-visible{outline:3px solid #F2D27A;outline-offset:-2px}' +
    '.p75x .sx-t{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:19px;line-height:1.25;min-width:0}' +
    '.p75x .sx-t small{display:block;font-family:Manrope,sans-serif;font-size:13px;color:var(--muted);margin-top:2px}' +
    '.p75x .sx-r{margin-left:auto;display:flex;align-items:center;gap:12px;flex:none;text-align:right}' +
    '.p75x .sx-v{font-weight:800;font-size:15px;font-variant-numeric:tabular-nums;white-space:nowrap}' +
    '.p75x .chev{width:32px;height:32px;border-radius:50%;border:1.5px solid #4A4C52;display:grid;place-items:center;transition:transform .25s,border-color .15s}' +
    '.p75x .chev:after{content:"";width:7px;height:7px;border-right:2px solid var(--cream);border-bottom:2px solid var(--cream);transform:translateY(-2px) rotate(45deg)}' +
    '.p75x .sx-h:hover .chev{border-color:var(--gold)}.p75x .open .chev{transform:rotate(180deg);border-color:var(--gold)}' +
    '.p75x .sx-b{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.4,0,.2,1)}.p75x .open .sx-b{grid-template-rows:1fr}' +
    '.p75x .sx-b > div{min-height:0;overflow:hidden}' +
    '.p75x .sx-g{display:grid;grid-template-columns:minmax(0,1fr) 350px;gap:14px;padding:0 14px 14px}' +
    '.p75x .sx-g.solo{grid-template-columns:minmax(0,1fr)}' +
    '.p75x .sx-main{min-width:0}' +
    '.p75x .hint{display:flex;align-items:center;gap:10px;margin:2px 0 10px;font-size:13.5px;color:var(--gold2)}' +
    '.p75x .hint i{flex:none;width:9px;height:9px;border-radius:50%;background:var(--gold);animation:p75xping 1.8s ease-out infinite}' +
    '@keyframes p75xping{0%{box-shadow:0 0 0 0 rgba(242,210,122,.6)}80%,100%{box-shadow:0 0 0 9px rgba(242,210,122,0)}}' +
    '.p75x .sx-info{align-self:start;position:sticky;top:64px;padding:14px 16px;border-radius:12px;background:#1D1E22;border:1px solid #3A3626;font-size:14.5px;line-height:1.55;color:#F1ECE2}' +
    '.p75x .sx-info h4{margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold2)}' +
    '.p75x .sx-info p{margin:0 0 8px}.p75x .sx-info p:last-child{margin:0}' +
    '.p75x .open.fresh{animation:p75xglow 1.2s ease-out 1}' +
    '@keyframes p75xglow{0%{box-shadow:0 0 0 0 rgba(201,162,39,.45)}100%{box-shadow:0 0 0 12px rgba(201,162,39,0)}}' +
    // cards that drive the info screen
    '.p75x .cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.p75x .cards.one{grid-template-columns:minmax(0,1fr)}.p75x .cards.three{grid-template-columns:repeat(3,minmax(0,1fr))}' +
    '.p75x .cd{position:relative;padding:12px 14px;border-radius:12px;background:#1B1C20;border:1px solid var(--line);font-size:14.5px;line-height:1.55;color:#F1ECE2;transition:border-color .15s,transform .15s}' +
    '.p75x .cd[data-wim]{cursor:pointer}.p75x .cd[data-wim]:hover{border-color:var(--gold)}@media (hover:hover){.p75x .cd[data-wim]:hover{transform:translateY(-1px)}}' +
    '.p75x .cd.on{border-color:var(--gold);background:#201F1A}' +
    '.p75x .cd h5{margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#E2DDD2;font-weight:800;display:flex;justify-content:space-between;gap:8px;align-items:center}' +
    '.p75x .cd p{margin:0 0 6px}.p75x .cd p:last-child{margin:0}' +
    '.p75x .wim{font-size:12.5px;font-weight:800;color:var(--gold2);white-space:nowrap;letter-spacing:.02em;text-transform:none}' +
    '.p75x .cd .big{font-family:"Hedvig Letters Serif",Georgia,serif;font-size:30px;line-height:1.05;display:block;margin:2px 0 4px}' +
    // tags: Fact / Point75 analysis / Scenario (shape + colour, so never colour alone)
    '.p75x .tg{display:inline-block;margin-right:7px;padding:1px 8px;border-radius:99px;font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;vertical-align:1px;white-space:nowrap}' +
    '.p75x .tg.f{background:#EDE8DC;color:#111214}.p75x .tg.a{background:var(--gold);color:#111214}.p75x .tg.s{border:1.5px dashed #EDE8DC;color:#EDE8DC;padding:0 7px}' +
    '.p75x .key{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center;font-size:13px;color:var(--soft);margin:0 0 10px}' +
    // pills, chain, tables
    '.p75x .pill{display:inline-block;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid currentColor;white-space:nowrap}' +
    '.p75x .chain{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin:0 0 10px}' +
    '.p75x .ch{position:relative;padding:10px 14px 10px 12px;background:#1B1C20;border:1px solid var(--line);font-size:13.5px;line-height:1.45;color:#F1ECE2}' +
    '.p75x .ch:first-child{border-radius:12px 0 0 12px}.p75x .ch:last-child{border-radius:0 12px 12px 0}.p75x .ch + .ch{border-left:0}' +
    '.p75x .ch small{display:block;font-size:10.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold2);margin-bottom:3px}' +
    '.p75x .ch:not(:last-child):after{content:"";position:absolute;right:-7px;top:50%;width:12px;height:12px;background:#1B1C20;border-top:1px solid var(--line);border-right:1px solid var(--line);transform:translateY(-50%) rotate(45deg);z-index:1}' +
    '.p75x .forces{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.p75x .forces ul{margin:0;padding-left:18px}.p75x .forces li{margin:0 0 4px}' +
    '.p75x table{width:100%;border-collapse:collapse;font-size:14px}' +
    '.p75x th{text-align:left;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:800;padding:0 8px 8px 0;border-bottom:1px solid var(--line)}' +
    '.p75x td{padding:8px 8px 8px 0;border-bottom:1px solid var(--line);color:var(--cream);vertical-align:top}' +
    '.p75x .r{text-align:right}.p75x .num{font-variant-numeric:tabular-nums}' +
    '.p75x .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0 0 10px}' +
    '.p75x .st{padding:10px 12px;border-radius:12px;background:#1B1C20;border:1px solid var(--line)}' +
    '.p75x .st small{display:block;font-size:10.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#D2CCBF}' +
    '.p75x .st b{display:block;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:24px;line-height:1.15;margin-top:3px;white-space:nowrap}' +
    '.p75x .st span{display:block;font-size:12.5px;color:var(--soft)}' +
    // charts
    '.p75x .chart{position:relative;width:100%}.p75x .chart svg{display:block;width:100%;overflow:visible}' +
    '.p75x .tip{position:absolute;z-index:4;pointer-events:none;background:#0b0c0e;border:1px solid #3A3C42;border-radius:8px;padding:8px 10px;font-size:12.5px;line-height:1.45;color:var(--cream);opacity:0;transition:opacity .12s;max-width:260px}' +
    '.p75x .tip .t{color:var(--gold2);font-weight:800;margin-bottom:2px}' +
    '.p75x .chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}' +
    '.p75x .chip{min-height:36px;padding:0 12px;border-radius:99px;border:1px solid #3A3C42;background:none;color:#F1ECE2;font:inherit;font-size:13px;font-weight:700;cursor:pointer}' +
    '.p75x .chip:hover{border-color:var(--gold)}.p75x .chip[aria-pressed="true"]{background:#FF6640;border-color:#FF6640;color:#111214}' +
    // footer: one line with ellipsis, tap to show in full
    '.p75x .foot{margin-top:28px;border-top:1px solid var(--line);padding-top:14px;color:#B4AEA2;font-size:12px;line-height:1.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}' +
    '.p75x .foot.full{white-space:normal}.p75x .foot a{color:#D8C78A}' +
    // pickers: chips or custom selectors that swap one panel in place
    '.p75x .pk-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px;padding:2px}.p75x .pk-chips::-webkit-scrollbar{display:none}' +
    '.p75x .pkc{flex:none;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:12px;border:1px solid #3A3C42;background:var(--panel);color:#F1ECE2;font:inherit;font-size:14px;font-weight:700;cursor:pointer;transition:border-color .15s,background .15s}' +
    '.p75x .pkc b{font-size:13px;font-weight:800;font-variant-numeric:tabular-nums}' +
    '.p75x .pkc:hover{border-color:var(--gold)}.p75x .pkc.on{border-color:var(--gold);background:#2A2618;box-shadow:inset 0 -3px 0 var(--gold)}' +
    '.p75x .pkc:focus-visible,.p75x [data-pick]:focus-visible{outline:3px solid #F2D27A;outline-offset:2px}' +
    '.p75x .pk-p{animation:p75xin .3s ease-out}@keyframes p75xin{from{opacity:.25;transform:translateY(4px)}to{opacity:1;transform:none}}' +
    '.p75x .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:start}' +
    '.p75x .split.wide{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr)}.p75x .split.narrow{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}' +
    '.p75x .tri{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr) minmax(0,.85fr);gap:12px;align-items:start}' +
    '.p75x .col{display:flex;flex-direction:column;gap:10px;min-width:0}' +
    '.p75x .pnl-h{display:flex;align-items:baseline;gap:10px 14px;flex-wrap:wrap;margin:0 0 8px}' +
    '.p75x .pnl-h h3{margin:0;font-family:"Hedvig Letters Serif",Georgia,serif;font-weight:400;font-size:22px;color:#fff}' +
    '.p75x .pnl-h small{font-size:13px;color:var(--muted)}' +
    '.p75x .vchain{display:flex;flex-direction:column;gap:0}' +
    '.p75x .vchain .ch{border-radius:0;border:1px solid var(--line);border-top:0;padding:7px 12px}.p75x .vchain .ch:first-child{border-top:1px solid var(--line);border-radius:12px 12px 0 0}.p75x .vchain .ch:last-child{border-radius:0 0 12px 12px}' +
    '.p75x .vchain .ch:after{display:none}.p75x .vchain .ch small{display:inline-block;width:auto;margin:0 8px 0 0}' +
    '.p75x .cd ul{margin:0;padding-left:18px;list-style:disc}.p75x .cd li::marker{color:#8A8D93}.p75x .cd li{margin:0 0 3px}' +
    '.p75x .cd.tight{padding:10px 12px;font-size:14px;line-height:1.5}' +
    '.p75x .tl2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 14px}.p75x .tl2 b{display:block;color:#FFD23F;font-size:12px;letter-spacing:.08em;text-transform:uppercase}' +
    '@media (max-width:560px){.p75x .tl2{grid-template-columns:minmax(0,1fr)}}' +
    '.p75x .evlist{gap:6px}.p75x .evlist .pkc{width:100%;text-align:left;min-height:48px;padding:6px 14px}.p75x .evlist .pkc small{display:block;font-size:12px;font-weight:600;color:var(--muted)}' +
    '.p75x .lead-line{margin:0 0 10px;font-size:14.5px;line-height:1.5;color:#F1ECE2}' +
    '.p75x .tile{cursor:pointer}.p75x .tile .tbox{transition:stroke .15s,fill .15s}.p75x .tile:hover .tbox{stroke:#C9A227}.p75x .tile.on .tbox{stroke:#C9A227;stroke-width:2;fill:#2A2618}' +
    '.p75x .fan-s.on circle.dot{stroke:#fff;stroke-width:3}.p75x .fan-s.on text{fill:#FFD23F}' +
    // embedded in a host site: the host sets the column and the sticky header
    '@media (min-width:1100px){.p75x.embed .fold{margin-top:4px}.p75x.embed .tabs{margin-top:6px;padding-top:4px;padding-bottom:4px}.p75x.embed .view{padding-top:8px}.p75x.embed .hd-t{margin-top:4px}.p75x.embed .tk{gap:8px}.p75x.embed .tk-head{padding:10px 18px}.p75x.embed .ovc{padding:10px 14px}}' +
    '.p75x .tabs .fmini{display:none;margin-left:auto;flex:none;align-items:center;gap:16px;min-height:44px;padding:0 6px 0 14px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:inherit;font:inherit;cursor:pointer}' +
    '.p75x .tabs .fmini:hover{border-color:var(--gold)}.p75x .tabs .fmini .fi b{font-size:19px}' +
    // desktop: once folded, the readings and the unfold arrow ride in the tab bar instead of taking a row of their own
    '@media (min-width:1100px){.p75x.folded .fstrip{grid-template-rows:0fr;opacity:0;visibility:hidden}.p75x.folded .tabs .fmini{display:flex}}' +
    '.p75x.embed{min-height:0;background:transparent}.p75x.embed .wrap{max-width:none;padding:0 0 32px}.p75x.embed .tabs{margin-left:0;margin-right:0;padding-left:0;padding-right:0}' +
    // phone sheet
    '.p75x .sheet{position:fixed;left:0;right:0;bottom:0;z-index:50;max-height:70vh;overflow:auto;padding:18px 18px 24px;background:#1D1E22;border-top:2px solid var(--gold);border-radius:16px 16px 0 0;font-size:15px;line-height:1.55;color:#F1ECE2;transform:translateY(105%);visibility:hidden;transition:transform .3s,visibility 0s .3s}' +
    '.p75x .sheet.on{transform:none;visibility:visible;transition:transform .3s}.p75x .sheet h4{margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold2)}.p75x .sheet p{margin:0 0 8px}' +
    '.p75x .sheet-x{position:absolute;right:10px;top:8px;min-width:44px;min-height:44px;border:0;background:none;color:var(--cream);font-size:24px;cursor:pointer}' +
    // responsive
    // desktop: the Takeaway (title, intro, tabs, headline, cards) fits ~1300 x 546 without scrolling
    '@media (min-width:1100px){.p75x .cd.tight{font-size:13.5px;line-height:1.42;padding:9px 12px}.p75x .cd.tight li{margin-bottom:2px}.p75x .cd.tight p{margin-bottom:4px}.p75x .vchain .ch{padding:5px 12px;font-size:13px}.p75x .pnl-h{margin-bottom:6px}.p75x .pnl-h h3{font-size:20px}.p75x .hd-t{margin-top:8px}.p75x .tk{gap:10px}.p75x .tk-head{font-size:22px;padding:12px 20px;line-height:1.38}.p75x .ovc{padding:12px 16px;gap:4px}.p75x .ovn{font-size:13.5px;line-height:1.4}.p75x .view{padding-top:10px}.p75x .tabs{margin-top:8px}}' +
    '@media (max-width:1099px){.p75x .ov{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:1099px){.p75x .tri{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.p75x .tri > .cd:last-child{grid-column:1 / -1}}' +
    '@media (max-width:880px){.p75x .secsplit > .col:first-child{display:contents}.p75x .secsplit .sec-fan{order:0}.p75x .secsplit .sec-detail{order:1}.p75x .secsplit .sec-read{order:2}}' +
    '@media (max-width:880px){.p75x .tri,.p75x .split,.p75x .split.wide,.p75x .split.narrow{grid-template-columns:minmax(0,1fr)}.p75x .sx-g{grid-template-columns:minmax(0,1fr)}.p75x .sx-info{display:none}.p75x .lede,.p75x .sub{text-align:left}' +
      '.p75x .hd-t .eyebrow{flex-basis:100%}.p75x .stats{grid-template-columns:repeat(2,minmax(0,1fr))}.p75x .cards.three{grid-template-columns:minmax(0,1fr)}' +
      '.p75x .chain{grid-template-columns:minmax(0,1fr)}.p75x .ch,.p75x .ch + .ch{border:1px solid var(--line);border-radius:0;border-top:0}.p75x .ch:first-child{border-radius:12px 12px 0 0;border-top:1px solid var(--line)}.p75x .ch:last-child{border-radius:0 0 12px 12px}' +
      '.p75x .ch:not(:last-child):after{right:auto;left:22px;top:auto;bottom:-7px;transform:rotate(135deg)}}' +
    '@media (max-width:640px){.p75x .ov,.p75x .cards,.p75x .forces{grid-template-columns:minmax(0,1fr)}.p75x .tk-head{font-size:19px;padding:14px 16px}}' +
    '@media (max-width:560px){.p75x .wrap{padding:4px 16px 36px}.p75x h1{font-size:24px}.p75x .tabs{margin:8px -16px 0;padding:6px 16px;gap:5px}.p75x .tab{padding:0 12px;font-size:13.5px}' +
      '.p75x .tab .tl{display:none}.p75x .tab .ts{display:inline}.p75x .fo-t{display:none}.p75x .sx-h{padding-left:14px;gap:10px}.p75x .sx-t{font-size:17px}.p75x .sx-v{font-size:13.5px}' +
      '.p75x .ovr b{font-size:28px}.p75x .st b{font-size:21px}.p75x .fold{gap:6px 14px}.p75x .fi b{font-size:19px}}' +
    '@media (max-width:370px){.p75x .hd-t .asof{font-size:11.5px}.p75x .tab{padding:0 9px;font-size:12.5px}.p75x .chev{width:28px;height:28px}.p75x .fi.x2{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.p75x .hint i,.p75x .fo-c,.p75x .open.fresh{animation:none}.p75x .ovc:hover,.p75x .cd:hover{transform:none}.p75x .top,.p75x .fstrip,.p75x .sx-b{transition:none}}';

  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  function once() {
    if (document.getElementById('p75x-css')) return;
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Manrope:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(f);
    var st = document.createElement('style'); st.id = 'p75x-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  // ---------- Tags ----------
  var TAGS = { f: 'Fact', a: 'Point75 analysis', s: 'Scenario' };
  function tag(k) { return '<span class="tg ' + k + '">' + TAGS[k] + '</span>'; }
  function tagKey() { return '<div class="key">' + tag('f') + '<span>sourced, checkable</span>' + tag('a') + '<span>our reading of the facts</span>' + tag('s') + '<span>what could happen, not a forecast</span></div>'; }
  function col(t, c) { return '<span style="color:' + c + '">' + t + '</span>'; }

  // ---------- Dials: tools-style speedometer (220° sweep, slim track, fill from rest, tapered needle, hub) ----------
  var DCX = 100, DCY = 96, DR = 80, DSWEEP = 220;
  function dPt(deg, r) { var a = deg * Math.PI / 180; return [(DCX + r * Math.sin(a)).toFixed(2), (DCY - r * Math.cos(a)).toFixed(2)]; }
  function dArc(d0, d1, r) {
    var a = dPt(d0, r), b = dPt(d1, r);
    return 'M' + a[0] + ',' + a[1] + ' A' + r + ',' + r + ' 0 ' + (Math.abs(d1 - d0) > 180 ? 1 : 0) + ' ' + (d1 > d0 ? 1 : 0) + ' ' + b[0] + ',' + b[1];
  }
  // o: { v, min, max, rest, color, ends:[lo,hi], notch, zones:[[a,b,col]], aria }
  function dial(o) {
    var ang = function (v) { return -DSWEEP / 2 + (Math.max(o.min, Math.min(o.max, v)) - o.min) / (o.max - o.min) * DSWEEP; };
    var rest = o.rest == null ? o.min : o.rest, a0 = ang(rest), a1 = ang(o.v), sw = 11, svg = '';
    svg += '<path d="' + dArc(-DSWEEP / 2, DSWEEP / 2, DR) + '" fill="none" stroke="#2A2C31" stroke-width="' + sw + '" stroke-linecap="round"/>';
    (o.zones || []).forEach(function (z) {
      svg += '<path d="' + dArc(ang(z[0]), ang(z[1]), DR + sw / 2 + 4) + '" fill="none" stroke="' + z[2] + '" stroke-opacity=".6" stroke-width="2.5"/>';
    });
    if (o.notch != null) {
      var nq = ang(o.notch), n1 = dPt(nq, DR - sw / 2 - 5), n2 = dPt(nq, DR + sw / 2 + 6);
      svg += '<line x1="' + n1[0] + '" y1="' + n1[1] + '" x2="' + n2[0] + '" y2="' + n2[1] + '" stroke="#F2D27A" stroke-width="4" stroke-linecap="round"/>';
    }
    if (Math.abs(a1 - a0) > .5) {
      var lo = Math.min(a0, a1), hi = Math.max(a0, a1);
      svg += '<path class="p75f" pathLength="100" stroke-dasharray="100 200" d="' + dArc(lo, hi, DR) + '" fill="none" stroke="' + o.color + '" stroke-width="' + sw + '" stroke-linecap="round" style="filter:drop-shadow(0 0 5px ' + o.color + '66)"/>';
    }
    if (o.ends) [[-DSWEEP / 2, o.ends[0]], [DSWEEP / 2, o.ends[1]]].forEach(function (e) {
      var p = dPt(e[0], DR);
      svg += '<text x="' + p[0] + '" y="' + (+p[1] + sw / 2 + 19).toFixed(1) + '" text-anchor="middle" font-size="19" font-weight="800" fill="#C9C4B8" font-family="Manrope,sans-serif">' + e[1] + '</text>';
    });
    var len = DR - 26, nw = 5, as = ang(o.min);   // needle starts at the left end of the scale
    svg += '<g class="p75n" data-a="' + a1.toFixed(1) + '" data-r="' + as.toFixed(1) + '" style="transform-origin:' + DCX + 'px ' + DCY + 'px;transform:rotate(' + as.toFixed(1) + 'deg)">' +
      '<path d="M' + (DCX - nw) + ',' + DCY + ' L' + DCX + ',' + (DCY - len) + ' L' + (DCX + nw) + ',' + DCY + ' Z" fill="#F4F1EA"/>' +
      '<line x1="' + DCX + '" y1="' + DCY + '" x2="' + DCX + '" y2="' + (DCY + 14) + '" stroke="#F4F1EA" stroke-width="4.5" stroke-linecap="round"/></g>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="11" fill="#17181B" stroke="' + o.color + '" stroke-width="3"/>' +
      '<circle cx="' + DCX + '" cy="' + DCY + '" r="3.6" fill="#F4F1EA"/>';
    return '<svg viewBox="' + (o.ends ? '0 6 200 148' : '2 6 196 124') + '" role="img" aria-label="' + esc(o.aria || '') + '">' + svg + '</svg>';
  }
  function sweep(scope) {   // needles rest at the left end, pause, then glide evenly to the reading
    var ns = scope.querySelectorAll('.p75n'), fs = scope.querySelectorAll('.p75f');
    ns.forEach(function (n) { n.style.transition = 'none'; n.style.transform = 'rotate(' + n.getAttribute('data-r') + 'deg)'; });
    scope.classList.remove('go-sweep'); fs.forEach(function (f) { f.style.transition = 'none'; });
    void scope.offsetWidth;
    ns.forEach(function (n) { n.style.transition = ''; }); fs.forEach(function (f) { f.style.transition = ''; });
    setTimeout(function () { requestAnimationFrame(function () {
      scope.classList.add('go-sweep');
      ns.forEach(function (n) { n.style.transform = 'rotate(' + n.getAttribute('data-a') + 'deg)'; });
    }); }, 350);
  }

  // ---------- Takeaway card ----------
  // c: { tab, head, dial, value, color, label, note }
  function card(c) {
    return '<a class="ovc" href="#' + c.tab + '" data-tab="' + c.tab + '" data-from-tk="1">' +
      '<span class="ovh"><span>' + c.head + '</span><span class="go">See why ›</span></span>' +
      '<span class="ovm">' + (c.dial ? '<span class="ovd">' + dial(c.dial) + '</span>' : '') +
      '<span class="ovr"><b style="color:' + c.color + '">' + c.value + '</b><em style="color:' + c.color + '">' + c.label + '</em></span></span>' +
      '<p class="ovn">' + c.note + '</p></a>';
  }

  // ---------- Sections: one open at a time, info screen beside the open one ----------
  // items: [{ key, title, small, read, readColor, body, info:{k:{h,html}}, first:'k', solo }]
  var OPEN = {};   // remembered open section per group
  function sections(group, items, def) {
    if (!(group in OPEN)) OPEN[group] = def === undefined ? items[0].key : def;
    return '<div class="sx" data-group="' + group + '">' + items.map(function (it) {
      var on = OPEN[group] === it.key, k0 = it.first || (it.info && Object.keys(it.info)[0]);
      var info = it.info && it.info[k0];
      return '<div class="sx-i' + (on ? ' open' : '') + '" data-key="' + it.key + '">' +
        '<button class="sx-h" aria-expanded="' + on + '"><span class="sx-t">' + it.title + (it.small ? '<small>' + it.small + '</small>' : '') + '</span>' +
        '<span class="sx-r">' + (it.read ? '<span class="sx-v" style="color:' + (it.readColor || '#EDE8DC') + '">' + it.read + '</span>' : '') + '<span class="chev" aria-hidden="true"></span></span></button>' +
        '<div class="sx-b"><div><div class="sx-g' + (info ? '' : ' solo') + '"><div class="sx-main">' +
        (info ? '<p class="hint"><i aria-hidden="true"></i>Tap a card to see what it means</p>' : '') + it.body + '</div>' +
        (info ? '<aside class="sx-info" aria-live="polite"><h4>' + info.h + '</h4>' + info.html + '</aside>' : '') +
        '</div></div></div>' +
        (it.info ? '<script type="application/json" class="sx-data">' + JSON.stringify(it.info).replace(/</g, '\\u003c') + '</script>' : '') +
        '</div>';
    }).join('') + '</div>';
  }
  // a card inside a section that drives the info screen
  function cd(k, head, html, extra) {
    return '<div class="cd' + (extra || '') + '"' + (k ? ' data-wim="' + k + '" tabindex="0" role="button"' : '') + '>' +
      (head ? '<h5><span>' + head + '</span>' + (k ? '<span class="wim">What it means ›</span>' : '') + '</h5>' : '') + html + '</div>';
  }

  // ---------- Charts drawn after layout, redrawn on resize ----------
  var CHARTS = [];
  function slot(draw, cls) { var id = 'p75xc' + CHARTS.length; CHARTS.push({ id: id, draw: draw }); return '<div class="chart ' + (cls || '') + '" id="' + id + '"></div>'; }
  function drawAll(root) { CHARTS.forEach(function (c) { var el = root.querySelector('#' + c.id); if (el && el.offsetParent !== null) c.draw(el, Math.max(260, el.clientWidth)); }); }
  function tipAt(el, html, x, y) {
    var t = el.querySelector('.tip'); if (!t) { t = document.createElement('div'); t.className = 'tip'; el.appendChild(t); }
    t.innerHTML = html; t.style.opacity = 1;
    var r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight;
    var lx = x - r.left + 14; if (lx + w > r.width) lx = x - r.left - w - 14; if (lx < 0) lx = 0;
    var ly = y - r.top - h - 10; if (ly < 0) ly = y - r.top + 16;
    t.style.left = lx + 'px'; t.style.top = ly + 'px';
  }
  function tipOff(el) { var t = el.querySelector('.tip'); if (t) t.style.opacity = 0; }

  // ---------- Pickers: one selector, one panel, swapped in place (keeps each tab to one screen) ----------
  // A picker renders its current panel into [data-pk-panel=group]; anything with data-pick="group:key"
  // (chips, crater tiles, fan spokes) switches it.
  var PICK = {}, PANELS = {};
  // variant lets one picker group drive several panels (e.g. a record and its lesson)
  function picker(group, def, panelFn, variant) {
    if (!(group in PICK)) PICK[group] = def;
    PANELS[group + '|' + (variant || '')] = panelFn;
    return '<div class="pk-p" data-pk-panel="' + group + '" data-pk-v="' + (variant || '') + '">' + panelFn(PICK[group]) + '</div>';
  }
  function picked(group) { return PICK[group]; }
  // items: [{key, label, read, color}]
  function chips(group, items, cls) {
    return '<div class="pk-chips ' + (cls || '') + '" role="group">' + items.map(function (it) {
      return '<button class="pkc" data-pick="' + group + ':' + it.key + '" aria-pressed="false">' + it.label +
        (it.read ? '<b style="color:' + (it.color || '#EDE8DC') + '">' + it.read + '</b>' : '') + '</button>';
    }).join('') + '</div>';
  }
  function markPicks(root) {
    root.querySelectorAll('[data-pick]').forEach(function (el) {
      var p = el.getAttribute('data-pick').split(':'), on = PICK[p[0]] === p[1];
      if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', String(on));
      if (on) el.classList.add('on'); else el.classList.remove('on');
    });
  }

  // ---------- Page ----------
  // cfg: { cls, eyebrow, title, asof, lede, strip:[[label,value,color]], tabs:[{key,tab,short,html()}], foot,
  //        host: element to render into (default <main>), stickyHeader: selector of a site header the tabs sit under }
  function mount(cfg) {
    once();
    var host = document.createElement('div'); host.className = 'p75x ' + (cfg.cls || '') + (cfg.embed ? ' embed' : '');
    (cfg.host || document.querySelector('main') || document.body).appendChild(host);
    var keys = cfg.tabs.map(function (t) { return t.key; });
    var FOLD = !!location.hash.slice(1) && location.hash !== '#' + keys[0], FROM_TK = false;
    var offs = [];   // window listeners, removed on destroy
    function on(ev, fn, opt) { window.addEventListener(ev, fn, opt); offs.push([ev, fn, opt]); }
    function cur() { var k = location.hash.slice(1); return cfg.tabs[Math.max(0, keys.indexOf(k))]; }
    function headerH() { var h = cfg.stickyHeader && document.querySelector(cfg.stickyHeader); return h ? Math.round(h.getBoundingClientRect().height) : 0; }
    function draw() {
      CHARTS = [];
      var c = cur();
      host.style.setProperty('--tabs-top', headerH() + 'px');
      host.innerHTML = '<div class="wrap">' +
        '<div class="top"><div><div class="hd-t"><span class="eyebrow">' + cfg.eyebrow + '</span><h1>' + cfg.title + '</h1>' +
        (cfg.asof ? '<span class="asof">' + cfg.asof + '</span>' : '') + '</div><p class="lede">' + cfg.lede + '</p></div></div>' +
        '<div class="fstrip"><div><button class="fold" data-unfold aria-label="Show the title and introduction">' +
        '<span class="fi ey"><small>' + cfg.eyebrow + '</small></span>' +
        cfg.strip.map(function (s, i) { return '<span class="fi' + (i ? ' x2' : '') + '"><small>' + s[0] + '</small><b style="color:' + s[2] + '">' + s[1] + '</b></span>'; }).join('') +
        '<span class="fo"><span class="fo-t">Show intro</span><span class="fo-c" aria-hidden="true"></span></span></button></div></div>' +
        '<nav class="tabs" role="tablist" aria-label="' + esc(cfg.title) + ' sections">' + cfg.tabs.map(function (t) {
          var on = t.key === c.key;
          return '<a role="tab" class="tab' + (on ? ' on' : '') + '" href="#' + t.key + '" data-tab="' + t.key + '" aria-selected="' + on + '">' +
            (t.short ? '<span class="tl">' + t.tab + '</span><span class="ts" aria-hidden="true">' + t.short + '</span>' : t.tab) + '</a>';
        }).join('') + '<button class="fmini" data-unfold aria-label="Show the title and introduction">' +
        cfg.strip.map(function (s, i) { return '<span class="fi' + (i ? ' x2' : '') + '"><small>' + s[0] + '</small><b style="color:' + s[2] + '">' + s[1] + '</b></span>'; }).join('') +
        '<span class="fo-c" aria-hidden="true"></span></button></nav>' +
        '<div class="view" role="tabpanel" aria-label="' + esc(c.tab) + '">' +
        (FROM_TK && c.key !== keys[0] ? '<a class="tk-back" href="#' + keys[0] + '" data-tab="' + keys[0] + '"><span aria-hidden="true">←</span> Back to the takeaway</a>' : '') +
        c.html() + '</div>' +
        '<p class="foot" title="Tap to show in full">' + cfg.foot + '</p></div>' +
        '<div class="sheet" role="dialog" aria-modal="false" aria-label="What it means"><button class="sheet-x" aria-label="Close">×</button><div class="sheet-c"></div></div>';
      if (FOLD) host.classList.add('folded'); else host.classList.remove('folded');
      drawAll(host); markPicks(host);
      sweep(host);
      if (cfg.after) cfg.after(host);
    }
    function pick(g, k) {
      PICK[g] = k;
      host.querySelectorAll('[data-pk-panel="' + g + '"]').forEach(function (p) { var fn = PANELS[g + '|' + p.getAttribute('data-pk-v')]; if (fn) { p.innerHTML = fn(k); sweep(p); } });
      drawAll(host); markPicks(host);
    }
    function showInfo(sec, k) {
      var data = sec.querySelector('.sx-data'); if (!data) return;
      var info = JSON.parse(data.textContent)[k]; if (!info) return;
      sec.querySelectorAll('.cd.on').forEach(function (x) { x.classList.remove('on'); x.querySelector('.wim') && (x.querySelector('.wim').textContent = 'What it means ›'); });
      var cdEl = sec.querySelector('.cd[data-wim="' + k + '"]');
      if (cdEl) { cdEl.classList.add('on'); var w = cdEl.querySelector('.wim'); if (w) w.textContent = 'Showing ▸'; }
      var aside = sec.querySelector('.sx-info');
      if (aside && getComputedStyle(aside).display !== 'none') aside.innerHTML = '<h4>' + info.h + '</h4>' + info.html;
      else { var sh = host.querySelector('.sheet'); sh.querySelector('.sheet-c').innerHTML = '<h4>' + info.h + '</h4>' + info.html; sh.classList.add('on'); }
    }
    function topOf() { return host.getBoundingClientRect().top + window.pageYOffset - headerH(); }
    host.addEventListener('click', function (e) {
      if (e.target.closest('[data-unfold]')) { FOLD = false; host.classList.remove('folded'); window.scrollTo({ top: Math.max(0, topOf() - 8), behavior: 'smooth' }); return; }
      if (e.target.closest('.sheet-x')) { host.querySelector('.sheet').classList.remove('on'); return; }
      var ft = e.target.closest('.foot'); if (ft && !e.target.closest('a')) { ft.classList.toggle('full'); return; }
      var pk = e.target.closest('[data-pick]');
      if (pk) { var pp = pk.getAttribute('data-pick').split(':'); pick(pp[0], pp[1]); return; }
      var h = e.target.closest('.sx-h');
      if (h) {
        var it = h.parentNode, grp = it.parentNode, g = grp.getAttribute('data-group'), was = it.classList.contains('open');
        grp.querySelectorAll('.sx-i.open').forEach(function (x) { x.classList.remove('open', 'fresh'); x.querySelector('.sx-h').setAttribute('aria-expanded', 'false'); });
        OPEN[g] = was ? null : it.getAttribute('data-key');
        if (!was) {
          it.classList.add('open', 'fresh'); h.setAttribute('aria-expanded', 'true');
          setTimeout(function () { drawAll(it); sweep(it); }, 380);
        }
        return;
      }
      var w = e.target.closest('.cd[data-wim]');
      if (w) { showInfo(w.closest('.sx-i'), w.getAttribute('data-wim')); return; }
      var a = e.target.closest('a[data-tab]'); if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-tab');
      FROM_TK = !!a.getAttribute('data-from-tk');
      if (k === keys[0]) FOLD = false;
      else if (!FOLD) { FOLD = true; }
      history.replaceState(history.state, '', location.pathname + location.search + '#' + k);
      draw();
      var bar = host.querySelector('.tabs'); if (bar.getBoundingClientRect().top < headerH() - 1) window.scrollTo({ top: Math.max(0, topOf() - 8) });
    });
    host.addEventListener('keydown', function (e) {
      var w = e.target.closest && e.target.closest('.cd[data-wim]');
      if (w && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showInfo(w.closest('.sx-i'), w.getAttribute('data-wim')); }
      var g = e.target.closest && e.target.closest('g[data-pick]');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); var pp = g.getAttribute('data-pick').split(':'); pick(pp[0], pp[1]); }
    });
    on('hashchange', function () { draw(); });
    var last = host.clientWidth, t;
    on('resize', function () { clearTimeout(t); t = setTimeout(function () { host.style.setProperty('--tabs-top', headerH() + 'px'); if (host.clientWidth !== last) { last = host.clientWidth; drawAll(host); markPicks(host); } }, 150); });
    // On the Takeaway, the top folds once the reader scrolls down and returns at the top (only if the page still scrolls once folded)
    var hold = 0, lastY = window.pageYOffset;
    on('scroll', function () {
      var y = window.pageYOffset, dy = y - lastY; lastY = y;
      if (Date.now() < hold || cur().key !== keys[0]) return;
      var top = host.querySelector('.top'); if (!top) return;
      var y0 = Math.max(0, topOf());
      if (dy > 0 && !FOLD && y > y0 + 6 && document.documentElement.scrollHeight - top.offsetHeight > window.innerHeight + 80) { FOLD = true; host.classList.add('folded'); hold = Date.now() + 600; }
      else if (dy < 0 && FOLD && y < y0 + 8) { FOLD = false; host.classList.remove('folded'); hold = Date.now() + 600; }
    }, { passive: true });
    draw();
    return {
      redraw: draw, host: host,
      destroy: function () { offs.forEach(function (o) { window.removeEventListener(o[0], o[1], o[2]); }); offs = []; host.remove(); }
    };
  }

  window.P75KIT = { mount: mount, dial: dial, card: card, sections: sections, cd: cd, tag: tag, tagKey: tagKey, col: col, esc: esc,
    slot: slot, tipAt: tipAt, tipOff: tipOff, sweep: sweep, picker: picker, picked: picked, chips: chips,
    C: { BLUE: BLUE, RED: RED, NEUT: NEUT, GOLD: GOLD, AMBER: AMBER, LIME: LIME, GREEN: GREEN } };
})();
