const userHandler = require('./user')
const zvzHandler = require('./zvz')
const guildHandler = require('./guild')

const messageHandlers = {
  ...userHandler,
  ...zvzHandler,
  ...guildHandler
}
module.exports = { messageHandlers }
