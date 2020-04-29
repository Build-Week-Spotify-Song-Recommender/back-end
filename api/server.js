const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

const authRouter = require('../auth/authentication-router.js');
const songsRouter = require('../savedSongsForEachUser/savedSongs-router');

const authenticator = require('../auth/authentication-check-middleware.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use(helmet.hidePoweredBy({ setTo: process.env.HEADER }));
// helmet.frameguard({action: 'deny'});

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 301 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

server.use('/api/auth', cors(corsOptions),authRouter);
server.use('/api/songs', authenticator,songsRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message:'Server is up and running'});
});

module.exports = server;