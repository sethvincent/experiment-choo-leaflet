var L = require('leaflet')
var html = require('choo/html')

module.exports = function createMapView (options) {
  function onload (node) {
    map.invalidateSize()
  }

  var el = html`<div onload=${onload} id="map"></div>`
  var map = createMap(el, options.initialState)

  return function mapView (state, prev, send) {
    map.setZoom(state.map.zoom)
    map.panTo(state.map.center)
    return html`<div class="map-wrapper">${el}</div>`
  }
}

function createMap (id, options) {
  var map = L.map(id, options)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
  }).addTo(map)

  return map
}
