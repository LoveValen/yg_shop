<template>
	<view class="user_container">
		<view class="container_top">
			<image class="avater" src="@/static/1728564_panjiachen_1584853269.png" mode=""></image>
			<text>White</text>
		</view>
		<view class="floor_list">
			<view class="floor_item floor_one">
				<view>
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view>
					<text>14</text>
					<text>收藏的商品</text>
				</view>
				<view>
					<text>18</text>
					<text>关注的商品</text>
				</view>
				<view>
					<text>84</text>
					<text>足迹</text>
				</view>
			</view>
			<view class="floor_item_two">
				<view class="">
					我的订单
				</view>
			</view>
			<view class="floor_item">
				<view>
					<image src="@/static/my-icons/icon1.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view>
					<image src="@/static/my-icons/icon2.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view>
					<image src="@/static/my-icons/icon3.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view>
					<image src="@/static/my-icons/icon4.png" mode=""></image>
					<text>待付款</text>
				</view>
			</view>
			<view class="floor_item_two">
				<view>
					收货地址
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view>
					联系客服
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view @click="logout">
					退出登录
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateAddress', 'updateUserInfo', 'updateToken']),
			async logout() {
				// 询问是否退出
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确定要退出吗?'
				}).catch(err => err)
				
				if (succ && succ.confirm) {
					this.updateAddress('{}')
					this.updateUserInfo('{}')
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
	.user_container {
		height: 100%;
		background-color: #f4f4f4;

		.container_top {
			height: 340rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #c00000;

			.avater {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				box-shadow: 0 2px 15px #b6b6b6;
				display: block;
			}

			text {
				margin-top: 10px;
				color: #FFFFFF;
				font-size: 16px;
				font-weight: 700;
			}
		}

		.floor_list {
			position: relative;
			top: -10px;

			// .floor_one{
			// 	margin-bottom: 10px;
			// }

			.floor_item {
				display: flex;
				justify-content: space-around;
				width: 90%;
				border-radius: 8px;
				padding: 10px 0;
				margin: 0 auto;
				background-color: #fff;

				view {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				image {
					display: block;
					width: 40px;
					height: 40px;
				}

			}

			.floor_item_two {
				width: 90%;
				box-sizing: border-box;
				background-color: #fff;
				padding: 0 10px;
				margin: 0 auto;
				border-radius: 8px;

				view {
					padding: 10px 0;
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
