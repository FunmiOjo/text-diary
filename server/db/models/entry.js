const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const db = require('../db')
const { getMinMaxDateforOneDay } = require('./helpers')

const Entry = db.define('entry', {
  body: {
    type:  Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  }
})

Entry.getUserEntriesByDay = function(userId, date) {
  const { min, max } = getMinMaxDateforOneDay(date)
  return this.findAll({
    where: {
      userId: userId,
      createdAt: {
        [Op.gte]: min,
        [Op.lte]: max
      }
    }
  })
}

module.exports = Entry
