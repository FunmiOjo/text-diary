const addUSCode = (number) => {
  return "+1".concat(number)
}

const getMinMaxDateforOneDay = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const min = new Date(year, month, day)
  const max = new Date(year, month, day + 1)
  return { min, max }
}

module.exports = {
  addUSCode,
  getMinMaxDateforOneDay
}
