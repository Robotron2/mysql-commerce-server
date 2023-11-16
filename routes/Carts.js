const express = require("express")
const {
	findOrCreateCartController,
	addToCartController,
	updateCartItemQuantity,
	removeCartItemController,
	getCartTotalController,
} = require("../controllers/cartsController")
const { requireSignIn } = require("../middlewares/authMididdleware")

const router = express.Router()

router.get("/", requireSignIn, findOrCreateCartController)

//add to cart
router.post("/add", requireSignIn, addToCartController)

//update cart_item quantity
router.put("/update", requireSignIn, updateCartItemQuantity)

//remove cart_item
router.delete("/remove/:cartItemId", requireSignIn, removeCartItemController)

router.get("/total", requireSignIn, getCartTotalController)

module.exports = router
