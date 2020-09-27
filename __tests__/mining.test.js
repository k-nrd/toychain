const { describe, test, expect } = require('@jest/globals')

const { mine, adjustDiff } = require('../src/blockchain/mine')
const sha256hash = require('../src/blockchain/hash')
const { GENESIS, MINE_RATE } = require('../src/blockchain/config')

describe('Mine block', () => {
  const last = GENESIS,
    data = 'mined data',
    mined = mine({ last, data })

  test('Mined block has all block props', () => {
    expect('timestamp' in mined).toBe(true)
    expect('lastHash' in mined).toBe(true)
    expect('hash' in mined).toBe(true)
    expect('data' in mined).toBe(true)
    expect('nonce' in mined).toBe(true)
    expect('diff' in mined).toBe(true)
  })

  test('Mined block `lastHash` is equal to lastBlock hash', () => {
    expect(mined.lastHash).toEqual(last.hash)
  })

  test('Mined block `data` is equal to input data', () => {
    expect(mined.data).toEqual(data)
  })

  test('Mined block has `timestamp`', () => {
    expect(mined.timestamp).not.toEqual(undefined)
  })

  test('Mined block has `hash` generated = require( inputs', () => {
    expect(mined.hash)
      .toEqual(sha256hash(mined.timestamp, last.hash, mined.nonce, mined.diff, data))
  })

  test('Mined block has `hash` that meets diff criteria', () => {
    expect(mined.hash.slice(0, mined.diff))
      .toEqual('0'.repeat(mined.diff))
  })

  test('Slowly mined block has lower `diff`', () => {
    expect(adjustDiff({ last: mined, timestamp: mined.timestamp + MINE_RATE + 100 }))
      .toEqual(mined.diff - 1)
  })

  test('Quickly mined block has higher `diff`', () => {
    expect(adjustDiff({ last: mined, timestamp: mined.timestamp + MINE_RATE - 100 }))
      .toEqual(mined.diff + 1)
  })
})
