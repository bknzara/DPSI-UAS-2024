const express = require('express');
const router = express.Router();
const Pesan = require('../models/Pesan');
const { authenticate, authorize } = require('../middleware/auth');

// Middleware untuk memastikan autentikasi dan otorisasi
const authorizeRoles = authorize(['mahasiswa', 'dpa']);

// Create
router.post('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const pesan = await Pesan.create(req.body);
    res.status(201).json(pesan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
router.get('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const pesan = await Pesan.findAll();
    res.status(200).json(pesan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const pesan = await Pesan.findByPk(req.params.id);
    if (pesan) {
      res.status(200).json(pesan);
    } else {
      res.status(404).json({ message: 'Pesan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const [updated] = await Pesan.update(req.body, {
      where: { ID_Pesan: req.params.id }
    });
    if (updated) {
      const updatedPesan = await Pesan.findByPk(req.params.id);
      res.status(200).json(updatedPesan);
    } else {
      res.status(404).json({ message: 'Pesan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const deleted = await Pesan.destroy({
      where: { ID_Pesan: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Pesan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
