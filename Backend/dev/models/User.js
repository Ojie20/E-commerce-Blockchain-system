const sqlite3 = require('sqlite3').verbose();
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, password) VALUES (?, ?)',
        [this.username, hashedPassword],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = User;