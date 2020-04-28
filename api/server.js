const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

const authRouter = require('../auth/authentication-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(helmet.hidePoweredBy({ setTo: process.env.HEADER }));
helmet.frameguard({action: 'deny'});

server.use('/api/auth', authRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message:'Server is up and running'});
});

module.exports = server;