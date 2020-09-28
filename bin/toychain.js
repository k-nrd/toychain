#!/usr/bin/env node
require('dotenv').config()
const { api, blockchain, pubsub } = require('../src/api')

const { DEFAULT_PORT=3000, GENERATE_PEER_PORT } = process.env

const PORT = GENERATE_PEER_PORT === 'true'
  ? DEFAULT_PORT + Math.ceil(Math.random() * 1000)
  : DEFAULT_PORT

if (PORT !== DEFAULT_PORT) blockchain.sync() 

setTimeout(() => pubsub.broadcast(), 1000)

api.listen(PORT, err => {
  if (err) throw err
  console.log(`> Running on localhost:${PORT}`)
})

