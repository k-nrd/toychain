const MINE_RATE = 1000

const INIT_DIFF = 10

const GENESIS = Object.freeze({ 
  timestamp: 1601135279087,
  lastHash: 'genesis-last-hash',
  hash: 'genesis-hash',
  nonce: 0,
  diff: INIT_DIFF,
  data: []
})

const ROOT_NODE_ADDR = 'localhost:3000'

const STARTING_BALANCE = 1000

module.exports = {
  MINE_RATE,
  INIT_DIFF,
  GENESIS,
  ROOT_NODE_ADDR,
  STARTING_BALANCE
}
