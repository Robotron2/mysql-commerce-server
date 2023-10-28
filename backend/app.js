require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

const db = require("./models")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))

// app.use(
// formidable({
// 	encoding: "utf-8",
// 	uploadDir: "/uploads",
// 	keepExtensions: true,
// 	maxFileSize: 10 * 1024 * 1024, // 10MB
// 	multiples: true
// })
// )

//Routers
const UserRouter = require("./routes/Users")
const ProductRouter = require("./routes/Products")
const CategoryRouter = require("./routes/Category")

app.use("/auth/user", UserRouter)
app.use("/products", ProductRouter)
app.use("/category", CategoryRouter)

// db.sequelize.sync({ alter: true, force: true }).then(() => {
// 	app.listen(4000, () => {
// 		console.log("Server running on port 4000")
// 	})
// })
db.sequelize.sync({ alter: true }).then(() => {
	app.listen(4000, () => {
		console.log("Server running on port 4000")
	})
})

// console.log(process.env.NODE_ENV)
