import { Base } from './Base.js'
const base = new Base()

class Api {
  constructor() { }

  // ------------------------------餐厅----------------------------------

  // 查询餐厅列表
  listCanting(data, callback) {
    base.request({ url: 'canting/list', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 查询餐厅详细信息
  detailCanting(data, callback) {
    base.request({ url: 'canting/detail', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 新增餐厅
  createCanting(data, callback) {
    base.request({ url: 'canting/createcanting', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 更新餐厅
  updateCanting(data, callback) {
    base.request({ url: 'canting/updatecanting', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 删除餐厅
  deleteCanting(data, callback) {
    base.request({ url: 'canting/deletecanting', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------菜品----------------------------------

  // 新增菜品
  createCaipin(data, callback) {
    base.request({ url: 'caipin/createcaipin', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 更新菜品
  updateCaipin(data, callback) {
    base.request({ url: 'caipin/updatecaipin', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // 删除菜品
  deleteCaipin(data, callback) {
    base.request({ url: 'caipin/deletecaipin', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------环境----------------------------------

  // 新增环境
  createHuanjing(data, callback) {
    base.request({ url: 'huanjing/createhuanjing', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 更新环境
  updateHuanjing(data, callback) {
    base.request({ url: 'huanjing/updatehuanjing', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 删除环境
  deleteHuanjing(data, callback) {
    base.request({ url: 'huanjing/deletehuanjing', data: data, sCallback: (res) => { callback && callback(res) } })
  }
  // ------------------------------文章----------------------------------

  // *...


}

export { Api }