# 🌍 Dynamic Hello World Web Application

This project is a simple web application that displays a personalized greeting ("Hello [Country Name]!") by detecting the user's country based on their IP address. This solution uses a **Server-Side Geolocation** architecture, leveraging a lightweight local IP-to-Country dataset for fast, efficient lookups, without relying on external, rate-limited APIs.

## ⚙️ Architecture

The application is built on a simple **Node.js/Express server** with a static front-end.

* **Front-end (Client):** HTML, CSS, and JavaScript. The JavaScript sends a request to the server's local API endpoint.
* **Back-end (Server):** Node.js and Express. It extracts the user's IP, performs the country lookup using the `geoip-lite` module, and returns the result.

## 🚀 Getting Started

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
    The server relies on `express` and `geoip-lite`.
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

## 🧪 Testing Location-Specific Content

Since the application relies on your public IP address, testing different countries requires special tools.

* **Deployment:** The most reliable way is to **deploy the server** to a public hosting service (like Netlify, Vercel, or a traditional VPS).
* **VPN:** The recommended testing method is to use a **VPN (Virtual Private Network)** to change your apparent location and verify that the greeting updates correctly.

---