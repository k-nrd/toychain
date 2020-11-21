const { beforeEach, describe, expect, test } = require('@jest/globals')

const createTransaction = require('../src/transaction')
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

  test('Transactions have an `id`', () => {
    expect(transaction).toHaveProperty('id')
  })

  test('Transactions have an output map', () => {
    expect(transaction).toHaveProperty('outputMap')
  })
})
