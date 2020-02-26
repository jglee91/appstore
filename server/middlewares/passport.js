const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const config = require('../config');

module.exports = () => {
  // Ldap Strategy
  passport.use(new LdapStrategy({
    server: {
      url: config.LDAP_SERVER,
      bindDN: config.LDAP_DN,
      bindCredentials: config.LDAP_CREDENTIALS,
      searchBase: 'ou=passport-ldapauth',
      searchFilter: `(uid={{${config.LDAP_LOGIN_ATTRIBUTE}}})`,
    },
  }));
};
