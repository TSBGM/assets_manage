/**
 * 用印歸檔
 */
import { api } from './api';
import axios from '../http';//使用 http response 拦截器
import { configUrl } from '../config';

const actions = {
    
    //通過工號帶出相關信息
    selectUserInfo ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.selectUserInfo,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //新增申请信息
    uploadStampApply ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.uploadStampApply,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //查看申請詳情頁面
    particulars ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.particulars,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
      },
    //查詢申請歷史
    searchApply ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.searchApply,
            method: 'post',
            baseURL: configUrl.xuUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
        
      },
    //查詢列表
    sealQuery ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.sealQuery,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //导出Excel
    getQueryExcel ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.getQueryExcel,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob'
        }).then((rep) => {
            return rep.data;
        });
    },
    //群組列表
    StampMemList ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.StampMemList,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //添加成員，帶出相關信息
    powerManage ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.powerManage,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
                headers: {
                    'Content-Type': 'application/json',
                },
        }).then((rep) => {
            return rep.data;
        });
    },
    //添加成員
    addStampMem ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.addStampMem,
                method: 'post',
                baseURL: configUrl.baseUrl,//baseUrl zhouUrl  xuUrl
                data: param,
                headers: {
                    'Content-Type': 'application/json',
                },
        }).then((rep) => {
            // console.log(rep)
            return rep.data;
        });
    },
    //刪除成員
    delStampMem ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.delStampMem,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
                headers: {
                    'Content-Type': 'application/json',
                },
        }).then((rep) => {
            return rep.data;
        });
    },
    //事業群
    selectBg ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectBg,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //事業處
    selectBu ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectBu,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //廠區
    selectFactory ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectFactory,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //印章類型
    selectTypeName ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectTypeName,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
}
export default actions;



