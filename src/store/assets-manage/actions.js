/**
 * 固定資產
 */
import { api } from './api';
import axios from '../http';//使用 http response 拦截器
import { configUrl } from '../config';

const actions = {

    
    //系統用戶管理頁面----添加管理員
    addManager ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.addManager,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl 
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //系統用戶管理頁面----權限停/啓用
    modifyManager ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.modifyManager,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl 
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //系統用戶管理頁面----查詢用戶
    findManager ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.findManager,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl 
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //廠區
    selectFactory ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.selectFactory,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl 
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //工作區域列表
    selectArea ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.selectArea,
            method: 'post',
            baseURL: configUrl.baseUrl,
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
    },
    //廠内區域樓棟
    selectBuildingByArea ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.selectBuildingByArea,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
      },
    //資產狀態列表
    selectAssetsStatus ({commit, dispathc, state, rootState}, param) {
        return axios({
            url: api.selectAssetsStatus,
            method: 'post',
            baseURL: configUrl.baseUrl,// baseUrl  chenUrl
            data: param
        }).then((rep) => {
          return (function() {  
            return rep.data;
          })();
        });
        
      },
    //资产类型
    selectAssetsType ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectAssetsType,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //幹部類型
    selectStaffType ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectStaffType,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //在职状态
    selectWorkStatus ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectWorkStatus,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //查询事业群
    selectBgList ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectBgList,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param
        }).then((rep) => {
            // console.log(rep)
            return rep.data;
        });
    },
    //根据BGId查询事业处unit接口
    selectUnitList ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectUnitList,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //根据BGId、 unitId查询部门depart接口
    selectDepartList ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectDepartList,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //根据BGId、 unitId 、departId查询課Class接口
    selectClassList ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectClassList,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //保存
    saveComelninsert ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.saveComelninsert,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //查詢
    query ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.query,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //根据固定资产id查询资产信息接口
    selectAssetsInfoById ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectAssetsInfoById,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //根据工号查询员工姓名接口
    selectUserNameByUserCode ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.selectUserNameByUserCode,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //修改保存
    update ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.update,
                method: 'post',
                baseURL: configUrl.baseUrl,
                data: param,
        }).then((rep) => {
            return rep.data;
        });
    },
    //导出Excel
    capitalexcel ({commit, dispathc, state, rootState}, param) {
        return axios({
                url: api.capitalexcel,
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
}
export default actions;



