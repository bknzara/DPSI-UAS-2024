const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const DPA = require('./DPA');

const JadwalPerwalian = sequelize.define('Jadwal_Perwalian', {
  ID_Jadwal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_DPA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Waktu: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Lokasi: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Jadwal_Perwalian',
  timestamps: false,
});

JadwalPerwalian.belongsTo(DPA, { foreignKey: 'ID_DPA' });

module.exports = JadwalPerwalian;
