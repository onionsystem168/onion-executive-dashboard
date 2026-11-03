'use strict';

/* ============================================================================
 * ONiON Executive Dashboard
 *
 *  DATA          Every figure on the page. Week-series metrics are arrays with
 *                one slot per entry in DATA.weeks (null = not reported).
 *  DATA_SOURCES  Published Google Sheets (CSV) merged over DATA on load.
 *  STRINGS       UI labels per language. Add a `km` block for Khmer.
 * ========================================================================== */

/* ------------------------------------------------------------------ DATA */

const DATA = {
    meta: {
        company: 'ONiON Mobility',
        report: 'Weekly ONiON Update',
        // Corrections made while transcribing the source report.
        notes: [
            'X-series cost of goods W44 reads "3,0045.18" in the source; entered as 30,045.18 (matches the reported gross margin of 7,814.82).',
            'T-series accessory cost of goods W44 is shown without brackets in the source; treated as a cost (matches the reported gross margin of 702.91).',
            'Week 44 is labelled "26~01/Oct" (Finance) and "20-02 Nov" (Operations, Rental) in the source; both treated as 26 Oct – 01 Nov.',
            'X-series units W44: Finance reports 55, the sales team table reports 63. Headline numbers use the Finance figure.',
            'T-series salespeople "Sreynit" and "Tekeang" are merged with "Kong Sreynit" and "Techeang" from the X-series table.',
        ],
    },

    weeks: [
        { id: 'W41', label: '05–11 Oct', reportDate: null, reportUrl: null },
        { id: 'W42', label: '12–18 Oct', reportDate: null, reportUrl: null },
        { id: 'W43', label: '19–25 Oct', reportDate: null, reportUrl: null },
        {
            id: 'W44', label: '26 Oct–01 Nov', reportDate: '2026-11-02',
            reportUrl: 'https://docs.google.com/document/d/11tf4HTgPSW2VhOJ8xdzJUvufe9kFPLBQ0ftcgMsvWJk/edit?usp=sharing',
        },
    ],

    finance: {
        // USD. Cost of goods is stored as a positive number; lines without COGS omit it.
        pillars: {
            xSales: { cash: [16503.00, 85305.00, 28436.00, 41646.00], revenue: [15002.73, 77550.00, 25850.91, 37860.00], cogs: [13268.27, 32716.29, 17224.09, 30045.18] },
            tSales: { cash: [5699.00, 0, 11173.00, 5409.00], revenue: [5180.91, 0, 10157.27, 4917.27], cogs: [4400.74, 0, 9200.84, 4400.74] },
            tSwap: { cash: [6110.03, 5767.84, 6043.55, 5909.61], revenue: [5554.57, 5243.49, 5494.14, 5372.37], swaps: [2940, 2831, 2932, 2865] },
            tAcc: { cash: [1312.10, 2860.10, 1813.30, 1969.20], revenue: [1192.82, 2600.09, 1648.45, 1790.18], cogs: [651.52, 1579.47, 1073.32, 1087.27] },
            xAcc: { cash: [1386.30, 1090.40, 1541.02, 1109.30], revenue: [1260.27, 991.27, 1400.93, 1008.45], cogs: [823.55, 655.41, 1018.41, 682.44] },
            xSwap: { cash: [10, 8, 16, 6], revenue: [9.09, 7.27, 14.55, 5.45], swaps: [5, 4, 8, 3] },
        },
        warranty: {
            t: { cost: [636.52, 575.79, 470.04, 918.36], vins: [22, 15, 16, 18] },
            x: { cost: [617.03, 464.72, 644.97, 923.21], vins: [10, 10, 7, 16] },
        },
    },

    priorities: {
        asOf: '2026-11-02',
        items: [
            { level: 'high', area: 'Finance', title: 'T1 inventory write-down', detail: 'T1 inventory valued at US$788K (factory + FE). Estimated US$180K write-down to hit the Nov 2026 P&L — proposed to Vincent / Sokkheng.' },
            { level: 'high', area: 'Finance', title: 'Budget 2027 sign-off', detail: 'Onion KH with Sokkheng / Kunpei before submission to Group Finance (due 28 Oct). Tada KH with Kosal once Sean confirms (due 29 Oct).', due: '2026-10-29' },
            { level: 'medium', area: 'Finance', title: 'Tax audit — 2nd round', detail: 'Requested documents submitted; inventory records for 2021–2023 still pending.' },
            { level: 'medium', area: 'Finance', title: 'External interim audit', detail: 'Audit has started; documents submitted except the sale agreement.' },
            { level: 'medium', area: 'Finance', title: 'Asset review after office move', detail: 'Identify items to write off, including renovation cost and the non-refundable deposit.' },
        ],
    },

    sales: {
        // Monthly vehicle sales goals
        targets: [
            { series: 'x', period: 'Oct 2026', actual: 264, target: 400 },
            { series: 't', period: 'Oct 2026', actual: 23, target: 40 },
        ],
        // Units sold per week (Finance)
        units: {
            x: { 'X1': [25, 20, 21, 34], 'X3': [2, 5, 5, 16], 'X3 Pro': [0, 40, 8, 5] },
            t: { 'T1C+': [1, 0, 2, 1], 'T1 (FA)': [0, 1, 0, 0], 'T1L (FA)': [0, 0, 1, 0] },
        },
        team: [
            { name: 'Techeang', channel: 'dealer', x: [null, null, 10, 15], t: [null, null, 0, 0] },
            { name: 'Sreynith', channel: 'indoor', x: [null, null, 6, 10], t: [null, null, 1, 1] },
            { name: 'Sreyleap', channel: 'indoor', x: [null, null, 3, 10], t: [null, null, 0, 1] },
            { name: 'Kanika', channel: 'indoor', x: [null, null, 6, 9], t: [null, null, 1, 0] },
            { name: 'Daly', channel: 'indoor', x: [null, null, 3, 8], t: [null, null, 1, 1] },
            { name: 'Kong Sreynit', channel: 'indoor', x: [null, null, 3, 5], t: [null, null, 1, 1] },
            { name: 'Sela', channel: 'indoor', x: [null, null, 6, 5], t: [null, null, 2, 1] },
            { name: 'Sokuntha', channel: 'indoor', x: [null, null, null, null], t: [null, null, 1, 2] },
            { name: 'Chungseng', channel: 'indoor', x: [null, null, 0, 1], t: [null, null, null, null] },
            { name: 'Visakha', channel: 'indoor', x: [null, null, 0, 0], t: [null, null, 0, 0] },
        ],
        xColours: {
            'X1 White': [null, null, 17, 21], 'X1 Tiffany': [null, null, 2, 4], 'X1 KDMV': [null, null, 0, 1],
            'X1 Chinese': [null, null, 0, 0], 'X1 Pink': [null, null, 1, 5], 'X1 Samot': [null, null, 0, 3],
            'X1 Sakura': [null, null, 1, 5], 'X3 Gray': [null, null, 0, 7], 'X3 White': [null, null, 7, 8],
            'X3 Blue': [null, null, 0, 0], 'X3 Black': [null, null, 1, 3], 'X3 Pro Black': [null, null, 1, 1],
            'X3 Pro White': [null, null, 7, 5], 'X3 Pro Blue': [null, null, 0, 0],
        },
        loans: {
            x: { 'Wing Bank': [null, null, 0, 0], 'AEON Bank': [null, null, 0, 0], 'DPSB': [null, null, 3, 3], 'ONiON': [null, null, 13, 5] },
            t: { 'Active People': [null, null, 0, 0], 'ONiON': [null, null, 9, 3] },
        },
        // CBU stock per location (from the Inventory section)
        stock: {
            asOf: '2026-11-02',
            locations: ['Factory', 'FE', 'Showroom'],
            x: { 'X1': [33, 4, 13], 'X3': [13, 0, 13], 'X3 Pro': [9, 0, 5] },
            t: { 'T1C+': [1, 4, 1], 'T1A+': [0, 1, 2], 'Reconditioned T1': [0, 0, 1], 'T1X6': [0, 1, 0] },
        },
    },

    operations: {
        tActive: [null, 418, 422, 429],
        xActive: [null, 33, 35, 37],
        tSwapRate: [null, 0.96, 0.99, 0.95], // swaps per vehicle per day
        stations: {
            'MEGA Station – Sen Sok': [null, 813, 861, 773],
            'BKK (Norodom Blvd)': [null, 542, 619, 654],
            'Olympic (St 310)': [null, 409, 371, 409],
            'Stung Meanchey': [null, 338, 332, 329],
            'VK Coffee CCV': [null, 146, 186, 160],
            'Peace Pochentong': [null, 122, 137, 140],
            'TotalEnergies – Odem': [null, 132, 101, 106],
            'SR-TADA Office': [null, 87, 83, 81],
            'SR-Savimex': [null, 72, 61, 58],
            'TotalEnergies – Prek Ho': [null, 62, 60, 52],
            'PTT – Chba Ampov': [null, 24, 23, 39],
            'PTT – Apsara (Siem Reap)': [null, 37, 40, 32],
            'TL Sky Mall': [null, 32, 32, 16],
            'Good Link – Choeung Ek': [null, 7, 15, 11],
            'Chong Kaosu (Siem Reap)': [null, 6, 11, 5],
            'TotalEnergies – CCV': [null, 0, 0, 0],
        },
        idleVehicles: [null, 97, 96, 99],   // T-series, no swap for 30+ days
        idleBatteries: [null, 140, 110, 126],
        batteryNG: [null, 34, 0, 100],
        modemReplacements: [null, 4, 3, 2],
        t1aPlus: { swaps: [null, 54, 47, 41], active: [null, 37, 37, 38], rate: [null, 0.20, 0.18, 0.15] },
        idleReasons: {
            asOf: '2026-11-02',
            items: { 'Low usage': 84, 'Took battery back': 4, 'Wants to sell back': 3, 'Sold to someone else': 3, 'Internal': 3, 'Lost connection': 1, 'Working in province': 1 },
        },
        firmwareRecall: {
            asOf: '2026-10-28',
            batches: [
                { batch: 'Batch 345', total: 349, updated: 299, toUpdate: 44 },
                { batch: 'Batch 506', total: 506, updated: 439, toUpdate: 67 },
            ],
        },
    },

    rental: {
        xR2O: {
            active: { 'X1': [null, 31, 31, 34], 'X2': [null, 7, 7, 7], 'X3': [null, 42, 45, 48], 'X3 Pro': [null, 9, 9, 10] },
            delivered: [null, 5, 3, 7],
        },
        xApplications: {
            approved: [null, 7, 11, 10], rejected: [null, 0, 2, 2], pending: [null, 2, 3, 1], cancelled: [null, 0, 1, 0],
        },
        t: {
            contracts: { rentToOwn: [null, 70, 71, 74], rental: [null, 31, 32, 32] },
            movements: {
                newRental: [null, 0, 2, 2], newRentToOwn: [null, 1, 1, 2], switchToR2O: [null, 0, 1, 2],
                renewed: [null, 1, 0, 0], returned: [null, 0, 0, 1], changedToCash: [null, 1, 1, 0],
            },
            payment: { autoDeduction: [null, 73, 73, 78], notAgreed: [null, 12, 14, 12], b2b: [null, 16, 16, 16] },
        },
        autoDeduction: {
            onion: { successful: [null, null, 29, 32], shortfall: [null, null, 44, 44] },
            tada: { successful: [null, null, 39, 41], shortfall: [null, null, 80, 78] },
        },
        // Snapshot ("last week notice"); `week` is the week it belongs to
        shortfallAging: {
            week: 'W44',
            buckets: ['1–2 days', '3–6 days', '7+ days'],
            onion: { drivers: [34, 9, 1], amount: [125.09, 148.06, 73.30] },
            tada: { drivers: [59, 7, 12], amount: [161.79, 115.49, 447.77] },
        },
    },

    afterSales: {
        // Field engineering service revenue, USD incl. tax
        revenue: {
            x: { 'Sen Sok': [null, null, null, 1010.80], 'STM': [null, null, null, 24.00], 'SR': [null, null, null, 74.50] },
            t: { 'Sen Sok': [null, null, null, 1837.10], 'STM': [null, null, null, 60.60], 'SR': [null, null, null, 71.50] },
        },
        // Repair cases (field claims) by type
        repairs: {
            t: {
                'Sen Sok': { repairOrder: [null, null, null, 152], warranty: [null, null, null, 31], rental: [null, null, null, 23], internal: [null, null, null, 2], pdi: [null, null, null, 3] },
                'STM': { repairOrder: [null, null, null, 9], warranty: [null, null, null, 1], rental: [null, null, null, 8], internal: [null, null, null, 0], pdi: [null, null, null, 0] },
                'SR': { repairOrder: [null, null, null, 4], warranty: [null, null, null, 0], rental: [null, null, null, 0], internal: [null, null, null, 2], pdi: [null, null, null, 0] },
            },
            x: {
                'Sen Sok': { repairOrder: [null, null, null, 94], warranty: [null, null, null, 10], rental: [null, null, null, 0], internal: [null, null, null, 0], pdi: [null, null, null, 0] },
                'STM': { repairOrder: [null, null, null, 6], warranty: [null, null, null, 16], rental: [null, null, null, 0], internal: [null, null, null, 0], pdi: [null, null, null, 0] },
                'SR': { repairOrder: [null, null, null, 8], warranty: [null, null, null, 0], rental: [null, null, null, 0], internal: [null, null, null, 0], pdi: [null, null, null, 0] },
            },
        },
        nextActions: [
            'Follow up the purchase of DC converters (72V–12V).',
            'Produce video SOPs for standard service repairs, for the team and service partners.',
            'Review inventory at month end and prepare for year end.',
            'Review fast-moving spare parts with the purchasing team.',
        ],
    },

    factory: {
        xProduction: { 'X1': [24, 24, 19, 35], 'X3': [4, 5, 5, 25], 'X3 Pro': [22, 21, 33, 5] },
        tProduction: {
            'T1 reconditioned': [1, 3, 4, 3], 'New T1C+': [2, 0, 1, 1], 'T1A+ reconditioned': [1, 1, 1, 1],
            'New T1A+': [0, 0, 0, 2], 'New T1C': [0, 0, 0, 0],
        },
        batteryRepairs: { repaired: [145, 134, 84, 156], failed: [0, 0, 0, 0] },
        status: [
            { key: 'safety', level: 'good', text: 'No issues.' },
            { key: 'quality', level: 'good', text: 'No issues in the quality review.' },
            { key: 'delivery', level: 'info', text: 'X1 is the delivery priority.' },
            { key: 'cost', level: 'good', text: 'Painting cost reduced from $36 to $34 per unit ($600 / month).' },
            { key: 'manpower', level: 'info', text: 'No update.' },
        ],
        inbound: [
            { item: 'X3 · 360 units', supplier: 'Huaihai Global E-Commerce', eta: 'Cargo ready 6 Nov 2026', status: 'Waiting for forwarder schedule', level: 'warn' },
            { item: 'X-series · 510 units (X1 270, X3 240)', supplier: 'Huaihai Global E-Commerce', eta: 'Cargo ready 1st–2nd week of Dec 2026', level: 'info' },
            { item: 'Batteries 896 · cables 440 · swap chargers 300', supplier: 'Joycube Battery', eta: 'Cargo ready 1st–2nd week of Jan 2027', level: 'info' },
            { item: 'Battery cells · 12,000 pcs', supplier: 'Dongguan Yuanhong Electronics', eta: 'Date not reported', level: 'info' },
            { item: 'Time delay module · 120 pcs', supplier: 'KwonTS', eta: 'Cargo ready', status: 'Waiting for forwarder schedule', level: 'warn' },
        ],
    },
};

