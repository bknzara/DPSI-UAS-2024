const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Mahasiswa = require('../models/mahasiswa');
const DPA = require('../models/DPA');

const secretKey = 'your_jwt_secret'; // Ganti dengan secret key yang aman

// Middleware untuk autentikasi menggunakan JWT
const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Token tidak tersedia' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk otorisasi role
const authorize = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Akses ditolak' });
    }
  };
};

// Fungsi register Mahasiswa
const registerMahasiswa = [
  body('Nama').notEmpty().withMessage('Nama harus diisi'),
  body('Email').isEmail().withMessage('Email harus valid'),
  body('Password').isLength({ min: 6 }).withMessage('Password harus memiliki minimal 6 karakter'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nama, Email, Password } = req.body;

    try {
      const existingMahasiswa = await Mahasiswa.findOne({ where: { Email } });
      if (existingMahasiswa) {
        return res.status(400).json({ message: 'Email sudah ada' });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);
      const newMahasiswa = await Mahasiswa.create({ Nama, Email, Password: hashedPassword });
      res.status(201).json({ message: 'Mahasiswa berhasil didaftarkan' });
    } catch (err) {
      console.error('Error creating mahasiswa:', err);
      res.status(500).json({ message: 'Gagal mendaftarkan mahasiswa' });
    }
  }
];

// Fungsi register DPA
const registerDPA = [
  body('Nama').notEmpty().withMessage('Nama harus diisi'),
  body('Password').isLength({ min: 6 }).withMessage('Password harus memiliki minimal 6 karakter'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nama, Password } = req.body;

    try {
      const existingDPA = await DPA.findOne({ where: { Nama } });
      if (existingDPA) {
        return res.status(400).json({ message: 'Nama sudah ada' });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);
      const newDPA = await DPA.create({ Nama, Password: hashedPassword });
      res.status(201).json({ message: 'DPA berhasil didaftarkan' });
    } catch (err) {
      console.error('Error creating DPA:', err);
      res.status(500).json({ message: 'Gagal mendaftarkan DPA' });
    }
  }
];

// Fungsi login Mahasiswa
const loginMahasiswa = [
  body('Email').isEmail().withMessage('Email harus valid'),
  body('Password').notEmpty().withMessage('Password harus diisi'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;

    try {
      const mahasiswa = await Mahasiswa.findOne({ where: { Email } });
      if (!mahasiswa) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }

      const isMatch = await bcrypt.compare(Password, mahasiswa.Password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Email atau password salah' });
      }

      const token = jwt.sign({ id: mahasiswa.ID_Mahasiswa, role: 'mahasiswa' }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error logging in mahasiswa:', err);
      res.status(500).json({ message: 'Gagal login mahasiswa' });
    }
  }
];

// Fungsi login DPA
const loginDPA = [
  body('Nama').notEmpty().withMessage('Nama harus diisi'),
  body('Password').notEmpty().withMessage('Password harus diisi'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Nama, Password } = req.body;

    try {
      const dpa = await DPA.findOne({ where: { Nama } });
      if (!dpa) {
        return res.status(401).json({ message: 'Nama atau password salah' });
      }

      const isMatch = await bcrypt.compare(Password, dpa.Password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Nama atau password salah' });
      }

      const token = jwt.sign({ id: dpa.ID_DPA, role: 'dpa' }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error logging in DPA:', err);
      res.status(500).json({ message: 'Gagal login DPA' });
    }
  }
];

module.exports = { authenticate, authorize, registerMahasiswa, registerDPA, loginMahasiswa, loginDPA };
