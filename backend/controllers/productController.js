const Product = require('../models/Product');
const Activity = require('../models/Activity');

exports.createProduct = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    await Activity.create({ user: req.user.username, action: `Created product ${p.name}` });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('supplier');
    res.json(products);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('supplier');
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await Activity.create({ user: req.user.username, action: `Updated product ${updated?.name || req.params.id}` });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    await Activity.create({ user: req.user.username, action: `Deleted product ${removed?.name || req.params.id}` });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
