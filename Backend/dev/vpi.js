// import { addProduct, getAllProducts, } from "./data/products";
const { addProduct, getAllProducts } = require("./data/products");
const express = require("express");
const cors = require("cors");
const app = express();
const uuid = require("uuid");
const Blockchain = require("./blockchain");
const TheChain = new Blockchain();
const nodeAddress = uuid.v1().split("-").join("");
const bodyParser = require("body-parser");
const db = require("./config/database");
const { registerUser, loginUser } = require("./controllers/authController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// GET /blockchain
app.get("/blockchain", function (req, res) {
  res.send(TheChain);
});

// POST /transaction
app.post("/transaction", function (req, res) {
  const blockIndex = JSON.stringify(
    TheChain.createNewTransaction(
      req.body.amount,
      req.body.sender,
      req.body.recipient
    )
  );
  res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

// GET all transactions
app.get("/transactions", function (req, res) {
  const allTransactions = [];

  TheChain.chain.forEach((block) => {
    allTransactions.push(block.transactions);
  });

  res.json({
    transactions: allTransactions,
    length: allTransactions.length,
  });
});

// GET all transactions
app.get("/transactions/:address", function (req, res) {
  const allTransactions = [];
  const userAddress = req.params.address;

  TheChain.chain.forEach((block) => {
    block.transactions.forEach((transaction) => {
      if (
        transaction.sender == userAddress ||
        transaction.recipient == userAddress
      ) {
        allTransactions.push(transaction);
      }
    });
  });

  res.json({
    transactions: allTransactions,
    length: allTransactions.length,
  });
});

// GET /mine
app.get("/mine", function (req, res) {
  const lastBlock = TheChain.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: TheChain.pendingTransactions,
    index: lastBlock["index"] + 1,
  };
  const nonce = TheChain.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = TheChain.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  const newBlock = TheChain.createNewBlock(nonce, previousBlockHash, blockHash);
  TheChain.createNewTransaction(50, "00", nodeAddress);
  res.json({
    note: "New block mined successfully",
    block: newBlock,
  });
});

app.post("/mine/:address", function (req, res) {
  const userAddress = req.params.address;
  const lastBlock = TheChain.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: TheChain.pendingTransactions,
    index: lastBlock["index"] + 1,
  };
  const nonce = TheChain.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = TheChain.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  const newBlock = TheChain.createNewBlock(nonce, previousBlockHash, blockHash);
  TheChain.createNewTransaction(50, "00", userAddress);
  res.json({
    success: true,
    note: "New block mined successfully",
    block: newBlock,
  });
});

app.post("/register-product", (req, res) => {
  const { name, price, seller } = req.body;
  const product = addProduct(name, price, seller);
  res.json({ note: "Product registered successfully", product });
});

app.get("/products", (req, res) => {
  res.json(getAllProducts());
});

app.post("/purchase", function (req, res) {
  const { buyer, seller, productId, amount } = req.body;

  const buyerBalance = TheChain.getUserBalance(buyer);
  if (buyerBalance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Create transaction
  const transaction = TheChain.createNewTransaction(amount, buyer, seller);
  TheChain.addTransactionToPendingTransactions(transaction);

  res.json({ note: "Purchase transaction created", transaction });
});

app.get("/wallet/:address", function (req, res) {
  const userAddress = req.params.address;
  const balance = TheChain.getUserBalance(userAddress);

  res.json({
    address: userAddress,
    balance: balance,
  });
});

// Add these new routes before other routes
app.post("/register", registerUser);
app.post("/login", loginUser);

// Start the server on port 3000
app.listen(3001, function () {
  console.log("Listening on port 3001...");
});
