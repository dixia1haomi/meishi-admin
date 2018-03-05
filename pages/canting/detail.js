import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'

const base = new Base()
const api = new Api()


// HTML解析
var WxParse = require('../../wxParse/wxParse.js');
// 留言分页
let page = 1

Page({

  data: {
    Res: {},

    // 高德map数据
    map: {
      polyline: [],   // 路径规划数组（map页，map组件使用）
      distance: ''    // 距离
    },
    loading: true,    // 加载
  },

  // 请求detail数据
  onLoad: function (op) {
    // console.log(getCurrentPages())
    this._load(op.id)
  },


  // ---------------------------------------- _load --------------------------------------------

  // 请求detail数据（接受餐厅ID,留言服务器限制limit-5条）
  _load(id) {

    api.detailCanting({ id: id }, res => {
      console.log('detail数据', res)
      // 设置数据
      this.setData({ Res: res, loading: false }, () => {
        // 设置导航条
        wx.setNavigationBarTitle({ title: res.name })
        // 解析HTML
        res.wenzhang && WxParse.wxParse('wenzhang', 'html', res.wenzhang.html, this, 0);
        // 取所有留言
        // this._liuyan(res.liuyan_count_count)
      })
    })
  },


  // ------ 加载更多留言 --------
  _zaijiagengduo() {
    api.listLiuyan({ canting_id: this.data.Res.id, page: page }, res => {
      console.log('加载更多留言-' + page, res)
      // 只保留时间的年/月/日
      // for (let i in res) { res[i].create_time = res[i].create_time.slice(0, 10) }
      // 设置数据,如果是第一页就覆盖原来的limit5条,否则往后面添加
      page == 1 ? this.setData({ 'Res.liuyan': res }) : this.setData({ 'Res.liuyan': this.data.Res.liuyan.concat(res) })
      // page自增
      page++
    })
  },



  // -------------------------------------------------- Admin专有 ------------------------------------------------------------------ 

  // 去编辑页
  go_bianji(e) {
    let canting_id = e.currentTarget.id
    wx.navigateTo({ url: '/pages/canting/bianji?canting_id=' + canting_id })
  },

  // 去文章页
  go_wenzhang(e) {
    console.log('go_wenzhang',e)
    let canting_id = e.currentTarget.id
    let msg = e.currentTarget.dataset.msg
    wx.navigateTo({ url: '/pages/wenzhang/index?canting_id=' + canting_id + '&msg=' + msg })
  },
})