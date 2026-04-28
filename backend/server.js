const express = require("express");
const cors = require('cors');

app.use(cors({
  origin: 'https://front-test-30-mille.onrender.com/', // Remplacez par VOTRE URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],    // Autorise explicitement les méthodes
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

//verif mail mdp
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email ou mot de passe incorrect"
        });
      }

      res.json({
        success: true,
        user
      });
    }
  );
});

//recupere le nom pour le lien book
// app.get("/user/:nameBook", (req, res) => {
//   const { nameBook } = req.params;

//   db.get(
//     "SELECT * FROM users WHERE nameBook = ?",
//     [nameBook],
//     (err, user) => {
//       if (err) return res.status(500).json(err);

//       res.json(user);
//     }
//   );
// });

//recupere les creneaux existant
app.get("/slots", (req, res) => {
  db.all("SELECT * FROM slots WHERE date >= date('now') ORDER BY date ASC", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
}); 

//creer un creneau
app.post("/slots", (req, res) => {
  const { date, start, end } = req.body;

  console.log(req.body);

  db.run(
    "INSERT INTO slots (date, start, end, booked) VALUES (?, ?, ?, 0)",
    [date, start, end],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({ success: true });
    }
  );
});

//met a jour le slots en reservé
app.post("/book", (req, res) => {
  const { id, firstName, lastName, email } = req.body;

  db.run(
    `UPDATE slots 
     SET booked = 1,
         firstName = ?,
         lastName = ?,
         email = ?
     WHERE id = ?`,
    [firstName, lastName, email, id],
    () => {
      res.json({ success: true });
    }
  );
});

//suppresion du creneau choisi
app.delete("/slots/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM slots WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ success: true });
    }
  );
});


//remet le slots en 0 pour qu'il soit dispo
app.post("/slots/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "UPDATE slots SET booked = 0 WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ success: true });
    }
  );
});

app.listen(5000, () =>
  console.log("Backend lancé sur port 5000")
);