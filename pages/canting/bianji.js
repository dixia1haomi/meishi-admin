import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()

Page({

  data: {
    Res: {},
    // 餐厅参数
    params: {},
    // 文章参数
    wenzhang: {},
    // Config
    quyuList: Config.quyu,
    caixiList: Config.caixi,
    changjingList: Config.changjing,
  },


  onLoad: function (op) {
    console.log('opid', op.id)
    this._load(op.id)
  },

  // 请求detail数据（接受餐厅ID）
  _load(id) {
    api.detailCanting({ id: id }, res => {
      console.log('detail数据', res)
      // 设置数据
      this.setData({ Res: res })
    })
  },

  // -------------------------------------------------- 参数 ---------------------------------------------------
  // 名称
  name(e) {
    console.log('名称', e.detail)
    this.setData({ 'params.name': e.detail.value })
  },

  // 描述
  miaoshu(e) {
    console.log('描述', e.detail)
    this.setData({ 'params.miaoshu': e.detail.value })
  },

  // Img
  img(e) {
    console.log('头图', e.detail)
    this.setData({ 'params.img': e.detail.value })
  },

  // 电话
  phone(e) {
    console.log('电话', e.detail)
    this.setData({ 'params.phone': e.detail.value })
  },

  // 地址
  address(e) {
    console.log('地址', e.detail)
    this.setData({ 'params.address': e.detail.value })
  },

  // 经度
  longitude(e) {
    console.log('经度', e.detail)
    this.setData({ 'params.longitude': e.detail.value })
  },

  // 纬度
  latitude(e) {
    console.log('纬度', e.detail)
    this.setData({ 'params.latitude': e.detail.value })
  },

  // 人均
  renjun(e) {
    console.log('人均', e.detail)
    this.setData({ 'params.renjun': e.detail.value })
  },

  // 场景
  changjing() {
    // 显示弹窗
    wx.showActionSheet({
      itemList: ['约会', '小众', '多人'],
      success: (res) => {
        console.log('场景', res.tapIndex)
        this.setData({ 'params.changjing': res.tapIndex + 1 })
      }
    })
  },

  // 菜系
  caixi() {
    // 显示弹窗
    wx.showActionSheet({
      itemList: ['中餐', '西餐', '甜品'],
      success: (res) => {
        console.log('菜系', res.tapIndex)
        this.setData({ 'params.caixi': res.tapIndex + 1 })
      }
    })
  },

  // 区域
  quyu() {
    // 显示弹窗
    wx.showActionSheet({
      itemList: ['麒麟', '沾益'],
      success: (res) => {
        console.log('区域', res.tapIndex)
        this.setData({ 'params.quyu': res.tapIndex + 1 })
      }
    })
  },

  // 标签
  biaoqian(e) {
    console.log('标签', e.detail)
    this.setData({ 'params.biaoqian': e.detail.value })
  },

  // 顶置
  top(e) {
    console.log('顶置', e.detail)
    this.setData({ 'params.top': e.detail.value })
  },

  // 文章
  wenzhang(e) {
    console.log('文章', e.detail)
    this.setData({ 'wenzhang.html': e.detail.value })
  },

  // 更新餐厅
  update_canting() {
    let params = this.data.params, id = this.data.Res.id
    // 参数中添加ID
    params.id = id
    // 请求更新
    api.updateCanting(params, res => {
      console.log('更新餐厅', res)
      // 返回
      wx.navigateBack({ delta: 1 })
    })
  },

  // 更新文章
  update_wenzhang() {
    let wenzhang = this.data.wenzhang, id = this.data.Res.wenzhang[0].id
    // 参数中添加ID
    wenzhang.id = id
    // 请求更新
    api.updateWenzhang(wenzhang, res => {
      console.log('更新文章', res)
      // 返回
      wx.navigateBack({ delta: 1 })
    })
  },
})