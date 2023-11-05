const express = require("express")
const router = express.Router()

const {
	createProductController,
	getAllProductsController,
	getSingleProductController,
	updateSingleProductController,
	deleteProductController,
} = require("../controllers/productsController")
const multer = require("multer")
const { isAdmin, requireSignIn } = require("../middlewares/authMididdleware")

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public")
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1]
		cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`)
	},
})

const multerFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[1] === "png") {
		cb(null, true)
	} else if (file.mimetype.split("/")[1] === "jpg") {
		cb(null, true)
	} else if (file.mimetype.split("/")[1] === "jpeg") {
		cb(null, true)
	} else {
		cb(new Error("Not a Valid Image File!!"), false)
	}
}

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
})

//create product
router.post(
	"/create-product",
	requireSignIn,
	isAdmin,
	upload.single("image"),
	createProductController
)

//getAll products
router.get("/", getAllProductsController)

//getSingle product
router.get("/product/:id", getSingleProductController)

//update product detail
router.put(
	"/product/:id",
	requireSignIn,
	isAdmin,
	upload.single("image"),
	updateSingleProductController
)

//delete product
router.delete("/product/:id", requireSignIn, isAdmin, deleteProductController)

module.exports = router
