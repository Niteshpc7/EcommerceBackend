const Product = require("../model/product");

// create product
exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const product = new Product({
      ...req.body,
      user: req.user._id,
      image: imagePath
    });
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// get my products
exports.getMyProducts = async (req, res) => {
  try {
    
    const products = await Product.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// update my product 

exports.updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });

    res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete my product 
exports.deleteMyProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// product listening
exports.productListing = async (req, res) => {
   try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments();

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
