# Smart Fuel Optimization & Resource Management System
## Prototype Setup & API Configuration Guide

### 📌 Backend Server Deployment Note
All RESTful APIs for the **Smart Fuel Optimization and Resource Management System** are fully developed, structured, and tested. Currently, a dedicated cloud hosting server has not been purchased for the production backend deployment. However, the system is architected to run seamlessly in local and local-area network (LAN) environments.

You can easily run the Node.js backend server locally on any PC and test all API calls using `localhost` or your computer's IP address as the API Base URL.

---

### 🚀 How to Run & Test the Prototype

#### 1. Running the Backend Server (`node-learning`)
1. Open terminal inside the backend folder and install required packages:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. The server will start on port `3000` and display your local connection details:
   ```text
   =========================================
   Server is running!
   Local Access:   http://localhost:3000
   Network Access: http://<YOUR_LOCAL_IP>:3000
   =========================================
   Connected to MongoDB!
   ```

---

#### 2. Running the Frontend Application (`smart-fuel-optimization`)
1. Open terminal inside the frontend folder and install dependencies:
   ```bash
   npm install
   ```
2. Set your local backend Base URL in `.env` or `src/config/config.js`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
   *(If accessing from another device on the same network, replace `localhost` with your host PC's IP address, e.g., `http://192.168.1.100:3000/api`).*

3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Access the web interface at `http://localhost:8001`.

---

### 🧰 Development Tools & Environment

Below are the software tools, technologies, and runtime environments used to build and run this project prototype:

- **IDE / Code Editor:** Visual Studio Code (VS Code)
- **Runtime Environment:** Node.js (v18+ or v20+) & npm
- **Frontend Stack:** React (v19), Vite (v7), Tailwind CSS (v3), JavaScript (ES6+), HTML5, CSS3
- **Backend Stack:** Node.js, Express.js
- **Database:** MongoDB & Mongoose ORM
- **API Testing & Inspection Tools:** Postman / Thunder Client / Browser Developer Tools
- **Supported Browsers:** Google Chrome / Microsoft Edge / Mozilla Firefox

---

### 📦 Submission Packaging Requirement

You must submit a **.zip** / **.rar** or compressed folder containing all necessary files required to run your project prototype (including Frontend Code, Backend Code, Database setup scripts/models, and Documentation).

---

### 🛠️ Core Prototype Features Ready for Testing
- **User Authentication**: User Registration, Login & Role Authorization (JWT).
- **Vehicle Fleet Management**: Add, edit, remove vehicles, set fuel capacity & efficiency metrics.
- **Fuel Logs & Receipts**: Track fuel refills, cost per liter, total spending & image receipts.
- **Trip Planning & Routing**: Route calculations, distance estimation & fuel usage forecasts.
- **Crisis Mode Management**: Emergency allocation triggers & fuel shortage mitigation.
- **Budget Tracking**: Expenditure caps & alerts for monthly fuel usage.
- **Analytics & Reporting**: Interactive charts for fleet performance & consumption trends.
- **Admin Controls**: Organization branches & fleet driver user management.

Thank you for testing our project prototype!
