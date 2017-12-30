import { Api } from '../../utils/Api.js'

const api = new Api()

Page({
  data: {
    cantinglistRes: {},
  },

  onLoad: function () {

    // canting.listCanting({}, res => {
    //   console.log('餐厅列表', res.data)
    //   this.setData({ cantinglistRes: res.data })
    // })
    api.listCanting({}, res => { this.setData({ cantinglistRes: res }) })

  },


  // 跳转查看餐厅
  detailcanting(e) {
    let id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/canting/detail?id=' + id })
  },

  // 跳转新增餐厅
  createcanting() { wx.navigateTo({ url: '/pages/canting/c_u' }) },


})
