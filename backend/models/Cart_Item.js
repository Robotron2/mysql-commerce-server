module.exports = (sequelize, DataTypes) => {
	const CartItem = sequelize.define("CartItem", {
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	})

	CartItem.associate = (models) => {
		// CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" })
		CartItem.belongsTo(models.Cart)
		CartItem.belongsTo(models.Product)
		// CartItem.belongsTo(models.Product, { foreignKey: "product_id" })
	}
	return CartItem
}
