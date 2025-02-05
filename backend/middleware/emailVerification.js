const {readVariable} = require("../controllers/auth.controller")


module.exports.emailVerify = async (req, res, next) => {
  try {
    const {verifyCode} = req.body
    console.log(req.body)
    const key = readVariable("key")
    if (verifyCode === String(key)) {
      console.log("key verified: ", key)
    }else {
      return res.status(403).json({error: "The key is not correct"})
    }
    
    next();

  } catch (error) {
    console.log("emailVerify Error: ", error.message)
    return res.status(500).json({error: "Internal Server Error"})
  }
}

