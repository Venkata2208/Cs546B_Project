const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: String,
    goals: {
      type: Number,
      default: 0,
    },
    stats: {
      shots: {
        type: Number,
        default: 0,
      },
      shotsontarget: {
        type: Number,
        default: 0,
      },
      fouls: {
        type: Number,
        default: 0,
      },
      passes: {
        type: Number,
        default: 0,
      },
      yellowcards: {
        type: Number,
        default: 0,
      },
      redcards: {
        type: Number,
        default: 0,
      },
      offsides: {
        type: Number,
        default: 0,
      },
      corners: {
        type: Number,
        default: 0,
      },
    },
    players: {
      type: Array,
      default: [],
    },
  },
  { _id: false }
);
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    highlights: {
      type: String,
    },
    team1: teamSchema,
    team2: teamSchema,
  },
  { strict: true }
);

module.exports = mongoose.model("matches", schema, "matches");
