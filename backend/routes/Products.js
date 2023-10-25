const express = require("express")
const { createProductController, getAllProductsController } = require("../controllers/productsController")

const router = express.Router()

//create product
router.post("/create-product", createProductController)

//getAll products
router.get("/", getAllProductsController)
//getSingle product

//update product detail

//delete product

module.exports = router
