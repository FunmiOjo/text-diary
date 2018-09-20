const router = require('express').Router()
const { MessagingResponse } = require('twilio').twiml
const { User, Entry } = require('../db/models')
const US_COUNTRY_CODE = "+1"

router.post('/', (req, res) => {
  const { Body: body, From: telephone } = req.body
  //const user =
  const twiml = new MessagingResponse()
  twiml.message('Message received')
  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(twiml.toString())
})

module.exports = router
