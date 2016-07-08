var html = require('choo/html')

var nav = require('./nav')
var createMapView = require('./map')
var initialMapState = require('../models/map').state
var map = createMapView({
  initialState: initialMapState
})

module.exports = function layout (state, prev, send) {
  return html`
    <div class="app">
      ${nav(state, prev, send)}
      ${map(state, prev, send)}
    </div>
  `
}
