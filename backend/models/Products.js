module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define("Product", {
		product_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		stock_quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	})

	Product.associate = (models) => {
		Product.belongsTo(models.Category)
		Product.hasOne(models.Image)
		Product.hasMany(models.CartItem)
		Product.hasMany(models.OrderItem)
		Product.hasMany(models.Review)
	}
	return Product
}
