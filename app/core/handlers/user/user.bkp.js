const { models } = require('../../dbConnection')
const generatePassword = require('password-generator')
const sha256 = require('crypto-js/sha256')
const { getPlayer } = require('../../albionApi')
const guildController = require('../guild/guests')
const _ = require('lodash')
const { mode } = require('crypto-js')

function cryptPassword (password) {
  return {
    rawPassword: password,
    cryptPassword: sha256(password).toString()
  }
}

function recoverPassword () {
  const newPassWord = generatePassword()
  return cryptPassword(newPassWord)
}

function getUserByID (guildID) {
  return models.users.findByPk(guildID)
}

function getUserByPlayerID (playerId) {
  return models.users.findOne({ where: { albionUserId: playerId } })
}

function createGuildHost (playerGuild, guild, guildUserName) {
  return [{
    id: guild.id,
    guildName: guild.guildName,
    prefix: guild.guildConfig.prefix,
    guildUserName: guildUserName,
    playerGuild: playerGuild
  }]
}

function createNewUser (guild, playerGuild, player, userguild) {
  let prefix = guild.guildConfig.prefix

  if (!playerGuild) {
    prefix = guildGuess.nick
  }

  const guildUserName = `${prefix ? '[' + prefix + ']' : ''} ${player.Name}`
  const userPasswords = cryptPassword()
  const user = {
    discordUserId: userguild.id,
    password: userPasswords.cryptPassword,
    userName: userguild.displayName || guildUserName,
    albionUserId: player.Id,
    guilds: createGuildHost(playerGuild, guild, guildUserName),
    guildId: guild.id
  }
  return models.users.create(user).then((registredUser) => {
    registredUser.userPasswords = userPasswords
    registredUser.guildUserName = guildUserName
    registredUser.role = playerGuild ? _.get(guild, 'guildConfig.new_member_role', '') : _.get(guild, 'guilxdConfig.new_guess_role', '')

    return registredUser
  })
}

function updateUser (user, guild, playerGuild, player) {
  let prefix = guild.guildConfig.prefix

  if (!playerGuild) {
    prefix = guildGuess.nick
  }
  const guildUserName = `${prefix ? '[' + prefix + ']' : ''} ${player.Name}`
  const newGuildHost = createGuildHost(playerGuild, guild, guildUserName)
  user.inGuild = user.guessInGuild.concat(newGuildHost)
  user.guildId = guild.id
  user.changed('inGuild', true)

  return user.save().then((registredUser) => {
    registredUser.guildUserName = guildUserName
    registredUser.role = playerGuild ? _.get(guild, 'guildConfig.new_member_role') : _.get(guild, 'guildConfig.new_guess_role')
    return registredUser
  })
}

function registerUser (userguild, playerName) {
  return getPlayer(playerName).then(async (player) => {
    const foundGuild = await guildController.getGuildByID(userguild.guild.id)
    const guessGuild = foundGuild.guildConfig.guessGuild.find(({ name }) => name.toLowerCase() === _.get(player, 'GuildName', '').toLowerCase())
    const playerGuild = player.GuildId === foundGuild.albionId

    if (!playerGuild && !guessGuild) {
      throw new Error('This player isn\'t a guild member or a guild guess!')
    }

    const user = await getUserByID(userguild.id)
    const userAlbion = await getUserByPlayerID(player.Id)

    if (!user && !userAlbion) {
      return createNewUser(foundGuild, playerGuild, player, userguild, player)
    }

    if (!user || (userAlbion && user.discordUserId !== userAlbion.discordUserId)) {
      throw new Error('User name already registered as a player')
    }

    const userInGuild = user.guessInGuild.find(({ guildId }) => guildId === foundGuild.id)

    if (guessGuild && userInGuild) {
      throw new Error('Player Already registered as a guess!')
    }

    return updateUser(user, foundGuild, playerGuild, player, userguild)
  })
}

function findAllPlayerFromGuessGuilds (hostGuild) {
  mode.users.findAll({
    where: {
      guessInGuild: {
        [Op.contains]: [{ id: hostGuild, playerGuild: false }]
      }
    }
  })
}

module.exports = {
  registerUser,
  recoverPassword
}
