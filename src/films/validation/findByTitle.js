const Joi = require("@hapi/joi");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(1)
      .max(150)
      .required()
  });

  Joi.validate(req.query, schema, err => {
    if (err) {
      next(createError(400, err.message));
    } else {
      next();
    }
  });
};
