const { GENESIS } = require('./config')
const sha256hash = require('./hash')

function validate (chain) {
  if (JSON.stringify(chain[0]) !== JSON.stringify(GENESIS)) return false

  for (let i = 1; i < chain.length; i++) {
    const { timestamp, hash, lastHash, nonce, diff, data } = chain[i],
      calcHash = sha256hash(timestamp, lastHash, data, nonce, diff)

    if (lastHash !== chain[i-1].hash) return false
    if (hash !== calcHash) return false
    if (Math.abs(diff - chain[i-1].diff) > 1) return false
  }

  return true
}

module.exports = validate
