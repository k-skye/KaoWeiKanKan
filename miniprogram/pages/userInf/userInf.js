Page({
  /*** 页面的初始数据*/
  data: {
    openid: '' ,
    list: [
      {
        exam: '列表1',
        message: [{
          messageName: '子列表1-1',
        }, 
        {
          messageName: '子列表1-2',
        }, 
        {
          messageName: '子列表1-3',
        }]
      }, 
      {
        exam: '列表2',
        message: [{
          messageName: '子列表2-1',
        }, 
        {
          messageName: '子列表2-2',
        }, 
        {
          messageName: '子列表2-3',
        }]
      }, 
      {
        exam: '列表3',
        message: [{
          messageName: '子列表3-1',
        }, 
        {
          messageName: '子列表3-2',
        }, 
        {
          messageName: '子列表1-3',
        }]
      }]
  }, //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex,
      //获取点击的下标值
      list = this.data.list;
    list[Index].show = !list[Index].show || false;
    //变换其打开、关闭的状态
    if (list[Index].show) {
      //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }
    this.setData({
      list
    });
  },
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) {
      //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
      }
    }
  },
  onLoad: function (options) {
    //从云端获取数据库数据，添加到data的list里
    this.setData({
      openid: getApp().globalData.openid
    })
  },
  /*** 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /*** 生命周期函数--监听页面显示*/
  onShow: function () {},
  /*** 生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /*** 生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /*** 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {}
})