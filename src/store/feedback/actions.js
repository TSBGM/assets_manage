/**
 * 問題反饋
 */
import { api } from './api';
import axios from '../http';//使用 http response 拦截器
import { configUrl } from '../config';

const actions = {
    
    //問題反饋新增
    uploadQuestion ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.uploadQuestion,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },

    //根据工号自动带出个人信息
    getfeedbackinfo ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.getfeedbackinfo,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },

    //查詢個人信息
    searchUserMsg ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.searchUserMsg,
            method: 'post',
            baseURL: configUrl.baseUrl,
            data: param
        }).then((rep) => {
            return rep;
        });
    },

    //导出Excel
    excelAll ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.excelAll,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob'
        }).then((rep) => {
            return rep.data;
        });
    },

    //按问题ID获取问题详情
    getQuestionFeedBackById ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.getQuestionFeedBackById,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            // console.log(rep)
            return rep;
        });
    },

    //根据工号获取用户信息
    gethandleinfo ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.gethandleinfo,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            // console.log(rep)
            return rep;
        });
    },

    //问题反馈处理
    questionHandle ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.questionHandle,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            // console.log(rep)
            return rep;
        });
    },

    //问题反馈列表
    getquestionall ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.getquestionall,
                method: 'post',
                baseURL: configUrl.baseUrl,//baseUrl zhouUrl  xuUrl
                data: param,
        }).then((rep) => {
            // console.log(rep)
            return rep.data;
        });
    },

    //deleteFile
    deleteFile ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.deleteFile,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            // console.log(rep)
            return rep.data;
        });
    },

    //附件下载
    downloadQuestion2 ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: '/tsbg/upload/testdownload?fileName='+param.fileName+`&partnerNo=`+param.partnerNo+`&userCode=`+localStorage.getItem('USERCODE'),
            // url: '/tsbg/upload/testdownload',
            method: 'get',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
            data: param
        }).then((rep) => { 
            return rep;
        });       
    },
}
export default actions;



