<template>
	<view>
		<view class="goods_item" @click="clickHandler">
			<view class="goods_item_left">
				<!-- 勾选框 -->
				<radio v-if="showRadio" :checked="goods.goods_state" color="#C00000" @click="removeCartList"></radio>
				<image class="image" :src="goods.goods_small_logo || defaultPic" mode=""></image>
			</view>
			<view class="goods_name">
				<view class="text">{{goods.goods_name}}</view>
				<view class="numBox">
					<view class="goods_price">￥{{goods.goods_price | formatPrice}}</view>
					<!-- 商品数量 -->
					<uni-number-box v-if="showNumber" :min="1" @change="changeCount" :value="goods.goods_count"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods_list",
		props: {
			goods: {
				type: Object,
				default: () => {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumber: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			formatPrice(val) {
				return Number(val).toFixed(2)
			}
		},
		methods: {
			clickHandler() {
				this.$emit('click', this.goods.goods_id)
			},
			removeCartList() {
				this.$emit('removeCartList', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			changeCount(val){
				this.$emit('changeCount',{
					goods_id: this.goods.goods_id,
					goods_count: Number(val)
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods_item {
		display: flex;
		padding: 10px 10rpx;
		border-bottom: 1px solid #efefef;

		.goods_item_left {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.image {
			width: 100px;
			height: 100px;
			display: block;
		}

		.goods_name {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10rpx;
			
			.numBox{
				margin: 5px 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.goods_price {
					color: #c00000;
				}
				
			}

			.text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}

	}
</style>
