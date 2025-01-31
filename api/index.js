const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('../models/index');

const mahasiswaRouter = require('../routes/mahasiswa');
const pesanRouter = require('../routes/pesan');
const informasiAkademikRouter = require('../routes/informasi_akademik');
const dpaRouter = require('../routes/dpa');
const formulirPerwalianRouter = require('../routes/formulir_perwalian');
const jadwalPerwalianRouter = require('../routes/jadwal_perwalian');
const authRouter = require('../routes/user');

// Middleware untuk parsing JSON
app.use(bodyParser.json());

app.use('/mahasiswa', mahasiswaRouter);
app.use('/pesan', pesanRouter);
app.use('/informasi-akademik', informasiAkademikRouter);
app.use('/dpa', dpaRouter);
app.use('/formulir-perwalian', formulirPerwalianRouter);
app.use('/jadwal-perwalian', jadwalPerwalianRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
