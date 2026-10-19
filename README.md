# geopolitical-risk

Two Point75 pages in the One Shot layout (see `ONE-SHOT.md` in `point75-site`). Static HTML and JavaScript with no build step; data is embedded in each page module.

| Page | Path | What it shows |
|---|---|---|
| Geopolitical Risk | `/geopolitical-risk/` | How geopolitical events reach sectors: event → commodity / supply chain / trade → inflation / earnings → sector. Covers 11 sectors, six kinds of event, the 2026 Iran war through seven channels (oil, Hormuz, shipping, defense, inflation, Treasury safe-haven flows, airlines), and three scenarios. |
| Market Crashes | `/market-crashes/` | A crash database (1929, 1973–74, 1987, 1990, 2000–02, 2007–09, 2020, 2022, 2025, plus the 2026 war dip) with peak, trough, drawdown, duration, recovery, catalyst, rates, credit and leverage. Visualization 1 is a crater field: depth is the drawdown, the left wall is the fall and the right wall is the recovery. |

## Labels

Every claim on the geopolitical page carries one of three tags:

- **Fact**: sourced and dated, with a link.
- **Point75 analysis**: our reading of the facts, including each sector's verdict.
- **Scenario**: what could happen. These are frames for thinking, not forecasts.

The page deliberately does not assume "war = oil up" or "war = Treasury yields down". Each channel shows the forces pushing both ways.

## Files

```
kit/oneshot.js                        Shared One Shot shell: header, fold-away top, Takeaway-first tabs,
                                      one-open sections with an info screen, dials, Fact/Analysis/Scenario tags
geopolitical-risk/geopolitical.js     Page module (data + content)
market-crashes/crashes.js             Page module (data + crater chart)
*/index.html                          Standalone wrappers (GitHub Pages ready)
```

To move a page into `point75-site`, load `kit/oneshot.js` and the page module from `p75.js`. Each module mounts into `<main>`.

## Updating

- Live readings sit in the `NOW` object at the top of each module: Brent, Hormuz transits and the 10-year yield in `geopolitical.js`; the S&P 500 level and margin debt in `crashes.js`.
- Crash data lives in the `CR` array. Drawdown, durations and medians are computed from the dates and levels.

Index levels are closing prices for the price index, in nominal terms. The 1929 entry uses the Dow Jones Industrial Average. The 2026 war-dip levels are approximate, derived from reported percentages.

For education, not financial advice. © Rahul Saxena. All rights reserved.
