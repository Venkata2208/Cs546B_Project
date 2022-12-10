const matches = require("../data/matches");
// const { isAuthenticated, isAuthorized } = require('../middlewares/auth');

const router = require("express").Router();

router.get("/createMatch", matches.getCreateMatch);
router.get("/scheduleMatch", matches.getScheduleMatch);
router.post("/", matches.createMatch);
router.get("/history", matches.getMatches);
router.get("/highlights", matches.getHighlights);
router.post("/highlights", matches.postHighlights);

// router.put("/", matches.updateMatch);
// router.post("/comments", matches.postComment);
// router.post("/highlights", matches.postHighlights);

module.exports = router;
