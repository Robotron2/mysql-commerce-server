const { User } = require("../models")

const getUserProfile = async (req, res) => {
	const { id } = req.user
	try {
		if (!id) {
			throw Error("You must provide a valid id")
		}

		const user = await User.findByPk(id, {
			attributes: ["id", "username", "email", "address", ["full_name", "fullName"]],
			// attributes: ["id", "username", "email", "address", ["full_name", "fullName"], ["secret_word", "secretWord"]],
		})
		if (!user) {
			return res.status(404).json({ message: "User not found!", success: false })
		}
		return res.status(200).json({ success: true, user: user })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateProfileDetails = async (req, res) => {
	// address, and contact details.
	const { id } = req.user
	let updatedUserData = {}
	try {
		const { phone_number, address } = req.body

		if (phone_number) {
			const nigerianPhoneNumberPattern = /^(\+234|0)[789]\d{9}$/
			if (nigerianPhoneNumberPattern.test(phone_number)) {
				updatedUserData.phone_number = phone_number
				const match = await User.findAll({
					where: {
						phone_number,
					},
				})
				if (match.length !== 0) {
					throw Error("Phone number must be unique.")
				}
			} else {
				return res.status(403).json({ success: false, message: "Phone number must be a valid Nigerian number" })
			}
		}
		if (address) {
			updatedUserData.address = address
		}

		const user = await User.findByPk(id)

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" })
		}

		await user.update(updatedUserData)

		return res.status(200).json({ success: true, message: "Profile updated successfully" })
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Error updating profile.",
			error: error.message,
		})
	}
}

module.exports = {
	getUserProfile,
	updateProfileDetails,
}
