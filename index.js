const express = require('express');

const server = express();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`===\n Server is listening on PORT:${PORT} ===\n`);
});