function success(data = null) {
  return {
    status: 'ok',
    data: data,
    msg: 'ok'
  }
}

function fail(msg = null,data = null) {
  return {
    status: 'error',
    data: data,
    msg: msg
  }
}

module.exports = {
  success, fail
}