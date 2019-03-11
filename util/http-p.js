import {config} from '../config.js'
const tips = {
  1: '抱歉,出现一个错误',
  1005: 'appKey无效',
  3000: '期刊不存在'
}
class HTTP {
  request({url, data = {}, method = 'get'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve,reject, data={}, method = 'get') {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appKey': config.appKey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')){
          resolve(res)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tips = tips[error_code]
    wx.showToast({
      title: tips ? tips : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}