const {expect} = require('chai')
const { executeDateSearch } = require('./helpers')
const { Entry } = require('../db/models')

const GET_USER_ENTRIES_BY_DAY = 'GET_USER_ENTRIES_BY_DAY'
describe('Entry command methods', () => {

  let entry1
  let entry2
  describe('Entry search methods', () => {
    xdescribe('executeDateSearch', () => {
      let entries
      it('returns entries created on the given date', async () => {
        const date = new Date('9-20-2018')
        const { funcName, args } = executeDateSearch(1, ['day', date])
        entries = await Entry.getUserEntriesByDay(...args)
        console.log('entries', entries)
        let retrievedEntry1
        let retrievedEntry2
        entries.forEach(entry => {
          if (entry.id === entry1.id) {
            retrievedEntry1 = entry
          }

          if (entry.id === entry2.id) {
            retrievedEntry2 = entry
          }
        })
        expect(funcName).to.equal(GET_USER_ENTRIES_BY_DAY)
        expect(entries).to.be.an('array')
        expect(entries.length).to.equal(2)
        expect(retrievedEntry1.body).to.equal(entry1.body)
        expect(retrievedEntry2.body).to.equal(entry2.body)
      })
    }) // ends describe('executeDateSearch')

  })
}) // end describe('Entry search methods')

