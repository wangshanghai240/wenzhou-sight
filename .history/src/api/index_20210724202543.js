import request from '@/utils/request'
const qs = require('qs')

export function index() {
  return request({
    url: 'index/index',
    method: 'get'
  })
}

export function activities() {
	return request({
	  url: 'index/event/1',
	  method: 'get'
	})
}

export function activityDetail(id) {
	return request({
		url: 'index/eventDetail/' + id,
		method: 'get'
	})
}

export function hotTopicList() {
	return request({
	  url: 'index/hotList',
	  method: 'get'
	})
}

// export function hotTopicDetail(id) {
// 	return request({
// 		url: 'index/hotTopic/' + id,
// 		method: 'get'
// 	})
// }

export function hotTopicByHotId(hotId) {
	return request({
		url: 'index/hotTopicByHotId/' + hotId,
		method: 'GET'
	})
}

export function categories() {
	return request({
		url: 'index/categories',
		method: 'get'
	})
}

export function categoryTree() {
	return request({
		url: 'index/categoryTree',
		method: 'GET'
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

export function masters(params) {
	return request({
	  url: 'index/master',
	  method: 'get',
	  params
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
		url: '/index/hotSearch',
		method: 'get'
	})
} 

export function hotSearch(id) {
	return request({
		url: '/index/hotSearch/' + id,
		method: 'get'
	})
}

export function hotKeywords() {
	return request({
		url: '/index/hotKeyword',
		method: 'get'
	})
}

export function carouses() {
	return request({
		url: '/index/carouse',
		method: 'get'
	})
}





