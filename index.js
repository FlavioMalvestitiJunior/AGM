const core = require('./app/core')
const apiService = require('./app/apiService')
const discordService = require('./app/discordService')

core.startDBConnection().then(() => {
  apiService.startServer()
  discordService.startDiscordBot()
}).catch((error) => {
  console.error(error)
})
