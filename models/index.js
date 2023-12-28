// "use strict"

// const fs = require("fs")
// const path = require("path")
// const Sequelize = require("sequelize")
// const process = require("process")
// const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || "development"
// const config = require(__dirname + "/../config/config.json")[env]
// const db = {}

// let sequelize
// if (config.use_env_variable) {
// 	sequelize = new Sequelize(process.env[config.use_env_variable], config)
// } else {
// 	sequelize = new Sequelize(config.database, config.username, config.password, config)
// }

// console.log(process.env.NODE_ENV)

// fs.readdirSync(__dirname)
// 	.filter((file) => {
// 		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
// 		db[model.name] = model
// 	})

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db)
// 	}
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db

// "use strict"

// const fs = require("fs")
// const path = require("path")
// const Sequelize = require("sequelize")
// const dotenv = require("dotenv")

// // Load environment variables from .env file
// dotenv.config()

// const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || "development"
// const config = require(__dirname + "/../config/config.json")[env]
// const db = {}

// let sequelize

// if (config.use_env_variable) {
// 	sequelize = new Sequelize(process.env[config.use_env_variable], config)
// } else {
// 	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// 		host: process.env.DB_HOST,
// 		port: process.env.DB_PORT,
// 		dialect: "mysql",
// 		dialectModule: require("mysql2"),
// 	})
// }

// fs.readdirSync(__dirname)
// 	.filter((file) => {
// 		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
// 		db[model.name] = model
// 	})

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db)
// 	}
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db

"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.json")[env]
const db = {}

let sequelize

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mysql",
		dialectModule: require("mysql2"),
		pool: {
			max: 10, // Maximum number of connections in the pool
			min: 0, // Minimum number of connections in the pool
			acquire: 30000, // Maximum time, in milliseconds, that a connection can be acquired
			idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
		},
	})
}

// sequelize.query(`ALTER USER '${process.env.DB_USER}'@'127.0.0.1' WITH MAX_USER_CONNECTIONS 20;`)
// sequelize.query(`ALTER USER '${process.env.DB_USER}'@'localhost' WITH MAX_USER_CONNECTIONS 20;`)

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
		db[model.name] = model
	})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
