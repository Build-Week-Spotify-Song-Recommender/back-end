const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  
});

router.post('/login', (req, res) => {
  
});

function generateToken(user){
  const payload = {
    userId: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET || 'keep it secret';

  const options ={
    expiresIn: '2h'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;