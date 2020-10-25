// pages/login/login.js
const app = getApp()
Page({
  data: {},
  loginSubmit: function (event) {
    const s_ID = event.detail.value.username
    console.log(event.detail.value.username)
    const s_password = event.detail.value.password

    wx.cloud.callFunction({
      name: "addUser",
      data: {
        s_ID,
        s_password
      },
    }).then(res => {
      if (res.result.status === 'ok') {
        
        return wx.cloud.callFunction({
          name: 'getUserData',
          data: {
            openID: app.globalData._openid
          }
        })
      }
    }).then(res=>{
      if (res.result.status === 'ok') {
        app.globalData.userInfo = res.result.data
        wx.redirectTo({
          url: '../userInfo/userInfo',
        })
      }
    }).catch(err => {
      console.error('[云函数] 调用失败', err)
      console.log('tuip123-err-addUser')
    })

  },
})