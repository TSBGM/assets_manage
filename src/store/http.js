const axios = require('axios');
import { Message } from 'element-ui'
import {getToken,removeToken} from '../utils/auth'

axios.defaults.timeout = 60000;
// http request 拦截器
axios.interceptors.request.use(

    config => {
        // if (localStorage.token) {
        // config.headers['userCode'] = config.data.userCode || localStorage.getItem('USERCODE');//userCode放在headers
        // config.headers['token'] =  localStorage.getItem('TOKEN');//

        // }
        config.headers['token'] = getToken()
        return config;
    },
    err => {
        Message.error({
            message: '加载超时'
        })
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {    
        if (response && response.data && response.data.code && (response.data.code === "0401" || response.data.code === "302")) {
            var httpInterceptor = localStorage.httpInterceptor ? JSON.parse(localStorage.httpInterceptor) : {};
            if (httpInterceptor.singlePoint[location.host] && localStorage.user) {
                location.reload();
            } else {
                redirect();
            }
        }
        if (response.config && response.config.headers) {
            if (response.config.headers['token']) localStorage.TOKEN = response.config.headers['token'];
        }
        //token验证失效请重新登錄
        if(response.data.code == '400'){
            // removeToken()
            // window.location.replace(`http://`+window.location.host)  
        }
        return response;
    },
    error => {
        if (!error.response) {  
            Message.error({
                message: '连接出错，请检查服务器状态'
            })
        }
        // console.log(error)
        return Promise.reject(error.response)
    }
);

// module.exports = axios;
export default axios;


