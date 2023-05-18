const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Ticketmaster API and API key.
const ticketmasterEndpoint = "https://app.ticketmaster.com/discovery/v2";
const ticketmasterApiKey = "NYHQ5OXKPCffIlgh0eeGYDBS6O7Lkcm0";

// YouTube API and API key.
const youtubeEndpoint = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = "AIzaSyBtZrNEkKIpzQv4ECxR9RhQZdh22peBxgs";

// call the Ticketmaster API and get a list of attractions for a keyword.
async function getAttractions(keyword) {
  const url = `${ticketmasterEndpoint}/attractions.json?apikey=${ticketmasterApiKey}&keyword=${keyword}`;
  const response = await fetch(url);
  const json = await response.json();
  const attractions = json._embedded.attractions;
  console.log(attractions);

  return attractions;
}

//call the YouTube API and get a list of videos for a keyword.
async function getVideos(keyword) {
  const url = `${youtubeEndpoint}/search?part=snippet&q=${keyword}&key=${youtubeApiKey}`;
  const response = await fetch(url);
  const json = await response.json();
  const videos = json.items;
  console.log(videos);

  return videos;
}

app.get("/", async (request, response) => {
  const keyword = request.query.search;
  if (!keyword) {
    response.render("index", { title: "Search" });
    return;
  }

  const [attractions, videos] = await Promise.all([
    getAttractions(keyword),
    getVideos(`${keyword} videos`),
  ]);
  response.render("index", {
    title: "Search results",
    keyword: keyword,
    attractions: attractions,
    videos: videos,
  });
});

// Start the server.
app.listen(8888, () => {
  console.log("Server started on port 8888.");
});
