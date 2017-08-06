//Load Data
var path = require("path");
var friendsData = require("../data/friends.js");

//Routing
module.exports = function(app) {
	//API GET Request
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	//API POST Request
	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		console.log("newFriend = " + JSON.stringify(newFriend));

		var userResponse = newFriend.scores;
		console.log("user scores = " + userResponse);

		var matchName = "";
		var matchPic = "";

		var bestMatch = {
			name: "",
			photo: "",
			difference: 1000
		};

		var totalDiff = 0; 

		for (var i = 0; i < friendsData.length; i++) {
			console.log(friendsData[i].name);

			var totalDiff = 0;

			for (var x = 0; x < friendsData[i].scores[x]; x++){
				totalDiff += Math.abs(friendsData[i].scores[x] - userResponse[x]);
			
				if(totalDiff <= bestMatch.difference){
					bestMatch.name = friendsData[i].name;
					bestMatch.photo = friendsData[i].photo;
					bestMatch.difference = totalDiff;
				}
			}			
		}	
			
		console.log("closest match = " + bestMatch.name);

		matchName = bestMatch.name;
		matchPic = bestMatch.photo;
		
		friendsData.push(newFriend);

		res.json({status: "OK", matchName: matchName, matchPic: matchPic});
	});
}