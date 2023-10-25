const express = require("express")
const { createCategoryController, getAllCategoriesController } = require("../controllers/categoriesController")
const router = express.Router()

router.get("/", getAllCategoriesController)
router.post("/create", createCategoryController)

module.exports = router
