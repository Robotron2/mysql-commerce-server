module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define("Category", {
		category_name: {
			type: DataTypes.STRING,
			unique: true
		}
	})

	Category.associate = (models) => {
		Category.hasMany(models.Product)
	}
	return Category
}
