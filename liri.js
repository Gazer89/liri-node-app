
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var file = require('file-system');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];

switch (userInput) {
    case 'my-tweets':
        twitter();
        break;
    case 'spotify-this-song':
        spot();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        rand();
        break;
    default:      
    }

//twitter api  
    function twitter (){
        var count = 20;
        // var tiwitterHandel = "from:@" + process.argv[3];
        var tiwitterHandel = "from:@missy64494908"
        // var count = process.argv[4];
            client.get('search/tweets', {q:tiwitterHandel, result_type:'recent', count:count}, function(error, tweets, response) {
            // console.log(tweets)
                if (error) {
                    return console.log('Error occurred: ' + error);
                }
                else {
                    for (i=0; i < tweets.statuses.length; i++) {
                    console.log("------------------------------------------------------------")
                    console.log(tweets.statuses[i].created_at + ": "+ tweets.statuses[i].text);
                    }
                    // console.log(tweets.statuses)
                }
            });
        }

  //spotify api  
  var song;
  var trackSearch;
    function spot (){ 
        song = process.argv[3];
            if (song){
                song = process.argv.slice(3).join(" ");
                trackSearch = {type: "track", query:song, limit: 1 }
            }
            else {
                song = "The Sign AND Ace of Base";
                var artist = "Ace of Base";
                trackSearch = {type: "track,album" , query:song, limit: 1 }
            }
        spotify.search(trackSearch, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
                }
            else {
                var artistName = data.tracks.items[0].artists[0].name;
                var songName = data.tracks.items[0].name; 
                var previewLink = data.tracks.items[0].preview_url;
                var album = data.tracks.items[0].album.name;
                    if (previewLink === null){
                        previewLink = "Sorry, no preview avalible!"
                    }
                    else {
                        previewLink = data.tracks.items[0].preview_url;
                    }
                console.log("------------------------------------------------------------")
                console.log("Artist Name: " + artistName);
                console.log("Song Title: " + songName);
                console.log("Preview Link: " + previewLink);
                console.log("Album Name: " + album);
                // console.log(data.tracks.items)
                }   
        });
    }

// movie api 
    var movie;
    var queryMovie;
    function movie (){
        movie = process.argv[3];
        var movieApikey = "&apikey=trilogy"
        if (movie){
            movie = process.argv.slice(3).join(" ");
            queryMovie = "http://www.omdbapi.com?&t=" + movie + movieApikey;
        }
        else {
            movie = "Mr. Nobody";
            queryMovie = "http://www.omdbapi.com?&t=" + movie + movieApikey;
        }
        request(queryMovie, function (error, response, body) {
            var moiveResult = JSON.parse(body);
            var rateings;
                if (moiveResult.Ratings.length != 3 ){
                    rateings = "Splat, no Rotten Tomatto rateing!";
                }
                else {
                    rateings = moiveResult.Ratings[1].Value;
                }
            console.log("------------------------------------------------------------")
            console.log('Title:', moiveResult.Title); 
            console.log('Year:', moiveResult.Year); 
            console.log('IMDB Rateing:', moiveResult.imdbRating); 
            console.log('Rotten Tomattos Rateing:', rateings); 
            console.log('Contry Produced In:', moiveResult.Country); 
            console.log('Language:', moiveResult.Language); 
            console.log('Plot:', moiveResult.Plot); 
            console.log('Actors:', moiveResult.Actors); 
            // console.log(moiveResult);
        });
    }

//fs function to run random command
function rand (){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
        return console.log(err);
            }
        else {
            var splitData = data.split(",");
            process.argv[2]=splitData[0];
            process.argv[3]=splitData[1];
            spot();
           }
        });
    }

