const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMididdleware")
const { getUsersInfoController } = require("../controllers/adminController")

const router = express.Router()

//
router.get("/manage-users", requireSignIn, isAdmin, getUsersInfoController)

module.exports = router
