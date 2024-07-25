const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/mahasiswa');
const { authenticate, authorize } = require('../middleware/auth');
const authorizeRoles = authorize(['mahasiswa', 'dpa']);
// Create
router.post('/',  authenticate, authorizeRoles, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.create(req.body);
    res.status(201).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
router.get('/',  authenticate, authorizeRoles, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll();
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id',  authenticate, authorizeRoles, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (mahasiswa) {
      res.status(200).json(mahasiswa);
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id',  authenticate, authorizeRoles, async (req, res) => {
  try {
    const [updated] = await Mahasiswa.update(req.body, {
      where: { ID_Mahasiswa: req.params.id }
    });
    if (updated) {
      const updatedMahasiswa = await Mahasiswa.findByPk(req.params.id);
      res.status(200).json(updatedMahasiswa);
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const deleted = await Mahasiswa.destroy({
      where: { ID_Mahasiswa: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
