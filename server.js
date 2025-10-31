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
    // When running locally, this is usually '::1' or '127.0.0.1'.
    // When deployed on Azure, the real user IP is often found in the 'x-forwarded-for' header.
    // We use the req.ip property provided by Express, which is often smart enough 
    // to check the necessary headers in a production environment.
    const ip = req.ip; 
    
    // 2. Perform the Geolocation Lookup
    const geo = geoip.lookup(ip);

    let countryName = 'World'; // Default fallback
    let countryCode = 'N/A';
    
    if (geo && geo.country) {
        countryCode = geo.country;
        
        // Use the browser's built-in Internationalization API equivalent 
        // to convert the code (e.g., 'US') to a name (e.g., 'United States').
        // Since the server doesn't have the full browser API, 
        // we'll use a simple conversion or just return the code.
        // For simplicity and reliability on the server, we'll use a lookup or just the code for now.
        // *** IMPORTANT: The geoip-lite library sometimes provides a country name, but we'll stick to a robust format.
        
        try {
            // A simple method to get the full name from the code
            const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
            // Replace the default name
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