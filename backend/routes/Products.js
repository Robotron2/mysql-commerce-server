const express = require("express")
const router = express.Router()

const { createProductController, getAllProductsController } = require("../controllers/productsController")
const multer = require("multer")

const upload = multer()

//create product
router.post("/create-product", upload.single("image"), createProductController)
// router.post("/create-product", createProductController)

//getAll products
router.get("/", getAllProductsController)
//getSingle product

//update product detail

//delete product

module.exports = router