/* ---------------------------------------------------------- DATA SOURCES
 * Each source is a Google Sheet tab published as CSV
 * (File → Share → Publish to web → choose the tab → CSV) with three columns:
 *
 *   path                                   week   value
 *   weeks.label                            W45    02–08 Nov
 *   weeks.reportUrl                        W45    https://docs.google.com/…
 *   finance.pillars.xSales.revenue         W45    41250.50
 *   operations.stations.BKK (Norodom Blvd) W45    660
 *   sales.targets.0.actual                        310      ← no week = single value
 *
 * `path` points into DATA (numbers index arrays). A new week id is appended to
 * DATA.weeks automatically. Rows load in order, so later sources win.
 */
const DATA_SOURCES = [
    // { name: 'Finance', url: 'https://docs.google.com/spreadsheets/d/e/<PUBLISHED_ID>/pub?gid=0&single=true&output=csv' },
];

/* --------------------------------------------------------------- STRINGS */

const STRINGS = {
    en: {
        'app.title': 'Executive Dashboard',
        'app.meta': '{report} · {week}{date}',
        'app.reported': ' · reported {date}',
        'app.openReport': 'Open weekly report',
        'app.weekPicker': 'Select week',

        'nav.overview': 'Overview',
        'nav.finance': 'Finance',
        'nav.sales': 'Sales',
        'nav.operations': 'Operations',
        'nav.rental': 'Rental',
        'nav.afterSales': 'After-Sales',
        'nav.factory': 'Factory',

        'common.total': 'Total',
        'common.vsPrev': 'vs prev. week',
        'common.noPrev': 'no prior week',
        'common.flat': 'no change',
        'common.units': 'units',
        'common.notReported': 'Not reported for {week}',
        'common.details': 'Full report',

        'series.x': 'X-series',
        'series.t': 'T-series',

        'pillar.xSales': 'X-series vehicles',
        'pillar.tSales': 'T-series vehicles',
        'pillar.tSwap': 'T-series swapping',
        'pillar.xSwap': 'X-series swapping',
        'pillar.tAcc': 'T-series accessories',
        'pillar.xAcc': 'X-series accessories',

        'overview.sub': 'Headline numbers for {week}. Badges compare with the previous week.',
        'kpi.revenue': 'Revenue',
        'kpi.revenueSub': 'Cash in {cash}',
        'kpi.margin': 'Gross margin',
        'kpi.marginSub': '{gm} on vehicles & accessories',
        'kpi.xUnits': 'X-series units sold',
        'kpi.tUnits': 'T-series units sold',
        'kpi.targetSub': '{period}: {actual} / {target}',
        'kpi.swaps': 'T-series battery swaps',
        'kpi.swapsSub': '{n} vehicles swapping',
        'kpi.fleet': 'Active rental fleet',
        'kpi.fleetSub': 'X {x} · T {t}',
        'kpi.warranty': 'Warranty cost',
        'kpi.warrantySub': '{n} vehicles (VIN)',
        'kpi.shortfall': 'Drivers short on auto-deduction',
        'kpi.shortfallSub': '{amt} outstanding',
        'kpi.shortfallSubNone': 'ONiON + TADA',

        'att.title': 'Executive attention',
        'att.sub': 'Signals are calculated from the selected week · priority notes as of {date}',
        'att.signals': 'Signals',
        'att.priorities': 'Priority notes',
        'att.noSignals': 'Nothing unusual in the selected week.',
        'att.pastDue': 'Due {date} — confirm status',

        'targets.title': 'Monthly sales vs target',
        'targets.sub': 'Vehicle sales goals',
        'targets.gap': '{n} units to go',
        'targets.hit': 'Target reached',

        'sig.revUp': 'Revenue up {pct} week on week',
        'sig.revDown': 'Revenue down {pct} week on week',
        'sig.revText': '{a} vs {b} the week before.',
        'sig.warranty': 'Warranty cost up {pct}',
        'sig.warrantyText': '{a} across {vins} vehicles this week.',
        'sig.batteryNG': '{n} batteries flagged NG',
        'sig.batteryNGText': 'Up from {b} the week before. Confirm the root cause.',
        'sig.idle': '{n} T-series vehicles idle > 30 days',
        'sig.idleText': 'Main reason: {reason} ({n}).',
        'sig.t1a': 'T1A+ swap rate falling',
        'sig.t1aText': 'Swaps per vehicle per day: {b} → {a}.',
        'sig.overdue': '{n} drivers 7+ days overdue',
        'sig.overdueText': '{amt} outstanding across ONiON and TADA.',
        'sig.target': '{series} at {pct} of monthly target',
        'sig.targetText': '{period}: {actual} of {target} units.',

        'fin.sub': 'Revenue, gross margin and warranty by business line',
        'fin.revTitle': 'Revenue by business line',
        'fin.revSub': 'USD excl. tax · click a week to select it',
        'fin.snapTitle': 'Business lines — {week}',
        'fin.snapSub': 'Revenue and gross margin',
        'fin.line': 'Business line',
        'fin.revenue': 'Revenue',
        'fin.gm': 'GM %',
        'fin.change': 'Change',
        'fin.gmNote': 'Swapping has no cost of goods in the report, so it is left out of gross margin.',
        'fin.gmTitle': 'Gross margin % trend',
        'fin.gmSub': 'Vehicle and accessory sales',
        'fin.warrTitle': 'Warranty cost',
        'fin.warrSub': 'USD by series · line = vehicles claimed',
        'fin.warrCost': '{series} cost',
        'fin.vins': 'Vehicles (VIN)',

        'sales.sub': 'Units, team performance, financing and stock',
        'sales.unitsTitle': 'Units sold by model',
        'sales.unitsSub': 'Finance figures · click a week to select it',
        'sales.teamTitle': 'Sales by salesperson — {week}',
        'sales.teamSub': 'Units closed',
        'sales.dealer': '(dealer)',
        'sales.colourTitle': 'X-series colour mix — {week}',
        'sales.colourSub': 'Units by model and colour',
        'sales.loanTitle': 'Loan applications',
        'sales.loanSub': 'By lender',
        'sales.lender': 'Lender',
        'sales.stockTitle': 'Vehicle stock by location',
        'sales.stockSub': 'Snapshot {date}',
        'sales.model': 'Model',

        'ops.sub': 'Battery-swapping network and fleet health',
        'ops.swapTitle': 'T-series swaps & active vehicles',
        'ops.swapSub': 'Bars = swaps per week · line = vehicles swapping',
        'ops.swaps': 'Swaps',
        'ops.activeT': 'Vehicles swapping',
        'ops.healthTitle': 'Fleet health — {week}',
        'ops.healthSub': 'Compared with the previous week',
        'ops.swapRate': 'Swaps / vehicle / day',
        'ops.activeX': 'X-series vehicles swapping',
        'ops.idleVehicles': 'T-series idle > 30 days',
        'ops.idleBatteries': 'Batteries idle > 30 days',
        'ops.batteryNG': 'Batteries NG',
        'ops.modem': 'Modem replacements',
        'ops.t1aRate': 'T1A+ swaps / vehicle / day',
        'ops.stationTitle': 'Swaps by station — {week}',
        'ops.stationSub': 'T-series · hover for change vs previous week',
        'ops.prev': 'Previous week: {v} ({d})',
        'ops.idleTitle': 'Why vehicles are idle',
        'ops.idleSub': '{n} T-series vehicles · {date}',
        'ops.recallTitle': 'T1A+ battery firmware recall',
        'ops.recallSub': 'Progress as of {date}',
        'ops.recallLine': '{u} of {total} updated · {p} still to update',

        'rent.sub': 'Rent-to-own and rental contracts, applications and collections',
        'rent.fleetTitle': 'Active rental fleet',
        'rent.fleetSub': 'Contracts by type',
        'rent.tR2O': 'T-series rent-to-own',
        'rent.tRental': 'T-series rental',
        'rent.xR2O': 'X-series rent-to-own',
        'rent.appTitle': 'X-series applications',
        'rent.appSub': 'By outcome',
        'rent.approved': 'Approved',
        'rent.rejected': 'Rejected',
        'rent.pending': 'Pending',
        'rent.cancelled': 'Cancelled',
        'rent.collTitle': 'Auto-deduction collection — {week}',
        'rent.collSub': 'Share of drivers fully paid',
        'rent.paid': '{a} of {b} drivers paid',
        'rent.payment': 'T-series payment method',
        'rent.autoDeduction': 'Auto-deduction',
        'rent.notAgreed': 'Not agreed',
        'rent.b2b': 'B2B',
        'rent.agingTitle': 'Shortfall ageing',
        'rent.agingSub': 'Unpaid amounts by days overdue · {week}',
        'rent.bucket': 'Days overdue',
        'rent.drivers': 'Drivers',
        'rent.amount': 'Amount',
        'rent.moveTitle': 'T-series contract changes',
        'rent.moveSub': 'Count per week',
        'rent.change': 'Change',
        'rent.newRental': 'New rental',
        'rent.newRentToOwn': 'New rent-to-own',
        'rent.switchToR2O': 'Switched rental → rent-to-own',
        'rent.renewed': 'Renewed',
        'rent.returned': 'Returned',
        'rent.changedToCash': 'Changed to cash',

        'as.sub': 'Field engineering: service revenue and repair workload',
        'as.revTitle': 'Service revenue by site — {week}',
        'as.revSub': 'USD incl. tax · total {amt}',
        'as.repTitle': 'Repair cases by site — {week}',
        'as.repSub': 'Field claims by type · {n} in total',
        'as.repairOrder': 'Repair order',
        'as.warranty': 'Warranty',
        'as.rental': 'Rental',
        'as.internal': 'Internal use',
        'as.pdi': 'PDI',
        'as.actions': 'Next actions',

        'fac.sub': 'Production output, plant status and inbound supply',
        'fac.xTitle': 'X-series production',
        'fac.tTitle': 'T-series production',
        'fac.unitsSub': 'Units per week',
        'fac.batTitle': 'Battery & charger repairs',
        'fac.batSub': 'Cases per week',
        'fac.repaired': 'Repaired',
        'fac.failed': 'Failed',
        'fac.statusTitle': 'Plant status',
        'fac.statusSub': 'Safety · quality · delivery · cost · manpower',
        'fac.safety': 'Safety',
        'fac.quality': 'Quality',
        'fac.delivery': 'Delivery',
        'fac.cost': 'Cost',
        'fac.manpower': 'Manpower',
        'fac.inboundTitle': 'Inbound supply',
        'fac.inboundSub': 'Shipments from suppliers',

        'foot.notes': 'Data notes',
        'foot.source': 'Data source',
        'foot.bundled': 'Figures are stored in script.js, transcribed from the weekly report.',
        'foot.live': '{n} live Google Sheets source(s) loaded on top of the stored figures.',
        'banner.failed': 'Could not load: {names}. Showing the stored figures instead.',
        'banner.noChart': 'Charts could not load (Chart.js unavailable). Check the internet connection.',
    },
    // km: { 'nav.overview': '…' },   ← Khmer: any missing key falls back to English
};
const LANG_NAMES = { en: 'English', km: 'ខ្មែរ' };

