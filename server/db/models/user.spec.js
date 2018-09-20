/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody
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

    describe.only('findByTelephone', () => {
      it('returns the user that has the given telephone', async () => {
        const user = await User.findByTelephone('5555555555')
        expect(user.firstName).to.equal(cody.firstName)
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
