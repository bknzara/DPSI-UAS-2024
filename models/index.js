require('dotenv').config();
const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  benchmark: true
});
// Uji koneksi
sequelize.authenticate()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 });
// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;
