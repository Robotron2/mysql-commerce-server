const { User } = require("../models")
const JWT = require("jsonwebtoken")

const requireSignIn = (req, res, next) => {
	const accessToken = req.header("accessToken")
	if (!accessToken) {
		return res.json({ error: "User not logged in" })
	}
	try {
		const validToken = JWT.verify(accessToken, process.env.JWT_SECRET)
		if (validToken) {
			req.user = validToken
			return next()
		}
	} catch (error) {
		return res.json({ error: error.message })
	}
}

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id)
		// console.log(user)
		if (user.role !== 1) {
			res.status(403).send({
				success: false,
				message: "You're not admnin!!",
			})
		} else {
			next()
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	requireSignIn,
	isAdmin,
}