/* ---------------------------------------------------------------- State */

const state = { week: DATA.weeks.length - 1, lang: 'en' };
let charts = [];
let pendingCharts = [];
let sourceInfo = { live: 0, failed: [] };

const NAV = [
    ['overview', 'nav.overview'], ['finance', 'nav.finance'], ['sales', 'nav.sales'],
    ['operations', 'nav.operations'], ['rental', 'nav.rental'], ['afterSales', 'nav.afterSales'], ['factory', 'nav.factory'],
];

/* -------------------------------------------------------------- Helpers */

const $ = sel => document.querySelector(sel);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const at = (arr, i) => (Array.isArray(arr) && i >= 0 && arr[i] != null ? arr[i] : null);
const ser = arr => DATA.weeks.map((_, j) => at(arr, j));
const sum = list => list.reduce((s, v) => s + (v || 0), 0);
const ratio = (a, b) => (a == null || !b ? null : a / b);

function sumAt(arrays, i) {
    let total = 0, seen = false;
    for (const a of arrays) {
        const v = at(a, i);
        if (v != null) { total += v; seen = true; }
    }
    return seen ? total : null;
}

function t(key, vars) {
    const s = STRINGS[state.lang]?.[key] ?? STRINGS.en[key] ?? key;
    return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : s;
}

