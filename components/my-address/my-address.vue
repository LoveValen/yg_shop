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
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {};
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addressDetail'])
		},
		methods: {
			...mapMutations('user', ['updateAddress']),
			// 选择收货地址
			async chooseAddress() {
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				// 返回值是一个数组，第一项为错误对象，第二项为成功之后的收货地址对象
				const [err, success] = await uni.chooseAddress().catch(err => err)
				// 2. 用户成功的选择了收货地址
				if (err === null && success.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					// this.address = success
					this.updateAddress(success)
				}
				// 3. 用户没有授权
				if (err && err.errMsg === 'chooseAddress:fail auth deny') {
					this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
				}
			},
			// 调用此方法，重新发起收货地址的授权
			async reAuth() {
				// 3.1 提示用户对地址进行授权
				const [err2, confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消",
				})

				// 3.2 如果弹框异常，则直接退出
				if (err2) return

				// 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
				if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')

				// 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
				if (confirmResult.confirm) return uni.openSetting({
					// 3.4.1 授权结束，需要对授权的结果做进一步判断
					success: (settingResult) => {
						// 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
						if (settingResult.authSetting['scope.address']) return uni.$showMsg(
							'授权成功！请选择地址')
						// 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg(
							'您取消了地址授权！')
					}
				})
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
