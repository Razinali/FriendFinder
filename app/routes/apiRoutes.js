// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

// ===============================================================================
// ROUTING
var Friends = require("../data/friends");
// ===============================================================================

module.exports = function (app) {
    // API GET request
    app.get("/api/friends", function (req, res) {
        res.json(Friends);
    });

    // API POST Request - add compatability function here
    app.post("/api/friends", function (req, res) {
        // new user's survey POST
        var newFriend = req.body;
        console.log("New post=", newFriend);

        var lowestCompScore = 9999;
        var bestMatch = {
            name: "",
            photo: ""
        }

        // loop through existing users
        for (var FriendsIdx = 0; FriendsIdx < Friends.length; FriendsIdx++) {

            var currentScore = 0;
            //compare each existing user with new user by looping through the score 0 to 9
            for (var scoreIdx = 0; scoreIdx < 10; scoreIdx++) {
                // modify current score here
                currentScore = currentScore + Math.abs(newFriend.scores[scoreIdx] - Friends[FriendsIdx].scores[scoreIdx]);
            }
            // Best match becomes user with lowest comparable score
            if (currentScore < lowestCompScore) {
                lowestCompScore = currentScore;
                bestMatch.name = Friends[FriendsIdx].name;
                bestMatch.photo = Friends[FriendsIdx].photo;
            }
        }
        console.log(bestMatch);

        Friends.push(newFriend);
        res.json(bestMatch);
    });
}
