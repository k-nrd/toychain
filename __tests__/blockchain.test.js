const { beforeEach, describe, test, expect } = require('@jest/globals')

const createBlockchain = require('../src/blockchain')
const { GENESIS } = require('../src/config')

describe('Basic blockchain functionality', () => {
  let own,
    snapshot

  beforeEach(() => {
    own = createBlockchain()
  })

  test('Blockchain contains `chain` array', () => {
    expect(Array.isArray(own.get())).toBe(true)
  })

  test('Blockchain starts with config block', () => {
    expect(own.get()[0]).toEqual(GENESIS)
  })

  test('Blockchain can add a new block to the chain', () => {
    const data = 'new-data'
    own.add({ data })
    snapshot = own.get()
    expect(snapshot[snapshot.length - 1].data).toEqual(data)
  })
})

