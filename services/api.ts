
function getApiBaseUrl(): string {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }

    // IMPORTANT: FOR VERCEL DEPLOYMENT TO WORK
    // 1. You must deploy the `backend` folder to a Node.js hosting service (like Render, Railway, Heroku, etc.).
    // 2. You will get a public URL for your backend, e.g., "https://my-splitbill-backend.onrender.com".
    // 3. You MUST replace the placeholder URL below with your actual deployed backend URL.
    return 'https://splitbill-pro-uts-production.up.railway.app';
}

export const API_BASE_URL = getApiBaseUrl();
