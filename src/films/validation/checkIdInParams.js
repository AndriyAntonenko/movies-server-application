const Joi = require("@hapi/joi");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string()
      .length(24)
      .hex()
      .required()
  });

  Joi.validate(req.params, schema, err => {
    if (err) {
      next(createError(400, err.message));
    } else {
      next();
    }
  });
};
