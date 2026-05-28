/**
 * seed_fittings.js
 * Run: node seed_fittings.js
 * Seeds all CPVC, UPVC, and CPVC Reducer fitting data into the local API.
 */

const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const BASE_URL = 'http://localhost:5001/api';
const HEADERS = { 'Content-Type': 'application/json', 'x-user': 'admin' };

// ─────────────────────────────────────────────────────────────────────────────
// DATA FROM EXCEL SHEETS
// ─────────────────────────────────────────────────────────────────────────────

// CPVC FITTINGS
// Sizes: 1/2", 3/4", 1", 11/4", 11/2", 2", 21/2", 3", 4", 6"
const cpvcFittings = [
    { item: 'COUPLER',         stocks: { '1/2"':900,'3/4"':2820,'1"':2440,'11/4"':640,'11/2"':660,'2"':237,'21/2"':188,'3"':50,'4"':27 } },
    { item: 'ELBOW',           stocks: { '1/2"':700,'3/4"':4650,'1"':2480,'11/4"':730,'11/2"':435,'2"':910,'21/2"':92,'3"':35,'4"':24 } },
    { item: 'SHOE',            stocks: { '1/2"':250,'3/4"':1522,'1"':1053,'11/4"':474,'11/2"':375,'2"':150,'21/2"':80,'3"':30,'4"':4 } },
    { item: 'TEE',             stocks: { '1/2"':300,'3/4"':3310,'1"':2550,'11/4"':470,'11/2"':600,'2"':88,'21/2"':83,'3"':25,'4"':6 } },
    { item: 'UNION',           stocks: { '1/2"':30,'3/4"':1160,'1"':300,'11/4"':365,'11/2"':189,'2"':142,'21/2"':61,'3"':25 } },
    { item: 'END CAP',         stocks: { '3/4"':612,'1"':600,'11/4"':1300,'11/2"':850,'2"':30,'21/2"':116,'3"':20,'4"':19 } },
    { item: 'M T A',           stocks: { '1/2"':400,'3/4"':1700,'1"':860,'11/4"':640,'11/2"':220,'2"':90,'21/2"':85,'3"':55,'4"':25 } },
    { item: 'F T A',           stocks: { '3/4"':1300,'1"':1685,'11/4"':550,'11/2"':200,'2"':230,'21/2"':64,'3"':55,'4"':4 } },
    { item: 'BALL VALVE',      stocks: { '1/2"':75,'3/4"':420,'1"':58,'11/4"':125,'11/2"':84,'2"':50,'21/2"':6,'3"':2 } },
    { item: 'TANK NIPPLE',     stocks: { '3/4"':160,'1"':200,'11/4"':120,'11/2"':100,'2"':50,'21/2"':13,'3"':7 } },
    { item: 'LONG BEND',       stocks: { '3/4"':225,'1"':600,'11/4"':360,'11/2"':90,'2"':160,'3"':12 } },
    { item: 'FLANGE ADAPTER',  stocks: { '21/2"':35,'3"':22,'4"':16 } },
    { item: 'CONCEALED VALVE', stocks: { '3/4"':170,'1"':111 } },
    { item: 'BY PASS BEND',    stocks: { '3/4"':240,'1"':540,'11/4"':235,'11/2"':100,'2"':70 } },
    { item: 'PLUGS',           stocks: { '1/2"':3360 } },
    { item: 'X NIPPLES',       stocks: {} },
];

