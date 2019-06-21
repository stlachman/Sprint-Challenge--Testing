const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  find,
  findById
};

async function insert(game) {
  const [id] = await db("games").insert(game, "id");
  return db("games")
    .where({ id })
    .first();
}

function find() {
  return db("games");
}

function findById(id) {
  return db("games")
    .where({ id })
    .first();
}
