import sha256 from 'crypto-js/sha256'
import Hex from 'crypto-js/enc-hex'

export const sha256hash = (...args) =>
  Hex.stringify(sha256(args.sort().join(' ')))
