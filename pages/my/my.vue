<template>
	<view>
		<view v-if="!token" class="">
			<login></login>
		</view>
	</view>
</template>

<script>
	import badgeMixins from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgeMixins],
		computed:{
			...mapState('user',['token'])
		}
	}
</script>

<style lang="scss">

</style>
