function getBlocks (req, res) {
  return res.end(JSON.stringify(req.blockchain.get()))
}

function mineBlock (req, res) {
  const { data } = req.body
  req.blockchain.add({ data })
  const url = '/api/blocks'
  const msg = `Redirecting to ${url}`
  res.writeHead(302, {
    Location: url,
    'Content-Type': 'text/plain',
    'Content-Length': msg.length 
  })
  res.end(msg)
}

module.exports = {
  getBlocks,
  mineBlock
}
