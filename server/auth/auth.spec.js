/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe.only('auth routes', () => {
  beforeEach(() => {

  })

  describe('/auth/signup', () => {
    const firstName = 'Funmi'
    const phoneNumber = '9312527180'
    const password = 'Anouk'

    beforeEach(() => {

    })

    // it('POST /auth/signup', async () => {
    //   const res = await request(app)
    //     .post('/auth/signup')
    //     .send({ firstName, phoneNumber, password })
    //     .expect(200)

    //   expect(res.body).to.be.an('object')
    //   expect(res.body.firstName).to.be.equal(firstName)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
