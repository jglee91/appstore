const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const config = require('../config');

function decryptPassword(req, res, next) {
  const bytes = crypto.AES.decrypt(req.body.password, config.SECRET_KEY);
  req.body.password = bytes.toString(crypto.enc.Utf8);
  return next();
}

function generateToken(payload, done) {
  jwt.sign(payload, config.SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
    done(err, token);
  });
}

module.exports = {
  decryptPassword,
  generateToken,
};
