/* Point75 - Geopolitical Risk (/geopolitical-risk). How geopolitical events reach sectors, in the One Shot layout.
   Every claim is tagged Fact (sourced), Point75 analysis, or Scenario. Facts are as of 19 Oct 2026 unless dated.
   (c) Rahul Saxena. All rights reserved. */
(function () {
  var K = window.P75KIT, C = K.C, tag = K.tag, col = K.col, cd = K.cd;
  var F = function (t, s) { return '<p>' + tag('f') + t + (s ? ' ' + src(s) : '') + '</p>'; };
  var A = function (t) { return '<p>' + tag('a') + t + '</p>'; };
  var S = function (t) { return '<p>' + tag('s') + t + '</p>'; };

  // ---------- Sources ----------
  var SRC = {
    war: ['Wikipedia: 2026 Iran war', 'https://en.wikipedia.org/wiki/2026_Iran_war'],
    oilc: ['Wikipedia: 2026–28 oil market chronology', 'https://en.wikipedia.org/wiki/2026%E2%80%932028_world_oil_market_chronology'],
    ff: ['FinanceFeeds, 18 Oct', 'https://financefeeds.com/brent-crude-oil-price-110-week-ahead-highest-settle-since-may-bull-115-bear-100/'],
    st: ['Straits.live, 19 Oct', 'https://straits.live/briefs/2026-10-19'],
    aj18: ['Al Jazeera, 18 Oct', 'https://www.aljazeera.com/news/2026/10/18/iran-says-two-tankers-catch-fire-after-hitting-mines-in-strait-of-hormuz'],
    aj6: ['Al Jazeera, 6 Oct', 'https://www.aljazeera.com/news/2026/10/6/hormuz-ship-attacks-surge-are-increased-oil-exports-sustainable'],
    fb: ['Forbes, 7 Oct', 'https://www.forbes.com/sites/garthfriesen/2026/10/07/why-the-10-year-treasury-yield-just-hit-a-24-year-high/'],
    inv: ['Invezz, 19 Oct', 'https://invezz.com/news/2026/10/19/treasury-yields-ease-as-oil-prices-retreat-amid-fading-fed-rate-hike-bets/'],
    cpi: ['BLS September CPI via US Inflation Calculator', 'https://www.usinflationcalculator.com/inflation/us-cpi-sept-2026-inflation-hits-3-7-as-gas-prices-surge/100073364/'],
    iata: ['Reuters via Investing.com, 7 Jun', 'https://www.investing.com/news/stock-market-news/global-airlines-slash-2026-profit-forecast-on-fuel-shock-from-iran-war-4729675'],
    def: ['Air & Space Forces', 'https://www.airandspaceforces.com/iran-war-boosts-defense-stocks-for-now/'],
    pent: ['Al Jazeera, 9 Aug', 'https://www.aljazeera.com/news/2026/8/9/pentagon-urges-faster-us-weapons-production-amid-stockpile-concerns'],
    ins: ['The National, 17 Jul', 'https://www.thenationalnews.com/business/2026/07/17/war-risk-shipping-premium-surges-again-as-tensions-escalate-at-strait-of-hormuz/'],
    he: ['AGBI, March', 'https://www.agbi.com/industry/2026/03/qatari-lng-shutdown-puts-11-of-global-helium-supply-at-risk/'],
    ifpri: ['IFPRI', 'https://www.ifpri.org/blog/iran-war-from-fertilizer-to-food-crisis/'],
    fert: ['Fertilizer Daily / WTO, 24 Jul', 'https://www.fertilizerdaily.com/20260724-strait-of-hormuz-fertilizer-trade-wto-urea-prices-recovery/'],
    bt: ['Backtest, 17 Oct', 'https://backtest.substack.com/p/the-s-and-p-500-fell-19-this-week'],
    cnn: ['CNN, 20 Mar', 'https://www.cnn.com/2026/03/20/investing/us-stocks-iran'],
    nbc: ['NBC News', 'https://www.nbcnews.com/business/energy/oil-prices-hormuz-iran-ukraine-rcna603919'],
    gv: ['GV Wire, 24 Jun', 'https://gvwire.com/2026/06/24/us-airline-stocks-rise-as-oil-retreats-to-pre-iran-war-levels/']
  };
  function src(k) { var s = SRC[k]; return '<a class="nb" href="' + s[1] + '" target="_blank" rel="noopener" style="font-size:12px;font-weight:700;overflow-wrap:anywhere">' + s[0] + ' ↗</a>'; }

  // ---------- Live readings (Facts) ----------
  var NOW = { brent: 108.09, prewar: 72.48, peak: 118.03, transits: 2, base: 85, y10: 5.09, y10hi: 5.35, cpi: 3.7, core: 2.6 };

  // ---------- Verdict styles (Point75 analysis) ----------
  var V = { up: ['Helped', C.BLUE], down: ['Hurt', C.RED], mix: ['Mixed', '#F2D27A'] };
  function chain(a, b, c, d) {
    return '<div class="chain" role="list">' + [['Geopolitical event', a], ['Commodity · supply chain · trade', b], ['Inflation · earnings', c], ['Sector impact', d]]
      .map(function (s) { return '<div class="ch" role="listitem"><small>' + s[0] + '</small>' + s[1] + '</div>'; }).join('') + '</div>';
  }
  function forces(upHead, up, dnHead, dn) {
    return '<div class="forces">' +
      cd('', '<span style="color:' + C.BLUE + '" class="nb">' + upHead + '</span>', '<ul>' + up.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>', ' tight') +
      cd('', '<span style="color:' + C.RED + '" class="nb">' + dnHead + '</span>', '<ul>' + dn.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>', ' tight') + '</div>';
  }

  // ---------- Sectors ----------
  var SECT = [
    { key: 'energy', head: 'Earns more on every barrel, but the shares price a spike that fades.', name: 'Energy', small: 'Oil and gas producers, refiners', v: 'up',
      ch: ['Gulf supply cut; Hormuz shut to most traffic', 'Brent $72 → $108; diesel tight; emergency stocks released', 'Producers outside the Gulf earn more per barrel', 'U.S. and European producers and refiners gain; Gulf assets at risk'],
      up: ['Lost supply: Aramco puts the loss near 3 billion barrels', 'U.S. crude stocks fell 8.6m barrels in the week to 9 Oct', 'Refinery outages in Russia from Ukrainian drones'],
      dn: ['Emergency barrels: G7 up to 100m; IEA 20m+ of diesel (15 Oct)', 'Russia sanctions waived on 19 Oct', 'Demand destruction above $100', 'Any deal: the 8 Apr ceasefire gave oil its biggest one-day drop since 2020'],
      now: F('The energy sector fund closed at a record on 16 Oct while the S&P 500 fell 1.9% on the week.', 'bt'),
      a: 'Earnings follow the oil price with almost no lag, but energy shares price the long-run oil price, not the spot. They rise less than oil because investors expect the spike to fade.',
      w: 'Hormuz flows against the 17 million barrel-a-day baseline, and whether emergency barrels arrive faster than expected.' },
    { key: 'defense', head: 'Backlog, not headlines: orders become earnings over one to three years.', name: 'Defense', small: 'Weapons, munitions, missile defense', v: 'up',
      ch: ['War; heavy use of interceptors and munitions', 'Missiles, rocket motors and electronics; lead times near two years', 'Budget requests and replenishment orders build backlog', 'Revenue arrives over 2027–28; margins depend on contract type'],
      up: ['A $1.5 trillion Pentagon request for next year', 'Stockpiles to rebuild (THAAD and PAC-3 interceptors used heavily)', 'Gulf and European buyers re-arming'],
      dn: ['Peace, or a weakened Iran, lowers future demand', 'Fixed-price contracts squeezed by inflation and 5% yields', 'Purchasing has historically plateaued after surges', 'Factory capacity caps how fast orders become sales'],
      now: F('On 2 Mar, the first trading day of the war, Northrop rose 6%, RTX 4.7% and Lockheed 3.3% while the S&P 500 was flat.', 'def'),
      a: 'The trade is backlog, not headlines. Orders take one to three years to become earnings, so a ceasefire hurts the shares faster than it hurts revenue.',
      w: 'Supplemental war funding in Congress and multiyear munitions contracts.' },
    { key: 'shipping', head: 'A bet on how long the disruption lasts: tankers outside the Gulf win, ships inside lose.', name: 'Shipping', small: 'Tankers, containers, insurance', v: 'mix',
      ch: ['Chokepoint closed; ships attacked and mined', 'Longer routes, ship-to-ship shuttles, ~40% of Gulf exports bypassing Hormuz', 'War-risk insurance up from 0.25% to 3–10% of hull value; freight up', 'Tanker owners earn more; ships trapped; container lines rerouted'],
      up: ['More tonne-miles per barrel', 'Tankers tied up shuttling, so fewer are free elsewhere', 'Insurance and freight passed on to cargo owners'],
      dn: ['Volumes through the Gulf collapse (2 transits on 11 Oct vs 85 a day)', 'Ships trapped and about 6,000 sailors stranded', 'Attacks on hulls and crews', 'A deal would normalise rates quickly'],
      now: F('Iran attacked at least 15 container ships in the ten days to 19 Oct.', 'st'),
      a: 'Tanker owners outside the Gulf win; anyone with ships or cargo inside it loses. The sector is a bet on how long the disruption lasts, not on whether it happens.',
      w: 'War-risk premiums and daily transit counts (IMF PortWatch).' },
    { key: 'semis', head: 'Hurt at the margin by helium and rates; the AI cycle matters far more.', name: 'Semiconductors', small: 'Chipmakers and equipment', v: 'mix',
      ch: ['Qatar’s Ras Laffan LNG hub struck and offline since 19 Mar', 'Helium (an LNG byproduct) stops; ~11% of world supply at risk', 'Higher fab costs and allocation; power costs; higher real yields', 'Margins pinched in Korea and Taiwan; valuations hit by rates'],
      up: ['AI demand is far larger than any war effect', 'Larger helium inventories and recycling since COVID', 'Japan sources more helium from the U.S.'],
      dn: ['Helium shortage for cooling and purging', 'Energy costs at fabs', 'Real 10-year yield near 2.9% weighs on valuations'],
      now: F('Semiconductors fell 9.5% in the week to 16 Oct, mostly on worries about how the AI build-out is financed, not the war.', 'bt'),
      a: 'Two channels, kept apart: the war acts on chips through helium and interest rates; the AI cycle acts through demand and financing. In October the AI channel dominated.',
      w: 'Ras Laffan restart dates and helium contract allocations.' },
    { key: 'airlines', head: 'The cleanest loser from expensive oil, and the first to rally if it falls.', name: 'Airlines', small: 'Passenger and cargo carriers', v: 'down',
      ch: ['War; airspace closed over the Gulf', 'Jet fuel spikes (fuel is nearly a third of costs); longer routes', 'IATA cut 2026 industry profit to $23bn from $41bn', 'Margins squeezed; Gulf hubs disrupted'],
      up: ['Fares passed on: U.S. airfares +22.4% in a year', 'Capacity cuts support prices', 'Relief rallies whenever oil falls'],
      dn: ['Fuel bill ~$350bn this year vs ~$252bn in 2025', 'Rerouting adds hours', 'High fares meet a squeezed consumer'],
      now: F('IATA cut its 2026 profit forecast to about $23bn from $41bn on the fuel shock (7 Jun).', 'iata'),
      a: 'The cleanest losers from expensive oil. The shares trade on oil’s direction more than on war news: they jumped in June as oil fell back toward pre-war levels.',
      w: 'Jet fuel cracks and fare growth versus fuel cost growth.' },
    { key: 'banks', head: 'Winning on rates, and not yet losing on credit.', name: 'Banks', small: 'Lenders and dealers', v: 'mix',
      ch: ['War pushes up inflation', 'Higher yields, a Fed hike, more volatility', 'Net interest income and trading up; bond-portfolio losses; credit risk', 'Big trading banks helped; banks with long bonds or weak borrowers hurt'],
      up: ['Wider lending margins at higher rates', 'Trading revenue from volatility', 'Steeper yield curve'],
      dn: ['Unrealised losses as the 10-year hit a 24-year high', 'Deposit costs rise', 'Loan losses if growth slows; sanctions compliance'],
      now: F('The Fed raised rates on 16 Sep to 3.75–4%; the 10-year reached 5.35% on 7 Oct.', 'fb'),
      a: 'Banks win from the rate channel and lose from the credit channel. So far it is all rates: no credit stress has appeared.',
      w: 'High-yield spreads and regional-bank deposit flows.' },
    { key: 'industrial', head: 'Split by what a company uses, not what it makes.', name: 'Industrials', small: 'Machinery, transport, building', v: 'mix',
      ch: ['War and sanctions', 'Energy and metal costs; supply-chain delays', 'Cost inflation; orders for defense, grid and reshored plants', 'Defense-adjacent and energy-equipment makers gain; energy-heavy users lose'],
      up: ['Defense and energy-infrastructure orders', 'Reshoring and supply-chain redundancy spending'],
      dn: ['Input costs: energy, freight, chemicals', 'Higher borrowing costs for customers’ capex', 'Delays in parts from Asia'],
      now: F('Gulf energy sites, including Ras Tanura and Ras Laffan, were struck in March.', 'war'),
      a: 'A split sector: what a company makes matters less than what it uses. Pricing power decides who passes on costs.',
      w: 'Order backlogs versus margins in quarterly results.' },
    { key: 'tech', head: 'Hit through interest rates, not supply chains.', name: 'Technology', small: 'Software, internet, hardware', v: 'down',
      ch: ['War raises oil', 'Oil raises inflation and expectations', 'Higher real yields cut the value of far-off profits', 'Long-duration growth stocks fall, despite little direct exposure'],
      up: ['Little exposure to commodities', 'Pricing power and large cash balances', 'AI spending continues'],
      dn: ['Real yields: the 10-year TIPS yield rose from 1.90% to 2.94% this year', 'Data-centre power costs', 'Bond supply competing for capital'],
      now: F('Tech stocks lost about $1 trillion in value as oil reached $110 for the first time since May.', 'nbc'),
      a: 'Technology is hurt through the discount rate, not the supply chain. If a deal pulls oil down, tech is among the first to benefit.',
      w: 'The 10-year real yield.' },
    { key: 'agri', head: 'Fertilizer is the most likely next wave of food inflation.', name: 'Agriculture', small: 'Fertilizer, farmers, food', v: 'mix',
      ch: ['Hormuz closed', 'Urea, ammonia and sulphur trapped (about a third of seaborne fertilizer)', 'Urea $400 → $850 (Apr) → ~$453 (Jun); food prices follow in 3–6 months', 'Fertilizer makers outside the Gulf gain; farmers and food firms squeezed'],
      up: ['North American fertilizer producers', 'China resumed urea exports in June', 'Crop prices'],
      dn: ['Farm margins; less fertilizer, lower yields', 'Import-dependent poor countries', 'Diesel for machinery and transport'],
      now: F('About 34% of seaborne urea normally passes Hormuz; urea fell back near its pre-war price by June as shipping partly resumed.', 'fert'),
      a: 'The spring scare faded, but October’s re-closure arrives before 2027 planting. Fertilizer is the most likely second wave of food inflation.',
      w: 'Urea prices into winter and Chinese export policy.' },
    { key: 'chem', head: 'Feedstock geography picks the winner: U.S. gas-based producers over Europe and Asia.', name: 'Chemicals', small: 'Petrochemicals and specialty', v: 'mix',
      ch: ['Gulf petrochemical exports cut; Qatar LNG offline', 'Feedstock costs diverge by region; sulphur scarce', 'Margins move with each producer’s feedstock', 'U.S. ethane-based producers helped; Europe and Asia squeezed'],
      up: ['U.S. producers using cheap domestic gas and ethane', 'Gulf competitors offline'],
      dn: ['European and Asian naphtha and LNG costs', 'Sulphur shortage (40–45% of world exports come from the region)', 'Weaker industrial demand'],
      now: F('Ras Laffan, the world’s largest LNG export hub, has been offline since Iranian strikes on 19 Mar.', 'he'),
      a: 'Geography of feedstock decides the winner. The war widened the cost gap between U.S. and European producers.',
      w: 'European gas prices and Gulf plant restarts.' },
    { key: 'cmdty', head: 'Lost physical supply did the hedging; gold, which pays no interest, did not.', name: 'Commodities', small: 'Oil, LNG, fertilizer, gold', v: 'up',
      ch: ['War in the world’s energy corridor', 'Oil, LNG, urea, sulphur and helium supply cut', 'Prices up; inflation feeds through', 'Commodity producers and indexes gain; gold pulled both ways'],
      up: ['Physical supply losses', 'Inventories need up to two years to rebuild (Aramco)'],
      dn: ['Emergency stock releases', 'Demand destruction', 'High real yields and a firm dollar weigh on gold'],
      now: F('In March, stocks, bonds and gold all slumped together as the war raged.', 'cnn'),
      a: 'Gold is not a sure war hedge when real yields are rising: it pays no interest. Physical commodities with lost supply did the hedging in 2026.',
      w: 'Real yields for gold; Hormuz flows for energy.' }
  ];

  // ---------- Iran / Middle East channels ----------
  var CHAN = [
    { key: 'oil', head: 'Oil has round-tripped twice; it now follows the tanker count, not the battlefield.', name: 'Oil', read: '$' + NOW.brent.toFixed(0) + ' Brent', rc: C.RED,
      facts: [
        F('Brent: $72.48 the day before the war (27 Feb); a $118.03 peak close (29 Apr); $73.74 as tankers moved (24 Jun); $109.86 on 16 Oct, the highest since May.', 'oilc'),
        F('Hormuz flows: 11.6m barrels a day in the week to 13 Oct, against a 17.2m baseline. The EIA expects a $105 fourth-quarter average.', 'ff'),
        F('Brent eased to about $108 on 19 Oct after the U.S. waived new Russia sanctions.', 'st')],
      up: ['Lost Gulf supply and depleted inventories', 'Attacks on the Saudi bypass (a missile aimed at Yanbu was intercepted last week)', 'Ukrainian strikes on Russian refineries'],
      dn: ['G7 pledge of up to 100m barrels; IEA diesel release; U.S. SPR exchange', 'Sanction waivers on Russian oil', 'Demand destruction', 'Deal headlines: the 8 Apr ceasefire cut Brent 13% in a day'],
      a: 'War did not mean a straight line up. Oil has round-tripped twice, from $118 to $74 and back to $108, because diplomacy, emergency stocks and bypass routes fought the supply loss. The price now tracks the daily tanker count more than the battlefield.' },
    { key: 'hormuz', head: 'Workarounds rebuilt the flows over the summer; October\u2019s attacks are choking them again.', name: 'Strait of Hormuz', short: 'Hormuz', read: NOW.transits + ' transits vs ' + NOW.base, rc: C.RED,
      facts: [
        F('IMF PortWatch counted 2 transits on 11 Oct, against a pre-crisis baseline of 85 a day. About a fifth of world oil consumption passed the strait before the war.', 'st'),
        F('Iran requires ships to seek its permission to cross; the U.S. keeps a counter-blockade of Iranian oil exports. Kpler counted 20.8m barrels through the strait on 8 Oct but only 2.9m on 11 Oct.', 'aj18'),
        F('By late September Middle East crude exports were back above pre-war levels, with about 40% of exports bypassing the strait by pipeline and ship-to-ship shuttles.', 'aj6')],
      up: ['Bypass pipelines (Saudi East-West to Yanbu)', 'Shuttle tankers and U.S. escorts', 'Iran’s stated seven-day reopening plan'],
      dn: ['Mines and drone attacks', 'Iraqi militia strikes on the bypass pipeline in September', 'Iran escalating against the U.S. blockade and new sanctions'],
      a: 'The strait is a valve, not a switch. Flows recovered over the summer through workarounds, then fell again in October. The market is pricing how much oil can get around the strait, not just through it.' },
    { key: 'ship', head: 'Freight and insurance add a cost that the Brent price doesn\u2019t show.', name: 'Shipping', read: '3–10% of hull', rc: C.RED,
      facts: [
        F('War-risk insurance was about 0.25% of hull value before the war and 3–10% by mid-July: $3m–$10m for a $100m tanker.', 'ins'),
        F('Six vessels were attacked in or near the strait on 11 Oct, the most in one day since the war began. Iran says two tankers hit mines on 18 Oct; no maritime authority has confirmed it.', 'aj18'),
        F('About 6,000 sailors are stranded near the strait.', 'st')],
      up: ['Tanker day rates from longer, slower voyages', 'Tight tanker supply: shuttles tie up ships'],
      dn: ['Physical risk to hulls and crews', 'Container lines diverted; Houthi attacks in the Gulf of Aden', 'Rates would collapse with a deal'],
      a: 'Higher freight and insurance add a cost layer that does not show up in the crude price, so delivered energy in Asia and Europe costs more than Brent alone suggests.' },
    { key: 'def', head: 'The one clear revenue winner, but orders arrive slowly and the shares move first.', name: 'Defense', read: '$1.5tn request', rc: C.BLUE,
      facts: [
        F('The administration requested $1.5 trillion for the Pentagon for next year; the war had cost about $113bn by June.', 'war'),
        F('In August the Pentagon pressed contractors to speed up weapons production over stockpile concerns.', 'pent'),
        F('Defense shares jumped on the war’s first trading day (Northrop +6%, RTX +4.7%).', 'def')],
      up: ['Replenishing interceptors and munitions', 'Allied and Gulf demand'],
      dn: ['A settlement reduces future demand', 'Inflation squeezes fixed-price contracts', 'Production capacity limits'],
      a: 'Defense is the one channel where war is plainly positive for revenue, but the earnings arrive slowly and the shares move early.' },
    { key: 'infl', head: 'A supply shock: headline 3.7% against core 2.6%, and expectations are starting to follow.', name: 'Inflation', read: NOW.cpi + '% CPI', rc: C.RED,
      facts: [
        F('U.S. consumer prices rose 0.6% in September and 3.7% over the year (August: 3.4%). Gasoline was up 34.2% and energy 20.4%; core inflation was 2.6%.', 'cpi'),
        F('Gasoline was over half of September’s monthly increase. Year-ahead inflation expectations (University of Michigan) reached 4.6% in September.', 'fb')],
      up: ['Energy pass-through to goods and services', 'Fertilizer to food with a 3–6 month lag', 'Airfares (+22.4%) and freight'],
      dn: ['Core inflation still moderate at 2.6%', 'Demand destruction', 'Fed tightening'],
      a: 'A supply shock: headline far above core. The risk is the 1970s pattern, where expectations follow the headline; 4.6% expectations are the warning sign.' },
    { key: 'ust', head: 'No safe haven this time: yields rose because inflation beat the flight to safety.', name: 'Treasury safe-haven flows', short: 'Treasuries', read: NOW.y10.toFixed(2) + '% 10-year', rc: C.RED,
      facts: [
        F('The 10-year yield rose above 5.35% on 7 Oct, its highest since 2002; the 30-year reached 5.70%. Most of the rise was in real yields: the 10-year TIPS yield went from 1.90% to 2.94% this year.', 'fb'),
        F('The Fed raised rates on 16 Sep. On 19 Oct the 10-year was 5.09%, and futures gave over 85% odds of no change at the 27–28 Oct meeting.', 'inv'),
        F('In the week to 16 Oct the 10-year fell from 5.24% to 5.10% as chip stocks slid: a haven bid on a bad week.', 'bt'),
        F('The CBO projects a $1.9 trillion deficit for fiscal 2026 (5.8% of GDP); yields also rose in Japan, the UK and France.', 'fb')],
      up: ['Inflation from energy', 'Fed hikes', 'Term premium: deficits, war costs, heavy bond supply', 'A global bond sell-off'],
      dn: ['Flight to safety on escalation days', 'Growth fears if oil destroys demand', 'Fading odds of more Fed hikes'],
      a: 'The haven bid is real but brief: it shows up on frightening days and loses to inflation over weeks. In 2026, as in 2022, war has meant higher yields, not lower ones. It flips only if the war threatens growth more than prices.' },
    { key: 'air', head: 'The mirror image of oil, and the likeliest to rally hardest on a deal.', name: 'Airlines', read: '+22.4% fares', rc: C.RED,
      facts: [
        F('IATA cut its 2026 industry profit forecast to about $23bn from $41bn, with the fuel bill rising to about $350bn from $252bn.', 'iata'),
        F('Gulf airspace almost fully closed at the start of the war, hitting Emirates, Qatar Airways and Etihad.', 'iata'),
        F('U.S. airline shares rose on 24 Jun as oil fell back to pre-war levels.', 'gv')],
      up: ['Fare increases (U.S. airfares +22.4% in a year)', 'Capacity discipline'],
      dn: ['Jet fuel', 'Rerouting around closed airspace', 'Demand at higher fares'],
      a: 'Airlines are the mirror image of oil. They are the sector most likely to rally hardest on a credible deal.' }
  ];

  // ---------- Event types for the framework ----------
  var EVT = [
    { k: 'e1', h: 'War near a chokepoint', t: 'Hormuz 2026, Gulf War 1990', ch: 'Oil, LNG, fertilizer, freight', m: 'Headline inflation; producer windfalls', s: 'Energy, tankers, defense up; airlines, chemicals, consumers down',
      a: 'The biggest and fastest channel, but also the most reversible: bypass routes, emergency stocks and diplomacy push back within weeks.' },
    { k: 'e2', h: 'War inside a commodity exporter', t: 'Russia–Ukraine 2022', ch: 'Gas, wheat, metals, fertilizer', m: 'Food and energy inflation; rate hikes', s: 'European industry hurt; U.S. LNG and fertilizer helped',
      a: 'Lasts longer than a chokepoint shock because the supply itself is gone, not just its route.' },
    { k: 'e3', h: 'Sanctions and export controls', t: 'Chip controls on China', ch: 'Technology, components, finance', m: 'Lost revenue; costly duplicate supply chains', s: 'Chip-equipment makers hurt; domestic substitutes helped',
      a: 'Slow-moving and sticky: controls rarely reverse, so markets price them as permanent.' },
    { k: 'e4', h: 'Tariffs and trade war', t: 'April 2025', ch: 'Import prices, supply-chain rerouting', m: 'Goods inflation; margin squeeze', s: 'Importers and retailers hurt; domestic producers helped',
      a: 'Policy-made, so policy can reverse it: the April 2025 fall reversed within three months.' },
    { k: 'e5', h: 'Blockade of a manufacturing hub', t: 'A Taiwan Strait scenario', ch: 'Advanced chips, electronics, shipping', m: 'Global goods shortages; growth shock', s: 'Almost everything hurt; defense helped',
      a: 'Has not happened. Unlike oil there is no strategic reserve of advanced chips, which is why it would be the largest shock in this table.', scen: true },
    { k: 'e6', h: 'Cyber or infrastructure attack', t: 'Pipelines, grids, ports', ch: 'Regional energy and logistics outages', m: 'Short, local price spikes', s: 'Utilities and insurers exposed; cyber-security helped',
      a: 'Usually short-lived for markets unless it damages physical assets that take months to repair.' }
  ];

  // ---------- Tabs ----------
  function takeaway() {
    var nUp = SECT.filter(function (s) { return s.v === 'up'; }).length, nDn = SECT.filter(function (s) { return s.v === 'down'; }).length;
    var head = 'Brent is ' + col('$' + NOW.brent.toFixed(0), C.RED) + ', half again its pre-war $72, and ' + col(NOW.transits + ' ships', C.RED) + ' crossed Hormuz on 11 Oct against 85 a day before the war. Yet the 10-year yield is ' + col(NOW.y10.toFixed(1) + '%', C.RED) + ', near a 24-year high: this war reaches markets as an ' + col('inflation shock', C.RED) + ', not a flight to safety.';
    return '<div class="tk"><p class="tk-head">' + head + '</p>' +
      '<p class="tk-watch"><b>Watch</b>The bypass. A missile aimed at Saudi Arabia’s Red Sea port of Yanbu was intercepted last week; if the Gulf’s main route around Hormuz is hit, the escalation scenario begins.</p>' +
      '<div class="ov">' +
      K.card({ tab: 'iran', head: 'Iran now', dial: { v: NOW.brent, min: 50, max: 150, color: C.RED, notch: NOW.prewar, ends: ['$50', '$150'], aria: 'Brent $' + NOW.brent }, value: '$' + NOW.brent.toFixed(0), color: C.RED, label: 'Brent crude', note: 'Gold notch: $72 before the war.' }) +
      K.card({ tab: 'framework', head: 'Yields', dial: { v: NOW.y10, min: 3, max: 6, color: C.RED, notch: 4.2, ends: ['3%', '6%'], aria: '10-year yield ' + NOW.y10 + '%' }, value: NOW.y10.toFixed(2) + '%', color: C.RED, label: '10-year yield', note: 'Up, not down, in a war. Gold notch: start of 2026.' }) +
      K.card({ tab: 'sectors', head: 'Sectors', value: col(nUp, C.BLUE) + ' · ' + col(nDn, C.RED) + ' · ' + col(SECT.length - nUp - nDn, '#F2D27A'), color: '#EDE8DC', label: col('Helped', C.BLUE) + ' · ' + col('hurt', C.RED) + ' · ' + col('mixed', '#F2D27A'), note: 'Energy, defense and commodities gain; airlines and tech lose; the rest split by feedstock and funding.' }) +
      K.card({ tab: 'scenarios', head: 'Scenarios', dial: { v: NOW.transits, min: 0, max: 100, color: C.RED, notch: NOW.base, ends: ['0', '100'], aria: NOW.transits + ' transits a day' }, value: NOW.transits + ' / day', color: C.RED, label: 'Hormuz transits', note: 'The number that decides which scenario plays out. Gold notch: 85 before the war.' }) +
      '</div></div>';
  }
  // ---------- How it works: one panel at a time ----------
  function fwPanel(k) {
    if (k === 'types') {
      return '<div class="split narrow"><div class="col evlist">' + EVT.map(function (e) {
          return '<button class="pkc" data-pick="ev:' + e.k + '" aria-pressed="false"><span>' + e.h + '<small>' + e.t + '</small></span></button>';
        }).join('') + '</div>' + K.picker('ev', 'e1', evPanel) + '</div>';
    }
    return chain('A war, blockade, sanction or tariff', 'What physically stops moving: oil, gas, fertilizer, chips, ships', 'Who pays more and who earns more; how central banks respond', 'Which industries gain or lose, and by how much') +
      '<div class="cards three">' +
      cd('', 'Oil: forces in tension', '<p><span style="color:' + C.BLUE + '" class="nb">Up:</span> supply lost, inventories low, routes blocked.</p><p><span style="color:' + C.RED + '" class="nb">Down:</span> spare capacity, emergency stocks, bypass pipelines, demand destruction, diplomacy.</p>' +
        A('“War = oil up” holds only while the lost supply outruns everything that replaces it.'), ' tight') +
      cd('', 'Treasury yields: forces in tension', '<p><span style="color:' + C.BLUE + '" class="nb">Down:</span> flight to safety, growth fears, rate-cut hopes.</p><p><span style="color:' + C.RED + '" class="nb">Up:</span> energy inflation, Fed hikes, deficits and war spending, term premium.</p>' +
        A('An energy war raises inflation, so yields can rise even as people seek safety.'), ' tight') +
      cd('', 'History says it reverses', F('17 Jan 1991: the Gulf War air campaign began; oil fell about a third in a day and stocks rallied.') +
        F('8 Apr 2026: the ceasefire gave oil its biggest one-day drop since April 2020.', 'oilc') +
        F('2022 and 2026: Treasury yields rose during the war.', 'fb'), ' tight') + '</div>';
  }
  function evPanel(k) {
    var e = EVT.filter(function (x) { return x.k === k; })[0];
    return '<div class="pnl-h"><h3>' + e.h + '</h3><small>' + (e.scen ? tag('s') : '') + 'Example: ' + e.t + '</small></div>' +
      '<div class="vchain" style="margin-bottom:10px">' + [['Event', e.h + ' (' + e.t + ')'], ['Supply chain', e.ch], ['Inflation · earnings', e.m], ['Sector', e.s]].map(function (x) {
        return '<div class="ch"><small>' + x[0] + '</small>' + x[1] + '</div>'; }).join('') + '</div>' +
      cd('', e.scen ? 'Scenario' : 'Point75 reading', e.scen ? S(e.a) : A(e.a), ' tight');
  }
  function framework() {
    return K.chips('fw', [{ key: 'chain', label: 'The chain and its competing forces' }, { key: 'types', label: 'Six kinds of event', read: '6', color: '#F2D27A' }]) +
      K.picker('fw', 'chain', fwPanel);
  }

  // ---------- Sectors: the fan is the selector ----------
  var RANK = ['airlines', 'tech', 'semis', 'industrial', 'chem', 'agri', 'banks', 'shipping', 'cmdty', 'defense', 'energy'];
  function fan() {
    return K.slot(function (el, W) {
      var phone = W < 420, R = Math.min(W / 2 - (phone ? 62 : 104), 145), H = R + 56, cx = W / 2, cy = H - 30, n = RANK.length, cur = K.picked('sec');
      var s = '<defs><linearGradient id="p75fan" x1="0" x2="1"><stop offset="0" stop-color="#FF6640"/><stop offset=".5" stop-color="#F2D27A"/><stop offset="1" stop-color="#1FC8FF"/></linearGradient></defs>';
      var arc = function (r) { return 'M' + (cx - r) + ',' + cy + ' A' + r + ',' + r + ' 0 0 1 ' + (cx + r) + ',' + cy; };
      s += '<path d="' + arc(R * .42) + '" fill="none" stroke="url(#p75fan)" stroke-width="10" stroke-linecap="round" opacity=".9"/>';
      s += '<text x="' + (cx - R * .42) + '" y="' + (cy + 22) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#FF6640" font-family="Manrope,sans-serif">HURT</text>' +
        '<text x="' + (cx + R * .42) + '" y="' + (cy + 22) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#1FC8FF" font-family="Manrope,sans-serif">HELPED</text>' +
        '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="#C2BCAF" font-family="Manrope,sans-serif">Tap a sector</text>';
      RANK.forEach(function (k, i) {
        var sec = SECT.filter(function (x) { return x.key === k; })[0], v = V[sec.v], on = k === cur;
        var ang = Math.PI - (i + .5) / n * Math.PI, c = Math.cos(ang), sn = Math.sin(ang);
        var x0 = cx + c * R * .5, y0 = cy - sn * R * .5, x1 = cx + c * R, y1 = cy - sn * R;
        var anc = c < -.25 ? 'end' : c > .25 ? 'start' : 'middle', lx = cx + c * (R + 11), ly = cy - sn * (R + 11);
        var name = phone && sec.name === 'Semiconductors' ? 'Semis' : phone && sec.name === 'Commodities' ? 'Cmdty' : phone && sec.name === 'Agriculture' ? 'Agri' : sec.name;
        s += '<g class="fan-s' + (on ? ' on' : '') + '" data-pick="sec:' + k + '" tabindex="0" role="button" aria-label="' + sec.name + ': ' + v[0] + '" style="cursor:pointer">' +
          '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="' + v[1] + '" stroke-width="' + (on ? 3 : 2) + '" stroke-dasharray="' + (on ? '0' : '2 4') + '"/>' +
          '<circle class="dot" cx="' + x1 + '" cy="' + y1 + '" r="' + (on ? 9 : 7) + '" fill="' + v[1] + '" stroke="' + (on ? '#fff' : '#17181B') + '" stroke-width="' + (on ? 3 : 2) + '"/>' +
          '<text x="' + lx + '" y="' + ly + '" dy="' + (sn > .9 ? '-.45em' : '.35em') + '" text-anchor="' + anc + '" font-size="' + (phone ? 12 : 13.5) + '" font-weight="800" fill="' + (on ? '#FFD23F' : '#EDE8DC') + '" font-family="Manrope,sans-serif">' + name + '</text>' +
          '<circle cx="' + x1 + '" cy="' + y1 + '" r="22" fill="transparent"/></g>';
      });
      el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="group" aria-label="Sectors ordered from most hurt to most helped by the Iran war">' + s + '</svg>';
    }, 'fan');
  }
  function secOf(k) { return SECT.filter(function (x) { return x.key === k; })[0]; }
  function secPanel(k) {
    var s = secOf(k), v = V[s.v];
    return '<div class="pnl-h"><h3>' + s.name + '</h3><span class="pill" style="color:' + v[1] + '">' + v[0] + '</span><small>' + s.small + '</small></div>' +
      K.head(s.head) +
      '<div class="vchain">' + [['Event', s.ch[0]], ['Supply chain', s.ch[1]], ['Inflation · earnings', s.ch[2]], ['Sector', s.ch[3]]].map(function (x) {
        return '<div class="ch"><small>' + x[0] + '</small>' + x[1] + '</div>'; }).join('') + '</div>' +
      K.more('Forces on both sides, our reading and the latest fact', forces('Helps the sector', s.up, 'Hurts the sector', s.dn) +
        '<div style="height:10px"></div>' + cd('', 'Point75 reading', A(s.a) + s.now, ' tight'));
  }
  function secRead(k) {
    var s = secOf(k);
    return cd('', 'Watch', '<p>' + s.w + '</p>', ' tight');
  }
  function sectors() {
    return '<div class="split narrow secsplit">' +
      '<div class="col"><div class="cd sec-fan" style="padding:2px 4px 0">' + fan() + '</div><div class="sec-read">' + K.picker('sec', 'energy', secRead, 'read') + '</div></div>' +
      '<div class="col sec-detail">' + K.picker('sec', 'energy', secPanel) + '</div></div>';
  }

  // ---------- Iran now: a chip per channel ----------
  var TL = [['28 Feb', 'U.S. and Israeli strikes on Iran begin; Supreme Leader Ali Khamenei killed'], ['Early Mar', 'Shipping through Hormuz stalls; Gulf energy sites struck'],
    ['8 Apr', 'Two-week ceasefire; talks fail and the U.S. blockades Iranian ports (13 Apr)'], ['17 Jun', 'Memorandum to end the war; tankers transit, Brent falls to $74 (24 Jun)'],
    ['8 Jul', 'Ceasefire collapses after Iran attacks ships in the strait'], ['Sep', 'Gulf exports recover through bypass routes; the Fed hikes (16 Sep)'],
    ['Oct', 'Attacks surge (6 ships on 11 Oct); Brent $110 (16 Oct); Trump says he expects a deal after the 3 Nov midterms']];
  function irPanel(k) {
    if (k === 'tl') {
      return K.head('Spring was a supply scare; since July this war has been an inflation and interest-rate story.') + cd('', 'The war since 28 February 2026', '<div class="tl2">' + TL.map(function (r) { return '<div><b>' + r[0] + '</b>' + r[1] + '</div>'; }).join('') + '</div><p style="margin-top:6px">' + tag('f') + src('war') + ' ' + src('aj18') + '</p>', ' tight');
    }
    var c = CHAN.filter(function (x) { return x.key === k; })[0];
    var upH = c.key === 'ust' ? 'Pushes yields up' : c.key === 'hormuz' ? 'Helps flows' : c.key === 'infl' ? 'Pushes inflation up' : 'Pushes up / helps';
    var dnH = c.key === 'ust' ? 'Pushes yields down' : c.key === 'hormuz' ? 'Chokes flows' : c.key === 'infl' ? 'Holds inflation down' : 'Pushes down / hurts';
    var up = c.up, dn = c.dn;
    return K.head(c.head) + cd('', 'Facts<span class="nb" style="color:' + c.rc + ';letter-spacing:.02em;text-transform:none;font-size:14px;margin-left:10px">' + c.read + '</span>', c.facts.join(''), ' tight') +
      K.more('Forces pushing both ways, and our full reading', '<div class="tri ir-more">' +
      cd('', '<span style="color:' + (c.key === 'ust' || c.key === 'infl' ? C.RED : C.BLUE) + '" class="nb">' + upH + '</span>', '<ul>' + up.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>', ' tight') +
      cd('', '<span style="color:' + (c.key === 'ust' || c.key === 'infl' ? C.BLUE : C.RED) + '" class="nb">' + dnH + '</span>', '<ul>' + dn.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>', ' tight') +
      cd('', 'Point75 reading', A(c.a), ' tight') + '</div>');
  }
  function iran() {
    return K.chips('ir', [{ key: 'tl', label: 'Timeline' }].concat(CHAN.map(function (c) { return { key: c.key, label: c.short || c.name }; }))) +
      K.picker('ir', 'oil', function (k) {
        var c = CHAN.filter(function (x) { return x.key === k; })[0];
        return irPanel(k);
      });
  }

  // ---------- Scenarios ----------
  var SC = [
    { key: 'deal', head: 'Oil falls fast, yields fall slowly; airlines and tech lead.', name: 'A. Deal and reopening', small: 'Talks after the 3 Nov midterms; Iran’s seven-day reopening plan', read: 'Brent $75–90', rc: C.BLUE,
      oil: 'Falls fast toward $75–90, as it did in June ($118 to $74 in eight weeks). A floor above pre-war: inventories need up to two years to rebuild.',
      rates: 'Headline inflation eases and odds of more Fed hikes fade. Yields fall less than oil, because deficits and the term premium remain.',
      win: 'Airlines, chemicals in Europe and Asia, long-duration tech, consumers', lose: 'Energy, tankers, some defense momentum',
      sign: 'Transits climbing back toward 85 a day; war-risk premiums falling; mines cleared' },
    { key: 'grind', head: 'Today\u2019s pattern holds: oil swings between $95 and $115 and the Fed stays hawkish.', name: 'B. Grinding standoff', small: 'Today’s pattern continues: partial flows, attacks, blockade', read: 'Brent $95–115', rc: '#F2D27A',
      oil: 'Swings with daily tanker counts and emergency releases, roughly where it has traded since July.',
      rates: 'Inflation sticky near 3.5–4%; the Fed holds or hikes again; the 10-year stays around 5–5.5%.',
      win: 'U.S. energy, tankers outside the Gulf, North American fertilizer, defense', lose: 'Airlines, rate-sensitive tech, import-heavy industrials',
      sign: 'Flows stuck near 60–70% of baseline; no talks; monthly CPI above 0.4%' },
    { key: 'esc', head: 'The forces flip: growth fear can pull yields down while oil spikes.', name: 'C. Escalation', small: 'The bypass (Yanbu, East-West pipeline) or Gulf export terminals hit', read: 'Brent $130+', rc: C.RED,
      oil: 'Spikes above $130; Rystad has modelled $135 if talks collapse. Emergency stocks cannot replace the bypass.',
      rates: 'The forces flip: growth fear can outweigh inflation, so yields may fall even as prices rise. The Fed faces the 1970s dilemma.',
      win: 'Energy producers outside the Gulf, defense', lose: 'Nearly everything else; a crash becomes possible (see Market Crashes)',
      sign: 'Strikes on Yanbu or Ras Tanura; Houthi attacks widening in the Red Sea; Gulf states drawn in further' }
  ];
  function scPanel(k) {
    var s = SC.filter(function (x) { return x.key === k; })[0];
    return '<div class="pnl-h"><h3>' + s.name + '</h3><small>' + s.small + '</small></div>' + K.head(s.head) +
      '<div class="cards">' + cd('', 'Oil', S(s.oil), ' tight') + cd('', 'Inflation and yields', S(s.rates), ' tight') +
      cd('', 'Sectors', '<p><span style="color:' + C.BLUE + '" class="nb">Gain:</span> ' + s.win + '</p><p><span style="color:' + C.RED + '" class="nb">Lose:</span> ' + s.lose + '</p>', ' tight') +
      cd('', 'Signposts', '<p>' + s.sign + '</p>', ' tight') + '</div>' +
      '<p class="sub" style="margin:10px 0 0">' + tag('f') + 'Reference points: the EIA expects Brent to average $105 in the fourth quarter ' + src('ff') + '; Brent has closed between $73.74 and $118.03 since the war began ' + src('oilc') + '.</p>';
  }
  function scenarios() {
    return '<p class="sub" style="margin:0 0 8px">' + tag('s') + 'Frames for thinking, not forecasts or probabilities. Ranges are illustrative.</p>' +
      K.chips('sc', SC.map(function (s) { return { key: s.key, label: s.name, read: s.read, color: s.rc }; })) + K.picker('sc', 'grind', scPanel);
  }

  var FOOT = 'Sources: ' + Object.keys(SRC).map(function (k) { return '<a href="' + SRC[k][1] + '" target="_blank" rel="noopener">' + SRC[k][0] + '</a>'; }).join('; ') +
    '. 1991 Gulf War market facts from standard market histories. Facts as of 19 Oct 2026; sector verdicts and readings are Point75 analysis; scenarios are illustrative, not forecasts. For education, not financial advice. © ' + new Date().getFullYear() + ' Rahul Saxena. All rights reserved.';

  // mount(el, opts): render into el. opts.embed for a host site; opts.stickyHeader: selector of its sticky header.

  // The page needs kit v3 or newer. A browser tab opened before an update can hold an older cached kit,
  // so load a fresh one first instead of failing on a missing function.
  var NEED_KIT = 4;
  function bind() { K = window.P75KIT; C = K.C; tag = K.tag; col = K.col; cd = K.cd; }
  function withKit(go) {
    if (window.P75KIT && (window.P75KIT.v || 0) >= NEED_KIT) { bind(); return go(); }
    var s = document.createElement('script');
    s.src = ((window.P75KIT && window.P75KIT.src) || '/macro/oneshot.js').split('?')[0] + '?kit=' + NEED_KIT + '&t=' + Date.now();
    s.onload = function () { bind(); go(); };
    document.head.appendChild(s);
  }
  window.P75GEO = {
    mount: function (el, opts) {
      opts = opts || {};
      var h = { dead: false, inner: null, destroy: function () { h.dead = true; if (h.inner) h.inner.destroy(); } };
      withKit(function () { if (h.dead) return; h.inner = K.mount({
        host: el, embed: !!opts.embed, stickyHeader: opts.stickyHeader,
        cls: 'p75geo', eyebrow: opts.eyebrow || 'Kinetics · Geopolitical Risk', title: opts.title || 'Geopolitical Risk',
        asof: 'Updated <b>19 Oct 2026</b>',
        lede: 'How a war, blockade, sanction or tariff travels from the event to commodities and supply chains, then to inflation and earnings, then to sectors. Every claim is marked ' + K.tagFull('f') + ', ' + K.tagFull('a') + ' or ' + K.tagFull('s') + '.',
        strip: [['Brent', '$' + NOW.brent.toFixed(0), C.RED], ['Hormuz', NOW.transits + '/day', C.RED], ['10-year', NOW.y10.toFixed(2) + '%', C.RED]],
        tabs: [
          { key: 'takeaway', tab: 'Takeaway', html: takeaway },
          { key: 'framework', tab: 'How it works', short: 'Chain', html: framework },
          { key: 'sectors', tab: 'Sectors', html: sectors },
          { key: 'iran', tab: 'Iran now', short: 'Iran', html: iran },
          { key: 'scenarios', tab: 'Scenarios', html: scenarios }
        ],
        foot: FOOT
      }); });
      return h;
    }
  };
})();
