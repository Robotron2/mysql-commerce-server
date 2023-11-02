const { Product } = require("../models")
const { Category } = require("../models")
const { Image } = require("../models")
const path = require("path")
const fs = require("fs")

function modifyFilePath(filePath) {
	return filePath.substring("public/".length)
}

const createProductController = async (req, res) => {
	// const { product_name, description, price, stock_quantity, categoryId, image } = req.body
	const { product_name, description, price, stock_quantity, categoryId } = req.body
	let { originalname, path } = req.file

	try {
		if (!product_name || !description | !price || !stock_quantity || !categoryId) {
			throw Error("All fields must be provided!")
		}
		path = modifyFilePath(path)
		console.log(path)
		const product = await Product.create({
			product_name,
			description,
			price,
			stock_quantity,
			CategoryId: categoryId
		})
		const productId = product.id

		// console.log(productId)
		await Image.create({
			filename: originalname,
			filePath: path,
			ProductId: productId
		})
		res.status(200).json({ message: "Product and image created successfully", success: true })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message, success: false })
	}

	// console.log(req.body)
	// console.log(originalname)
}

// const getAllProductsController = async (req, res) => {
// 	try {
// 		const allProducts = await Product.findAll({
// 			attributes: ["id", ["product_name", "productName"], ["stock_quantity", "stockQuantity"]],
// include: [
// 	{
// 		model: Category,
// 		attributes: [["category_name", "categoryName"]]
// 	},
// 	{
// 		model: Image,
// 		attributes: [["filename", "fileName"], "filePath"]
// 	}
// ]
// 		})

// 		if (!allProducts) {
// 			return res.status(404).json({ error: "Products not found", success: false })
// 		}

// 		return res.status(200).json({ products: allProducts, success: true })
// 	} catch (error) {
// 		res.status(500).json({ error: error.message, success: false })
// 	}
// }
const getAllProductsController = async (req, res) => {
	const page = req.query.page || 1
	const limit = 10
	const offset = (page - 1) * limit

	const sortBy = req.query.sortBy || "createdAt"
	const sortOrder = req.query.sortOrder || "desc"
	const category = req.query.category

	const where = {}
	if (category) {
		where.category = category
	}

	try {
		const products = await Product.findAndCountAll({
			limit,
			offset,
			where,
			order: [[sortBy, sortOrder]],
			attributes: ["id", ["product_name", "productName"], ["stock_quantity", "stockQuantity"], "price"],
			include: [
				{
					model: Category,
					attributes: [["category_name", "categoryName"]]
				},
				{
					model: Image,
					attributes: [["filename", "fileName"], "filePath"]
				}
			]
		})

		return res.status(200).json({
			products: products.rows,
			totalPages: Math.ceil(products.count / limit)
		})
	} catch (error) {
		res.status(500).json({ error: "Error fetching products." })
	}
}

module.exports = {
	createProductController,
	getAllProductsController
}
