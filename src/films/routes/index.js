const { Router } = require("express");

const validation = require("../validation");
const controllers = require("../controllers");

const router = Router();

router.post("/film", validation.create, controllers.create);
router.delete("/film/:id", validation.del, controllers.del);

module.exports = router;
