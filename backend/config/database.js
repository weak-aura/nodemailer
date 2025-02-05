const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to database")
  }catch (error) {
    console.log("Connection Error: ", error.message)
  }
}

module.exports = connectMongo;