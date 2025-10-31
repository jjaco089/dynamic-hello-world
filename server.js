const express = require('express');
const geoip = require('geoip-lite');
const cors = require('cors');

const app = express();
// Use the port provided by the hosting environment (Azure) or default to 3000 locally
const PORT = process.env.PORT || 3000; 

// --- CORS Configuration ---
// Since the front-end will be hosted on GitHub Pages (a different domain), 
// we must configure CORS to allow those requests.
// For security, you should replace '*' with the specific URL of your GitHub Pages site 
// once you know it (e.g., 'https://yourusername.github.io').
app.use(cors({
    origin: '*' // Allowing all origins for easy local testing. 
}));


// --- Serving Static Files (Front-end) ---
// We will also serve the static files from the 'public' folder 
// so you can test the entire app locally by just running the server.
app.use(express.static('public'));


// --- Geolocation API Endpoint ---
app.get('/api/location', (req, res) => {
    // 1. Extract the IP Address
    // In Azure App Service, the real user IP is often extracted from headers 
    // and correctly set as req.ip by Express/middleware.
    const ip = req.ip; 
    
    // 2. Perform the Geolocation Lookup
    // Clean up the IP format for geoip-lite lookup
    const geo = geoip.lookup(ip.replace('::ffff:', '')); 

    let countryName = 'World'; // Default fallback
    let countryCode = 'N/A';
    
    if (geo && geo.country) {
        countryCode = geo.country;
        
        // Convert the code (e.g., 'US') to a readable name (e.g., 'United States')
        try {
            const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
            countryName = name || countryName; 
        } catch (e) {
            // Fallback for environments that lack Intl support
            countryName = countryCode; 
        }
    }
    
    // 3. Send the JSON response back to the client
    res.json({
        greeting: `Hello ${countryName}!`,
        country: countryName,
        code: countryCode,
        ip: ip 
    });
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local Test URL: http://localhost:${PORT}`);
    console.log(`API Endpoint: http://localhost:${PORT}/api/location`);
});