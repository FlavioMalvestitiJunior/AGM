const discord = require('discord.js')
const discordConfig = require('../../config.json')
const { messageHandlers } = require('./messageHandlers')
const permissions = require('discord.js/src/util/Permissions')

function canRunHandler (member, handlerPermissions = []) {
  if (!handlerPermissions.length) {
    return true
  }
  if (member.hasPermission(permissions.FLAGS.ADMINISTRATOR)) {
    return true
  }

  return handlerPermissions.every((permission) => member.hasPermission(permission))
}

function startDiscordBot () {
  const bot = new discord.Client()
  bot.on('ready', () => {
    bot.user.setPresence({ activity: { name: 'Aguardando ordens' }, status: 'Online' })
      .catch(console.error)
    console.log('Bot Interface UP')
  })

  bot.on('message', async (message) => {
    const messageTokens = message.content.toLowerCase().split(/:|>/)
    const messageParams = message.content.split('>').pop()
    if (!messageTokens[0] || !messageTokens[1] || !messageTokens[0].startsWith(discordConfig.discordService.prefix)) return
    const handler = messageHandlers[messageTokens[1].trim()]

    if (!handler) {
      message.reply('I don\'t know what you want')
      return
    }

    if (message.author.bot && !handler.allowBot) return
    if (message.channel.type !== handler.channelType && handler.channelType !== 'all') return

    if (!canRunHandler(message.member, handler.permissions)) {
      message.reply('You have no power here! ha ha ha!')
      return
    }
    handler.function(message, bot, messageParams)
  })
  bot.on('guildMemberAdd', console.log)
  bot.on('guildMemberRemove', console.log)

  bot.login(process.env.BOT_TOKEN)
}

module.exports = {
  startDiscordBot
}
