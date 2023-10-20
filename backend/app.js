require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

const db = require("./models")

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//Routers
const UserRouter = require("./routes/Users")

app.use("/auth/user", UserRouter)

db.sequelize.sync({ alter: true }).then(() => {
	app.listen(4000, () => {
		console.log("Server running on port 4000")
	})
})

// console.log(process.env.NODE_ENV)
