const isCommand = message => {
  return message.slice(0, 3).toLowerCase() === 'cmd'
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
  concatenateEntryBodies,
  getCommandMessageParts
}
