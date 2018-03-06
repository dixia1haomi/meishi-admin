import { Api } from '../../utils/Api.js'
const api = new Api()

Page({

  data: {

  },

  onLoad: function (op) {
    this._load()
  },

  _load() {
    // 获取卡劵列表
    api.selectKajuan({}, back => {
      console.log('kajuan', back)
      this.setData({ kajuanRes: back })
    })
  },

  // 新增卡劵
  go_createKajuan() {
    wx.navigateTo({ url: '/pages/kajuan/create' })
  },


  // 查看卡劵详情
  _go_kajuan_detail(e) {
    // let card_id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/kajuan/detail?id=' + e.currentTarget.id })
  },
})