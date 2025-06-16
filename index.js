const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());  // Permite solicitudes desde cualquier origen

// Middleware para manejar JSON
app.use(express.json());

// Ruta para validar la clave de licencia
app.post('/api/v1/validate', (req, res) => {
    const { license_key, user_id } = req.body;

    // Validación: si la clave es 123456a y el ID es 593961758817
    if (license_key === "123456" && user_id === "593961758817") {
        return res.status(200).json({ valid: true });
    }

    // Si no coincide, devuelve error 400
    return res.status(400).json({ valid: false, message: 'Invalid license or user ID' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
