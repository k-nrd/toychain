const polka = require('polka')
const { json } = require('body-parser')

const createBlockchain = require('../blockchain')
const createPubSub = require('../pubsub')
const { getBlocks, mineBlock } = require('./routes')

const { PORT=3000 } = process.env

const blockchain = createBlockchain()
const pubsub = createPubSub({ blockchain })

setTimeout(() => pubsub.broadcast(), 1000)

function appData (req, res, next) {
  req.pubsub = pubsub
  req.blockchain = blockchain
  next()
}

polka()
  .use(json())
  .use(appData)
  .get('/api/blocks', getBlocks)
  .post('/api/mine', mineBlock)
  .listen(PORT, err => {
    if (err) throw err
    console.log(`> Running on localhost:${PORT}`)
  })
