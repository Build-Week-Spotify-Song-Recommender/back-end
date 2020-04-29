const db = require('../data/db-config.js');

module.exports = {
  add,
  getAll,
  findBy,
  findById,
  removeById,
  getSongID
};

function getAll() {
    return db('songs');
  }

function findBy(filter) {
  return db('songs').where(filter);
}

async function add(song) {
  const [id] = await db('songs').insert(song);

  return findById(id);
}

function findById(id) {
  return db('songs')
    .where({ id })
    .first();
}

function removeById(id) {
    return db('songs')
      .where({ id })
      .del();
}

//returns id of the first song with matched passed title
function getSongID(title) {
  return db.select('id').from('users').where({title}).first();
}