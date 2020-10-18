// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => { 
  const Users=db.collection("Users") 
  .where({ 
    openID : event.openID
  }).get(); 
  //当获取数据成功时，新增键值对flag：true 
  if((await Users).data.length!=0)(await Users).data[0]["flag"]=true 
  else (await Users).data.push({"flag":false}) 
  return Users 
}