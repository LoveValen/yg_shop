export default {
	namespaced:true,
	state:()=>({
		cartInfo:JSON.parse( uni.getStorageSync('cart') || '[]')
	}),
	mutations:{
		addCart(state,goodsInfo){
			// console.log(goodsInfo)
			let index
			const isFind = state.cartInfo.some((item,i)=>{
				if(item.goods_id === goodsInfo.goods_id) index = i
				return item.goods_id === goodsInfo.goods_id
			})
			if(isFind){
				state.cartInfo[index].goods_count+=1
			}else{
				state.cartInfo.push(goodsInfo)
			}
		},
		saveStorageCart(state){
			uni.setStorageSync('cart',JSON.stringify(state.cartInfo))
		}
	},
	actions:{
		
	},
	getters:{
		total(state){
			let count
			state.cartInfo.forEach(item=>{
				count = item.goods_count
			})
			return count
		}
	}
	
}