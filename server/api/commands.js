const { Entry } = require('../db/models')
const { getMood } = require('../mood')

const { concatenateEntryBodies } = require('./helpers')

const getUserEntriesByDay = async (userId, args) => { //args is array
  try {
    const dates = args.map(arg => new Date(arg))

    const entries = await Entry.getUserEntriesByDay(userId, ...dates)
    return concatenateEntryBodies(entries)
  } catch (error) {
    return error
  }
}

const getUserEntriesBetweenDates = async (userId, args) => {
  try {
    const dates = args.map(arg => new Date(arg))
    const entries = await Entry.getUserEntriesBetweenDates(userId, ...dates)
    return concatenateEntryBodies(entries)
  } catch (error) {
    return error
  }
}

const getMoodNamesInCorrectForm = tone => {
  if (tone.tone_id === 'sadness') {
    tone.tone_id = 'sad'
  }

  if (tone.tone_id === 'anger') {
    tone.tone_id = 'angry'
  }

  return tone.tone_id
}

const getMoodByDay = async (userId, args) => {
  try {
    const text = await getUserEntriesByDay(userId, args)
    const toneAnalysis = await getMood(text)
    const { tones } = toneAnalysis.document_tone
    tones.sort((a, b) => b.score - a.score)
    let knownEmotions = tones.filter(tone => tone.score >= 0.7)

    if (knownEmotions.length) {
      return knownEmotions.map(getMoodNamesInCorrectForm).join(', ')
    } else {
      return 'Not sure but possibly ' + tones.map(getMoodNamesInCorrectForm).join(', ')
    }
  } catch (error) {
    return error
  }
}

const getMoodBetweenDates = async (userId, args) => {
  try {
    const text = await getUserEntriesBetweenDates(userId, args)
    const toneAnalysis = await getMood(text)
    const { tones } = toneAnalysis.document_tone
    tones.sort((a, b) => b.score - a.score)
    let knownEmotions = tones.filter(tone => tone.score >= 0.7)

    if (knownEmotions.length) {
      return knownEmotions.map(getMoodNamesInCorrectForm).join(', ')
    } else {
      return 'Not sure but possibly ' + tones.map(getMoodNamesInCorrectForm)[0]
    }
  } catch (error) {
    return error
  }
}

const commands = {
  entry: {
    day: getUserEntriesByDay,
    dates: getUserEntriesBetweenDates
  },
  mood: {
    day: getMoodByDay,
    dates: getMoodBetweenDates
  }
}

const getRequestedAction = args => {
  let node = commands
  for (let i = 0; i < 3 - 1; i++) {
    if (node[args[i]]) {
      node = node[args[i]]
    } else {
      return new Error('Incorrectly formed command')
    }
  }
  return node
}

module.exports = {
  commands,
  getRequestedAction
}
