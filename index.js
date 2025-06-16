const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());                 // Permitir solicitudes desde la extensión
app.use(express.json());         // Parsear JSON

// Función de ejemplo para validar la clave.
// Este ejemplo utiliza los valores '123456' y '593961758817' para la validación.
function isLicenseValid({ sub_key, mo_no }) {
  // Compara la clave de licencia y el número de usuario
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

  // Se puede comprobar también la presencia de parámetros obligatorios
  if (!sub_key || !unique_id || !mo_no || !slug || !b_version || !r_id) {
    return res.status(400).json({ valid: false, error: 'Parámetros incompletos' });
  }

  // Validar la clave y el número de usuario
  if (isLicenseValid(req.body)) {
    return res.status(200).json({ valid: true });
  }

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
