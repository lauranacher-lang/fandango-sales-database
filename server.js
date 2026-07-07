const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const APPS_SCRIPT_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT3c2Fq8lyzz14znASb8FL6VV3-KJGHQVqEcD78WFKN_x0mDbZ05m2msTrX4EKez2UY-JDOvQqenCaRSfY_AafYDcqzPmq1Vn3nFEq19nEkcBhu8GqOOHE8YOF9fa0kWb0wCLE3zL7P96N0czBu9AZWWeKda7OBsyllJbxZWYBC_t5hT4eoP5Q0Ld2HQKGxBbat5QVgGi99YTO_iMGL9yR3pfilvNsnHW5B6Dr8nNDq6XwOq_0NV0Bu_OXWvc4fgQBh-Kuqku5k5NnTO37Gh1jKaJr4wQ&lib=M35mnJW96LB7gYUuIVOUOPefSiK4m_T-y";

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
