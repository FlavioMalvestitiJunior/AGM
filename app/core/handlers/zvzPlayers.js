const { models } = require('../dbConnection')

async function save (zvzPlayers) {
  await models.zvzPlayers.create(zvzPlayers)
}

async function getAll () {
  return models.zvzPlayers.findAll()
}

module.exports = {
  save,
  getAll
}
