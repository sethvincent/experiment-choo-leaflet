var html = require('choo/html')

module.exports = function nav (state, prev, send) {
  function onclick (e) {
    send('map:panAndZoom', { center: [47.606, -122.332], zoom: 14 })
  }
  return html`<button onclick=${onclick}>go to seattle!</button>`
}
