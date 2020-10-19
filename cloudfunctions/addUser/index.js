// 云函数入口文件
const cloud = require('wx-server-sdk')
const returnRule = require('./returnRule')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { s_ID, s_password } = event
  try {
    await db.collection('Users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _openid: OPENID,
        s_ID: s_ID,
        s_password: s_password
      }
    })
    return returnRule.success()
  } catch (e) {
    return returnRule.fail('添加用户到数据库失败', e)
  }
}