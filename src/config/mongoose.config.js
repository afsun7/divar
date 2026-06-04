const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Server connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

connectDB();
