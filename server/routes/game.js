const express = require("express");
const Game = require("../mongoose/models/game");

// The router will be added as a middleware and will take control of requests starting with path /something.
const router = express.Router();

router.get("/games", (req, res) => {

    // Use Mongoose to get the User by the id
    Game.find()
        .then(function (dbGame) {
            res.json(dbGame);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;