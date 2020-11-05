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
  unbind: function () {
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
      wx.cloud.callFunction({
        name:"unbind"
      }).then(res=>{
        this.setData({
          dialogShow: false,
        })
        wx.redirectTo({
          url: '/pages/login/login',
        })
      })
    }
  },onLoad:function(){
    var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID
    })
  }
})