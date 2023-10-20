module.exports = (sequelize, DataTypes) => {
	const OrderItem = sequelize.define("OrderItem", {
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		price_at_purchase: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	})

	OrderItem.associate = (models) => {
		// OrderItem.belongsTo(models.Order, { foreignKey: "order_id" })
		OrderItem.belongsTo(models.Order)
		// OrderItem.belongsTo(models.Product, { foreignKey: "product_id" })
		OrderItem.belongsTo(models.Product)
	}
	return OrderItem
}
