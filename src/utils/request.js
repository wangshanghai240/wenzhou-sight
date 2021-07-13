import axios from 'axios'
import store from '@/store'
import Modal from "ant-design-vue/lib/modal";
import message from "ant-design-vue/lib/message";
// import { getToken } from '@/utils/auth';

// 创建axios实例
const httpService = axios.create({
    baseURL: process.env.VUE_APP_BASE_REQUEST, // api 的 base_url
	withCredentials: true,
    timeout: process.env.VUE_APP_REQUEST_TIMEOUT // 请求超时时间
})

httpService.interceptors.request.use(
    config => {
		if (store.getters.token) {
		  // let each request carry token
		  // ['X-Token'] is a custom headers key
		  // please modify it according to the actual situation
		  config.headers['token'] = store.getters.token
		  // getToken()
		  //
		}
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

httpService.interceptors.response.use(
    response => {
        const res = response.data;
		if(res.code !==0 && res.code!== 200) {
			// this.$message.error(res.msg)
			if(res.code === 7777) {
			// 	console.log("登录超时")
				const modal = Modal.confirm({
					title: '请先登录',
					content: '登录失效，点击确认前往登录，取消留在本页',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						var url = window.location.href
						var redirect = url.substring(url.indexOf('#') + 1)
						window.location.replace(url.substring(0, url.indexOf('#') + 1) + '/login?redirect=' + redirect)
					},
					onCancel() {
						
					}
				})
			} else {
				message.error(res.msg)
			}
			return Promise.reject(new Error(res.msg || 'Error'))
		} else {
			return res
		}
    }, error => {
        console.log(error);
        return Promise.reject(error.response?error.response.status:error);
    }
)
export default httpService
