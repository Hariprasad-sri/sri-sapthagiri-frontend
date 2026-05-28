const data = [
  { size: '1/2"', weights: { '10KG': 197, '15KG': 94 } },
  { size: '3/4"', weights: { '10KG': 619, '15KG': 84 } },
  { size: '1"', weights: { '10KG': 391, '15KG': 87 } },
  { size: '1 1/4"', weights: { '6KG': 290, '10KG': 99, '15KG': 22 } },
  { size: '1 1/2"', weights: { '6KG': 231, '10KG': 32, '15KG': 40 } },
  { size: '2"', weights: { '4KG': 260, '6KG': 150, '10KG': 27 } },
  { size: '2 1/2"', weights: { '4KG': 96, '6KG': 107 } },
  { size: '3"', weights: { '4KG': 104, '6KG': 23, '10KG': 20 } },
  { size: '4"', weights: { '4KG': 50, '6KG': 34 } },
  { size: '5"', weights: { '4KG': 25, '6KG': 38 } },
  { size: '6"', weights: { '4KG': 19, '6KG': 25 } },
  { size: '7"', weights: { '6KG': 131 } },
  { size: '8"', weights: { '4KG': 19, '6KG': 14 } },
  { size: '10"', weights: { '4KG': 44, '6KG': 38 } },
  { size: '12"', weights: { '4KG': 2, '6KG': 3 } }
];

async function seed() {
  for (const item of data) {
    for (const [weight, stock] of Object.entries(item.weights)) {
      const name = `PVC pipes ${weight} ${item.size}`;
      const payload = {
        category: 'supreme',
        subCategory: 'PVC pipes',
        name,
        model: item.size,
        stock,
        lowStockLimit: 10,
        specs: { size: item.size, material: 'PVC pipes' }
      };
      
      console.log(`Adding ${name} with stock ${stock}...`);
      try {
        const res = await fetch('http://127.0.0.1:5001/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
           const err = await res.text();
           console.error(`Failed to add ${name}:`, err);
        }
      } catch (err) {
        console.error(`Fetch error for ${name}:`, err);
      }
    }
  }
  console.log('Seeding complete.');
}

seed();
