const router = require('express').Router();

const Songs = require('./songs-model.js');

// for endpoints beginning with /api/songs

router.get('/', (req, res) => {
    Songs.getAll()
        .then(allsongs => {
            res.status(200).json({allsongs})
        })
});

module.exports = router;