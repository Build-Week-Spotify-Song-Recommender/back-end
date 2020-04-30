const router = require("express").Router();
const axios = require("axios");

// for endpoints beginning with /api/recommendedsongs

router.get("/", (req, res) => {
  const song = req.body;

  console.log("passed song:", song);
  const songArtist = song.artist.replace(/\s/, "%20");
  const songTitle = song.title.replace(/\s/, "%20");

  console.log("song artist:", songArtist);
  console.log("song title:", songTitle);

  axios
    .get(
      `https://spotify-song-suggester-4.herokuapp.com/search_something/${songArtist}/${songTitle}`
    )
    .then((results) => {
      let resultOfSuggestions = results.data;
      let songObj = {};
      const dataToReturn = [];

      delete resultOfSuggestions.user_input;

      for (obj in resultOfSuggestions) {
        songObj = {
          title: resultOfSuggestions[obj].track_name,
          artist: resultOfSuggestions[obj].artist,
          album: resultOfSuggestions[obj].album_name,
          album_cover_art: resultOfSuggestions[obj].album_cover,
        };
        dataToReturn.push(songObj);
      }
      res.status(200).json({ results: dataToReturn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
