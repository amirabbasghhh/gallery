import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, { dbName: "next-auth-db" });
    console.log("📌 Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
