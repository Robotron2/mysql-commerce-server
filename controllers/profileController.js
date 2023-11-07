const { User } = require("../models")

const getUserProfile = async (req, res) => {
	const { id } = req.user
	try {
		if (!id) {
			throw Error("You must provide a valid id")
		}

		const user = await User.findByPk(id, {
			attributes: [
				"id",
				"username",
				"email",
				"address",
				["full_name", "fullName"],
				["secret_word", "secretWord"],
			],
		})
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found!", success: false })
		}
		return res.status(200).json({ success: true, user: user })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateProfileDetails = async (req, res) => {
	// address, and contact details.
	const { id } = req.user

	try {
		// const { phone_number, address, updateImage } = req.body
		const { phone_number, address } = req.body

		const updatedUserData = {
			phone_number,
			address,
		}

		const user = await User.findByPk(id)
		// const user = await User.findByPk(id, {
		// 	include: [
		// 		{
		// 			model: Image,
		// 		},
		// 	],
		// })

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		// if (JSON.parse(updateImage) === true) {
		// 	let { originalname, path } = req.file

		// 	product.Image.filename = originalname
		// 	product.Image.filePath = path
		// 	await product.Image.save()
		// }
		await user.update(updatedUserData)

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

module.exports = {
	getUserProfile,
	updateProfileDetails,
}
