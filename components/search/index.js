// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    q: '',
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    loading: false,
    loadingCenter:false
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
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.data.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
        // 死锁
      }
      
    },
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', function() {

      })
    },
    onDelete(event) {
      this.initialize()
      this.setData({
        q: '',
        searching: false
      })
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize() 
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.data.books)
          this.setTotal(res.data.total)
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})