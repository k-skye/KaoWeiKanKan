//app.js
App({
  globalData: {
    _openid:'',
    userInfo:{}
  },

  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.checkNewUser()
  },

  checkNewUser: function () {
    //检测是否为新用户，是的话再跳转到首页

    wx.showLoading({
      title: '正在登录',
    })
    // kang 2020-10-19 正在加载别用showToast，用showLoading，加载完之后再hideLoading

    wx.cloud.callFunction({
      name: 'getOpenid'
    }).then(res => {
      //获取openid

      this.globalData._openid = res.result._openid

      //嵌套使用云函数，否则会出现调用先后顺序不一致的问题（存疑）
      // kang 2020-10-19 以上你说的对！

      return wx.cloud.callFunction({
        name: 'getUserData',
        data: {
          openID: this.globalData._openid
        }
      })
      // kang 2020-10-19 promise链式调用

    }).then(res => {
      //获取用户信息

      wx.hideLoading()

      if (res.result.status === 'ok') {
        
        this.globalData.userInfo = res.result.data
        
        wx.redirectTo({
          url: '/pages/userInfo/userInfo',
        })
      }

    }).catch(err => {
      console.error('[云函数]调用失败', err)
      wx.showToast({
        title: 'fail',
        icon: 'none'
      })
    })
  }
})
