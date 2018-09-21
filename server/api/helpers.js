const isCommand = message => {
  return message.slice(0, 3).toLowerCase() === 'cmd'
}

const getCommand = message => {
  return message.slice(0, 3)
}

const executeCommand = message => {
  const command = message.slice(0, 3)
  const params = message.slice(3).split(' ')

  switch(command) {
    case entry:

  }
}

const searchEntriesByDate = params => {

}

module.exports = {
  isCommand
}
