var choo = require('choo')
var app = choo()

var layout = require('./views/layout')
app.model(require('./models/map'))

app.router(function (route) {
  return [
    route('/', layout)
  ]
})

var tree = app.start()
document.body.appendChild(tree)
