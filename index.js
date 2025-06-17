const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Respuesta de prueba para la validación
const demoResponse = {
  status: 200,
  userDeviceData: {
    sub_key: 'demo-key',
    plan_type: 'Premium',
    device_data: { skd_id: 'demo-device-id' },
    validate: { end_date: '2099-12-31', day_remaining: 9999 }
  }
};

app.post('/api/v1/validate', (req, res) => {
  // Cualquier clave enviada será aceptada
  res.json(demoResponse);
});

app.get('/api/v1/subscription-key/remove', (req, res) => {
  res.json({ status: 200, message: 'License removed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



