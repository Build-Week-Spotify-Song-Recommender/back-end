
exports.up = function(knex) {
  return knex.schema
  
    //database table for users
    .createTable('users', tbl => {
        tbl.increments();

        tbl
            .string('username', 128)
            .notNullable()
            .unique()
            .index();
        
        tbl.string('password', 128).notNullable();
    })

    //database table for songs
    .createTable('songs', tbl => {
        tbl.increments();

        tbl.string('title', 128).notNullable().index();
        tbl.string('artist', 128).notNullable().index();
        tbl.string('album', 128).notNullable();
    })

    //database table for saved songs
    .createTable('savedSongs', tbl => {
        tbl.increments();

        //foreign key
        tbl
            .string('user_id',255)
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        //foreign key
        tbl
            .string('song_id',255)
            .notNullable()
            .references('id')
            .inTable('songs')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.unique(['user_id', 'song_id']);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
                    .dropTableIfExists('songs')
                    .dropTableIfExists('savedSongs');
};
