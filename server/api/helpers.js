//cmd entry day 9-20-2018

//constants
const DAY = 'day'
const ENTRY = 'entry'
const DATE = 'DATE'
const GET_USER_ENTRIES_BY_DAY = 'GET_USER_ENTRIES_BY_DAY'

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
      return {
        funcName: GET_USER_ENTRIES_BY_DAY,
        args: [userId, providedDate]
      }
    default:
      return new Error('Incorrect date type')
  }
}

const getSearchType = term => {
  const dateTerms = ['day', 'month', 'week', 'year']
  if (dateTerms.indexOf(term) !== -1) {
    return DATE
  }
}

const executeEntrySearchCommand = (userId, params) => {
  if (!params.length) {
    return new Error('No arguments provided')
  }

  const searchType = getSearchType(params[0])
  switch (searchType) {
    case (DATE):
      return executeDateSearch(userId, params)
    default:
      return new Error('Incorrectly formed date argument')
  }
}

const executeCommand = (userId, message) => {
  const command = message.slice(0, 3)
  const params = message.slice(4).split(' ')
  const firstParam = params[0]
  switch (firstParam) {
    case ENTRY:
      return executeEntrySearchCommand(userId, params.slice(1))
    default:
      return new Error('Provided command is not an available command')
  }
}

const concatenateEntryBodies = entries => {
  return entries.map(entry => entry.body).join('\n\n')
}

const getCommandMessageParts = message => {
  const terms = message.split(' ')
  const commands = terms.slice(1, 3)
  const args = terms.slice(3)
  return {
    commands,
    args
  }
}


module.exports = {
  isCommand,
  executeDateSearch,
  executeEntrySearchCommand,
  executeCommand,
  concatenateEntryBodies,
  getCommandMessageParts
}
