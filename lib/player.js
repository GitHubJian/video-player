var Utils = require('./utils.js')

var defaults = {}

function Player(elem, options) {
  this.elem = elem
  this.options = Utils.extend({}, defaults, options)

  this.screen_state = Player.UI_NORMAL
  this.video_state = Player.V_IDEL
  this.control_bar_visible = true
  this.control_bar_timer = null
  this.control_bar_timer_delay = 3e3
  this.timer = null
  this.sliderCtrl = null
  this.volumeCtrl = null
  this.volume = 1
  this.currentTime = 0
  this.duration = 0
  this.hidePlayIcon = !1

  this.init_ui(this.options)
}

Player.UI_NORMAL = 0
Player.UI_WIDE = 1
Player.UI_FULL = 2
Player.V_IDEL = 0
Player.V_READY = 1
Player.V_BUFF = 2
Player.V_PLAY = 3
Player.V_PAUSE = 4
Player.V_COMPLETE = 5
Player.V_CANPLAY = 6
Player.V_PLAYING = 7
Player.E_VIDEO_READY = 'ready'
Player.E_VIDEO_PLAY = 'video_media_play'
Player.E_VIDEO_PAUSE = 'video_media_pause'
Player.E_VIDEO_LOADSTART = 'video_media_loadstart'
Player.E_VIDEO_CANPLAY = 'video_media_canplay'
Player.E_VIDEO_WAITING = 'video_media_waiting'
Player.E_VIDEO_ENDED = 'video_media_ended'
Player.E_VIDEO_ERROR = 'video_media_error'
Player.E_VIDEO_LOADED = 'video_media_loaded'
Player.E_VIDEO_SEEK = 'video_media_seek'
Player.E_VIDEO_TIME = 'video_media_time'

Player.isFullscreen = function() {
  return (
    null !=
    (document.webkitFullscreenElement ||
      document.fullScreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement)
  )
}

Player.requestFullscreen = function(el) {
  ;(
    el.webkitRequestFullScreen ||
    el.requestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen ||
    function() {}
  ).apply(el)
}

Player.exitFullscreen = function() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else {
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else {
      if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }
}

Player.prototype.init_ui = function init_ui(options) {
  var that = this
  options = options || {}

  this.$btnWidescreen =
    options.$btnWidescreen || this.elem.querySelector('.btn-widescreen')
  this.$btnWidescreen &&
    (this.$btnWidescreen.onclick = function() {
      if (that.screen_state != Player.UI_WIDE) {
        that.to_wide_screen()
      } else {
        that.to_normal_screen()
      }
    })

  this.$btnFullscreen =
    options.$btnFullscreen || this.elem.querySelector('.btn-fullscreen')
  this.$btnFullscreen &&
    (this.$btnFullscreen.onclick = function() {
      if (that.screen_state !== Player.UI_FULL) {
        that.to_full_screen()
      } else {
        that.to_normal_screen()
      }
    })

  function fullscreenChangeListener() {
    that.on_fullscreen_change()
  }

  // full screen
  document.addEventListener(
    'webkitfullscreenchange',
    fullscreenChangeListener,
    !1
  )
  document.addEventListener('mozfullscreenchange', fullscreenChangeListener, !1)
  document.addEventListener('MSFullscreenChange', fullscreenChangeListener, !1)
  document.addEventListener('fullscreenchange', fullscreenChangeListener, !1)

  this.$display = options.$display || this.elem.querySelector('.display')
  if (this.$display) {
    this.$display.onmousemove = function(e) {
      that.on_display_mousemove(e)
    }

    this.$display.onclick = function(e) {
      that.on_display_click(e)
    }
  }
}
