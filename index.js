const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const VALID_KEY = process.env.VALID_KEY || 'TEST-KEY-123';

app.post('/api/v1/validate', (req, res) => {
  const { sub_key, unique_id, mo_no, slug, b_version, r_id } = req.body || {};

  if (!sub_key) {
    return res.status(400).json({ valid: false, error: 'sub_key is required' });
  }

  if (sub_key !== VALID_KEY) {
    return res.status(400).json({ valid: false, error: 'invalid key' });
  }

  const response = {
    valid: true,
    timestamp: Date.now(),
    userDeviceData: {
      unique_id,
      mo_no,
      slug,
      b_version,
      r_id,
    },
  };

  res.json(response);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
