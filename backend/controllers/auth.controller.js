const nodemailer = require("nodemailer");
const {generateKey} = require("../utils/generateKey");
const UserModel = require("../models/user.model");
const fs = require("fs")


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "weakaura1@gmail.com",
    pass: "ovxvvsmpuryvsorj",
  },
});

function saveVariable(key, value) {
  return fs.writeFileSync(`./fs-variables/${key}.json`, JSON.stringify(value))
}

const readVariable = (key) => {
  return JSON.parse(fs.readFileSync(`./fs-variables/${key}.json`, "utf8"))
}


const signup = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const key = generateKey();

    const userExists = await UserModel.find({email})
    if (!userExists) {
      return res.status(401).json({error: "The user with this email does not exist"})
    } else {
      await transporter.sendMail({
        from: "weakaura1@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Authentication key", // Subject line
        html: `<h1>Put your verify key for authentification</h1>
             <div>Your verify key: ${key}</div>
             <a href="http://localhost:8000/api/auth/authentification">Нажмите на ссылку чтобы пройти верификацию</a>`, // html body
      });
      saveVariable("key", key)
    }

    const user = new UserModel({
      username,
      email,
      password,
    });

    saveVariable("data", user)
    // req.user = user;

    return res.status(201).json({
      message: `Verification key has been sent to email: ${email}`,
      status: "ok"
    })
  } catch (error) {
    console.log("Error in signup: ", error.message)
    res.status(500).json({error: "Error Internal Server"})
  }
}

const authentication = async (req, res) => {
  try {
    const userData = readVariable("data");
    console.log("userData: ", userData);
    res.status(201).json({message: "Your email has been created"})
  } catch (error) {
    console.log("Error in authentication: ", error.message)
    return res.status(500).json({error: "Internal server error"})
  }
}


module.exports = {signup, authentication, readVariable}