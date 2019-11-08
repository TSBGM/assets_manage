<template>
    <div>
        <el-input 
            class="input"
            placeholder="可輸入工號、姓名查看擁有的權限"
            clearable="true"
            v-model="assetsUserManageModel.userCode">
                <el-button class="button" slot="append" icon="el-icon-search" @click="searchUser(val)"></el-button>
        </el-input>
        <div class="register">
            <el-form>
                <el-row>
                    <div>
                        <el-col :span="2" class="el-col-1">
                            <span class="span-1">查找範圍：</span>
                        </el-col>
                    </div>
                    <el-col :span="4">
                        <el-form-item label="事業群："  label-width="90px" >
                            <el-select v-model="assetsUserManageModel.bgId" clearable class="select" @change="selectBGChange(assetsUserManageModel.bgId)"> 
                                <el-option
                                    v-for="item in bgList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="事業處："  label-width="90px" >
                            <el-select v-model="assetsUserManageModel.unitId" clearable class="select"  placeholder="請先輸入事業群"
                            :disabled="this.BgFlag" @change="selectUnitChange(assetsUserManageModel.bgId,assetsUserManageModel.unitId)">
                                <el-option
                                    v-for="item in unitList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="部："  label-width="90px" >
                            <el-select v-model="assetsUserManageModel.departId" clearable class="select" placeholder="請先輸入事業處"
                            :disabled="this.unitFlag" @change="selectDepartChange(assetsUserManageModel.bgId,assetsUserManageModel.unitId,assetsUserManageModel.departId)">
                                <el-option
                                    v-for="item in departList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="課："  label-width="90px" >
                            <el-select v-model="assetsUserManageModel.classId" clearable class="select" 
                            placeholder="請先輸入部" :disabled="this.departFlag">
                                <el-option
                                    v-for="item in classList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="register-2">
            <span class="span-1">查找結果：</span>
        </div>
        <div class="register-l" >
            <div class="search-bar1">
                <i-layout :toolbar="bottomButton" :title="title" destroyedWhenClose size="large">
                    <i-table :table="table" @pageSizeChange="handleSizeChange" @pageIndexChange="handleCurrentChange" @Mounted="componentMounted">
                        <template slot="table">
                            <el-table
                                class="table"
                                :data="table.data"
                                border
                                tooltip-effect="dark"
                                :span-method="arraySpanMethod"
                                ref="multipleTable"  
                                @current-change="handleChange22"
                                @selection-change="handleSelectionChange">
                                <el-table-column label="序号" width="50">
                                    <template slot-scope="scope">{{scope.$index + 1}}</template>
                                </el-table-column>
                                <el-table-column label="工號" width="90" >
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.userCode"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="姓名" width="90" >
                                    <template slot-scope="scope">
                                        {{scope.row.userName}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="事業群" width="90" >
                                    <template slot-scope="scope">
                                        {{scope.row.bgName}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="事業處" width="130" >
                                    <template slot-scope="scope">
                                        {{scope.row.unitName}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="部" width="130" >
                                    <template slot-scope="scope">
                                        {{scope.row.departName}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="課" width="130" >
                                    <template slot-scope="scope">
                                        {{scope.row.className}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="查看權限" width="100" >
                                    <template>
                                        <el-checkbox v-model="assetsUserManageModel.viewasset"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="修改權限" width="100" >
                                    <template>
                                        <el-checkbox v-model="assetsUserManageModel.updateasset"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="增加權限" width="100" >
                                    <template>
                                        <el-checkbox v-model="assetsUserManageModel.addasset"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="刪除權限" width="100" >
                                    <template>
                                        <el-checkbox v-model="assetsUserManageModel.delasset"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="角色" width="100" >
                                    <template slot-scope="scope">
                                        {{scope.row.role}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="停/啓用" width="130" >
                                    <el-row>
                                        <template>
                                            <el-checkbox v-model="checked">停用</el-checkbox>
                                        </template>
                                    </el-row>
                                    <el-row>
                                        <template>
                                            <el-checkbox v-model="checked">啓用</el-checkbox>
                                        </template>
                                    </el-row>
                                </el-table-column>
                            </el-table>
                            <footer>
                                <el-button class="button2" @click.prevent="addRow()">增加</el-button>
                            </footer>
                        </template> 
                    </i-table>
                </i-layout>
            </div>
            <div class="topline"></div>
            <el-button class="button1" type="button" @click= "searchDetails(val)">查詢</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            assetsUserManageModel:{
                userCode:'',//查詢用戶
                bgId:'',//查询事业群
                unitId:'',//根据bgId查询事业处unit接口
                departId:'',//根据bgId、 unitId查询部门depart接口
                classId:'',//根据bgId、 unitId 、departId查询課Class接口
                addasset:'',//增加權限
                delasset:'',//刪除權限
                updateasset:'',//修改權限
                viewasset:'',//查看權限
            },
            table: {
                // columns: [
                // ],
                search: null,
                data: null,
                // 注册 page 相关信息
                // ---是否显示底部分页
                showPagebar: true,
                info: null,
                totalSize: 0,
            },
            checked:'',
        }
    },
     methods: {
            // 增加行
            addRow () {
                var list = {
                address: this.userCode,
                }
                this.table.data.unshift(list)
            },
            //查詢用戶
            searchUser(val){
                let params = {
                    pageRequest:{
                        pageIndex: val ? val.pageIndex :1,
                        pageSize: val ? val.pageSize :10,
                    },
                    userInfo:{}
                }
                let permissionList = permission.permissionList
                params.userInfo = this.assetsUserManageModel
                this.$store.dispatch('findManager',params)
                .then(res => {
                    if(res.code == 100){
                        this.rep = res.data.content
                        Object.keys(res).map(key => (this.table[key] = res.data[key]))
                        this.table.data = this.rep
                        this.table.totalSize = res.data.totalSize
                        this.table.totalPages = res.data.totalPages
                    }else{
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                                this.table.data = null
                            })
                    }
                })
            },
            //用戶停/啓用
            modifyManager(){},
            //添加管理員
            addManager(){},
        }
}
</script>

<style scoped>
    .input{
        width: 20%;
        margin-top: 5px;
        margin-left: 39%;
        text-align: center;
    }
    .el-col-1{
        margin-left: 10%;
        margin-top: 0.6%;
        width: 5%;
    }
    .span-1{
        font-size: 14px;
        color:  #ffff00;
        font-weight: 600;
    }
    .register{
        margin-top: 2%;
    }
    .register-l{
        float: left;
        width: 95%;
        margin-left: 10%;
        height: 100%;
        background-color: #1bcbae;
        width: 100%;
        position: fixed;
    } 
    .search-bar1 {
        /* padding: 12px 22px 14px; */
        background: #fff;
        width: 70%;
    } 
    .select{
        width: 100%;
        margin-top: 5px;
    }
    .register-2{
        margin-left: 10%;
    }
    .table{
        background-color: #D0D0AE;
        width: 100%
    }
    .topline{
        width: 70%;
        margin-top: 1%;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .button1{
        margin: 10px 30%;
        color: #000080;
        background-color: #88C700;
        width: 80px;
        height: 40px;
        font-size:14px;
    }
    .button2{
        background-color: #D0D0AE;
        color: #000080;
    }
</style>