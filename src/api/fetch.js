import request from './request';

export function fetchSeller () {
	return request({
		url: '/seller'
	});
};

export function queryGoods () {
	return request({
		url: '/goods'
	});
};
