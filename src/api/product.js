import request from '@/utils/request'

// 查询 产品列表
export function getProductApi() {
  return request({
    url: '/api/watch/mall/services/get/commodity/list',
    method: 'get'
  })
}

// 保存 更新 产品图片
export function saveProductApi(data) {
  debugger
  return request({
    url: '/api/watch/mall/services/update/commodity/details',
    method: 'post',
    data: [data]
  })
}

// 删除 产品图片
export function deleteProductApi(rowId) {
  return request({
    url: '/api/watch/mall/services/delete/commodity',
    method: 'delete',
    params: {
      rowId
    }
  })
}
