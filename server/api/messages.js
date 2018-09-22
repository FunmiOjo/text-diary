const router = require('express').Router()
const {MessagingResponse} = require('twilio').twiml
const {User, Entry} = require('../db/models')
const {
  isCommand,
  executeDateSearch,
  executeEntrySearchCommand,
  executeCommand,
  concatenateEntryBodies
} = require('./helpers')

router.post('/', async (req, res) => {
  try {
    const {Body: body, From: telephone} = req.body
    const user = await User.findByTelephone(telephone)

    if (isCommand(body)) {
      const response = executeCommand(user.id, body)
      const {funcName, args} = response
      console.log('response', response, 'funcName', funcName, 'args', args)
      const entries = await Entry.getUserEntriesByDay(...args)
      const message = concatenateEntryBodies(entries)

      const twiml = new MessagingResponse()
      twiml.message(message)
      res.writeHead(200, {'Content-Type': 'text/xml'})
      res.end(twiml.toString())
    } else {
      const newEntry = await Entry.create({
        body,
        userId: user.id
      })

      const twiml = new MessagingResponse()
      twiml.message('Message received')
      res.writeHead(200, {'Content-Type': 'text/xml'})
      res.end(twiml.toString())
    }
  } catch (error) {
    console.error(error)
    const twiml = new MessagingResponse()
    twiml.message(
      'There was an error processing your message. Please try again.'
    )
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  }
})

router.get('/', async (req, res) => {
  const date = new Date('9-20-2018')
  const result = executeCommand(1, 'cmd entry day 9-20-2018')
  const {funcName, args} = result
  console.log('result', result, 'funcName', funcName, 'args', args)
  const entries = await Entry.getUserEntriesByDay(...args)
  res.send(entries)
})
module.exports = router
