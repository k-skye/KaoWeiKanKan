// pages/userInfo/userInfo.js
const app = getApp()
Page({
  data: {
    s_ID: {},
    list: [{
        id: 1,
        name: '考试1',
        open: true,
        date: '2020-1-1',
        time: '9:00~11:00',
        place: 'A1-101',
        seat: '01'
      },
      {
        id: 2,
        name: '考试2',
        open: false,
        date: '2020-2-1',
        time: '9:00~11:00',
        place: 'A2-201',
        seat: '22'
      }, {
        id: 3,
        name: '考试3',
        open: false,
        date: '2020-3-1',
        time: '9:00~11:00',
        place: 'A3-301',
        seat: '33'
      },
    ]
  },

  /**
   * 收缩核心代码
   */
  panel: function (e) {
    //获取到元素的id值
    var id = e.currentTarget.dataset.index+1;
    //获取到全部数据
    var list = this.data.list;
    //判断编号是否相等，相等的取反，不等的收起
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        console.log(list[i])
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    };
    this.setData({
      list
    })
  },
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    //tuip123 10-22 好像wxml页面不能直接访问app.globaldata，我把学号提取出来
    var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID
    })
  },
})