// DEPENDENCIES
// =====================================
var inquirer = require("inquirer")
// Read and set environment variables
require("dotenv").config();

// Import the API keys
var keys = require("./keys");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS
// =====================================
if (!process.argv[2]) {
  inquirer
    .prompt([{
        type: "input",
        message: "enter a function",
        name: "function"
      },
      {
        type: "input",
        message: "enter a value",
        name: "value"
      }
    ]).then(function (inquirerRes) {
      console.log(inquirerRes.function);
      switch (inquirerRes.function) {
        case "s":
          if (!inquirerRes.value) {
            getMeSpotify("What's my age again")
          } else {
            getMeSpotify(inquirerRes.value);
          }
          break;
        case "concert-this":
          getMyBands(inquirerRes.value);
          break;
        case "movie-this":
          getMeMovie(inquirerRes.value);
          break;
      }
    })
}


// Writes to the log.txt file
var writeToLog = function (data) {

  /** FIXME: BONUS
   * 
   * 

      In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

      Make sure you append each command you run to the log.txt file.

      Do not overwrite your file each time you run a command.
    */

  // Append the JSON data and add a newline character to the end of the log.txt file

};

// Helper function that gets the artist name
var getArtistNames = function (artist) {
  return artist.name;
};

// Function for running a Spotify search
var getMeSpotify = function (songName) {

  console.log(songName);

  // if (songName === undefined) {
  //   songName = "What's my age again";
  // }
  //songName = 'I Want it That Way'
  spotify
    .search({
      type: 'track',
      query: songName
    })
    .then(function (response) {
      console.log(response.tracks.items[0].album.artists);
    })
    .catch(function (err) {
      console.log(err);
    });
  spotify.search();
};



// Function for concert search
var getMyBands = function (artist) {

  /** TODO: Write the code to exceute the command below. 
   * 
   *        node liri.js concert-this <artist/band name here>
   * 
   * This will search the Bands in Town Artist Events API
        1. Name of the venue
        2. Venue location
        3. Date of the Event (use moment to format this as "MM/DD/YYYY")
      Important: There is no need to sign up for a Bands in Town api_id key. Use the codingbootcamp as your app_id. 
   * 
  */
  //FIXME: 
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


  axios.get(queryURL).then(


    function (response) {
      var res = response.data

      for (let i = 0; i < res.length; i++) {
        console.log(res[i].venue.name + ", " + res[i].venue.city + ", " + res[i].venue.region + ": " + moment(res[i].datetime).format("MM/DD/YYYY"));
      }






      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      var logData = [];

      logData.push("Upcoming concerts for " + artist + ":");



    }
  );
};

/** TODO: Write the code to exceute the command below. 
 * 
 *        node liri.js movie-this '<movie name here>'
 * 
 *   This will output the following information to your terminal/bash window:
 * 
      1. Title of the movie.
      2. Year the movie came out.
      3. IMDB Rating of the movie.
      3. Rotten Tomatoes Rating of the movie.
      4. Country where the movie was produced.
      5. Language of the movie.
      6. Plot of the movie.
      7. Actors in the movie.

    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 
*/
// Function for running a Movie Search
var getMeMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }


  //FIXME: 
  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(urlHit).then(
    function (response) {
      var jsonData = response.data;

      //FIXME: Finish the code below
    
console.log("Movie title: " + jsonData.Title);
console.log("Release Data: " + jsonData.Released);
console.log("IMDB Rating: " + jsonData.Ratings[0].Value);
console.log("Rotton Tomatoes: " + jsonData.Ratings[1].Value);
console.log("Contry produced: " + jsonData.Country);
console.log("Language: " +  jsonData.Language);
console.log("Plot: " + jsonData.Plot);
console.log("Actors: " + jsonData.Actors);








    }
  );
};

// Function for running a command based on text file
var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }


  });
  

  
};

if (process.argv[2] === "do-what-it-says") {
  doWhatItSays();
}
// Function for determining which command is executed
var pick = function (command, commandData) {
  //TODO:  Write your code below
  // This will be the main function to control which method to call. See function "runThis" is calling this pick method


};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));

