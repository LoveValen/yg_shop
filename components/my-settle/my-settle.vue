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
			...mapGetters('user', ['addressDetail']),
			...mapState('user', ['token', 'address']),
			...mapState('cart', ['cartInfo'])
		},
		methods: {
			...mapMutations('cart', ['cancelAll']),
			...mapMutations('user', ['updateRedirectInfo']),
			cancelAllChecked() {
				this.cancelAll(!this.allChecked)
			},
			settleHandler() {
				if (!this.token) return this.delayNavigate()
				if (!this.allChecked) return uni.$showMsg('没有勾选任何商品')
				if (!this.address) return uni.$showMsg('请填写收货地址')
				// 实现微信支付功能
				this.payOrder()

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
							url: '/pages/my/my',
							success:()=> {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
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
			},
			// 微信支付
			async payOrder() {
				// 1.创建订单
				// 1.1 组织订单的信息对象
				const orderInfo = {
					// 开发期间，注释掉真实的订单价格
					// order_price:this.totalMoney
					// 写死订单总价为1分钱
					order_price: 0.01,
					consigee_addr: this.addressDetail,
					goods: this.cartInfo.filter(item => item.goods_state).map(goods => {
						return {
							goods_id: goods.goods_id,
							goods_number: goods.goods_count,
							goods_price: goods.goods_price
						}
					})
				}
				// 1.2 发起请求创建订单
				const {data:res } = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				// 1.3 得到服务器响应的"订单编号"
				const orderNumber = res.message.order_number
				
				// 2. 发起订单预支付
				// 2.1 发起请求获取订单的支付信息
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				if(res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
				// 2.3 得到订单支付相关的必要参数
				const payInfo = res2.message.pay
				
				// 3. 发起微信支付
				// 3.1 调用 uni.requestPayment() 发起微信支付
				const [err,succ] = await uni.requestPayment(payInfo)
				// 3.2 未完成支付
				if(err) return uni.$showMsg('订单未支付！')
				// 3.3 完成了支付，进一步查询支付的结果
				const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				// 3.4 检测到订单未支付
				if(res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
				// 3.5 检测到订单支付完成
				uni.showToast({
					title:'支付成功！',
					icon:'success'
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
