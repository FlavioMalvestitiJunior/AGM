const { userController } = require('../../core/controllers')
const permissions = require('discord.js/src/util/Permissions')


async function registerUser (message, bot) {
    const userPasswords = userController.recoverPassword()
    const userguild = await bot.guilds.resolve(message.guild).members.fetch(message.author.id)
    const user = {
        discordUserId: message.author.id,
        password: userPasswords.cryptPassword,
        userName: userguild.displayName || message.author.username
    }
    userController.save(user).then((savedUser) => {
        message.author.createDM().then(channel => channel.send((`Seu Usuário para acessar a interface é\n Usuário: ${savedUser.userName} \n Senha: ${userPasswords.rawPassword}`)))
    })
}

module.exports = {
    'register user':{
        allowBot: false,
        channelType: 'all',
        permissions: [permissions.FLAGS.VIEW_CHANNEL],
        function: registerUser
    }
}