const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        'name': {
            type: String,
            min: 3,
            required: true,
        },
        'startTime': {
            type: Number,
            required: true,
        },
        'endTime': {
            type: Number,
            required: true,
        },
        'duration': {
            type: Number,
            required: true,
        },
        'comments': {
            type: Array,
            default: []
        },
        'highlights': {
            'main': String,
            'playerofthematch': {
                'name': String,
                'comments': String,
            },
            'captain1': {
                'name': String,
                'comments': String,
            },
            'captain2': {
                'name': String,
                'comments': String,
            },
            'extra': String,
        },
        "team1": {
            "name": String,
            "goals": {
                "total": {
                    type: Number,
                    default: 0
                },
                "details": {
                    type: Array,
                    default: []
                }
            },
            "stats": {
                "shots": {
                    type: Number,
                    default: 0
                },
                "shotsontarget": {
                    type: Number,
                    default: 0
                },
                "fouls": {
                    type: Number,
                    default: 0
                },
                "passes": {
                    type: Number,
                    default: 0
                },
                "yellowcards": {
                    type: Number,
                    default: 0
                },
                "redcards": {
                    type: Number,
                    default: 0
                },
                "offsides": {
                    type: Number,
                    default: 0
                },
                "corners": {
                    type: Number,
                    default: 0
                },
            },
            "players": {
                type: Array,
                default: []
            }
        },
        "team2": {
            "name": String,
            "goals": {
                "total": {
                    type: Number,
                    default: 0
                },
                "details": {
                    type: Array,
                    default: []
                }
            },
            "stats": {
                "shots": {
                    type: Number,
                    default: 0
                },
                "shotsontarget": {
                    type: Number,
                    default: 0
                },
                "fouls": {
                    type: Number,
                    default: 0
                },
                "passes": {
                    type: Number,
                    default: 0
                },
                "yellowcards": {
                    type: Number,
                    default: 0
                },
                "redcards": {
                    type: Number,
                    default: 0
                },
                "offsides": {
                    type: Number,
                    default: 0
                },
                "corners": {
                    type: Number,
                    default: 0
                },
            },
            "players": {
                type: Array,
                default: []
            }
        },
    },
    { strict: true }
);

module.exports = mongoose.model("matches", schema, "matches");
