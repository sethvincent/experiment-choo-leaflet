module.exports = {
  namespace: 'map',
  state: {
    setView: true,
    center: [0, 0],
    zoom: 2
  },
  reducers: {
    panAndZoom: function (data, state) {
      return { zoom: data.zoom, center: data.center }
    }
  }
}
