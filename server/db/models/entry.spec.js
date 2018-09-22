/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Entry = db.model('entry')

describe('Entry model', () => {
  let cody
  let entry1
  let entry2

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('class methods', () => {
    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        telephone: '5555555555',
        password: 'bones'
      })

      entry1 = await Entry.create({
        body: "Two people suggested that I send a Slack to the person but I felt like I got what I deserved for being late.",
        userId: cody.id
      })

      entry2 = await Entry.create({
        body: "I got kind of frustrated this afternoon because my linter stopped working and I couldn't get a hook on my user model for the diary to work. It turns out that I misunderstood the hook syntax. The same thing happened in the Pillars checkpoint. I don't know if it's me or if the docs are unclear.",
        userId: cody.id
      })
    })

    describe('getUserEntriesByDay', () => {
      it('returns all the entries written by a user on a particular day', async () => {
        const entries = await Entry.getUserEntriesByDay(cody.id, new Date())
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
        expect(entries).to.be.an('array')
        expect(entries.length).to.equal(2)
        expect(retrievedEntry1.body).to.equal(entry1.body)
        expect(retrievedEntry2.body).to.equal(entry2.body)
      })

    })
  }) // closes describe ('class methods')
}) // closes describe ('Entry model')
