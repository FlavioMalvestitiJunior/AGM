const { zvzPlayersController } = require("../../../core/controllers");
const permissions = require('discord.js/src/util/Permissions')

async function registerZvZPlayers (message, bot) {
    const channels = message.guild.channels.resolve(message.member.voice.channel.id);
    const playersPromise = channels.members.reduce((users, member) => {
        users.push(bot.guilds.resolve(message.guild).members.fetch(member.id))
        return users
    }, [])

    Promise.all(playersPromise).then((players) => {
        const palyersToGo = players.reduce((zvzPlayers, player) => {
            zvzPlayers.push(player.nickname || player.user.username)
            return zvzPlayers
        }, [])

        const zvzPlayers = {
            discordGuildId: message.guild.id,
            zvzTime: new Date(),
            discordUserId: message.author.id,
            players: palyersToGo
        }
        zvzPlayersController.save(zvzPlayers)
        message.reply(JSON.stringify(zvzPlayers))
    })
}

async function listZvZPlayers (message, bot) {
    const zvzs = await zvzPlayersController.getAll()
    message.reply(JSON.stringify(zvzs.players))
}

module.exports = {
    'zvz players': {
        allowBot: false,
        channelType: 'all',
        permissions: [permissions.FLAGS.ADMINISTRATOR],
        function: registerZvZPlayers
    },
    'list zvz players': {
        allowBot: false,
        channelType: 'all',
        permissions: [permissions.FLAGS.ADMINISTRATOR],
        function: listZvZPlayers
    }
}