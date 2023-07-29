
const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlayerSchema = new Schema({
    name: String,
    password: String,
    tamagotchi: {
    health: Number,
    happiness: Number,
    cleanliness: Number,
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    }
  },
});

module.exports = mongoose.model("Player", PlayerSchema);