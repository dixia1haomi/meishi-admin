import { Config } from './Config.js'
// import { Api } from './Api.js'

// const api = new Api()
const app = getApp()

class Base {
  constructor() {
  }

  // 请求基类
  request(params, noRefetch) {
    let that = this
    wx.request({
      url: Config.url + params.url,
      method: 'POST',
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token_key': wx.getStorageSync('token_key')
      },
      success(res) {
        console.log('base', res)
        if (res.statusCode == 200) {
          // 成功
          if (res.data.errorCode == 0) {
            params.sCallback && params.sCallback(res.data)
          }
          // Token类错误，40000
          else if (res.data.errorCode == 40000 && !noRefetch) {
            that._refetch(params)
          }
          // errorCode不等于0，* 错误页并记录日志
          else {
            wx.navigateTo({ url: '/pages/exception/exception?code=' + 'errorCode不等于0' })
          }
        } else {
          console.log('Base基类请求失败，statusCode不等于200', res)
          // statusCode不等于200,可能是请求成功，但是出现了错误
          wx.navigateTo({ url: '/pages/exception/exception?code=' + 'statusCode不等于200' })
        }

      },
      fail(err) {
        // 提示-请检查网络状态-重试(*)
        console.log('Base基类请求失败,进入fail')
        wx.navigateTo({ url: '/pages/exception/exception?code=' + 'fail' })
      }
    })
  }

  // 请求接口失败重试
  _refetch(params) {
    app.getToken((back) => {
      this.request(params, true);
    });
  }


}

export { Base }