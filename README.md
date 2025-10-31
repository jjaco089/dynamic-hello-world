# 🌍 Dynamic Hello World Web Application

This project is a dynamic web application that displays a personalized greeting ("Hello [Country Name]!") by detecting the user's country based on their IP address. This solution uses an efficient **Server-Side Geolocation** architecture.

### Key Features
* **Split Deployment:** Front-end is hosted statically (GitHub Pages), and the Back-end runs as an API (Azure App Service).
* **Efficiency:** Uses a local, lightweight IP-to-Country dataset (`geoip-lite`) on the server, avoiding external API latency and rate limits.
* **Scalable Backend:** Designed for deployment on cloud services like Azure.

## ⚙️ Architecture

The application is split into two deployable parts:

1.  **Front-end (Client):** Located in the `public/` directory (`index.html`, `styles.css`, `script.js`). It fetches the location data from the deployed Azure API.
2.  **Back-end (Server):** Node.js/Express application (`server.js`) responsible for:
    * Extracting the user's public IP address.
    * Looking up the IP's country using `geoip-lite`.
    * Handling **CORS** (Cross-Origin Resource Sharing) to allow requests from the GitHub Pages domain.

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have **Node.js** and **npm** (Node Package Manager) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/dynamic-hello-world.git](https://github.com/YourUsername/dynamic-hello-world.git)
    cd dynamic-hello-world
    ```

2.  **Install dependencies:**
    We need `express`, `geoip-lite`, and `cors`.
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will typically start on `http://localhost:3000`.

2.  **View the app:**
    Open your web browser and navigate to the local server address (e.g., `http://localhost:3000`).

## ☁️ Deployment

This project uses a hybrid deployment strategy:

| Component | Deployment Target | Notes |
| :--- | :--- | :--- |
| **Front-end** (`public/`) | **GitHub Pages** | Host the static files (`index.html`, etc.). |
| **Back-end** (`server.js`) | **Azure App Service** | Used to host the dynamic Node.js API endpoint. **Remember to update the API endpoint URL in `public/script.js` after the Azure deployment.** |

## 🧪 Testing

The most effective way to test the location logic is after deployment, using a **VPN (Virtual Private Network)** to simulate access from various countries.

---

*Created with Gemini 2.5 Flash*