const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v1/validate', (req, res) => {
  const { sub_key, unique_id, slug, mo_no, b_version, r_id } = req.body;
  // These fields would normally be validated against a database
  res.json({
    status: 200,
    userDeviceData: {
      sub_key: "<demo-key>",
      plan_type: "Premium",
      device_data: { skd_id: "demo-device-id" },
      validate: { end_date: "2099-12-31", day_remaining: 9999 }
    }
  });
});

app.get('/api/v1/subscription-key/remove', (req, res) => {
  const { id, type } = req.query;
  // This would remove the license in a real application
  res.json({ status: 200, message: 'License removed' });
});

// Render sets the PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


