
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('songs').insert([
        {title: 'song1', artist: 'artist1', album: 'album1'},
        {title: 'song2', artist: 'artist2', album: 'album2'},
        {title: 'song3', artist: 'artist3', album: 'album3'},
        {title: 'song4', artist: 'artist4', album: 'album4'},
        {title: 'song5', artist: 'artist5', album: 'album5'},
        {title: 'song6', artist: 'artist6', album: 'album6'},
      ]);
    });
};
