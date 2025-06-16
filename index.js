const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS para permitir solicitudes de cualquier origen
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Ruta para validar la clave de licencia
app.post('/api/v1/validate', (req, res) => {
    // Recibir los datos de la solicitud
    const { sub_key, unique_id, mo_no, slug, b_version, r_id } = req.body;
    // slug, b_version and r_id are received from the client but are not
    // validated on the server. They are reserved for future use and currently
    // ignored in the validation logic.

    // Verificar si la clave de licencia y el ID de usuario son correctos
    if (sub_key === "123456" && unique_id === "KH6kRZbbMwGZNpP7BZfubCG7sBhx9yJBYYAauyuN5EXKCHP" && mo_no === "593961758817") {
        // Si es válido, devolver un estado 200 y el mensaje de éxito
        return res.status(200).json({
            valid: true,
            message: 'License validated successfully'
        });
    }

    // Si no es válido, devolver un error 400 y el mensaje de error
    return res.status(400).json({
        valid: false,
        message: 'Invalid license or user ID'
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
