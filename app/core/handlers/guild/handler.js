const { getGuild, getGuilds } = require('../../albionApi')

function registerGuild (guild) {
  const guildName = guild.guildName
  return getGuild(guildName).then((albionGuild) => {
    guild.albionId = albionGuild.Id
    return guild
  }).then((newGuild) => {
    return models.guilds.create(newGuild)
  })
}

function updateGuildConfigs (guildID, configs) {
  return getGuildByID(guildID).then((guild) => {
    guild.guildConfig = Object.assign(guild.guildConfig, configs)
    guild.changed('guildConfig', true)
    return guild.save()
  })
}

module.exports = {
  updateGuildConfigs,
  registerGuild
}
