/**
 * seed_fittings2.js
 * Run: node seed_fittings2.js
 * Seeds UPVC Reducer, SWR, and SWR Reducer fitting data.
 */

const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const BASE_URL = 'http://localhost:5001/api';
const HEADERS = { 'Content-Type': 'application/json', 'x-user': 'admin' };

// ─────────────────────────────────────────────────────────────────────────────
// UPVC REDUCER FITTINGS
// Columns: R TEE, R MTA, R FTA, R BUSH, REDUCER, ELBOW, BRASS ELBOW, BRASS MTA, BRASS FTA, BRASS TEE
// ─────────────────────────────────────────────────────────────────────────────
const upvcReducerFittings = [
    // size:  { 'R TEE': x, 'R MTA': x, 'R FTA': x, 'R BUSH': x, 'REDUCER': x, 'ELBOW': x, 'BRASS ELBOW': x, 'BRASS MTA': x, 'BRASS FTA': x, 'BRASS TEE': x }
    { size: '3/4 X 1/2"',  stocks: { 'R TEE': 172, 'R MTA': 386, 'R FTA': 400, 'R BUSH': 1200, 'ELBOW': 400, 'BRASS TEE': 120 } },
    { size: '1X1/2"',      stocks: { 'R TEE': 120, 'R MTA': 230, 'R FTA': 280, 'R BUSH': 200, 'ELBOW': 300, 'BRASS TEE': 120 } },
    { size: '1X3/4"',      stocks: { 'R TEE': 20, 'R BUSH': 875, 'REDUCER': 150, 'ELBOW': 200, 'BRASS ELBOW': 279, 'BRASS TEE': 115 } },
    { size: '11/4X3/4"',   stocks: { 'R BUSH': 250, 'REDUCER': 220, 'BRASS TEE': 276 } },
    { size: '11/4X1/2"',   stocks: { 'R BUSH': 240, 'REDUCER': 120, 'BRASS TEE': 175 } },
    { size: '11/4X1"',     stocks: { 'R BUSH': 530, 'REDUCER': 230, 'BRASS TEE': 140 } },
    { size: '11/2X3/4"',   stocks: { 'R BUSH': 320, 'REDUCER': 140, 'BRASS TEE': 146 } },
    { size: '11/2X1/2"',   stocks: { 'REDUCER': 90, 'BRASS TEE': 120 } },
    { size: '11/2X1"',     stocks: { 'R BUSH': 217, 'REDUCER': 179, 'BRASS TEE': 122 } },
    { size: '11/2X11/4"',  stocks: { 'R BUSH': 286, 'REDUCER': 100, 'BRASS TEE': 111 } },
    { size: '2X1"',        stocks: { 'R BUSH': 184, 'REDUCER': 105, 'BRASS TEE': 103 } },
    { size: '2X3/4"',      stocks: { 'R BUSH': 200, 'REDUCER': 100, 'BRASS TEE': 168 } },
    { size: '2X1/2"',      stocks: { 'R BUSH': 20 } },
    { size: '2X11/4"',     stocks: { 'R BUSH': 74, 'REDUCER': 138, 'BRASS TEE': 70 } },
    { size: '2X11/2"',     stocks: { 'R BUSH': 330, 'REDUCER': 149, 'ELBOW': 80, 'BRASS TEE': 144 } },
    { size: '21/2X3/4"',   stocks: { 'BRASS TEE': 27 } },
    { size: '21/2X11/4"',  stocks: { 'R BUSH': 47, 'REDUCER': 59, 'BRASS TEE': 49 } },
    { size: '21/2X11/2"',  stocks: { 'R BUSH': 120, 'REDUCER': 65, 'BRASS TEE': 78 } },
    { size: '21/2X2"',     stocks: { 'R BUSH': 192, 'REDUCER': 48, 'BRASS TEE': 30 } },
    // Larger sizes (from image 1)
    { size: '3X1"',        stocks: { 'BRASS TEE': 3 } },
    { size: '3X2"',        stocks: { 'R BUSH': 58, 'REDUCER': 77, 'BRASS TEE': 26 } },
    { size: '3X21/2"',     stocks: { 'R BUSH': 47, 'REDUCER': 26 } },
    { size: '4X1"',        stocks: { 'BRASS TEE': 18 } },
    { size: '4X2"',        stocks: { 'R BUSH': 22, 'REDUCER': 26, 'BRASS TEE': 26 } },
    { size: '4X21/2"',     stocks: { 'R BUSH': 55, 'REDUCER': 40 } },
    { size: '4X3"',        stocks: { 'R BUSH': 44, 'REDUCER': 37, 'BRASS TEE': 9 } },
    { size: '6X3"',        stocks: { 'REDUCER': 1 } },
    { size: '6X4"',        stocks: { 'R BUSH': 47 } },
    { size: '8X6"',        stocks: { 'R BUSH': 2 } },
];

