import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ["INFO", "WARN", "ERROR"] },
    service: { type: String, enum: ["auth", "payments", "notifications"] },
    message: String,
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
