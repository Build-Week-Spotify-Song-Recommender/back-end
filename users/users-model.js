const db = require("../data/db-config.js");

module.exports = {
  add,
  findBy,
  findById,
  getUserID,
  changePassword,
};

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}

function findById(id) {
  return db("users").where({ id }).first();
}

//returns id of the first user with matched passed username
function getUserID(username) {
  return db.select("id").from("users").where({ username }).first();
}

function changePassword(username, newPassword) {
  return db("users").where({ username }).update({ password: newPassword });
}
