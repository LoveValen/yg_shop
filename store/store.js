import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import cart from './cart.js'

const store = new Vuex.Store({
	modules:{
		cart
	}
})

export default store