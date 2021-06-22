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

export function searchSingles(params) {
	return request({
	  url: 'index/single',
	  method: 'get',
	  params,
	  paramsSerializer: function(params) {
		return qs.stringify(params, {arrayFormat: 'repeat'})
	  }
	})
}

export function getGroupPics(groupId, params) {
	return request({
	  url: 'index/groupList/' + groupId,
	  method: 'get',
	  params
	})
}

export function masters() {
	return request({
	  url: 'index/master',
	  method: 'get'
	})
}

export function announcements() {
	return request({
		url: '/index/announcement',
		method: 'get'
	})
}

export function announcementDetail(id) {
	return request({
		url: '/index/announcement/' + id,
		method: 'get'
	})
}

export function hotSearchs() {
	return request({
		url: '/hotSearch',
		method: 'get'
	})
}

export function hotKeywords() {
	return request({
		url: '/hotKeyword',
		method: 'get'
	})
}



