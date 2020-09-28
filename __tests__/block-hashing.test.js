const { describe, test, expect } = require('@jest/globals')

const { sha256hash } = require('../src/crypto')

describe('SHA256 hashing', () => {
  test('Hashing function generates a SHA256 hash', () => {
    expect(sha256hash('FOO'))
      .toEqual('9520437CE8902EB379A7D8AAA98FC4C94EEB07B6684854868FA6F72BF34B0FD3'.toLowerCase())
  })

  test('Hash is the same regardless of argument order', () => {
    expect(sha256hash('one', 'two', 'three'))
      .toEqual(sha256hash('three', 'one', 'two'))
  })
})
