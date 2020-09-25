import GENESIS from './genesis'
import { sha256hash } from './hash'

export function valid(chain) {
  if (chain[0] !== GENESIS) return false
  for (let i = 0; i < chain.length-1; i++) {
    if (chain[i].hash !== chain[i+1].lastHash) return false
    if (i === 0) continue
    const { timestamp, lastHash, data } = chain[i],
      hash = sha256hash(timestamp, lastHash, data)
    if (chain[i].hash !== hash) return false
  }
  return true
}
