const fs = require('fs')
const { Sequelize, DataTypes } = require('sequelize')

const startup = (() => {
  if (!process.env.DATABASE_URL) {
    return {
      sequelize: {},
      modelsMap: {},
      startDBConnection: Promise.resolve({})
    }
  }
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  const dir = `${__dirname.replace('/dbConnection', '')}/models`
  const modelsMap = fs.readdirSync(dir)
    .filter(file => file.endsWith('.js')).reduce((models, modelPath) => {
      const model = require(`${dir}/${modelPath}`)(sequelize, DataTypes)
      models[model.name] = model
      return models
    }, {})

  Object.values(modelsMap).forEach((model) => {
    if ('associate' in model) model.associate(modelsMap)
  })

  async function startDBConnection () {
    await sequelize.sync({ force: true })
    console.log('Sequelize all models loaded!')
    return sequelize.authenticate().then(() => {
      console.log('DB connection UP')
      return arguments
    })
  }

  return {
    sequelize,
    modelsMap,
    startDBConnection
  }
})()

module.exports = {
  startDBConnection: startup.startDBConnection,
  sequelize: startup.sequelize,
  models: startup.modelsMap
}
