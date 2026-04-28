const express = require("express");
const cors = require('cors');
const db = require("./db");

const app = express(); // 

 
app.use(cors({
  origin: 'https://front-test-30-mille.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- ROUTES ---

// Verif mail mdp
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) {
        return res.status(401).json({ success: false, message: "Incorrect" });
      }
      res.json({ success: true, user });
    }
  );
});

// Récupère les créneaux existants
app.get("/slots", (req, res) => {
  db.all("SELECT * FROM slots WHERE date >= date('now') ORDER BY date ASC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
}); 

// Créer un créneau
app.post("/slots", (req, res) => {
  const { date, start, end } = req.body;
  db.run(
    "INSERT INTO slots (date, start, end, booked) VALUES (?, ?, ?, 0)",
    [date, start, end],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// Mise à jour (Réservation)
app.post("/book", (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  db.run(
    "UPDATE slots SET booked = 1, firstName = ?, lastName = ?, email = ? WHERE id = ?",
    [firstName, lastName, email, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// Suppression du créneau choisi
app.delete("/slots/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM slots WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// Remet le slots en disponible
app.post("/slots/:id", (req, res) => {
  const { id } = req.params;
  db.run("UPDATE slots SET booked = 0 WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// Port d'écoute
app.listen(5000, () => console.log("Backend lancé sur port 5000"));