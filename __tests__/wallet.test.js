const { beforeEach, describe, test, expect } = require('@jest/globals')

const createWallet = require('../src/wallet')
const { verifySignature } = require('../src/crypto')

describe('Wallet', () => {
  let wallet

  beforeEach(() => {
    wallet = createWallet()
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
    ).toBe(true)

  })
})
