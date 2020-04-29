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

router.post('/', (req, res) => {

    let newSong = req.body;

    Songs.findBy(newSong.title)
    .then(found => {
        if(found.length === 0){
            Songs.add(newSong)
            .then(newAddedSong => {
                res.status(201).json({message: 'a new song was added'})
            })
        } else {
            res.status(403).json({message: 'already in the database'});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: 'something went wrong'});
    })
});

module.exports = router;