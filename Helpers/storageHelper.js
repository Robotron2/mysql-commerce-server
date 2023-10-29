const multer = require("multer")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../uploads/products") // Destination folder for uploaded images
	},
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
		cb(null, uniqueName)
	}
})

const upload = multer({ storage: storage })

module.exports = {
	upload
}
