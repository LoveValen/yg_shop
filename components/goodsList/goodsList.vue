<template>
	<view>
		<view class="goods_item" @click="clickHandler">
			<view>
				<image class="image" :src="goods.goods_small_logo || defaultPic" mode=""></image>
			</view>
			<view class="goods_name">
				<view class="text">{{goods.goods_name}}</view>
				<view class="goods_price">￥{{goods.goods_price | formatPrice}}</view>
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
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			formatPrice(val){
				return Number(val).toFixed(2)
			}
		},
		methods:{
			clickHandler(){
				this.$emit('click',this.goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_item {
		display: flex;
		padding: 10px 10rpx;
		border-bottom: 1px solid #efefef;

		.image {
			width: 100px;
			height: 100px;
			display: block;
		}

		.goods_name {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10rpx;

			.text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

			.goods_price {
				color: #c00000;
			}
		}
	}
</style>
