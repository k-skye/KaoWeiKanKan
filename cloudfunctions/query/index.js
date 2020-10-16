// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = wx.cloud.database
  db.collection('Users').doc('8e5be7055f7ad07f014b8b613b58d83e').get({
    success: function(res) {
      // res.data 包含该记录的数据
      console.log(res.data)
    }
  })
  return {
   res
  }
}