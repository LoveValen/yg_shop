import {
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapGetters('cart', ['total'])
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2, // tarBar索引
				text: this.total + '' // 注意：text的值必须是字符串，不能是数字
			})
		}
	}
