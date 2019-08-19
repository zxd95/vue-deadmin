import request from '@/utils/request'

export function policy() {
  debugger
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}
