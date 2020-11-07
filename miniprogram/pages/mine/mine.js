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
    islogin:null
  },
  unbind: function () {
    this.setData({
      dialogShow: true
    })
  },
  bind: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  sentMessage: function () {
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
      s_ID: app.globalData.userInfo.s_ID,
      islogin:app.globalData.islogin
    })
  },onShow:function(){
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID,
      islogin:app.globalData.islogin
    })
    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      app.globalData._openid = res.result._openid
      return wx.cloud.callFunction({
        name: 'getUserData',
        data: {
          OPENID: app.globalData._openid
        }
      })
    }).then(res => {
      if (res.result.status === 'ok') {
        app.globalData.userInfo = res.result.data
        app.globalData.islogin = true
        this.setData({
          islogin: true
        })
      } else {
        app.globalData.islogin = false
        this.setData({
          islogin: false
        })
      }
    }).catch(err => {
      console.error('[云函数]调用失败', err)
      wx.showToast({
        title: 'fail',
        icon: 'none'
      })
    })
    wx.hideLoading()
  }
})