// pages/login/login.js
const app = getApp()
Page({
  data: {
    formData: {},
    isAgree: false,
    rules: [{
      name: 'checkbox',
      rules: {
        required: true,
        message: '多选列表是必选项'
      },
    }, ]
  },
  loginSubmit: function (event) {
    if (this.data.isAgree) {
      if (this.data.formData.username && this.data.formData.password) {
        const s_ID = this.data.formData.username
        const s_password = this.data.formData.password

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
        }).then(res => {
          if (res.result.status === 'ok') {
            app.globalData.userInfo = res.result.data
            wx.switchTab({
              url: '../userInfo/userInfo',
            })
          }
        }).catch(err => {
          console.error('[云函数] 调用失败', err)
          console.log('tuip123-err-addUser')
        })
      }else{this.setData({
        error: '学号或者密码不能为空'
    })}
    }else{this.setData({
      error: '你需要同意《相关条款》'
  })}
  },

  formInputChange(e) {

    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
})