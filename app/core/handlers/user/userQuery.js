'use strict'

const { models } = require('../../dbConnection')
const { Op } = require('sequelize')

function findUsersByGuild (albionGuildId, userGuild = false) {
  return models.users.findAll({
    obj: {
      [Op.contains]: [{
        guildId: albionGuildId,
        mainGuild: userGuild
      }]
    }
  })
}

module.exports = {
  findUsersByGuild
}
