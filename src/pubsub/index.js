const { createClient } = require('redis')

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN'
}

function createPubSub ({ blockchain }) {
  const publisher = createClient(),
    subscriber = createClient()

  Object.values(CHANNELS)
    .forEach(ch => subscriber.subscribe(ch))

  subscriber.on('message', (channel, msg) => {
    console.log(`Message received. Channel: ${channel}. Message: ${msg}.`)

    if (channel === CHANNELS.BLOCKCHAIN) 
      blockchain.replace(JSON.parse(msg))
  })

  function publish({ channel, msg }) {
    subscriber.unsubscribe(channel, () => {
      publisher.publish(channel, msg, () => {
        subscriber.subscribe(channel)
      })
    })
  }

  function broadcast() {
    publish({ 
      channel: CHANNELS.BLOCKCHAIN, 
      msg: JSON.stringify(blockchain.get()) 
    })
  }

  return Object.freeze({ publish, broadcast })
}

module.exports = { createPubSub }
