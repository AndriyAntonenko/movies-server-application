const Joi = require("@hapi/joi");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
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
  });

  Joi.validate(req.body, schema, err => {
    if (err) {
      next(createError(400, err.message));
    } else {
      next();
    }
  });
};
