import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		uploadedFilePrefix: 'http://wenzhou-sight.52br.net/api/upload/',
		token: getToken(),
		name: '',
		avatar: ''
    },
    getters: {
		token: state => state.token,
<<<<<<< HEAD
		name: state => state.name,
		fileUpload: state => 'http://wenzhou-sight.52br.net/api/upload/',
		uploadedFilePrefix: state => state.uploadedFilePrefix,
		needLoginPaths: state => ['/upload-picture']
=======
		fileUpload: state => 'http://wenzhou-sight.52br.net/api/upload/'
>>>>>>> b467e0659575e4b3bb6c29e31b7b150d88fe6710
	},
    mutations: {
		RESET_STATE: (state) => {
		   Object.assign(state, getDefaultState())
		},
		SET_TOKEN: (state, token) => {
		   // console.log("token:" + token)
		   state.token = token
		},
		SET_NAME: (state, name) => {
		    state.name = name
		},
		SET_AVATAR: (state, avatar) => {
		    state.avatar = avatar
		}
    },
    actions: {
		// user login
	  login({ commit }, userInfo) {
		const { account, pwd } = userInfo
		return new Promise((resolve, reject) => {
		  login({ account: account.trim(), pwd: pwd }).then(response => {
			const { data } = response
			commit('SET_TOKEN', data.accessToken)
			setToken(data.accessToken)
			commit('SET_NAME', data.displayUsername)
			commit('SET_AVATAR', data.imgPath)
			resolve()
		  }).catch(error => {
			reject(error)
		  })
		})
	  },

	  // get user info
	  getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
		  getInfo().then(response => {
			const { data } = response

			if (!data) {
			  return reject('登录信息验证失败，请重新登录')
			}

			const { displayUsername, imgPath } = data

			commit('SET_NAME', displayUsername)
			commit('SET_AVATAR', imgPath)
			resolve(data)
		  }).catch(error => {
			reject(error)
		  })
		})
	  },

	  // user logout
	  logout({ commit, state }) {
		  removeToken()
		  commit('SET_TOKEN', '')
		  commit('SET_NAME', '')
		  commit('SET_AVATAR', '')
		return new Promise((resolve, reject) => {
		  logout().then(() => {
			resolve()
		  }).catch(error => {
			reject(error)
		  })
		})
	  },

	  // remove token
	  resetToken({ commit }) {
		return new Promise(resolve => {
		  removeToken() // must remove  token  first
		  commit('RESET_STATE')
		  resolve()
		})
	  }
    }
})


export default store;
