const http = require('http');

const BASE_URL = 'http://localhost:5001/api';

const cpvcRows = {
    "COUPLER": {"1/2\"": 900, "3/4\"": 2820, "1\"": 2440, "11/4\"": 640, "11/2\"": 660, "2\"": 237, "21/2\"": 188, "3\"": 50, "4\"": 27},
    "ELBOW": {"1/2\"": 700, "3/4\"": 4650, "1\"": 2480, "11/4\"": 730, "11/2\"": 435, "2\"": 910, "21/2\"": 92, "3\"": 35, "4\"": 24},
    "SHOE": {"1/2\"": 250, "3/4\"": 1522, "1\"": 1053, "11/4\"": 474, "11/2\"": 375, "2\"": 150, "21/2\"": 80, "3\"": 30, "4\"": 4},
    "TEE": {"1/2\"": 300, "3/4\"": 3310, "1\"": 2550, "11/4\"": 470, "11/2\"": 600, "2\"": 88, "21/2\"": 83, "3\"": 25, "4\"": 6},
    "UNION": {"1/2\"": 30, "3/4\"": 1160, "1\"": 300, "11/4\"": 365, "11/2\"": 189, "2\"": 142, "21/2\"": 61, "3\"": 25},
    "END CAP": {"3/4\"": 612, "1\"": 600, "11/4\"": 1300, "11/2\"": 850, "2\"": 30, "21/2\"": 116, "3\"": 20, "4\"": 19},
    "M T A": {"1/2\"": 400, "3/4\"": 1700, "1\"": 860, "11/4\"": 640, "11/2\"": 220, "2\"": 90, "21/2\"": 85, "3\"": 55, "4\"": 25},
    "F T A": {"3/4\"": 1300, "1\"": 1685, "11/4\"": 550, "11/2\"": 200, "2\"": 230, "21/2\"": 64, "3\"": 55, "4\"": 4},
    "BALL VALVE": {"1/2\"": 75, "3/4\"": 420, "1\"": 58, "11/4\"": 125, "11/2\"": 84, "2\"": 50, "21/2\"": 6, "3\"": 2},
    "TANK NIPPLE": {"3/4\"": 160, "1\"": 200, "11/4\"": 120, "11/2\"": 100, "2\"": 50, "21/2\"": 13, "3\"": 7},
    "LONG BEND": {"3/4\"": 225, "1\"": 600, "11/4\"": 360, "11/2\"": 90, "2\"": 160, "3\"": 12},
    "FLANGE ADAPTER": {"21/2\"": 35, "3\"": 22, "4\"": 16},
    "CONCEALED VALVE": {"3/4\"": 170, "1\"": 111},
    "BY PASS BEND": {"3/4\"": 240, "1\"": 540, "11/4\"": 235, "11/2\"": 100, "2\"": 70},
    "PLUGS": {"1/2\"": 3360},
    "BRASS FTA": {"3/4\"": 200, "1\"": 200, "11/4\"": 60, "11/2\"": 45, "2\"": 12, "21/2\"": 18},
    "BRASS MTA": {"1/2\"": 100, "3/4\"": 450, "1\"": 270, "11/4\"": 166, "11/2\"": 59, "2\"": 108, "21/2\"": 50},
    "TREE WAY ELBOW": {"3/4\"": 100}
};

