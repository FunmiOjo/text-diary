/* global describe beforeEach it */
const {expect} = require('chai')
const { getRequestedAction } = require('./commands')
const GET_USER_ENTRIES_BY_DAY = 'GET_USER_ENTRIES_BY_DAY'
const GET_MOOD_BY_DAY = 'GET_MOOD_BY_DAY'
const GET_MOOD_BY_DATES = 'GET_MOOD_BY_DATES'

describe.only('Command parser', () => {
  describe('getRequestedAction', () => {
    it('should return the appropriate actions', () => {
      const action1 = getRequestedAction(['entry', 'day', '9-20-2018'])
      const action2 = getRequestedAction(['mood', 'day', '9-20-2018'])
      const action3 = getRequestedAction(['mood', 'dates', '9-20-2018', '9-21-2018'])
      action1(1, ['entry', 'day', '9-20-2018'])
        .then(entries => expect(entries).to.be.an('array'))
        .catch(error => console.error(error))
      expect(action1).to.be.a('function')
      expect(action2).to.be.equal(GET_MOOD_BY_DAY)
      expect(action3).to.be.equal(GET_MOOD_BY_DATES)
      //expect(action4.length).to.be.equal(2)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
