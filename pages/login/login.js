import { Api } from '../../utils/Api.js'
const api = new Api()

Page({


  data: {

  },


  onLoad: function (op) {

  },

  lingqu() {
    console.log('aaa')

    api.kajuan({}, res => {
      console.log('kajuan', res)

      wx.addCard({
        cardList: [
          {
            cardId: res.cardId,
            cardExt: '{"timestamp": "' + res.timestamp + '", "signature":"' + res.signature + '"}'
          }
        ],
        success: (res) => {
          console.log('success', res.cardList) // 卡券添加结果
        },
        fail: (err) => {
          console.log('fail', err)
        }
      })

    })

  },

  dakai() {

    // 解密code
    api.jiemi_code({}, res => {
      console.log('jiemi', res)

      // 打开
      wx.openCard({
        cardList: [
          {
            cardId: 'pQ7pM1gccLWeQjOBkDN60PxClnFQ',
            code: res.code
          }
        ],
        success: function (res) {
          console.log('dakai', res)
        }
      })
    })

  },

  chakan() {
    // 获取accToken
    let acc = "6_czz6eYnI_vpolR0yr3OZWI1scINVrC9tAwZdXYf8al_Lq5voS_NKgZEKxd_ixr6DWt97f5yByIAbbyijTQ7G1KN4EL0gHkua52FAS-EFrjTKYQw5X8ZiI4AurdlTHfJIcT_5vK0ST0ftPa9CBZXdAEAWUS"

    wx.request({
      url: 'https://api.weixin.qq.com/card/user/getcardlist?access_token=' + acc,
      method: 'POST',
      data: {
        "openid": "oQ7pM1nO911hKpAzAFm0BOfi0y6c"
      },
      success: res => {
        console.log('succ', res)
        // 打开
        wx.openCard({
          cardList: [
            {
              cardId: res.data.card_list[0].card_id,
              code: res.data.card_list[0].code
            }
          ],
          success: function (res) {
            console.log('dakai', res)
          }
        })
      },
      fail: err => {
        console.log('fail', err)
      }
    })
  },

  chakankucun() {
    // acc_Token
    let acc = "6_czz6eYnI_vpolR0yr3OZWI1scINVrC9tAwZdXYf8al_Lq5voS_NKgZEKxd_ixr6DWt97f5yByIAbbyijTQ7G1KN4EL0gHkua52FAS-EFrjTKYQw5X8ZiI4AurdlTHfJIcT_5vK0ST0ftPa9CBZXdAEAWUS"
    // 请求
    wx.request({
      url: 'https://api.weixin.qq.com/card/get?access_token=' + acc,
      method: 'POST',
      data: {
        "card_id": "pQ7pM1gccLWeQjOBkDN60PxClnFQ"
      },
      success: res => {
        console.log('succ', res)
      },
      fail: err => {
        console.log('fail', err)
      }
    })

  },
})