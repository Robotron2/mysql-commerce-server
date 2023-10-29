const express = require("express")
const { registerUser, loginUser, resetPassword } = require("../controllers/userController")

const router = express.Router()
//register
router.post("/register", registerUser)

//login
router.post("/login", loginUser)

//reset password
router.post("/reset", resetPassword)

module.exports = router
