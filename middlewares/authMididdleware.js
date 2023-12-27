const { User } = require("../models")
const JWT = require("jsonwebtoken")

const requireSignIn = (req, res, next) => {
  const accessToken = req.header("accessToken")
  try {
    if (!accessToken) {
      return res.status(403).json({ error: "User not logged in" })
    }
    const validToken = JWT.verify(accessToken, process.env.JWT_SECRET)
    if (validToken) {
      req.user = validToken
      return next()
    }
  } catch (error) {
    return res.json({ error: error.message })
  }
}

const isCustomer = (req, res, next) => {
  const accessToken = req.header("accessToken")

  const roles = {
    isCustomer: false,
    isAdmin: false,
  }

  try {
    if (!accessToken) {
      return res.status(403).json({ error: "User not logged in" })
    }
    const validToken = JWT.verify(accessToken, process.env.JWT_SECRET)
    if (validToken.role === 0) {
      roles.isCustomer = true
      req.roles = roles

      return next()
    }
    if (validToken.role === 1) {
      roles.isCustomer = true
      roles.isAdmin = true
      req.roles = roles
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
        message: "You're not an admnin!!",
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
  isCustomer,
  isAdmin,
}
