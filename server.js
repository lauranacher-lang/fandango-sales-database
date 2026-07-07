const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwIGgb__GwVegpRQnjIEjs5ytb1B7nyWxCKw1AuHP4bpvfAlFUTDfJ16rfd1GrGyAtSGA/exec";

app.get('/api/deals', async (req, res) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/deals', async (req, res) => {
  try {
    const deals = req.body;
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deals)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Fandango Sales Database running on port ${PORT}`);
});
