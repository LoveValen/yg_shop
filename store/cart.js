export default {
	namespaced: true,
	state: () => ({
		cartInfo: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addCart(state, goods) {
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cartInfo.find(x => x.goods_id === goods.goods_id)

			if (!findResult) {
				// 如果购物车中没有这件商品，则直接 push
				state.cartInfo.push(goods)
			} else {
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count +=1
			}
			this.commit('cart/saveStorageCart')
		},
		saveStorageCart(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cartInfo))
		},
		updateCartStatus(state, cartGoodsInfo) {
			console.log(cartGoodsInfo)
			const findRes = state.cartInfo.find(item =>
				item.goods_id === cartGoodsInfo.goods_id
			)
			if (findRes) {
				findRes.goods_state = cartGoodsInfo.goods_state
				this.commit('cart/saveStorageCart')
			}
			// // 根据 goods_id 查询购物车中对应商品的信息对象
			// const findResult = state.cartInfo.find(x => x.goods_id === goods.goods_id)

			// // 有对应的商品信息对象
			// if (findResult) {
			// 	// 更新对应商品的勾选状态
			// 	findResult.goods_state = goods.goods_state
			// 	// 持久化存储到本地
			// 	this.commit('cart/saveStorageCart')
			// }
		},
		updateCartCount(state, cartCount) {
			const findRes = state.cartInfo.find(item => item.goods_id === cartCount.goods_id)
			if (findRes) {
				findRes.goods_count = cartCount.goods_count
				this.commit('cart/saveStorageCart')
			}
		},
		deleteCartCount(state,goodsId){
			state.cartInfo = state.cartInfo.filter(item => item.goods_id !== goodsId)
			this.commit('cart/saveStorageCart')
		}

	},
	actions: {

	},
	getters: {
		total(state) {
			let count = 0
			state.cartInfo.forEach(item => count += Number(item.goods_count))
			return count
		}
	}

}
