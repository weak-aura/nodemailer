const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const {authRoutes} = require("../routes/auth.route");

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({message: "ok"})
})

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    
    console.log("Connection failed!", error);
  });


