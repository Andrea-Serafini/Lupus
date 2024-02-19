const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const GameSchema = new Schema({

    gameCode: {
        type: String,
        required: true,
        index: { unique: true }
    },
    winners: {
        type: String,
        required: true,
    },
    players: {
        type: Array,
        required: true,
    },
    history: {
        type: Array,
        required: true,
    }

});


// Export the Schema
module.exports = mongoose.model("Game", GameSchema);