'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('Guild DB Handler', () => {
  it('Return guild if one guild has a desired discordId', (done) => {
    const expectedGuild = { discordId: 1 }
    const models = {
      guilds: {
        findOne: sinon.stub().withArgs('1').resolves(expectedGuild)
      }
    }
    const guildQuery = proxyquire('./guildQuery', {
      '../../dbConnection': { models }
    })
    guildQuery.getGuildByDiscordId('1').then((foundGuild) => {
      assert.deepStrictEqual(foundGuild, expectedGuild)
      done()
    })
  })

  it('Return null if guild is not in DB', (done) => {
    const models = {
      guilds: {
        findOne: sinon.stub().withArgs('1').resolves(null)
      }
    }
    const guildQuery = proxyquire('./guildQuery', {
      '../../dbConnection': { models }
    })
    guildQuery.getGuildByDiscordId('1').then((foundGuild) => {
      assert.deepStrictEqual(foundGuild, null)
      done()
    })
  })

  it('Throws error if DB fails', (done) => {
    const someError = new Error('Some Error')
    const models = {
      guilds: {
        findOne: sinon.stub().withArgs('1').rejects(someError)
      }
    }
    const guildQuery = proxyquire('./guildQuery', {
      '../../dbConnection': { models }
    })
    guildQuery.getGuildByDiscordId('1').catch((error) => {
      assert.deepStrictEqual(error, someError)
      done()
    })
  })
})
