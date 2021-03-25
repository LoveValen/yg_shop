<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滚动区域 -->
			<scroll-view class="scroll-view-container-left" scroll-y :style="{height:windowHeight+'px'}">
				<view :class="['left_item', active===index? 'active':'']" @click="changeCate(index)"
					v-for="(item,index) in cateList" :key="index ">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滚动区域 -->
			<scroll-view class="scroll-view-container-right" scroll-y :style="{height:windowHeight+'px'}">
				<view class="right_item_one">
					<view v-for="(item,index) in childCateList" :key="index">
							/ {{item.cat_name}} /
						<view class="imgList">
							<view class="right_item_two">
								<view v-for="(images,i) in item.children" :key="i">
									<image :src="images.cat_icon" mode=""></image>
									<text>{{images.cat_name}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 窗口的可用高度 = 屏幕高度 - navigatorBar高度 - tabBar 高度
				windowHeight: 0,
				active: 0,
				cateList: [],
				childCateList: []
				// childImgList: []
			};
		},
		onLoad() {
			// 获取当前系统的信息 uni.getSystemInfoSync()
			// 为 windowHeight 窗口可用高度动态赋值
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.getCateList()
		},
		methods: {
			changeCate(index) {
				this.active = index
				this.childCateList = this.cateList[index].children
			},
			async getCateList() {
				// 发起请求
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = message
				this.childCateList = message[0].children
				// this.childImgList = message[0].children[0].children
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		justify-content: space-between;

		.scroll-view-container-left {
			width: 260rpx;
			box-shadow: 10rpx 0 10px #b6b6b6;

			.left_item {
				width: 100%;
				height: 35px;
				line-height: 35px;
				padding: 10rpx;
				background-color: #f6f6f6;
				border-bottom: 1px solid #ffffff;
				padding-left: 30rpx;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						position: absolute;
						content: '';
						height: 100%;
						width: 10rpx;
						border-left: 10rpx solid #c00000;
						left: 0;
						top: 0;
					}
				}
			}
		}

		.scroll-view-container-right {

			.right_item_one {
				text-align: center;
			}

			.imgList {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.right_item_two {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					view {
						box-sizing: border-box;
						width: 33.3%;
						padding: 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						text-align: center;
						font-size: 12px;

						image {
							width: 100rpx;
							height: 100rpx;
							margin: auto;
						}
					}
				}
			}
		}
	}
</style>
