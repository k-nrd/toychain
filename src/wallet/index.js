const { sha256hash, ec } = require('../crypto')
const { STARTING_BALANCE } = require('../config')
const { createTransaction, verifyTransaction } = require('./transaction')

function createWallet() {
  const balance = STARTING_BALANCE
  const keyPair = ec.genKeyPair()
  const pubKey = keyPair.getPublic()

  function sign (data) {
    return keyPair.sign(sha256hash(data))
  }

  function transact ({ recipient, amount }) {
    if (amount > balance) {
      throw 'Yo'
    }

    return createTransaction({ sender: { balance, pubKey, sign }, recipient, amount })
  }

  return Object.freeze({
    balance,
    pubKey,
    sign,
    createTransaction: transact
  })
}

module.exports = {
  createWallet,
  createTransaction,
  verifyTransaction
}
