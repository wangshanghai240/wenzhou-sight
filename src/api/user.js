import request from '@/utils/request'
const qs = require('qs')

export function upload(file) {
  let param = new FormData()
  param.append('file',file.file)
  return request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: param
  })
}

export function getInfo() {
	return request({
		url: 'userInfo',
		method: 'GET'
	})
}

export function login(params) {
	return request({
		url: '/login',
		params: params,
		method: 'POST'
	})
}

export function logout() {
	return request({
		url: '/logout',
		method: 'POST'
	})
}

export function register(data) {
	return request({
		url: '/register',
		method: 'POST',
		data: data
	})
}

export function smsSend(params) {
	return request({
		url: '/smsSend',
		method: 'POST',
		params: params
	})
}

export function resetPassword(params) {
	return request({
		url: 'resetPassword',
		method: 'POST',
		params: params
	})
}