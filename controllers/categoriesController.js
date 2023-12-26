const { Category } = require("../models")

const getAllCategoriesController = async (req, res) => {
	//
	const allCategories = await Category.findAll({
		attributes: ["id", ["category_name", "categoryName"]],
	})
	res.status(200).json({ allCategories, success: true })
}

const createCategoryController = async (req, res) => {
	const { category_name } = req.body
	try {
		if (!category_name) {
			return res
				.status(403)
				.json({ message: "Category name must be provided!" })
		}
		const match = await Category.findOne({ where: { category_name } })

		if (match) {
			return res.status(201).json({ message: "Category exists!" })
		} else {
			let category = await Category.create({ category_name })
			res.status(201).json({ message: "Category created successfully!" })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Error creating category. Try again later." })
	}
}

module.exports = {
	getAllCategoriesController,
	createCategoryController,
}
