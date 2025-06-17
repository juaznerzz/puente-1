const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const VALID_KEY = process.env.VALID_KEY || '123456';

app.use(express.json());

app.post('/validate', (req, res) => {
  const { sub_key, unique_id, slug, mo_no, b_version, r_id } = req.body || {};

  if (!sub_key || !unique_id || !slug || !mo_no || !b_version || !r_id) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  if (sub_key !== VALID_KEY) {
    return res.status(400).json({ message: 'Invalid subscription key' });
  }

  const userDeviceData = {
    sub_key,
    plan_type: 'Premium',
    end_date: '2025-06-19',
    day_remaining: 100,
    device_data: {
      skd_id: 'test',
      unique_id,
    },
  };

  return res.json({ valid: true, dData: { userDeviceData } });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
