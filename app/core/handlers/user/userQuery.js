'use strict'

const { models } = require('../../dbConnection')
const { Op } = require('sequelize')
const { mode } = require('crypto-js')

/**
 * Find Players by user guild
 * @param {String} albionGuildId users Albion guild Id
 * @param {Boolean} userGuild define if the query is by user's guild
 */
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

/**
 * this method retrievesuser by Albion Player user ID
 * @param {String} albionUserId albion player user id
 */
function findUserByAlbionId (albionUserId) {
  return models.users.findOne({ where: { albionUserId: albionUserId } })
}

/**
 * Update user or create a new user.
 * @param {User} user user to save
 */
async function saveUser (user) {
  const newUser = await models.users.build(user)
  newUser.changed('disaracordUserId', true)
  newUser.changed('userName', true)
  newUser.changed('password', true)
  newUser.changed('albionUserId', true)
  newUser.changed('userGuilds', true)
  newUser.changed('UserStrikes', true)

  return newUser.save()
}

module.exports = {
  findUsersByGuild,
  findUserByAlbionId,
  saveUser
}
