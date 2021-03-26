import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import {
	$http
} from "@escook/request-miniprogram"

// 可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$showMsg = function(title = '数据加载成功！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

import store from './store/store.js'

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
