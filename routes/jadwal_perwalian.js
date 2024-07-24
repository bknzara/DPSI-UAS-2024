const express = require('express');
const router = express.Router();
const JadwalPerwalian = require('../models/jadwal_perwalian');
const { authenticate, authorize } = require('../middleware/auth');
const authorizeRoles = authorize(['mahasiswa', 'dpa']);

// Create
router.post('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const jadwal = await JadwalPerwalian.create(req.body);
    res.status(201).json(jadwal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
router.get('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const jadwal = await JadwalPerwalian.findAll();
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const jadwal = await JadwalPerwalian.findByPk(req.params.id);
    if (jadwal) {
      res.status(200).json(jadwal);
    } else {
      res.status(404).json({ message: 'Jadwal Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const [updated] = await JadwalPerwalian.update(req.body, {
      where: { ID_Jadwal: req.params.id }
    });
    if (updated) {
      const updatedJadwal = await JadwalPerwalian.findByPk(req.params.id);
      res.status(200).json(updatedJadwal);
    } else {
      res.status(404).json({ message: 'Jadwal Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const deleted = await JadwalPerwalian.destroy({
      where: { ID_Jadwal: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Jadwal Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
