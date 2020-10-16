// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let s_ID=event.s_ID
  let s_password=event.s_password
  let openid=wxContext.OPENID
  console.log("tuip123")
  console.log(openid)
  console.log(s_password)
  try {
    return await db.collection('Users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openID: openid,
        s_ID: s_ID,
        s_password: s_password
      }
    })
  } catch(e) {
    console.error(e)
  }
}