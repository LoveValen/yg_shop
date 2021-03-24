<template>
	<view>
		<!-- 首页轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item">
					<image :src="item.image_src" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav_list">
			<view v-for="(item,index) in navList" :key="index" @click="navClickHanlder(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
		},
		methods: {
			navClickHanlder(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取轮播图数据
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) return uni.$showMsg('加载失败')
				this.swiperList = data.message
			},
			// 获取分类导航页面
			async getNavList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (data.meta.status !== 200) return uni.$showMsg('加载失败')
				this.navList = data.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 340rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav_list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;

		view {
			image {
				width: 140rpx;
				height: 150rpx;
			}
		}
	}
</style>
