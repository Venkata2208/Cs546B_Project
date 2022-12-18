const Matches = require("../models/matches");
const validator = require("../validators/matches");
const ServerError = require("../shared/server-error");
const sendResponse = require("../shared/sendResponse");
const moment = require("moment");
const xss = require('../shared/xssHelper');

module.exports = {
  getCreateMatch,
  getScheduleMatch,
  createMatch,
  viewMatch,
  getHistory,
  getviewMatch,
  getPlayers,
  getStats,
  getEditStats,
  postStats,
  getCommentary,
  postCommentary,
  getHighlights,
  postHighlights,
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
    const reqBody = xss(req.body);

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

async function getHistory(req, res, next) {
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

async function getviewMatch(req, res, next) {
  try {
    const match_id = req.params.id;

    const match = await Matches.findOne({ _id: match_id }).lean();

    if (req.session.user.currentMatch) {
      return res.render("matches/editScoreboard/editScoreboard", {
        id: match_id,
        team1Name: match.team1.name,
        team2Name: match.team2.name,
        team1Goals: match.team1.stats.goals,
        team2Goals: match.team2.stats.goals,
      });
    }
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getPlayers(req, res, next) {
  try {
    const match_id = req.params.id;

    const match = await Matches.findOne({ _id: match_id }).lean();

    const players = [];

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
      team1Goals: match.team1.stats.goals,
      team2Goals: match.team2.stats.goals,
      players: players,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getStats(req, res, next) {
  try {
    const matchId = req.params.id;
    const match = await Matches.findOne({ _id: matchId }).lean();
    return res.render("matches/viewScoreboard/viewStats", {
      id: req.params.id,
      creator: req.session.user.currentMatch,
      team1Name: match.team1.name,
      team2Name: match.team2.name,
      team1Goals: match.team1.stats.goals,
      team2Goals: match.team2.stats.goals,
      team1stats: match.team1.stats,
      team2stats: match.team2.stats,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getEditStats(req, res, next) {
  try {
    const matchId = req.params.id;

    const match = await Matches.findOne({ _id: matchId });

    return res.render("matches/editScoreboard/editStats", {
      id: req.params.id,
      team1Name: match.team1.name,
      team2Name: match.team2.name,
      team1Goals: match.team1.stats.goals,
      team2Goals: match.team2.stats.goals,
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
    const reqBody = xss(req.body);

    const { error } = validator.validatePostStats(reqBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const team1 = reqBody.team1;
    const team2 = reqBody.team2;

    const match = await Matches.findOne({ _id: matchId });

    const team1stats = match.team1.stats;
    const team2stats = match.team2.stats;

    const team1newStats = {
      goals: team1stats.goals + team1.goals,
      fouls: team1stats.fouls + team1.fouls,
      yellowcards: team1stats.yellowcards + team1.yellowcards,
      redcards: team1stats.redcards + team1.redcards,
      shots: team1stats.shots + team1.shots,
      shotsontarget: team1stats.shotsontarget + team1.shotsontarget,
      corners: team1stats.corners + team1.corners,
      offsides: team1stats.offsides + team1.offsides,
    };

    const team2newStats = {
      goals: team2stats.goals + team2.goals,
      fouls: team2stats.fouls + team2.fouls,
      yellowcards: team2stats.yellowcards + team2.yellowcards,
      redcards: team2stats.redcards + team2.redcards,
      shots: team2stats.shots + team2.shots,
      shotsontarget: team2stats.shotsontarget + team2.shotsontarget,
      corners: team2stats.corners + team2.corners,
      offsides: team2stats.offsides + team2.offsides,
    };

    const result = await Matches.updateOne(
      { _id: matchId },
      { $set: { "team1.stats": team1newStats, "team2.stats": team2newStats } }
    );

    return res.send({ url: `/matches/${matchId}` });
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

    const match = await Matches.findOne({ _id: match_id }).lean();
    const commentary = match.commentary;

    if (req.session.user.currentMatch) {
      return res.render("matches/editScoreboard/editCommentary", {
        id: req.params.id,
        commentary: commentary,
        team1Name: match.team1.name,
        team2Name: match.team2.name,
        team1Goals: match.team1.stats.goals,
        team2Goals: match.team2.stats.goals,
      });
    } else {
      return res.render("matches/viewScoreboard/viewCommentary", {
        id: req.params.id,
        commentary: commentary,
        team1Name: match.team1.name,
        team2Name: match.team2.name,
        team1Goals: match.team1.stats.goals,
        team2Goals: match.team2.stats.goals,
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
    const reqBody = xss(req.body);
    const matchId = req.params.id;

    const { error } = validator.validatePostComment(reqBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const commentary = reqBody.commentary;

    const match = await Matches.updateOne(
      { _id: matchId },
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

async function getHighlights(req, res, next) {
  try {
    const match_id = req.params.id;

    const match = await Matches.findOne({ _id: match_id }).lean();

    const highlights = match.highlights;

    return res.render("matches/editScoreboard/editHighlights", {
      id: req.params.id,
      creator: req.session.user.currentMatch,
      highlights: highlights,
      team1Name: match.team1.name,
      team2Name: match.team2.name,
      team1Goals: match.team1.stats.goals,
      team2Goals: match.team2.stats.goals,
    });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function postHighlights(req, res, next) {
  try {
    const matchId = req.params.id;
    const reqBody = xss(req.body);

    const { error } = validator.validatePostHighlights(reqBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const highlight = reqBody.highlight;

    const match = await Matches.updateOne(
      { _id: matchId },
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
