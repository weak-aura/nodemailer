const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongo = require("../config/database");

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

connectMongo();
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`)
})
