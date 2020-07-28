'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')
const fs = require('fs')

describe('Fake sequelize if process doesn\'t have DATABASE_URL', () => {
  it('Return  empty sequelize', (done) => {
    const dbConnection = require('./index')
    const expectedSequelize = {}
    const sequelize = dbConnection.sequelize
    assert.deepStrictEqual(sequelize, expectedSequelize)
    done()
  })

  it('Return  empty modelMap', (done) => {
    const dbConnection = require('./index')
    const expectedModels = {}
    const models = dbConnection.models
    assert.deepStrictEqual(models, expectedModels)
    done()
  })

  it('Return  empty startDBConnection', (done) => {
    const dbConnection = require('./index')
    const expectedStartDBConnection = {}
    const startDBConnection = dbConnection.startDBConnection
    startDBConnection.then((startedDbConnection) => {
      assert.deepStrictEqual(startedDbConnection, expectedStartDBConnection)
      done()
    })
  })
})

describe('Start Sequalize', () => {
  const dir = `${__dirname.replace('/dbConnection', '')}/models`
  const modelsMap = fs.readdirSync(dir)
    .filter(file => file.endsWith('.js'))
    .reduce((models, modelPath, idx) => {
      if (idx % 2 === 0) {
        models[`${dir}/${modelPath}`] = sinon.stub().returns({
          name: modelPath
        })
      } else {
        models[`${dir}/${modelPath}`] = sinon.stub().returns({
          name: modelPath,
          associate: sinon.stub()
        })
      }
      return models
    }, {})

  it('Start Sequelize', (done) => {
    process.env.DATABASE_URL = 'teste'
    const Sequelize = sinon.stub()
    proxyquire('./index', {
      sequelize: { Sequelize },
      ...modelsMap
    })
    assert.deepStrictEqual(Sequelize.calledOnce, true)
    done()
  })

  it('Throw error if sequelize fail', (done) => {
    process.env.DATABASE_URL = 'teste'
    const expectedError = new Error('Some Error')
    const Sequelize = sinon.stub().throws(expectedError)
    try {
      proxyquire('./index', {
        sequelize: { Sequelize },
        ...modelsMap
      })
    } catch (error) {
      assert.deepStrictEqual(Sequelize.calledOnce, true)
      assert.deepStrictEqual(error, expectedError)
      done()
    }
  })

  it('Start DB if sequelize conect', (done) => {
    process.env.DATABASE_URL = 'teste'
    const Sequelize = sinon.stub().returns({
      sync: sinon.stub().returns(),
      authenticate: sinon.stub().resolves({})
    })

    const dbConnection = proxyquire('./index', {
      sequelize: { Sequelize },
      ...modelsMap
    })

    dbConnection.startDBConnection().then(() => {
      done()
    })
  })

  it('Throw error if sequelize not initilize', (done) => {
    process.env.DATABASE_URL = 'teste'

    try {
      require('./index').startDBConnection()
    } catch (error) {
      done()
    }
  })
})
