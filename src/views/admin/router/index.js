import Vue from 'vue'
import Router from 'vue-router'
// import { getInfo } from '@/utils/auth'
Vue.use(Router)

// const Layout = () => import('@/components/common/layout/layout')
const Blank = () => import('@/components/common/layout/blank')
const Error404 = () => import('@/components/common/error/404')
/** 组件 */
import Admin from '../pages/home/home'
import assetsDetails from '../pages/assets_manage/assetsDetails.vue'
import assetsComeIn from '../pages/assets_manage/assetsComeIn.vue'
import assetsDistribute from '../pages/assets_manage/assetsDistribute.vue'
import assetsScrap from '../pages/assets_manage/assetsScrap.vue'
import assetsUserManage from '../pages/assets_manage/assetsUserManage.vue'
import FeedbackUpload from '../pages/feedback/feedbackUpload'


const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/home',
            name: '首頁',
            component: Admin,
            redirect: '/assetsDetails',
            // meta: {
            //     title: '',
            //     requireAuth: true,  
            // },
            children:[
                {
                    path: '/assetsDetails',
                    name: '固定資產明細',
                    component: assetsDetails,    
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },                
                },
                {
                    path: '/assetsComeIn',
                    name: '固定資產入庫',
                    component: assetsComeIn,
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },
                },
                {
                    path: '/assetsDistribute',
                    name: '固定資產分配',
                    component: assetsDistribute,
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },
                },
                {
                    path: '/assetsScrap',
                    name: '資產報廢管理',
                    component: assetsScrap,
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },
                },
                {
                    path: '/assetsUserManage',
                    name: '系統用戶管理',
                    component: assetsUserManage,
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },
                },
                {
                    path: '/feedbackUpload',
                    name: '問題反饋',
                    component: FeedbackUpload,
                    meta: {
                        title: '',
                        requireAuth: true,  
                    },
                },
            ]
        },
    {
        path: 'error_404',
        component: Error404
    },
    {
        path: '*',
        component: Error404
    },
    
    {
        path: '/assetsDetails',
        component: assetsDetails,
        meta: {
            title: '',
            requireAuth: true,  
        },
    },
    
  ]

})

export default router
