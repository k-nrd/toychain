const sha256 = require('crypto-js/sha256')
const Hex = require('crypto-js/enc-hex')
const EdDSA = require('elliptic').eddsa

function hex2bin (hex) {
  const bits = []
  for (let i = 0; i < hex.length; i += 2) 
    bits.push(parseInt(hex.substr(i, 2), 16).toString(2).padStart(8, '0'))
  return bits.join('')
}

const sha256hash = (...args) =>
  Hex.stringify(sha256(args.sort().join(' ')))

const eddsa = new EdDSA('ed25519')

function verifySignature({ pubKey, data, signature }) {
  return pubKey.verify(sha256hash(data), signature)
}

module.exports = {
  hex2bin,
  sha256hash,
  eddsa,
  verifySignature
}
