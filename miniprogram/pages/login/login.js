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
    //TODO 添加多绑定的判定
    //tuip123 11-05 getuserinfo
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
  // 点击授权按钮，返回的信息
bindGetUserInfo: function(e) {
  console.log(e.detail.userInfo)
},

// 代码中调用接口获取用户信息
fetchUserInfo:function(){
  wx.getSetting({
      success: function(res) {
          // 隐藏授权 button
          
          // 查看是否授权
         if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取用户信息
            wx.getUserInfo({
               success: function(res) {
                   console.log(res)
               },
               fail: function(error) {
                   console.log(error)
               }
            });
          } else {
             // 显示授权 button
             
          }
      }
  });
}
})