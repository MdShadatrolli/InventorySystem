const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
  try {
    const list = await Activity.find().sort({ timestamp: -1 }).limit(100);
    res.json(list);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
