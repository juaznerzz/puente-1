const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS para permitir solicitudes desde la extensión
app.use(cors());
app.use(express.json());

// Ruta POST para validar la clave
app.post('/api/v1/validate', (req, res) => {
  const { sub_key, unique_id, slug, mo_no, b_version, r_id } = req.body;

  // Estos campos normalmente se validan con una base de datos
  // Para la prueba, se utiliza una clave de demostración
  if (sub_key === '123456' && mo_no === '593961758817') {
    res.json({
      status: 200,
      userDeviceData: {
        sub_key: '123456', // Clave válida
        plan_type: 'Premium',
        device_data: { skd_id: unique_id }, // ID del dispositivo
        validate: {
          end_date: '2025-06-19T23:59:59.000Z', // Fecha de expiración
          day_remaining: 5, // Días restantes hasta la expiración
          life_time: false, // Si la licencia es vitalicia o no
        }
      }
    });
  } else {
    res.json({
      status: 400,
      message: 'PHONE_NUMBER_DOES_NOT_MATCH_LICENSE', // Mensaje de error si la clave no coincide
    });
  }
});

// Ruta GET para eliminar la clave de suscripción (simulación)
app.get('/api/v1/subscription-key/remove', (req, res) => {
  const { id, type } = req.query;
  // Esto eliminaría la licencia en una aplicación real
  res.json({ status: 200, message: 'Licencia eliminada' });
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});



