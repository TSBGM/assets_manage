<template>
<div class="wrapper" v-if="this.getToken && this.getPermission"> 
    <div class="main-header">  
        <div class="main-header-left"> 
            <div class="fii-style">
                <img src="../../../../assets/images/fii-1-1.png" class="img-header"/>
            </div>
            <span>TSBG固定資產管理系統</span>
        </div>
        <div class="user-header">
            <div class="form" >當前用戶：{{this.userName}}</div>
            <div class="form" >角色：{{this.roleName}}</div>
            
            <div class="edit" @click="gotoLogout">
                <span class="span-header">登出</span>
            </div>
        
        </div>
    </div>
  
    <div class="header-menu">
        <el-menu            
            mode="horizontal"
            @select="handleSelect" 
            background-color="#96efe6"
            text-color="#333333"
            active-text-color="#333333"
            router 
            :default-active="activerouter">
            <el-menu-item index="/assetsDetails" class="menu-item-font" v-if="this.VIEW == 'viewasset'" >固定資產明細</el-menu-item>
            <el-menu-item index="/assetsComeIn" class="menu-item-font" v-if="this.ADD == 'addasset'">固定資產入庫</el-menu-item>
            <!-- <el-menu-item index="/assetsDistribute" class="menu-item-font">固定資產分配</el-menu-item>
            <el-menu-item index="/assetsScrap" class="menu-item-font" >資產報廢管理</el-menu-item> -->
            <el-menu-item index="/assetsUserManage" class="menu-item-font" v-if="this.POWER == 'powerasset'">系統用戶管理</el-menu-item>
            <el-menu-item index="/FeedbackUpload" class="menu-item-font">問題反饋</el-menu-item>
        </el-menu>
    </div>

    <el-main class="main-height">
        <router-view></router-view>
    </el-main>
</div>    
</template>

<script>
import {getInfo,getPermission,getToken,removeToken,removeInfo,removePermission,setProjId} from '../../../../utils/auth'
  export default {
    components: {
    },
    data(){
        return{
            activerouter:'0',
            userName : '',
            POWER:JSON.parse(localStorage.getItem('LIMITS')) ? JSON.parse(localStorage.getItem('LIMITS')).POWER:'',
            VIEW:JSON.parse(localStorage.getItem('LIMITS')) ? JSON.parse(localStorage.getItem('LIMITS')).VIEW:'',
            ADD:JSON.parse(localStorage.getItem('LIMITS')) ? JSON.parse(localStorage.getItem('LIMITS')).ADD:'',
            getToken:getToken(),
            getPermission:getPermission(),
            // getToken:'1111',
            roleName:'',
        }
    },
    mounted () {
        this.init()
    },
    watch: {
        $route () {
            this.setCurrentRoute()
        }
    },
    methods: {
        init(){
            let userInfo = JSON.parse(getInfo());
            this.userName = userInfo.userName
            if(getPermission()){
                let permission = JSON.parse(getPermission());
                this.roleName = permission.roleName
            }
            localStorage.setItem('USERCODE',userInfo.userCode)
        },
        handleSelect(key, keyPath) {
        }, 
        setCurrentRoute () {
            this.activerouter = this.$route.path;//关键   通过他就可以监听到当前路由状态并激活当前菜单
        },  
        // <!--退出登录-->
        gotoLogout() {  
            localStorage.clear();//清除localStorage
            removeToken()
            removeInfo()
            removePermission()
            setProjId(3)
            this.$router.push({
                path:(window.location.replace(`http://`+window.location.host))
            }); 
            
        },
    },
    created () {
        this.setCurrentRoute()  
    },    
  }
</script>
<style lang="scss" scoped>
    .wrapper {
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #1bcbae;
        width: 100%;
        position: fixed;
    }
    .main-header {
        background-color: #e7ccaf;
        position: relative;
        height: 70px;
        width: 100%;
        text-align: center;                                      
        .main-header-left{
            background-color: #e7ccaf;
            position: absolute;
            span{
                font-size: 2em;
                line-height: 70px;
                font-weight: 600;
                display:inline-block;
                vertical-align: middle;
            }
            .img-header{
                width:59px;
                height:35px;
            }
            .fii-style{
                width:59px;
                height:35px;
                margin-left: 10px;
                display:inline-block;
                vertical-align: middle;
            }
        }   
        .user-header{
            padding-top: 22px;
            padding-left: 40%;
            .form{
                display:inline;
                font-size: 1.5em;
                padding-top: 5px;
                margin-right: 10%;
            }           
            .span-header{
                margin-top: 15px;
                margin-left: 5%;
                width:100%;
                font-size: 1.5em;
                font-weight: 400;
            }
            .edit{
                display:inline;
                margin-left: 10%;
                &:hover .span-header{
                    color:#a5acbe;
                }            
            }
        }        
        
        
    }
    .header-menu{
        .el-menu{ 
            .el-menu-item{
                // margin-left: 7.5%;
                margin-left: 12%;           
            }
            .el-menu-item.is-active::after {
                position: absolute;
                display: block;
                height: 100%;
                left: 0;
                top: 0;
                content: '';
                background:#00ffdb !important;             
            }
            .el-menu-item.is-active {
                background-color: #00ffdb !important;
                outline: 0 !important;
                border-bottom-color: #00ffdb !important;
            }
            .menu-item-font{
                font-size: 1.5em;
                font-weight: 800;
            }

        }
    }
    .main-height{
        height:calc(100% - 130px);
    }
    
</style>
