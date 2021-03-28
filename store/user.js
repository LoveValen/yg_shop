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
		setAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, user) {
			state.userInfo = user
			this.commit('user/setStorageUserInfo')
		},
		setStorageUserInfo(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.user))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('user/setStorageToken')
		},
		setStorageToken(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state,info){
			state.redirectInfo = info
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
