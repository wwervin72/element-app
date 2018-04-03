import Vue from 'vue';
import Router from 'vue-router';

import goods from '../components/goods';
import rating from '../components/rating';
import seller from '../components/seller';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/goods',
			component: goods
		},
		{
			path: '/rating',
			component: rating
		},
		{
			path: '/seller',
			component: seller
		}
	]
});
