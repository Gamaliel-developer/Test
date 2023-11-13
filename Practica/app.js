const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prueba',
});

db.connect((err) => {
  if (err) {
    console.log('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM tu_tabla', (err, result) => {
    if (err) {
      console.log('Error al obtener datos: ', err);
      res.status(500).send('Error al obtener datos de la base de datos');
      return;
    }
    res.json(result);
  });
});

// Arranca el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post('/api/usuarios', (req, res) => {
  const { Name, Phone, Email, DOB, Gender } = req.body;
  const query = 'INSERT INTO usuario (Name, Phone, Email, DOB, Gender) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [Name, Phone, Email, DOB, Gender], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ id: result.insertId, mensaje: 'Usuario creado exitosamente' });
  });
});

app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT id, Name, Email FROM usuario';

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.get('/api/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM usuario WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results[0]);
  });
});

app.put('/api/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const { Name, Phone, Email, DOB, Gender } = req.body;
  const query = 'UPDATE usuario SET Name=?, Phone=?, Email=?, DOB=?, Gender=? WHERE id=?';

  db.query(query, [Name, Phone, Email, DOB, Gender, userId], (err) => {
    if (err) {
      throw err;
    }
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  });
});

app.delete('/api/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM usuario WHERE id=?';

  db.query(query, [userId], (err) => {
    if (err) {
      throw err;
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  });
});



