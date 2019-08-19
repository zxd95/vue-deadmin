import request from '@/utils/request'

// 查询 轮播图列表
export function getBannerApi() {
  return request({
    url: '/api/watch/mall/services/get/carouselMap',
    method: 'get'
  })
}

// 保存 轮播图图片
export function saveBannerApi(data) {
  debugger
  return request({
    url: '/api/watch/mall/services/save/carouselMap',
    method: 'post',
    data: [data]
  })
}

// 删除 轮播图图片
export function deleteBannerApi(rowId) {
  return request({
    url: '/api/watch/mall/services/delete/carouselMap',
    method: 'delete',
    params: {
      rowId
    }
  })
}
