const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('sql12721990', 'sql12721990', 'Ggig9GqzFP', {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
    logging: console.log 
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
