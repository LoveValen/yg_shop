<template>
	<view>
		<view class="settle_content">
			<view class="left">
				<label class="radio">
					<radio color="#c00000" size="18" :checked="allChecked" @click="cancelAllChecked" /><text>全选</text>
				</label>
			</view>
			<view class="middle">
				合计:<text>￥{{totalMoney.toFixed(2)}}</text>
			</view>
			<view class="right" @click="settleHandler">
				结算({{total}})
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('cart', ['total', 'totalMoney', 'allChecked']),
			...mapState('user', ['token', 'address'])
		},
		methods: {
			...mapMutations('cart', ['cancelAll']),
			cancelAllChecked() {
				this.cancelAll(!this.allChecked)
			},
			settleHandler() {
				if (!this.token) return this.delayNavigate()
				if (!this.allChecked) return uni.$showMsg('没有勾选任何商品')
				if (!this.address) return uni.$showMsg('请填写收货地址')

			},
			// 延迟导航到 my 页面
			delayNavigate() {
				// 防止用户在定时器期间退出
				this.seconds = 3
				// 1. 展示提示消息，此时 seconds 的值等于 3
				this.showTips(this.seconds)
				// 2. 创建定时器，每隔一秒执行一次
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my'
						})
						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},
			// 展示倒计时的提示消息
			showTips(n) {
				// 调用 uni.showToast() 方法，展示提示消息
				uni.showToast({
					// 不展示任何图标
					icon: 'none',
					// 提示消息
					title: '请登录后在结算！' + n + '秒后自动跳转到登录页',
					// 为页面添加透明遮罩，防止点击穿透
					mask: true,
					// 1.5秒后自动消失
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="scss">
	.settle_content {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		padding: 5px 5px 0;
		background-color: #ffffff;
		z-index: 9999;
		border-top: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			text {
				margin-left: 5px;
				font-size: 14px;
				vertical-align: middle;
			}
		}

		.middle {
			text {
				color: #c00000;
			}
		}

		.right {
			width: 100px;
			height: 45px;
			line-height: 45px;
			text-align: center;
			background-color: #c00000;
			color: #ffffff;
			font-size: 14px;

		}
	}
</style>
