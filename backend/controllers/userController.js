const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const { User } = require("../models")

const saltRounds = 10

const registerUser = async (req, res) => {
	const { full_name, username, email, password, address, phone_number, secret_word } = req.body
	try {
		if (!username || !email || !password || !phone_number) {
			throw Error("All fields must be filled!")
		} else {
			const match = await User.findOne({ where: { email } })
			if (match) {
				throw Error("Email exists. Email must be unique!")
			} else {
				bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
					await User.create({
						username,
						email,
						password: hashedPassword,
						full_name,
						address,
						phone_number,
						secret_word
					})
					return res.status(200).json({ success: true, message: "User registered successfully!" })
				})
			}
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body
	const secretKey = process.env.JWT_SECRET

	try {
		if (!email || !password) {
			throw Error("All fields must be filled!")
		} else {
			const user = await User.findOne({ where: { email } })
			if (!user) {
				return res.json({ error: "User does not exist!", success: false })
			}

			const match = await bcrypt.compare(password, user.password)

			if (!match) {
				return res.json({ error: "Incorrect login details", success: false })
			}
			// return res.json({ user, match: match })
			let userInfo = { id: user.id, username: user.username, email: user.email, address: user.address, phone: user.phone_number, role: user.role }
			let token = JWT.sign(userInfo, secretKey, { expiresIn: "1d" })
			return res.status(200).send({
				success: true,
				message: "Logged in successfully",
				user: userInfo,
				token
			})
			// res.json({ token: accessToken, username: username, id: user.id })
		}
	} catch (error) {
		res.status(500).json({ error: error.message, success: false })
	}
}

const resetPassword = async (req, res) => {
	const { email, secret_word, new_password } = req.body
	try {
		if (!email || !secret_word || !new_password) {
			throw Error("All fields must be filled!")
		}
		const match = await User.findOne({ where: { email } })
		if (match) {
			if (secret_word == match.secret_word) {
				bcrypt.hash(new_password, saltRounds, async (err, hashedPassword) => {
					await User.update({ password: hashedPassword }, { where: { email } })
					return res.status(200).json({ success: true, message: "Password updated successfully!" })
				})
			} else {
				return res.json({ success: false })
			}
		} else {
			return res.json({ success: false })
		}
	} catch (error) {
		res.status(500).json({ error: error.message, success: false })
	}
}

module.exports = {
	registerUser,
	loginUser,
	resetPassword
}
