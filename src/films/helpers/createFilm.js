const createError = require("http-errors");

const Films = require("../models/Film");

module.exports = async function(body) {
  body.stars = body.stars.map(s => s.toLowerCase());

  const filmWithSuchTitle = await Films.findOne({ title: body.title });

  const uniqueStars = [...new Set(body.stars)];
  if (uniqueStars.length !== body.stars.length) {
    throw createError(400, "Actors must be unique");
  }

  if (filmWithSuchTitle) {
    throw createError(400, `Film with title "${body.title}" already exist`);
  }
  const newFilm = await Films.create(body);
  return newFilm;
};
