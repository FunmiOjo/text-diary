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

Entry.getUserEntriesByDay = function (userId, date) {
  try {
    const { min, max } = getMinMaxDateforOneDay(date)
    const entries = this.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: min,
          [Op.lt]: max
        }
      }
    })
    return entries
  } catch (error) {
    return error
  }
}

Entry.getUserEntriesByDay = Entry.getUserEntriesByDay.bind(Entry)

module.exports = Entry
