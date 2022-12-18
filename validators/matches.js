const Joi = require("joi");

module.exports = {
    validateCreate,
    validatePostStats,
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
        startTime: Joi.number().integer().optional(),
        duration: Joi.number().integer().min(1).required(),
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

function validatePostStats(requestBody) {
    const schema = Joi.object({
        team1: Joi.object({
            goals: Joi.number().integer(),
            shots: Joi.number().integer(),
            shotsontarget: Joi.number().integer(),
            fouls: Joi.number().integer(),
            passes: Joi.number().integer(),
            yellowcards: Joi.number().integer(),
            redcards: Joi.number().integer(),
            offsides: Joi.number().integer(),
            corners: Joi.number().integer(),
        }).min(1),
        team2: Joi.object({
            goals: Joi.number().integer(),
            shots: Joi.number().integer(),
            shotsontarget: Joi.number().integer(),
            fouls: Joi.number().integer(),
            passes: Joi.number().integer(),
            yellowcards: Joi.number().integer(),
            redcards: Joi.number().integer(),
            offsides: Joi.number().integer(),
            corners: Joi.number().integer(),
        }).min(1),
    }).min(1);
    return schema.validate(requestBody);
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validatePostComment(requestBody) {
    const schema = Joi.object().keys({
        commentary: Joi.string().min(3).required()
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
        highlight: Joi.string().min(3).required()
    });
    return schema.validate(requestBody);
};
