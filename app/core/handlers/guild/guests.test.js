'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('Guild Guests Add guest guild', () => {
  it('Verify diferrences btween GuestsA and GuestsB', (done) => {
    const guestsA = [
      {
        nick: 'AC',
        name: 'Awful Company'
      },
      {
        nick: 'MRG',
        name: 'Merge'
      },
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const guestsB = [
      {
        id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        nick: 'MRG',
        name: 'Merge'
      },
      {
        id: 'fcypjM0JQHi-YPR3stQ7lw',
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const expectedDifference = [
      {
        nick: 'AC',
        name: 'Awful Company'
      }
    ]
    const processedDifference = require('./guests')._differenceGuests(guestsA, guestsB)
    assert.deepStrictEqual(processedDifference, expectedDifference)
    done()
  })

  it('Return an empty array if there\'s no difference btween GuestsA and GuestsB', (done) => {
    const guestsA = [
      {
        nick: 'MRG',
        name: 'Merge'
      },
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const guestsB = [
      {
        id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        nick: 'MRG',
        name: 'Merge'
      },
      {
        id: 'fcypjM0JQHi-YPR3stQ7lw',
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const expectedDifference = []
    const processedDifference = require('./guests')._differenceGuests(guestsA, guestsB)
    assert.deepStrictEqual(processedDifference, expectedDifference)
    done()
  })

  it('Add guest guild', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const newGuests = [
      {
        nick: 'MRG',
        name: 'Merge'
      },
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const expectedGuests = [
      {
        id: '61yii28pRoWZXbNnkk4rUw',
        nick: 'AC',
        name: 'Awful Company'
      },
      {
        id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        nick: 'MRG',
        name: 'Merge'
      },
      {
        id: 'fcypjM0JQHi-YPR3stQ7lw',
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }

    guild.save.resolves(guild)

    const albionApiResponse = [
      {
        Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        Name: 'Merge'
      },
      {
        Id: 'fcypjM0JQHi-YPR3stQ7lw',
        Name: 'Just a Game'
      }
    ]

    const albionApi = { getGuilds: sinon.stub().resolves(albionApiResponse) }

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery,
      '../../albionApi': albionApi
    })

    guestHandler.addGuests('1', newGuests).then(({ guild }) => {
      assert.deepStrictEqual(guild.guildConfig.guests, expectedGuests)
      done()
    })
  })

  it('Add guest guild only if albion API answer guild Id', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const newGuests = [
      {
        nick: 'MRG',
        name: 'Merge'
      },
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const expectedGuests = [
      {
        id: '61yii28pRoWZXbNnkk4rUw',
        nick: 'AC',
        name: 'Awful Company'
      },
      {
        id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        nick: 'MRG',
        name: 'Merge'
      }
    ]

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }

    guild.save.resolves(guild)

    const albionApiResponse = [
      {
        Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        Name: 'Merge'
      }
    ]
    const albionApi = { getGuilds: sinon.stub().resolves(albionApiResponse) }

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery,
      '../../albionApi': albionApi
    })

    guestHandler.addGuests('1', newGuests).then(({ guild }) => {
      assert.deepStrictEqual(guild.guildConfig.guests, expectedGuests)
      done()
    })
  })

  it('Dont Change guest guilds if Albion API don\'t found guild ids', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const newGuests = [
      {
        nick: 'MRG',
        name: 'Merge'
      },
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const expectedGuests = [
      {
        id: '61yii28pRoWZXbNnkk4rUw',
        nick: 'AC',
        name: 'Awful Company'
      },
      {
        id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        nick: 'MRG',
        name: 'Merge'
      }
    ]

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }

    guild.save.resolves(guild)

    const albionApiResponse = [
      {
        Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        Name: 'Merge'
      }
    ]
    const albionApi = { getGuilds: sinon.stub().resolves(albionApiResponse) }

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery,
      '../../albionApi': albionApi
    })

    guestHandler.addGuests('1', newGuests).then(({ guild }) => {
      assert.deepStrictEqual(guild.guildConfig.guests, expectedGuests)
      done()
    })
  })

  it('Report guild that can\'t be add as guest cause Albion Search not found', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const newGuests = [
      {
        nick: 'MRG',
        name: 'Merge'
      }, {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const notFoundGuest = [
      {
        nick: 'JAG',
        name: 'Just a Game'
      }
    ]

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }

    guild.save.resolves(guild)

    const albionApiResponse = [
      {
        Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        Name: 'Merge'
      }
    ]
    const albionApi = { getGuilds: sinon.stub().resolves(albionApiResponse) }

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery,
      '../../albionApi': albionApi
    })

    guestHandler.addGuests('1', newGuests).then(({ notFoundGuests }) => {
      assert.deepStrictEqual(notFoundGuests, notFoundGuest)
      done()
    })
  })
})

describe('Guild Guests Remove guest guild', () => {
  it('Remove Guests from guild', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const guestToRemove = [
      {
        nick: 'AC',
        name: 'Awful Company'
      }
    ]

    const expectedRemovedGuests = [{
      id: '61yii28pRoWZXbNnkk4rUw',
      nick: 'AC',
      name: 'Awful Company'
    }]

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }
    guild.save.resolves(guild)

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery
    })

    guestHandler.removeGuests('61yii28pRoWZXbNnkk4rUw', guestToRemove).then((removedGuests) => {
      assert.deepStrictEqual(removedGuests.guild.guildConfig.guests, [])
      assert.deepStrictEqual(removedGuests.removedGuests, expectedRemovedGuests)
      done()
    })
  })

  it('Don\'t remove guest if guild is not found', (done) => {
    const guild = {
      guildConfig: {
        guests: [{
          id: '61yii28pRoWZXbNnkk4rUw',
          nick: 'AC',
          name: 'Awful Company'
        }]
      },
      changed: sinon.stub(),
      save: sinon.stub()
    }

    const guestToRemove = [
      {
        nick: 'AC',
        name: 'Awful Companyy'
      }
    ]

    const expectedRemovedGuests = []

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().resolves(guild)
    }
    guild.save.resolves(guild)

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery
    })

    guestHandler.removeGuests('61yii28pRoWZXbNnkk4rUw', guestToRemove).then((removedGuests) => {
      assert.deepStrictEqual(removedGuests.guild.guildConfig.guests, guild.guildConfig.guests)
      assert.deepStrictEqual(removedGuests.removedGuests, expectedRemovedGuests)
      done()
    })
  })

  it('Throws error if db find fails', (done) => {
    const someError = new Error('Some Error')

    const guildQuery = {
      getGuildByDiscordId: sinon.stub().rejects(someError)
    }

    const guestHandler = proxyquire('./guests', {
      './guildQuery': guildQuery
    })

    guestHandler.removeGuests('61yii28pRoWZXbNnkk4rUw', []).catch((error) => {
      assert.deepStrictEqual(error, someError)
      done()
    })
  })
})
