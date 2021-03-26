export default {
	namespaced:true,
	state:()=>({
		cartInfo:[]
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