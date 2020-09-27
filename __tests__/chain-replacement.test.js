const { beforeEach, describe, test, expect } = require('@jest/globals')

const createBlockchain = require('../src/blockchain')

describe('Replacement', () => {
  let own,
    other,
    fake,
    snapshot,
    errorMock,
    logMock

  beforeEach(() => {
    errorMock = jest.fn()
    logMock = jest.fn()
    global.console.error = errorMock
    global.console.log = logMock

    own = createBlockchain()
    own.add({ data: 'bears' })

    other = createBlockchain()
    other.add({ data: 'bears' })
    other.add({ data: 'beats' })
    other.add({ data: 'battlestart galactica' })
  })

  test('Blockchain shouldn\'t be replaced by shorter chain', () => {
    snapshot = other.get()
    other.replace(own.get())
    expect(other.get()).toEqual(snapshot)
  })

  test('Blockchain shouldn\'t be replaced by longer, invalid, chain', () => {
    snapshot = own.get()
    fake = other.get()
    fake[1] = { ...fake[1], data: 'tampered' }
    own.replace(fake)
    expect(own.get()).toEqual(snapshot)
  })

  test('Blockchain should be replaced by longer, valid, chain', () => {
    own.replace(other.get())
    expect(own.get()).toEqual(other.get())
  })
})
