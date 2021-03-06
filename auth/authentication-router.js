const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");

require("dotenv").config();

const Users = require("../users/users-model.js");
const authenticator = require("./authentication-check-middleware");

// for endpoints beginning with /api/auth

router.post("/register", (req, res) => {
  let { username } = req.body;

  Users.findBy({ username })
    .then((found) => {
      if (found.length === 0) {
        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 14); // 2 ^ n
        user.password = hash;

        Users.add(user)
          .then((saved) => {
            res.status(201).json({ message: "a new user was added" });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(403).json({ message: "username is already used" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error registering! ", err });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        Users.getUserID(user.username).then((foundUserId) => {
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            id: foundUserId.id,
            token: token,
          });
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/updatepassword", authenticator, (req, res) => {
  let { username, password, newPassword } = req.body;

  const hash = bcrypt.hashSync(newPassword, 14); // 2 ^ n
  newPassword = hash;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        Users.changePassword(username, newPassword).then((result) => {
          res.status(200).json({
            result: `${result}`,
            message: `password was changed successfully`,
          });
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
