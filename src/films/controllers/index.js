const create = require("./create");
const del = require("./delete");
const findOne = require("./findOne");
const findByTitle = require("./findByTitle");
const findByStar = require("./findByStar");
const findMany = require("./findMany");

module.exports = {
  create,
  del,
  findOne,
  findByTitle,
  findByStar,
  findMany
};
