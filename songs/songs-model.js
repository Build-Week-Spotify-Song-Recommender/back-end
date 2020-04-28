const db = require('../data/db-config.js');

module.exports = {
  add,
  findBy,
  findById,
  removeById
};

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
      .remove();
  }