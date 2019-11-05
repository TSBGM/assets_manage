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
            <el-form>
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="form" label="當前用戶:" label-width="80px" >
                            <span class="span-header">胡永鋒{{this.userName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="form" label="角色:" label-width="80px">
                            <span class="span-header">MIS資產管理員{{this.userName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-button class="button2" type="text">登出</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="edit" @click="gotoLogout">
            </div> -->
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
                margin-left: 7.5%;           
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
    .form{
        width: 150px;
        margin-top: 5px;
    }           
    .span-header{
        margin-top: 15px;
        margin-left: 5%;
        width:100px;
        // height:20px;
        font-size: 14px;
        font-weight: 400;
    }
    .button2{
        margin-top: 10px;
        margin-left: 700%;
        color:black;
        width: 80px;
        height: 38px;
        font-size:14px;
        font-weight: 600;
    }
</style>