const fmt = {
    usd: v => (v == null ? '—' : '$' + Math.round(v).toLocaleString('en-US')),
    usd2: v => (v == null ? '—' : '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })),
    usdK: v => (v == null ? '—' : Math.abs(v) >= 1000 ? '$' + (v / 1000).toFixed(Math.abs(v) >= 10000 ? 0 : 1) + 'K' : '$' + Math.round(v)),
    int: v => (v == null ? '—' : Math.round(v).toLocaleString('en-US')),
    num: (v, d = 2) => (v == null ? '—' : v.toFixed(d)),
    pct: (v, d = 1) => (v == null ? '—' : (v * 100).toFixed(d) + '%'),
};

function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return Number.isNaN(+d) ? iso : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const weekId = i => DATA.weeks[i]?.id ?? '—';
const weekName = i => `${weekId(i)} (${DATA.weeks[i]?.label ?? ''})`;

function reportUrl(i) {
    if (DATA.weeks[i]?.reportUrl) return DATA.weeks[i].reportUrl;
    return [...DATA.weeks].reverse().find(w => w.reportUrl)?.reportUrl ?? null;
}

/** Change badge vs the previous value. good: which direction is good; mode: pct | pp | abs */
function delta(cur, prev, { good = 'up', mode = 'pct' } = {}) {
    if (cur == null || prev == null) return `<span class="delta none">${t('common.noPrev')}</span>`;
    const diff = cur - prev;
    if (Math.abs(diff) < 1e-9) return `<span class="delta flat" title="${t('common.vsPrev')}">${t('common.flat')}</span>`;
    let txt;
    if (mode === 'pp') txt = Math.abs(diff * 100).toFixed(1) + ' pp';
    else if (mode === 'abs' || prev === 0) {
        const d = Math.abs(diff);
        txt = Number.isInteger(+d.toFixed(6)) ? fmt.int(d) : d.toFixed(2);
    } else txt = Math.abs(diff / prev * 100).toFixed(1) + '%';
    const up = diff > 0;
    const cls = up === (good === 'up') ? 'good' : 'bad';
    return `<span class="delta ${cls}" title="${t('common.vsPrev')}">${up ? '▲' : '▼'} ${txt}</span>`;
}

/* ---------------------------------------------------------------- Finance */

const PILLARS = ['xSales', 'tSales', 'tSwap', 'tAcc', 'xAcc', 'xSwap'];

const pillarGM = (p, i) => (p.cogs && at(p.revenue, i) != null && at(p.cogs, i) != null ? p.revenue[i] - p.cogs[i] : null);
const pillarGMPct = (p, i) => ratio(pillarGM(p, i), at(p.revenue, i));

function financeTotals(i) {
    const all = Object.values(DATA.finance.pillars);
    const costed = all.filter(p => p.cogs);
    const rev = sumAt(costed.map(p => p.revenue), i);
    const cogs = sumAt(costed.map(p => p.cogs), i);
    const gm = rev == null || cogs == null ? null : rev - cogs;
    return { revenue: sumAt(all.map(p => p.revenue), i), cash: sumAt(all.map(p => p.cash), i), gm, gmPct: ratio(gm, rev) };
}

/* ----------------------------------------------------------------- Charts */

const C = {
    brand: '#0050FF', navy: '#0A1B4D', sky: '#7FA6FF', teal: '#12B5A6', amber: '#F5A524',
    coral: '#EF4E5A', violet: '#7C5CFF', slate: '#A3AEC2', green: '#0E9F6E',
};
const GRID = '#EDF0F5';
const PILLAR_COLOR = { xSales: C.brand, tSales: C.navy, tSwap: C.teal, tAcc: C.amber, xAcc: C.violet, xSwap: C.slate };
const MODEL_COLORS = [C.brand, C.teal, C.navy, C.amber, C.violet, C.sky];

function alpha(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}
// Highlight the selected week's column, fade the rest (Power BI-style cross-highlight)
const emph = color => DATA.weeks.map((_, j) => (j === state.week ? color : alpha(color, 0.38)));
const pointSizes = () => DATA.weeks.map((_, j) => (j === state.week ? 5 : 3));
const weekAxis = () => DATA.weeks.map(w => [w.id, w.label]);
const moneyTicks = () => ({ ticks: { callback: v => fmt.usdK(v) } });
const tipLabel = (axis, f) => c => ` ${c.dataset.label}: ${f(c.parsed[axis])}`;

function deepMerge(target, src) {
    for (const [k, v] of Object.entries(src || {})) {
        const isObj = v && typeof v === 'object' && !Array.isArray(v);
        if (isObj && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) deepMerge(target[k], v);
        else target[k] = v;
    }
    return target;
}

function baseOptions(extra) {
    return deepMerge({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true, pointStyle: 'rectRounded', boxWidth: 8, boxHeight: 8, padding: 14,
                    // Swatches use the selected week's (solid) colour rather than a faded one
                    generateLabels: chart => Chart.defaults.plugins.legend.labels.generateLabels(chart).map(l => {
                        const bg = chart.data.datasets[l.datasetIndex]?.backgroundColor;
                        if (Array.isArray(bg)) l.fillStyle = l.strokeStyle = bg[state.week] ?? bg[0];
                        return l;
                    }),
                },
            },
            tooltip: { backgroundColor: '#0A1B4D', padding: 10, cornerRadius: 8, boxPadding: 4, titleFont: { weight: '600' } },
        },
        scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: { grid: { color: GRID }, border: { display: false }, beginAtZero: true },
        },
    }, extra);
}

// Charts with weeks on the x-axis: clicking a column selects that week
function weekOpts(extra) {
    return baseOptions(deepMerge({
        onClick: (e, els) => { if (els.length) setWeek(els[0].index); },
        onHover: (e, els) => { const el = e.native?.target; if (el) el.style.cursor = els.length ? 'pointer' : 'default'; },
    }, extra));
}

// Horizontal bar charts
function hOpts(extra) {
    return baseOptions(deepMerge({
        indexAxis: 'y',
        interaction: { mode: 'index', axis: 'y', intersect: false },
        scales: {
            x: { grid: { display: true, color: GRID }, beginAtZero: true },
            y: { grid: { display: false } },
        },
    }, extra));
}

function chartBox(config, height = 260) {
    const id = 'chart-' + (pendingCharts.length + 1);
    pendingCharts.push({ id, config });
    return `<div class="chart-box" style="height:${height}px"><canvas id="${id}" role="img"></canvas></div>`;
}

/* ------------------------------------------------------------- Layout bits */

function section(id, title, sub, inner) {
    const url = reportUrl(state.week);
    return `<section id="${id}" class="section">
        <div class="section-h">
            <div><h2>${title}</h2><p>${sub}</p></div>
            ${url ? `<a class="link" href="${esc(url)}" target="_blank" rel="noopener">${t('common.details')} ↗</a>` : ''}
        </div>
        <div class="grid">${inner}</div>
    </section>`;
}

function card({ span = 6, title, sub = '', body }) {
    return `<article class="card span-${span}">
        <header class="card-h"><div><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</div></header>
        ${body}
    </article>`;
}

const empty = msg => `<div class="empty">${msg}</div>`;
const notReported = i => empty(t('common.notReported', { week: weekName(i) }));

function kpi({ label, value, change, sub }) {
    return `<div class="kpi">
        <p class="kpi-l">${label}</p>
        <p class="kpi-v">${value}</p>
        <div class="kpi-f">${change || ''}<span>${sub || ''}</span></div>
    </div>`;
}

function progress({ label, right, num, pctValue, sub }) {
    const p = Math.max(0, Math.min(1, pctValue ?? 0));
    const cls = pctValue >= 1 ? 'good' : pctValue < 0.8 ? 'warn' : '';
    return `<div class="prog">
        <div class="prog-top"><span>${label}</span><small>${right ?? ''}</small></div>
        ${num ? `<div class="prog-num">${num}</div>` : ''}
        <div class="bar"><i class="${cls}" style="width:${(p * 100).toFixed(1)}%"></i></div>
        ${sub ? `<p class="prog-sub">${sub}</p>` : ''}
    </div>`;
}

function listItems(items) {
    return `<ul class="att">${items.map(x => `<li class="lv-${x.level}"><span class="dot"></span><div>
        <p class="att-t">${x.title}</p>${x.text ? `<p class="att-d">${x.text}</p>` : ''}</div></li>`).join('')}</ul>`;
}

/* --------------------------------------------------------------- Signals
 * Each rule looks at the selected week and returns a signal, a list, or null.
 */
const LEVEL_ORDER = { bad: 0, warn: 1, info: 2, good: 3 };

const SIGNALS = [
    // Revenue swing of 15% or more
    i => {
        const a = financeTotals(i).revenue, b = financeTotals(i - 1).revenue;
        if (a == null || !b || Math.abs(a / b - 1) < 0.15) return null;
        const ch = a / b - 1;
        return { level: ch > 0 ? 'good' : 'bad', title: t(ch > 0 ? 'sig.revUp' : 'sig.revDown', { pct: fmt.pct(Math.abs(ch), 0) }), text: t('sig.revText', { a: fmt.usd(a), b: fmt.usd(b) }) };
    },
    // Warranty cost up more than 25%
    i => {
        const W = DATA.finance.warranty;
        const a = sumAt([W.t.cost, W.x.cost], i), b = sumAt([W.t.cost, W.x.cost], i - 1);
        if (a == null || !b || a / b - 1 < 0.25) return null;
        return { level: 'warn', title: t('sig.warranty', { pct: fmt.pct(a / b - 1, 0) }), text: t('sig.warrantyText', { a: fmt.usd(a), vins: fmt.int(sumAt([W.t.vins, W.x.vins], i)) }) };
    },
    // Jump in batteries flagged NG
    i => {
        const s = DATA.operations.batteryNG, a = at(s, i), b = at(s, i - 1);
        if (a == null || b == null || a <= b || a < 20) return null;
        return { level: 'bad', title: t('sig.batteryNG', { n: fmt.int(a) }), text: t('sig.batteryNGText', { b: fmt.int(b) }) };
    },
    // Many vehicles not swapping
    i => {
        const O = DATA.operations, a = at(O.idleVehicles, i);
        if (a == null || a < 90) return null;
        const [reason, n] = Object.entries(O.idleReasons.items).sort((x, y) => y[1] - x[1])[0] || [];
        return { level: 'warn', title: t('sig.idle', { n: fmt.int(a) }), text: reason ? t('sig.idleText', { reason: esc(reason), n }) : '' };
    },
    // T1A+ usage falling
    i => {
        const r = DATA.operations.t1aPlus.rate, a = at(r, i), b = at(r, i - 1);
        if (a == null || b == null || a >= b) return null;
        return { level: 'warn', title: t('sig.t1a'), text: t('sig.t1aText', { a: fmt.num(a), b: fmt.num(b) }) };
    },
    // Long-overdue collections (snapshot week only)
    i => {
        const g = DATA.rental.shortfallAging;
        if (g.week !== weekId(i)) return null;
        const k = g.buckets.length - 1;
        const n = (g.onion.drivers[k] || 0) + (g.tada.drivers[k] || 0);
        if (!n) return null;
        return { level: 'bad', title: t('sig.overdue', { n }), text: t('sig.overdueText', { amt: fmt.usd2((g.onion.amount[k] || 0) + (g.tada.amount[k] || 0)) }) };
    },
    // Monthly sales pace below 80% of target
    () => DATA.sales.targets.filter(g => g.actual / g.target < 0.8).map(g => ({
        level: 'warn',
        title: t('sig.target', { series: t('series.' + g.series), pct: fmt.pct(g.actual / g.target, 0) }),
        text: t('sig.targetText', { period: esc(g.period), actual: fmt.int(g.actual), target: fmt.int(g.target) }),
    })),
];

