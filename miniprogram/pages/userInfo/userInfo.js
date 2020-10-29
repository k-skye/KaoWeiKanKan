// pages/userInfo/userInfo.js
const app = getApp()
Page({
  data: {
    s_ID: {},
    list: [{
        id: 0,
        name: '考试示例',
        open: true,
        date: '2020-1-1',
        time: '9:00~11:00',
        room: 'A1-101',
        seat: '01'
      },
    ]
  },
  /**
   * 收缩核心代码
   */
  panel: function (e) {
    //获取到元素的id值
    var id = e.currentTarget.dataset.index;
    console.log(id)
    //获取到全部数据
    let list = this.data.list;
    //判断编号是否相等，相等的取反，不等的收起
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
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
    //tuip123 10-22 好像wxml页面不能直接访问app.globaldata，我把学号提取出来
    var that = this;
    that.setData({
      s_ID: app.globalData.userInfo.s_ID
    })

    console.log(this.data.s_ID)
    wx.cloud.callFunction({
      name: "getExamData",
      data: {
        s_ID: app.globalData.userInfo.s_ID
      }
    }).then(res => {
      //TODO 考试名等bug修复后重新设置
      var list = [];
      var stuExam = res.result.data.stuExam
      var exams = res.result.data.exams
      console.log(stuExam)
      console.log(exams)
      for (let i = 0; i < stuExam.length; i++) {
        var vote = {};
        vote.id=i
        //vote.name='考试'+i
        vote.name=exams[i].e_name
        vote.room=stuExam[i].e_room
        vote.seat=stuExam[i].e_seat
        vote.open=false
        var time=stuExam[i].e_time.split('/')
        vote.date=time[0]+'-'+time[1]+'-'+time[2]
        vote.time=time[3]
        console.log(vote)
        list.push(vote)
      }
      //仅第一项保留是true即可
      list[0].open=true
      this.setData({
        list
      })

    })
  }


})