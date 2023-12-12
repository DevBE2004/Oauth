const router = require("express").Router();
const ctrl = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");
router.get("/", verifyToken, ctrl.getUser);

module.exports = router;