/* ============================================================== SECTIONS */

function renderOverview(i) {
    const S = DATA.sales, R = DATA.rental, W = DATA.finance.warranty;
    const F = financeTotals(i), Fp = financeTotals(i - 1);
    const units = (s, j) => sumAt(Object.values(S.units[s]), j);
    const swaps = j => at(DATA.finance.pillars.tSwap.swaps, j);
    const xFleet = j => sumAt(Object.values(R.xR2O.active), j);
    const tFleet = j => sumAt(Object.values(R.t.contracts), j);
    const fleet = j => sumAt([[xFleet(j)], [tFleet(j)]], 0);
    const warranty = j => sumAt([W.t.cost, W.x.cost], j);
    const shortfall = j => sumAt([R.autoDeduction.onion.shortfall, R.autoDeduction.tada.shortfall], j);
    const aging = R.shortfallAging;
    const owed = aging.week === weekId(i) ? sum(aging.onion.amount) + sum(aging.tada.amount) : null;
    const targetSub = s => {
        const g = S.targets.find(x => x.series === s);
        return g ? t('kpi.targetSub', { period: esc(g.period), actual: fmt.int(g.actual), target: fmt.int(g.target) }) : '';
    };

    const tiles = [
        kpi({ label: t('kpi.revenue'), value: fmt.usd(F.revenue), change: delta(F.revenue, Fp.revenue), sub: t('kpi.revenueSub', { cash: fmt.usd(F.cash) }) }),
        kpi({ label: t('kpi.margin'), value: fmt.pct(F.gmPct), change: delta(F.gmPct, Fp.gmPct, { mode: 'pp' }), sub: t('kpi.marginSub', { gm: fmt.usd(F.gm) }) }),
        kpi({ label: t('kpi.xUnits'), value: fmt.int(units('x', i)), change: delta(units('x', i), units('x', i - 1), { mode: 'abs' }), sub: targetSub('x') }),
        kpi({ label: t('kpi.tUnits'), value: fmt.int(units('t', i)), change: delta(units('t', i), units('t', i - 1), { mode: 'abs' }), sub: targetSub('t') }),
        kpi({ label: t('kpi.swaps'), value: fmt.int(swaps(i)), change: delta(swaps(i), swaps(i - 1)), sub: t('kpi.swapsSub', { n: fmt.int(at(DATA.operations.tActive, i)) }) }),
        kpi({ label: t('kpi.fleet'), value: fmt.int(fleet(i)), change: delta(fleet(i), fleet(i - 1), { mode: 'abs' }), sub: t('kpi.fleetSub', { x: fmt.int(xFleet(i)), t: fmt.int(tFleet(i)) }) }),
        kpi({ label: t('kpi.warranty'), value: fmt.usd(warranty(i)), change: delta(warranty(i), warranty(i - 1), { good: 'down' }), sub: t('kpi.warrantySub', { n: fmt.int(sumAt([W.t.vins, W.x.vins], i)) }) }),
        kpi({ label: t('kpi.shortfall'), value: fmt.int(shortfall(i)), change: delta(shortfall(i), shortfall(i - 1), { good: 'down', mode: 'abs' }), sub: owed != null ? t('kpi.shortfallSub', { amt: fmt.usd(owed) }) : t('kpi.shortfallSubNone') }),
    ];

    return section('overview', t('nav.overview'), t('overview.sub', { week: weekName(i) }), `
        <div class="kpis">${tiles.join('')}</div>
        ${card({ span: 8, title: t('att.title'), sub: t('att.sub', { date: fmtDate(DATA.priorities.asOf) }), body: attentionBody(i) })}
        ${card({ span: 4, title: t('targets.title'), sub: t('targets.sub'), body: targetsBody() })}
    `);
}

function attentionBody(i) {
    const signals = SIGNALS.flatMap(rule => [].concat(rule(i) || []))
        .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
    const asOf = DATA.priorities.asOf;
    const priorities = DATA.priorities.items.map(p => ({
        level: p.level === 'high' ? 'bad' : p.level === 'medium' ? 'warn' : p.level,
        title: `${esc(p.title)}<span class="pill">${esc(p.area)}</span>${p.due && p.due < asOf ? `<span class="pill bad">${t('att.pastDue', { date: fmtDate(p.due) })}</span>` : ''}`,
        text: esc(p.detail),
    }));
    return `<div class="att-cols">
        <div><h4>${t('att.signals')}</h4>${signals.length ? listItems(signals) : `<p class="att-d">${t('att.noSignals')}</p>`}</div>
        <div><h4>${t('att.priorities')}</h4>${listItems(priorities)}</div>
    </div>`;
}

function targetsBody() {
    return DATA.sales.targets.map(g => {
        const p = ratio(g.actual, g.target);
        return progress({
            label: `${t('series.' + g.series)} · ${esc(g.period)}`,
            right: fmt.pct(p, 0),
            num: `<b>${fmt.int(g.actual)}</b> / ${fmt.int(g.target)} ${t('common.units')}`,
            pctValue: p,
            sub: p >= 1 ? t('targets.hit') : t('targets.gap', { n: fmt.int(g.target - g.actual) }),
        });
    }).join('');
}

function renderFinance(i) {
    const P = DATA.finance.pillars, W = DATA.finance.warranty;
    const keys = PILLARS.filter(k => P[k]);

    const revenueChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: keys.map(k => ({ label: t('pillar.' + k), data: ser(P[k].revenue), backgroundColor: emph(PILLAR_COLOR[k]), borderRadius: 2, maxBarThickness: 72 })),
        },
        options: weekOpts({
            scales: { x: { stacked: true }, y: { stacked: true, ...moneyTicks() } },
            plugins: { tooltip: { callbacks: { label: tipLabel('y', fmt.usd), footer: items => `${t('common.total')}: ${fmt.usd(sum(items.map(x => x.parsed.y)))}` } } },
        }),
    }, 300);

    const T = financeTotals(i), Tp = financeTotals(i - 1);
    const rows = keys.map(k => {
        const p = P[k], rev = at(p.revenue, i);
        return `<tr>
            <td><span class="sw" style="background:${PILLAR_COLOR[k]}"></span>${t('pillar.' + k)}</td>
            <td>${fmt.usd(rev)}</td>
            <td>${p.cogs ? fmt.pct(pillarGMPct(p, i)) : '<span class="muted">n/a</span>'}</td>
            <td>${delta(rev, at(p.revenue, i - 1))}</td>
        </tr>`;
    }).join('');
    const snapshot = `<table class="tbl">
        <thead><tr><th>${t('fin.line')}</th><th>${t('fin.revenue')}</th><th>${t('fin.gm')}</th><th>${t('fin.change')}</th></tr></thead>
        <tbody>${rows}
            <tr class="total"><td>${t('common.total')}</td><td>${fmt.usd(T.revenue)}</td><td>${fmt.pct(T.gmPct)}</td><td>${delta(T.revenue, Tp.revenue)}</td></tr>
        </tbody>
    </table>
    <p class="note">${t('fin.gmNote')}</p>`;

    const marginChart = chartBox({
        type: 'line',
        data: {
            labels: weekAxis(),
            datasets: keys.filter(k => P[k].cogs).map(k => ({
                label: t('pillar.' + k), data: DATA.weeks.map((_, j) => pillarGMPct(P[k], j)),
                borderColor: PILLAR_COLOR[k], backgroundColor: PILLAR_COLOR[k], borderWidth: 2, tension: 0.3, pointRadius: pointSizes(),
            })),
        },
        options: weekOpts({
            scales: { y: { ticks: { callback: v => fmt.pct(v, 0) } } },
            plugins: { tooltip: { callbacks: { label: tipLabel('y', v => fmt.pct(v)) } } },
        }),
    });

    const warrantyChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                { label: t('fin.warrCost', { series: t('series.t') }), data: ser(W.t.cost), backgroundColor: emph(C.navy), borderRadius: 3, maxBarThickness: 36, order: 2 },
                { label: t('fin.warrCost', { series: t('series.x') }), data: ser(W.x.cost), backgroundColor: emph(C.brand), borderRadius: 3, maxBarThickness: 36, order: 2 },
                { type: 'line', label: t('fin.vins'), data: DATA.weeks.map((_, j) => sumAt([W.t.vins, W.x.vins], j)), borderColor: C.amber, backgroundColor: C.amber, borderWidth: 2, tension: 0.3, pointRadius: pointSizes(), yAxisID: 'y1', order: 1 },
            ],
        },
        options: weekOpts({
            scales: { y: moneyTicks(), y1: { position: 'right', beginAtZero: true, grid: { display: false }, border: { display: false } } },
            plugins: { tooltip: { callbacks: { label: c => ` ${c.dataset.label}: ${c.dataset.yAxisID === 'y1' ? fmt.int(c.parsed.y) : fmt.usd2(c.parsed.y)}` } } },
        }),
    });

    return section('finance', t('nav.finance'), t('fin.sub'), `
        ${card({ span: 8, title: t('fin.revTitle'), sub: t('fin.revSub'), body: revenueChart })}
        ${card({ span: 4, title: t('fin.snapTitle', { week: weekId(i) }), sub: t('fin.snapSub'), body: snapshot })}
        ${card({ span: 6, title: t('fin.gmTitle'), sub: t('fin.gmSub'), body: marginChart })}
        ${card({ span: 6, title: t('fin.warrTitle'), sub: t('fin.warrSub'), body: warrantyChart })}
    `);
}

