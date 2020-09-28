function getBlocks (req, res) {
  return res.end(JSON.stringify(req.blockchain.get()))
}

function mineBlock (req, res) {
  const { body: { data }, blockchain, pubsub } = req
  blockchain.add({ data })
  pubsub.broadcast()
  res.writeHead(302, { Location: '/api/blocks' })
  res.end()
}

module.exports = {
  getBlocks,
  mineBlock
}
