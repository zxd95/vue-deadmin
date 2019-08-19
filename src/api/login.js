import request from '@/utils/request'

// 登录
export function loginApi(userName, passWord) {
  return request({
    url: '/api/watch/mall/services/login',
    method: 'get',
    params: {
      userName,
      passWord
    }
  })
}
