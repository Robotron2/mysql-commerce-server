module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define("Cart", {
		// Add fields for the cart if needed
	})

	Cart.associate = (models) => {
		// Cart.belongsTo(models.User, { foreignKey: "user_id" })
		Cart.belongsTo(models.User)
		Cart.hasMany(models.CartItem)
	}
	return Cart
}
