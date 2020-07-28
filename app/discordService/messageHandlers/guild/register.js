const guildController = require('../../../core/handlers/guild/guests')
const _ = require('lodash')
const permissions = require('discord.js/src/util/Permissions')

function registerGuild (message, bot, params) {
  const newParams = params.split(',').reduce((guildTmpConf, conf) => {
    const tmp = conf.split('=')
    guildTmpConf[tmp[0].trim()] = tmp[1].trim()
    return guildTmpConf
  }, {})

  const guild = {
    id: message.guild.id,
    guildName: newParams.name,
    guildConfig: {
      new_member_role: newParams.new_member_role,
      new_guess_role: newParams.new_guess_role,
      prefix: newParams.prefix,
      guests: []
    }
  }

  guildController.registerGuild(guild).then(() => {
    message.reply('Guild Registered!')
  }).catch(error => {
    console.error(error)
    if (_.get(error, 'errors[0].type') === 'unique violation') {
      message.reply('This guild was already registred!')
      return
    }
    message.reply('Oooops Something went wrong, and i don\'t know what')
  })
}

function addGuessGuild (message, bot, params) {
  addGuess(message, bot, { type: 'guessGuild', guess: params })
}

function addGuess (message, bot, params) {
  const guildID = message.guild.id
  const guests = params.guess.split(',')
    .filter(Boolean)
    .reduce((acc, guess) => {
      const g = guess.split('&')
      const name = g[0].replace('name=', '')
      const nick = g[1].replace('nick=', '')
      acc.push({ name, nick })
      return acc
    }, [])

  guildController.addGuess(guildID, guests, params.type).then((guild) => {
    message.reply(`Guess "${JSON.stringify(guests)}" added!`)
  }).catch(error => {
    console.error(error)
    message.reply('Oooops Something went wrong, and i don\'t know what')
  })
}

function removeGuessGuild (message, bot, params) {
  removeGuess(message, bot, { type: 'guessGuild', guess: params })
}

function removeGuess (message, bot, params) {
  const guildID = message.guild.id
  const guesses = params.guess.split(',')
    .filter(Boolean)
    .reduce((acc, guess) => {
      acc.push(guess.toLowerCase())
      return acc
    }, [])

  guildController.removeGuess(guildID, guesses, params.type).then(({ guild, membersToRemove }) => {
    message.reply(`Guess "${JSON.stringify(guesses)}" removed and its members were kicked!`)
  }).catch(error => {
    console.error(error)
    message.reply('Oooops Something went wrong, and i don\'t know what')
  })
}

function guildChangeConfig (message, bot, params) {
  const newConfigs = params.split(',').filter(Boolean).reduce((configs, config) => {
    const tmp = config.split('=')
    configs[tmp[0].trim().toLowerCase()] = tmp[1].trim()
    return configs
  }, {})
  guildController.updateGuildConfigs(message.guild.id, newConfigs).then((guild) => {
    message.reply(`Configs Updated sucessfully:\n ${JSON.stringify(guild.guildConfig, null, 2)}`)
  }).catch(error => {
    console.error(error)
    message.reply('Oooops Something went wrong, and i don\'t know what')
  })
}

module.exports = {
  'register guild': {
    allowBot: false,
    channelType: 'all',
    permissions: [permissions.FLAGS.ADMINISTRATOR],
    function: registerGuild
  },
  'add guess guild': {
    allowBot: false,
    channelType: 'all',
    permissions: [permissions.FLAGS.ADMINISTRATOR],
    function: addGuessGuild
  },
  'remove guess guild': {
    allowBot: false,
    channelType: 'all',
    permissions: [permissions.FLAGS.ADMINISTRATOR],
    function: removeGuessGuild
  },
  'change guild config': {
    allowBot: false,
    channelType: 'all',
    permissions: [permissions.FLAGS.ADMINISTRATOR],
    function: guildChangeConfig
  }
}
