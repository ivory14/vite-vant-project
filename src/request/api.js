import Axios from '@/request/axios'

let getauth
let evalUrl
let myhref = location.href
let uomg
if(
  myhref.includes('localhost') ||
  myhref.includes('192.168.21') || 
  myhref.includes('192.168.6.30')
){
  // 内网
  evalUrl = 'http://192.168.6.30:32324/';
  getauth = 'http://192.168.6.30:32390/v3/'
  uomg = 'https://api.uomg.com/api/'
} else if (
  myhref.includes('192.168.6.30') ||
  myhref.includes('http://192.168.6.30')
) {
  // 内网
  evalUrl = 'http://192.168.6.30:32324/';
  getauth = 'http://192.168.6.30:32390/v3/'
  uomg = 'https://api.uomg.com/api/'
} else if (
  // 这些就是公司的域名了
  myhref.includes('https://www.yondor.cn') ||
  myhref.includes('http://www.yondor.cn') ||
  myhref.includes('www.yondor.cn')
) {
  // 外网
  evalUrl = '//www.yondor.cn/';
  getauth = '//login.k12china.com/v3/'
  uomg = 'https://api.uomg.com/api/'
} else {
  // 如果检测不到，当外网处理
  evalUrl = '//www.yondor.cn/';
  getauth = '//login.k12china.com/v3/'
  uomg = 'https://api.uomg.com/api/'
}
export {
  evalUrl,
  getauth
}

export const get = async (url) => {
  return await Axios.get(url)
}

export const post = async (url, param) => {
  return await Axios.post(url, param)
}

export const patch = async (url, param) => {
  return await Axios.patch(url, param);
}

export const DELETE = async (url) => {
  return await Axios.delete(url);
}

export const getAuth = async (params) => {
  return (params.method).toLocaleUpperCase() === 'POST'
    ? await post(getauth + params.url, params.data)
    : await get(getauth + params.url)
}

export const opEvalUrl = async (params) => {
  return (params.method).toLocaleUpperCase() === 'POST'
    ? await post(evalUrl + params.url, params.data)
    : params.method.toLocaleUpperCase() === 'PATCH'
    ? await patch(evalUrl + params.url, params.data)
    : (params.method).toLocaleUpperCase() === 'DELETE'
    ? await DELETE(evalUrl + params.url)
    : await get(evalUrl + params.url)
}
// 将LOFTER（乐乎）的首页壁纸解析出来
export const opUomgUrl = async (params) => {
  return (params.method).toLocaleUpperCase() === 'POST'
  ? await post(uomg + params.url, params.data)
  : await get(uomg + params.url);
}
// 此处推荐一个免费的api网站，供平时模拟使用  https://api.uomg.com/