// UPVC FITTINGS
// Sizes: 1/2", 3/4", 1", 11/4", 11/2", 2", 21/2", 3", 4", 6", 8"
const upvcFittings = [
    { item: 'COUPLER',          stocks: { '1/2"':750,'3/4"':3523,'1"':2070,'11/4"':1474,'11/2"':726,'2"':614,'21/2"':64,'3"':45,'4"':39 } },
    { item: 'ELBOW',            stocks: { '1/2"':250,'3/4"':2972,'1"':1647,'11/4"':848,'11/2"':436,'2"':500,'21/2"':156,'3"':26,'4"':20 } },
    { item: 'SHOE',             stocks: { '1/2"':250,'3/4"':2537,'1"':1036,'11/4"':564,'11/2"':335,'2"':173,'21/2"':86,'3"':30,'4"':6 } },
    { item: 'TEE',              stocks: { '1/2"':250,'3/4"':2279,'1"':1643,'11/4"':420,'11/2"':463,'2"':199,'21/2"':67,'3"':30,'4"':17,'8"':1 } },
    { item: 'UNION',            stocks: { '1/2"':30,'3/4"':1060,'1"':195,'11/4"':332,'11/2"':144,'2"':126,'21/2"':53,'3"':25 } },
    { item: 'END CAP',          stocks: { '3/4"':2078,'1"':297,'11/4"':1071,'11/2"':844,'2"':62,'21/2"':116,'3"':32,'4"':19 } },
    { item: 'M T A',            stocks: { '1/2"':400,'3/4"':1972,'1"':380,'11/4"':610,'11/2"':220,'2"':246,'21/2"':128,'3"':41,'4"':19 } },
    { item: 'F T A',            stocks: { '3/4"':1289,'1"':1686,'11/4"':530,'11/2"':292,'2"':210,'21/2"':79,'3"':44,'4"':16 } },
    { item: 'BALL VALVE',       stocks: { '1/2"':75,'3/4"':420,'1"':175,'11/4"':179,'11/2"':109,'2"':50,'21/2"':5,'3"':2 } },
    { item: 'TANK NIPPLE',      stocks: { '3/4"':150,'1"':150,'11/4"':70,'11/2"':80,'2"':50,'21/2"':13,'3"':7 } },
    { item: 'LONG BEND',        stocks: { '3/4"':185,'1"':195,'11/4"':216,'11/2"':50,'2"':160,'4"':11 } },
    { item: 'FLANGE ADAPTER',   stocks: { '11/2"':20,'2"':47,'21/2"':50,'3"':18,'4"':30 } },
    { item: 'CONCEALED VALVE',  stocks: { '3/4"':49,'1"':117 } },
    { item: 'BY PASS BEND',     stocks: { '3/4"':421,'1"':380,'11/4"':170,'11/2"':90,'2"':70 } },
    { item: 'CROSS TEE',        stocks: {} },
    { item: 'PLUGS',            stocks: { '1/2"':2348 } },
    { item: 'X NIPPLES',        stocks: {} },
    { item: 'TH END CAP',       stocks: {} },
    { item: 'VAN STONE FLANGES',stocks: { '11/4"':62,'11/2"':80,'2"':72,'21/2"':77,'3"':71,'4"':38 } },
    { item: 'BRASS ELBOW',      stocks: {} },
    { item: 'BRASS FTA',        stocks: { '3/4"':700,'1"':200,'11/4"':118,'11/2"':85,'2"':35,'21/2"':18 } },
    { item: 'BRASS MTA',        stocks: { '3/4"':700,'1"':240,'11/4"':184,'11/2"':31,'2"':96,'21/2"':50 } },
    { item: 'BALL VALVE BRASS', stocks: {} },
];

// CPVC REDUCER FITTINGS (Plastic section)
// Sizes by row label. Sub-sizes as column names.
// The first image is partially visible, showing sizes like 21/2 X 11/4", 3 X 2" etc.
// Full data from the screenshot:
const cpvcReducerFittings = [
    // Plastic section: TEE, MTA, FTA, BUSH, REDUCER, ELBOW
    { item: 'TEE',     stocks: { '3/4 X 1/2"':240,'1 X 1/2"':120,'1 X 3/4"':658,'11/4 X 3/4"':222,'11/4 X 1"':353,'11/2 X 3/4"':204,'11/2 X 1"':339,'11/2 X 11/4"':300,'2 X 1"':202,'2 X 3/4"':135,'2 X 11/4"':104,'2 X 11/2"':120 } },
    { item: 'MTA',     stocks: { '3/4 X 1/2"':225,'1 X 3/4"':400 } },
    { item: 'FTA',     stocks: {} },
    { item: 'BUSH',    stocks: { '3/4 X 1/2"':2200,'1 X 1/2"':0,'1 X 3/4"':4200,'11/4 X 3/4"':2325,'11/4 X 1/2"':45,'11/4 X 1"':1243,'11/2 X 3/4"':300,'11/2 X 1/2"':30,'11/2 X 1"':475,'11/2 X 11/4"':497,'2 X 1"':434,'2 X 3/4"':220,'2X1/2"':0,'2 X 11/4"':391,'2 X 11/2"':280 } },
    { item: 'REDUCER', stocks: { '3/4 X 1/2"':1350,'1 X 1/2"':0,'1 X 3/4"':2150,'11/4 X 3/4"':1096,'11/4 X 1"':530,'11/2 X 3/4"':400,'11/2 X 1"':850,'11/2 X 11/4"':500,'2 X 1"':400,'2 X 3/4"':248,'2 X 11/4"':240,'2 X 11/2"':290 } },
    { item: 'ELBOW',   stocks: { '1 X 3/4"':920,'11/4 X 3/4"':118,'11/4 X 1"':190,'11/2 X 3/4"':344,'11/2 X 1"':41 } },
    // Brass section
    { item: 'BRASS ELBOW', stocks: { '3/4 X 1/2"':4660,'1 X 1/2"':582,'1 X 3/4"':782 } },
    { item: 'BRASS MTA',   stocks: { '3/4 X 1/2"':2179,'1 X 1/2"':333,'1 X 3/4"':750 } },
    { item: 'BRASS FTA',   stocks: { '3/4 X 1/2"':2111,'1 X 1/2"':708,'1 X 3/4"':200 } },
    { item: 'BRASS TEE',   stocks: { '3/4 X 1/2"':2102,'1 X 1/2"':396,'1 X 3/4"':360 } },
    { item: 'WALL MIXER',  stocks: { '3/4 X 1/2"':65,'1 X 1/2"':153 } },
];

