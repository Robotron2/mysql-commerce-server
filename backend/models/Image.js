module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define("Image", {
		image_url: {
			type: DataTypes.STRING
		}
	})

	Image.associate = (models) => {
		Image.belongsTo(models.Product)
	}

	return Image
}
