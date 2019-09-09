const bodyParser = require("./bodyParser");
const logger = require("./logger");
const cors = require("./cors");

module.exports = app => {
  app.use(cors);
  bodyParser(app);
  app.use(logger);
};
