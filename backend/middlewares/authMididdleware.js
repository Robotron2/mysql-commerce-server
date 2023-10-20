const requireSignIn = async (req, res, next) => {
	try {
		const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
		req.user = decode
		next()
	} catch (error) {
		res.status(403).json({ success: false, message: "You are not authorized!" })
	}
}

module.exports = {
	requireSignIn
}
