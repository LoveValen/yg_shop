<template>
	<view class="goods_list">
		<block v-for="(goods,index) in goodsList" :key="index">
			<goodsList :goods="goods" @click="goToNavigator"></goodsList>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 5
				},
				total: 0,
				goodsList: [],
				isLoading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.goodsList.length = 0
			this.queryObj.pagenum =1
			this.getGoodsList(uni.stopPullDownRefresh)
		},
		// 上拉加载
		onReachBottom(){
			if(!false){
				if(this.queryObj.pagenum*this.queryObj.pagesize >this.total) return uni.$showMsg('没有更多数据了')
				this.isLoading = true
				this.queryObj.pagenum +=1
				this.getGoodsList()
			}
		},
		methods: {
			async getGoodsList(callback) {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...message.goods]
				this.total = message.total
				this.onLoading = false
				callback && callback()
			},
			goToNavigator(val){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+val
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
