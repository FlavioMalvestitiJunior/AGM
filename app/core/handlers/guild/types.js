/**
 * @typedef Guest guild guest.
 * @property {String} id guild albion Id.
 * @property {String} nick guild nick abreviation.
 * @property {String} name guild name.
 * @property {String[]} roles guild players roles.
 */
/**
 * @typedef GuildConfigurations guild configs object
 * @property {String[]} newMemberRole roles to add for new members register.
 * @property {guest[]} guests guilds guest, members of this guilds can register and enter automaticaly in discord.
 */
/**
 * @typedef Guild albion guild informations + discord configs.
 * @property {String} id guild albion id.
 * @property {String} name guild name.
 * @property {String} discordId guild discord id.
 * @property {String} prefix guild prefix abreviation.
 * @property {guildConfigurations} configs guild configurations.
 */
/**
 * @typedef GuestsResponse object that returns new guild and infos about add  guest operations
 * @property {Guild} guild guild object after save new guests
 * @property {Guest[]} notFoundGuests not found guests
 * @property {Guest[]} removedGuests removed guests
 */
