const { beforeEach, describe, test, expect } = require('@jest/globals')

const createBlockchain = require('../src/blockchain')
const { MINE_RATE } = require('../src/config')

describe('Mining rate', () => {
  let own,
    snapshot

  beforeEach(() => {
    own = createBlockchain()
  })

  test('Average mining rate is MINE_RATE', () => {
    const deltas = []
    own.add({ data: 1 })
    for (let i = 2; i < 52; i++) {
      own.add({ data: i })
      snapshot = own.get()
      deltas.push(snapshot[i].timestamp - snapshot[i-1].timestamp)
    }
    const average = deltas.reduce((a, c) => c += a, 0) / deltas.length
    expect((average - 200) < MINE_RATE).toBe(true)
    expect((average + 200) > MINE_RATE).toBe(true)
  })
})
