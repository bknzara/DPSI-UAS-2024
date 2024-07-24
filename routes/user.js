const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router();

// Rute pendaftaran user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    // Cek apakah username sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Buat user baru
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Rute login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Cek user dan verifikasi password
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Failed to login user' });
  }
});

// Rute mendapatkan semua pengguna
router.get('/users', authenticate, authorize(['dpa']), async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });


// Rute yang memerlukan autentikasi dan otorisasi
router.get('/protected', authenticate, authorize(['mahasiswa', 'dpa']), (req, res) => {
  res.json({ message: 'Access granted' });
});

module.exports = router;
