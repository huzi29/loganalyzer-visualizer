import express from "express";
import { getLogs, getStats } from "../controllers/logController.js";

const router = express.Router();

router.get("/logs", getLogs);
router.get("/logs/stats", getStats);

export default router; 