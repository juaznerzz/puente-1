const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta para validar la clave de licencia (simulando siempre una respuesta válida)
app.post('/validate-license', (req, res) => {
    const { license_key, user_id } = req.body;

    if (!license_key || !user_id) {
        return res.status(400).json({ error: 'Missing license_key or user_id' });
    }

    // Aquí siempre devolvemos una respuesta válida para pruebas
    return res.status(200).json({ valid: true });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
