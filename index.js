const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite solicitudes desde la extensión
app.use(express.json()); // Analiza el cuerpo JSON

// Endpoint para validar la clave de licencia
app.post('/api/v1/validate', (req, res) => {
  const { sub_key, unique_id, slug, mo_no, b_version, r_id } = req.body;

  // Validación de los parámetros
  if (!sub_key || !unique_id || !mo_no || !slug || !b_version || !r_id) {
    return res.status(400).json({ status: 400, message: 'Parámetros incompletos' });
  }

  // Validación de la clave de licencia (puedes cambiar este método según tu lógica)
  const isLicenseValid = (key) => key === '123456'; // Valida la clave de licencia
  if (!isLicenseValid(sub_key)) {
    return res.status(400).json({ status: 400, message: 'Clave de licencia no válida' });
  }

  // Si la clave es válida, se retornan los datos esperados
  const userDeviceData = {
    sub_key,
    unique_id,
    slug,
    mo_no,
    b_version,
    r_id,
    validated: true,
    validate: {
      plan_type: 'Premium', // Activamos el plan premium
      end_date: '2025-06-19', // Fecha de expiración de la clave (puedes ajustarlo)
      day_remaining: 100, // Días restantes
    }
  };

  // Respuesta exitosa
  res.status(200).json({
    status: 200,
    userDeviceData,
  });
});

// Endpoint para eliminar la clave de suscripción (si es necesario)
app.get('/api/v1/subscription-key/remove', (req, res) => {
  const { id, type } = req.query;
  // Lógica para eliminar la clave de licencia si es necesario
  res.json({ status: 200, message: 'Licencia eliminada' });
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

