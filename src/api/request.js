import axios from 'axios';

const instance = axios.create({});

instance.interceptors.response.use(res => {
	return Promise.resolve(res.data);
});

instance.interceptors.request.use(config => {
	return config;
});

const request = ({
	method = 'GET',
	baseURL = '/api',
    url = '',
    data = {},
    params = {},
    timeout = 5000,
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}) => {
	return instance({
		method,
        baseURL,
        url,
        data,
        params,
        headers,
	});
}

export default request;
