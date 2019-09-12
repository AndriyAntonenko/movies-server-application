const createError = require("http-errors");

const Films = require("../models/Film");

module.exports = async function(req, res, next) {
  const { body } = req;

  const filmWithSuchTitle = await Films.findOne({ title: body.title }).lean();

  if (filmWithSuchTitle) {
    return next(
      createError(400, `Film with title "${body.title}" already exist`)
    );
  }
  const newFilm = await Films.create(body);

  return res.json({ success: true, newFilm });
};
