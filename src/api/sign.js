import request from '@/utils/request'

// 查询 首页列表
export function getSignApi() {
  return request({
    // url: '/api/watch/mall/services/get/commodity/list',
    method: 'get'
  })
}

// 保存 更新 首页图片
export function saveSignApi(data) {
  debugger
  return request({
    // url: '/api/watch/mall/services/update/commodity/details',
    method: 'post',
    data: [data]
  })
}

// 删除 首页图片
export function deleteSignApi(rowId) {
  return request({
    // url: '/api/watch/mall/services/delete/commodity',
    method: 'delete',
    params: {
      rowId
    }
  })
}
