const createError = require("http-errors");

module.exports = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404, "Not found"));
  });

  // error-handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  });
};
