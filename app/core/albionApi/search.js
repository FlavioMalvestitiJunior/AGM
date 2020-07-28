'use strict'

const fetch = require('node-fetch')

const ALBION_SEARCH_API = 'https://gameinfo.albiononline.com/api/gameinfo/search?q='
const ALBION_PLAYER_API = 'https://gameinfo.albiononline.com/api/gameinfo/players/'
const ALBION_ALLIANCE_API = 'https://gameinfo.albiononline.com/api/gameinfo/alliances/'

/**
 * this function gets albion guild in Albion Search API
 * @param {String} guildName albion guild name
 * @returns {Promise<AlbionGuildLight|undefined>} return AlbionGuild or undefined if guild is not found
 */
function getGuild (guildName) {
  return fetch(`${ALBION_SEARCH_API}${guildName}`)
    .then((response) => response.json())
    .then((result) => {
      if (result.guilds.length >= 1) {
        return result.guilds[0]
      }
    })
}

/**
 * This function return all guilds found in API
 * @param {String[]} guildNames guild names
 * @returns {Promise<AlbionGuildLight[]>}
 */
function getGuilds (guildNames) {
  return Promise.all(guildNames.map(getGuild)).then((guilds) => guilds.filter(Boolean))
}

/**
 * this method returns all player's info
 * @param {String} userName player user name
 * @returns {Promise<AlbionPlayer>}
 */
function getPlayer (userName) {
  return fetch(`${ALBION_SEARCH_API}${userName}`)
    .then((result) => {
      if (result.status > 199 && result.status < 400) {
        return result.json()
      }
      throw new Error('Player Not Found')
    })
    .then((result) => {
      if (result.players.length >= 1) {
        return result.players[0]
      }
      throw new Error('Player Not Found')
    }).then((player) => {
      return fetch(`${ALBION_PLAYER_API}${player.Id}`)
    }).then((result) => {
      if (result.status > 199 && result.status < 400) {
        return result.json()
      }
      throw new Error('Player Not Found')
    })
}

/**
 * Returns Aliance Info when Albion API returns it.
 * @param {String} allyId  alliance Id
 * @returns {Promise<AlbionAlly>}
 */
function getAlliance (allyId) {
  return fetch(`${ALBION_ALLIANCE_API}${allyId}`)
    .then((response) => {
      if (response.status > 199 && response.status < 400) {
        return response.json()
      }
      throw new Error('Alliance Not Found')
    })
}

module.exports = {
  getGuild,
  getPlayer,
  getAlliance,
  getGuilds
}
