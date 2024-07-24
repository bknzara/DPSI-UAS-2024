const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

const DPA = sequelize.define('DPA', {
  ID_DPA: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Foto: {
    type: DataTypes.STRING(255),
  },
  Bidang_Keahlian: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: 'DPA',
  timestamps: false,
});

module.exports = DPA;
