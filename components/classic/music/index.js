// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached:function() {
    this._revoreStatus()
    this._monitorSwitch()
  },

  detached: function() {
    // backgroundAudioManager.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        backgroundAudioManager.src = this.properties.src
        backgroundAudioManager.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        backgroundAudioManager.pause()
      }
      
    },
    _revoreStatus: function() {
      if (backgroundAudioManager.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (backgroundAudioManager.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      backgroundAudioManager.onPlay(() => {
        this._revoreStatus()
      })
      backgroundAudioManager.onPause(() => {
        this._revoreStatus()
      })
      backgroundAudioManager.onStop(() => {
        this._revoreStatus()
      })
      backgroundAudioManager.onEnded(() => {
        this._revoreStatus()
      })
    }
  }
})
