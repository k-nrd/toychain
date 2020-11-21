const request = require('request')
const { mine, adjustDiff } = require('./mine')
const validate = require('./validate')
const { GENESIS, ROOT_NODE_ADDR } = require('../config')

function createBlockchain() {
  let chain = [GENESIS]

  const sync = () =>
    request({ url: `http://${ROOT_NODE_ADDR}/api/blocks` }, (err, res, body) => {
      if (err || res.statusCode !== 200)
        throw err
      console.log('Synchronizing chain...')
      replace(JSON.parse(body))
    })

  const get = () =>
    chain

  const add = ({ data }) =>
    chain.push(mine({ last: chain[chain.length - 1], data }))

  const replace = (newChain) => {
    if (newChain.length <= chain.length) {
      console.error('Incoming chain must be longer')
      return
    }

    if (!validate(newChain)) {
      console.error('Incoming chain must be valid')
      return
    }

    console.log('Replacing chain...')
    chain = newChain
  }

  return Object.freeze({ 
    get,
    add,
    replace,
    sync,
  })
}

module.exports = {
  createBlockchain,
  mine, 
  adjustDiff,
  validate
}
