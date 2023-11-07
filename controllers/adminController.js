"doyindamola Omo Baba tiisa"
const { User } = require("../models")

const getUsersInfoController = async (req, res) => {
	const page = req.query.page || 1
	const limit = 12
	const offset = (page - 1) * limit

	const sortBy = req.query.sortBy || "createdAt"
	const sortOrder = req.query.sortOrder || "asc"
	const category = req.query.category

	const where = {}
	if (category) {
		where.category = category
	}

	try {
		const allUsers = await User.findAndCountAll({
			limit,
			offset,
			where,
			order: [[sortBy, sortOrder]],
			attributes: [
				"id",
				["full_name", "fullName"],
				"username",
				"email",
				"address",
				["phone_number", "phone"],
			],
			// include: [
			// 	{
			// 		model: Category,
			// 		attributes: [["category_name", "categoryName"]],
			// 	},
			// 	{
			// 		model: Image,
			// 		attributes: [["filename", "fileName"], "filePath"],
			// 	},
			// ],
		})

		return res.status(200).json({
			user: allUsers.rows,
			totalPages: Math.ceil(allUsers.count / limit),
		})
	} catch (error) {
		res.status(500).json({ error: "Error fetching products." })
	}
}

module.exports = {
	getUsersInfoController,
}
