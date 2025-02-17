const bcrypt = require("bcrypt");
const { getDatabase } = require("../config/database");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const walletGenerator = require("../utils/walletGenerator");

const registerUser = async (req, res) => {
  const db = getDatabase();
  const { username, password } = req.body;

  try {
    // Start transaction
    await db.run("BEGIN TRANSACTION");

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
    const walletAddress = walletGenerator.generateWalletAddress();
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
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Get user's wallet address
    const wallet = await new Promise((resolve, reject) => {
      db.get(
        "SELECT address FROM wallets WHERE user_id = ?",
        [user.id],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });

    res.status(200).json({
      message: "Login successful",
      walletAddress: wallet.address,
      balance: TheChain.getUserBalance(wallet.address),
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
