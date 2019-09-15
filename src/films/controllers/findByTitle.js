const Film = require("../models/Film");

module.exports = async function(req, res) {
  const { title } = req.query;

  const films = await Film.find({ title });

  return res.status(200).json({ success: true, films });
};
