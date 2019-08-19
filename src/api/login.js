import request from '@/utils/request'

// 登录
export function loginApi(userName, passWord) {
  return request({
    url: '/api/login',
    method: 'get',
    params: {
      userName,
      passWord
    }
  })
}

// export function getInfo() {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//   })
// }

// export function logout() {
//   return request({
//     url: '/admin/logout',
//     method: 'post'
//   })
// }
