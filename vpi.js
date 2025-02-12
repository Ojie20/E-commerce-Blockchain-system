const express = require('express'); 
const app = express();
const uuid = require('uuid')
const Blockchain = require('./blockchain');
const AbhulimenOjie_7762 = new Blockchain();
const nodeAddress = uuid.v1().split("-").join("")

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET /blockchain
app.get('/blockchain', function (req, res) {
    res.send(AbhulimenOjie_7762);
});

// POST /transaction
app.post('/transaction', function(req, res) {
  const blockIndex = JSON.stringify(AbhulimenOjie_7762.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient))
  res.json({note:`Transaction will be added in block ${blockIndex}`})
});

// GET /mine
app.get('/mine', function(req, res) {
    const lastBlock = AbhulimenOjie_7762.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: AbhulimenOjie_7762.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = AbhulimenOjie_7762.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = AbhulimenOjie_7762.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = AbhulimenOjie_7762.createNewBlock(nonce, previousBlockHash, blockHash);
    AbhulimenOjie_7762.createNewTransaction(12.5, "00", nodeAddress);
    res.json({
        note: "New block mined successfully",
        block: newBlock
    });
});

// Start the server on port 3000
app.listen(1504, function() {
    console.log('Listening on port 1504...');
});
