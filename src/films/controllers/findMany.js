const config = require("config");

const Film = require("../models/Film");

module.exports = async function(req, res) {
  const page = req.params.page - 1;
  const limit = config.get("filmsPerPage");
  const order = req.query.order || "ASC";

  const films = await Film.find()
    .select("_id title release")
    .sort({ title: order === "DESC" ? -1 : 1 })
    .skip(limit * page)
    .limit(limit)
    .lean();

  return res.status(200).json({ success: true, films });
};
