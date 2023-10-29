const express = require("express")
const router = express.Router()

const { createProductController, getAllProductsController } = require("../controllers/productsController")
const multer = require("multer")
// app.post("/api/upload", )

// Set up storage options
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "uploads/")
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname)
// 	}
// })

// const upload = multer({ dest: "public/files" })
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
  
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png") {
      cb(null, true);
    } 
    else if (file.mimetype.split("/")[1] === "jpg") {
      cb(null, true);
    } 
    else if (file.mimetype.split("/")[1] === "jpeg") {
      cb(null, true);
    } 
    else {
      cb(new Error("Not a Valid Image File!!"), false);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

//create product
// router.post("/create-product", createProductController)
router.post("/create-product", upload.single("image"), createProductController)

//getAll products
router.get("/", getAllProductsController)
//getSingle product

//update product detail

//delete product

module.exports = router
