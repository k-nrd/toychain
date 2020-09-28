const { sha256hash, hex2bin } = require('../crypto')
const { MINE_RATE } = require('../config')

function mine ({ last, data }) {
  const lastHash = last.hash

  let nonce = 0,
    timestamp = Date.now(),
    diff = last.diff,
    hash = hex2bin(sha256hash(timestamp, lastHash, nonce, diff, data))

  while (hash.slice(0, diff) !== '0'.repeat(diff)) {
    nonce++
    timestamp = Date.now()
    diff = adjustDiff({ last, timestamp })
    hash = hex2bin(sha256hash(timestamp, lastHash, nonce, diff, data))
  }
  
  return Object.freeze({
    timestamp,
    hash,
    lastHash,
    nonce,
    diff,
    data
  })
}

const adjustDiff = ({ last, timestamp }) =>
  (last.timestamp + MINE_RATE) < timestamp
    ? last.diff - 1
    : last.diff + 1

module.exports = {
  mine,
  adjustDiff
}
