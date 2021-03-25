<template>
	<view class="search_container">
		<view class="search" @click="searchBoxHandler">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#C00000'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		data() {
			return {

			};
		},
		methods:{
			searchBoxHandler(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search_container {
		background-color: #c00000;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;

		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			border-radius: 17px;
			height: 34px;
			background-color: #ffffff;

			.placeholder {
				color: #b6b6b6;
				font-size: 14px;
			}
		}
	}
</style>
