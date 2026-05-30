

const BASE_URL = 'http://localhost:5001/api';

const rows = {
    "ELBOW 10 KG": {"1/2\"": 350, "3/4\"": 1700, "1\"": 1485, "11/4\"": 567, "11/2\"": 268, "2\"": 589, "21/2\"": 59, "3\"": 34, "4\"": 193},
    "ELBOW 6 KG": {"11/4\"": 1444, "11/2\"": 881, "2\"": 303, "21/2\"": 294, "3\"": 193, "4\"": 52, "5\"": 84, "6\"": 37, "7\"": 12, "8\"": 16, "10\"": 6},
    "ELBOW 4 KG": {"2\"": 272, "21/2\"": 261, "3\"": 480, "4\"": 90, "5\"": 54, "6\"": 39, "8\"": 10, "12\"": 16},
    "TEE 6 KG": {"11/4\"": 1460, "11/2\"": 470, "2\"": 243, "21/2\"": 142, "3\"": 122, "4\"": 93, "5\"": 68, "6\"": 51, "7\"": 8, "8\"": 13, "10\"": 7},
    "TEE 4 KG": {"2\"": 168, "21/2\"": 221, "3\"": 135, "4\"": 132, "5\"": 46, "6\"": 42, "8\"": 16, "12\"": 10},
    "MTA": {"1/2\"": 990, "3/4\"": 2900, "1\"": 570, "11/4\"": 315, "11/2\"": 584, "2\"": 677, "21/2\"": 243, "3\"": 169, "4\"": 24, "5\"": 11, "6\"": 7},
    "F T A": {"1/2\"": 1115, "3/4\"": 1390, "1\"": 575, "11/4\"": 615, "11/2\"": 322, "2\"": 390, "21/2\"": 74, "3\"": 73, "4\"": 164, "5\"": 17, "6\"": 17},
    "END CAP 10kg": {"1/2\"": 1985, "3/4\"": 2335, "1\"": 898},
    "END CAP 6kg": {"11/4\"": 2482, "11/2\"": 450, "2\"": 436, "21/2\"": 339, "3\"": 176, "4\"": 298, "6\"": 93, "7\"": 129, "8\"": 98, "10\"": 10, "12\"": 4},
    "END CAP 4kg": {"4\"": 114, "5\"": 53, "7\"": 111},
    "TH END CAP 6kg": {"1/2\"": 600, "3/4\"": 900, "1\"": 1600, "11/4\"": 275, "11/2\"": 350, "2\"": 140, "21/2\"": 150, "3\"": 150, "4\"": 56},
    "BENDS 4KG": {"2\"": 329, "21/2\"": 189, "3\"": 122, "4\"": 38, "5\"": 16, "6\"": 20, "8\"": 11, "10\"": 5},
    "BENDS 6KG": {"11/4\"": 290, "11/2\"": 76, "2\"": 200, "21/2\"": 120, "3\"": 79, "4\"": 71, "5\"": 24, "6\"": 11, "7\"": 3, "8\"": 8, "10\"": 3},
    "BENDS 10KG": {"3/4\"": 340, "1\"": 880, "4\"": 20},
    "BENDS 15KG": {"11/4\"": 49, "11/2\"": 50}
};

async function seed() {
    console.log("Fetching existing products...");
    const req = await fetch(`${BASE_URL}/products`);
    const allProds = await req.json();
    
    let createdCount = 0;

    for (const [itemName, sizes] of Object.entries(rows)) {
        for (const [size, stock] of Object.entries(sizes)) {
            // Check if exists
            const existing = allProds.find(p => 
                p.category === 'fitting' && 
                p.subCategory.toLowerCase() === 'pvc' &&
                (p.name === `pvc ${itemName} ${size}` || (p.size === size && p.name.includes(itemName)))
            );

            if (existing) {
                // Ignore updating if already exists to prevent duplication
                console.log(`Exists: pvc ${itemName} ${size}`);
            } else {
                console.log(`Creating: pvc ${itemName} ${size} with stock ${stock}`);
                const payload = {
                    category: 'fitting',
                    subCategory: 'pvc',
                    name: `pvc ${itemName} ${size}`,
                    size: size,
                    stock: stock,
                    location: "SHOP"
                };
                
                const res = await fetch(`${BASE_URL}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-user': 'admin' },
                    body: JSON.stringify(payload)
                });
                
                if (res.ok) {
                    createdCount++;
                } else {
                    const err = await res.json();
                    console.error("Error creating:", payload.name, err);
                }
            }
        }
    }
    
    console.log(`Done! Created ${createdCount} new fittings.`);
}

seed();
