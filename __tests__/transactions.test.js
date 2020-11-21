const { beforeEach, describe, expect, test } = require('@jest/globals')

const { createWallet, createTransaction, verifyTransaction } = require('../src/wallet')
const { verifySignature } = require('../src/crypto')

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
    expect(transaction).toHaveProperty('output')
  })

  test('Transactions output amount to recipient', () => {
    expect(transaction.output[recipient]).toEqual(amount)
  })

  test('Transactions output remaining balance for `sender` wallet', () => {
    expect(transaction.output[sender.pubKey])
      .toEqual(sender.balance - amount)
  })

  test('Transactions have an `input`', () => {
    expect(transaction).toHaveProperty('input')
  })

  test('Transactions `input` have a timestamp', () => {
    expect(transaction.input).toHaveProperty('timestamp')

  })
  test('Transactions `input` have an amount which matches senders original balance', () => {
    expect(transaction.input.amount).toEqual(sender.balance)
  })

  test('Transactions `input` have an address which matches senders public key', () => {
    expect(transaction.input.address).toEqual(sender.pubKey)
  })

  test('Transactions signs the input', () => {
    expect(
      verifySignature({ 
        pubKey: sender.pubKey, 
        data: transaction.output, 
        signature: transaction.input.signature 
      })
    ).toBe(true)
  })

  test('Detect transactions with invalid output', () => {
    transaction.output[sender.pubKey] = 999999
    expect(verifyTransaction(transaction)).toEqual(false)
  })

  test('Detect transactions with invalid input signature', () => {
    transaction.input.signature = createWallet().sign(transaction.output)
    expect(verifyTransaction(transaction)).toEqual(false)
  })

  test('Validate valid transactions', () => {
    expect(verifyTransaction(transaction)).toEqual(true)
  })
})
