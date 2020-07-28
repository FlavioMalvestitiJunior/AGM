const { userController } = require('../../core/handlers')
const permissions = require('discord.js/src/util/Permissions')

function setRole (message, savedUser) {
  const userRoles = savedUser.role.split(';').map(role => role.toLowerCase())
  console.log(userRoles)
  const role = message.guild.roles.cache.filter(role => userRoles.includes(role.name.toLowerCase()))
  return message.member.roles.add(role).then(() => savedUser).catch((error) => {
    console.error(error)
    throw new Error('The member register was save, but I cant apply user roles!')
  })
}

async function registerUser (message, bot, param) {
  const userguild = await bot.guilds.resolve(message.guild).members.fetch(message.author.id)
  userController.registerUser(userguild, param).then((savedUser) => {
    return setRole(message, savedUser)
  }).then((user) => {
    if (user.userPasswords) {
      message.author.createDM()
        .then(channel => channel.send((`Seu Usuário para acessar a interface é\n Usuário: ${user.userName} \n Senha: ${user.userPasswords.rawPassword}`)))
    }
    return message.member.setNickname(user.guildUserName).then(() => {
      message.reply(`Player registered as ${user.guildUserName}`)
    }).catch((error) => {
      throw new Error('I have no power to change your user\'s nick name, please request it to Admin!')
    })
  }).catch((error) => {
    console.error(error)
    message.reply(error.message)
  })
}

module.exports = {
  'register user': {
    allowBot: false,
    channelType: 'all',
    permissions: [permissions.FLAGS.VIEW_CHANNEL],
    function: registerUser
  }
}
