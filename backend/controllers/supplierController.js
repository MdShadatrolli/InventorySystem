const Supplier = require('../models/Supplier');
const Activity = require('../models/Activity');

exports.createSupplier = async (req, res) => {
  try {
    const s = await Supplier.create(req.body);
    await Activity.create({ user: req.user.username, action: `Created supplier ${s.name}` });
    res.json(s);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSuppliers = async (req, res) => {
  try {
    const list = await Supplier.find();
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSupplier = async (req, res) => {
  try {
    const u = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await Activity.create({ user: req.user.username, action: `Updated supplier ${u.name}` });
    res.json(u);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
