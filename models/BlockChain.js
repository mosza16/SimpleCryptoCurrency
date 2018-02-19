const Block = require("./Block");
const Transaction = require("./Transaction");

class BlockChain {
  constructor(difficulty, miningReward) {
    this.chain = [this.initGenesisBlock()];
    this.difficulty = difficulty || 3;
    this.miningReward = miningReward || 100;
    this.pendingTransactions = [];
  }

  initGenesisBlock() {
    return new Block(new Date(), "Genesis Block", 0);
  }

  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(new Date(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isValidChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) return false;
      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
    }
    return true;
  }
}

module.exports = BlockChain;
