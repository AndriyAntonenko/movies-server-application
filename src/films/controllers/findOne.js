const createError = require("http-errors");

const Film = require("../models/Film");

module.exports = async function(req, res, next) {
  const { id } = req.params;

  const film = await Film.findById(id)
    .select({
      title: true,
      release: true,
      format: true,
      stars: true
    })
    .lean();

  if (!film) {
    return next(createError(404, `Film with id ${id} not found`));
  }

  return res.status(200).json({ success: true, film });
};
