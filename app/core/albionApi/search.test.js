'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')
const ALBION_SEARCH_API = 'https://gameinfo.albiononline.com/api/gameinfo/search?q='
const ALBION_PLAYER_API = 'https://gameinfo.albiononline.com/api/gameinfo/players/'
const ALBION_ALLIANCE_API = 'https://gameinfo.albiononline.com/api/gameinfo/alliances/'

describe('Albion Search API Guilds', () => {
  it('Return the first guild in array when API respose', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    const apiResponse = {
      guilds: [
        {
          Id: 'vdy5NdQTSF2LAlVvR3XDYg',
          Name: 'Rebeliao',
          AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
          AllianceName: '',
          KillFame: null,
          DeathFame: 257566451
        },
        {
          Id: '123',
          Name: 'RebeliaoTeste',
          AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
          AllianceName: '',
          KillFame: null,
          DeathFame: 257566451
        }
      ],
      players: []
    }

    const response = { json: () => Promise.resolve(apiResponse) }
    fetch.resolves(response)

    const expectedResponse = {
      Id: 'vdy5NdQTSF2LAlVvR3XDYg',
      Name: 'Rebeliao',
      AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
      AllianceName: '',
      KillFame: null,
      DeathFame: 257566451
    }

    search.getGuild('rebeliao').then((response) => {
      assert.deepStrictEqual(response, expectedResponse)
      done()
    })
  })

  it('Return undefined when API not return guild', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    const apiResponse = {
      guilds: [],
      players: []
    }

    const response = { json: () => Promise.resolve(apiResponse) }
    fetch.resolves(response)

    const expectedResponse = undefined

    search.getGuild('rebeliao').then((response) => {
      assert.deepStrictEqual(response, expectedResponse)
      done()
    })
  })

  it('Throw error if API Fails', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const expectedError = new Error('Some Error')
    fetch.rejects(expectedError)

    search.getGuild('rebeliao').catch((error) => {
      assert.equal(error, expectedError)
      done()
    })
  })

  it('Returns All founded guilds', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    const response0 = {
      json: sinon.stub().resolves({
        guilds: [
          {
            Id: 'vdy5NdQTSF2LAlVvR3XDYg',
            Name: 'Rebeliao',
            AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
            AllianceName: '',
            KillFame: null,
            DeathFame: 258233525
          }
        ],
        players: []
      })
    }
    const response1 = {
      json: sinon.stub().resolves({
        guilds: [
          {
            Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
            Name: 'Merge',
            AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
            AllianceName: '',
            KillFame: null,
            DeathFame: 2684055242
          }
        ],
        players: []
      })
    }
    const response2 = {
      json: sinon.stub().resolves({
        guilds: [],
        players: []
      })
    }
    const expectedResponse = [
      {
        Id: 'vdy5NdQTSF2LAlVvR3XDYg',
        Name: 'Rebeliao',
        AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
        AllianceName: '',
        KillFame: null,
        DeathFame: 258233525
      },
      {
        Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
        Name: 'Merge',
        AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
        AllianceName: '',
        KillFame: null,
        DeathFame: 2684055242
      }
    ]
    const names = ['rebeliao', 'merge', 'awful companyy']
    fetch.withArgs(`${ALBION_SEARCH_API}${names[0]}`).resolves(response0)
    fetch.withArgs(`${ALBION_SEARCH_API}${names[1]}`).resolves(response1)
    fetch.withArgs(`${ALBION_SEARCH_API}${names[2]}`).resolves(response2)
    search.getGuilds(names).then((returnedGuilds) => {
      assert.deepStrictEqual(returnedGuilds, expectedResponse)
      done()
    })
  })

  it('Fail all responses if one request fail', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    const response0 = {
      json: sinon.stub().resolves({
        guilds: [
          {
            Id: 'vdy5NdQTSF2LAlVvR3XDYg',
            Name: 'Rebeliao',
            AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
            AllianceName: '',
            KillFame: null,
            DeathFame: 258233525
          }
        ],
        players: []
      })
    }

    const response1 = {
      json: sinon.stub().resolves({
        guilds: [
          {
            Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
            Name: 'Merge',
            AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
            AllianceName: '',
            KillFame: null,
            DeathFame: 2684055242
          }
        ],
        players: []
      })
    }

    const expectedError = new Error('Some error')

    const names = ['rebeliao', 'merge', 'awful companyy']
    fetch.withArgs(`${ALBION_SEARCH_API}${names[0]}`).resolves(response0)
    fetch.withArgs(`${ALBION_SEARCH_API}${names[1]}`).resolves(response1)
    fetch.withArgs(`${ALBION_SEARCH_API}${names[2]}`).rejects(expectedError)
    search.getGuilds(names).catch((error) => {
      assert.deepStrictEqual(error, expectedError)
      done()
    })
  })
})

