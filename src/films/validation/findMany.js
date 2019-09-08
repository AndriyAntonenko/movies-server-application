const Joi = require("@hapi/joi");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const schemaForParams = Joi.object().keys({
    page: Joi.number()
      .integer()
      .positive()
      .required()
  });
  const schemaForQuery = Joi.object().keys({
    order: Joi.string().valid("DESC", "ASC")
  });

  Joi.validate(req.params, schemaForParams, err => {
    if (err) {
      next(createError(400, err.message));
    } else {
      Joi.validate(req.query, schemaForQuery, err2 => {
        if (err2) {
          next(createError(400, err.message));
        } else {
          next();
        }
      });
    }
  });
};
