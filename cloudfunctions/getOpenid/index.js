const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  //需要通过查询openID来取得用户是否绑定
  return {
    _openid: OPENID,
  }
}