// From image 1 (top): appears to be more reducer fittings (larger sizes)
const cpvcReducerLargeFittings = [
    { item: 'TEE',     stocks: { '21/2 X 11/4"':43,'21/2 X 11/2"':48,'21/2 X 2"':40,'3 X 2"':30,'4 X 2"':6 } },
    { item: 'REDUCER', stocks: { '21/2 X 2"':105,'3 X 2"':60,'3 X 21/2"':27,'4 X 2"':26,'4 X 3"':28 } },
    { item: 'ELBOW',   stocks: { '21/2 X 2"':122,'3 X 2"':55,'3 X 21/2"':50,'4 X 2"':12,'4 X 3"':10 } },
    // Other items from same table
    { item: 'BRASS MTA',stocks: { '21/2 X 2"':2 } },
];

// From image 3 (bottom): TH END CAP, BRASS ELBOW, BRASS FTA, BRASS MTA (different sizes), CPVC TREE WAY ELBOW
// These appear to be CPVC fittings with sizes 1/2", 3/4", 1", 11/4", 11/2", 2", 21/2"
const cpvcMiscFittings = [
    { item: 'TH END CAP',           stocks: {} },
    { item: 'BRASS ELBOW',          stocks: {} },
    { item: 'BRASS FTA',            stocks: { '3/4"':200,'1"':200,'11/4"':60,'11/2"':45,'2"':12,'21/2"':18 } },
    { item: 'BRASS MTA',            stocks: { '1/2"':100,'3/4"':450,'1"':270,'11/4"':166,'11/2"':59,'2"':108,'21/2"':50 } },
    { item: '3/4"CPVC TREE WAY ELBOW', stocks: { '3/4"':100 } },
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

function buildProducts(subCategory, fittingsList) {
    const products = [];
    for (const fitting of fittingsList) {
        for (const [size, stockVal] of Object.entries(fitting.stocks)) {
            if (stockVal === 0 || stockVal === undefined) continue;
            products.push({
                category: 'fitting',
                subCategory,
                name: `${fitting.item} ${size}`,
                size,
                stock: stockVal,
                lowStockLimit: 10,
            });
        }
        // If no sizes (empty stocks), still add a placeholder product with 0 stock
        if (Object.keys(fitting.stocks).length === 0) {
            products.push({
                category: 'fitting',
                subCategory,
                name: fitting.item,
                size: '',
                stock: 0,
                lowStockLimit: 10,
            });
        }
    }
    return products;
}

async function seedAll() {
    console.log('🚀 Starting fitting data seed...\n');
    
    const allBatches = [
        { label: 'CPVC FITTINGS', subCat: 'CPVC FITTINGS', list: cpvcFittings },
        { label: 'UPVC FITTINGS', subCat: 'UPVC FITTINGS', list: upvcFittings },
        { label: 'CPVC REDUCER FITTINGS', subCat: 'CPVC REDUCER FITTINGS', list: cpvcReducerFittings },
        { label: 'CPVC REDUCER FITTINGS (Large)', subCat: 'CPVC REDUCER FITTINGS', list: cpvcReducerLargeFittings },
        { label: 'CPVC MISC FITTINGS', subCat: 'CPVC FITTINGS', list: cpvcMiscFittings },
    ];

    let totalCreated = 0;
    let totalFailed = 0;

    for (const batch of allBatches) {
        console.log(`\n📦 Processing: ${batch.label}`);
        const products = buildProducts(batch.subCat, batch.list);
        console.log(`   → ${products.length} products to create`);
        
        for (const product of products) {
            try {
                await createProduct(product);
                process.stdout.write('.');
                totalCreated++;
            } catch (err) {
                process.stdout.write('✗');
                console.error(`\n   ❌ Failed: ${product.name} — ${err.message}`);
                totalFailed++;
            }
        }
        console.log('');
    }

    console.log(`\n\n✅ Done! Created: ${totalCreated}, Failed: ${totalFailed}`);
}

seedAll().catch(console.error);
