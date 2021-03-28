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
	import {mapState, mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('cart',['total','totalMoney','allChecked']),
			...mapState('user',['token','address'])
		},
		methods:{
			...mapMutations('cart',['cancelAll']),
			cancelAllChecked(){
				this.cancelAll(!this.allChecked)
			},
			settleHandler(){
				if(!this.token) return uni.$showMsg('请登录!')
				if(!this.allChecked) return uni.$showMsg('没有勾选任何商品')
				if(!this.address) return uni.$showMsg('请填写收货地址')
			}
		}
	}
</script>

<style lang="scss">
.settle_content{
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
	
	.left{
		text{
			margin-left: 5px;
			font-size: 14px;
			vertical-align: middle;
		}
	}
	
	.middle{
		text{
			color: #c00000;
		}
	}
	
	.right{
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
