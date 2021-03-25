<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(pic,index) in goodsInfo.pics">
				<image :src="pic.pics_big" mode="widthFix" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goods_des" v-if="goods_info.goods_name">
			<view class="goods_price">￥{{goodsInfo.goods_price}}</view>
			<view class="des_middle">
				<view class="goods_name">{{goodsInfo.goods_name}}</view>
				<view class="goods_collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 快递，免运费 -->
			<view class="goods_freight">快递：免运费</view>
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {}
			};
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (meta.status !== 200) return uni.$showMsg()
				message.goods_introduce = message.goods_introduce.replace(/<img/g, '<img style="display:block"')
				this.goodsInfo = message
				console.log(message)
			},
			preview(index) {
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: index,
					// 所有图片 url 地址的数组
					urls: this.goodsInfo.pics.map(item => item.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		width: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods_des {
		display: flex;
		flex-direction: column;
		padding: 10px;

		.goods_price {
			color: #c00000;
			font-size: 20px;
		}

		.des_middle {
			display: flex;

			.goods_name {
				padding: 10px 0;
				padding-right: 10rpx;
				border-right: 1px solid #efefef;
			}

			.goods_collect {
				width: 320rpx;
				padding: 16px 0;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
			}
		}

		.goods_freight {
			font-size: 12px;
			color: #b6b6b6;
		}
	}
</style>
