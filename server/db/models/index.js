const User = require('./user')
const Entry = require('./entry')

Entry.belongsTo(User)
User.hasMany(Entry)

module.exports = {
  User,
  Entry
}
