import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/user'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: ''
  }
}

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		uploadedFilePrefix: 'http://wenzhou-sight.52br.net/api/upload/',
		token: '',
		name: '',
		avatar: ''
    },
    getters: {
		token: state => state.token,
		fileUpload: state => 'http://wenzhou-sight.52br.net/api/upload/'
	},
    mutations: {
		RESET_STATE: (state) => {
		   Object.assign(state, getDefaultState())
		},
		SET_TOKEN: (state, token) => {
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
		  getInfo(state.token).then(response => {
			const { data } = response

			if (!data) {
			  return reject('Verification failed, please Login again.')
			}

			const { name, photo } = data

			commit('SET_NAME', name)
			commit('SET_AVATAR', photo)
			resolve(data)
		  }).catch(error => {
			reject(error)
		  })
		})
	  },

	  // user logout
	  logout({ commit, state }) {
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
