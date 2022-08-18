import { opUomgUrl } from '@/request/api'

// 将LOFTER（乐乎）的首页壁纸解析出来
export function lofterImg(params) {
  return opUomgUrl({
    method: 'get',
    url: 'image.lofter?format=json',
  })
}

// 随机输出淘宝买家秀图片
export function randTaobImg(params) {
  return opUomgUrl({
    method: 'get',
    url: 'rand.img3?sort=七了个三&format=json',
  })
}

// 随机输出土味情话
export function randQinghua(params) {
  return opUomgUrl({
    method: 'get',
    url: 'rand.qinghua?format=json',
  })
}

// 随机网易云音乐
// sort	否	string	选择输出分类[热歌榜|新歌榜|飙升榜|抖音榜|电音榜]，为空输出热歌榜
// mid	否	int	网易云歌单ID
// format	否	string	选择输出格式[json|mp3]
export function randMusic(params) {
  return opUomgUrl({
    method: 'get',
    url: 'rand.music?sort=热歌榜&format=json',
  })
}