// ─────────────────────────────────────────────────────────────────────────────
// SWR FITTINGS
// Sizes: 11/4", 11/2", 2", 21/2", 3", 4", 5", 6", 7"
// ─────────────────────────────────────────────────────────────────────────────
const swrFittings = [
    { item: 'COUPLER',                   stocks: { '21/2"':1890,'3"':141,'4"':1442,'6"':108 } },
    { item: 'PLAIN BEND',                stocks: { '21/2"':1035,'3"':305,'4"':840,'5"':34,'6"':137 } },
    { item: 'DOOR BEND',                 stocks: { '21/2"':378,'3"':203,'4"':463,'5"':62,'6"':72 } },
    { item: 'PLAIN TEE',                 stocks: { '21/2"':895,'3"':200,'4"':347,'6"':20 } },
    { item: 'DOOR TEE',                  stocks: { '11/2"':108,'21/2"':630,'3"':120,'4"':185,'6"':35 } },
    { item: 'CLAMPS',                    stocks: { '11/2"':150,'21/2"':2674,'3"':726,'4"':1220,'6"':200 } },
    { item: 'CROSS TEE',                 stocks: { '4"':56 } },
    { item: 'NAHANI TRAP',               stocks: { '2"':60,'21/2"':574,'3"':89 } },
    { item: 'SHOE',                      stocks: { '11/2"':125,'21/2"':404,'3"':200,'4"':488,'6"':44 } },
    { item: 'M TRAP',                    stocks: { '4"':118,'5"':160,'7"':216 } },
    { item: 'VENT COWL',                 stocks: { '2"':238,'21/2"':447,'3"':160,'4"':305,'6"':150 } },
    { item: 'PLAIN Y',                   stocks: { '11/4"':120,'11/2"':100,'21/2"':618,'3"':128,'4"':235,'6"':34 } },
    { item: 'DOOR Y',                    stocks: { '21/2"':369,'4"':212 } },
    { item: 'DOUBLE Y',                  stocks: { '21/2"':49,'4"':21 } },
    { item: 'DOUBLE DOOR Y',             stocks: { '21/2"':39,'4"':14 } },
    { item: 'P TRAP',                    stocks: { '21/2"':65,'4"':52,'5"':44 } },
    { item: 'CLENING PIPE',              stocks: { '21/2"':187,'4"':121,'6"':45 } },
    { item: 'GULLY TRAP',                stocks: { '4"':77 } },
    { item: 'ROOF CORNER',               stocks: { '4"':100 } },
    { item: 'CLEAN OUT',                 stocks: { '21/2"':150 } },
    { item: 'DOOR CAP',                  stocks: { '4"':125 } },
    { item: 'SOCKET PLUGS',              stocks: { '11/4"':500,'11/2"':1200 } },
    { item: 'BALCONY DRAIN',             stocks: { '21/2"':40 } },
    { item: 'BACK FLOW PREVENTION VALVE',stocks: {} },
];

