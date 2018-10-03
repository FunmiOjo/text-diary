/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  let cody
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('hooks', () => {
    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        telephone: '5555555555',
        password: 'bones'
      })
    })

    describe('beforeValidate', () => {
      it('adds US code to beginning of telephone number', () => {
        expect(cody.telephone).to.equal("+15555555555")
      })
    })
  })

  describe('instanceMethods', () => {
    beforeEach(async () => {
      cody = await User.create({
        firstName: 'Cody',
        telephone: '5555555555',
        password: 'bones'
      })
    })

    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('findByTelephone', () => {
      it('returns the user that has the given telephone', async () => {
        const user = await User.findByTelephone('+15555555555')
        expect(user.firstName).to.equal(cody.firstName)
      })
    })

  }) // end describe('instanceMethods')
}) // end describe('User model')



//Two people suggested that I send a Slack to the person but I felt like I got what I deserved for being late.

//I got kind of frustrated this afternoon because my linter stopped working and I couldn't get a hook on my user model for the diary to work. It turns out that I misunderstood the hook syntax. The same thing happened in the Pillars checkpoint. I don't know if it's me or if the docs are unclear.
