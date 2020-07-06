const core = require('./core')
const apiService = require('./apiService')
const discordService = require('./discordService')

core.startDBConnection().then(() => {
    apiService.startServer()
    discordService.startDiscordBot()
}).catch((error) => {
    console.error(error)
})
