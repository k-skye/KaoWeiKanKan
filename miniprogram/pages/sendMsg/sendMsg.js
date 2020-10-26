// pages/sendMsg/sendMsg.js
Page({
  data: {
    formData: {},
    success: ''
  },
  back: function () {
    this.setData({
      success: '已经收到您的反馈'
    })
    wx.navigateBack({
      delta: 0,
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
})