const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
// const { Strategy: JwtStrategy } = require('passport-jwt');
// const { ExtractJwt } = require('passport-jwt');
const { LDAP, NATIVE_MEMBER } = require('../config');

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

  // // JWT Strategy
  // const jwtOpts = {
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   secretOrKey: 'secret',
  // };
  // passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
  //   console.log(payload);
  // }));
};
