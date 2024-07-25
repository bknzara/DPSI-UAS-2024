const express = require('express');
const router = express.Router();
const DPA = require('../models/DPA');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/uploadfoto/:id', authenticate, upload.single('foto'), async (req, res, next) => {
    try {
      const dpaId = req.params.id; // Mengambil ID dari parameter URL
      console.log('DPA ID from URL:', dpaId); // Log DPA ID
      const dpa = await DPA.findByPk(dpaId);
      if (!dpa) {
        return res.status(404).json({ message: 'DPA not found' });
      }
      dpa.foto = req.file.path; // Simpan path gambar ke database
      await dpa.save();
      res.json({ message: 'Foto telah diupload', filePath: req.file.path });
    } catch (err) {
      next(err);
    }
  });

router.post('/', authenticate, authorize(['dpa']), async (req, res) => {
  try {
    const dpa = await DPA.create(req.body);
    res.status(201).json(dpa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//authenticate ini adalah middleware yang biasanya digunakan untuk memverifikasi identitas pengguna yang membuat permintaan. 
//Middleware ini akan memeriksa apakah permintaan datang dari pengguna yang terautentikasi (misalnya, dengan memeriksa token otentikasi dalam header permintaan).
//Jika autentikasi gagal, permintaan akan dihentikan dan pengguna akan menerima respons kesalahan.
//authorize(['dpa']) Ini adalah middleware lain yang digunakan untuk memeriksa apakah pengguna yang telah diautentikasi memiliki izin yang sesuai untuk mengakses sumber daya. 
//Dalam hal ini, middleware ini memeriksa apakah pengguna memiliki hak akses yang terkait dengan peran 'dpa'. 
//Biasanya, fungsi authorize akan memeriksa peran atau hak akses pengguna yang sudah diautentikasi dan membandingkannya dengan hak akses yang diperlukan untuk melakukan tindakan ini. 
//Jika pengguna tidak memiliki izin yang diperlukan, permintaan akan dihentikan, dan pengguna akan menerima respons kesalahan.


// Read all
router.get('/', authenticate, authorize(['dpa']), async (req, res) => {
  try {
    const dpa = await DPA.findAll();
    res.status(200).json(dpa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one
router.get('/:id', authenticate, authorize(['dpa']), async (req, res) => {
  try {
    const dpa = await DPA.findByPk(req.params.id);
    if (dpa) {
      res.status(200).json(dpa);
    } else {
      res.status(404).json({ message: 'DPA not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, authorize(['dpa']), async (req, res) => {
  try {
    const [updated] = await DPA.update(req.body, {
      where: { ID_DPA: req.params.id }
    });
    if (updated) {
      const updatedDPA = await DPA.findByPk(req.params.id);
      res.status(200).json(updatedDPA);
    } else {
      res.status(404).json({ message: 'DPA not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authenticate, authorize(['dpa']), async (req, res) => {
  try {
    const deleted = await DPA.destroy({
      where: { ID_DPA: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'DPA not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
