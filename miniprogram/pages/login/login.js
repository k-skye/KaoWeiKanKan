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
    }, ],
    errTemp: null
  },
  loginSubmit: function (event) {
    //tuip123 11-05 getuserinfo
    if (this.data.isAgree) {
      if (this.data.formData.username && this.data.formData.password) {
        const s_ID = this.data.formData.username
        const s_password = this.data.formData.password
        wx.showLoading({
          title: '正在尝试绑定',
        })
        //查询是否绑定
        wx.cloud.callFunction({
          name: "isBinded",
          data: {
            s_ID
          }
        }).then(res => {
          if (res.result.msg === '不存在该用户') {
            //不存在则会添加
            return wx.cloud.callFunction({
              name: 'addUser',
              data: {
                s_ID,
                s_password
              },
            })
          } else {
            this.setData({
              error: '该账号已经被绑定'
            })
            return new Promise((resolve, reject) => {
              resolve()
            })
          }
        }).then(res => {
          //添加成功会跳转页面
          if (res && res.result.status === 'ok') {
            //需要重新加载
            app.globalData.reload = true
            wx.switchTab({
              url: '../userInfo/userInfo',
            })
          }
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.setData({
          error: '学号或者密码不能为空'
        })
      }
    } else {
      this.setData({
        error: '你需要同意《相关条款》'
      })
    }
    wx.hideLoading()
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