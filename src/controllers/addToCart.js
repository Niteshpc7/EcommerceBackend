const Cart = require('../model/cart');
const Product = require('../model/product');

// add to cartoon
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productName, quantity = 1 } = req.body;

    const product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ msg: `Sorry, we have only ${product.stock} available.` });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.equals(product._id));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity });
    }

    await cart.save();
    res.status(200).json({ msg: 'Product added to your cart', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.decreaseQuantityFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productName, quantity = 1 } = req.body;

    if (!productName || quantity < 1) {
      return res.status(400).json({ msg: "Valid product name and quantity are required" });
    }

    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const existingItem = cart.items.find(item => item.product.equals(product._id));
    if (!existingItem) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }

    if (existingItem.quantity <= quantity) {
      cart.items = cart.items.filter(item => !item.product.equals(product._id));
    } else {
      existingItem.quantity -= quantity;
    }

    await cart.save();
    res.status(200).json({ msg: "Quantity updated in cart", cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

