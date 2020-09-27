const sha256 = require('crypto-js/sha256')
const Hex = require('crypto-js/enc-hex')

function hex2bin (hex) {
  const bits = []
  for (let i = 0; i < hex.length; i += 2) 
    bits.push(parseInt(hex.substr(i, 2), 16).toString(2).padStart(8, '0'))
  return bits.join('')
}

const sha256hash = (...args) =>
  hex2bin(Hex.stringify(sha256(args.sort().join(' '))))

module.exports = sha256hash
