const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());          // permitir llamadas de la extensión
app.use(express.json());  // parsear el cuerpo JSON

// Clave válida de ejemplo. Puedes reemplazarla con tu mecanismo real.
const VALID_KEY = 'demo-123';

// Comprueba si la licencia es válida
function isLicenseValid(sub_key) {
  return sub_key === VALID_KEY;
}

// Ruta de validación principal
app.post('/api/v1/validate', (req, res) => {
  const {
    sub_key,
    unique_id,
    mo_no,
    slug,
    b_version,
    r_id,
    skd_id      // opcional, si se envía
  } = req.body || {};

  // Valida que el cuerpo sea JSON
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ valid: false, error: 'JSON malformado' });
  }

  // Comprueba los parámetros obligatorios
  if (!sub_key || !unique_id || !mo_no || !slug || !b_version || !r_id) {
    return res
      .status(400)
      .json({ valid: false, error: 'Parámetros incompletos' });
  }

  // Verifica la licencia
  if (!isLicenseValid(sub_key)) {
    return res.status(400).json({ valid: false });
  }

  // Ejemplo de fecha de expiración y plan
  const expirationDate = new Date('2025-12-31T23:59:59Z');
  const daysRemaining = Math.ceil(
    (expirationDate - Date.now()) / (1000 * 60 * 60 * 24)
  );

  // Objeto que la extensión espera
  const dData = {
    timestamp: Date.now(),
    userDeviceData: {
      sub_key,
      device_data: { skd_id: skd_id || unique_id },
      validate: {
        plan_type: 'Premium',
        end_date: expirationDate.toISOString(),
        day_remaining: daysRemaining,
        life_time: false
      }
    }
  };

  // Envío de la respuesta correcta
  return res.status(200).json({ valid: true, dData });
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


