const { Cart } = require("../models")

// Create a new cart or get an existing one
const findOrCreateCartController = async (req, res) => {
	// console.log(req.user)
	//    user =  {
	//     id: 2,
	//     username: 'Admin Theo',
	//     email: 'admin@admin.com',
	//     address: 'Roboshoppp',
	//     phone: '09087654321',
	//     role: 1,
	//     iat: 1699933921,
	//     exp: 1700020321
	//   }
	try {
		const [cart, created] = await Cart.findOrCreate({
			where: { UserId: req.user.id },
			attributes: ["id", "UserId"],
		})

		res.status(200).json(cart)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to create or fetch the cart." })
	}
}

const addToCartController = async () => {}
const updateCartItemQuantity = () => {}
const removeCartItemController = () => {}
const getCartTotalController = () => {}

module.exports = {
	findOrCreateCartController,
	addToCartController,
	updateCartItemQuantity,
	removeCartItemController,
	getCartTotalController,
}
