module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		full_name: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
		phone_number: {
			type: DataTypes.STRING
		},
		secret_word: {
			type: DataTypes.STRING
		},
		role: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	})

	User.associate = (models) => {
		User.hasMany(models.Cart)
		User.hasMany(models.Review)
		User.hasMany(models.Order)
	}

	return User
}
