import { Api } from '../../utils/Api.js'
import WxValidate from '../../validate/WxValidate.js'
const api = new Api()


//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则 name,miaoshu,img,map_img,phone,address,longitude,latitude,renjun,quyu,biaoqian,top
const rules = {
  name: { required: true, rangelength: [4, 10] },
  miaoshu: { required: true, rangelength: [4, 15] },
  img: { required: true, rangelength: [4, 10] },
  map_img: { required: true, rangelength: [4, 10] },
  phone: { required: true, rangelength: [4, 10] },
  address: { required: true, rangelength: [4, 10] },
  longitude: { required: true, rangelength: [4, 10] },
  latitude: { required: true, rangelength: [4, 10] },
  renjun: { required: true, rangelength: [4, 10] },
  quyu: { required: true, rangelength: [4, 10] },
  biaoqian: { required: true, rangelength: [4, 10] },
  top: { required: true, rangelength: [4, 10] }
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  name: { required: '名称', rangelength: '名称长度在4到10' },
  miaoshu: { required: '描述', rangelength: '描述长度在4到10' },
  img: { required: 'img', rangelength: 'img长度在4到10' },
  map_img: { required: 'map_img', rangelength: 'map_img长度在4到10' },
  phone: { required: '电话', rangelength: '电话长度在4到10' },
  address: { required: '地址', rangelength: '地址长度在4到10' },
  longitude: { required: '经度', rangelength: '经度长度在4到10' },
  latitude: { required: '纬度', rangelength: '纬度长度在4到10' },
  renjun: { required: '人均', rangelength: '人均长度在4到10' },
  quyu: { required: '区域', rangelength: '区域长度在4到10' },
  top: { required: '顶置', rangelength: '顶置长度在4到10' },
}

const wxValidate = new WxValidate(rules, messages)

//------------------------------------------------------------------------------------------------------

Page({

  data: {
    toptips_kaiguan: false,   // 错误提示开关
  },


  onLoad: function (op) {
    this._load(op.id)
  },

  // 请求detail数据（接受餐厅ID）
  _load(id) {
    api.detailCanting({ id: id }, res => {
      console.log('餐厅详情', res)
      // 设置数据
      this.setData({ Res: res })
    })
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

    // 请求更新餐厅
    this._updateCanting(data)
  },


  // 更新餐厅
  _updateCanting(data) {
    let id = this.data.Res.id
    // 参数中添加ID
    data.id = id
    // 请求更新
    api.updateCanting(data, res => {
      console.log('更新餐厅', res)
      // 新增成功，提示跳转
      wx.showModal({
        title: '更新成功',
        success: function (res) {
          if (res.confirm) { wx.navigateBack({ delta: 1 }) }
        }
      })
    })
  },

})