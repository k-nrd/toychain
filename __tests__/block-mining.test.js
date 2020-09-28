const { describe, test, expect } = require('@jest/globals')

const { mine, adjustDiff } = require('../src/blockchain/mine')
const { sha256hash, hex2bin } = require('../src/crypto')
const { GENESIS, MINE_RATE } = require('../src/config')

describe('Mine block', () => {
  const last = GENESIS,
    data = 'mined data',
    mined = mine({ last, data })

  test('Mined block has all block props', () => {
    expect(mined).toHaveProperty('timestamp')
    expect(mined).toHaveProperty('lastHash')
    expect(mined).toHaveProperty('hash')
    expect(mined).toHaveProperty('data')
    expect(mined).toHaveProperty('nonce')
    expect(mined).toHaveProperty('diff')
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
      .toEqual(hex2bin(sha256hash(mined.timestamp, last.hash, mined.nonce, mined.diff, data)))
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
