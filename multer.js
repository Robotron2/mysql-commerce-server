const multer = require("multer")

const storage = multer.diskStorage({
	destination: "./src/uploads/",
	filename: (req, file, cb) => {
		return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
	}
})

const upload = multer({
	storage: storage
})
