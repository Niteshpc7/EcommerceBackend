const express = require("express");
const router = express.Router();
const {createProduct,getMyProducts,updateMyProduct,deleteMyProduct,productListing} = require("../controllers/productController");
const verifyToken = require('../middleware/protect')
const checkRole = require('../middleware/checkRole');



router.post("/createProduct",verifyToken,checkRole('seller'),createProduct);
router.get("/getAll",verifyToken, getMyProducts);
// update and remove routes of product
router.put("/Update/:id",verifyToken, updateMyProduct);
router.delete("/remove/:id",verifyToken,deleteMyProduct);
// product listening api
// 
router.get('/productListing', productListing);

module.exports = router;
