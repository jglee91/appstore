const passport = require('passport');
const { Router } = require('express');
const { decryptPassword, generateToken } = require('../lib/user');

const router = Router();

router.post(
  '/login',
  decryptPassword,
  passport.authenticate('ldapauth', { session: false }),
  (req, res) => {
    generateToken(req.user, (err, token) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      return res.json({ user: req.user, token });
    });
  },
);
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
