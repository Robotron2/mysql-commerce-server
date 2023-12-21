require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

const db = require("./models")

app.use(express.json())
app.use(
	cors({
		origin: ["http://localhost:5173", "http://192.168.43.166:5173"],
		// credentials: true,
	})
)
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/public", express.static("public", { maxAge: 31536000 }))

//Routers
const UserRouter = require("./routes/Users")
const ProfileRouter = require("./routes/Profiles")
const ProductRouter = require("./routes/Products")
const CategoryRouter = require("./routes/Category")
const CartsRouter = require("./routes/Carts")
const AdminRouter = require("./routes/Admin")

app.use("/auth/user", UserRouter)
app.use("/admin", AdminRouter)
app.use("/products", ProductRouter)
app.use("/category", CategoryRouter)
app.use("/carts", CartsRouter)
app.use("/profile", ProfileRouter)

// db.sequelize.sync({ alter: true, force: true }).then(() => {
// 	app.listen(4000, () => {
// 		console.log("Server running on port 4000")
// 	})
// })
// db.sequelize.sync({ alter: true }).then(() => {
// 	app.listen(4000, () => {
// 		console.log("Server running on port 4000")
// 	})
// })
db.sequelize.sync().then(() => {
	app.listen(4000, () => {
		console.log("Server running on port 4000")
	})
})

// console.log(process.env.NODE_ENV)

// app.use(cors({
// origin: ['http://localhost:5173', 'http://http://192.168.0.184:5173', 'http://another-domain.com'],
//     credentials: true,
//   }));
