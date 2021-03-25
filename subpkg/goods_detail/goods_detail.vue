<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(pic,index) in goodsInfo.picture">
					<image :src="pic.pics_big" mode="widthFix" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo:{
					picture:[]
				}
			};
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {data:{message,meta}} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if(meta.status !== 200) return uni.$showMsg()
				this.goodsInfo.picture = message.pics
				console.log(message)
			},
			preview(index){
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current:index,
					// 所有图片 url 地址的数组
					urls: this.goodsInfo.picture.map(item=>item.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
swiper{
	width: 750rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
</style>
