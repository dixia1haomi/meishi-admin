import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {
    detailRes: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let id = op.id
    api.detailCanting({ id: id }, res => { this.setData({ detailRes: res }) })
  },

  // 更新餐厅
  updatecanting(e) {
    let id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/canting/c_u?id=' + id })
  },

  // 删除餐厅
  // 检查餐厅下关联的菜品，环境，文章是否都删除了 -> （判断长度实现）
  // 检查餐厅的头图是否删除了
  deletecanting(e) {
    let id = e.currentTarget.id
    let img = this.data.detailRes.img
    let caipin = this.data.detailRes.caipin
    let huanjing = this.data.detailRes.huanjing
    let wenzhang = this.data.detailRes.wenzhang
    console.log('cai', caipin.length, 'huanjing', huanjing.length, 'wenzhang', wenzhang.length)
    if (caipin.length !== 0 || huanjing.length !== 0 || wenzhang.length !== 0) {
      // 还有关联数据，提示
      wx.showModal({ title: '请先删除餐厅关联的菜品，环境，文章' })
    } else {
      // 没有关联数据了，再检查头图是否删除了(*IMG字段是否为空*)
      if (img.length !== 0) {
        wx.showModal({ title: '请先删除餐厅头图' })
      } else {
        api.deleteCanting({ id: id }, res => {
          console.log('删除餐厅结果', res)
          wx.showModal({ title: '餐厅已删除' })
        })
      }
    }
  },

})