const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const Mahasiswa = require('./mahasiswa');
const DPA = require('./DPA');

const Pesan = sequelize.define('Pesan', {
  ID_Pesan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_Mahasiswa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_DPA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Isi_Pesan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Tanggal_Kirim: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Pesan',
  timestamps: false,
});

Pesan.belongsTo(Mahasiswa, { foreignKey: 'ID_Mahasiswa' });
Pesan.belongsTo(DPA, { foreignKey: 'ID_DPA' });

module.exports = Pesan;
