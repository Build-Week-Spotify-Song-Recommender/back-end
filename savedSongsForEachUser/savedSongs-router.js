const router = require("express").Router();

const savedSongs = require("./savedSongs-model.js");
const songsInDatabase = require("../songs/songs-model.js");

// for endpoints beginning with /api/songs

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  savedSongs
    .getAllSavedSongsForUser(userId)
    .then((allSavedSongs) => {
      res.status(200).json({ allSavedSongs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.post("/:id", (req, res) => {
  const userId = req.params.id;
  let newSong = req.body;
  let track_name = newSong.track_name;

  songsInDatabase
    .findBy({ track_name })
    .then((found) => {
      console.log("es", found);
      if (found.length === 0) {
        console.log("inside if");
        songsInDatabase.add(newSong).then((newAddedSong) => {
          console.log("new song added", newAddedSong);

          songsInDatabase.getSongID(track_name).then((foundId) => {
            const songId = foundId.id;
            const newSavedSong = { user_id: userId, song_id: songId };

            savedSongs
              .add(newSavedSong)
              .then((added) => {
                res
                  .status(201)
                  .json({ message: "a new song was added to favorites" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  message:
                    "something went wrong if song was not in the database",
                });
              });
          });
        });
      } else {
        songsInDatabase.getSongID(track_name).then((foundId) => {
          const songId = foundId.id;
          const newSavedSong = { user_id: userId, song_id: songId };

          savedSongs
            .add(newSavedSong)
            .then((added) => {
              res
                .status(201)
                .json({ message: "a new song was added to favorites" });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "something went wrong if song was in the database",
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const songTitle = req.body.title;

  songsInDatabase
    .getSongID(songTitle)
    .then((foundId) => {
      const songId = foundId.id;

      savedSongs.removeSongFromSaved(userId, songId).then((deleted) => {
        if (deleted === 1) {
          res
            .status(200)
            .json({ message: `${songTitle} was removed from favorites` });
        } else {
          res.status(304).json({
            message: "the song was not removed or was not in your favorites",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
