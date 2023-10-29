module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define("Order", {
		// Add fields for the order if needed
	})

	Order.associate = (models) => {
		Order.belongsTo(models.User)
		// Order.belongsTo(models.User, { foreignKey: "user_id" })
		Order.hasMany(models.OrderItem)
	}
	return Order
}
