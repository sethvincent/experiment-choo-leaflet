var leaflet = require('leaflet')
var html = require('choo/html')
var choo = require('choo')
var app = choo()

function onload (node) {
  map.invalidateSize()
}

var el = html`<div onload=${onload} id="map"></div>`  
var map = createMap(el, {
  setView: true,
  center: [47.606,-122.332],
  zoom: 11,
  created: false
})

function mapView (state, prev, send) {
  return html`<div class="map-wrapper">${el}</div>`
}

function createMap (el, options) {
  var map = L.map(el, options.tiles, options)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw',
    id: 'mapbox.streets'
  }).addTo(map)
  return map
}

app.model({
  namespace: 'map',
  state: {
    setView: true,
    center: [47.606,-122.332],
    zoom: 11,
    created: false
  },
  reducers: {
    created: function (data, state) {
      return { created: true }
    }
  }
})

app.router(function (route) {
  return [
    route('/', mapView)
  ]
})

var tree = app.start()
document.body.appendChild(tree)
