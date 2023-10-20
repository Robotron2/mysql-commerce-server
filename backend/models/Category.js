module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define("Category", {
		category_name: {
			type: DataTypes.STRING
		}
	})

	Category.associate = (models) => {
		// Category.hasMany(models.Product, { foreignKey: "category_id" })
		Category.hasMany(models.Product)
	}
	return Category
}
