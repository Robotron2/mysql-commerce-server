module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define("Image", {
		image: {
			type: DataTypes.BLOB("long"),
			allowNull: false
		}
	})

	Image.associate = (models) => {
		Image.belongsTo(models.Product)
	}

	return Image
}
