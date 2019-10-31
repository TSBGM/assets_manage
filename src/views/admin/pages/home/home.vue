<template>
<div class="wrapper"> 
    <div class="main-header">  
        <div class="main-header-left"> 
            <div class="fii-style">
                <img src="../../../../assets/images/fii-1-1.png" class="img-header"/>
            </div>
            <span>TSBG固定資產管理系統</span>
        </div>
        <div class="user-header">
            <p>
                <span class="span-header_1">當前用戶:胡永鋒{{this.userName}}</span>
                <span class="span-header_1">角色:MIS資產管理員{{this.userName}}</span>
                <span class="span-header">登出</span>
            </p>
            <!-- <div class="edit" @click="gotoLogout">
            </div> -->
        </div>
    </div>
  
    <div class="header-menu">
        <el-menu            
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect" 
            background-color="#96efe6"
            text-color="#333333"
            active-text-color="#333333"
            router 
            :default-active="activerouter">
            <el-menu-item index="/assetsDetails" class="menu-item-font" >固定資產明細</el-menu-item>
            <el-menu-item index="/assetsComeIn" class="menu-item-font">固定資產入庫</el-menu-item>
            <el-menu-item index="/assetsDistribute" class="menu-item-font">固定資產分配</el-menu-item>
            <el-menu-item index="/assetsScrap" class="menu-item-font" >資產報廢管理</el-menu-item>
            <el-menu-item index="/assetsUserManage" class="menu-item-font">系統用戶管理</el-menu-item>
            <el-menu-item index="/FeedbackUpload" class="menu-item-font">問題反饋</el-menu-item>
        </el-menu>
    </div>

    <el-main>
        <router-view></router-view>
    </el-main>
</div>    
</template>

<script>
  export default {
    components: {
    },
    data(){
        return{
            activerouter:'0',
            userName : localStorage.getItem('USERNAME'),
        }
    },
    mounted () {
    },
    watch: {
        $route () {
            this.setCurrentRoute()
        }
    },
    methods: {
        handleSelect(key, keyPath) {
        }, 
        setCurrentRoute () {
            this.activerouter = this.$route.path;//关键   通过他就可以监听到当前路由状态并激活当前菜单
        },  
        // <!--退出登录-->
        gotoLogout() {  
            this.$store.dispatch('ecologout').then((rep) => {
                if(rep.data.code == 100){
                   this.$router.push({
                        path: "/"
                    }); 
                    localStorage.clear();//清除localStorage
                }else{
                    alert(rep.data.message)
                }
            })
            
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
    }
    .main-header {
        background-color: #e7ccaf;
        position: relative;
        height: 70px;
        width: 100%;
        // text-align: center;                                      
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
                display:inline-block;
                vertical-align: middle;
            }
        }    
        .user-header{
            background-color: #e7ccaf;
            text-align: center;
            position: absolute;
            top: 10px;
            left: 30%;
            // right: 50%;
            margin: auto;
            .span-header{
                width: 90%;
                height: 30px;
                margin-left: 200px;
                margin-top: 25px;
                font-size: 1.3em;
            }                     
            .edit{
                display:inline;
                margin-left: 10px;
                &:hover .img-header{
                    content: url('../../../../assets/images/edit-hovor.png');
                } 
                &:hover .span-header{
                    color:#a5acbe;
                }            
            }
        }
        
    }
    .header-menu{
        .el-menu{   
            .el-menu-item{
                margin-left: 6%;           
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

            }

        }
    }
    .span-header_1{
        display:inline-block;
        width:250px;
        height:36px;
        line-height:48px;
        text-align:center;
        font-size: 1.3em;
    }
</style>
