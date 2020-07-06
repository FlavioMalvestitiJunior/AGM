const { models } = require('../dbConnection');
const generatePassword = require('password-generator')
const sha256 = require('crypto-js/sha256')

async function save (user) {
    const dbUser = await models.users.findOne({ where: { discordUserId: user.discordUserId } })

    if (!dbUser) {
        user = await models.users.create(user)
    } else {
        user = Object.assign(dbUser, user)
        user.save()
    }

    return user
}

function cryptPassword (password) {
    return {
        rawPassword: password,
        cryptPassword: sha256(password).toString()
    }
}

function recoverPassword () {
    const newPassWord = generatePassword()
    return cryptPassword(newPassWord)
}

module.exports = {
    save,
    recoverPassword
}