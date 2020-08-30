'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('User Finders', () => {
  it('Find user by Albion ID', (done) => {
    const users = { discordUserId: 1 }
    const models = {
      users: {
        findOne: sinon.stub().resolves(users)
      }
    }
    const userQuery = proxyquire('./userQuery', {
      '../../dbConnection': { models }
    })

    userQuery.findUserByAlbionId('1', true).then((players) => {
      assert.deepStrictEqual(players, users)
      done()
    })
  })

  it('Find user by Albion Guild ID', (done) => {
    const users = [{ discordUserId: 1 }, { discordUserId: 2 }]
    const models = {
      users: {
        findAll: sinon.stub().resolves(users)
      }
    }
    const userQuery = proxyquire('./userQuery', {
      '../../dbConnection': { models }
    })

    userQuery.findUsersByGuild('1', true).then((players) => {
      assert.deepStrictEqual(players, users)
      done()
    })
  })

  it('Throws error if DB send error', (done) => {
    const error = new Error('Some Error')
    const models = {
      users: {
        findAll: sinon.stub().rejects(error)
      }
    }
    const userQuery = proxyquire('./userQuery', {
      '../../dbConnection': { models }
    })

    userQuery.findUsersByGuild('1').catch((someError) => {
      assert.deepStrictEqual(someError, error)
      done()
    })
  })
})

describe('User Save', () => {
  it('Create user if it not in DB', (done) => {
    const user = { discordUserId: 1 }
    const userCreated = {
      ...user,
      changed: sinon.stub().returns()
    }
    userCreated.save = sinon.stub().resolves(userCreated)

    const models = {
      users: {
        build: sinon.stub().resolves(userCreated)
      }
    }

    const userQuery = proxyquire('./userQuery', {
      '../../dbConnection': { models }
    })
    userQuery.saveUser(user).then((savedUser) => {
      assert.deepStrictEqual(savedUser, userCreated)
      done()
    })
  })
})
