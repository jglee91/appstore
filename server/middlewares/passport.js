/* eslint-disable object-curly-newline */
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const { LDAP, NATIVE_MEMBER, SECRET_KEY } = require('../config');

module.exports = () => {
  // Ldap Strategy
  const ldapOpts = {
    server: {
      url: LDAP.URL,
      bindDN: LDAP.BIND_DN,
      bindCredentials: LDAP.BIND_CREDENTIALS,
      searchBase: LDAP.SEARCH_BASE,
      searchFilter: `(${LDAP.LOGIN_ATTRIBUTE}={{username}})`,
    },
    usernameField: 'id',
    passwordField: 'password',
  };
  passport.use(new LdapStrategy(ldapOpts, (user, done) => {
    const loginUser = {
      id: user[LDAP.LOGIN_ATTRIBUTE],
      name: user.name,
      isAuth: true,
      isAdmin: NATIVE_MEMBER.includes(user.sAMAccountName),
    };
    done(null, loginUser);
  }));

  // JWT Strategy
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };
  passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
    const loginUser = {
      id: payload.id,
      name: payload.name,
      isAuth: payload.isAuth,
      isAdmin: NATIVE_MEMBER.includes(payload.id),
    };
    done(null, loginUser);
  }));
};
