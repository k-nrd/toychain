const { mine } = require('./mine')
const validate = require('./validate')
const { GENESIS } = require('./config')

function createBlockchain() {
  let chain = [GENESIS]

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
  })
}

module.exports = createBlockchain
