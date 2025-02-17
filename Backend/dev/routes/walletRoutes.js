const crypto = require("crypto");

const generateWalletAddress = () => {
  return crypto.randomBytes(5).toString("hex");
};

module.exports = { generateWalletAddress };
