import request from './request';

export function fetchSeller () {
	return request({
		url: '/seller'
	});
};
