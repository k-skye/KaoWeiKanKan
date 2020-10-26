// pages/mine/mine.js
const app = getApp()
Page({
  data: {

  },
  removeBinding:function(){
    console.log(app.globalData._openid)
  }
  ,
  test:function(){
    wx.navigateTo({
      url: '../../pages/sendMsg/sendMsg',
    })
  }
})
