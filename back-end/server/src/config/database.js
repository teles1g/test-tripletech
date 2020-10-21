require('dotenv/config');

module.exports = {
  dialect: process.env.DB_SQLITE,
  storage: process.env.DB_PATH_FILE,
};
