const { Product } = require("../models")
const { Category } = require("../models")

const createProductController = async (req, res) => {
	try {
		const { product_name, description, price, stock_quantity, categoryId } = req.body
		if (!product_name || !description || !price || !stock_quantity || !categoryId) {
			throw Error("All fields must be filled!")
		}
		const product = await Product.create({
			product_name,
			description,
			price,
			stock_quantity,
			CategoryId: categoryId
		})
		return res.status(201).json({ message: "Product created successfully!", product })
	} catch (error) {
		console.error("Error storing image details in the database:", error)
		res.status(500).json({ error: error.message })
	}
}

const getAllProductsController = async (req, res) => {
	try {
		const allProducts = await Product.findAll({ include: Category })
		return res.json({ products: allProducts })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	createProductController,
	getAllProductsController
}
