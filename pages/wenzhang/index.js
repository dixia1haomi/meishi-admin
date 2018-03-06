import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {

    msg: '',          // 新增还是更新
    canting_id: '',   // 餐厅ID
    html: '',         // 文章html
    wenzhang_id: ''   // 文章ID
  },

  onLoad: function (op) {
    console.log('op', op)

    // 接受餐厅ID,没有就是新增，有就是更新
    this.setData({ canting_id: op.canting_id })

    if (op.msg == 'create') {
      console.log('新增')
      this.setData({ msg: 'create' })
    } else {
      console.log('更新')
      this.setData({ msg: 'update' }, () => {
        // 请求文章数据
        this._getWenzhangDetail(op.canting_id)
      })
    }
  },

  // 新增文章
  _createWenzhang() {

  },

  // 更新文章
  _updateWenzhang(canting_id) {

  },

  // 请求文章数据
  _getWenzhangDetail(canting_id) {
    api.detailCanting({ id: canting_id }, res => {
      console.log('请求文章数据', res)
      // 设置文章html和文章ID
      this.setData({ html: res.wenzhang.html, wenzhang_id: res.wenzhang.id })
    })
  },


  // 新增提交
  createSubmit(e) {
    console.log('新增提交', e.detail.value)
    let data = e.detail.value
    let canting_id = this.data.canting_id
    data.canting_id = canting_id

    // 请求新增文章
    api.createWenzhang(data, back => {
      console.log('新增文章', back)
      // 新增成功，提示跳转
      wx.showModal({
        title: '新增成功',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({ url: '/pages/canting/detail?id=' + canting_id })
          }
        }
      })
    })
  },


  // 更新提交
  updateSubmit(e) {
    console.log('更新提交', e)
    let data = e.detail.value
    data.canting_id = this.data.canting_id
    data.id = this.data.wenzhang_id

    // 请求更新文章
    api.updateWenzhang(data, back => {
      console.log('更新文章', back)
      // 更新成功，提示跳转
      wx.showModal({
        title: '更新成功',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({ url: '/pages/canting/detail?id=' + this.data.canting_id })
          }
        }
      })
    })
  },



  // 删除文章
  deleteWenzhang(e) {
    let wenzhang_id = e.currentTarget.id
    let canting_id = this.data.canting_id

    // 提示是否删除
    wx.showModal({
      title: '确定要删除文章?',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          api.deleteWenzhang({ id: wenzhang_id, canting_id: canting_id }, back => {
            wx.showModal({
              title: '删除成功',
              success: (res) => {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({ url: '/pages/canting/detail?id=' + canting_id })
                }
              }
            })
          })
        }
      }
    })
  },

})