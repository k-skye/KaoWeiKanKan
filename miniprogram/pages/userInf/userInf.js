const app = getApp()
Page({
  data: {
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
  }, ]
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
  console.log(app.globalData.userInf)
  this.setData({
  openid:app.globalData.openID,
  s_ID:app.globalData.userInf.s_ID
})
}
})
