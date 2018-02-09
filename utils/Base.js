import { Config } from './Config.js'
import { Token } from './Token.js'

const token = new Token()


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
        if (res.statusCode == 200) {
          // 成功
          params.sCallback && params.sCallback(res.data)
        } else {

          console.log('Base基类请求失败，statusCode不等于200', res)

          // Token错误 $Code = 10004（获取token重试1次）
          if (res.data.code == 10004 && !noRefetch) {
            that._refetch(params)
          }

          // 数据库错误 $Code = 10002
          if (res.data.code == 10002) {
            // wx.navigateTo({ url: '/pages/exception/exception?code=' + 10002 })
            params.sCallback && params.sCallback(res.data)  // 直接返回再处理
          }

          // 微信方面错误 $Code = 10003
          if (res.data.code == 10003) {
            wx.navigateTo({ url: '/pages/exception/exception?code=' + 10003 })
          }

          // 服务器未知错误 999
          if (res.data.code == 999) {
            wx.navigateTo({ url: '/pages/exception/exception?code=' + 999 })
          }

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
    let token = new Token();
    token.getToken((back) => {
      this.request(params, true);
    });
  }


}

export { Base }