const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PASSWORD,
  DB: process.env.DB_NAME,
  LOG: process.env.SQL_LOGGING,
  dialect: 'mysql',
  dialectOptions: { decimalNumbers: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
