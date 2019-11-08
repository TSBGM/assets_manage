<template>
    <div class="register-l">
        <div class="radio">
            <el-radio v-model="radio" label="1">單條錄入新增</el-radio>
            <el-radio v-model="radio" label="2">通過excel批量導入</el-radio>
        </div>
        <div class="topline"></div>
        <div v-if="radio === '1'">
            <el-form>
                <span class="title_1">請錄入内容后點擊保存：</span>
                <div class="rowcss">
                    <el-row>
                        <el-col :span="2">
                            <el-form-item label="資產信息：" label-width="90px" >
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="廠區："  label-width="90px" >
                                <el-select v-model="assetsComelnModel.factoryId" clearable class="select">
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
                                <el-select v-model="assetsComelnModel.areaId" clearable class="select" @change="selectAreaChange(assetsComelnModel.areaId)">
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
                                <el-select v-model="assetsComelnModel.buildingId" clearable class="select" :disabled="this.areaIdFlag" placeholder="請先輸入工作區域">
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
                                <el-input class="input" placeholder="使用位置至少具體到辦公室" v-model="assetsComelnModel.usingPlace"></el-input>
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
                                <el-select v-model="assetsComelnModel.assetsStatusId" clearable class="select">
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
                                <el-select v-model="assetsComelnModel.typeId" clearable class="select">
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
                                <el-input class="input" v-model="assetsComelnModel.assetsName"></el-input>
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
                                <el-select v-model="assetsComelnModel.bgId" clearable class="select" @change="selectBGChange(assetsComelnModel.bgId)"> 
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
                                <el-select v-model="assetsComelnModel.unitId" clearable class="select"  placeholder="請先輸入事業群"
                                :disabled="this.BgFlag" @change="selectUnitChange(assetsComelnModel.bgId,assetsComelnModel.unitId)">
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
                                <el-select v-model="assetsComelnModel.departId" clearable class="select" placeholder="請先輸入事業處"
                                :disabled="this.unitFlag" @change="selectDepartChange(assetsComelnModel.bgId,assetsComelnModel.unitId,assetsComelnModel.departId)">
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
                                <el-select v-model="assetsComelnModel.classId" clearable class="select" 
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
                                <el-input class="input" v-model="assetsComelnModel.ownerCode" @blur.prevent="selectUserInfo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="姓名："  label-width="90px" >
                                <el-input class="input" v-model="assetsComelnModel.ownerName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="幹部類型："  label-width="90px" >
                                <el-select v-model="assetsComelnModel.staffTypeId" clearable class="select">
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
                                <el-select v-model="assetsComelnModel.workStatusId" clearable class="select">
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
                                        style="width: 70%; margin-top:5px;"
                                        :editable="true"
                                        :picker-options="birthOptions"
                                        @change="getSTime"
                                        placeholder=""
                                        v-model="assetsComelnModel.joinBgDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="需求説明：" label-width="90px">
                                <el-input
                                    class="input1"
                                    type="textarea"
                                    :rows="3"
                                    v-model="assetsComelnModel.specifications">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>   
                    <el-row>
                        <el-col class="col">
                            <el-form-item label="備注：" label-width="90px">
                                <el-input
                                    class="input1"
                                    type="textarea"
                                    :rows="3"
                                    v-model="assetsComelnModel.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="topline1"></div>
                <el-row>
                    <el-form-item style="margin-left:35%">
                        <el-button class="button_1 " type="button" @click = "saveComeln()">保存</el-button>
                        <el-button class="button_1 " type="button" @click = "insertNext()">新增下一條</el-button>
                        <el-button class="button_1 " type="button" @click = "goToLast()">返回</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div v-if="radio === '2'">
            <el-form>
                <div class="import-style">
                    <el-button class="button_import" type="button" @click = "importTemplate()">
                        下載批量導入模板
                    </el-button>
                    <!-- <el-button class="button_1 " type="button" @click = "saveComeln()">選擇Excel文件</el-button> -->
                    <el-upload style="display:inline;"
                        ref="upload"
                        :action="`${FILE_URL_80}/tsbg/upload/importmore`"
                        :headers="headers"
                        :file-list="fileList"
                        :data="otherData"
                        :on-remove="fileRemvoeFunc"
                        :on-error="fileErrorFunc"
                        :before-upload="beforeUploadFunc"
                        :on-change="handleUploadChange"
                        :on-success="uploadCtrlFunc"
                        :on-exceed="handleExceed"
                        :limit="1"
                        accept=".xlsx, .xls, .xlsm"
                        :auto-upload="false"
                        :http-request="uploadSectionFile">
                        <el-button slot="trigger" type="plain" class="button_import">
                            選擇Excel文件
                        </el-button>
                    </el-upload>
                </div>    
                <div>
                    <el-row>
                        <span class="title_1">要導入的文件：</span>
                        <span class="">XXXX</span>
                        <el-button class="button_2 " type="button" @click = "saveExcel()">刪除</el-button>
                        <el-button class="button_3 " type="button" @click = "goToLast()">導入</el-button>
                    </el-row>
                </div>
            </el-form>
            <div class="topline-2"></div>
            <div style="margin-top:8px;">
                <span class="title_1">導入預覽：</span>
            </div>
            <div class="table-1">
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
                                    <el-table-column label="序号" width="45">
                                        <template slot-scope="scope">{{scope.$index + 1}}</template>
                                    </el-table-column>
                                    <el-table-column label="資產名稱" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工號" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="姓名" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="干部类型" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="在職狀態" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業群" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業處" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="部" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="課" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="廠區" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="廠内區域信息" width="95" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="廠内樓棟" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產使用位置信息" width="120" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產狀態" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產類型" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產編號" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="需求説明" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="入職日期" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="離職時間" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="組織名稱" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerCode}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="備註" width="80" >
                                        <template slot-scope="scope">
                                            {{scope.row.ownerName}}
                                        </template>
                                    </el-table-column>
                            </el-table>			
                        </template>
                    </i-table>
                </i-layout>
            </div>
            <div>
                <el-form>
                    <el-row>
                        <el-form-item>
                            <el-button class="button_1 " @click = "saveExcel()">確認保存</el-button>
                            <el-button class="button_11 " @click = "goToLast()">返回</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// import {getInfo,getPermission} from '../../../../utils/auth'
    export default {
        data () {
            return {
                radio: '1',
                assetsComelnModel:{
                    // projId:3,//項目id
                    userCode:'133',//登錄人工號
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
            };
        },
        mounted () {
            // this.init()
            this.selectFactory()//廠區
            this.selectArea()//工作區域列表
            this.selectAssetsStatus()//資產狀態列表
            this.selectAssetsType() //资产类型
            this.selectStaffType()//幹部類型
            this.selectWorkStatus() //在职状态
            this.selectBgList() //查询事业群
        },
        methods: {
            init(){
                //權限管理
                let permission = JSON.parse(getPermission());
                let permissionList = permission.permissionList
                if(permissionList.length == 2){
                    this.POWER = ''
                }else if(permissionList.length == 3){
                    this.POWER = 'powerstamp'
                }
            },
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
                this.assetsComelnModel.buildingId = null
                this.areaIdFlag = this.assetsComelnModel.areaId ? false:true//工作區域狀態
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
                this.assetsComelnModel.unitId = null
                this.assetsComelnModel.departId = null
                this.assetsComelnModel.classId = null
                this.BgFlag = this.assetsComelnModel.bgId ? false:true//事業處狀態
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
                this.assetsComelnModel.departId = null
                this.assetsComelnModel.classId = null
                this.unitFlag = this.assetsComelnModel.bgId && this.assetsComelnModel.unitId ? false:true//部狀態
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
                this.assetsComelnModel.classId = null
                this.departFlag = this.assetsComelnModel.bgId && this.assetsComelnModel.unitId && this.assetsComelnModel.departId ? false:true//課狀態
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
                this.$store.dispatch('selectUserNameByUserCode', { staffCode: this.assetsComelnModel.ownerCode })
                .then(res => {
                    if(res.code == 100){
                        this.assetsComelnModel.ownerName = res.data
                    }else{
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                    }
                })
            },
            //保存
            saveComeln(){
                this.$store.dispatch('saveComelninsert',this.assetsComelnModel)
                .then(res => {
                    if(res.code == 100){
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                    }else{
                        this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                    }
                })
            },
            //新增下一條
            insertNext(){
                this.assetsComelnModel={}
            },
            //返回
            goToLast(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-l{
        margin-left: 5%;
        height: 100%;
        background-color: #1bcbae;
        width: 100%;
        overflow-y: auto; 
        // position: fixed;
       
    }  
    .radio{
        margin-top: 1%;
        margin-left: 32%;
        font-size: 14px;
    }
    .el-col{
        height: 35px;
    }
    .col{
        margin-top: 3%;
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
    .input{
        width: 70%;
        margin-top: 5px;
    }
    .input1{
        display: block;
        margin-bottom: 100px;
        text-align: center;
        width: 86.3%;
        margin-top: 5px;
    }
    .topline{
        width: 87%;
        margin-top: 3%;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .topline1{
        width: 87%;
        margin-top: 3.5%;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .topline-1{
        width: 87%;
        margin-top: 10px;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .topline-2{
        width: 87%;
        margin-top: 5px;
        border:0.5px rgb(10, 10, 10) solid;
    }
    .button_1{
        color: #000080;
        background-color: #88C700;
        height: 38px;
        font-size:14px;
        margin-top: 10px;
        margin-left: 37%;
    }
    .button_11{
        color: #000080;
        background-color: #88C700;
        height: 38px;
        font-size:14px;
        margin-top: 10px;
    }
    .button_2{
        color: #333333;
        background-color: #88C700;
        width: 58px;
        height: 25px;
        font-size:13px;
        margin-top: 10px;
        line-height: 10%;
        border-color: #333333;
        border-radius: 5px;
        margin-left: 30%;
    }
    .button_3{
        color: #000080;
        background-color: #88C700;
        width: 58px;
        height: 25px;
        font-size:13px;
        margin-top: 10px;
        line-height: 10%;
        border-color: #333333;
        border-radius: 5px;
    }
    .search-bar1 {
        background: #fff;
        width: 87%;
    }
    //批量导入
    .import-style{
        margin-top: 10px;
        margin-bottom: 50px;
        .button_import{
            background-color: #88C700;
            line-height: 3px;
            display: inline;
        }
    }
    
    .table{
        background-color: #D0D0AE;
        width: 100%
    }
    .table-1{
        width: 87%;
    }
</style>