const cpvcReducerRows = {
    "TEE": {"3/4 X 1/2 \"": 240, "1 X1/2\"": 120, "1 X3/4\"": 658, "11/4 X3/4\"": 222, "11/4 X1\"": 353, "11/2 X3/4\"": 204, "11/2 X1\"": 339, "11/2 X 11/4\"": 300, "2 X 1\"": 202, "2 X 3/4\"": 135, "2 X 11/4\"": 104, "2 X 11/2\"": 120, "21/2 X 11/4\"": 43, "21/2 X 11/2\"": 48, "21/2 X 2\"": 40, "3 X2\"": 38, "4 X2 \"": 6},
    "MTA": {"3/4 X 1/2 \"": 225, "1 X3/4\"": 400},
    "BUSH": {"3/4 X 1/2 \"": 2200, "1 X3/4\"": 4200, "11/4 X3/4\"": 2325, "11/4 X1/2\"": 45, "11/4 X1\"": 1243, "11/2 X3/4\"": 300, "11/2 X1/2\"": 30, "11/2 X1\"": 475, "11/2 X 11/4\"": 497, "2 X 1\"": 434, "2 X 3/4\"": 220, "2 X 11/4\"": 391, "2 X 11/2\"": 280, "21/2 X 2\"": 105, "3 X2\"": 58, "3 X21/2\"": 47, "4 X2 \"": 22, "4 X 21/2\"": 55, "4 X3\"": 44, "6 X 4\"": 47, "8 X 6\"": 2},
    "REDUCER": {"3/4 X 1/2 \"": 1350, "1 X3/4\"": 2150, "11/4 X3/4\"": 1096, "11/4 X1\"": 530, "11/2 X3/4\"": 400, "11/2 X1\"": 850, "11/2 X 11/4\"": 500, "2 X 1\"": 400, "2 X 3/4\"": 248, "2 X 11/4\"": 240, "2 X 11/2\"": 290, "21/2 X 2\"": 122, "3 X2\"": 77, "3 X21/2\"": 26, "4 X2 \"": 26, "4 X 21/2\"": 40, "4 X3\"": 37, "6 X3\"": 1},
    "ELBOW": {"1 X3/4\"": 920, "11/4 X3/4\"": 118, "11/4 X1\"": 190, "11/2 X3/4\"": 344, "11/2 X1\"": 41},
    "BRASS ELBOW": {"3/4 X 1/2 \"": 4660, "1 X1/2\"": 582, "1 X3/4\"": 782},
    "BRASS MTA": {"3/4 X 1/2 \"": 2179, "1 X1/2\"": 333, "1 X3/4\"": 750},
    "BRASS FTA": {"3/4 X 1/2 \"": 2111, "1 X1/2\"": 708, "1 X3/4\"": 200},
    "BRASS TEE": {"3/4 X 1/2 \"": 2102, "1 X1/2\"": 396, "1 X3/4\"": 360, "3 X2\"": 2},
    "WALL MIXER": {"3/4 X 1/2 \"": 65, "1 X1/2\"": 153, "3X1\"": 3, "3 X2\"": 25, "4X1\"": 18, "4 X2 \"": 26, "4 X3\"": 9}
};

async function postData(path, data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const req = http.request(BASE_URL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user': 'admin',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ ok: res.statusCode === 201 || res.statusCode === 200, status: res.statusCode, body }));
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function getProducts() {
    return new Promise((resolve, reject) => {
        http.get(BASE_URL + '/products', (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
    });
}

async function seed() {
    console.log("Fetching existing products...");
    const allProds = await getProducts();
    
    let createdCount = 0;

    async function processCategory(subCategory, rowsObj) {
        for (const [itemName, sizes] of Object.entries(rowsObj)) {
            for (const [size, stock] of Object.entries(sizes)) {
                const name = `${subCategory} ${itemName} ${size}`;
                const existing = allProds.find(p => p.name === name || (p.subCategory === subCategory && p.size === size && p.name.includes(itemName)));

                if (existing) {
                    console.log(`Exists: ${name}`);
                } else {
                    console.log(`Creating: ${name} with stock ${stock}`);
                    const payload = {
                        category: 'fitting',
                        subCategory: subCategory,
                        name: name,
                        size: size,
                        stock: stock,
                        location: "SHOP"
                    };
                    
                    const res = await postData('/products', payload);
                    if (res.ok) {
                        createdCount++;
                    } else {
                        console.error("Error creating:", name, res.body);
                    }
                }
            }
        }
    }

    await processCategory('CPVC FITTINGS', cpvcRows);
    await processCategory('CPVC REDUCER FITTINGS', cpvcReducerRows);
    
    console.log(`Done! Created ${createdCount} new fittings.`);
}

seed();
