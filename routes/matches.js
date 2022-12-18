const matches = require("../data/matches");
const { isAuthorized } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/createMatch", matches.getCreateMatch);
router.get("/scheduleMatch", matches.getScheduleMatch);
router.post("/", matches.createMatch); //
router.get("/history", matches.getMatches);
router.get("/:id/highlights", isAuthorized, matches.getHighlights);
router.post("/:id/highlights", isAuthorized, matches.postHighlights); //
router.get("/:id/commentary", isAuthorized, matches.getCommentary);
router.post("/:id/commentary", isAuthorized, matches.postCommentary); //

router.post("/scorecared", matches.postscorecard);
// router.get("/:id/stats", matches.getStats);
router.post("/:id/stats", isAuthorized, matches.postStats); //
router.get("/:id/editStats", isAuthorized, matches.editStats);
router.get("/:id/stats", isAuthorized, matches.getStats);

// router.post("/highlights", matches.postHighlights);
// router.route("/highlights").post(async (req, res) => {
//   let matchID = req.body.matchID;
//   let highlight = req.body.highlight;
//   matches.postHighlights2(matchID, highlight);
//   res.redirect("/matches/history");
// });

router.get("/viewMatch", matches.viewMatch);
router.get("/:id/players", isAuthorized, matches.getPlayers);
router.post("/viewMatchWithId/:id", matches.postviewMatch);
router.get("/:id", isAuthorized, matches.getviewMatch);

// router.put("/", matches.updateMatch);
// router.post("/comments", matches.postComment);
// router.post("/highlights", matches.postHighlights);

module.exports = router;
