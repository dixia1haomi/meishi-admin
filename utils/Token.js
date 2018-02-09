import { Config } from './Config.js'

class Token {
  constructor() { }

  // 获取token
  getToken(callback) {

    wx.request({
      url: Config.url + 'token/app',
      method: 'POST',
      data: {
        // 账号
        ac: Config.ac,
        // 密码
        se: Config.se
      },
      success(res) {
        if (res.statusCode === 200) {
          // wx.setStorageSync('token_key', res.data.token)
          callback && callback(res)
        } else {
          console.log('请求Code不等于200,Token类.gettoken', res)
          // 提示
          wx.showToast({ title: '登陆失败' })
        }
      },
      fail: (err) => {
        console.log('Token类.gettoken进入fail', err)
        // 提示
        wx.showToast({ title: '登陆失败' })
      }
    })

  }

  // 检查token是否有效
  checkToken(token_key, callback) {
    wx.request({
      url: Config.url + 'token/verify',
      method: 'POST',
      data: { token: token_key },
      success(res) {
        if (res.statusCode === 200) { callback && callback(res) } else {
          console.log('请求Code不等于200,Token类.checkToken', res)
          // 提示
          wx.showToast({ title: '登陆失败' })
        }
      },
      fail: (err) => {
        console.log('Token类.检查token是否有效进入fail', err)
        // 提示
        wx.showToast({ title: '登陆失败' })
      }
    })
  }
}

export { Token }