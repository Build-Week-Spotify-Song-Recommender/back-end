const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(helmet.hidePoweredBy({ setTo: process.env.HEADER }));
helmet.frameguard({action: 'deny'});



module.exports = server;