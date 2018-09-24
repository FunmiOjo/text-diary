const router = require('express').Router()
const {MessagingResponse} = require('twilio').twiml
const {User, Entry} = require('../db/models')
const {
  isCommand,
  getCommandMessageParts
} = require('./helpers')

const { getRequestedAction } = require('./commands')

router.post('/', async (req, res) => {
  try {
    const {Body: body, From: telephone} = req.body
    const user = await User.findByTelephone(telephone)

    if (isCommand(body)) {
      const { commands, args } = getCommandMessageParts(body)
      console.log('commands: ', commands, 'args: ', args)
      const action = getRequestedAction(commands)
      const message = await action(user.id, args)

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
  try {
    const body = 'cmd mood dates 9-20-2018 9-23-2018'
    const { commands, args } = getCommandMessageParts(body)
    console.log('commmands: ', commands, 'args: ', args)
    const action = getRequestedAction(commands)
    const mood = await action(1, args)
    console.log('mood', mood)
    res.send(mood)
  } catch (error) {
    res.send(error)
  }
})
module.exports = router
