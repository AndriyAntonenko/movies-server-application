const create = require("../helpers/createFilm");

module.exports = async function(req, res, next) {
  const { body } = req;

  try {
    const newFilm = await create(body);
    res.json({ success: true, newFilm });
  } catch (error) {
    next(error);
  }
};