describe('Albion Player API ', () => {
  it('Throws all player\'s information when Albion API response', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'
    const albionSearcApiResponse = {
      guilds: [],
      players: [
        {
          Id: '-1ZB_5QMTxG4jvmbN6tuUA',
          Name: 'XisCaboclinho',
          GuildId: 'vdy5NdQTSF2LAlVvR3XDYg',
          GuildName: 'Rebeliao',
          AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
          AllianceName: 'TR33',
          Avatar: '',
          AvatarRing: '',
          KillFame: 241949,
          DeathFame: 2019468,
          FameRatio: 0.12,
          totalKills: null,
          gvgKills: null,
          gvgWon: null
        }
      ]
    }
    const albionPlayerApiResponse = {
      AverageItemPower: 0.0,
      Equipment: {
        MainHand: null,
        OffHand: null,
        Head: null,
        Armor: null,
        Shoes: null,
        Bag: null,
        Cape: null,
        Mount: null,
        Potion: null,
        Food: null
      },
      Inventory: [],
      Name: 'XisCaboclinho',
      Id: '-1ZB_5QMTxG4jvmbN6tuUA',
      GuildName: 'Rebeliao',
      GuildId: 'vdy5NdQTSF2LAlVvR3XDYg',
      AllianceName: 'TR33',
      AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
      AllianceTag: '',
      Avatar: '',
      AvatarRing: '',
      DeathFame: 2019468,
      KillFame: 241949,
      FameRatio: 0.12,
      LifetimeStatistics: {
        PvE: {
          Total: 30091291,
          Royal: 178747,
          Outlands: 34070,
          Hellgate: 0
        },
        Gathering: {
          Fiber: {
            Total: 126,
            Royal: 81,
            Outlands: 0
          },
          Hide: {
            Total: 67,
            Royal: 0,
            Outlands: 0
          },
          Ore: {
            Total: 94122,
            Royal: 92241,
            Outlands: 1813
          },
          Rock: {
            Total: 6195,
            Royal: 6195,
            Outlands: 0
          },
          Wood: {
            Total: 2928,
            Royal: 2829,
            Outlands: 0
          },
          All: {
            Total: 103438,
            Royal: 101346,
            Outlands: 1813
          }
        },
        Crafting: {
          Total: 96034,
          Royal: 0,
          Outlands: 0
        },
        CrystalLeague: 0,
        Timestamp: '2020-07-16T00:28:15.643395Z'
      }
    }
    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`)
      .resolves({
        json: sinon.stub().resolves(albionSearcApiResponse),
        status: 200
      })
    fetch.withArgs(`${ALBION_PLAYER_API}${albionSearcApiResponse.players[0].Id}`)
      .resolves({
        json: sinon.stub().resolves(albionPlayerApiResponse),
        status: 200
      })

    search.getPlayer(playerName).then((player) => {
      assert.deepStrictEqual(player, albionPlayerApiResponse)
      done()
    })
  })

  it('Throws Player Not Found Error if Search API response 404', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'

    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`).resolves({ status: 404 })

    search.getPlayer(playerName).catch((error) => {
      assert.deepStrictEqual(error.message, 'Player Not Found')
      done()
    })
  })

  it('Returns Player Not Found Error if Player API response 404', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'
    const albionSearcApiResponse = {
      guilds: [],
      players: [
        {
          Id: '-1ZB_5QMTxG4jvmbN6tuUA',
          Name: 'XisCaboclinho',
          GuildId: 'vdy5NdQTSF2LAlVvR3XDYg',
          GuildName: 'Rebeliao',
          AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
          AllianceName: 'TR33',
          Avatar: '',
          AvatarRing: '',
          KillFame: 241949,
          DeathFame: 2019468,
          FameRatio: 0.12,
          totalKills: null,
          gvgKills: null,
          gvgWon: null
        }
      ]
    }

    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`)
      .resolves({
        json: sinon.stub().resolves(albionSearcApiResponse),
        status: 200
      })
    fetch.withArgs(`${ALBION_PLAYER_API}${albionSearcApiResponse.players[0].Id}`)
      .resolves({ status: 404 })

    search.getPlayer(playerName).catch((error) => {
      assert.deepStrictEqual(error.message, 'Player Not Found')
      done()
    })
  })

  it('Throws error if Albion not Found player by name', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'
    const albionSearcApiResponse = {
      guilds: [],
      players: []
    }

    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`)
      .resolves({
        json: sinon.stub().resolves(albionSearcApiResponse),
        status: 200
      })

    search.getPlayer(playerName).catch((error) => {
      assert.deepStrictEqual(error.message, 'Player Not Found')
      done()
    })
  })

  it('Throws error if Albion Search API Fails', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'
    const expectedError = new Error('Some Error')

    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`).rejects(expectedError)

    search.getPlayer(playerName).catch((error) => {
      assert.deepStrictEqual(error, expectedError)
      done()
    })
  })

  it('Throws error if Albion Player API Fails', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const playerName = 'XisCaboclinho'
    const albionSearcApiResponse = {
      guilds: [],
      players: [
        {
          Id: '-1ZB_5QMTxG4jvmbN6tuUA',
          Name: 'XisCaboclinho',
          GuildId: 'vdy5NdQTSF2LAlVvR3XDYg',
          GuildName: 'Rebeliao',
          AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
          AllianceName: 'TR33',
          Avatar: '',
          AvatarRing: '',
          KillFame: 241949,
          DeathFame: 2019468,
          FameRatio: 0.12,
          totalKills: null,
          gvgKills: null,
          gvgWon: null
        }
      ]
    }
    const expectedError = new Error('Some Error')

    fetch.withArgs(`${ALBION_SEARCH_API}${playerName}`)
      .resolves({
        json: sinon.stub().resolves(albionSearcApiResponse),
        status: 200
      })
    fetch.withArgs(`${ALBION_PLAYER_API}${albionSearcApiResponse.players[0].Id}`).rejects(expectedError)

    search.getPlayer(playerName).catch((error) => {
      assert.deepStrictEqual(error, expectedError)
      done()
    })
  })
})

describe('Albion Alliance API', () => {
  it('Return alliance\'s information when API', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    const apiResponse = {
      AllianceId: 'l_8f3GQuT6Cjl1YorXgrzQ',
      AllianceName: 'Happy Tree Friends',
      AllianceTag: 'TR33',
      FounderId: 'BCaVOcvcRpawWakSF2w1jg',
      FounderName: 'red0x',
      Founded: '2020-06-09T23:01:37.929647Z',
      Guilds: [
        {
          Id: 'gE2bex4mQfWgfVPJqQA7Zg',
          Name: 'Big Tree'
        },
        {
          Id: 'ZK544PEeTrqpnQLouevN6Q',
          Name: 'Golden Hawks'
        },
        {
          Id: 'VxhlpjCVShWLjstHbGTHwg',
          Name: 'Happy Wolves'
        },
        {
          Id: 'fcypjM0JQHi-YPR3stQ7lw',
          Name: 'Just a Game'
        },
        {
          Id: 'PXoTzIfIQ9y_-EUjKQQvVA',
          Name: 'Merge'
        },
        {
          Id: 'vdy5NdQTSF2LAlVvR3XDYg',
          Name: 'Rebeliao'
        },
        {
          Id: 'D0E8WqTaQiuBnu4o6ymQsg',
          Name: 'S l a y e r s'
        },
        {
          Id: 'xY97PrpkRIufZrEM7BWLbA',
          Name: 'Stop Inting'
        }
      ],
      NumPlayers: 1016
    }

    fetch.withArgs(`${ALBION_ALLIANCE_API}${apiResponse.AllianceId}`).resolves({
      status: 200,
      json: sinon.stub().resolves(apiResponse)
    })

    search.getAlliance(apiResponse.AllianceId).then((alliance) => {
      assert.deepStrictEqual(alliance, apiResponse)
      done()
    })
  })

  it('Throws Alliance Not Found Error if API response with 404', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })

    fetch.withArgs(`${ALBION_ALLIANCE_API}123`).resolves({
      status: 404
    })

    search.getAlliance('123').catch((error) => {
      assert.deepStrictEqual(error.message, 'Alliance Not Found')
      done()
    })
  })

  it('Throws Error if API fails', (done) => {
    const fetch = sinon.stub()
    const search = proxyquire('./search.js', {
      'node-fetch': fetch
    })
    const expectedError = new Error('Some Error')
    fetch.withArgs(`${ALBION_ALLIANCE_API}123`).rejects(expectedError)

    search.getAlliance('123').catch((error) => {
      assert.deepStrictEqual(error, expectedError)
      done()
    })
  })
})
