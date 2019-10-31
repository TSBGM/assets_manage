/* eslint-disable */

import router, { asyncRoutes } from './router'
import {getToken} from '../../utils/auth'

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
        // let userCode = localStorage.getItem('USERCODE')
        // let token = localStorage.getItem('TOKEN')
        let token = getToken()
        
        if (11) {  // 判断当前的userCoden和token是否存在
            next();
        }
        else {
            next({
                path: '/',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//   controlBeforeEachRoute(to, from, next)
// })
