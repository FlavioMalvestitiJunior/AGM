'use strict'

const sinon = require('sinon')
const assert = require('assert')
const proxyquire = require('proxyquire')

describe('Test Schema Validator', () => {
  it('Validate GuildConfiguration Schema', (done) => {
    const index = require('./index')
    const guildConfigurations = {
      newMemberRole: ['Tester', 'Admin'],
      guests: [{
        id: 'Teste',
        nick: 'TST',
        name: 'Teste',
        roles: ['Master', 'Noob']
      }]
    }
    const validation = index.validate(guildConfigurations, 'GuildConfigurations')
    assert.deepStrictEqual(validation, true)
    done()
  })
})
