const db = require("../data/db-config.js");

module.exports = {
  add,
  getAll,
  findBy,
  findById,
  removeById,
  getSongID,
};

function getAll() {
  return db("songs");
}

function findBy(filter) {
  return db("songs").where(filter);
}

function add(song) {
  return db("songs").insert(song);
}

function findById(id) {
  return db("songs").where({ id }).first();
}

function removeById(id) {
  return db("songs").where({ id }).del();
}

//returns id of the first song with matched passed title
function getSongID(title) {
  return db.select("id").from("songs").where({ title }).first();
}
