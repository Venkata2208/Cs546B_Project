const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    stats: {
      goals: {
        type: Number,
        default: 0,
      },
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
      type: [String],
      min: 11,
      max: 11
    },
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    time: {
      type: Number,
      required: true,
    },
    comment: {
      type: Number,
      required: true,
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
    commentary: {
      type: [commentSchema],
      default: [],
    },
    highlights: {
      type: Array,
      default: [],
    },
    team1: teamSchema,
    team2: teamSchema,
  },
  { strict: true }
);

module.exports = mongoose.model("matches", schema, "matches");
