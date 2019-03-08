// pages/page/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getlatest((res) => {
      // this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        // ...res
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  onLike: function(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function(event) {
    this._updateClassic('next')
  },
  onPrevious: function(event) {
    this._updateClassic('previous')
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // let promoise = new Promise((reserve, reject) => {
    //   wx.request({
    //     url: 'http://bl.7yue.pro/v1/classic/latest',
    //     header: {
    //       'conteht-type': 'application/json',
    //       'appkey': 'AbhC31IG7ruCDp57'
    //     },
    //     success: (res) => {
    //       reserve(res)
    //     }
    //   })
    // })
    // promoise.then((res) => {
    //   console.log(res)
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})