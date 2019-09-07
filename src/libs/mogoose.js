const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(config.mongoose.url, config.mongoose.options);

module.exports = mongoose;
