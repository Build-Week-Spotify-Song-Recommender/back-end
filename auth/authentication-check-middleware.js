const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = (req, res, next) => {
    
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;

    if(token){
        jwt.verify(token,secret, (err, decodedToken) => {
        
            if(err){
                console.log(err);
                res.status(500).json({message: 'Sorry, internal error occurred'})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
};