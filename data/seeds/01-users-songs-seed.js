exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          title: "sorry",
          artist: "justin bieber",
          album: "album1",
          album_cover_art:
            "https://i.ytimg.com/vi/fRh_vgS2dFE/maxresdefault.jpg",
        },
        {
          title: "never say never",
          artist: "justin bieber",
          album: "album2",
          album_cover_art:
            "https://occ-0-1068-92.1.nflxso.net/dnm/api/v6/TsSRXvDuraoJ7apdkH6tsHhf-ZQ/AAAABQ49gMFyyHa23VBj5Fc1BFdUWyxA2DMXkmM1YNzFfeqdb8kcmHQB9aeWwGNbqomReFsCStPvmVcFtUNMnSpa0aowHcpm-vusoWns.png?r=d11",
        },
      ]);
    });
};
