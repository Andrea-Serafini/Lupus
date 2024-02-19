const express = require("express");
const User = require("../mongoose/models/user");

// The router will be added as a middleware and will take control of requests starting with path /something.
const router = express.Router();

router.post("/user", (req, res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        goodWins: 0,
        badWins: 0,
        playedGames: [],
    });

    // Create a new User
    User.create(newUser)
        .then(function (dbUser) {
            // View the added result in the console
            console.log(dbUser);
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
});

router.get("/user/:username", (req, res) => {

    // Use Mongoose to get the User by the id
    User.findOne({ username: req.params.username })
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});

router.get("/users", (req, res) => {

    // Use Mongoose to get the User by the id
    User.find()
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
});
module.exports = router;