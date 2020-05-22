const db = require("../data/db-config.js");

module.exports = {
  add,
  getAllSavedSongsForUser,
  findBy,
  findById,
  removeSongFromSaved,
};

function getAllSavedSongsForUser(passedUserId) {
  return db("savedSongs")
    .where("user_id", passedUserId)
    .join("users", "savedSongs.user_id", "users.id")
    .join("songs", "savedSongs.song_id", "songs.id")
    .select(
      "songs.track_name",
      "songs.track_id",
      "songs.artist",
      "songs.album_name",
      "songs.album_cover"
    );
}

function findBy(filter) {
  return db("savedSongs").where(filter);
}

function add(passedConnection) {
  return db("savedSongs").insert(passedConnection);
}

function findById(id) {
  return db("savedSongs").where({ id }).first();
}

function removeSongFromSaved(passedUserId, passedSongId) {
  return db("savedSongs")
    .where({ user_id: passedUserId, song_id: passedSongId })
    .del();
}
