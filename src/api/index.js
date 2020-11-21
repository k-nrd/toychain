const polka = require('polka')
const { json } = require('body-parser')

const { createBlockchain } = require('../blockchain')
const { createPubSub } = require('../pubsub')
const { getBlocks, mineBlock } = require('./routes')

const blockchain = createBlockchain()
const pubsub = createPubSub({ blockchain })

function appData (req, res, next) {
  req.pubsub = pubsub
  req.blockchain = blockchain
  next()
}

const api = polka()
  .use(json())
  .use(appData)
  .get('/api/blocks', getBlocks)
  .post('/api/mine', mineBlock)

module.exports = { api, blockchain, pubsub }
