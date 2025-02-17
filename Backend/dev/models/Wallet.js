const db = require('../config/database');

class Wallet {
  constructor(address, userId) {
    this.address = address;
    this.userId = userId;
  }

  static createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        walletAddress TEXT NOT NULL UNIQUE,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `;
    return db.run(query);
  }

  save() {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO wallets (address, user_id) VALUES (?, ?)',
        [this.address, this.userId],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  static getWalletByUserId(userId) {
    const query = `
      SELECT * FROM wallets WHERE userId = ?
    `;
    return db.get(query, [userId]);
  }
}

module.exports = Wallet;