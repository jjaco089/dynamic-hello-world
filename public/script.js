// This function fetches the greeting from our Node.js server
async function setDynamicGreeting() {
    const greetingElement = document.getElementById('greeting');
    
    // *** IMPORTANT: API Endpoint URL ***
    //
    // 1. For LOCAL TESTING (when you run 'node server.js'):
    // const apiUrl = 'http://localhost:3000/api/location'; 
    
    // 2. For DEPLOYMENT (GitHub Pages talking to Azure):
    // You MUST replace this placeholder with the public URL of your Azure App Service!
    // Example: 'https://my-azure-api.azurewebsites.net/api/location'
    
    // We will use the local URL for now so you can test it immediately:
    const apiUrl = 'http://localhost:3000/api/location'; 

    try {
        // 1. Fetch data from our self-hosted API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        
        // 2. Parse the JSON response from server.js
        const data = await response.json();
        
        // 3. Update the greeting element
        greetingElement.textContent = data.greeting;

        console.log('Location data received:', data);

    } catch (error) {
        // 4. Handle errors (e.g., server not running, network issue)
        console.error('Could not connect to the API server:', error);
        greetingElement.textContent = "Hello World! (Server unavailable)";
        greetingElement.style.color = 'red';
    }
}

// Run the function when the page loads
setDynamicGreeting();