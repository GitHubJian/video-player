var Utils = require('./utils.js')

var support = {
  agent: (function() {
    var userAgent = window.navigator.userAgent

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  })()
}

function Slider(options) {
  if (!options) {
    throw new Error('Slider: Not Found initialization parameter')
  }

  this.options = options
  this.min = options.min || 0
  this.max = options.max || 100
  this.value = -1
  this.label = options.label || ''
  this.upLayer = options.upLayer
  this.parent = options.parent
  this.uiValue = 0
  this.liveDragging = void 0 !== options.liveDragging && options.liveDragging

  this.init()
}

Slider.prototype.init = function() {
  var that = this

  this.container = document.createElement('div')
  this.container.className = 'ui-slider-container'
  this.labelLayer = document.createElement('div')
  this.labelLayer.className = 'ui-slider-label'
  this.thumb = document.createElement('div')
  this.thumb.className = 'ui-slider-thumb'
  this.tracker = document.createElement('div')
  this.tracker.className = 'ui-slider-tracker'
  this.eventLayer = document.createElement('div')
  this.eventLayer.className = 'ui-slider-event-layer'
  this.upLayer = this.upLayer || this.eventLayer
  this.container.appendChild(this.tracker)
  this.container.appendChild(this.labelLayer)
  this.container.appendChild(this.thumb)
  this.container.appendChild(this.eventLayer)

  Utils.addEvent(this.eventLayer, 'mousedown', function(e) {
    that.onmousedown()
    that.onmousedown(e.pageX, e.pageY)
  })
}
