import { defineStore } from 'pinia'
import GoEasy from 'goeasy'
import { generatorUuid } from '@/utils'
// import jwt from "jsonwebtoken"

const USERID = 'USERID'

const getUserId = () => {
  let id = ''
  if (window.localStorage.getItem(USERID)) {
    id = window.localStorage.getItem(USERID)!
  } else {
    id = generatorUuid();
    window.localStorage.setItem(USERID, id)
  }
  return id
}

export const useEasyGoStore = defineStore('useEasyGoStore', () => {
  const goeasy = GoEasy.getInstance({
    host: "hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey: "BC-4f82115caf9f487392c3f2bec14175e3",
    modules: ['pubsub']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
  });

  const pubsub = goeasy.pubsub;

  const id = getUserId()

  const connect = () => {
    //建立连接
    goeasy.connect({
      id, //pubsub选填，im必填，最大长度60字符
      data: { "nickname": id }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
      onSuccess: function () {  //连接成功
        console.log("GoEasy connect successfully.") //连接成功
      },
      onFailed: function (error) { //连接失败
        console.warn("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
      },
      onProgress: function (attempts) { //连接或自动重连中
        console.log("GoEasy is connecting", attempts);
      }
    });
  }

  const disconnect = () => {
    //断开连接
    goeasy.disconnect({
      onSuccess: function () {
        console.log("GoEasy disconnect successfully.")
      },
      onFailed: function (error) {
        console.warn("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
      }
    });
  }

  // getPubSubAccessToken(id, channel) safe buffer bug
  const accessToken = 'accessToken'

  /**
   * 推送消息
   * @param channel 
   * @param message 
   */
  const send = (channel: string, message: string) => {
    pubsub.publish({
      channel,//替换为您自己的channel
      message,//替换为您想要发送的消息内容
      onSuccess: function () {
        console.log("消息发布成功。");
      },
      onFailed: function (error) {
        console.warn("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
      },
      accessToken
    });
  }

  /**
   * 订阅
   * @param channel 
   */
  const receive = (channel: string, options?: { onSuccess?: (channel: string) => void, onMessage?: (msg: string) => void }) => {
    pubsub.subscribe({
      channel,//替换为您自己的channel
      onMessage: function (message) {
        console.log("Channel:" + message.channel + " content:" + message.content);
        options?.onMessage?.(message.content)
      },
      onSuccess: function () {
        console.log("Channel订阅成功。");
        options?.onSuccess?.(channel)
      },
      onFailed: function (error) {
        console.warn("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
      },
      accessToken
    });
  }

  /**
   * 取消订阅
   * @param channel 
   */
  const unsubscribe = (channel: string) => {
    pubsub.unsubscribe({
      channel,
      onSuccess: function () {
        console.log("订阅取消成功。");
      },
      onFailed: function (error) {
        console.warn("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
      }
    });
  }

  const getOnlineUser = () => {
    pubsub.hereNow({
      channels: [],
      includeUsers: true, //可选项，是否返回用户列表，默认false
      distinct: false, //可选项，相同userId的客户端，列表中只保留一个，默认false,
      onSuccess: function (response) {  //获取成功
        alert("hereNow response: " + JSON.stringify(response));//json格式的response           
      },
      onFailed: function (error) { //获取失败
        console.warn("Failed to obtain online clients, code:" + error.code + ",error:" + error.content);
      }
    });
  }

  connect()

  return {
    goeasy,
    send,
    receive,
    unsubscribe,
    connect,
    disconnect,
  }
})

/**
 * 获取 accesstoken
 * @param id
 * @param channel
 * @returns
 */
// const getPubSubAccessToken = (id: string, channel: string) => {
//   let payload = {
//     id,  //发送方,必须与connect GoEasy时传入的id一致
//     channel, //接收方，授权的channel
//     w: true, //写权限，是否允许发送(publish)
//     r: true //读全新，是否允许接收（subscriber）
//   };

//   let options = {
//     expiresIn: "1634109917"  //token的有效时间，最长不能超过3小时，为了安全，GoEasy不接受有效时间大于3小时的access token
//   };

//   let secretKey = 'e5d9203919f14824';  //应用的秘钥Secret key，登陆GoEasy->应用详情->Professional keys->Secret key

//   //签名，生成access token
//   let accessToken = jwt.sign(payload, secretKey, options);
//   return accessToken
// }