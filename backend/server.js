import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import logRoutes from "./routes/logRoutes.js";
import startGeneratingLogs from "./utils/logGenerator.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", logRoutes); 


app.get("/", (req, res) => {
  res.send("LogAnalyzer API is running...");
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
    startGeneratingLogs(); 
  });
}).catch((error) => {
  console.error("Database connection failed", error.message);
});
