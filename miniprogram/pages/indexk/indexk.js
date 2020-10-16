// pages/indexk/indexk.js
//const db =wx.cloud.database();
//const userInfo=db.collection('userInfo');
Page({

  
  data: {

  },
  logink:function(event){
    const s_ID=event.detail.value.username
    const s_password=event.detail.value.password
    console.log(s_password)
    wx.cloud.callFunction({
      name:"addUser",
      data:{s_ID,s_password},
      success: res =>{
        // console.log('[云函数]  ', res.result.username)
        // wx.navigateTo({
        //   url: '',
        // })
        
      },
      fail: err => {
        console.log('[云函数] [login] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})