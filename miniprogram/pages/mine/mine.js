// pages/mine/mine.js
const app = getApp()
Page({
  data: {
    dialogShow: false,
    buttons: [{
      text: '返回'
    }, {
      text: '解除绑定'
    }],
  },
  removeBinding: function () {
    console.log(app.globalData._openid)
    this.setData({
      dialogShow: true
    })
  },
  test: function () {
    wx.navigateTo({
      url: '../../pages/sendMsg/sendMsg',
    })
  },
  tapDialogButton(e) {
    if(e.detail.index === 0){
      console.log('返回')
      this.setData({
        dialogShow: false,
      })
    }
    else if(e.detail.index === 1){
      console.log('解除绑定')
      this.setData({
        dialogShow: false,
      })
    }
  },
})