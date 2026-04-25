const express = require('express');
const cors    = require('cors');
const db      = require('./db');
require('dotenv').config();

const app        = express();
const PORT       = process.env.PORT || 3000;
const ADMIN_PASS = process.env.ADMIN_PASS || 'developme2025';

app.use(cors());
app.use(express.json());

// ── POST /contact — save a lead ────────────────────────────────────────────
app.post('/contact', async (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim())
    return res.status(400).json({ success: false, error: 'Champs requis manquants.' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, error: 'Email invalide.' });

  try {
    await db.execute(
      'INSERT INTO contacts (name, email, phone, service, budget, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name.trim(), email.trim(), phone?.trim() || null, service || null, budget || null, message.trim()]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erreur serveur.' });
  }
});

// ── GET /contacts — list all leads (password-protected) ───────────────────
app.get('/contacts', async (req, res) => {
  const { pass, page = 1 } = req.query;

  if (pass !== ADMIN_PASS)
    return res.status(401).json({ error: 'Non autorisé.' });

  const limit  = 20;
  const offset = (Math.max(1, parseInt(page)) - 1) * limit;

  try {
    const [rows]           = await db.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [[{ total }]]    = await db.execute('SELECT COUNT(*) AS total FROM contacts');
    const [[{ today }]]    = await db.execute(
      "SELECT COUNT(*) AS today FROM contacts WHERE DATE(created_at) = CURDATE()"
    );
    const [lastArr]        = await db.execute(
      'SELECT name, created_at FROM contacts ORDER BY created_at DESC LIMIT 1'
    );

    res.json({
      contacts: rows,
      total,
      today,
      last:  lastArr[0] || null,
      pages: Math.ceil(total / limit),
      page:  parseInt(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

app.listen(PORT, () => console.log(`DevelopMe backend — port ${PORT}`));
