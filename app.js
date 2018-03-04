
import { Api } from './utils/Api.js'
const api = new Api()



App({

  // appData: {
  //   // 地理位置是否授权标识位
  //   userLocation: false,
  //   longitude: null,   // 用户经度
  //   latitude: null,    // 用户纬度
  // },

  onLaunch: function () {
    this.base_checkToken()
  },

  globalData: {
    userInfo: null
  },


  // ---------------------------------------------------Token-----------------------------------------------------
  // 小程序初始化检查token
  base_checkToken() {
    let token_key = wx.getStorageSync('token_key')
    //用户可能第一次来，缓存中没有token
    if (!token_key) {
      console.log('我要去获取token')
      this.getToken()   // 获取token
      // *登陆
    } else {
      // 去服务器检查token
      console.log('我要去检查token')
      this.checkToken(token_key)
    }
  },

  // 去服务器获取token
  getToken() {
    wx.showLoading({ title: '登陆中..', mask: true })
    // 账号,密码
    api.login({ ac: 'qwe', se: 'asd' }, back => {
      console.log('获取token成功并缓存', back)
      wx.setStorageSync('token_key', back)
      wx.hideLoading()
      wx.showToast({ title: '登陆成功' })
    })
  },

  // 去服务器检查token,如果失效,调用获取token
  checkToken(token_key) {
    api.checkToken({ token: token_key }, back => {
      console.log('我要去检查token', back)
      if (back) {
        wx.showToast({ title: 'token还有效' })
      } else {
        console.log('服务器token已失效,重新登陆')
        this.getToken()
      }
    })
  }


})