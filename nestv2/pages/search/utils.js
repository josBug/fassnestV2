
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const endFormatTime = (date, x) => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours() + x
  var minute = date.getMinutes()
  var second = date.getSeconds()

  if (hour >= 24) {
    hour -= 24;
    day += 1;
  }
  if (hour < 0) {
    hour += 24;
    day -= 1;
  }

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

module.exports = {
  formatTime: formatTime,
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  endFormatTime: endFormatTime
}