function renderSales(i) {
    const S = DATA.sales;

    const unitsChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                ...Object.entries(S.units.x).map(([model, d], k) => ({ label: model, data: ser(d), backgroundColor: emph(MODEL_COLORS[k % MODEL_COLORS.length]), borderRadius: 2, maxBarThickness: 56 })),
                { label: t('series.t'), data: DATA.weeks.map((_, j) => sumAt(Object.values(S.units.t), j)), backgroundColor: emph(C.amber), borderRadius: 2, maxBarThickness: 56 },
            ],
        },
        options: weekOpts({
            scales: { x: { stacked: true }, y: { stacked: true } },
            plugins: { tooltip: { callbacks: { footer: items => `${t('common.total')}: ${sum(items.map(x => x.parsed.y))}` } } },
        }),
    }, 280);

    const team = S.team
        .map(p => ({ ...p, xv: at(p.x, i), tv: at(p.t, i) }))
        .filter(p => p.xv != null || p.tv != null)
        .sort((a, b) => (b.xv || 0) + (b.tv || 0) - (a.xv || 0) - (a.tv || 0));
    const teamChart = team.length ? chartBox({
        type: 'bar',
        data: {
            labels: team.map(p => (p.channel === 'dealer' ? `${p.name} ${t('sales.dealer')}` : p.name)),
            datasets: [
                { label: t('series.x'), data: team.map(p => p.xv), backgroundColor: C.brand, borderRadius: 3, barThickness: 14 },
                { label: t('series.t'), data: team.map(p => p.tv), backgroundColor: C.amber, borderRadius: 3, barThickness: 14 },
            ],
        },
        options: hOpts({ scales: { x: { stacked: true }, y: { stacked: true } } }),
    }, team.length * 24 + 70) : notReported(i);

    const family = name => (name.startsWith('X3 Pro') ? C.navy : name.startsWith('X3') ? C.teal : C.brand);
    const colours = Object.entries(S.xColours).map(([name, d]) => [name, at(d, i)]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
    const colourChart = colours.length ? chartBox({
        type: 'bar',
        data: {
            labels: colours.map(c => c[0]),
            datasets: [{ label: t('common.units'), data: colours.map(c => c[1]), backgroundColor: colours.map(c => family(c[0])), borderRadius: 3, barThickness: 14 }],
        },
        options: hOpts({ plugins: { legend: { display: false } } }),
    }, colours.length * 24 + 40) : notReported(i);

    return section('sales', t('nav.sales'), t('sales.sub'), `
        ${card({ span: 4, title: t('sales.unitsTitle'), sub: t('sales.unitsSub'), body: unitsChart })}
        ${card({ span: 4, title: t('sales.teamTitle', { week: weekId(i) }), sub: t('sales.teamSub'), body: teamChart })}
        ${card({ span: 4, title: t('sales.colourTitle', { week: weekId(i) }), sub: t('sales.colourSub'), body: colourChart })}
        ${card({ span: 5, title: t('sales.loanTitle'), sub: t('sales.loanSub'), body: loanTable(i) })}
        ${card({ span: 7, title: t('sales.stockTitle'), sub: t('sales.stockSub', { date: fmtDate(S.stock.asOf) }), body: stockTable() })}
    `);
}

function loanTable(i) {
    const L = DATA.sales.loans;
    const body = Object.keys(L).map(s => {
        const rows = Object.entries(L[s]);
        const series = rows.map(r => r[1]);
        return `<tr class="group"><td colspan="3">${t('series.' + s)}</td></tr>
            ${rows.map(([name, d]) => `<tr><td>${esc(name)}</td><td>${fmt.int(at(d, i))}</td><td>${fmt.int(at(d, i - 1))}</td></tr>`).join('')}
            <tr class="sub"><td>${t('common.total')}</td><td>${fmt.int(sumAt(series, i))}</td><td>${fmt.int(sumAt(series, i - 1))}</td></tr>`;
    }).join('');
    return `<table class="tbl">
        <thead><tr><th>${t('sales.lender')}</th><th>${weekId(i)}</th><th>${weekId(i - 1)}</th></tr></thead>
        <tbody>${body}</tbody>
    </table>`;
}

function stockTable() {
    const st = DATA.sales.stock;
    const cols = st.locations.length + 2;
    const block = s => {
        const rows = Object.entries(st[s] || {});
        const totals = st.locations.map((_, k) => sum(rows.map(r => r[1][k])));
        return `<tr class="group"><td colspan="${cols}">${t('series.' + s)}</td></tr>
            ${rows.map(([model, v]) => `<tr><td>${esc(model)}</td>${v.map(x => `<td>${fmt.int(x)}</td>`).join('')}<td><b>${fmt.int(sum(v))}</b></td></tr>`).join('')}
            <tr class="sub"><td>${t('common.total')}</td>${totals.map(x => `<td>${fmt.int(x)}</td>`).join('')}<td>${fmt.int(sum(totals))}</td></tr>`;
    };
    return `<table class="tbl">
        <thead><tr><th>${t('sales.model')}</th>${st.locations.map(l => `<th>${esc(l)}</th>`).join('')}<th>${t('common.total')}</th></tr></thead>
        <tbody>${block('x')}${block('t')}</tbody>
    </table>`;
}

function renderOperations(i) {
    const O = DATA.operations;

    const swapChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                { label: t('ops.swaps'), data: ser(DATA.finance.pillars.tSwap.swaps), backgroundColor: emph(C.teal), borderRadius: 3, maxBarThickness: 72, order: 2 },
                { type: 'line', label: t('ops.activeT'), data: ser(O.tActive), borderColor: C.navy, backgroundColor: C.navy, borderWidth: 2, tension: 0.3, pointRadius: pointSizes(), yAxisID: 'y1', order: 1 },
            ],
        },
        options: weekOpts({
            scales: { y1: { position: 'right', beginAtZero: false, grid: { display: false }, border: { display: false } } },
            plugins: { tooltip: { callbacks: { label: tipLabel('y', fmt.int) } } },
        }),
    }, 300);

    const stat = (label, s, opts = {}) => {
        const a = at(s, i), b = at(s, i - 1);
        return `<div class="stat"><span>${label}</span><div><strong>${opts.f ? opts.f(a) : fmt.int(a)}</strong>${delta(a, b, { mode: 'abs', ...opts })}</div></div>`;
    };
    const health = [
        stat(t('ops.swapRate'), O.tSwapRate, { f: v => fmt.num(v) }),
        stat(t('ops.activeX'), O.xActive),
        stat(t('ops.idleVehicles'), O.idleVehicles, { good: 'down' }),
        stat(t('ops.idleBatteries'), O.idleBatteries, { good: 'down' }),
        stat(t('ops.batteryNG'), O.batteryNG, { good: 'down' }),
        stat(t('ops.modem'), O.modemReplacements, { good: 'down' }),
        stat(t('ops.t1aRate'), O.t1aPlus.rate, { f: v => fmt.num(v) }),
    ].join('');

    const stations = Object.entries(O.stations)
        .map(([name, d]) => ({ name, a: at(d, i), b: at(d, i - 1) }))
        .filter(s => s.a != null)
        .sort((x, y) => y.a - x.a);
    const stationChart = stations.length ? chartBox({
        type: 'bar',
        data: {
            labels: stations.map(s => s.name),
            datasets: [{ label: t('ops.swaps'), data: stations.map(s => s.a), backgroundColor: C.teal, borderRadius: 3, barThickness: 12 }],
        },
        options: hOpts({
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { afterLabel: c => { const s = stations[c.dataIndex]; return s.b == null ? '' : t('ops.prev', { v: fmt.int(s.b), d: (s.a - s.b >= 0 ? '+' : '') + fmt.int(s.a - s.b) }); } } },
            },
        }),
    }, stations.length * 22 + 40) : notReported(i);

    const reasons = Object.entries(O.idleReasons.items).sort((a, b) => b[1] - a[1]);
    const reasonChart = chartBox({
        type: 'bar',
        data: {
            labels: reasons.map(r => r[0]),
            datasets: [{ label: t('ops.idleVehicles'), data: reasons.map(r => r[1]), backgroundColor: C.coral, borderRadius: 3, barThickness: 12 }],
        },
        options: hOpts({ plugins: { legend: { display: false } } }),
    }, reasons.length * 26 + 40);

    const recall = O.firmwareRecall.batches.map(b => progress({
        label: esc(b.batch),
        right: fmt.pct(b.updated / b.total, 0),
        pctValue: b.updated / b.total,
        sub: t('ops.recallLine', { u: fmt.int(b.updated), total: fmt.int(b.total), p: fmt.int(b.toUpdate) }),
    })).join('');

    return section('operations', t('nav.operations'), t('ops.sub'), `
        ${card({ span: 8, title: t('ops.swapTitle'), sub: t('ops.swapSub'), body: swapChart })}
        ${card({ span: 4, title: t('ops.healthTitle', { week: weekId(i) }), sub: t('ops.healthSub'), body: at(O.tActive, i) == null ? notReported(i) : health })}
        ${card({ span: 6, title: t('ops.stationTitle', { week: weekId(i) }), sub: t('ops.stationSub'), body: stationChart })}
        ${card({ span: 3, title: t('ops.idleTitle'), sub: t('ops.idleSub', { n: sum(reasons.map(r => r[1])), date: fmtDate(O.idleReasons.asOf) }), body: reasonChart })}
        ${card({ span: 3, title: t('ops.recallTitle'), sub: t('ops.recallSub', { date: fmtDate(O.firmwareRecall.asOf) }), body: recall })}
    `);
}

