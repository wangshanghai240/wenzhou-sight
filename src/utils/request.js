import axios from 'axios'

// 创建axios实例
const httpService = axios.create({
    baseURL: process.env.VUE_APP_BASE_REQUEST, // api 的 base_url
    timeout: process.env.VUE_APP_REQUEST_TIMEOUT // 请求超时时间
})

httpService.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

httpService.interceptors.response.use(
    response => {
		// console.log(response)
        return response.data;
    },error => {
        console.log(error);
        return Promise.reject(error.response?error.response.status:error);
    }
)
export default httpService
