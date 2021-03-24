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
		<!-- 楼层区域 -->
		<view class="floor_list">
			<view class="floor_item" v-for="(floor,index) in floorList" :key="index">
				<view>
					<image class="img_title" :src="floor.floor_title.image_src" mode=""></image>
				</view>
				<view class="img_content">
					<view class="img_content_left" @click="navToGoodsList(floor.product_list[0].navigator_url)">
						<image :style="{width:floor.product_list[0].image_width + 'rpx'}"
							:src="floor.product_list[0].image_src" mode="widthFix"></image>
					</view>
					<view class="img_content_right">
						<block v-for="(item,i) in floor.product_list" :key="i">
							<view v-if="i>0" @click="navToGoodsList(item.navigator_url)">
								<image :style="{width:item.image_width + 'rpx'}" :src="item.image_src" mode="widthFix">
								</image>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getfloorList()
		},
		methods: {
			// 点击图片跳转至商品详情
			navToGoodsList(navUrl){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?${navUrl}`
				})
			},
			// 点击分类 tabBar 跳转
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
			},
			async getfloorList() {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (meta.status !== 200) return uni.$showMsg('加载失败')
				this.floorList = message.map(item => {
					return {
						floor_title: item.floor_title,
						product_list: item.product_list.map(val => {
							val.navigator_url = val.navigator_url.split('?')[1]
							return val
						})
					}
				})
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

	.floor_list {
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.floor_item {
			.img_title {
				width: 100%;
				height: 60rpx;
			}

			.img_content {
				display: flex;
				justify-content: space-around;
				padding: 15rpx;

				.img_content_right {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin-left: 15rpx;
				}
			}
		}
	}
</style>
