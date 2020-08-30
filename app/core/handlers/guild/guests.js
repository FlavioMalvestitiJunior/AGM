'use strict'

const { getGuilds } = require('../../albionApi')
const { getGuildByDiscordId } = require('./guildQuery')
const _ = require('lodash')

/**
 * Create a full guest object array with guild albion Id
 * @param {Guest[]} guests guests to add to guild
 * @returns {Guests[]} new guets with Albion Guild Id
 */
function _createGuestGuild (guests) {
  return getGuilds(guests).then((albionGuilds) => {
    return albionGuilds.reduce((newGuests, guild) => {
      const guestGuild = guests.find(({ name }) => name.toLowerCase() === _.get(guild, 'Name', '').toLowerCase())
      newGuests.push({
        id: guild.Id,
        nick: guestGuild.nick,
        name: guild.Name,
        roles: guestGuild.roles
      })
      return newGuests
    }, [])
  })
}

/**
 * This methods extract guilds that not be added as a guest because Albion Search API
 * not found them
 * @param {Guest[]} guestsA guilds founded in Albion Search API
 * @param {Guest[]} guestsB Guilds to add as a guest
 * @returns {Guest[]} guilds not founded in guestsA but contented in guestsB
 */
function _differenceGuests (guestsA, guestsB) {
  return guestsA.filter((guestA) => !guestsB.find((guestB) => guestB.name.toLowerCase() === guestA.name.toLowerCase()))
}

/**
 * this method adds a guests guilds in guild configs.
 * @param {String} discordId guild discordId.
 * @param {Guest[]} guests guests guilds to add.
 * @returns {Guild}
 */
function addGuests (discordId, guests) {
  return _createGuestGuild(guests).then((foundGuests) => {
    return getGuildByDiscordId(discordId).then((guild) => {
      const newGuests = foundGuests.filter((guest) => !guild.guildConfig.guests.find(({ id }) => id === guest.id))
      guild.guildConfig.guests = guild.guildConfig.guests.concat(newGuests)
      guild.changed('guildConfig', true)
      return guild.save().then((savedGuild) => ({
        guild: guild,
        notFoundGuests: _differenceGuests(guests, foundGuests)
      }))
    })
  })
}

/**
 * this function removes guests from guild
 * @param {String} discordId guild discord id
 * @param {Guest[]} guests guests guilds to remove
 */
function removeGuests (discordId, guests) {
  return getGuildByDiscordId(discordId).then((guild) => {
    const oldGuests = guild.guildConfig.guests
    const newGuests = guild.guildConfig.guests.filter((guest) => !guests.find(({ name }) => name.toLowerCase() === guest.name.toLowerCase()))
    guild.guildConfig.guests = newGuests
    guild.changed('guildConfig', true)
    return guild.save().then((savedGuild) => ({
      guild: savedGuild,
      removedGuests: _differenceGuests(oldGuests, newGuests)
    }))
  })
}

module.exports = {
  _differenceGuests,
  _createGuestGuild,
  removeGuests,
  addGuests
}
