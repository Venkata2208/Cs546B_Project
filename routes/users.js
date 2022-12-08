const users = require("../data/users");

const router = require("express").Router();

router.get("/login", users.getLoginPage);
router.post("/login", users.login);
router.post("/logout", users.logout);
router.get("/signup", users.getSignUpPage);
router.post("/signup", users.signUp);
router.get("/:id", users.getUser);

module.exports = router;
