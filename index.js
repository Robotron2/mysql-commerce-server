require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

const db = require("./models")

app.use(express.json())

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/public", express.static("public", { maxAge: 31536000 }))

const allowedOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2, process.env.ORIGIN_3]

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:") || origin.startsWith("http://192.168.43.")) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	credentials: true,
}

app.use(cors(corsOptions))
// const corsOptions = {
// 	origin: "*",
// 	credentials: true,
// }

app.use(cors(corsOptions))

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
const port = process.env.PORT || 4000
db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Roboshoppp server is running`)
	})
})

// console.log(process.env.NODE_ENV)

// app.use(cors({
// origin: ['http://localhost:5173', 'http://http://192.168.0.184:5173', 'http://another-domain.com'],
//     credentials: true,
//   }));
