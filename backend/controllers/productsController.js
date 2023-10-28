const { Product } = require("../models")
const { Category } = require("../models")
const { Image } = require("../models")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

// const createProductController = async (req, res) => {
// 	try {
// 		const { product_name, description, price, stock_quantity, categoryId } = req.body
// 		if (!product_name || !description || !price || !stock_quantity || !categoryId) {
// 			throw Error("All fields must be filled!")
// 		}
// 		const product = await Product.create({
// 			product_name,
// 			description,
// 			price,
// 			stock_quantity,
// CategoryId: categoryId
// 		})
// return res.status(201).json({ message: "Product created successfully!", product })
// 	} catch (error) {
// 		console.error("Error storing image details in the database:", error)
// 		res.status(500).json({ error: error.message, success: false })
// 	}
// }

const storage = multer.diskStorage({
	destination: "../../uploads/",
	filename: (req, file, cb) => {
		return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
	}
})

const upload = multer({
	storage: storage
})
const createProductController = async (req, res) => {
	try {
		const { product_name, description, price, stock_quantity, categoryId } = req.body
		const image = req.file.buffer

		const product = await Product.create({
			product_name,
			description,
			price,
			stock_quantity,
			CategoryId: categoryId
		})
		const productId = product.id
		console.log(productId)

		await Image.create({
			image,
			ProductId: productId
		})

		res.status(201).json({ message: "Product and image created successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Error creating product and image" })
	}
}

const getAllProductsController = async (req, res) => {
	try {
		const allProducts = await Product.findAll({ include: Category }, { attributes: ["category_name"] })
		return res.json({ products: allProducts })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	createProductController,
	getAllProductsController
}
