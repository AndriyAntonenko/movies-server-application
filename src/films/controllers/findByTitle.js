const Film = require("../models/Film");

module.exports = async function(req, res) {
  const { title } = req.query;

  const films = await Film.aggregate([
    {
      $project: {
        title: true,
        release: true,
        format: true,
        stars: true,
        lowerCaseTitle: { $toLower: "$title" }
      }
    },
    {
      $match: {
        lowerCaseTitle: title.toLowerCase()
      }
    },
    { $project: { lowerCaseTitle: false } }
  ]);

  return res.status(200).json({ success: true, films });
};
