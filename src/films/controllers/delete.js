const createError = require("http-errors");

const Films = require("../models/Film");

module.exports = async function(req, res, next) {
  const { id } = req.params;

  const film = await Films.findByIdAndRemove({ _id: id });

  if (!film) {
    return next(createError(400, `Film with id ${id} is not exist`));
  }

  return res.json({ success: true });
};
