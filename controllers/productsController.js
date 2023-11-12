const { Product, Category, Image } = require("../models")
const { Op } = require("sequelize")

const path = require("path")

const fs = require("fs")

function modifyFilePath(filePath) {
	return filePath.substring("public/".length)
}

const createProductController = async (req, res) => {
	// const { product_name, description, price, stock_quantity, categoryId, image } = req.body
	const { product_name, description, price, stock_quantity, categoryId } =
		req.body
	let { filename, path } = req.file
	// console.log(filename.slice(6))

	try {
		if (
			!product_name ||
			!description | !price ||
			!stock_quantity ||
			!categoryId
		) {
			throw Error("All fields must be provided!")
		}
		path = modifyFilePath(path)
		console.log(path)
		const product = await Product.create({
			product_name,
			description,
			price,
			stock_quantity,
			CategoryId: categoryId,
		})
		const productId = product.id

		// console.log(productId)
		await Image.create({
			filename: filename.slice(6),
			filePath: path,
			ProductId: productId,
		})
		res.status(200).json({
			message: "Product and image created successfully",
			success: true,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message, success: false })
	}

	// console.log(req.body)
	// console.log(originalname)
}

const getAllProductsController = async (req, res) => {
	const page = req.query.page || 1
	const limit = parseInt(req.query.limit) || 12
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
			attributes: [
				"id",
				["product_name", "productName"],
				["stock_quantity", "stockQuantity"],
				"description",
				"price",
			],
			include: [
				{
					model: Category,
					attributes: [["category_name", "categoryName"]],
				},
				{
					model: Image,
					attributes: [["filename", "fileName"], "filePath"],
				},
			],
		})

		return res.status(200).json({
			products: products.rows,
			totalPages: Math.ceil(products.count / limit),
		})
	} catch (error) {
		res.status(500).json({ error: "Error fetching products." })
	}
}

const getRelatedProductsController = async (categoryId) => {
	console.log(categoryId)
	const relatedProducts = await Product.findAll({
		where: {
			CategoryId: categoryId,
		},
		attributes: [
			["product_name", "productName"],
			["stock_quantity", "stockQuantity"],
			"id",
			"description",
			"price",
		],
		include: [
			{
				model: Category,
				attributes: [["category_name", "categoryName"], "id"],
			},
			{ model: Image, attributes: ["filename", "filePath", "id"] },
		],
	})

	return relatedProducts
}

const getSingleProductController = async (req, res) => {
	const { id } = req.params
	const productCategory = parseInt(req.query.category)

	try {
		const product = await Product.findByPk(id, {
			attributes: [
				["product_name", "productName"],
				"description",
				"price",
				["stock_quantity", "stockQuantity"],
			],
			include: [
				{
					model: Image,
					attributes: [["filename", "fileName"], "filePath"],
				},
				{
					model: Category,
					attributes: [["category_name", "categoryName"], "id"],
				},
			],
		})
		if (!product) {
			return res
				.status(404)
				.json({ error: "Product not found!", success: false })
		}
		let relatedProducts
		if (productCategory) {
			relatedProducts = await getRelatedProductsController(productCategory)
		}

		return res.status(200).json({
			success: true,
			product: product,
			relatedProducts: relatedProducts,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Something went wrong on the server." })
	}
}

const updateSingleProductController = async (req, res) => {
	const { id } = req.params
	try {
		const { product_name, description, price, stock_quantity, updateImage } =
			req.body

		const updatedProductData = {
			product_name,
			description,
			price,
			stock_quantity,
		}

		const product = await Product.findByPk(id, {
			include: [
				{
					model: Image,
				},
			],
		})

		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}
		if (JSON.parse(updateImage) === true) {
			let { originalname, path } = req.file

			product.Image.filename = originalname
			product.Image.filePath = path
			await product.Image.save()
		}
		await product.update(updatedProductData)

		return res
			.status(200)
			.json({ success: true, message: "Product updated successfully" })
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Error updating product.",
			error: error,
		})
	}
}

const deleteProductController = async (req, res) => {
	try {
		const { id } = req.params

		const product = await Product.findByPk(id, {
			include: [
				{
					model: Image,
				},
			],
		})
		const imageId = product.Image.id

		if (!product) {
			return res.status(404).json({ error: "Product not found" })
		}
		// // console.log(product.Image)

		const imageName = product.Image.filename

		const image = await Image.findOne({ where: { id: imageId } })

		if (image) {
			// const image_path = path.join(__dirname, "public", "files", `${imageName}`)
			const image_path = `public/files/${imageName}`
			console.log(image_path)
			console.log(fs.existsSync(image_path))

			if (fs.existsSync(image_path)) {
				fs.unlinkSync(image_path)
				await image.destroy()
				await product.destroy()
				console.log("Deleted image")
				return res
					.status(200)
					.json({ message: "Product deleted successfully", success: true })
			}
		} else {
			return res
				.status(500)
				.json({ message: "Product not deleted", success: false })
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: "Internal server error" })
	}
}

///////////////////////////////////////////// Product Browsing Controllers /////////////////////////////////////////////

const getProductsByFilterController = async (req, res) => {
	const { category, minPrice, maxPrice, sort } = req.query
	const where = {}
	if (category) where.CategoryId = category
	if (minPrice) where.price = { [Op.gte]: minPrice }
	if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice }

	try {
		const products = await Product.findAll({
			where,
			attributes: [
				["product_name", "productName"],
				["stock_quantity", "stockQuantity"],
				"id",
				"description",
				"price",
			],
			include: [
				{
					model: Category,
					attributes: [["category_name", "categoryName"], "id"],
				},
				{ model: Image, attributes: ["filename", "filePath", "id"] },
			],
			order: sort ? [sort.split(",")] : [],
		})
		if (products.length === 0) {
			return res
				.status(200)
				.json({ message: "No product matches this", success: false, products })
		}
		return res.status(200).json({ products: products, success: true })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Internal Server Error" })
	}
}

module.exports = {
	createProductController,
	getAllProductsController,
	getSingleProductController,
	updateSingleProductController,
	deleteProductController,
	getProductsByFilterController,
}
