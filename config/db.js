const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");

    // await mongoose.connect(
    //   "mongodb+srv://Suvrodeep:mongodb123@cluster0.upxskpb.mongodb.net/mydb"
    // );

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

module.exports = connectDB;