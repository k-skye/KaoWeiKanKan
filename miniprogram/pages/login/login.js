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
              //先判断账号密码是否正确
              return wx.cloud.callFunction({
                  name: "getPaChongData",
                  data: {
                    account: s_ID,
                    password: s_password
                  }
                })
                .then(res => {
                  //判断返回值
                  if (res.result.msg == "账号密码错误") {
                    console.log("login:"+s_ID+":"+s_password)
                    this.setData({
                      error: '账号密码错误'
                    })
                    return new Promise((resolve, reject) => {
                      resolve()
                    })
                  } else {
                    return wx.cloud.callFunction({
                      name: 'addUser',
                      data: {
                        s_ID,
                        s_password
                      },
                    })
                  }
                })
            } else {
              this.setData({
                error: '该账号已经被绑定'
              })
              return new Promise((resolve, reject) => {
                resolve()
              })
            }
          })
          .then(res => {
            wx.hideLoading()
            //添加成功会跳转页面
            if (res && res.result.status === 'ok') {
              //需要重新加载
              app.globalData.reload = true
              wx.reLaunch({
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