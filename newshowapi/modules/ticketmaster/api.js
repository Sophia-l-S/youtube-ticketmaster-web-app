
async function getShows() {
  fetch("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NYHQ5OXKPCffIlgh0eeGYDBS6O7Lkcm0")
    .then(response => response.json())
    .then(json => {
      const artist = json._embedded.attractions[0];
      const artistName = artist.name;
      const events = artist._embedded.events;
      const firstEvent = events[0];
      const eventDate = new Date(firstEvent.dates.start.dateTime);
      const eventDateString = eventDate.toLocaleDateString();
      const eventTimeString = eventDate.toLocaleTimeString();
      console.log(`Artist: ${artistName}`);
      console.log(`First upcoming show: ${eventDateString} at ${eventTimeString}`);
    })
    .catch(error => {
      console.error(error);
    });
    return await response.json();
  }
  function getArtistSongs() {
    getAttractions()
      .then(artistName => {
        // search for videos on YouTube.
        const query = `${artistName} songs`;
        const apiKey = 'AIzaSyBtZrNEkKIpzQv4ECxR9RhQZdh22peBxgs';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}`;
  
        fetch(url)
          .then(response => response.json())
          .then(json => {
            // Extract the video titles from the search results and log them to the console.
            const videos = json.items;
            const titles = videos.map(video => video.snippet.title);
            console.log(`Songs by ${artistName}:`);
            console.log(titles.join('\n'));
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  module.exports = {
    getShows,
    getArtistSongs
  };