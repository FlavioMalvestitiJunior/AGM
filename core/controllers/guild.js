const { models } = require('../dbConnection');

async function registerGuild (guild) {
    return await models.guilds.create(guild)
}

module.exports = {
    registerGuild
    // findGuild,
    // save
}