// 云函数入口文件
const cloud = require('wx-server-sdk')
const returnRule = require('./returnRule')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  try {
    const user = await db.collection("Users")
      .where({
        _openid: OPENID
      }).get();
    if (user.data.length != 0) {
      return returnRule.success(user.data[0])
    } else {
      return returnRule.fail('用户不存在')
    }
  } catch (error) {
    return returnRule.fail('查找用户信息失败', e)
  }
}