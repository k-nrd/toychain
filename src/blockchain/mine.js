import { sha256hash } from './hash'

export function mine({ last, data }) {
  const timestamp = Date.now(),
    lastHash = last.hash,
    hash = sha256hash(timestamp, lastHash, data)

  return Object.freeze({
    timestamp,
    lastHash,
    hash,
    data
  })
}
