const fs = require("fs");
const os = require("os");

const Joi = require("@hapi/joi");
const createError = require("http-errors");

const Films = require("../models/Film");

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(createError(500, "Error during reading file"));
      resolve(data);
    });
  });
}

function unlinck(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) reject(createError(500, "Error during reading file"));
      resolve();
    });
  });
}

function validate(films) {
  const schema = Joi.array().items(
    Joi.object().keys({
      title: Joi.string()
        .max(150)
        .min(1)
        .required(),
      release: Joi.number()
        .min(1895)
        .required(),
      format: Joi.string().valid("VHS", "DVD", "Blu-Ray"),
      stars: Joi.array()
        .items(
          Joi.string()
            .max(150)
            .min(2)
        )
        .max(50)
    })
  );

  return new Promise((resolve, reject) => {
    Joi.validate(films, schema, err => {
      if (err) reject(createError(404, err.message));
      resolve();
    });
  });
}

module.exports = async function(req, res, next) {
  const fieldsList = {
    Title: "title",
    "Release Year": "release",
    Format: "format",
    Stars: "stars"
  };
  try {
    if (req.files.sampleText.name.split(".").slice(-1)[0] !== "txt") {
      throw createError(400, "Bad file extantion");
    }

    const data = await readFile(req.files.sampleText.path);

    const films = data
      .toString()
      .split(os.EOL)
      .filter(str => !!str.trim());

    const filmArrays = [];

    for (let i = 0; i < films.length; i += 4) {
      filmArrays.push(films.slice(i, i + 4));
    }

    const filmsObj = filmArrays.map(filmArr => {
      const resObj = {};

      filmArr.forEach(field => {
        let [fieldName, fieldVal] = field.split(":");
        fieldName = fieldName.trim();
        fieldVal = fieldVal.trim();

        if (fieldsList[fieldName] === "stars") {
          fieldVal = fieldVal.split(",").map(star => star.trim());
        }

        if (fieldsList[fieldName] === "release") {
          fieldVal = +fieldVal;
        }

        resObj[fieldsList[fieldName]] = fieldVal;
      });

      return resObj;
    });

    await validate(filmsObj);

    await Promise.all([
      unlinck(req.files.sampleText.path),
      ...filmsObj.map(film => Films.create(film))
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    next(!error.status ? createError(400, "Bad file format") : error);
  }
};
