module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define("Review", {
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		review_text: {
			type: DataTypes.TEXT
		},
		review_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	})

	Review.associate = (models) => {
		Review.belongsTo(models.User)
		Review.belongsTo(models.Product)
	}
	return Review
}
