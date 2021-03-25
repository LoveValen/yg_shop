<template>
	<view class="goods_list">
		<block v-for="(goods,index) in goodsList" :key="index">
			<goodsList :goods="goods"></goodsList>
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
					pagenum: '1',
					pagesize: '10'
				},
				total: 0,
				goodsList: []
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			async getGoodsList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (meta.status !== 200) return uni.$showMsg()
				this.goodsList = message.goods
			}
		}
	}
</script>

<style lang="scss">
	
</style>
