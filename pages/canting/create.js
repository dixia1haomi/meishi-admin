import { Api } from '../../utils/Api.js'
import WxValidate from '../../validate/WxValidate.js'
const api = new Api()


//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则 name,miaoshu,img,map_img,phone,address,longitude,latitude,renjun,quyu,biaoqian,top
const rules = {
  name: { required: true, rangelength: [2, 10] },
  miaoshu: { required: true, rangelength: [4, 14] },
  img: { required: true },
  map_img: { required: true },
  phone: { required: true, rangelength: [7, 15] },
  address: { required: true, rangelength: [4, 16] },
  longitude: { required: true },
  latitude: { required: true },
  renjun: { required: true, maxlength: 999 },
  quyu: { required: true, maxlength: 10 },
  biaoqian: { required: true, rangelength: [1, 10] },
  top: { required: true }
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  name: { required: '名称不能为空', rangelength: '名称长度在2到10' },
  miaoshu: { required: '描述不能为空', rangelength: '描述长度在4到14' },
  img: { required: 'img不能为空' },
  map_img: { required: 'map_img不能为空' },
  phone: { required: '电话不能为空', rangelength: '电话长度在7到15' },
  address: { required: '地址不能为空', rangelength: '地址长度在4到16' },
  longitude: { required: '经度不能为空', maxlength: '经度长度最大30' },
  latitude: { required: '纬度不能为空', maxlength: '纬度长度最大30' },
  renjun: { required: '人均不能为空', maxlength: '人均长度最大999' },
  quyu: { required: '区域不能为空', maxlength: '区域长度最大10' },
  biaoqian: { required: '标签不能为空', rangelength: '标签长度在1到10' },
  top: { required: '顶置不能为空' },
}

const wxValidate = new WxValidate(rules, messages)

//------------------------------------------------------------------------------------------------------

Page({

  data: {
    toptips_kaiguan: false,   // 错误提示开关
  },


  onLoad: function (op) {

  },

  // 表单提交
  formSubmit(e) {
    console.log('form', e.detail.value)
    let data = e.detail.value

    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(data)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }
    console.log('验证通过')

    // 请求新增餐厅
    this._createCanting(data)
  },

  // API请求新增餐厅
  _createCanting(data) {
    api.createCanting(data, back => {
      console.log('API请求新增餐厅', back)
      // 新增成功，提示跳转
      wx.showModal({
        title: '新增成功',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({ url: '/pages/canting/detail?id=' + back.data.id })
          }
        }
      })
    })
  },


})