const bcrypt = require("bcrypt");
const { getDatabase } = require("../config/database");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const WalletGenerator = require("../utils/walletGenerator");
const Blockchain = require("../blockchain"); // Add this import

// Get blockchain instance
let TheChain;
const initBlockchain = (blockchainInstance) => {
  TheChain = blockchainInstance;
};

const registerUser = async (req, res) => {
  const db = getDatabase();
  const { username, password } = req.body;

  try {
    // Start transaction
    await db.run("BEGIN TRANSACTION");

    // Generate wallet address
    const walletAddress = WalletGenerator.generateWalletAddress();

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userResult = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });

    // Create wallet
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO wallets (userId, address) VALUES (?, ?)",
        [userResult, walletAddress],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });

    // Commit transaction
    await db.run("COMMIT");

    // Initialize blockchain wallet
    if (typeof TheChain !== "undefined") {
      TheChain.createNewTransaction(100, "SYSTEM", walletAddress);
    }

    res.status(201).json({
      success: true,
      message: "Registration successful",
      walletAddress,
    });
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Error registering user",
      details: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const db = getDatabase();
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    // Get user
    const user = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Get user's wallet
    const wallet = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM wallets WHERE userId = ?",
        [user.id],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });

    // Get balance from blockchain
    const balance = TheChain ? TheChain.getUserBalance(wallet.address) : 0;

    res.json({
      success: true,
      userId: user.id,
      username: user.username,
      walletAddress: wallet.address,
      balance: balance,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  initBlockchain, // Export the init function
};
