<template>
	<view class="container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 为登录的 button 按钮绑定 open-type="getUserInfo" 属性，表示点击按钮时，希望获取用户的基本信息： -->
		<!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
		<!-- open-type="getUserInfo" -->
		<button type="primary" class="btn_login" size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo">
			一键登录
		</button>
		<view class="more">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "login",
		data() {
			return {

			};
		},
		computed:{
			...mapState('user',['redirectInfo'])
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken','updateRedirectInfo']),
			// 获取微信用户的基本信息
			getUserInfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权')
				// 将用户的基本信息存储到 vuex 中
				this.updateUserInfo(e.detail.userInfo)
				// 获取登录成功后的 Token 字符串
				this.getToken(e.detail)
				console.log(e)
			},
			// 调用微信登录接口，换取永久的 token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// console.log(res)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 微信登录换取token
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginResult.meta.status !== 200) {
					// loginResult.message.token判断是否有token
					this.updateToken('token')
					return uni.$showMsg('登录失败！')
				}
				this.updateToken(loginResult.message.token)
				uni.$showMsg('登录成功')
				this.navigateBack()
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:()=> {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #efefef;
		height: 750rpx;

		.btn_login {
			width: 80%;
			height: 40px;
			line-height: 40px;
			border-radius: 20px;
			font-size: 14px;
			background-color: #c00000;
			margin: 10px 0;
		}

		.more {
			font-size: 12px;
			color: #aaaaaa;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: -30px;
			left: 0;
			width: 100%;
			height: 60px;
			background-color: #ffffff;
			border-radius: 50%;
		}
	}
</style>
