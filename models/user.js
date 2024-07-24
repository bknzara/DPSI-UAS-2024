const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Sesuaikan dengan path koneksi Sequelize
const bcrypt = require('bcryptjs');

// Mendefinisikan model User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('mahasiswa', 'dpa'),
    allowNull: false
  }
}, {
  tableName: 'user', // Nama tabel di database
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = User;
