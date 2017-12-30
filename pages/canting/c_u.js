import { Cos } from '../../utils/Cos.js'
import { Api } from '../../utils/Api.js'

const api = new Api()
const cos = new Cos()


Page({

  data: {
    // 提交给服务器的参数
    cantingParam: {},
    caipinParam: {},
    huanjingParam: {},
    wenzhangParam: {},

    detailRes: {},

    // 默认新增为false,更新为true,
    state: false,
    // 新增菜品弹出层
    createcaipin_state: false,
    // 新增环境弹出层
    createhuanjing_state: false,

  },

  onLoad: function (op) {
    // 新增没有id,更新才有
    if (op.id) { this.setData({ state: true }, () => { this.getdata(op.id) }) }
  },

  // 获取数据填充
  getdata(id) {
    api.detailCanting({ id: id }, res => { this.setData({ detailRes: res }) })
  },


  // -----------------------------------------------------------餐厅------------------------------------------------------------

  // --------------新增/更新餐厅数据设置-----------
  // nameInput
  nameInput(e) { this.setData({ 'cantingParam.name': e.detail.value }) },
  // phoneInput
  phoneInput(e) { this.setData({ 'cantingParam.phone': e.detail.value }) },


  // ---------新增餐厅方法----------
  createcanting() {
    let cantingParam = this.data.cantingParam
    api.createCanting(cantingParam, res => {
      wx.showModal({ title: '新增餐厅成功' })
    })
  },

  // -------更新餐厅方法-------
  updatecanting() {
    //获取所有基本信息，更新
    let cantingParam = this.data.cantingParam
    cantingParam.id = this.data.detailRes.id // 更新要填充ID
    api.updateCanting(cantingParam, res => {
      console.log('updatecanting', res)
      wx.showModal({ title: '更新餐厅成功' })
    })
  },

  // -------删除餐厅方法-------(实现在detail.js下了)


  // ------------------餐厅图片-----------------
  // 上传餐厅图片
  uploadImg() {
    let id = this.data.detailRes.id
    let imgName = 'title'
    wx.chooseImage({
      success: function (res) {
        let filePath = res.tempFilePaths[0]
        let fileName = id + '-' + imgName + filePath.slice(-4)  // 8-myname.jpg
        console.log(fileName, res)
        cos.upload('/canting', filePath, fileName, res => {
          console.log('a', res)
          if (res.code === 0) {
            api.updateCanting({ id: id, img: res.data.source_url }, res => {
              console.log('b', res)
              wx.showModal({ title: 'COS已上传，数据库已上传' })
            })
          }
        })
      },
    })
  },

  // 删除餐厅图片
  deleteImg() {
    // 截掉 http://cosceshi-1253443226.coscd.myqcloud.com
    let img = this.data.detailRes.img
    let dir = img.replace('http://cosceshi-1253443226.coscd.myqcloud.com', '') // 截掉不要的替换成空
    let id = this.data.detailRes.id
    cos.deleteCos(dir, res => {
      console.log('delete', res.data)
      if (res.data.code === 0) {
        api.updateCanting({ id: id, img: '' }, back => {
          console.log('shujuku', back)
          wx.showModal({ title: 'COS已删除，数据库已删除' })
        })
      }
    })
  },
  // -----------------------------------------------------------菜品--------------------------------------------------------------

  // --------------新增/更新条菜品数据设置-----------
  // 唤出弹出层
  createcaipin_state_show() { this.setData({ createcaipin_state: true }) },
  // caipin_nameInput
  caipin_nameInput(e) { this.setData({ 'caipinParam.name': e.detail.value }) },
  // caipin_nameInput
  caipin_miaoshuInput(e) { this.setData({ 'caipinParam.miaoshu': e.detail.value }) },
  // caipin_nameInput
  caipin_jiageInput(e) { this.setData({ 'caipinParam.jiage': e.detail.value }) },
  // caipin_nameInput
  caipin_guigeInput(e) { this.setData({ 'caipinParam.guige': e.detail.value }) },


  // -------------新增菜品方法-----------
  createcaipin() {
    let caipinParam = this.data.caipinParam
    caipinParam.canting_id = this.data.detailRes.id     // 填充canting_id,就是餐厅的ID
    api.createCaipin(caipinParam, res => {
      console.log('createcaipin', res)
      wx.showModal({ title: '新增菜品成功' })
    })
  },

  // -------------更新菜品方法-----------
  updatecaipin(e) {
    let caipinParam = this.data.caipinParam
    caipinParam.id = e.currentTarget.id   // 更新要填充ID
    api.updateCaipin(caipinParam, res => {
      console.log('updatecaipin', res)
      wx.showModal({ title: '更新菜品信息成功' })
    })
  },



  // --------------删除菜品方法-----------
  // 方案1：先检查图有没有删除，提示先手动删除图 , 方案2：先调用删除图，再删除信息
  // 先检查图有没有删除，提示先手动删除图
  // 检查IMG字段是否有内容，有内容就提示~（*可能COS已删，数据库还有，这时应该用IMG字段查一下COS接口，COS没有就要清空IMG字段*），没内容就删除
  deletecaipin(e) {
    let caipin_id = e.currentTarget.id
    let img = e.currentTarget.dataset.img

    if (img.length === 0) {
      // IMG为空，执行删除
      api.deleteCaipin({ id: caipin_id }, res => {
        console.log('删除菜品结果', res)
        wx.showModal({ title: '删除菜品成功' })
      })
    } else {
      // IMG不为空，提示
      wx.showModal({ title: '请先删除菜品图片' })
    }
  },


  // ------------------菜品图-------------------
  // 上传菜品图
  uploadcaipinImg(e) {
    let caipin_id = e.currentTarget.id  // 菜品ID，用于更新数据库和拼接COS文件名
    let id = this.data.detailRes.id   // 餐厅ID，用于拼接COS文件名所属ID

    // http://cosceshi-1253443226.coscd.myqcloud.com/canting/8-1.jpg
    wx.chooseImage({
      success: function (res) {
        let filePath = res.tempFilePaths[0]
        let fileName = id + '-' + caipin_id + filePath.slice(-4)  // 8-myname.jpg
        console.log(fileName, res)
        cos.upload('/caipin', filePath, fileName, res => {
          console.log('上传菜品图COS结果', res)
          if (res.code === 0) {
            api.updateCaipin({ id: caipin_id, img: res.data.source_url }, res => {
              console.log('上传菜品图数据库结果', res)
              wx.showModal({ title: '菜品图COS已上传，菜品图数据库已上传' })
            })
          }
        })
      },
    })
  },
  // 删除菜品图
  deletecaipinImg(e) {
    let caipin_id = e.currentTarget.id      // 菜品ID，用于更新数据库
    let img = e.currentTarget.dataset.img   // 菜品IMG

    let dir = img.replace('http://cosceshi-1253443226.coscd.myqcloud.com', '') // 截掉不要的替换成空

    cos.deleteCos(dir, res => {
      console.log('删除菜品图COS结果', res.data)
      if (res.data.code === 0) {
        api.updateCaipin({ id: caipin_id, img: '' }, back => {
          console.log('删除菜品图数据库结果', back)
          wx.showModal({ title: '菜品图COS已删除，菜品图数据库已删除' })
        })
      }
    })
  },
  // ----------------------------------------------------------------环境--------------------------------------------------------------

  // --------------新增 / 更新环境数据设置-----------
  // 唤出弹出层
  createhuanjing_state_show() { this.setData({ createhuanjing_state: true }) },
  // 环境描述
  huanjing_miaoshuInput(e) { this.setData({ 'huanjingParam.miaoshu': e.detail.value }) },

  // --------------新增环境-------------
  createhuanjing() {
    let huanjingParam = this.data.huanjingParam
    huanjingParam.canting_id = this.data.detailRes.id     // 填充canting_id,就是餐厅的ID
    api.createHuanjing(huanjingParam, res => {
      console.log('createhuanjing', res)
      wx.showModal({ title: '新增环境成功' })
    })
  },
  // --------------更新环境-------------
  updatehuanjing(e) {
    let huanjingParam = this.data.huanjingParam
    huanjingParam.id = e.currentTarget.id   // 更新要填充ID
    api.updateHuanjing(huanjingParam, res => {
      console.log('updatehuanjing', res)
      wx.showModal({ title: '更新环境信息成功' })
    })
  },

  // --------------删除环境-------------
  // 检查IMG字段是否有内容，有内容就提示~（*可能COS已删，数据库还有，这时应该用IMG字段查一下COS接口，COS没有就要清空IMG字段*），没内容就删除
  deletehuanjing(e) {
    let huanjing_id = e.currentTarget.id
    let img = e.currentTarget.dataset.img

    if (img.length === 0) {
      // IMG为空，执行删除
      api.deleteHuanjing({ id: huanjing_id }, res => {
        console.log('删除环境结果', res)
        wx.showModal({ title: '删除环境成功' })
      })
    } else {
      // IMG不为空，提示
      wx.showModal({ title: '请先删除环境图片' })
    }
  },
  // --------------环境图片-------------
  // 上传环境图
  uploadhuanjingImg(e) {
    let huanjing_id = e.currentTarget.id  // 环境ID，用于更新数据库和拼接COS文件名
    let id = this.data.detailRes.id   // 餐厅ID，用于拼接COS文件名所属ID
    // http://cosceshi-1253443226.coscd.myqcloud.com/canting/8-1.jpg
    wx.chooseImage({
      success: function (res) {
        let filePath = res.tempFilePaths[0]
        let fileName = id + '-' + huanjing_id + filePath.slice(-4)  // 8-myname.jpg
        cos.upload('/huanjing', filePath, fileName, res => {
          console.log('上传环境图COS结果', res)
          if (res.code === 0) {
            api.updateHuanjing({ id: huanjing_id, img: res.data.source_url }, res => {
              console.log('上传环境图数据库结果', res)
              wx.showModal({ title: '环境图COS已上传，环境图数据库已上传' })
            })
          }
        })
      },
    })
  },
  // 删除环境图
  deletehuanjingImg(e) {
    let huanjing_id = e.currentTarget.id      // 菜品ID，用于更新数据库
    let img = e.currentTarget.dataset.img   // 菜品IMG
    let dir = img.replace('http://cosceshi-1253443226.coscd.myqcloud.com', '') // 截掉不要的替换成空

    cos.deleteCos(dir, res => {
      console.log('删除环境图COS结果', res.data)
      if (res.data.code === 0) {
        api.updateHuanjing({ id: huanjing_id, img: '' }, back => {
          console.log('删除环境图数据库结果', back)
          wx.showModal({ title: '环境图COS已删除，环境图数据库已删除' })
        })
      }
    })
  },

  // ----------------------------------------------------------------文章--------------------------------------------------------------
  // --------------新增文章-------------(*弹出层实现还是跳转新页面实现？*要解析HTML?*)
  // --------------更新文章-------------
  // --------------删除文章-------------
  // --------------文章图片-------------(*待开荒*)
  // 上传文章图
  // 删除文章图
})

// 更新菜品信息-》图片
// 新增一条菜品信息
// 删除一条菜品信息
// ....
// 环境...
// 文章...