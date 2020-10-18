// pages/first/first.js
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: 'loading',
      icon:'loading',
      duration:5000
    })
    wx.cloud.callFunction({
      name: 'first',
      data: {},
      success: res =>{
        console.log('[云函数] [first] 调用成功',res)
        console.log('tuip123-success-first')
       
        wx.cloud.callFunction({
          name: 'getUserData',
          data: {openID:res.result.openid},
          success: res => {
    
            console.log('tuip123-success')
            console.log(res.result.data[0].flag)
    
            if (res.result.data[0].flag)
            {
              app.globalData.userInf = res.result.data[0]
              wx.showToast({
                title: 'success',
                icon: 'success'
              })
              wx.redirectTo({
                url: '../userInf/userInf',
              })
            }
            else {
              wx.showToast({
                title: 'go to login',
                icon:'none'
              })
              wx.redirectTo({
                url: '../indexk/indexk',
              })
              
              }
          },
          fail: err => {
            console.error('[云函数] [getUserData] 调用失败', err)
            console.error('tuip123-err')
            wx.showToast({
              title: 'fail',
              icon:'none'
            })
          }
        })

      },
      fail: err => {
        console.error('[云函数] [] 调用失败', err)
        console.error('tuip123-err-first')
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