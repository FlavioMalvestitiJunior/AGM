const fetch = require('node-fetch')
const guildController = require('../../../core/controllers/guild')
const permissions = require('discord.js/src/util/Permissions')


const ALBION_SEARCH_API = 'https://gameinfo.albiononline.com/api/gameinfo/search?q='

async function getAlbionGuild (guildName, message) {
    const guilds = await fetch(`${ALBION_SEARCH_API}${guildName}`).then((response) => response.json())

    if (guilds.guilds.length >= 1) {
        return guilds.guilds[0]
    }

    message.reply('Guild Not Found!')
    throw new Error('Guild Not Found')
}

async function registerGuild (message, bot, params) {
    const newParams = params.split(',').reduce((guildTmpConf, conf) => {
        const tmp = conf.split('=')
        guildTmpConf[tmp[0].trim()] = tmp[1].trim()
        return guildTmpConf
    }, {})

    const albionGuild = await getAlbionGuild(newParams.name, message)

    const guild = {
        guildId: message.guild.id,
        guildName: newParams.name,
        albionId: albionGuild.Id,
        guildConfig: {
            newMeberRole: newParams.new_member_role,
            newGuessRole: newParams.new_guess_role,
            guessAlly: [],
            guessGuild: []
        }
    }

    guildController.registerGuild(guild)
    message.reply('Guild Registred MiLord!')
}

module.exports = {
    'register guild': {
        allowBot: false,
        channelType: 'all',
        permissions: [permissions.FLAGS.ADMINISTRATOR],
        function: registerGuild
    }
}