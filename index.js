const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple subscription key for demo purposes
const VALID_SUB_KEY = '123456';

app.post('/api/v1/validate', (req, res) => {
  const { sub_key, unique_id } = req.body || {};

  if (sub_key !== VALID_SUB_KEY) {
    return res.status(400).json({ error: 'Invalid subscription key' });
  }

  res.status(200).json({
    dData: {
      sub_key,
      plan_type: 'Premium',
      end_date: '2025-06-19',
      day_remaining: 100,
      device_data: {
        skd_id: 'test',
        unique_id: 593961758817
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
