const express = require("express")
const { registerUser, loginUser, resetPassword } = require("../controllers/userController")
const { requireSignIn, isAdmin } = require("../middlewares/authMididdleware")

const router = express.Router()

//register
router.post("/register", registerUser)

//login
router.post("/login", loginUser)

//reset password
router.post("/reset", resetPassword)

//identify user-role
router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true })
})
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
	res.status(200).send({ ok: true })
})

module.exports = router
