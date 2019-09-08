const Films = require("../models/Film");

module.exports = async function(req, res) {
  const { body } = req;

  const newFilm = await Films.create(body);

  res.json({ success: true, newFilm });
};
