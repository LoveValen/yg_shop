<template>
	<view class="search_body">
		<!-- 搜索框 -->
		<view class="search_sticky">
			<uni-search-bar :radius="100" :focus="true" placeholder="请输入搜索词" @input="inputHandler" cancelButton="none">
			</uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<view class="search_list">
			<view v-for="(item,index) in searchList" :key="index" @click="navToDetail(item.goods_id)">
				<view>
					<text>{{item.goods_name}}</text>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-if="searchList.length===0">
			<view class="history_wapper">
				<text>搜索历史</text>
				<uni-icons type="trash-filled"></uni-icons>
			</view>
			<view class="history_item">
				<view v-for="(value,index) in historys" :key="index">
					<uni-tag :text="value" @click="bindClick(value)" type="primary"></uni-tag>
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
				searchList: [],
				historyList: JSON.parse(uni.getStorageSync('history') || '[]')
			};
		},
		computed:{
			historys(){
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.historyList].reverse()
			}
		},
		methods: {
			bindClick(val){
				this.keyWords = val
				this.getSearchList()
			},
			navToDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
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
				if (!this.keyWords) return this.searchList = []
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
				this.saveSearchHistory()
			},
			saveSearchHistory(){
				// 1. 将 Array 数组转化为 Set 对象
				const newArr = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				newArr.delete(this.keyWords)
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				newArr.add(this.keyWords)
				// 4. 将 Set 对象转化为 Array 数组
				this.historyList = Array.from(newArr)
				uni.setStorageSync('history',JSON.stringify(this.historyList))
			}
		}

	}
</script>

<style lang="scss">
	::v-deep .uni-searchbar {
		background-color: #c00000;
	}

	.search_sticky {
		position: sticky;
		top: 0;
	}

	.search_list {
		&>view>view {
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20rpx;

			text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.history {
		width: 100%;
		.history_wapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 10px;
			height: 40px;
			width: 100%;
			border-bottom: 1px solid #efefef;
		}

		.history_item {
			width: 100%;
			display: flex;
			margin-top: 5px;
			view{
				margin-left: 5rpx;
			}
		}
	}
</style>
