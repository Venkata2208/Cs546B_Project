const ServerError = require('../shared/server-error');
const Matches = require('../models/matches');
const { isValidObjectId: isObjectId } = require("mongoose");

module.exports = {
    isAuthenticated,
    isAuthorized,
};

async function isAuthenticated(req, res, next) {
    const url = req.originalUrl;
    if (req.session.user) {
        if (['/', '/users/login', 'users/signup'].includes(url)) {
            return res.render('matches/home');
        } else {
            return next();
        }
    } else {
        if (['/users/login', '/users/signup'].includes(url)) return next();
        else return next(new ServerError(403, 'User not logged in'));
    }
}

async function isAuthorized(req, res, next) {
    if (req.session.user) {
        const id = req.params.id;

        if (!isObjectId(id)) return next(new ServerError(400, 'Invalid match id'));

        const match = await Matches.findOne({ _id: id }, { userId: 1 });

        if (req.session.user.id == match.userId) return next();

        return next(new ServerError(403, 'User is not authorized to do this operation'));
    } else {
        return next(new ServerError(403, 'User not logged in'));
    }
}