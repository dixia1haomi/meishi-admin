import { Api } from '../../utils/Api.js'
import WxValidate from '../../validate/WxValidate.js'
const api = new Api()

//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则 name,miaoshu,img,map_img,phone,address,longitude,latitude,renjun,quyu,biaoqian,top
const rules = {
  canting_id: { required: true },
  card_id: { required: true },
  img: { required: true },
  miaoshu: { required: true },
  qixian: { required: true },
  quanbushuliang: { required: true },
  shengyushuliang: { required: true },
  state: { required: true },
  tiaojian: { required: true },
  title: { required: true },
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  canting_id: { required: '餐厅ID不能为空' },
  card_id: { required: '卡劵ID不能为空' },
  img: { required: 'img不能为空' },
  miaoshu: { required: '描述不能为空' },
  qixian: { required: '期限不能为空' },
  quanbushuliang: { required: '全部数量不能为空' },
  shengyushuliang: { required: '剩余数量不能为空' },
  state: { required: '状态不能为空' },
  tiaojian: { required: '条件不能为空' },
  title: { required: 'title不能为空' },
}

const wxValidate = new WxValidate(rules, messages)

//------------------------------------------------------------------------------------------------------

Page({


  data: {

  },


  onLoad: function (op) {
    console.log('kajuan/create')
  },


  // 新增提交
  createSubmit(e) {
    console.log(e)
    let data = e.detail.value

    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(data)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }
    console.log('验证通过')

    // 新增卡劵接口
    api.createKajuan(data, back => {
      console.log('新增卡劵成功', back)
      // 新增成功，提示跳转
      wx.showModal({
        title: '新增成功',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({ url: '/pages/kajuan/kajuan' })
          }
        }
      })
    })
  },

})