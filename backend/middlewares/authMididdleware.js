const requireSignIn = async (req, res, next) => {
	try {
		const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
		console.log(decode)
		req.user = decode
		next()
	} catch (error) {
		res.status(403).json({ success: false, message: "You are not authorized!" })
	}
}

const isAdmin = async (req, res, next) => {
	try {
		//check role here
	} catch (error) {
		//send error
	}
}

module.exports = {
	requireSignIn
}
