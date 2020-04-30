const db = require('../data/db-config.js');

module.exports = {
  add,
  findBy,
  findById,
  getUserID
};

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

//returns id of the first user with matched passed username
function getUserID(username) {
  return db.select('id').from('users').where({username}).first();
}