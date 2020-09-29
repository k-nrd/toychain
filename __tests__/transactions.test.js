const { beforeEach, describe, expect, test } = require('@jest/globals')

const createWallet = require('../src/wallet')

describe('Transactions', () => {
  let transaction, 
    sender, 
    recipient, 
    amount

  beforeEach(() => {
    sender = createWallet()
    recipient = 'recipient-public-key'
    amount = 50

    transaction = createTransaction({ sender, recipient, amount })
  })
})
