# Backend Setup

This is the backend server for the LogAnalyzer Visualizer application. It uses Node.js, Express, and MongoDB.

## Getting Started

Follow the steps below to get the backend server up and running on your local machine.

### 1. Clone the Repository

git clone https://github.com/huzi29/loganalyzer-visualizer.git
cd backend

### 2. Install Dependencies
npm install

### 3. Start the Server
Create a .env file in the root of the project directory. This file will store sensitive configuration values such as database URLs and Port number.\
eg: PORT=8080
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbloganalyzer?retryWrites=true&w=majority

4. Start the Server
npm run dev

The server should now be running at http://localhost:8080.

to check logs:
http://localhost:8080/api/logs

to check stats:
http://localhost:8080/api/logs/stats