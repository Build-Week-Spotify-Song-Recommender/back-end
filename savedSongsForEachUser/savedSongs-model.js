const db = require('../data/db-config.js');

module.exports = {
  add,
  getAllSavedSongsForUser,
  findBy,
  findById,
  removeById
};

function getAllSavedSongsForUser(passedUserId) {
    return db('savedSongs')
        .where('user_id', passedUserId)
        .join('users', 'savedSongs.user_id', 'users.id')
        .join('songs', 'savedSongs.song_id', 'songs.id')
        .select('songs.title','songs.artist', 'songs.album', 'songs.album_cover_art');
  }

function findBy(filter) {
  return db('savedSongs').where(filter);
}

async function add(passedConnection) {
  const [id] = await db('savedSongs').insert(passedConnection);

  return findById(id);
}

function findById(id) {
  return db('savedSongs')
    .where({ id })
    .first();
}

function removeById(id) {
    return db('savedSongs')
      .where({ id })
      .del();
}