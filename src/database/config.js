require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(error => console.log('This error occured', error));

module.exports = { sequelize };