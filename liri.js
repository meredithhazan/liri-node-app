var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

var action = process.argv[2];
var searchThis = "";
var nodeArgs = process.argv;
for (var i = 3; i < nodeArgs.length; i++) {
  searchThis = searchThis.trim() + " " + nodeArgs[i];
}    
console.log(searchThis);
if (action === "my-tweets") {
   myTweets();
} else if (action === "spotify-this-song") {
	  spotifyThis();
} else if (action === "movie-this") {
    movieThis();
}	else {
    doWhatItSays();
}


function myTweets() {
 	//console.log("display my-tweets");
 	var client = new Twitter(keys.twitterKeys);
 	var params = {screen_name: "wear_resistance"};
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
   if (error) {
    console.log(error);
  } else {
   console.log("My recent tweets:");
   for (i = 0; i < tweets.length; i++) {
    console.log("------------------------");
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
    logData(tweets[i].text);
    logData(tweets[i].created_at);
  };
};
});
}

function spotifyThis() {
    //console.log("display spotify");
    console.log(searchThis);
    var spotify = new Spotify(keys.spotifyKeys);
    if (searchThis) { 
      spotify.search({
        type: "track",
        query: searchThis.replace('”', ''),
        limit: 5
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
        } else {
          for (d = 0; d < data.tracks.items.length; d++) {

            console.log("^^^^^^^^^^^^^^^^^^^^");
            console.log("Artist(s): " + data.tracks.items[d].artists[0].name +
              "\nTrack: " + data.tracks.items[d].name + 
              "\nLink to preview: " + data.tracks.items[d].preview_url + 
              "\nAlbum: " + data.tracks.items[d].album.name);
            logData("Artist(s): " + data.tracks.items[d].artists[0].name +
            "\nTrack: " + data.tracks.items[d].name + 
            "\nLink to preview: " + data.tracks.items[d].preview_url + 
            "\nAlbum: " + data.tracks.items[d].album.name);
          }
        }    
      })
    } else {
      spotify.search({
       type: "track",
       query: "The Sign"
       //limit: 5
     },
     function(err, data) {
       if (err) {
        console.log("Error occurred: " + err);
      } else {
       for (d = 0; d < data.tracks.items.length; d++) {
         if (data.tracks.items[d].artists[0].name == "Ace of Base") {
           console.log("^^^^^^^^^^^^^^^^^^^^");
           console.log("Artist(s): " + data.tracks.items[d].artists[0].name +
            "\nTrack: " + data.tracks.items[d].name + 
            "\nLink to preview: " + data.tracks.items[d].preview_url + 
            "\nAlbum: " + data.tracks.items[d].album.name);
           logData("Artist(s): " + data.tracks.items[d].artists[0].name +
            "\nTrack: " + data.tracks.items[d].name + 
            "\nLink to preview: " + data.tracks.items[d].preview_url + 
            "\nAlbum: " + data.tracks.items[d].album.name);
         }        
       }
     }    
   })
    }   
  }

  function movieThis() {
    if (searchThis === "") {
      request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("***************************");
          console.log("Title: " + JSON.parse(body).Title +
            "\nReleased: " + JSON.parse(body).Year + 
            "\nIMDB Rating: " + JSON.parse(body).imdbRating +
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
            "\nProduced in: " + JSON.parse(body).Country +
            "\nLanguage: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nStarring: " + JSON.parse(body).Actors);
          console.log("***************************");
          logData("Title: " + JSON.parse(body).Title +
            "\nReleased: " + JSON.parse(body).Year + 
            "\nIMDB Rating: " + JSON.parse(body).imdbRating +
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
            "\nProduced in: " + JSON.parse(body).Country +
            "\nLanguage: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nStarring: " + JSON.parse(body).Actors);
        } 
      }) 
    } else {
      request("http://www.omdbapi.com/?t=" + searchThis + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("***************************");
          console.log("Title: " + JSON.parse(body).Title +
            "\nReleased: " + JSON.parse(body).Year + 
            "\nIMDB Rating: " + JSON.parse(body).imdbRating +
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
            "\nProduced in: " + JSON.parse(body).Country +
            "\nLanguage: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nStarring: " + JSON.parse(body).Actors);
          console.log("***************************");
          logData("Title: " + JSON.parse(body).Title +
            "\nReleased: " + JSON.parse(body).Year + 
            "\nIMDB Rating: " + JSON.parse(body).imdbRating +
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
            "\nProduced in: " + JSON.parse(body).Country +
            "\nLanguage: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nStarring: " + JSON.parse(body).Actors);
        };     
      });
    };
  };

  function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data);
      var dataArr = data.split(",");
      console.log(dataArr);
      action = dataArr[0];
      searchThis = dataArr[1].trim();
      searchThis = searchThis.replace('”', '');
      console.log(searchThis);
      if (action === "my-tweets") {
        myTweets();
      } else if (action === "spotify-this-song") {
        spotifyThis();
      } else if (action === "movie-this") {
        movieThis();
      }
    })
  }

  function logData(result) {
    fs.appendFile("log.txt", result + "\n", function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(result + " logged.");
      }
    })
  }




   