const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./calendar.db");


//creation de la table slots, je n'ai pas fait une version avec plusieurs users pour le test
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      start TEXT,
      end TEXT,
      booked INTEGER DEFAULT 0,
      firstname TEXT, 
      lastname TEXT, 
      email TEXT
      
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nameBook TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO users (id, email, password, nameBook)
    VALUES (?, ?, ?, ?)
    `, [1, "franck@franck.com", "1234567890", "franck"]);


});



module.exports = db;