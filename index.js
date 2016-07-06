var leaflet = require('leaflet')
var html = require('choo/html')
var choo = require('choo')
var app = choo()

var initialMapState = {
  setView: true,
  center: [0, 0],
  zoom: 2,
}

function onload (node) {
  map.invalidateSize()
}

var el = html`<div onload=${onload} id="map"></div>`  
var map = createMap(el, initialMapState)

function nav (state, prev, send) {
  function onclick (e) {
    send('map:panAndZoom', { center: [47.606,-122.332], zoom: 14 })
  }
  return html`<button onclick=${onclick}>go to seattle!</button>`
}

function mapView (state, prev, send) {
  map.setZoom(state.map.zoom)
  map.panTo(state.map.center)
  return html`<div class="map-wrapper">${el}</div>`
}

function layout (state, prev, send) {
  return html`
    <div class="app">
      ${nav(state, prev, send)}
      ${mapView(state, prev, send)}
    </div>
  `
}

function createMap (id, options) {
  var map = L.map(id, options)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
  }).addTo(map)

  return map
}

app.model({
  namespace: 'map',
  state: initialMapState,
  reducers: {
    panAndZoom: function (data, state) {
      return { zoom: data.zoom, center: data.center }
    }
  }
})

app.router(function (route) {
  return [
    route('/', layout)
  ]
})

var tree = app.start()
document.body.appendChild(tree)
