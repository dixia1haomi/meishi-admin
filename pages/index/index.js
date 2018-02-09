import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
//获取应用实例
const app = getApp()

Page({
  data: {
    Res: [],
    quyuList: Config.quyu,
    caixiList: Config.caixi,
    changjingList: Config.changjing,
  },

  onLoad: function () {
    this._load()
  },

  _load() {
    api.listCanting({}, res => {
      console.log('listCanting', res)
      this.setData({ Res: res })
    })
  },

  // GO餐厅详情
  go_Detail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/canting/detail?id=' + id })
  },

})
