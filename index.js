var choo = require('choo')
var logger = require('choo-log')()

var app = choo({
  onAction: logger.onAction(),
  onError: function (err, state, createSend) {
    if (err) logger.onError()
  },
  onStateChange: logger.onStateChange()
})

var layout = require('./views/layout')
app.model(require('./models/map'))

app.router(function (route) {
  return [
    route('/', layout)
  ]
})

var tree = app.start()
document.body.appendChild(tree)
