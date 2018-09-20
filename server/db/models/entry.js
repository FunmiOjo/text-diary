const Sequelize, { Op } = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  body: {
    type:  Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Entry
