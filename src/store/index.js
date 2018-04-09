import vuex from 'vuex';
import vue from 'vue';
import { fetchSeller } from '../api/fetch';

vue.use(vuex);

export default new vuex.Store({
	state: {
		seller: {}
	},
	mutations: {
		toggleSeller (state, value) {
			state.seller = value;
		}
	},
	getters: {
		seller: state => state.seller
	},
	actions: {
		setSeller ({ commit, state }) {
			return new Promise((resolve, reject) => {
				fetchSeller().then(res => {
					if(!res.errno) {
						commit('toggleSeller', res.data);
						resolve();
					}
					reject('err');
				}).catch(err => {
					console.log(err);
					reject(err);
				});
			});
		}
	}
});
