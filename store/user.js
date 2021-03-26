export default {
	state:()=>({
		userInfo:{}
	}),
	mutations:{
		setAddress(state,address){
			uni.setStorageSync('address',JSON.stringify(address))
		}
	},
	actions:{},
	getters:{}
}