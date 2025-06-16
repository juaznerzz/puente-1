const express = require('express');
const cors = require('cors');
const moment = require('moment'); // Usamos moment para manejar fechas

const app = express();
app.use(cors());                 // Permitir solicitudes desde la extensión
app.use(express.json());         // Parsear JSON

// Función para generar el timestamp y verificar que la clave es válida
function getTimestamp() {
  const expirationDate = moment("2025-06-17T23:59:59Z"); // Fecha de caducidad
  const currentDate = moment();

  // Comprobar si la fecha actual es antes de la fecha de expiración
  if (currentDate.isBefore(expirationDate)) {
    return currentDate.toISOString(); // Marca de tiempo actual en formato ISO
  } else {
    return null; // Si la fecha ha pasado, no es válida
  }
}

// Función para validar la clave de licencia
function isLicenseValid({ sub_key, mo_no }) {
  const validKey = '123456';
  const validMoNo = '593961758817';
  
  return sub_key === validKey && mo_no === validMoNo;
}

// Ruta principal de validación
app.post('/api/v1/validate', (req, res) => {
  const {
    sub_key,
    unique_id,
    mo_no,
    slug,
    b_version,
    r_id
  } = req.body || {};

  // Verificar que el cuerpo sea válido
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ valid: false, error: 'JSON malformado' });
  }

  // Comprobar que los parámetros estén completos
  if (!sub_key || !unique_id || !mo_no || !slug || !b_version || !r_id) {
    return res.status(400).json({ valid: false, error: 'Parámetros incompletos' });
  }

  // Validar la clave
  if (isLicenseValid(req.body)) {
    const timestamp = getTimestamp(); // Obtenemos el timestamp actual

    // Si el timestamp es válido, respondemos con la validación
    if (timestamp) {
      return res.status(200).json({
        valid: true,
        timestamp: timestamp,
        userDeviceData: {
          sub_key,
          unique_id,
          mo_no,
          slug,
          b_version,
          r_id
        }
      });
    } else {
      // Si el timestamp ha expirado, respondemos con un error
      return res.status(400).json({ valid: false, error: 'La clave ha expirado' });
    }
  }

  // Si la clave no es válida
  return res.status(400).json({ valid: false });
});

// Manejo de JSON malformado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ valid: false, error: 'JSON malformado' });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
