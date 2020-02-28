const passport = require('passport');
const { Router } = require('express');
const { decryptPassword, generateToken } = require('../lib/user');

const router = Router();

router.get('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});
router.post('/login', decryptPassword, passport.authenticate('ldapauth', { session: false }), (req, res) => {
  generateToken(req.user, (err, token) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.json({ user: req.user, token });
  });
});

module.exports = router;
