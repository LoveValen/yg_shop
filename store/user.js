export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// token:JSON.parse(uni.getStorageSync('token')) || '',
		token:'',
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
	}),
	mutations: {
		updateAddress(state,address){
			state.address = address
			this.commit('user/setAddress')
		},
		setAddress(state, address) {
			uni.setStorageSync('address', JSON.stringify(address))
		},
		updateUserInfo(state,user){
			state.userInfo = user
			this.commit('user/setStorageUserInfo')
		},
		setStorageUserInfo(state,user){
			uni.setStorageSync('userInfo',JSON.stringify(user))
		},
		updateToken(state,token){
			state.token = token
			this.commit('user/setStorageToken')
		},
		setStorageToken(state,token){
			uni.setStorageSync('token',token)
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
