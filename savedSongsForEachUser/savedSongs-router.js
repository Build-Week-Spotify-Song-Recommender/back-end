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

    const userId = req.params.id;
    let newSong = req.body;
    let title = newSong.title;

    songsInDatabase.findBy({title})
    .then(found => {
        console.log('es',found);
        if(found.length === 0){
            console.log('inside if')
            songsInDatabase.add(newSong)
            .then(newAddedSong => {
                console.log('new song added', newAddedSong);

                songsInDatabase.getSongID(title)
                .then(foundId => {
                    const songId = foundId.id;
                    const newSavedSong = {user_id:userId, song_id:songId};
        
                    savedSongs.add(newSavedSong)
                        .then(added => {
                            res.status(201).json({message: 'a new song was added to favorities'})
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({message: 'something went wrong'});
                        })
                })
            })
        } else {
            songsInDatabase.getSongID(title)
            .then(foundId => {
                const songId = foundId.id;
                const newSavedSong = {user_id:userId, song_id:songId};
    
                savedSongs.add(newSavedSong)
                    .then(added => {
                        res.status(201).json({message: 'a new song was added to favorities'})
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({message: 'something went wrong'});
                    })
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: 'something went wrong'});
    })
});

module.exports = router;