function renderRental(i) {
    const R = DATA.rental;

    const fleetChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                { label: t('rent.tR2O'), data: ser(R.t.contracts.rentToOwn), backgroundColor: emph(C.navy), borderRadius: 2, maxBarThickness: 56 },
                { label: t('rent.tRental'), data: ser(R.t.contracts.rental), backgroundColor: emph(C.sky), borderRadius: 2, maxBarThickness: 56 },
                { label: t('rent.xR2O'), data: DATA.weeks.map((_, j) => sumAt(Object.values(R.xR2O.active), j)), backgroundColor: emph(C.brand), borderRadius: 2, maxBarThickness: 56 },
            ],
        },
        options: weekOpts({
            scales: { x: { stacked: true }, y: { stacked: true } },
            plugins: { tooltip: { callbacks: { footer: items => `${t('common.total')}: ${sum(items.map(x => x.parsed.y))}` } } },
        }),
    }, 280);

    const A = R.xApplications;
    const appChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                { label: t('rent.approved'), data: ser(A.approved), backgroundColor: emph(C.green), borderRadius: 2, maxBarThickness: 56 },
                { label: t('rent.pending'), data: ser(A.pending), backgroundColor: emph(C.amber), borderRadius: 2, maxBarThickness: 56 },
                { label: t('rent.rejected'), data: ser(A.rejected), backgroundColor: emph(C.coral), borderRadius: 2, maxBarThickness: 56 },
                { label: t('rent.cancelled'), data: ser(A.cancelled), backgroundColor: emph(C.slate), borderRadius: 2, maxBarThickness: 56 },
            ],
        },
        options: weekOpts({ scales: { x: { stacked: true }, y: { stacked: true } } }),
    }, 280);

    const collectionRow = (name, d) => {
        const paid = at(d.successful, i), short = at(d.shortfall, i);
        if (paid == null) return '';
        const rate = ratio(paid, paid + short);
        const prevPaid = at(d.successful, i - 1), prevShort = at(d.shortfall, i - 1);
        const prevRate = prevPaid == null ? null : ratio(prevPaid, prevPaid + prevShort);
        return progress({
            label: name,
            right: `${fmt.pct(rate, 0)} ${delta(rate, prevRate, { mode: 'pp' })}`,
            pctValue: rate,
            sub: t('rent.paid', { a: fmt.int(paid), b: fmt.int(paid + short) }),
        });
    };
    const pay = R.t.payment;
    const collection = collectionRow('ONiON', R.autoDeduction.onion) + collectionRow('TADA', R.autoDeduction.tada);
    const payment = at(pay.autoDeduction, i) == null ? '' : `<table class="tbl">
        <thead><tr><th>${t('rent.payment')}</th><th>${weekId(i)}</th></tr></thead>
        <tbody>${['autoDeduction', 'notAgreed', 'b2b'].map(k => `<tr><td>${t('rent.' + k)}</td><td>${fmt.int(at(pay[k], i))}</td></tr>`).join('')}</tbody>
    </table>`;

    const g = R.shortfallAging;
    const agingRows = g.buckets.map((b, k) => `<tr><td>${esc(b)}</td><td>${fmt.int(g.onion.drivers[k])}</td><td>${fmt.usd2(g.onion.amount[k])}</td><td>${fmt.int(g.tada.drivers[k])}</td><td>${fmt.usd2(g.tada.amount[k])}</td></tr>`).join('');
    const aging = `<table class="tbl">
        <thead>
            <tr><th></th><th colspan="2">ONiON</th><th colspan="2">TADA</th></tr>
            <tr><th>${t('rent.bucket')}</th><th>${t('rent.drivers')}</th><th>${t('rent.amount')}</th><th>${t('rent.drivers')}</th><th>${t('rent.amount')}</th></tr>
        </thead>
        <tbody>${agingRows}
            <tr class="total"><td>${t('common.total')}</td><td>${fmt.int(sum(g.onion.drivers))}</td><td>${fmt.usd2(sum(g.onion.amount))}</td><td>${fmt.int(sum(g.tada.drivers))}</td><td>${fmt.usd2(sum(g.tada.amount))}</td></tr>
        </tbody>
    </table>`;

    const M = R.t.movements;
    const moves = `<table class="tbl">
        <thead><tr><th></th><th>${weekId(i)}</th><th>${weekId(i - 1)}</th></tr></thead>
        <tbody>${Object.keys(M).map(k => `<tr><td>${t('rent.' + k)}</td><td>${fmt.int(at(M[k], i))}</td><td>${fmt.int(at(M[k], i - 1))}</td></tr>`).join('')}</tbody>
    </table>`;

    return section('rental', t('nav.rental'), t('rent.sub'), `
        ${card({ span: 4, title: t('rent.fleetTitle'), sub: t('rent.fleetSub'), body: fleetChart })}
        ${card({ span: 4, title: t('rent.appTitle'), sub: t('rent.appSub'), body: appChart })}
        ${card({ span: 4, title: t('rent.collTitle', { week: weekId(i) }), sub: t('rent.collSub'), body: collection ? collection + payment : notReported(i) })}
        ${card({ span: 6, title: t('rent.agingTitle'), sub: t('rent.agingSub', { week: weekName(DATA.weeks.findIndex(w => w.id === g.week)) }), body: aging })}
        ${card({ span: 6, title: t('rent.moveTitle'), sub: t('rent.moveSub'), body: at(M.newRental, i) == null ? notReported(i) : moves })}
    `);
}

function renderAfterSales(i) {
    const A = DATA.afterSales;

    const sites = [...new Set([...Object.keys(A.revenue.x), ...Object.keys(A.revenue.t)])];
    const xRev = sites.map(s => at(A.revenue.x[s], i)), tRev = sites.map(s => at(A.revenue.t[s], i));
    const hasRev = [...xRev, ...tRev].some(v => v != null);
    const revenueChart = hasRev ? chartBox({
        type: 'bar',
        data: {
            labels: sites,
            datasets: [
                { label: t('series.x'), data: xRev, backgroundColor: C.brand, borderRadius: 3, barThickness: 18 },
                { label: t('series.t'), data: tRev, backgroundColor: C.amber, borderRadius: 3, barThickness: 18 },
            ],
        },
        options: hOpts({
            scales: { x: { stacked: true, ...moneyTicks() }, y: { stacked: true } },
            plugins: { tooltip: { callbacks: { label: tipLabel('x', fmt.usd2) } } },
        }),
    }, 220) : notReported(i);

    const TYPES = [['repairOrder', C.brand], ['warranty', C.coral], ['rental', C.amber], ['internal', C.slate], ['pdi', C.teal]];
    const rows = Object.entries(A.repairs).flatMap(([s, bySite]) => Object.entries(bySite).map(([site, d]) => ({ label: `${t('series.' + s)} · ${site}`, d })));
    const totalCases = sum(rows.flatMap(r => TYPES.map(([k]) => at(r.d[k], i))));
    const hasRepairs = rows.some(r => TYPES.some(([k]) => at(r.d[k], i) != null));
    const repairChart = hasRepairs ? chartBox({
        type: 'bar',
        data: {
            labels: rows.map(r => r.label),
            datasets: TYPES.map(([k, color]) => ({ label: t('as.' + k), data: rows.map(r => at(r.d[k], i)), backgroundColor: color, borderRadius: 2, barThickness: 16 })),
        },
        options: hOpts({ scales: { x: { stacked: true }, y: { stacked: true } } }),
    }, rows.length * 30 + 70) : notReported(i);

    const revTotal = sumAt([...Object.values(A.revenue.x), ...Object.values(A.revenue.t)], i);

    return section('afterSales', t('nav.afterSales'), t('as.sub'), `
        ${card({ span: 4, title: t('as.revTitle', { week: weekId(i) }), sub: t('as.revSub', { amt: fmt.usd2(revTotal) }), body: revenueChart })}
        ${card({ span: 8, title: t('as.repTitle', { week: weekId(i) }), sub: t('as.repSub', { n: fmt.int(totalCases) }), body: repairChart })}
        ${card({ span: 12, title: t('as.actions'), body: `<ol class="actions">${A.nextActions.map(a => `<li>${esc(a)}</li>`).join('')}</ol>` })}
    `);
}

