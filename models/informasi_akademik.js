const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

const InformasiAkademik = sequelize.define('Informasi_Akademik', {
  ID_Informasi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Judul: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Kategori: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Informasi_Akademik',
  timestamps: false,
});

module.exports = InformasiAkademik;
