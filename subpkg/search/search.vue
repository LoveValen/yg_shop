<template>
	<view class="search_body">
		<view class="search_sticky">
			<uni-search-bar :radius="100" :focus="true" placeholder="请输入搜索词" @input="inputHandler" cancelButton="none">
			</uni-search-bar>
		</view>
		<view class="search_list">
			<view v-for="(item,index) in searchList" :key="index" @click="navToDetail(item.goods_id)">
				<view>
					<text>{{item.goods_name}}</text>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: '',
				keyWords: '',
				searchList: []
			};
		},
		methods: {
			navToDetail(id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+id
				})
			},
			inputHandler(val) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyWords = val
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if(!this.keyWords) return this.searchList = []
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyWords
				})
				if (meta.status !== 200) return uni.$showMsg()
				this.searchList = message
			}
		}

	}
</script>

<style lang="scss">
	::v-deep .uni-searchbar {
		background-color: #c00000;
	}
	.search_sticky{
		position: sticky;
		top: 0;
	}
	
	.search_list{
		&>view>view{
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20rpx;
			text{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
