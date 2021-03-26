<template>
	<view>
		<view class="address_content">
			<view class="address_top">
				<view class="address_check" v-if="Object.keys(address).length === 0" @click="chooseAddress">
					请选择收货地址+
				</view>
				<view class="address_detail" v-else>
					<view class="row1">
						<view>收件人: {{address.userName}}</view>
						<view>电话: {{address.telNumber}}
							<uni-icons type="arrowright" class="right"></uni-icons>
						</view>
					</view>
					<view class="row2">
						<view class="row2_left">
							收货地址:
						</view>
						<view class="row2_right">
							{{addressDetail}}
						</view>
					</view>
				</view>
			</view>
			<image src="@/static/cart_border@2x.png" mode="widthFix" class="bottom"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {}
			};
		},
		methods: {
			// 选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				// 返回值是一个数组，第一项为错误对象，第二项为成功之后的收货地址对象
				const [err, success] = await uni.chooseAddress().catch(err => err)
				// 2. 用户成功的选择了收货地址
				if (err === null && success.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					this.address = success
				}
			}
		},
		computed: {
			addressDetail() {
				const {
					provinceName,
					cityName,
					countyName,
					detailInfo
				} = this.address

				return provinceName + cityName + countyName + detailInfo
			}
		}
	}
</script>

<style lang="scss">
	.address_content {
		width: 100%;

		.address_top {
			box-sizing: border-box;
			height: 100px;
			display: flex;
			padding: 5px;

			.address_check {
				width: 60%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background-color: #0CD964;
				border-radius: 10px;
				color: #fff;
				margin: auto;

			}

			.address_detail {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				font-size: 13px;

				.row1 {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.right {
						margin-left: 5px;
						vertical-align: middle;
					}

				}

				.row2 {
					display: flex;

					.row2_right {
						margin-left: 5px;
					}
				}
			}
		}

		.bottom {
			width: 100%;
		}
	}
</style>
