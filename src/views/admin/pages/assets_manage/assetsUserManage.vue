<template>
    <div class="register_l" v-if="this.POWER == 'powerasset'">
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
                                <el-table-column label="工號" width="130" prop="userCode">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">
                                            <el-input size="mini" v-model="list.userCode" @blur.prevent="addManager()">
                                            </el-input>
                                        </span>
                                        <span v-else>{{scope.row.userCode}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="姓名" width="110" prop="userName">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">{{list.userName}}</span>
                                        <span v-else>{{scope.row.userName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="事業群" width="90" prop="bgName">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">{{list.bgName}}</span>
                                        <span v-else>{{scope.row.bgName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="事業處" width="150" prop="unitName">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">{{list.unitName}}</span>
                                        <span v-else>{{scope.row.unitName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="部" width="150" prop="departName">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">{{list.departName}}</span>
                                        <span v-else>{{scope.row.departName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="課" width="160" prop="className">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.isSet">{{list.className}}</span>
                                        <span v-else>{{scope.row.className}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="查看權限" width="70" >
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.row.isSet"  :checked="false"></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.realPerm[0].VIEW" :checked="scope.row.realPerm[0].VIEW==11" @change= "modifyManager(scope.row)"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="修改權限" width="70" >
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.row.isSet" :checked="false"></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.realPerm[0].UPDATE" :checked="scope.row.realPerm[0].UPDATE==10" @change= "modifyManager(scope.row)"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="增加權限" width="70" >
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.row.isSet" :checked="false"></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.realPerm[0].ADD" :checked="scope.row.realPerm[0].ADD==8" @change= "modifyManager(scope.row)"></el-checkbox>
                                    </template>
                                </el-table-column> 
                                <el-table-column label="刪除權限" width="70" >
                                    <template slot-scope="scope">
                                        <el-checkbox v-if="scope.row.isSet"  :checked="false"></el-checkbox>
                                        <el-checkbox v-else v-model="scope.row.realPerm[0].DEL" :checked="scope.row.realPerm[0].DEL==9" @change= "modifyManager(scope.row)"></el-checkbox>
                                    </template>
                                </el-table-column>
                                <el-table-column label="角色" width="120" >
                                    <template slot-scope="scope">
                                        <el-select  v-model="scope.row.role" placeholder="请选择" @change= "modifyManager(scope.row)">
                                            <el-option
                                                v-for="item in roleList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="停/啓用" width="160" >
                                    <template slot-scope="scope">  
                                    <el-radio-group v-model="scope.row.status" @change= "modifyManager(scope.row)">
                                        <el-radio :label="1">停用</el-radio>
                                        <el-radio :label="0">啓用</el-radio>
                                    </el-radio-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <footer>
                                <el-button class="button2" @click.prevent= "addRow()"><i class="el-icon-plus"></i></el-button>
                            </footer>
                        </template> 
                    </i-table>
                </i-layout>
            </div>
            <div class="topline"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            POWER:JSON.parse(localStorage.getItem('LIMITS')) ? JSON.parse(localStorage.getItem('LIMITS')).POWER:'',
            assetsUserManageModel:{
                userCode:'',//查詢用戶
                bgId:'',//查询事业群
                unitId:'',//根据bgId查询事业处unit接口
                departId:'',//根据bgId、 unitId查询部门depart接口
                classId:'',//根据bgId、 unitId 、departId查询課Class接口
                status:'',
            },
            roleList: [    //角色
                {label: '保管員', value: '11' },
                {label: '管理員', value: '9' }
            ],
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
            bgList:[],//查询事业群
            unitList:[],//根据bgId查询事业处unit接口
            departList:[],//根据bgId、 unitId查询部门depart接口
            classList:[],//根据bgId、 unitId 、departId查询課Class接口
            list:{},

            BgFlag:'',
            unitFlag:'',
            departFlag:'',
        }
    },
    mounted () {
        this.selectBgList() //查询事业群
        this.searchUser()
    },
    methods: {
        // 增加行
        addRow () {
            this.list = {
                userCode: '',
                userName: '',
                bgName: '',
                unitName: '',
                departName: '',
                className: '',
                isSet: true
            }
            this.table.data.push(this.list)
        },
        //查詢用戶
        searchUser(val){
            let params = {
                pageRequest:{
                    pageIndex: val && val.pageIndex ? val.pageIndex :1,
                    pageSize: val && val.pageSize ? val.pageSize :10,
                },
                userInfo:{}
            }
            params.userInfo = this.assetsUserManageModel
            this.$store.dispatch('findManager',params)
            .then(res => {
                if(res.code == 100){
                    this.rep = res.data.content
                    Object.keys(res).map(key => (this.table[key] = res.data[key]))
                    this.table.data = this.rep
                    this.table.totalSize = res.data.totalSize
                    this.table.totalPages = res.data.totalPages
                    let content = res.data.content

                    if(this.table.data.length > 0){
                        for (let i = 0; i < this.table.data.length; i++){
                            // this.rep[i].realPerm = []
                            let permList = this.table.data[i].realPerm
                            if(permList.length > 0){
                                let addassetFlag = false 
                                let delassetFlag = false
                                let updateassetFlag = false
                                let viewassetFlag = false
                                this.rep[i].realPerm = []
                                for (let j = 0; j < permList.length; j++) {
                                    if(permList[j] == '8') {
                                        addassetFlag = true
                                    }else if(permList[j] == '9'){
                                        delassetFlag = true
                                    }else if(permList[j] == '10'){
                                        updateassetFlag = true
                                    }else if(permList[j] == '11'){
                                        viewassetFlag = true
                                    }
                                }
                                this.rep[i].realPerm.push({ADD:addassetFlag?'8':'',
                                DEL:delassetFlag?'9':'',
                                UPDATE:updateassetFlag?'10':'',
                                VIEW:viewassetFlag?'11':''})
                            }else if(permList.length == 0){
                                this.rep[i].realPerm.push({
                                    ADD:'',DEL:'', UPDATE:'',VIEW:''
                                })
                            }
                        }
                    }
                    this.table.data.realPerm = this.rep.realPerm
                    // console.log(this.table.data)
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
        modifyManager(scope){
            let params={
                userCode: scope.userCode,
                data: [],
                status: scope.status,
                role: scope.role
            }
            let add = ''
            let view = '' 
            let update = '' 
            let del = '' 
            if(scope.realPerm[0].ADD == true){
                this.add = 8
            }else if(scope.realPerm[0].ADD == false){
                this.add = 6
            }
            if(scope.realPerm[0].VIEW == true){
                this.view = 11
            }else if(scope.realPerm[0].VIEW == false){
                this.view = 6
            }
            if(scope.realPerm[0].UPDATE == true){
                this.update = 10
            }else if(scope.realPerm[0].UPDATE == false){
                this.update = 6
            }
            if(scope.realPerm[0].DEL == true){
                this.del = 9
            }else if(scope.realPerm[0].DEL == false){
                this.del = 6
            }
            
            params.data.push(this.add,this.view,this.update,this.del)
            this.$store.dispatch('modifyManager',params)
            .then(res => {
                if(res.code == 100){
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        showClose: false
                    }).then(() => {
                        // this.searchUser()
                        // this.$router.go(0)
                    })
                    // this.searchUser()
                }else{
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        showClose: false
                    }).then(() => {
                        // this.searchUser(scope)
                    })
                }
            })
        },
        //添加管理員assetsUserManageModel.userCode
        addManager(){
            this.$store.dispatch('addManager',{userCode:this.assetsUserManageModel.userCode})
            .then(res => {
                if(res.code == 100){
                    this.list.userCode = res.data[0].userCode
                    this.list.userName = res.data[0].userName
                    this.list.bgName = res.data[0].bgName
                    this.list.unitName = res.data[0].unitName
                    this.list.departName = res.data[0].departName
                    this.list.className = res.data[0].className

                    // this.assetsUserManageModel.role = res.data.role
                    // this.assetsUserManageModel.status = res.data.status
                    console.log(res.data)
                    console.log(this.list)
                }else{
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        showClose: false
                    }).then(() => {
                    })
                }
            })
        },
        // 监听每页显示条数变化
        handleSizeChange (val) {
            let params = {
                pageIndex: val.pageIndex,
                pageSize: val.pageSize,
            }   
            this.table.info = val
            this.searchUser(params)
        },
        // 监听页数变化
        handleCurrentChange (val) {
            let params = {
                pageIndex: val.pageIndex,
                pageSize: val.pageSize,
            }
            this.table.info = val
            this.searchUser(params)
        },
        //查询事业群
        selectBgList(){
            this.$store.dispatch('selectBgList')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.bgList.push({label:res.data[i].bgName,value:res.data[i].bgId});
                    }
                }
            })
        },
        selectBGChange(bgId){
            this.unitList = []
            this.departList = []
            this.classList = []
            this.assetsUserManageModel.unitId = null
            this.assetsUserManageModel.departId = null
            this.assetsUserManageModel.classId = null
            this.BgFlag = this.assetsUserManageModel.bgId ? false:true//事業處狀態
            this.unitFlag = true//部狀態
            this.departFlag = true//課狀態
            if(!this.BgFlag){
                this.selectUnitList(bgId)//廠内區域樓棟
            }
        },
        //根据bgId查询事业处unit接口
        selectUnitList(bgId){
            this.$store.dispatch('selectUnitList',{bgId:bgId})
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.unitList.push({label:res.data[i].unitName,value:res.data[i].unitId});
                    }
                }
            })
        },
        selectUnitChange(bgId,unitId){
            this.departList = []
            this.classList = []
            this.assetsUserManageModel.departId = null
            this.assetsUserManageModel.classId = null
            this.unitFlag = this.assetsUserManageModel.bgId && this.assetsUserManageModel.unitId ? false:true//部狀態
            this.departFlag = true//課狀態
            if(!this.unitFlag){
                this.selectDepartList(bgId,unitId)//部門信息
            }
        },
        //根据bgId、 unitId查询部门depart接口
        selectDepartList(bgId,unitId){
            this.$store.dispatch('selectDepartList',{bgId:bgId,unitId:unitId})
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.departList.push({label:res.data[i].departName,value:res.data[i].departId});
                    }
                }
            })
        },
        selectDepartChange(bgId,unitId,departId){
            this.classList = []
            this.assetsUserManageModel.classId = null
            this.departFlag = this.assetsUserManageModel.bgId && this.assetsUserManageModel.unitId && this.assetsUserManageModel.departId ? false:true//課狀態
            if(!this.departFlag){
                this.selectClassList(bgId,unitId,departId)//課信息
            }
        },
        //根据bgId、 unitId 、departId查询課Class接口
        selectClassList(bgId,unitId,departId){
            this.$store.dispatch('selectClassList',{bgId,unitId,departId})
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.classList.push({label:res.data[i].className,value:res.data[i].classId});
                    }
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .register_l{
        float: left;
        width: 92%;
        margin: 30px 30px 30px 8%;
        height: 100%;
        background-color: #1bcbae;
    }  
    .input{
        width: 20%;
        margin-top: 5px;
        margin-left: 35%;
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
        margin-left: 10%;
        height: 100%;
        background-color: #1bcbae;
        width: 90%;
    } 
    .search-bar1 {
        /* padding: 12px 22px 14px; */
        background: #fff;
        width: 80%;
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