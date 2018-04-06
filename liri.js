
require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// var request = require('request');
// request('http://www.omdbapi.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

var userInput = (process.argv[2]);

switch (userInput) {
    case 'my-tweets':
        console.log("twitter response");
        twiter();
        break;
    case 'spotify-this-song':
        console.log();
        break;
    case 'movie-this':
        console.log();
        break;
    case 'do-what-it-says':
        console.log();
        break;
    default:
        console.log();        
    }

  //twitter api  
    function twiter (){
        client.get('favorites/list', function(error, tweets, response) {
            if(error) throw error;
            console.log(tweets);  // The favorites. 
            console.log(response);  // Raw response object. 
          });
    }