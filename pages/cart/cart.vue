<template>
	<view class="cart">
		<view class="cart_top">
			<uni-icons class="shop_icon" type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		<block v-for="(cart,index) in cartInfo" :key="index">
			<goodsList @changeCount="changeCount" @removeCartList="showCartList" :showNumber="true" :showRadio="true"
				:goods="cart"></goodsList>
		</block>
	</view>
</template>

<script>
	import badgeMixins from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgeMixins],
		computed: {
			...mapState('cart', ['cartInfo'])
		},
		methods: {
			...mapMutations('cart', ['updateCartStatus', 'updateCartCount']),
			showCartList(val) {
				this.updateCartStatus(val)
			},
			changeCount(val) {
				this.updateCartCount(val)
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		.cart_top {
			display: flex;
			align-items: center;
			height: 40px;
			border-bottom: 1px solid #b6b6b6;

			.shop_icon {
				margin: 0 10px;
			}

		}
	}
</style>
