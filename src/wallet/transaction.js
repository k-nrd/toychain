const { v4: uuidv4 } = require('uuid')
const { verifySignature } = require('../crypto')

function createTransaction({ sender, recipient, amount }) {
  const id = uuidv4()

  const output = {
    [recipient]: amount,
    [sender.pubKey]: sender.balance - amount
  }

  const input = {
    timestamp: Date.now(),
    amount: sender.balance,
    address: sender.pubKey,
    signature: sender.sign(output)
  }

  return Object.freeze({ 
    id, 
    output,
    input
  })
}

function verifyTransaction ({ input: { address, amount, signature }, output }) {
  const outputTotal = Object.values(output).reduce((a, c) => a + c, 0)

  if (amount !== outputTotal) {
    // console.error(`Invalid transaction from ${address}`)
    return false
  }

  if (!verifySignature({ pubKey: address, data: output, signature })) {
    // console.error(`Invalid transaction from ${address}`)
    return false
  }

  return true
}

module.exports = { 
  createTransaction, 
  verifyTransaction 
}