// ─────────────────────────────────────────────────────────────────────────────
// SWR REDUCER FITTINGS
// Sizes: 4X11/2", 4X21/2", 4X4", 5X4", 6X4"
// ─────────────────────────────────────────────────────────────────────────────
const swrReducerFittings = [
    { item: 'FLOOR TRAP',   stocks: { '4X21/2"':46 } },
    { item: 'REDUCER Y',    stocks: { '4X21/2"':171,'6X4"':78 } },
    { item: 'P TRAP',       stocks: {} },
    { item: 'ECC BUSH',     stocks: { '4X11/2"':35,'4X21/2"':265 } },
    { item: 'ECC REDUCER',  stocks: {} },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function createProduct(data) {
    const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`POST /products failed (${res.status}): ${err}`);
    }
    return res.json();
}

async function seedBatch(label, subCategory, products) {
    console.log(`\n📦 Processing: ${label}`);
    console.log(`   → ${products.length} products to create`);
    let created = 0, failed = 0;
    for (const p of products) {
        try {
            await createProduct(p);
            process.stdout.write('.');
            created++;
        } catch (err) {
            process.stdout.write('✗');
            console.error(`\n   ❌ Failed: ${p.name} — ${err.message}`);
            failed++;
        }
    }
    console.log('');
    return { created, failed };
}

async function seedAll() {
    console.log('🚀 Starting fittings seed (batch 2)...\n');
    let totalCreated = 0, totalFailed = 0;

    // ── UPVC Reducer Fittings ──
    {
        const products = [];
        for (const row of upvcReducerFittings) {
            for (const [itemType, stockVal] of Object.entries(row.stocks)) {
                if (!stockVal) continue;
                products.push({
                    category: 'fitting',
                    subCategory: 'UPVC REDUCER FITTINGS',
                    name: `${itemType} ${row.size}`,
                    size: row.size,
                    stock: stockVal,
                    lowStockLimit: 10,
                });
            }
        }
        const r = await seedBatch('UPVC REDUCER FITTINGS', 'UPVC REDUCER FITTINGS', products);
        totalCreated += r.created; totalFailed += r.failed;
    }

    // ── SWR Fittings ──
    {
        const products = [];
        for (const fitting of swrFittings) {
            for (const [size, stockVal] of Object.entries(fitting.stocks)) {
                if (!stockVal) continue;
                products.push({
                    category: 'fitting',
                    subCategory: 'SWR FITTINGS',
                    name: `${fitting.item} ${size}`,
                    size,
                    stock: stockVal,
                    lowStockLimit: 10,
                });
            }
            if (Object.keys(fitting.stocks).length === 0) {
                products.push({
                    category: 'fitting',
                    subCategory: 'SWR FITTINGS',
                    name: fitting.item,
                    size: '',
                    stock: 0,
                    lowStockLimit: 10,
                });
            }
        }
        const r = await seedBatch('SWR FITTINGS', 'SWR FITTINGS', products);
        totalCreated += r.created; totalFailed += r.failed;
    }

    // ── SWR Reducer Fittings ──
    {
        const products = [];
        for (const fitting of swrReducerFittings) {
            for (const [size, stockVal] of Object.entries(fitting.stocks)) {
                if (!stockVal) continue;
                products.push({
                    category: 'fitting',
                    subCategory: 'SWR REDUCER FITTINGS',
                    name: `${fitting.item} ${size}`,
                    size,
                    stock: stockVal,
                    lowStockLimit: 10,
                });
            }
            if (Object.keys(fitting.stocks).length === 0) {
                products.push({
                    category: 'fitting',
                    subCategory: 'SWR REDUCER FITTINGS',
                    name: fitting.item,
                    size: '',
                    stock: 0,
                    lowStockLimit: 10,
                });
            }
        }
        const r = await seedBatch('SWR REDUCER FITTINGS', 'SWR REDUCER FITTINGS', products);
        totalCreated += r.created; totalFailed += r.failed;
    }

    console.log(`\n\n✅ Done! Created: ${totalCreated}, Failed: ${totalFailed}`);
}

seedAll().catch(console.error);
