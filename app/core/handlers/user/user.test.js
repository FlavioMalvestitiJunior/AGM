'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('User Finders', () => {
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

    userQuery.findUsersByGuild(1, true).then((players) => {
      assert.deepStrictEqual(players, users)
      done()
    })
  })
})
