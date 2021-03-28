<template>
	<view class="cart">
		<view v-if="cartInfo.length>0">
			<my-address></my-address>
			<view class="cart_top">
				<uni-icons class="shop_icon" type="shop" size="18"></uni-icons>
				<text>购物车</text>
			</view>
			<block v-for="(cart,index) in cartInfo" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="deleteGoods(cart)">
						<goodsList @changeCount="changeCount" @removeCartList="showCartList" :showNumber="true"
							:showRadio="true" :goods="cart"></goodsList>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</block>
			<my-settle></my-settle>
		</view>
		<view class="empty" v-else>
			<image class="empty_image" src="@/static/cart_empty@2x.png" mode=""></image>
			<text>空空如也</text>
		</view>
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
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		mixins: [badgeMixins],
		computed: {
			...mapState('cart', ['cartInfo'])
		},
		methods: {
			...mapMutations('cart', ['updateCartStatus', 'updateCartCount', 'deleteCartCount']),
			showCartList(val) {
				this.updateCartStatus(val)
			},
			changeCount(val) {
				this.updateCartCount(val)
			},
			deleteGoods(goods) {
				this.deleteCartCount(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		margin-bottom: 50px;
		
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
	
	.empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 300rpx;
		
		.empty_image{
			width: 90px;
			height: 90px;
			display: block;
			margin-bottom: 10px;
		}
	}
</style>
