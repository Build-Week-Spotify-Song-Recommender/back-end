exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("savedSongs")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("savedSongs").insert([
        {
          user_id: 1,
          song_id: 1,
        },
      ]);
    });
};
