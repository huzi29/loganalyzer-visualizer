import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DBLogAnalyzer connected");
  } catch (error) {
    console.error("DBLogAnalyzer connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
