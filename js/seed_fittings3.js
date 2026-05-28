/**
 * seed_fittings3.js - PVC FITTINGS
 * Run: node seed_fittings3.js
 */

const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const BASE_URL = 'http://localhost:5001/api';
const HEADERS = { 'Content-Type': 'application/json', 'x-user': 'admin' };

// ─────────────────────────────────────────────────────────────────────────────
// PVC FITTINGS
// Sizes: 1/2", 3/4", 1", 11/4", 11/2", 2", 21/2", 3", 4", 5", 6", 7", 8", 10", 12"
// ─────────────────────────────────────────────────────────────────────────────
const pvcFittings = [
    { item: 'ELBOW 16 KG',      stocks: {} },
    { item: 'ELBOW 10 KG',      stocks: { '1/2"':350,'3/4"':1700,'1"':1485,'11/4"':567,'11/2"':268,'2"':589,'21/2"':59,'3"':34,'4"':193 } },
    { item: 'ELBOW 6 KG',       stocks: { '11/4"':1444,'11/2"':881,'2"':303,'21/2"':294,'3"':193,'4"':52,'5"':84,'6"':37,'7"':12,'8"':16,'12"':6 } },
    { item: 'ELBOW 4 KG',       stocks: { '2"':272,'21/2"':261,'3"':480,'4"':90,'5"':54,'6"':39,'8"':10,'12"':16 } },
    { item: 'TEE 6 KG',         stocks: { '11/4"':1460,'11/2"':470,'2"':243,'21/2"':142,'3"':122,'4"':93,'5"':68,'6"':51,'7"':8,'8"':13,'12"':7 } },
    { item: 'TEE 4 KG',         stocks: { '11/2"':168,'2"':221,'21/2"':135,'3"':132,'4"':46,'5"':42,'8"':16,'10"':10 } },
    { item: 'MTA',               stocks: { '1/2"':990,'3/4"':2900,'1"':570,'11/4"':315,'11/2"':584,'2"':677,'21/2"':243,'3"':169,'4"':24,'5"':11,'6"':7 } },
    { item: 'F T A',             stocks: { '1/2"':1115,'3/4"':1390,'1"':575,'11/4"':615,'11/2"':322,'2"':390,'21/2"':74,'3"':73,'4"':164,'5"':17,'6"':17 } },
    { item: 'END CAP 10KG',      stocks: { '1/2"':1985,'3/4"':2335,'1"':898 } },
    { item: 'END CAP 6KG',       stocks: { '11/4"':2482,'11/2"':450,'2"':436,'21/2"':339,'3"':176,'4"':298,'6"':93,'7"':129,'8"':98,'10"':10,'12"':4 } },
    { item: 'END CAP 4KG',       stocks: { '3"':114,'4"':53,'6"':111 } },
    { item: 'TH END CAP 6KG',    stocks: { '1/2"':600,'3/4"':900,'1"':1600,'11/4"':275,'11/2"':350,'2"':140,'21/2"':150,'3"':150,'4"':56 } },
    { item: 'TH ELBOW 6KG',      stocks: {} },
    { item: 'BENDS 4KG',         stocks: { '11/2"':329,'2"':189,'21/2"':122,'3"':38,'4"':16,'5"':20,'8"':11,'10"':5 } },
    { item: 'BENDS 6KG',         stocks: { '11/4"':290,'11/2"':76,'2"':200,'21/2"':120,'3"':79,'4"':71,'5"':24,'6"':11,'7"':3,'8"':8,'10"':3 } },
    { item: 'BENDS 10KG',        stocks: { '3/4"':340,'1"':880,'3"':20 } },
    { item: 'BENDS 15KG',        stocks: { '11/4"':48,'11/2"':50 } },
    { item: 'COUPLER 10KG',      stocks: { '1/2"':1940,'3/4"':1474,'1"':927,'11/4"':112,'11/2"':288,'2"':435,'21/2"':110,'3"':36,'4"':31 } },
    { item: 'COUPLER 6KG',       stocks: { '11/4"':1197,'11/2"':900,'2"':420,'21/2"':482,'3"':304,'4"':251,'8"':26 } },
    { item: 'COUPLER 4KG',       stocks: { '1"':70,'11/4"':32,'11/2"':30,'2"':185,'21/2"':400,'3"':402,'4"':155 } },
    { item: 'UNION',             stocks: {} },
    { item: 'SHOES 4KG',         stocks: { '5"':83,'6"':28,'8"':12 } },
    { item: 'SHOES 6KG',         stocks: { '11/4"':751,'11/2"':1722,'2"':332,'21/2"':177,'3"':88,'4"':153,'6"':25,'8"':23 } },
    { item: 'SHOES 10KG',        stocks: { '1"':1120,'11/2"':450,'2"':248,'21/2"':70 } },
    { item: 'BALL VALVE',        stocks: {} },
    { item: 'PVC Y 6 KG',        stocks: { '11/4"':55,'5"':27,'6"':10,'8"':10 } },
    { item: 'PVC Y 4KG',         stocks: {} },
    { item: 'LEAKAGE COUPLER',   stocks: { '11/2"':58,'2"':45,'21/2"':162,'3"':20,'5"':28 } },
    { item: 'CROSS TEE 6 KG',    stocks: { '2"':61,'21/2"':42,'3"':36 } },
    { item: 'PVC FLANGE',        stocks: { '2"':37,'4"':2 } },
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

async function seedAll() {
    console.log('🚀 Starting PVC Fittings seed...\n');

    const products = [];
    for (const fitting of pvcFittings) {
        for (const [size, stockVal] of Object.entries(fitting.stocks)) {
            if (!stockVal) continue;
            products.push({
                category: 'fitting',
                subCategory: 'PVC FITTINGS',
                name: `${fitting.item} ${size}`,
                size,
                stock: stockVal,
                lowStockLimit: 10,
            });
        }
        if (Object.keys(fitting.stocks).length === 0) {
            products.push({
                category: 'fitting',
                subCategory: 'PVC FITTINGS',
                name: fitting.item,
                size: '',
                stock: 0,
                lowStockLimit: 10,
            });
        }
    }

    console.log(`📦 PVC FITTINGS → ${products.length} products to create`);
    let created = 0, failed = 0;
    for (const p of products) {
        try {
            await createProduct(p);
            process.stdout.write('.');
            created++;
        } catch (err) {
            process.stdout.write('✗');
            console.error(`\n❌ Failed: ${p.name} — ${err.message}`);
            failed++;
        }
    }

    console.log(`\n\n✅ Done! Created: ${created}, Failed: ${failed}`);
}

seedAll().catch(console.error);
