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
    islogin:true
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
  },
  onLoad:function(){
    if(app.globalData.userInfo!=null){
      var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID,
      islogin:app.globalData.islogin
    })
    }else{
      var that = this;
      that.setData({
        islogin:app.globalData.islogin
      })
    }
  },
  onShow:function(){
    
    if(app.globalData.userInfo!=null){
      var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID,
      islogin:app.globalData.islogin
    })
    }else{
      var that = this;
      that.setData({
        islogin:app.globalData.islogin
      })
    }
  }
})