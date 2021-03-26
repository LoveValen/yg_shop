export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	mutations: {
		setAddress(state, address) {
			uni.setStorageSync('address', JSON.stringify(address))
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
