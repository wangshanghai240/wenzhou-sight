import request from '@/utils/request'
const qs = require('qs')

<<<<<<< HEAD
export function submitResGroup(data) {
	return request({
		url: '/upload/submitResGroup',
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		data: JSON.stringify(data)
	})
}

export function uploadResourceV2(data) {
	return request({
		url: '/upload/uploadResourceV2',
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		data: JSON.stringify(data)
	})
}

export function myUploads() {
	return request({
		url: '/upload/myUploads',
		method: 'GET'
	})
}

=======
>>>>>>> b467e0659575e4b3bb6c29e31b7b150d88fe6710
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

<<<<<<< HEAD
export function getInfo() {
	return request({
		url: 'userInfo',
		method: 'GET'
	})
}
=======
>>>>>>> b467e0659575e4b3bb6c29e31b7b150d88fe6710

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