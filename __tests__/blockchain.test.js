import { beforeEach, describe, test, expect } from '@jest/globals'
import { blockchain } from '../src/blockchain/blockchain'
import { valid } from '../src/blockchain/validate'
import GENESIS from '../src/blockchain/genesis'

describe('Blockchain', () => {
  let bc

  beforeEach(() => bc = blockchain())

  test('Blockchain contains `chain` array', () => {
    expect(Array.isArray(bc.chain)).toBe(true)
  })

  test('Blockchain starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(GENESIS)
  })

  test('Blockchain can add a new block to the chain', () => {
    const data = 'new-data'
    bc.add({ data })
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
  })

  describe('Validation', () => {
    beforeEach(() => {
      bc.add({ data: 'bears' })
      bc.add({ data: 'beats' })
      bc.add({ data: 'battlestart galactica' })
    })

    test('Chains that don\'t start with genesis are considered invalid', () => {
      bc.chain[0] = { data: 'fake-genesis' } 
      expect(valid(bc.chain)).toBe(false)
    })

    test('Chains that contain wrong lastHash references are considered invalid', () => {
      bc.chain[2] = { ...bc.chain[2], lastHash: 'broken-last-hash' }
      expect(valid(bc.chain)).toBe(false)
    })

    test('Chains that contain blocks with invalid fields are considered invalid', () => {
      bc.chain[2] = { ...bc.chain[2], data: 'bad-and-evil-tampered-data' }
      expect(valid(bc.chain)).toBe(false)
    })

    test('Valid chains are valid', () => {
      expect(valid(bc.chain)).toBe(true)
    })
  })
})

