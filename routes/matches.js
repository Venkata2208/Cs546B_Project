const matches = require("../data/matches");
const { isAuthorized } = require("../middlewares/auth");

const router = require("express").Router();

// Create and Schedule Match
router.get("/createMatch", matches.getCreateMatch);
router.get("/scheduleMatch", matches.getScheduleMatch);
router.post("/", matches.createMatch);

// Find a Match
router.get("/viewMatch", matches.viewMatch);

// History
router.get("/history", matches.getHistory);

// Get match
router.get("/:id", isAuthorized, matches.getviewMatch);

// Get players
router.get("/:id/players", matches.getPlayers);

// Stats
router.get("/:id/stats", isAuthorized, matches.getStats);
router.get("/:id/editStats", isAuthorized, matches.getEditStats);
router.post("/:id/stats", matches.postStats);

// Commentary
router.get("/:id/commentary", matches.getCommentary);
router.post("/:id/commentary", matches.postCommentary);

// Highlights
router.get("/:id/highlights", isAuthorized, matches.getHighlights);
router.post("/:id/highlights", matches.postHighlights);

module.exports = router;
