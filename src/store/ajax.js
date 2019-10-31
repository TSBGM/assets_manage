import axios from './http';

import {configUrl, isPc, isTest} from '../store/config'

var baseUrl = configUrl.baseUrl;	

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
function get (params, opts) {

	let _opts = opts || {};
    //params.data.ssoTokenName = params.ssoToken || '';
    let _url = isPc ? params.url : params.url
	return axios({
		url: _url,
		method: 'get',
		baseURL: params.baseUrl || baseUrl,
		params: params.data
	});
}

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
function post (params, opts) {
	let _url = isPc ? params.url : params.url,
		_opts = opts || {},
		option = {
			url: _url,
			method: 'post',
			baseURL: params.baseUrl || baseUrl,
			data: params.data
	};
	return axios(option);
}

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
function del (params, opts) {
	let _url = isPc ? params.url : params.url + '?' + ssoTokenName + '=' + params.ssoToken,
		_opts = opts || {},
		option = {
			url: _url,
			method: 'delete',
			baseURL: params.baseUrl || baseUrl,
			data: params.data
		};

	return axios(option);
}

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType, method} opts
 */
function request(params, opts) {
        let _url = params.url;
    if(isPc) {
        _url = $common.formatUrl(params.url);
    } else {
        if(isTest) {
            _url = $common.formatUrl(params.url, {
                mideatest_sso_token: params.ssoToken
            });
        } else {
            _url = $common.formatUrl(params.url, {
                midea_sso_token: params.ssoToken
            });
        }
    }
    console.log('request');
    let _opts = opts || {},
		_data = params.data || {},
		option = {
			url: _url,
			method: _opts.method || 'post',
			baseURL: params.baseUrl || baseUrl,
		};

	if (_opts.method === 'get') {
		option.params = _data;
	} else {
		option.data = _data;
	}

	return axios(option);
}

function resolve (rep, clback) {
	var data = rep.data;

	if (rep.status == 200) {
		clback && clback(data);
	}
	return data;
}
export default post;
module.exports = {
	get,
	post,
	resolve,
	del,
	request
};
