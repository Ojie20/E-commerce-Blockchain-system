const crypto = require("crypto");

class WalletGenerator {
  static generateWalletAddress() {
    return crypto.randomBytes(5).toString("hex");
  }
}

module.exports = WalletGenerator;
