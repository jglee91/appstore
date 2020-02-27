module.exports = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  LDAP: JSON.parse(process.env.LDAP),
  SECRET_KEY: process.env.SECRET_KEY,
  NATIVE_MEMBER: JSON.parse(process.env.NATIVE_MEMBER),
};
