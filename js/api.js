// API client — all fetch calls go through here
const LIVE_BACKEND_URL = 'https://sri-sapthagiri-api.onrender.com/api';
const LOCAL_BACKEND_URL = 'http://localhost:5001/api';

const savedServer = localStorage.getItem('ss_server_type');

function getInitialBaseUrl() {
    // Auto-detect: if running on localhost, local IP, or file:/// protocol, use the local backend
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.hostname === '' || 
                    window.location.protocol === 'file:' ||
                    window.location.hostname.startsWith('192.168.') ||
                    window.location.hostname.startsWith('10.') ||
                    window.location.hostname.endsWith('.local');

    if (!isLocal) {
        // If not running locally, always force production URL and clean up any old local storage state
        localStorage.removeItem('ss_server_type');
        return LIVE_BACKEND_URL;
    }

    if (savedServer === 'local') return LOCAL_BACKEND_URL;
    if (savedServer === 'live') return LIVE_BACKEND_URL;
    return LOCAL_BACKEND_URL;
}

export let BASE_URL = getInitialBaseUrl();

// Global fetch interceptor for production self-healing
const originalFetch = window.fetch;
window.fetch = async function(url, options = {}) {
    try {
        return await originalFetch(url, options);
    } catch (err) {
        // Auto-detect: if running on a production/live domain, but calling localhost
        const isLocalHost = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' || 
                            window.location.hostname === '' || 
                            window.location.protocol === 'file:' ||
                            window.location.hostname.startsWith('192.168.') ||
                            window.location.hostname.startsWith('10.') ||
                            window.location.hostname.endsWith('.local');

        if (!isLocalHost && typeof url === 'string' && url.includes(LOCAL_BACKEND_URL)) {
            console.warn("CORS/Connection error detected on production domain while connected to local server. Self-healing: switching to Live Backend.");
            localStorage.removeItem('ss_server_type');
            BASE_URL = LIVE_BACKEND_URL;
            const newUrl = url.replace(LOCAL_BACKEND_URL, LIVE_BACKEND_URL);
            return await originalFetch(newUrl, options);
        }
        throw err;
    }
};

export function updateBaseUrl(type) {
    if (type === 'local') {
        localStorage.setItem('ss_server_type', 'local');
        BASE_URL = LOCAL_BACKEND_URL;
    } else if (type === 'live') {
        localStorage.setItem('ss_server_type', 'live');
        BASE_URL = LIVE_BACKEND_URL;
    } else {
        localStorage.removeItem('ss_server_type');
        BASE_URL = getInitialBaseUrl();
    }
    return BASE_URL;
}




function getUser() {
    return sessionStorage.getItem('ss_user') || 'guest';
}

function headers() {
    return { 'Content-Type': 'application/json', 'x-user': getUser() };
}

// Helper to handle responses and avoid "Unexpected token <" errors
async function handleResponse(res) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Server Error (${res.status})`);
        return data;
    } else {
        // Not JSON — probably a 404 HTML page or server error
        const text = await res.text();
        console.error('Non-JSON Response:', text);
        throw new Error(`Server returned an unexpected response (HTML). Check if the backend is running correctly.`);
    }
}

// ──────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────
export async function loginUser(role, password = '') {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ role, password }),
    });
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await res.json();
    }
    return handleResponse(res);
}

// ──────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────
export async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    return handleResponse(res);
}

export async function createProduct(data) {
    const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function updateProduct(id, data) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function addStock(id, qty, serialNumbers = [], location = 'SHOP') {
    const res = await fetch(`${BASE_URL}/products/${id}/add-stock`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify({ qty, serialNumbers, location }),
    });
    return handleResponse(res);
}

export async function deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: headers(),
    });
    return handleResponse(res);
}

export async function bulkDeleteProducts(ids) {
    const res = await fetch(`${BASE_URL}/products/bulk-delete`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ ids })
    });
    return handleResponse(res);
}

// ──────────────────────────────────────────
// REQUESTS (CHALLANS)
// ──────────────────────────────────────────
export async function fetchRequests() {
    const res = await fetch(`${BASE_URL}/requests`);
    return handleResponse(res);
}

export async function createRequest(data) {
    const res = await fetch(`${BASE_URL}/requests`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function updateRequestStatus(id, status, itemSources = []) {
    const res = await fetch(`${BASE_URL}/requests/${id}/status`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ status, itemSources }),
    });
    return handleResponse(res);
}

export async function returnRequest(id) {
    const res = await fetch(`${BASE_URL}/requests/${id}/revert`, {
        method: 'POST',
        headers: headers(),
    });
    return handleResponse(res);
}

export async function deleteRequest(id) {
    const res = await fetch(`${BASE_URL}/requests/${id}`, {
        method: 'DELETE',
        headers: headers(),
    });
    return handleResponse(res);
}

// ──────────────────────────────────────────
// LOGS
// ──────────────────────────────────────────
export async function fetchLogs() {
    const res = await fetch(`${BASE_URL}/logs`);
    return handleResponse(res);
}

// ──────────────────────────────────────────
// LOCATIONS
// ──────────────────────────────────────────
export async function fetchLocations() {
    const res = await fetch(`${BASE_URL}/locations`);
    return handleResponse(res);
}

export async function addLocation(name) {
    const res = await fetch(`${BASE_URL}/locations`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ name }),
    });
    return handleResponse(res);
}

export async function deleteLocation(name) {
    const res = await fetch(`${BASE_URL}/locations/${encodeURIComponent(name)}`, {
        method: 'DELETE',
        headers: headers(),
    });
    return handleResponse(res);
}

// ──────────────────────────────────────────
// PIPE DASHBOARD CONFIG
// ──────────────────────────────────────────
export async function fetchPipeCategories() {
    const res = await fetch(`${BASE_URL}/pipe-categories`);
    return handleResponse(res);
}

export async function createPipeCategory(name, type = 'supreme') {
    const res = await fetch(`${BASE_URL}/pipe-categories`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ name, type }),
    });
    return handleResponse(res);
}

export async function updatePipeCategory(id, data) {
    const res = await fetch(`${BASE_URL}/pipe-categories/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function deletePipeCategory(id, deleteProducts = false) {
    const res = await fetch(`${BASE_URL}/pipe-categories/${id}?deleteProducts=${deleteProducts}`, {
        method: 'DELETE',
        headers: headers()
    });
    if (!res.ok) throw new Error(await res.text());
}

export async function fetchPipeColumns(category) {
    const res = await fetch(`${BASE_URL}/pipe-columns/${encodeURIComponent(category)}`);
    return handleResponse(res);
}

export async function savePipeColumns(category, columns) {
    const res = await fetch(`${BASE_URL}/pipe-columns/${encodeURIComponent(category)}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ columns }),
    });
    return handleResponse(res);
}

// ──────────────────────────────────────────
// DATA RETENTION
// ──────────────────────────────────────────
export async function fetchRetentionStats() {
    const res = await fetch(`${BASE_URL}/retention/stats`);
    return handleResponse(res);
}

export async function purgeOldData() {
    const res = await fetch(`${BASE_URL}/retention/purge`, {
        method: 'DELETE',
        headers: headers(),
    });
    return handleResponse(res);
}
