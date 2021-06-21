import request from '@/utils/request'
const qs = require('qs')

export function index() {
  return request({
    url: 'index/index',
    method: 'get'
  })
}

export function hotTopicList() {
	return request({
	  url: 'index/hotListMore',
	  method: 'get'
	})
}

export function hotTopicDetail(params) {
	return request({
	  url: 'index/detail',
	  method: 'get',
	  params,
	  paramsSerializer: function(params) {
		return qs.stringify(params, {arrayFormat: 'repeat'})
	  }
	})
}
