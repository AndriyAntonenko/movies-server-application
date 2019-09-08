const Film = require("../models/Film");

module.exports = async function(req, res) {
  const { star } = req.query;

  const films = await Film.aggregate([
    {
      $project: {
        title: true,
        release: true,
        format: true,
        stars: true,
        starsInLowerCase: {
          $map: {
            input: "$stars",
            as: "star",
            in: { $toLower: "$$star" }
          }
        }
      }
    },
    {
      $match: {
        starsInLowerCase: { $elemMatch: { $eq: star.toLowerCase() } }
      }
    },
    { $project: { starsInLowerCase: false } }
  ]);

  return res.status(200).json({ success: true, films });
};
