const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

const Mahasiswa = sequelize.define('Mahasiswa', {
  ID_Mahasiswa: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  NIM: {
    type: DataTypes.STRING(20),  
    allowNull: false,
    unique: true,
  },
  Jurusan: {
    type: DataTypes.STRING(100),  
    allowNull: false,
  }
}, {
  tableName: 'Mahasiswa',
  timestamps: false,
});

module.exports = Mahasiswa;
