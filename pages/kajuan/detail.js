import { Api } from '../../utils/Api.js'
const api = new Api()

Page({

  data: {

  },

  onLoad: function (op) {
    this._load(op.id)
  },

  _load(card_id) {
    // 根据卡劵表ID取数据，再根据餐厅ID取文章数据
    api.findKajuan({ card_id: card_id }, res => {
      console.log('根据卡劵表ID取数据', res)
      // 卡劵数据
      this.setData({ kajuanRes: res, loading: false })
    })
  },


  // 去更新卡劵页
  go_updateKajuan() {
    let id = this.data.kajuanRes.id
    wx.navigateTo({ url: '/pages/kajuan/update?id=' + id })
  },

})