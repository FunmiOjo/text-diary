//cmd entry day 9-20-2018
const { Entry } = require('../db/models')

//constants
const DAY = 'day'
const ENTRY = 'entry'

const isCommand = message => {
  return message.slice(0, 3).toLowerCase() === 'cmd'
}

const executeDateSearch = (userId, params) => {
  if (params.length < 1) {
    return new Error('No date type or date argument provided')
  }

  if (params.length < 2) {
    return new Error('No date argument provided')
  }

  const dateType = params[0].toLowerCase()
  const providedDate = new Date(params[1])

  if (providedDate === 'Invalid Date') {
    return new Error('Invalid date')
  }

  switch (dateType) {
    case DAY:
      return Entry.getUserEntriesByDay(userId, providedDate)
    default:
      return new Error('Incorrect date type')
  }
}

const executeEntrySearchCommand = (userId, params) => {
  if (!params.length) {
    return new Error('No arguments provided')
  }

  const searchType = params[0]

  switch (searchType) {
    case searchType instanceof Date:
      return executeDateSearch(params.slice(1), userId)
    default:
  }
}

const executeCommand = (userId, message) => {
  const command = message.slice(0, 3)
  const params = message.slice(3).split(' ')

  switch (command) {
    case ENTRY:
      return executeEntrySearchCommand(params.slice(1), userId)
    default:
      return new Error('Provided command is not an available command')
  }
}

module.exports = {
  isCommand,
  executeDateSearch,
  executeEntrySearchCommand,
  executeCommand
}
