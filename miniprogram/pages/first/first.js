// pages/first/first.js
const app = getApp()
Page({
  data: {

  },
  getOpenID:function(){
    wx.cloud.callFunction({
      name: 'first',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        console.log('tuip123')
        console.log(res.result.userI)
        if (res.result.userI == 0)//判断方式有待修改
        {
          wx.redirectTo({
            url: '../indexk/indexk',
          })
        }
        else {
          wx.redirectTo({
            url: '../userInf/userInf',
          })
          
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'first',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        console.log('tuip123')
        console.log(res.result.userI)
        if (res.result.userI == 0)//判断方式有待修改
        {
          wx.redirectTo({
            url: '../indexk/indexk',
          })
        }
        else {
          wx.redirectTo({
            url: '../userInf/userInf',
          })
          
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        console.log('tuip123')
        wx.redirectTo({
          url: '../indexk/indexk',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})