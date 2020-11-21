const { beforeEach, describe, test, expect } = require('@jest/globals')

const { createWallet } = require('../src/wallet')
const { verifySignature } = require('../src/crypto')

describe('Wallet', () => {
  let wallet, amount, recipient, transaction

  beforeEach(() => {
    wallet = createWallet()
    amount = 50
    recipient = 'foo'
    transaction = wallet.createTransaction({ recipient, amount })
  })

  test('Wallet has a balance', () => {
    expect(wallet).toHaveProperty('balance')
  })

  test('Wallet has a public key', () => {
    expect(wallet).toHaveProperty('pubKey')
  })
  
  test('Wallet verifies signature', () => {
    const data = 'foo'
    expect(
      verifySignature({ 
        pubKey: wallet.pubKey, 
        data, 
        signature: wallet.sign(data) 
      })
    ).toBe(true)
  })

  test('Wallet doesn\'t verify invalid signature', () => {
    const data = 'foo'
    expect(
      verifySignature({ 
        pubKey: wallet.pubKey, 
        data, 
        signature: createWallet().sign(data)
      })
    ).toBe(false)
  })

  test('Wallet can create transaction, throws if amount exceeds balance', () => {
    expect(() => wallet.createTransaction({ recipient, amount: 999999 })).toThrow()
  })

  test('Wallet can create transaction if amount is valid', () => {
    expect(() => wallet.createTransaction({ recipient, amount })).not.toThrow()
  })

  test('Wallet can create transaction, input matches with wallet', () => {
    expect(transaction.input.address).toEqual(wallet.pubKey)
  })

  test('Wallet can create transaction, outputs amount to recipient', () => {
    expect(transaction.output[recipient]).toEqual(amount)
  })
})
