import Vue from 'vue'
import Router from 'vue-router'
import plotter from '@/components/Plotter'
import monitor from '@/components/Monitor'

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Monitor',
			component: monitor
		},
		{
			path: '/plotter',
			name: 'Plotter',
			component: plotter
		}
	]
})
