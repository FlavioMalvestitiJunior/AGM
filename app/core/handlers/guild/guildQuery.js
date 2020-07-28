'use strict'

const { models } = require('../../dbConnection')

/**
 * this find guild by discord id
 * @param {String} discordId discord guild Id
 * @return {Guild|null}
 */
function getGuildByDiscordId (discordId) {
  return models.guilds.findOne({ where: { discordId: discordId } })
}

module.exports = {
  getGuildByDiscordId
}
