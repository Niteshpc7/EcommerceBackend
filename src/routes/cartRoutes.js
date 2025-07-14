const express = require('express');

const router = express.Router()

const {addToCart, decreaseQuantityFromCart} = require('../controllers/addToCart');

const protect = require('../middleware/protect')

router.post('/add',protect,addToCart)
router.put('/decrease',protect,decreaseQuantityFromCart);
module.exports = router;
