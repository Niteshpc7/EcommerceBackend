const express = require("express");
const router = express.Router();
const {createProduct,getMyProducts,updateMyProduct,deleteMyProduct,productListing,productFilter} = require("../controllers/productController");
const verifyToken = require('../middleware/protect')
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');


router.post("/createProduct",verifyToken,checkRole('seller'),upload.single('image'),createProduct);
router.get("/getAll",verifyToken, getMyProducts);
// update and remove routes of product
router.put("/Update/:id",verifyToken, updateMyProduct);
router.delete("/remove/:id",verifyToken,deleteMyProduct);
// product listening api
// 
router.get('/productListing', productListing);
// product filter routes hai 
router.get("/filter",productFilter);
module.exports = router;
