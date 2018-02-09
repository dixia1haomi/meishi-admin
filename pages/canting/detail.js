import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'
import { Base } from '../../utils/Base.js'

const base = new Base()
const api = new Api()
const app = getApp()

// HTML解析 (* 点击tar再解析还是全部解析?)
var WxParse = require('../../wxParse/wxParse.js');

// 留言分页变量
let page = 1

Page({


  data: {
    Res: {},
    liuyan_Res: [],
    // Config
    quyuList: Config.quyu,
    caixiList: Config.caixi,
    changjingList: Config.changjing,
    // 是否显示‘加载更多留言’
    gengduo: false,
  },

  onLoad: function (op) {
    this._load(op.id)
  },

  onShow: function () {
    // 更新后返回就会执行
    let id = this.data.Res.id
    id && this._load(id)
  },

  // ---------------------------------------- _load --------------------------------------------
  // 请求detail数据（接受餐厅ID）
  _load(id) {
    // console.log('detail-data', this.data.userLocation, 'appData', app.appData.userLocation)

    api.detailCanting({ id: id }, res => {
      console.log('detail数据', res)
      // 只保留时间的年/月/日
      // for (let i in res.liuyan) { res.liuyan[i].create_time = res.liuyan[i].create_time.slice(0, 10) }
      // 设置数据
      this.setData({ Res: res, ResState: true, loading: false }, () => {
        // 设置导航条
        wx.setNavigationBarTitle({ title: res.name })
        // 解析HTML
        WxParse.wxParse('wenzhang', 'html', res.wenzhang[0].html, this, 0);
        // 处理留言
        this._liuyan(id)
      })
    })
  },


  // 留言
  _liuyan(id) {
    api.listLiuyan({ canting_id: id, page: page }, res => {
      console.log('liuyan', res)
      // 没有留言的情况
      if(res.code == 10002){
        return
      }

      this.setData({ liuyan_Res: res }, () => {
        // 控制是否显示‘加载更多留言’
        if (res.count > this.data.liuyan_Res.data.length) {
          this.setData({ gengduo: true })
        } else {
          this.setData({ gengduo: false })
        }
      })
    })
  },

  // 加载更多留言
  go_Liuyan() {
    api.listLiuyan({ canting_id: this.data.Res.id, page: ++page }, res => {
      console.log('++liuyan', res)
      this.setData({ 'liuyan_Res.data': this.data.liuyan_Res.data.concat(res.data) }, () => {
        // 控制是否显示‘加载更多留言’
        if (res.count > this.data.liuyan_Res.data.length) {
          this.setData({ gengduo: true })
        } else {
          this.setData({ gengduo: false })
        }
      })
    })
  },

  // 编辑
  go_bianji() {
    let id = this.data.Res.id
    wx.navigateTo({ url: '/pages/canting/bianji?id=' + id })
  },

})