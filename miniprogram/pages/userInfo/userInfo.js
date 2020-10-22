// pages/userInfo/userInfo.js
const app = getApp()
Page({
  data: {
    s_ID:{},
    list: [{
      id: '1',
      name: '考试1',
      open: true,
      pages: ['2020-1-1', 'A1-101', '01']
    },
    {
      id: '2',
      name: '考试2',
      open: false,
      pages: ['2020-1-1', 'A1-101', '01']
    }, {
      id: '3',
      name: '考试3',
      open: false,
      pages: ['2020-1-1', 'A1-101', '01']
    },]
  },

  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }

    /**
     * key和value名称一样时，可以省略
     *
     * list:list=>list
     */
    this.setData({
      list
    })
  },
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    //tuip123 10-22 好像wxml页面不能直接访问app.globaldata，我把学号提取出来
    var that = this;
    that.setData({
      s_ID:app.globalData.userInfo.s_ID
    })
  },
})
