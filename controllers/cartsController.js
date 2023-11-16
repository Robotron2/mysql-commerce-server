const { Cart, CartItem, Product, Image } = require("../models")

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

		res.status(200).json({ cart: cart, success: true })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to create or fetch the cart." })
	}
}

const addToCartController = async (req, res) => {
	try {
		const { productId, quantity } = req.body

		const [cart, created] = await Cart.findOrCreate({
			where: { UserId: req.user.id },
		})

		const existingCartItem = await CartItem.findOne({
			where: { CartId: cart.id, ProductId: productId },
		})

		if (existingCartItem) {
			existingCartItem.quantity += quantity
			await existingCartItem.save()
			res.status(200).json({ existingCartItem, success: true })
		} else {
			const product = await Product.findByPk(productId, {
				attributes: ["id", "price"],
			})
			if (!product) {
				throw Error("Product not found!")
			}
			const cartItem = await CartItem.create({
				CartId: cart.id,
				ProductId: productId,
				quantity: parseInt(quantity),
				price: product.price,
			})
			res.status(200).json({ cartItem, success: true })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message, success: false })
	}
}
const updateCartItemQuantity = async (req, res) => {
	try {
		const { cartItemId, quantity } = req.body

		const cartItem = await CartItem.findOne({
			where: { id: cartItemId },
		})

		if (!cartItem) {
			return res.status(404).json({ error: "Cart item not found" })
		}

		cartItem.quantity = parseInt(quantity)
		await cartItem.save()

		res.status(200).json(cartItem)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: error.message, success: false })
	}
}
const removeCartItemController = async (req, res) => {
	try {
		const { cartItemId } = req.params

		const cartItem = await CartItem.findOne({
			where: { id: cartItemId },
		})

		if (!cartItem) {
			return res
				.status(404)
				.json({ error: "Cart item not found", success: false })
		}

		// console.log(cartItem)
		await cartItem.destroy()

		res.status(204).end()
	} catch (error) {
		console.error(error)
		res
			.status(500)
			.json({ error: "Failed to remove cart item.", success: false })
	}
}
const getCartTotalController = async (req, res) => {
	try {
		const cart = await Cart.findOne({
			where: { UserId: req.user.id },
			attributes: [["id", "cartId"], "UserId"],
			include: [
				{
					model: CartItem,
					attributes: [
						["id", "cartItemId"],
						"quantity",
						"price",
						"CartId",
						"ProductId",
					],
					include: [
						{
							model: Product,
							attributes: [["product_name", "productName"]],
							include: [
								{
									model: Image,
									attributes: ["filename", "filePath"],
								},
							],
						},
					],
				},
			],
		})

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" })
		}

		let totalValue = 0
		cart.CartItems.forEach((cartItem) => {
			totalValue += cartItem.quantity * cartItem.price
		})

		res.status(200).json({ cart, totalValue, success: true })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to fetch the user's cart." })
	}
}

module.exports = {
	findOrCreateCartController,
	addToCartController,
	updateCartItemQuantity,
	removeCartItemController,
	getCartTotalController,
}
