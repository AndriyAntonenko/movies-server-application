const { Router } = require("express");

const validation = require("../validation");
const controllers = require("../controllers");

const router = Router();

router.post("/film", validation.create, controllers.create);
router.delete("/film/:id", validation.checkIdInParams, controllers.del);

router.get("/film/list/:page", validation.findMany, controllers.findMany);
router.get(
  "/film/star",
  validation.findByQueryParam("star"),
  controllers.findByStar
);
router.get(
  "/film/title",
  validation.findByQueryParam("title"),
  controllers.findByTitle
);
router.get("/film/:id", validation.checkIdInParams, controllers.findOne);

module.exports = router;
