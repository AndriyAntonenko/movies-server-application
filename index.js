const express = require("express");

const middlewares = require("./src/middlewares");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const filmRouter = require("./src/films/routes");

require("./src/libs/mogoose");

middlewares(app);

app.use("/api", filmRouter);

errorHandler(app);

module.exports = app;
