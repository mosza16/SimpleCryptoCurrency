const BlockChain = require("./models/BlockChain");
const Transaction = require("./models/transaction");

let simpleCoin = new BlockChain(5, 100);
simpleCoin.createTransaction(new Transaction("address1", "address2", 100));
simpleCoin.createTransaction(new Transaction("address2", "address1", 100));

simpleCoin.minePendingTransactions("address1");
console.log(simpleCoin.chain);
