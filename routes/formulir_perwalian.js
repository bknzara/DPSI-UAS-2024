const express = require('express');
const router = express.Router();
const FormulirPerwalian = require('../models/formulir_perwalian');
const { authenticate, authorize } = require('../middleware/auth');
const authorizeRoles = authorize(['mahasiswa', 'dpa']);

// Create
router.post('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const formulir = await FormulirPerwalian.create(req.body);
    res.status(201).json(formulir);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all
router.get('/', authenticate, authorizeRoles, async (req, res) => {
  try {
    const formulir = await FormulirPerwalian.findAll();
    res.status(200).json(formulir);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const formulir = await FormulirPerwalian.findByPk(req.params.id);
    if (formulir) {
      res.status(200).json(formulir);
    } else {
      res.status(404).json({ message: 'Formulir Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const [updated] = await FormulirPerwalian.update(req.body, {
      where: { ID_Formulir: req.params.id }
    });
    if (updated) {
      const updatedFormulir = await FormulirPerwalian.findByPk(req.params.id);
      res.status(200).json(updatedFormulir);
    } else {
      res.status(404).json({ message: 'Formulir Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authenticate, authorizeRoles, async (req, res) => {
  try {
    const deleted = await FormulirPerwalian.destroy({
      where: { ID_Formulir: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Formulir Perwalian not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
