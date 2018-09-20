const router = require('express').Router()
const { MessagingResponse } = require('twilio').twiml

router.post('/', (req, res) => {
  console.log('req.body', req.body)
  const { incomingMessageBody: Body, phoneNumber: from } = req.body
  const twiml = new MessagingResponse()
  twiml.message('Message received')
  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})

module.exports = router
