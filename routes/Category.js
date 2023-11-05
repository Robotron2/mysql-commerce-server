const express = require("express")
const {
	createCategoryController,
	getAllCategoriesController,
} = require("../controllers/categoriesController")
const { requireSignIn, isAdmin } = require("../middlewares/authMididdleware")
const router = express.Router()

router.get("/", getAllCategoriesController)
router.post("/create", requireSignIn, isAdmin, createCategoryController)

module.exports = router
