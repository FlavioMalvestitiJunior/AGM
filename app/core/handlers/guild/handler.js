const { getGuild } = require('../../albionApi')
const { validate } = require('jsonschema')
const GuildConfigurationsSchema = require('../../../schemas/GuildConfigurations.json')
const GuildSchema = require('../../../schemas/GuildConfigurations.json')

function registerGuild (guild) {
  const guildName = guild.guildName
  return getGuild(guildName).then((albionGuild) => {
    guild.albionId = albionGuild.Id
    return guild
  }).then((newGuild) => {
    return models.guilds.create(newGuild)
  })
}

module.exports = {
  registerGuild
}
