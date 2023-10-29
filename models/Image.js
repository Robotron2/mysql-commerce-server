module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define("Image", {
		filename: DataTypes.STRING, // Store the file name
		filePath: DataTypes.STRING // Store the file path on the server
	})

	Image.associate = (models) => {
		Image.belongsTo(models.Product)
	}

	return Image
}
