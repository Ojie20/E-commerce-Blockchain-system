const { getDatabase } = require("../config/database");
const { generateWalletAddress } = require("../utils/walletGenerator");

class WalletController {
  static async getWalletBalance(req, res) {
    try {
      const { address } = req.params;
      const balance = TheChain.getUserBalance(address);
      res.json({ address, balance });
    } catch (error) {
      res.status(500).json({ error: "Error fetching wallet balance" });
    }
  }

  static async getWalletTransactions(req, res) {
    try {
      const { address } = req.params;
      const transactions = TheChain.getTransactionsForAddress(address);
      res.json({ address, transactions });
    } catch (error) {
      res.status(500).json({ error: "Error fetching wallet transactions" });
    }
  }

  static async createWallet(req, res) {
    const db = getDatabase();
    const { userId } = req.body;

    try {
      const walletAddress = generateWalletAddress();

      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO wallets (userId, address) VALUES (?, ?)",
          [userId, walletAddress],
          function (err) {
            if (err) reject(err);
            resolve(this.lastID);
          }
        );
      });

      // Initialize new wallet with coins
      TheChain.createNewTransaction(100, "SYSTEM", walletAddress);

      res.status(201).json({
        success: true,
        message: "Wallet created successfully",
        walletAddress,
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating wallet" });
    }
  }

  static async getUserWallets(req, res) {
    const db = getDatabase();
    const { userId } = req.params;

    try {
      const wallets = await new Promise((resolve, reject) => {
        db.all(
          "SELECT * FROM wallets WHERE userId = ?",
          [userId],
          (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          }
        );
      });

      res.json({ wallets });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user wallets" });
    }
  }

  static async validateWalletAddress(address) {
    if (!address || address.length !== 10) {
      return false;
    }
    return /^[0-9a-fA-F]{10}$/.test(address);
  }
}

module.exports = WalletController;
