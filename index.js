// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple example of license validation.
// Replace this with your own mechanism (database check, etc.).
function isLicenseValid(subKey) {
  const validKey = process.env.VALID_KEY || 'demo-123';
  return subKey === validKey;
}

app.post('/api/v1/validate', (req, res) => {
  const {
    sub_key,
    unique_id,
    mo_no,
    slug,
    b_version,
    r_id,
    skd_id,
  } = req.body || {};

  // Ensure JSON body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ valid: false, error: 'JSON malformado' });
  }

  // Check that all required fields are present
  if (!sub_key || !unique_id || !mo_no || !slug || !b_version || !r_id) {
    return res.status(400).json({ valid: false, error: 'Parámetros incompletos' });
  }

  // Validate the license key
  if (!isLicenseValid(sub_key)) {
    return res.status(400).json({ valid: false });
  }

  // Structure expected by the extension
  const dData = {
    timestamp: Date.now(),
    userDeviceData: {
      sub_key,
      device_data: { skd_id: skd_id || unique_id },
    },
  };

  return res.status(200).json({
    valid: true,
    dData,
  });
});

// Error handler for malformed JSON
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


