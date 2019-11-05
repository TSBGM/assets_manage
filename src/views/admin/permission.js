/* eslint-disable */

import router, { asyncRoutes } from './router'
import {getToken,getInfo} from '../../utils/auth'

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
        // if(getToken() && getInfo()){
            let token = getToken()
        //     let userInfo = JSON.parse(getInfo());
        //     let userName = userInfo.userName
        //     if (token && userName) { // 判断当前的userCoden和token是否存在
            if (token) {  // 測試
            // if (111) { // 測試
            next();
            }
        // }
        else {
            next({
                // path: '/', //跳转不到http://10.124.131.79
                path:(window.location.replace(`http://`+window.location.host))
            })
        }
    }
    
    else {
        next();
    }
});
