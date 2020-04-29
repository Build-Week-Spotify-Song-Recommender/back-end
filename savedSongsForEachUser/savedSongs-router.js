const router = require('express').Router();

const savedSongs = require('./savedSongs-model.js');
const songsInDatabase = require('../songs/songs-model.js');

// for endpoints beginning with /api/songs

router.get('/:id', (req, res) => {

    const userId = req.params.id;

    savedSongs.getAllSavedSongsForUser(userId)
        .then(allSavedSongs => {
            res.status(200).json({allSavedSongs})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'something went wrong'});
        })
});

router.post('/:id', (req, res) => {

    let newSong = req.body;

    songsInDatabase.findBy(newSong.title)
    .then(found => {
        if(found.length === 0){
            songsInDatabase.add(newSong)
            .then(newAddedSong => {
                console.log('new song added', newAddedSong);

                const songId = songsInDatabase.getSongID(newSong.title);

                savedSongs.add(JSON.stringify({user_id: req.params.id, song_id: songId}))
                .then(added => {
                    res.status(201).json({message: 'a new song was added to favorities'})
                })
            })
        } else {
            const songId = songsInDatabase.getSongID(newSong.title);

            savedSongs.add(JSON.stringify({user_id: req.params.id, song_id: songId}))
                .then(added => {
                    res.status(201).json({message: 'a new song was added to favorities'})
                })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: 'something went wrong'});
    })
});

module.exports = router;