// pages/sendMsg/sendMsg.js
Page({
  data: {
    formData: {},
    success: '',
    length:0
  },
  back: function () {
    this.setData({
      success: '已经收到您的反馈'
    })
    sleep(1000)
    wx.navigateBack({
      delta: 0,
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
    })
    this.setData({
      length:this.data.formData.message.length
    })
    
  },
})
function sleep(numberMillis) { 
  var now = new Date(); 
  var exitTime = now.getTime() + numberMillis; 
  while (true) { 
  now = new Date(); 
  if (now.getTime() > exitTime) 
  return; 
  } 
  }