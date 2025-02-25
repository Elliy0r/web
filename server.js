const express = require('express');
const cors = require('cors');
const db = require('./database/db');

const app = express();
app.use(cors());
app.use(express.json());

// Записываем посещение
app.post('/visit', async (req, res) => {
  try {
    await db.query("INSERT INTO visitors DEFAULT VALUES");
    res.json({ message: "Посещение записано!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получаем общее количество посетителей
app.get('/visitors/count', async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) FROM visitors");
    res.json({ total_visitors: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