function renderFactory(i) {
    const Fc = DATA.factory;

    const stacked = (data, palette) => chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: Object.entries(data)
                .filter(([, d]) => d.some(v => v))  // hide lines with no output at all
                .map(([name, d], k) => ({ label: name, data: ser(d), backgroundColor: emph(palette[k % palette.length]), borderRadius: 2, maxBarThickness: 56 })),
        },
        options: weekOpts({
            scales: { x: { stacked: true }, y: { stacked: true } },
            plugins: { tooltip: { callbacks: { footer: items => `${t('common.total')}: ${sum(items.map(x => x.parsed.y))}` } } },
        }),
    }, 260);

    const batteryChart = chartBox({
        type: 'bar',
        data: {
            labels: weekAxis(),
            datasets: [
                { label: t('fac.repaired'), data: ser(Fc.batteryRepairs.repaired), backgroundColor: emph(C.teal), borderRadius: 3, maxBarThickness: 56 },
                { label: t('fac.failed'), data: ser(Fc.batteryRepairs.failed), backgroundColor: emph(C.coral), borderRadius: 3, maxBarThickness: 56 },
            ],
        },
        options: weekOpts({ scales: { x: { stacked: true }, y: { stacked: true } } }),
    }, 260);

    const status = listItems(Fc.status.map(s => ({ level: s.level, title: t('fac.' + s.key), text: esc(s.text) })));
    const inbound = listItems(Fc.inbound.map(x => ({
        level: x.level,
        title: `${esc(x.item)}${x.status ? `<span class="pill ${x.level === 'warn' ? 'warn' : ''}">${esc(x.status)}</span>` : ''}`,
        text: `${esc(x.supplier)} · ${esc(x.eta)}`,
    })));

    return section('factory', t('nav.factory'), t('fac.sub'), `
        ${card({ span: 4, title: t('fac.xTitle'), sub: t('fac.unitsSub'), body: stacked(Fc.xProduction, [C.brand, C.teal, C.navy]) })}
        ${card({ span: 4, title: t('fac.tTitle'), sub: t('fac.unitsSub'), body: stacked(Fc.tProduction, [C.navy, C.amber, C.violet, C.teal, C.sky]) })}
        ${card({ span: 4, title: t('fac.batTitle'), sub: t('fac.batSub'), body: batteryChart })}
        ${card({ span: 5, title: t('fac.statusTitle'), sub: t('fac.statusSub'), body: status })}
        ${card({ span: 7, title: t('fac.inboundTitle'), sub: t('fac.inboundSub'), body: inbound })}
    `);
}

/* ================================================================= RENDER */

function renderChrome(i) {
    const w = DATA.weeks[i];
    document.documentElement.lang = state.lang;
    document.title = `ONiON ${t('app.title')} · ${w.id}`;
    $('#appTitle').textContent = t('app.title');
    $('#reportMeta').innerHTML = t('app.meta', {
        report: esc(DATA.meta.report),
        week: `<b>${esc(w.id)}</b> · ${esc(w.label)}`,
        date: w.reportDate ? t('app.reported', { date: fmtDate(w.reportDate) }) : '',
    });

    const picker = $('#weekPicker');
    picker.setAttribute('aria-label', t('app.weekPicker'));
    picker.innerHTML = DATA.weeks.map((wk, j) => `<button type="button" data-week="${j}" aria-pressed="${j === i}" title="${esc(wk.label)}"><b>${esc(wk.id)}</b><span>${esc(wk.label)}</span></button>`).join('');

    const url = reportUrl(i), link = $('#reportLink');
    link.hidden = !url;
    if (url) { link.href = url; link.textContent = `${t('app.openReport')} ↗`; }

    $('#sectionNav').innerHTML = NAV.map(([id, key]) => `<a href="#${id}" data-nav="${id}">${t(key)}</a>`).join('');

    const langs = Object.keys(STRINGS), sel = $('#langSelect');
    sel.hidden = langs.length < 2;
    sel.innerHTML = langs.map(l => `<option value="${l}"${l === state.lang ? ' selected' : ''}>${LANG_NAMES[l] || l}</option>`).join('');

    $('#footer').innerHTML = `<div class="foot-grid">
        <div><h4>${t('foot.notes')}</h4><ul>${DATA.meta.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>
        <div><h4>${t('foot.source')}</h4><p>${t('foot.bundled')}</p>${sourceInfo.live ? `<p>${t('foot.live', { n: sourceInfo.live })}</p>` : ''}</div>
    </div>`;
}

function render() {
    charts.forEach(c => c.destroy());
    charts = [];
    pendingCharts = [];

    const i = state.week;
    $('#app').innerHTML = [renderOverview, renderFinance, renderSales, renderOperations, renderRental, renderAfterSales, renderFactory]
        .map(fn => fn(i)).join('');
    renderChrome(i);

    if (window.Chart) {
        pendingCharts.forEach(({ id, config }) => charts.push(new Chart(document.getElementById(id), config)));
    }
    updateNav();
}

function setWeek(j) {
    if (j < 0 || j >= DATA.weeks.length || j === state.week) return;
    state.week = j;
    render();
}

function showBanner(msg) {
    const b = $('#banner');
    b.textContent = msg;
    b.hidden = false;
}

function updateNav() {
    const y = window.scrollY + 140;
    let current = NAV[0][0];
    for (const [id] of NAV) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
    }
    document.querySelectorAll('#sectionNav a').forEach(a => a.classList.toggle('active', a.dataset.nav === current));
}

/* ========================================================== LIVE SOURCES */

function parseCSV(text) {
    const rows = [];
    let row = [], cell = '', quoted = false;
    for (let k = 0; k < text.length; k++) {
        const ch = text[k];
        if (quoted) {
            if (ch === '"' && text[k + 1] === '"') { cell += '"'; k++; }
            else if (ch === '"') quoted = false;
            else cell += ch;
        } else if (ch === '"') quoted = true;
        else if (ch === ',') { row.push(cell); cell = ''; }
        else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && text[k + 1] === '\n') k++;
            row.push(cell); rows.push(row); row = []; cell = '';
        } else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }

    const [head = [], ...body] = rows;
    const keys = head.map(h => h.trim().toLowerCase());
    return body
        .filter(r => r.some(c => c.trim()))
        .map(r => Object.fromEntries(keys.map((k, j) => [k, (r[j] ?? '').trim()])));
}

function toValue(raw) {
    if (raw === '' || raw === '-' || raw === '—') return null;
    const n = Number(raw.replace(/[$,%\s()]/g, ''));
    if (Number.isNaN(n) || !/\d/.test(raw)) return raw;
    const signed = /^\(.*\)$/.test(raw) ? -n : n;   // accounting brackets
    return raw.endsWith('%') ? signed / 100 : signed;
}

function weekIndex(id) {
    let j = DATA.weeks.findIndex(w => w.id === id);
    if (j === -1) { DATA.weeks.push({ id, label: id, reportDate: null, reportUrl: null }); j = DATA.weeks.length - 1; }
    return j;
}

function setIn(path, idx, value) {
    const keys = path.split('.');
    let o = DATA;
    keys.slice(0, -1).forEach((k, j) => {
        if (o[k] == null) o[k] = /^\d+$/.test(keys[j + 1]) ? [] : {};
        o = o[k];
    });
    const last = keys[keys.length - 1];
    if (idx == null) o[last] = value;
    else {
        if (!Array.isArray(o[last])) o[last] = [];
        o[last][idx] = value;
    }
}

function applyRows(rows) {
    for (const { path, week, value } of rows) {
        if (!path) continue;
        let v = toValue(value ?? '');
        if (typeof v === 'number' && path.endsWith('.cogs')) v = Math.abs(v);   // costs are stored positive
        if (path.startsWith('weeks.')) DATA.weeks[weekIndex(week)][path.slice(6)] = v;
        else setIn(path, week ? weekIndex(week) : null, v);
    }
}

async function loadSources() {
    const live = DATA_SOURCES.filter(s => s.url);
    const results = await Promise.allSettled(live.map(s =>
        fetch(s.url, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })));
    const failed = [];
    results.forEach((r, k) => {
        if (r.status === 'fulfilled') applyRows(parseCSV(r.value));
        else { failed.push(live[k].name || live[k].url); console.warn('Source failed:', live[k], r.reason); }
    });
    return { live: live.length - failed.length, failed };
}

/* ================================================================== INIT */

function bindEvents() {
    $('#weekPicker').addEventListener('click', e => {
        const btn = e.target.closest('button[data-week]');
        if (btn) setWeek(Number(btn.dataset.week));
    });
    $('#langSelect').addEventListener('change', e => {
        state.lang = e.target.value;
        try { localStorage.setItem('onion-dash-lang', state.lang); } catch { /* storage unavailable */ }
        render();
    });
    // ← / → step through weeks (handy when presenting)
    document.addEventListener('keydown', e => {
        if (e.target.closest('input, select, textarea') || e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowLeft') setWeek(state.week - 1);
        if (e.key === 'ArrowRight') setWeek(state.week + 1);
    });
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { updateNav(); ticking = false; });
    }, { passive: true });
}

async function init() {
    try {
        const saved = localStorage.getItem('onion-dash-lang');
        if (saved && STRINGS[saved]) state.lang = saved;
    } catch { /* storage unavailable */ }

    if (window.Chart) {
        Chart.defaults.font.family = 'Inter, "Noto Sans Khmer", system-ui, sans-serif';
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#5E6B85';
    } else {
        showBanner(t('banner.noChart'));
    }

    // Charts measure axis labels on creation, so wait for Inter to load first
    try { await document.fonts?.ready; } catch { /* fonts API unavailable */ }

    bindEvents();
    render();

    if (DATA_SOURCES.some(s => s.url)) {
        sourceInfo = await loadSources();
        if (sourceInfo.failed.length) showBanner(t('banner.failed', { names: sourceInfo.failed.join(', ') }));
        state.week = DATA.weeks.length - 1;
        render();
    }
}

init();
