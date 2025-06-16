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
    const { sub_key, unique_id } = req.body;

    // Validación: Verificar si la clave de licencia y el ID de usuario son correctos
    if (sub_key === "123456" && unique_id === "KH6kRZbbMwGZNpP7BZfubCG7sBhx9yJBYYAauyuN5EXKCHP") {
        return res.status(200).json({ valid: true });  // Respuesta válida
    }

    // Si no coincide, devolver error 400
    return res.status(400).json({ valid: false, message: 'Invalid license or user ID' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
