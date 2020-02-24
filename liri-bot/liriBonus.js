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
        getMeSpotify();
        break;
      case "concert-this":
        getMyBands(inquirerRes.value);
        break;
        case "movie-this":
          getMeMovie(inquirerRes.value);
          break;
    }
  })


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


  if (songName === undefined) {
    songName = "What's my age again";
  }

  /** TODO: Write the code to exceute the command below. 
   * 
   *      node liri.js spotify-this-song '<song name here>'
   * 
   * 
   * 

    * This will show the following information about the song in your terminal/bash window

        1. Artist(s)

        2. The song's name

        3. A preview link of the song from Spotify

        4. The album that the song is from

    * If no song is provided then your program will default to "The Sign" by Ace of Base.

    * You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

  */
var id = "57e4e05a2f9846adab5dfced3a84f7fc";
var secret = "abe9fa9e17bc44d69907679d6af15ce6";

   var spotify = new Spotify({
    id: id,
    secret: secret
  });

  spotify
    .search({
       type: 'track',
        query: "ghoast riders in the sky"})
    .then(function(response) {
      console.log(response.tracks.items);
    })
    .catch(function(err) {
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
      console.log(response.data.Title + " " + response.data.Released + " " + response.data.Ratings[0].Value + " " + response.data.Ratings[1].Value + " " + response.data.Country + " " + response.data.Language + " " + response.data.Plot +  " " +response.data.Actors);
      
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