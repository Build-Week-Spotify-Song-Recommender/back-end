exports.up = function (knex) {
  return (
    knex.schema

      //database table for users
      .createTable("users", (tbl) => {
        tbl.increments();

        tbl.string("username", 128).notNullable().unique();

        tbl.string("emailAddress", 128).notNullable().unique();

        tbl.string("password", 128).notNullable();
      })

      //database table for songs
      .createTable("songs", (tbl) => {
        tbl.increments();

        tbl.string("title", 128).notNullable().unique();
        tbl.string("artist", 128).notNullable();
        tbl.string("album", 128).notNullable();
        tbl.string("album_cover_art").notNullable();
      })

      //database table for saved songs
      .createTable("savedSongs", (tbl) => {
        tbl.increments();

        //foreign key
        tbl
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        //foreign key
        tbl
          .integer("song_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("songs")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");

        tbl.unique(["user_id", "song_id"]);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("savedSongs")
    .dropTableIfExists("songs")
    .dropTableIfExists("users");
};
