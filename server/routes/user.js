const passport = require('passport');
// const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const { Router } = require('express');
const config = require('../config');

const router = Router();

function decryptPassword(req, res, next) {
  const bytes = crypto.AES.decrypt(req.body.password, config.SECRET_KEY);
  req.body.password = bytes.toString(crypto.enc.Utf8);
  return next();
}

router.post('/login', decryptPassword, passport.authenticate('ldapauth', { session: false }), (req, res) => {
  res.json(req.user);
});
// // FIXME 임시코드 제거
// router.post('/dummyLogin', (req, res) => {
//   jwt.sign(req.body, 'secret', { expiresIn: '60s' }, (err, token) => {
//     res.json({ token });
//   });
// });
// router.post('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
//   console.log(req);
// });

module.exports = router;
