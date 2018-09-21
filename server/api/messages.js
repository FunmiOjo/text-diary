const router = require('express').Router()
const { MessagingResponse } = require('twilio').twiml
const { User, Entry } = require('../db/models')
const { isCommand } = require('./helpers')

router.post('/', async (req, res) => {
  try {
    const { Body: body, From: telephone } = req.body
    const user = await User.findByTelephone(telephone)

    if (isCommand) {

    }

    const newEntry = await Entry.create({
      body,
      userId: user.id
    })

    const twiml = new MessagingResponse()
    twiml.message('Message received')
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  } catch (error) {
    console.error(error)
    const twiml = new MessagingResponse()
    twiml.message('There was an error processing your message. Please try again.')
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  }
})

module.exports = router
