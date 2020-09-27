const { beforeEach, describe, test, expect } = require('@jest/globals')

const createBlockchain = require('../src/blockchain')
const validate = require('../src/blockchain/validate')

describe('Validation', () => {
  let own,
    fake

  beforeEach(() => {
    own = createBlockchain()
    own.add({ data: 'bears' })
    own.add({ data: 'beats' })
    own.add({ data: 'battlestart galactica' })
    fake = own.get()
  })

  test('Chains that don\'t start with config are considered invalid', () => {
    fake[0] = { data: 'fake-config' } 
    expect(validate(fake)).toBe(false)
  })

  test('Chains that contain wrong lastHash references are considered invalid', () => {
    fake[2] = { ...fake[2], lastHash: 'broken-last-hash' }
    expect(validate(fake)).toBe(false)
  })

  test('Chains that contain blocks with invalid fields are considered invalid', () => {
    fake[2] = { ...fake[2], data: 'bad-and-evil-tampered-data' }
    expect(validate(fake)).toBe(false)
  })

  test('Chains that contain blocks with invalid difficulties are considered invalid', () => {
    fake[2] = { ...fake[2], diff: fake[1].diff - 2 }
    expect(validate(fake)).toBe(false)
  })

  test('Valid chains are valid', () => {
    expect(validate(own.get())).toBe(true)
  })
})
