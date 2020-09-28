const { sha256hash, ec } = require('../crypto')
const { STARTING_BALANCE } = require('../config')

function createWallet() {
  const balance = STARTING_BALANCE
  const keyPair = ec.genKeyPair()
  const pubKey = keyPair.getPublic()

  function sign (data) {
    return keyPair.sign(sha256hash(data))
  }

  return Object.freeze({ balance, pubKey, sign })
}

module.exports = createWallet
