const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const Mahasiswa = require('./mahasiswa');
const DPA = require('./DPA');

const FormulirPerwalian = sequelize.define('Formulir_Perwalian', {
  ID_Formulir: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_Mahasiswa: {
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
  ID_DPA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Data_Rencana_Studi: {
    type: DataTypes.TEXT,
  },
  Pertanyaan_Komentar: {
    type: DataTypes.TEXT,
  },
  Lampiran_Dokumen: {
    type: DataTypes.STRING(255),
  },
  Status_Validasi: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Formulir_Perwalian',
  timestamps: false,
});

FormulirPerwalian.belongsTo(Mahasiswa, { foreignKey: 'ID_Mahasiswa' });
FormulirPerwalian.belongsTo(DPA, { foreignKey: 'ID_DPA' });

module.exports = FormulirPerwalian;
