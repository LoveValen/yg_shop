<template>
	<view class="container">
		<view v-if="!token" class="">
			<login></login>
		</view>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMixins from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgeMixins],
		computed: {
			...mapState('user', ['token'])
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		height: 100%;
	}
</style>
