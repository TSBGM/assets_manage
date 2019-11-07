<template>
    <div class="register-l">
        <el-form>
            <span class="title_1">請選擇查詢範圍：</span>
            <div class="rowcss">
                <el-row>
                    <el-col :span="2">
                        <el-form-item label="資產信息：" label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="廠區："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.factoryId" clearable class="select">
                                <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工作區域："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.areaId" clearable class="select" @change="selectAreaChange(assetsDetailsModel.areaId)">
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工作樓棟："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.buildingId" clearable class="select" :disabled="this.areaIdFlag" placeholder="請先輸入工作區域">
                                <el-option
                                    v-for="item in buildingList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="使用位置：" label-width="90px" >
                            <el-input class="input" placeholder="使用位置至少具體到辦公室" v-model="assetsDetailsModel.usingPlace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <el-form-item label=""  label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產狀態："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.assetsStatusId" clearable class="select">
                                <el-option
                                    v-for="item in assetsStatusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產分類："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.typeId" clearable class="select">
                                <el-option
                                    v-for="item in assetsTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產名稱："  label-width="90px" >
                            <el-input class="input" v-model="assetsDetailsModel.assetsName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <el-form-item label=""  label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="事業群："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.bgId" clearable class="select" @change="selectBGChange(assetsDetailsModel.bgId)"> 
                                <el-option
                                    v-for="item in bgList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="事業處："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.unitId" clearable class="select"  placeholder="請先輸入事業群"
                            :disabled="this.BgFlag" @change="selectUnitChange(assetsDetailsModel.bgId,assetsDetailsModel.unitId)">
                                <el-option
                                    v-for="item in unitList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="部："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.departId" clearable class="select" placeholder="請先輸入事業處"
                            :disabled="this.unitFlag" @change="selectDepartChange(assetsDetailsModel.bgId,assetsDetailsModel.unitId,assetsDetailsModel.departId)">
                                <el-option
                                    v-for="item in departList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="課："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.classId" clearable class="select" 
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
                <el-row>
                    <el-col :span="2">
                        <el-form-item label="員工信息："  label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工號："  label-width="90px" >
                            <el-input class="input" v-model="assetsDetailsModel.ownerCode" @blur.prevent="selectUserInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="姓名："  label-width="90px" >
                            <el-input class="input" v-model="assetsDetailsModel.ownerName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="幹部類型："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.staffTypeId" clearable class="select">
                                <el-option
                                    v-for="item in staffTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="是否在職："  label-width="90px" >
                            <el-select v-model="assetsDetailsModel.workStatusId" clearable class="select">
                                <el-option
                                    v-for="item in workStatusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <el-form-item label=""  label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="入職時間："  label-width="90px" >
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time1"
                                    v-model="assetsDetailsModel.joinBgDate">
                            </el-date-picker>
                            <span>—</span>
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time2"
                                    v-model="assetsDetailsModel.joinBgDate1">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="離職時間："  label-width="90px" >
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time1"
                                    v-model="assetsDetailsModel.leftDate">
                            </el-date-picker>
                            <span>—</span>
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time2"
                                    v-model="assetsDetailsModel.leftDate1">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <div class="topline"></div>
        <el-button class="button1" type="button" @click= "searchDetails(val)">查詢</el-button>
        <div>
            <span class="title_1">查詢結果：</span>
            <div class="register-1" >
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
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column type="selection" width="55"></el-table-column>
                                    <el-table-column label="序号" width="45">
                                        <template slot-scope="scope">{{scope.$index + 1}}</template>
                                    </el-table-column>
                                    <el-table-column label="工號" width="90" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="姓名" width="85" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="在職狀態" width="75" >
                                        <template slot-scope="scope">
                                            {{scope.row.workStatusName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="入職時間" width="85" >
                                        <template slot-scope="scope">
                                            <span v-html="dateFormatTime(scope.row.joinBgDate)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="離職時間" width="85" >
                                        <template slot-scope="scope">
                                            <span v-html="dateFormatTime(scope.row.leftDate)"></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="幹部類型" width="75" >
                                        <template slot-scope="scope">
                                            {{scope.row.staffTypeName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業群" width="70" >
                                        <template slot-scope="scope">
                                            {{scope.row.bgname}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業處" width="170" >
                                        <template slot-scope="scope">
                                            {{scope.row.unitName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="部" width="260" >
                                        <template slot-scope="scope">
                                            {{scope.row.departName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="課" width="280" >
                                        <template slot-scope="scope">
                                            {{scope.row.className}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產名稱" width="150" >
                                        <template slot-scope="scope">
                                            {{scope.row.assetsName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產類型" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.typeName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="需求説明" width="100" >
                                        <template slot-scope="scope">
                                            <!-- {{scope.row.specifications}} -->
                                            <el-popover trigger="hover" placement="top" :visible-arrow="false">
                                                <p class="popover-p">{{ scope.row.specifications }}</p>
                                                <div slot="reference" class="name-wrapper">
                                                    <el-tag size="medium">
                                                        {{ scope.row.specifications}}
                                                    </el-tag>
                                                </div>
                                            </el-popover>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產編號" width="140" >
                                        <template slot-scope="scope">
                                            {{scope.row.assetsNumber}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產狀態" width="75" >
                                        <template slot-scope="scope">
                                            {{scope.row.assetsStatusName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="廠區" width="75" >
                                        <template slot-scope="scope">
                                            {{scope.row.factoryName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工作區域" width="70" >
                                        <template slot-scope="scope">
                                            {{scope.row.areaName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工作樓棟" width="70" >
                                        <template slot-scope="scope">
                                            {{scope.row.buildingName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="使用地點" width="140" >
                                        <template slot-scope="scope">
                                            {{scope.row.usingPlace}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="備注" width="120" >
                                        <template slot-scope="scope">
                                           {{scope.row.remark}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" min-width="50" fixed="right">
                                        <template slot-scope="scope">
                                            <el-button @click="updateOpen(scope.row.intengibleAssetsId)" type="text" size="small">修改</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template> 
                        </i-table>
                    </i-layout>
                </div>
            </div>
        </div>
        <div class="topline"></div>
        <el-button class="button2" type="button" @click= "exportExcel(val)">導出到Excel</el-button>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            assetsDetailsModel:{
                // projId:3,//項目id
                // userCode:'133',//登錄人工號
                factoryId:'',//厰區
                areaId:'',//工作區域列表
                buildingId:'',//廠内區域樓棟
                assetsStatusId:'',//資產狀態列表
                typeId:'',//资产类型
                staffTypeId:'',//幹部類型
                workStatusId:'',//在职状态
                bgId:'',//查询事业群
                unitId:'',//根据bgId查询事业处unit接口
                departId:'',//根据bgId、 unitId查询部门depart接口
                classId:'',//根据bgId、 unitId 、departId查询課Class接口
                usingPlace:'',//使用位置
                assetsName:'',//資產名稱
                ownerCode:'',
                ownerName:'',
                specifications:'',//需求说明
                remark:'',//備註
                joinBgDate:'',//入职时间

            },
            factoryList:[],//廠區
            areaList:[],//工作區域列表
            buildingList:[],//廠内區域樓棟
            assetsStatusList:[],//資產狀態列表
            assetsTypeList:[],//资产类型
            staffTypeList:[],//幹部類型
            workStatusList:[],//在职状态
            bgList:[],//查询事业群
            unitList:[],//根据bgId查询事业处unit接口
            departList:[],//根据bgId、 unitId查询部门depart接口
            classList:[],//根据bgId、 unitId 、departId查询課Class接口

            areaIdFlag:'',
            BgFlag:'',
            unitFlag:'',
            departFlag:'',
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
            }
        }
    },
    mounted () {
        this.selectFactory(),//廠區
        this.selectArea(),//工作區域列表
        this.selectAssetsStatus(),//資產狀態列表
        this.selectAssetsType(), //资产类型
        this.selectStaffType(),//幹部類型
        this.selectWorkStatus(), //在职状态
        this.selectBgList() //查询事业群
    },
    methods: {
        //廠區
        selectFactory(){
            this.$store.dispatch('selectFactory')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.factoryList.push({label:res.data[i].factoryName,value:res.data[i].factoryId});
                    }
                }
            })
        },
        //工作區域列表
        selectArea(){
            this.$store.dispatch('selectArea')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.areaList.push({label:res.data[i].areaName,value:res.data[i].areaId});
                    }
                }
                
            })
        },
        selectAreaChange(areaId){
            this.buildingList = []
            this.assetsDetailsModel.buildingId = null
            this.areaIdFlag = this.assetsDetailsModel.areaId ? false:true//工作區域狀態
            if(!this.areaIdFlag){
                this.selectBuildingByArea(areaId)//廠内區域樓棟
            }
        },
        //廠内區域樓棟
        selectBuildingByArea(areaId){
            this.$store.dispatch('selectBuildingByArea',{areaId:areaId})
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.buildingList.push({label:res.data[i].buildingName,value:res.data[i].buildingId});
                    }
                }
            })
        },
        //資產狀態列表
        selectAssetsStatus(){
            this.$store.dispatch('selectAssetsStatus')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.assetsStatusList.push({label:res.data[i].assetsStatusName,value:res.data[i].assetsStatusId});
                    }
                }
            })
        },
        //资产类型
        selectAssetsType(){
            this.$store.dispatch('selectAssetsType')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.assetsTypeList.push({label:res.data[i].typeName,value:res.data[i].typeId});
                    }
                }
            })
        },
        //干部类型
        selectStaffType(){
            this.$store.dispatch('selectStaffType')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.staffTypeList.push({label:res.data[i].staffTypeName,value:res.data[i].staffTypeId});
                    }
                }
            })
        },
        //在职状态
        selectWorkStatus(){
            this.$store.dispatch('selectWorkStatus')
            .then(res => {
                if(res.code == 100){
                    for (var i = 0; i < res.data.length; i++) {
                        this.workStatusList.push({label:res.data[i].workStatusName,value:res.data[i].workStatusId});
                    }
                }
            })
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
            this.assetsDetailsModel.unitId = null
            this.assetsDetailsModel.departId = null
            this.assetsDetailsModel.classId = null
            this.BgFlag = this.assetsDetailsModel.bgId ? false:true//事業處狀態
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
            this.assetsDetailsModel.departId = null
            this.assetsDetailsModel.classId = null
            this.unitFlag = this.assetsDetailsModel.bgId && this.assetsDetailsModel.unitId ? false:true//部狀態
            this.departFlag = true//課狀態
            if(!this.unitFlag){
                this.selectDepartList(bgId,unitId)//廠内區域樓棟
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
            this.assetsDetailsModel.classId = null
            this.departFlag = this.assetsDetailsModel.bgId && this.assetsDetailsModel.unitId && this.assetsDetailsModel.departId ? false:true//課狀態
            if(!this.departFlag){
                this.selectClassList(bgId,unitId,departId)//廠内區域樓棟
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
        //根据工号查询员工姓名接口
        selectUserInfo(){
            this.$store.dispatch('selectUserNameByUserCode', { staffCode: this.assetsDetailsModel.ownerCode })
            .then(res => {
                if(res.code == 100){
                    this.assetsDetailsModel.ownerName = res.data
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
            this.searchDetails(params)
        },
        // 监听页数变化
        handleCurrentChange (val) {
            let params = {
                pageIndex: val.pageIndex,
                pageSize: val.pageSize,
            }
            this.table.info = val
            this.searchDetails(params)
        },
        //查詢
        searchDetails(val){
            let params = {
                pageRequest:{
                    pageIndex: val ? val.pageIndex :1,
                    pageSize: val ? val.pageSize :10,
                },
                assetsquerypackage:{}
            }
            params.assetsquerypackage = this.assetsDetailsModel
            this.$store.dispatch('query',params)
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
        //修改   
        updateOpen(id){
            localStorage.setItem('intengibleAssetsId', id);
            this.$store.dispatch('selectAssetsInfoById', {intengibleAssetsId:id})
            .then(res => {
                // if(res.data.code == 0){
                    window.open("http://localhost:8080/#/assetsDetailUpdate")
                    // window.open(`${BASE_URL}/#/assetsDetailUpdate`)
            })
        
        },
        exportExcel(val) {
            let params = {
                pageRequest:{
                    pageIndex: val ? val.pageIndex :1,
                    pageSize: val ? val.pageSize :10,
                },
                assetsquerypackage:{}
            }
            params.assetsquerypackage = this.assetsDetailsModel
            let date = moment(new Date()).format('YYYY-MM-DD')//今日時間
            this.$store.dispatch('capitalexcel',params).then((json) => { 
                if (json && json.type == 'application/vnd.ms-excel') {
                    const blob = new Blob([json],{type: 'application/vnd.openxmlformats-  officedocument.spreadsheetml.sheet;charset=utf-8'});
                    const fileName = date+'固定資產數據導出.xls';
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                }
                else if(json && json.type == 'application/json'){
                    this.$message({
                        message:'未查詢到用印信息,無法導出Excel！',
                        type:'error',
                        showClose:true
                    })
                }
            }).catch(err => {
                this.$message({
                    message:'下载失败！',
                    type:'error',
                    showClose:true
                })
            })
            // })
        },
        dateFormatTime: function(value) {
            if(value){
                var formatterTime = moment(new Date(value)).format("YYYY-MM-DD");
                return "<font>"+formatterTime+"</font>";
            }
            else {
                return "";
            }
        },
        // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        //     if (rowIndex % 2 === 0) {
        //         if (columnIndex === 0) {
        //             return [1, 2];
        //         } else if (columnIndex === 1) {
        //             return [0, 0];
        //         }
        //     }
        // },
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
    }
    
}
</script>

<style scoped>
    .register-l{
        float: left;
        width: 95%;
        margin: 30px;
        margin-left: 5%;
        height: 100%;
        background-color: #1bcbae;
        width: 100%;
        overflow-y: auto;
        /* position: fixed; */
    }  
    .el-col{
        height: 35px;
    }
    .el-input{
        width: 70%;
        margin-top: 5px;
    }
    .title_1{
        font-size: 14px;
        color:  #ffff00;
        font-weight: 500;
    }
    .rowcss{
        margin-top: 5px;
    }
    .select{
        width: 70%;
        margin-top: 5px;
    }
    .topline{
        width: 87%;
        margin-top: 1.3%;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .button1{
        margin: 10px 40%;
        color: #000080;
        background-color: #88C700;
        width: 80px;
        height: 38px;
        font-size:14px;
    }
    .search-bar1 {
        /* padding: 12px 22px 14px; */
        background: #fff;
        width: 87%;
    }
    .table{
        background-color: #D0D0AE;
        width: 100%
    }
    .button2{
        line-height: 10%;
        margin: 10px 39.7%;
        color: #000080;
        border: 1px #797979 solid;
        background-color: #1bcbae;
        width: 100px;
        height: 25px;
        font-size:13px;
    }
</style>