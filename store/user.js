export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		// token:'',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('user/setAddress')
		},
		setAddress(state, address) {
			uni.setStorageSync('address', JSON.stringify(address))
		},
		updateUserInfo(state, user) {
			state.userInfo = user
			this.commit('user/setStorageUserInfo')
		},
		setStorageUserInfo(state, user) {
			uni.setStorageSync('userInfo', JSON.stringify(user))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('user/setStorageToken')
		},
		setStorageToken(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, redirectInfo) {
			state.redirectInfo = redirectInfo
		}
	},
	getters: {
		addressDetail(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address

			return provinceName + cityName + countyName + detailInfo
		}
	}
}
