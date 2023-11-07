const express = require("express")
const {
	getUserProfile,
	updateProfileDetails,
} = require("../controllers/profileController")
const { requireSignIn } = require("../middlewares/authMididdleware")

const router = express.Router()

//get a single user-profile
router.get("/", requireSignIn, getUserProfile)

//update profile details
router.put("/", requireSignIn, updateProfileDetails)

module.exports = router
