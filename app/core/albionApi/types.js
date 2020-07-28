/**
 * @typedef AlbionGuild Albion Guild.
 * @property {String} Id guild id
 * @property {String} Name guild name
 * @property {String} FounderId Albion guild founder player id
 * @property {String} FounderName Albion guild foundername
 * @property {Date} Founded Albion founded date
 * @property {String} AllianceTag Alliance Tag
 * @property {String} AllianceId Alliance Id
 * @property {String} AllianceName Alliance Name
 * @property {String} Logo Logo name
 * @property {Number} killFame Guild Kill Fame
 * @property {Number} DeathFame Guild Death Fame
 * @property {*} AttacksWon Guilds Attacks won
 * @property {DefensesWon} DefensesWon Albion founded date
 * @property {Number} MemberCount Members in Guild
 */
/**
 * @typedef AlbionGuildLight Albion Guild with reduced infos.
 * @property {String} Id guild id
 * @property {String} Name guild name
 * @property {String} AllianceId Alliance Id
 * @property {String} AllianceName Alliance Name
 * @property {Number} killFame Guild Kill Fame
 * @property {Number} DeathFame Guild Death Fame
 */
/**
 * @typedef AlbionPlayerEquipement player equipement
 * @property {String} MainHand main hand weapon
 * @property {String} OffHand secondary hand weapon/equip
 * @property {String} Head helms
 * @property {String} Armor player armor
 * @property {String} Shoes player shoes
 * @property {String} Bag player bag
 * @property {String} Cape player cape
 * @property {String} Mount player mount
 * @property {String} Potion player potion
 * @property {String} Food player food
 */
/**
 * @typedef AlbionPlayerPvEStatistics PvE accumulated player fame
 * @property {Number} Total Total player PvE Fame
 * @property {Number} Royal Total player PvE Fame in Royal continet
 * @property {Number} Outlands Total player PvE Fame in Black Zone
 * @property {Number} Hellgate Total player PvE Fame in Hellgate
 */
/**
 * @typedef AlbionPlayerFiberGatheringStatistics Fiber Gathering accumulated player fame
 * @property {Number} Total Total player Fiber Gathering Fame
 * @property {Number} Royal Total player Fiber Gathering Fame in Royal continet
 * @property {Number} Outlands Total player Fiber Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerHideGatheringStatistics Hide Gathering accumulated player fame
 * @property {Number} Total Total player Hide Gathering Fame
 * @property {Number} Royal Total player Hide Gathering Fame in Royal continet
 * @property {Number} Outlands Total player Hide Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerOreGatheringStatistics Ore Gathering accumulated player fame
 * @property {Number} Total Total player Ore Gathering Fame
 * @property {Number} Royal Total player Ore Gathering Fame in Royal continet
 * @property {Number} Outlands Total player Ore Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerRockGatheringStatistics Rock Gathering accumulated player fame
 * @property {Number} Total Total player Rock Gathering Fame
 * @property {Number} Royal Total player Rock Gathering Fame in Royal continet
 * @property {Number} Outlands Total player Rock Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerWoodGatheringStatistics Wood Gathering accumulated player fame
 * @property {Number} Total Total player Wood Gathering Fame
 * @property {Number} Royal Total player Wood Gathering Fame in Royal continet
 * @property {Number} Outlands Total player Wood Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerAllGatheringStatistics All Gathering accumulated player fame
 * @property {Number} Total Total player All Gathering Fame
 * @property {Number} Royal Total player All Gathering Fame in Royal continet
 * @property {Number} Outlands Total player All Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerAllCraftingStatistics All Crafting accumulated player fame
 * @property {Number} Total Total player All Gathering Fame
 * @property {Number} Royal Total player All Gathering Fame in Royal continet
 * @property {Number} Outlands Total player All Gathering Fame in Black Zone
 */
/**
 * @typedef AlbionPlayerGatheringStatistics All Gathering accumulated player fame
 * @property {AlbionPlayerFiberGatheringStatistics} Fiber Player Fiber Statistics
 * @property {AlbionPlayerHideGatheringStatistics} Hide Player Hide Statistics
 * @property {AlbionPlayerOreGatheringStatistics} Ore Player Ore Statistics
 * @property {AlbionPlayerRockGatheringStatistics} Rock Player Ore Statistics
 * @property {AlbionPlayerWoodGatheringStatistics} Wood Player Wood Statistics
 * @property {AlbionPlayerRockGatheringStatistics} All Player All Statistics
 */
/**
 * @typedef AlbionPlayerLifeTimeStatistics player statistics accumulated throughout the game
 * @property {AlbionPlayerPvEStatistics} PvE All PvE statistics
 * @property {AlbionPlayerGatheringStatistics} Gathering All Gathering statistics
 * @property {AlbionPlayerAllCraftingStatistics} Crafting All Crafting statistics
 * @property {Number} CrystalLeague All Crystall League fame
 */
/**
 * @typedef AlbionPlayer Player Infos
 * @property {Number} AverageItemPower player medium ip
 * @property {AlbionPlayerEquipement} Equipment player equipement
 * @property {String} Name player name
 * @property {String} Id player id
 * @property {String} GuildName player guild name
 * @property {String} GuildId player guild id
 * @property {String} AllianceName player Alliance name
 * @property {String} AllianceId player Alliance id
 * @property {String} AllianceTag player Alliance tag
 * @property {String} Avatar player avatar name
 * @property {String} AvatarRing player avatar ring
 * @property {Number} DeathFame player death fame
 * @property {Number} KillFame player kill fame
 * @property {Number} FameRatio player fame ratio
 * @property {AlbionPlayerLifeTimeStatistics} LifetimeStatistics player lifetime statistics
 */
/**
 * @typedef AlbionPlayerLigth Albion Player Infos with reduced infos
 * @property {String} Id player id
 * @property {String} Name player name
 * @property {String} GuildId player guild id
 * @property {String} GuildName player guild name
 * @property {String} AllianceId player Alliance id
 * @property {String} AllianceName player Alliance name
 * @property {String} Avatar player avatar name
 * @property {String} AvatarRing player avatar ring
 * @property {Number} KillFame player kill fame
 * @property {Number} DeathFame player death fame
 * @property {Number} FameRatio player fame ratio
 * @property {Number} totalKills player total kills
 * @property {Number} gvgKills player gvg kills
 * @property {Number} gvgWon player gvg won
 */
/**
 * @typedef AlbionAlly Albion alliance information
 * @property {String} AllianceId Alliance id
 * @property {String} AllianceName Alliance name
 * @property {String} AllianceTag Alliance tag name
 * @property {String} FounderId Player id
 * @property {String} FounderName Player name
 * @property {Date} Founded Creation date
 * @property {Object[]} Guilds Guilds in alliance
 * @property {String} Guilds[].Id Guild id
 * @property {String} Guilds[].Name Guild name
 * @property {Number} NumPlayers Alliance total players
 */
