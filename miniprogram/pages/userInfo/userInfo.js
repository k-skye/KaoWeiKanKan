// pages/userInfo/userInfo.js
const app = getApp()
Page({
  data: {
    s_ID: {},
    stuExam: {},
    exams: {},
    list: [{
      id: 0,
      name: '考试示例',
      open: true,
      date: '2020-1-1',
      time: '9:00~11:00',
      room: 'A1-101',
      seat: '01'
    }, ]


  },
  /**
   * 收缩核心代码
   */
  panel: function (e) {
    //获取到元素的id值
    var id = e.currentTarget.dataset.index;
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
  //查询所有信息
  selectAll: function () {
    var list = [];
    var stuExam = this.data.stuExam
    var exams = this.data.exams
    for (let i = 0; i < stuExam.length; i++) {
      var vote = {};
      vote.id = i
      vote.name = exams[i].e_name
      vote.room = stuExam[i].e_room
      vote.seat = stuExam[i].e_seat
      vote.open = false
      var time = stuExam[i].e_time.split('/')
      vote.date = time[0] + '-' + time[1] + '-' + time[2]
      vote.time = time[3]
      list.push(vote)
    }
    //仅第一项保留是true即可
    if (list.length > 0) {
      list[0].open = true
    }this.setData({
      list
    })
  },
  //查询本周
  selectThis: function () {
    let start = this.getTime(0)
    let fin = this.getTime(-6)
    var list = [];
    var stuExam = this.data.stuExam
    var exams = this.data.exams
    for (let i = 0; i < stuExam.length; i++) {
      var time = stuExam[i].e_time.split('/')
      var key = {
        year: Number(time[0]),
        month: Number(time[1]),
        date: Number(time[2])
      }
      if (this.judgeTime(start, fin, key)) {
        var vote = {};
        vote.id = i
        vote.name = exams[i].e_name
        vote.room = stuExam[i].e_room
        vote.seat = stuExam[i].e_seat
        vote.open = false
        vote.date = time[0] + '-' + time[1] + '-' + time[2]
        vote.time = time[3]
        list.push(vote)
      }
    }
    //仅第一项保留是true即可
    if (list.length > 0) {
      list[0].open = true
    }
    this.setData({
      list
    })
  },
  //查询下周
  selectNext: function () {
    let start = this.getTime(-7)
    let fin = this.getTime(-13)
    var list = [];
    var stuExam = this.data.stuExam
    var exams = this.data.exams
    for (let i = 0; i < stuExam.length; i++) {
      var time = stuExam[i].e_time.split('/')
      var key = {
        year: Number(time[0]),
        month: Number(time[1]),
        date: Number(time[2])
      }
      if (this.judgeTime(start, fin, key)) {
        var vote = {};
        vote.id = i
        vote.name = exams[i].e_name
        vote.room = stuExam[i].e_room
        vote.seat = stuExam[i].e_seat
        vote.open = false
        vote.date = time[0] + '-' + time[1] + '-' + time[2]
        vote.time = time[3]
        list.push(vote)
      }
    }
    //仅第一项保留是true即可
    if (list.length > 0) {
      list[0].open = true
    }
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
    //tuip123 10-29 获取全部考试信息，保存到页面中，后续根据条件进行下一步筛选
    wx.cloud.callFunction({
      name: "getExamData",
      data: {
        s_ID: app.globalData.userInfo.s_ID
      }
    }).then(res => {
      this.setData({
        stuExam: res.result.data.stuExam,
        exams: res.result.data.exams
      })
      this.selectAll()
    })
  },
  // 获取时间的代码
  // 上周的开始时间console.log(getTime(7));
  // 上周的结束时间console.log(getTime(1));
  // 本周的开始时间console.log(getTime(0));
  // 本周的结束时间console.log(getTime(-6));
  // 下周的开始时间console.log(getTime(-7));
  // 下周结束时间console.log(getTime(-13));
  getTime: function (n) {
    var now = new Date();
    var year = now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if (day !== 0) {
      n = n + (day - 1);
    } else {
      n = n + day;
    }
    if (day) {
      //这个判断是为了解决跨年的问题
      if (month > 1) {
        month = month;
      }
      //这个判断是为了解决跨年的问题,月份是从0开始的
      else {
        year = year - 1;
        month = 12;
      }
    }
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    var s = {
      year,
      month,
      date
    }
    return s;
  },
  judgeTime(start, fin, key) {
    var s = new Date(start.year, start.month, start.date).getTime() / 1000 - parseInt(new Date().getTime() / 1000)
    var f = new Date(fin.year, fin.month, fin.date).getTime() / 1000 - parseInt(new Date().getTime() / 1000)
    var k = new Date(key.year, key.month, key.date).getTime() / 1000 - parseInt(new Date().getTime() / 1000)
    let top = (k - s) / 60 / 60 / 24
    let low = (k - f) / 60 / 60 / 24
    if (top >= 0 && low <= 0) {
      return true
    } else {
      return false
    }
  }
})