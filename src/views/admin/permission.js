/* eslint-disable */

import router, { asyncRoutes } from './router'
import {getToken,getInfo,setProjId,getPermission} from '../../utils/auth'

router.beforeEach((to, from, next) => {
    setProjId(3)
    //權限管理 addasset", "delasset", "updateasset", "viewasset
    if(getPermission()){
        let permission = JSON.parse(getPermission());
        let permissionList = JSON.parse(JSON.stringify(permission)).permissionList
        let addFlag = false 
        let delFlag = false
        let updateFlag = false
        let viewFlag = false
        let powerFlag = false
        if(permissionList.length > 0){
            for (let i = 0; i < permissionList.length; i++) {
                if(permissionList[i] == 'addasset'){
                    addFlag = true
                }else if(permissionList[i] == 'delasset'){
                    delFlag = true
                }else if(permissionList[i] == 'updateasset'){
                    updateFlag = true
                }else if(permissionList[i] == 'viewasset'){
                    viewFlag = true
                }else if(permissionList[i] == 'powerasset'){
                    powerFlag = true
                }
                localStorage.setItem('LIMITS', JSON.stringify({ADD:addFlag?'addasset':'',
                DEL:delFlag?'delasset':'', UPDATE:updateFlag?'updateasset':'',
                VIEW:viewFlag?'viewasset':'', POWER:powerFlag?'powerasset':''}));
            }
        }else if(permissionList.length == 0){
            localStorage.setItem('LIMITS', JSON.stringify({ADD:'',DEL:'', UPDATE:'',VIEW:'', POWER:''}));
        } 
    }
    if(getToken() && getInfo()){
        if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
      
            let token = getToken()
            let userInfo = JSON.parse(getInfo());
            let userName = userInfo.userName
            if (token && userName) { // 判断当前的userCoden和token是否存在
                if (token) {  // 測試
                // if (111) { // 測試
                    next();
                }
            }
        }
        else {
            next();
        }
    }else {
        next({
            // path: '/', //跳转不到http://10.124.131.79
            path:(window.location.replace(`http://`+window.location.host))
        })
    }
    
});

