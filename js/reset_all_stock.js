/**
 * reset_all_stock.js
 * Sets every product's stock to 0 and clears all units.
 * Run: node reset_all_stock.js
 */

const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const BASE_URL = 'http://localhost:5001/api';
const HEADERS = { 'Content-Type': 'application/json', 'x-user': 'admin' };

async function resetAll() {
    console.log('🔄 Fetching all products...');
    const res = await fetch(`${BASE_URL}/products`, { headers: HEADERS });
    const products = await res.json();
    console.log(`📦 Found ${products.length} products. Resetting all to 0...\n`);

    let done = 0, failed = 0;

    for (const product of products) {
        const id = product._id || product.id;
        try {
            const r = await fetch(`${BASE_URL}/products/${id}`, {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify({ stock: 0, units: [] }),
            });
            if (!r.ok) throw new Error(await r.text());
            process.stdout.write('.');
            done++;
        } catch (err) {
            process.stdout.write('✗');
            console.error(`\n❌ Failed: ${product.name} — ${err.message}`);
            failed++;
        }
    }

    console.log(`\n\n✅ Done! Reset: ${done}, Failed: ${failed}`);
}

resetAll().catch(console.error);
