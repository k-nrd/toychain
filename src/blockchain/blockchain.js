import { mine } from './mine'
import GENESIS from './genesis'

export function blockchain() {
  const chain = [GENESIS]

  const add = ({ data }) =>
    chain.push(mine({ last: chain[chain.length - 1], data }))

  return Object.freeze({ 
    chain,
    add,
  })
}
