const Matches = require("../models/matches");
const validator = require("../validators/matches");
const ServerError = require("../shared/server-error");
const sendResponse = require("../shared/sendResponse");
const moment = require("moment");
const { ObjectId } = require("mongodb");

module.exports = {
  getCreateMatch,
  createMatch,
  getScheduleMatch,
  getMatches,
  getHighlights,
  postHighlights,
  postscorecard,
  viewMatch,
  postviewMatch,
  getviewMatch,
  getPlayers,
  getStats,
  postStats,
  getCommentary,
  postCommentary,
  editStats,
};

async function getCreateMatch(req, res, next) {
  try {
    return res.render("matches/create");
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function viewMatch(req, res, next) {
  try {
    return res.render("matches/viewMatch");
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getPlayers(req, res, next) {
  try {
    const reqBody = req.body;
    const match_id = req.params.id;
    const match = await Matches.findOne({ _id: ObjectId(match_id) }).lean();
    let players = [];

    for (let i = 0; i < 11; i++) {
      players.push({
        team1: match.team1.players[i],
        team2: match.team2.players[i],
      });
    }

    return res.render("matches/players", {
      id: match_id,
      team1Name: match.team1.name,
      team2Name: match.team2.name,
      players: players,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function postviewMatch(req, res, next) {
  try {
    const reqBody = req.body;
    const match_id = req.params.id;
    // const match = await Matches.findOne({ _id: ObjectId(match_id) }).lean();
    //render edit scoreboard page
    return res.send({ url: `/matches/viewMatchWithId/${match_id}` });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getviewMatch(req, res, next) {
  try {
    const reqBody = req.body;
    const match_id = req.params.id;
    const match = await Matches.findOne({ _id: ObjectId(match_id) }).lean();
    if (match) {
      return res.render("matches/editScoreboard/editScoreboard", {
        id: match_id,
      });
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function getMatches(req, res, next) {
  try {
    const matches = await Matches.find({ userId: req.session.user.id }).lean();
    return res.render("matches/history", { data: matches });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function getScheduleMatch(req, res, next) {
  try {
    return res.render("matches/schedule");
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function createMatch(req, res, next) {
  try {
    const reqBody = req.body;

    const { error } = validator.validateCreate(reqBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const startTime = reqBody.startTime || moment().unix();
    const endTime = startTime + reqBody.duration * 60;

    const team1 = reqBody.team1;
    const team2 = reqBody.team2;

    let match = {
      name: reqBody.name,
      userId: req.session.user.id,
      startTime: startTime,
      endTime: endTime,
      duration: reqBody.duration,
      team1: {
        name: team1.name,
        players: team1.players,
      },
      team2: {
        name: team2.name,
        players: team2.players,
      },
    };

    const result = await Matches.create(match);
    return sendResponse(res, 200, result);
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getHighlights(req, res, next) {
  try {
    const match_id = req.params.id;
    const loggedUserId = req.session.user.id;
    const match = await Matches.findOne({ _id: ObjectId(match_id) }).lean();
    const highlights = match.highlights;

    // if (match.userId == loggedUserId) {
    //   return res.render("matches/editScoreboard/editHighlights", {
    //     id: req.params.id,
    //     highlights: highlights,
    //   });
    // } else {
    //   return res.render("matches/viewScoreboard/viewHighlights", {
    //     id: req.params.id,
    //     highlights: highlights,
    //   });
    // }

    return res.render("matches/editScoreboard/editHighlights", {
      id: req.params.id,
      highlights: highlights,
      creator: loggedUserId == match.userId,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getCommentary(req, res, next) {
  try {
    const match_id = req.params.id;
    const loggedUserId = req.session.user.id;
    const match = await Matches.findOne({ _id: ObjectId(match_id) }).lean();
    const commentary = match.commentary;

    if (match.userId == loggedUserId) {
      return res.render("matches/editScoreboard/editCommentary", {
        id: req.params.id,
        commentary: commentary,
      });
    } else {
      return res.render("matches/viewScoreboard/viewCommentary", {
        id: req.params.id,
        commentary: commentary,
      });
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function postCommentary(req, res, next) {
  try {
    //update commentary array of match

    const matchId = req.params.id;
    const commentary = req.body.commentary;

    const match = await Matches.updateOne(
      { _id: ObjectId(matchId) },
      { $push: { commentary: commentary } }
    );

    return res.send({ url: `/matches/${matchId}/commentary` });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function postHighlights(req, res, next) {
  try {
    //update highlights array of match

    const matchId = req.params.id;
    const highlight = req.body.highlight;

    const match = await Matches.updateOne(
      { _id: ObjectId(matchId) },
      { $push: { highlights: highlight } }
    );

    return res.send({ url: `/matches/${matchId}/highlights` });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function postscorecard(req, res, next) {
  try {
    const matchId = req.body.matchID;
    const team1stats = req.body.team1stats;
    const team2stats = req.body.team2stats;
    //find match id and replace team1 object with key stats with new stats
    const match1 = await Matches.findOneAndUpdate(
      { _id: ObjectId(matchId) },
      { $set: { team1: { stats: team1stats } } },
      { new: true }
    ).lean();
    //find match id and replace team2 object with key stats with new stats
    const match2 = await Matches.findOneAndUpdate(
      { _id: ObjectId(matchId) },

      { $set: { team2: { stats: team2stats } } },
      { new: true }
    ).lean();
    //get match with id and return
    const match = await Matches.findOne({ _id: ObjectId(matchId) }).lean();
    return sendResponse(res, 200, match);
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function getStats(req, res, next) {
  // try {
  //   return res.render("matches/editScoreboard/editStats", {
  //     id: req.params.id,
  //   });
  // } catch (error) {
  //   if (error instanceof ServerError) {
  //     return next(error);
  //   }
  //   return next(new ServerError(500, error.message));
  // }

  try {
    return res.render("matches/viewScoreboard/viewStats", {
      id: req.params.id,

      creator: req.session.user.currentMatch,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function postStats(req, res, next) {
  try {
    const matchId = req.params.id;

    const team1 = req.body.team1;
    const team2 = req.body.team2;

    const match = await Matches.findOne({ _id: ObjectId(matchId) }).lean();

    const team1stats = match.team1.stats;
    const team2stats = match.team2.stats;

    const team1newStats = {
      goals: team1stats.goals + team1.goals,
      fouls: team1stats.fouls + team1.fouls,
      yellowCards: team1stats.yellowCards + team1.yellowCards,
      redCards: team1stats.redCards + team1.redCards,
      shots: team1stats.shots + team1.shots,
      shotsOnTarget: team1stats.shotsOnTarget + team1.shotsOnTarget,
      corners: team1stats.corners + team1.corners,
      offsides: team1stats.offsides + team1.offsides,
    };
    const team2newStats = {
      goals: team2stats.goals + team2.goals,
      fouls: team2stats.fouls + team2.fouls,
      yellowCards: team2stats.yellowCards + team2.yellowCards,
      redCards: team2stats.redCards + team2.redCards,
      shots: team2stats.shots + team2.shots,
      shotsOnTarget: team2stats.shotsOnTarget + team2.shotsOnTarget,
      corners: team2stats.corners + team2.corners,
      offsides: team2stats.offsides + team2.offsides,
    };

    const match1 = await Matches.findOneAndUpdate(
      { _id: ObjectId(matchId) },
      { $set: { team1: { stats: team1newStats } } },
      { new: true }
    ).lean();

    const match2 = await Matches.findOneAndUpdate(
      { _id: ObjectId(matchId) },

      { $set: { team2: { stats: team2newStats } } },
      { new: true }
    ).lean();

    return res.send({ url: `/matches/getMatch/${matchId}` });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
async function editStats(req, res, next) {
  try {
    return res.render("matches/editScoreboard/editStats", {
      id: req.params.id,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}
