const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Ensure db directory exists
const dbDir = path.resolve(__dirname, "../../db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "blockchain.db");
let db = null;

const initializeDatabase = () => {
  if (db) return db;

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
      throw err;
    }
    console.log("Connected to SQLite database at:", dbPath);
  });

  db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

    // Create wallets table
    db.run(`CREATE TABLE IF NOT EXISTS wallets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            address TEXT NOT NULL UNIQUE,
            balance REAL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        )`);

    // Create transactions table
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_address TEXT NOT NULL,
            recipient_address TEXT NOT NULL,
            amount REAL NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_address) REFERENCES wallets(address),
            FOREIGN KEY (recipient_address) REFERENCES wallets(address)
        )`);
  });

  return db;
};

// Initialize database connection
const getDatabase = () => {
  if (!db) {
    return initializeDatabase();
  }
  return db;
};

// Close database connection
const closeDatabase = () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
    db = null;
  }
};

process.on("SIGINT", () => {
  closeDatabase();
  process.exit(0);
});

module.exports = {
  getDatabase,
  closeDatabase,
  initializeDatabase,
};
