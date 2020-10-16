const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  const wxContext = cloud.getWXContext()
  let openid=wxContext.OPENID
  console.log(openid)
  //需要通过查询openID来取得用户是否绑定
  return {
    event,
    openid: openid,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
    userI: 1
  }
}