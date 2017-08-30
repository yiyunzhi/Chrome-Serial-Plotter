import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
/*use Element-UI Framework*/
import 'element-ui/lib/theme-default/index.css'
import './assets/css/index.css'

Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: c => c(App)
});
