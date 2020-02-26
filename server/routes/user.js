const passport = require('passport');
const { Router } = require('express');

const router = Router();

router.post(
  '/login',
  passport.authenticate('ldapauth', { session: false }),
  (req, res) => {
    console.log(req);
  },
);

module.exports = router;
