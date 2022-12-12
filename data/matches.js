const Matches = require("../models/matches");
const validator = require("../validators/matches");
const ServerError = require("../shared/server-error");
const sendResponse = require("../shared/sendResponse");
const moment = require('moment');

module.exports = {
    getCreateMatch,
    createMatch,
    getScheduleMatch,
    getMatches,
    viewMatch,
    Scorecard,
    getScorecard,
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
};

async function viewMatch(req, res, next) {
    try {
        return res.render("matches/viewMatch");
    } catch (error) {
        if (error instanceof ServerError) {
            return next(error);
        }
        return next(new ServerError(500, error.message));
    }
};

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
};
async function getScheduleMatch(req, res, next) {
    try {
        return res.render("matches/schedule");
    } catch (error) {
        if (error instanceof ServerError) {
            return next(error);
        }
        return next(new ServerError(500, error.message));
    }
};

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
                players: team1.players
            },
            team2: {
                name: team2.name,
                players: team2.players
            }
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

async function getScorecard(req, res, next) {
    try {
        return res.render("matches/scorecard");
    } catch (error) {
        if (error instanceof ServerError) {
            return next(error);
        }
        return next(new ServerError(500, error.message));
    }
};
async function Scorecard(req, res, next) {
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
                players: team1.players
            },
            team2: {
                name: team2.name,
                players: team2.players
            }
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