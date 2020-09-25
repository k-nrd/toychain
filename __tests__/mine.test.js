import { describe, test, expect } from '@jest/globals'
import { mine } from '../src/blockchain/mine'
import { sha256hash } from '../src/blockchain/hash'
import GENESIS from '../src/blockchain/genesis'

describe('Mine block', () => {
  const last = GENESIS,
    data = 'mined data',
    mined = mine({ last, data })

  test('Mined block has all block props', () => {
    expect('timestamp' in mined).toBe(true)
    expect('lastHash' in mined).toBe(true)
    expect('hash' in mined).toBe(true)
    expect('data' in mined).toBe(true)
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

  test('Mined block has `hash` generated from inputs', () => {
    expect(mined.hash).toEqual(sha256hash(mined.timestamp, last.hash, data))
  })
})
