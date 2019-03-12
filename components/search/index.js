// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    q: '',
    historyWords: [],
    hotWords: []
  },
  attached() {
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.data.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', function() {

      })
    },
    onDelete(event){
      this.setData({
        q: ''
      })
    },
    onConfirm(event) {
      const words = event.detail.value
      keywordModel.addToHistory(words)
    }
  }
})
