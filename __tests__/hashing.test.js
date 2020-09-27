const { describe, test, expect } = require('@jest/globals')

const sha256hash = require('../src/blockchain/hash')

describe('SHA256 hashing', () => {
  test('Hashing function generates a SHA256 hash', () => {
    expect(sha256hash('FOO'))
      .toEqual('1001010100100000010000110111110011101000100100000010111010110011011110011010011111011000101010101010100110001111110001001100100101001110111010110000011110110110011010000100100001010100100001101000111110100110111101110010101111110011010010110000111111010011')
  })

  test('Hash is the same regardless of argument order', () => {
    expect(sha256hash('one', 'two', 'three'))
      .toEqual(sha256hash('three', 'one', 'two'))
  })
})
