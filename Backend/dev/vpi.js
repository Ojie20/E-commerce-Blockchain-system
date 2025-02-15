const express = require("express");
const app = express();
const uuid = require("uuid");
const Blockchain = require("./blockchain");
const TheChain = new Blockchain();
const nodeAddress = uuid.v1().split("-").join("");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  TheChain.createNewTransaction(12.5, "00", nodeAddress);
  res.json({
    note: "New block mined successfully",
    block: newBlock,
  });
});

// Start the server on port 3000
app.listen(1504, function () {
  console.log("Listening on port 1504...");
});
