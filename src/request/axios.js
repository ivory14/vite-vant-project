import axios from 'axios';
import router from '@/router';
import Cookies from 'js-cookie';
import qs from 'qs'
import { Toast } from 'vant'

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 状态码：由3位数字组成，第一个数字定义了响应的类别

    // 1xx：指示消息,表示请求已接收，继续处理

    // 2xx：成功,表示请求已被成功接收，处理
    // 无内容。服务器成功处理，但未返回内容。一般用在只是客户端向服务器发送信息，
    // 而服务器不用向客户端返回什么信息的情况。不会刷新页面。
    case 204: 
      console.log("服务器成功处理，但未返回内容。");
    break;
    // 服务器已经完成了部分GET请求（客户端进行了范围请求）。响应报文中包含Content-Range指定范围的实体内容
    case 206: 
      console.log("服务器已经完成了部分GET请求");
    break;
    // 3xx 重定向
    case 301:
      console.log("重定向");
    break;
      
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    break;
    // 403 token过期
    // 登录过期对用户进行提示
    // 清除本地token和清空vuex中token对象
    // 跳转登录页面  
    case 403:
      Toast.fail('登录过期，请重新登录');
      // 清除token
      localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {                     
        router.replace({                            
            path: '/login',                            
            query: { 
              redirect: router.currentRoute.value.fullPath
            }                        
        });                    
    }, 1000);                    
    break;
    // 404请求不存在
    case 404:
      Toast.fail('网络请求不存在');
    break;
    default:
      console.log(other);
  }
}


const axiosInstance = axios.create({
  // axios实例配置
  timeout: 15000,
  method: 'post',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  transformRequest: [
    (data) => {
      // 请求前参数序列化
      return JSON.stringify(data)
      // return qs.stringify(data) // qs 是form-data 的请求
    }
  ]
})


// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    // const token = store.state.token;
    // token 的存放有很多种 可以放在 vuex cookies sessionStorage localStorage 等中
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': 'token ' + Cookies.get('AUTH_ID')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 返回拦截
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 第一种情况：判断是否登录 未登录就跳转到登录页面
    const { status, data } = response;
    if(status === 200){
      
      if(data.code === 401) { // 这里应该是和后端人员商量好 code 为401 就是未登录
        Toast.fail("未登录，请重新登录");
        router.push({name: 'login'})
      }
      // return data; // 如果只返回data 对吗？ 按照郭总说的 ，应该是要判断状态码的 所有我就返回了 response
      return data;
    }else{
      console.error('出错了！' ,response);
      return Promise.reject(response);
    }
  },
  (error) => {
    // 对响应错误做点什么

    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    const { response } = error
    if(response){
      errorHandle(response.status,response.data.message);
      return Promise.reject(response);
    }else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit('changeNetwork', false);
      } else {
          return Promise.reject(error);
      }
    }
    return Promise.reject(error)
  }
)



export default axiosInstance