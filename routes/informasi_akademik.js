const express = require('express');
const router = express.Router();
const InformasiAkademik = require('../models/informasi_akademik');
const { authenticate, authorize } = require('../middleware/auth');
const authorizeRoles = authorize(['mahasiswa', 'dpa']);


// Create
router.post('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const informasi = await InformasiAkademik.create(req.body);
    res.status(201).json(informasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
router.get('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const informasi = await InformasiAkademik.findAll();
    res.status(200).json(informasi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id',authenticate, authorizeRoles, async (req, res) => {
  try {
    const informasi = await InformasiAkademik.findByPk(req.params.id);
    if (informasi) {
      res.status(200).json(informasi);
    } else {
      res.status(404).json({ message: 'Informasi Akademik not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const [updated] = await InformasiAkademik.update(req.body, {
      where: { ID_Informasi: req.params.id }
    });
    if (updated) {
      const updatedInformasi = await InformasiAkademik.findByPk(req.params.id);
      res.status(200).json(updatedInformasi);
    } else {
      res.status(404).json({ message: 'Informasi Akademik not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id',  authenticate, authorizeRoles, async (req, res) => {
  try {
    const deleted = await InformasiAkademik.destroy({
      where: { ID_Informasi: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Informasi Akademik not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
