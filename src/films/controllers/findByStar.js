const Film = require("../models/Film");

module.exports = async function(req, res) {
  const { star } = req.query;

  const data = {
    _id: true,
    title: true,
    release: true,
    format: true,
    stars: true
  };
  const films = await Film.aggregate([
    {
      $project: {
        ...data,
        starsInLowerCase: {
          $map: {
            input: "$stars",
            as: "star",
            in: { $split: ["$$star", " "] }
          }
        }
      }
    },
    {
      $unwind: {
        path: "$starsInLowerCase"
      }
    },
    {
      $match: {
        starsInLowerCase: {
          $elemMatch: { $in: star.toLowerCase().split(" ") }
        }
      }
    },
    { $project: { starsInLowerCase: false } },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        release: { $first: "$release" }
      }
    }
  ]);

  return res.status(200).json({ success: true, films });
};
