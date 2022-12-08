const Joi = require("joi");

module.exports = {
    validateCreate,
    validateUpdate,
    validatePostComment,
    validatePostHighlights,
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateCreate(requestBody) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(20).required(),
        startTime: Joi.number().optional(),
        duration: Joi.number().min(30).required(),
        team1: {
            name: Joi.string().alphanum().min(3).max(20).required(),
            players: Joi.array().min(11).max(11).required()
        },
        team2: {
            name: Joi.string().alphanum().min(3).max(20).required(),
            players: Joi.array().min(11).max(11).required()
        }
    });
    return schema.validate(requestBody);
};



/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateUpdate(requestBody) {
    const schema = Joi.object().keys({
        team1: {
            goal: Joi.number().required(),
            scorer: Joi.any().when('goal', { is: 0, then: Joi.string().optional(), otherwise: Joi.string().required() }),
            stats: {
                shots: Joi.number().required(),
                shotsontarget: Joi.number().required(),
                fouls: Joi.number().required(),
                passes: Joi.number().required(),
                yellowcards: Joi.number().required(),
                redcards: Joi.number().required(),
                offsides: Joi.number().required(),
                corners: Joi.number().required()
            },
        },
        team2: {
            goal: Joi.number().required(),
            scorer: Joi.any().when('goal', { is: 0, then: Joi.string().optional(), otherwise: Joi.string().required() }),
            stats: {
                shots: Joi.number().required(),
                shotsontarget: Joi.number().required(),
                fouls: Joi.number().required(),
                passes: Joi.number().required(),
                yellowcards: Joi.number().required(),
                redcards: Joi.number().required(),
                offsides: Joi.number().required(),
                corners: Joi.number().required()
            },
        },
    });
    return schema.validate(requestBody);
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validatePostComment(requestBody) {
    const schema = Joi.object().keys({
        text: Joi.string().required()
    });
    return schema.validate(requestBody);
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validatePostHighlights(requestBody) {
    const schema = Joi.object().keys({
        main: Joi.string().required(),
        playerofthematch: {
            name: Joi.string().required(),
            comments: Joi.string().required()
        },
        captain1: {
            name: Joi.string().required(),
            comments: Joi.string().required()
        },
        captain2: {
            name: Joi.string().required(),
            comments: Joi.string().required()
        },
        extra: Joi.string().required()
    });
    return schema.validate(requestBody);
};
