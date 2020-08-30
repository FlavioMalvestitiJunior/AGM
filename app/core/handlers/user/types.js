/**
 * @typedef UserGuild is a object with infos about what guilds user's is member or is registred in discord
 * @property {String} guildId Albion guild ID
 * @property {String} guildName Albion guild Name
 * @property {String} prefix guild custom prefix
 * @property {String} guildUserName custom user name in guild discord
 * @property {Boolean} mainGuild defines if guild is players user guild
 */
/**
 * @typedef UserStrike is an object with all user strikes
 * @property {Number} quantity number of strike
 * @property {String} description description of strike
 * @property {String} AlbionGuildId id of guild in albion
 */
/**
 * @typedef User ArchMage discord user
 * @property {String} disaracordUserId discor user id
 * @property {String} userName Web interface user name
 * @property {String} password Web interface user password
 * @property {String} albionUserId user id in Albion
 * @property {UserGuild[]} userGuilds user info by guild
 * @property {userStrike[]} UserStrikes user strike by guild
 */
