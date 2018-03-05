import { Base } from './Base.js'
const base = new Base()

class Api extends Base {
  constructor() {
    super()
  }


  // ------------------------------ token ----------------------------------

  // 登陆
  login(data, callback) {
    this.request({
      url: 'token/app', data: data, sCallback: (res) => {
        console.log('api.login', res)
        if (res.errorCode == 0) {
          callback && callback(res.data)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }


  // 检查token是否失效 
  checkToken(data, callback) {
    this.request({
      url: 'token/verify', data: data, sCallback: (res) => {
        console.log('api.checkToken', res)
        if (res.errorCode == 0) {
          callback && callback(res.data)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }


  // ------------------------------------------------- 餐厅 -----------------------------------------------------------

  // 查询餐厅列表
  listCanting(data, callback) {
    base.request({
      url: 'canting/list', data: data, sCallback: (res) => {
        if (res.errorCode == 0) {
          callback && callback(res.data)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }

  // 查询餐厅详细信息
  detailCanting(data, callback) {
    base.request({
      url: 'canting/detail', data: data, sCallback: (res) => {
        callback && callback(res.data)
      }
    })
  }

  // 新增餐厅
  createCanting(data, callback) {
    base.request({
      url: 'canting/createCanting', data: data, sCallback: (res) => {
        if (res.errorCode == 0) {
          callback && callback(res)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }

  // 更新餐厅
  updateCanting(data, callback) {
    base.request({
      url: 'canting/updateCanting', data: data, sCallback: (res) => {
        if (res.errorCode == 0) {
          callback && callback(res.data)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }


  // ------------------------------留言----------------------------------
  // 查询留言列表(接受canting_id,page分页,每页20条)
  listLiuyan(data, callback) {
    base.request({
      url: 'liuyan/list', data: data, sCallback: (res) => {
        if (res.errorCode == 0) {
          callback && callback(res.data)
        } else {
          wx.navigateTo({ url: '/pages/exception/exception' })
        }
      }
    })
  }

  // 新增留言
  createLiuyan(data, callback) {
    base.request({ url: 'liuyan/create', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询我的留言（根据uid-服务器内部获取，page分页,每页20条）
  myLiuyan(data, callback) {
    base.request({ url: 'liuyan/myliuyan', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 删除留言
  deleteLiuyan(data, callback) {
    base.request({ url: 'liuyan/delete', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ---------------------------------文章--------------------------
  updateWenzhang(data, callback) {
    base.request({ url: 'wenzhang/updatewenzhang', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  createWenzhang(data, callback) {
    base.request({ url: 'wenzhang/createwenzhang', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  deleteWenzhang(data, callback) {
    base.request({ url: 'wenzhang/deletewenzhang', data: data, sCallback: (res) => { callback && callback(res) } })
  }
}

export { Api }

