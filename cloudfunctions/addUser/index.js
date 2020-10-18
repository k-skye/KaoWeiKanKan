// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let flag=db.collection('Users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openID: event.openID,
        s_ID: event.s_ID,
        s_password: event.s_password
      }
    })
    if(flag!=null)return {"flag":true}
    else return {"flag":false}
  } catch(e) {
    console.error(e)
  }
}