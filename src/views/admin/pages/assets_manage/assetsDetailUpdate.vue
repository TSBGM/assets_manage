<template>
    <div class="register-l">
        <el-form>
            <span class="title_1">請修改內容後點擊保存：</span>
            <div class="rowcss">
                <el-row>
                    <el-col :span="2">
                        <el-form-item label="資產信息：" label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="廠區："  label-width="90px" >
                            <el-select v-model="assetsDetailUpdateModel.factoryId" clearable class="select">
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
                            <el-select v-model="assetsDetailUpdateModel.areaId" clearable class="select" @change="selectAreaChange(assetsDetailUpdateModel.areaId)">
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
                            <el-select v-model="assetsDetailUpdateModel.buildingId" clearable class="select" :disabled="this.areaIdFlag" placeholder="請先輸入工作區域">
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
                            <el-input class="input" placeholder="使用位置至少具體到辦公室" v-model="assetsDetailUpdateModel.usingPlace"></el-input>
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
                            <el-select v-model="assetsDetailUpdateModel.assetsStatusId" clearable class="select">
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
                            <el-select v-model="assetsDetailUpdateModel.typeId" clearable class="select">
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
                            <el-input class="input" v-model="assetsDetailUpdateModel.assetsName"></el-input>
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
                            <el-select v-model="assetsDetailUpdateModel.bgId" clearable class="select" @change="selectBGChange(assetsDetailUpdateModel.bgId)"> 
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
                            <el-select v-model="assetsDetailUpdateModel.unitId" clearable class="select"  placeholder="請先輸入事業群"
                            :disabled="this.BgFlag" @change="selectUnitChange(assetsDetailUpdateModel.bgId,assetsDetailUpdateModel.unitId)">
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
                            <el-select v-model="assetsDetailUpdateModel.departId" clearable class="select" placeholder="請先輸入事業處"
                            :disabled="this.unitFlag" @change="selectDepartChange(assetsDetailUpdateModel.bgId,assetsDetailUpdateModel.unitId,assetsDetailUpdateModel.departId)">
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
                            <el-select v-model="assetsDetailUpdateModel.classId" clearable class="select" 
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
                        <el-form-item label="姓名："  label-width="90px" >
                            <el-input class="input" v-model="assetsDetailUpdateModel.ownerName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工號："  label-width="90px" >
                            <el-input class="input" v-model="assetsDetailUpdateModel.ownerCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="幹部類型："  label-width="90px" >
                            <el-select v-model="assetsDetailUpdateModel.staffTypeId" clearable class="select">
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
                            <el-select v-model="assetsDetailUpdateModel.workStatusId" clearable class="select">
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
                                v-model="assetsDetailUpdateModel.joinBgDate">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="離職時間："  label-width="90px" >
                            <el-date-picker
                                type="date"
                                style="width: 70%; margin-top:5px;"
                                :editable="true"
                                :picker-options="birthOptions"
                                @change="getSTime"
                                placeholder=""
                                v-model="assetsDetailUpdateModel.joinBgDate">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <div class="topline"></div>
            <el-button class="button1" type="button" @click= "searchDetails(val)">保存修改</el-button>
        <div v-if="true">
            <span class="title_1">修改結果：</span>
            <div class="register-1" >
                <div class="search-bar1">
                    <i-layout :toolbar="bottomButton" :title="title" destroyedWhenClose size="large">
                        <i-table :table="table" @pageSizeChange="handleSizeChange" @pageIndexChange="handleCurrentChange" @Mounted="componentMounted">
                            <template slot="table">
                                <el-table
                                    class="table"
                                    :data="tableData"
                                    border
                                    tooltip-effect="dark"
                                    :span-method="arraySpanMethod"
                                    ref="multipleTable"  
                                    highlight-current-row
                                    @current-change="handleChange22"
                                    @selection-change="handleSelectionChange"
                                >
                                    <el-table-column label="工號" width="75" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="姓名" width="75" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="在職狀態" width="78" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="入職時間" width="78" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="離職時間" width="78" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="幹部類型" width="77" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業群" width="70" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="事業處" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="部" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="課" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產名稱" width="75" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產類型" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="需求説明" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產編號" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="資產狀態" width="75" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="廠區" width="75" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工作區域" width="70" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="工作樓棟" width="70" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="使用地點" width="80" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="備注" width="70" >
                                        <template slot-scope="scope">
                                            <a  @click ="seeStampApplyInfo(scope.row.applyNum,scope.row.stampUseId)" target="_blank">{{scope.row.applyNum}}</a>
                                        </template>
                                    </el-table-column>
                                    
                                </el-table>
                            </template> 
                        </i-table>
                    </i-layout>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            intengibleAssetsId:localStorage.getItem('intengibleAssetsId'),
            assetsDetailUpdateModel:{
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
                showPagebar: false,
                info: null,
                totalSize: 0,
            }
        }
    },
    mounted () {
        this.selectFactory()//廠區
        this.selectArea()//工作區域列表
        this.selectAssetsStatus()//資產狀態列表
        this.selectAssetsType() //资产类型
        this.selectStaffType()//幹部類型
        this.selectWorkStatus() //在职状态
        this.selectBgList() //查询事业群
        
        this.selectBuildingByArea()//廠内區域樓棟
        this.selectUnitList()//根据bgId查询事业处unit接口
        this.selectDepartList()//根据bgId、 unitId查询部门depart接口
        this.selectClassList()//根据bgId、 unitId 、departId查询課Class接口

        this.updateOpen()
    },
    methods: {
        //修改頁面詳情
        updateOpen(){
            this.$store.dispatch('selectAssetsInfoById',{intengibleAssetsId:this.intengibleAssetsId})
            .then(res => {
                if(res.code == 100){
                    this.assetsDetailUpdateModel = res.data[0]
                    if(this.assetsDetailUpdateModel.areaId){

                    }
                    this.areaIdFlag = this.assetsDetailUpdateModel.areaId ? false:true//工作區域狀態
                    this.BgFlag = this.assetsDetailUpdateModel.bgId ? false:true//工作區域狀態
                    this.unitFlag = this.assetsDetailUpdateModel.unitId ? false:true//工作區域狀態
                    this.departFlag = this.assetsDetailUpdateModel.departId ? false:true//工作區域狀態
                }
            })
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
            this.areaIdFlag = this.assetsDetailUpdateModel.areaId ? false:true//工作區域狀態
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
            this.BgFlag = this.assetsDetailUpdateModel.bgId ? false:true//工作區域狀態
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
            this.unitFlag = this.assetsDetailUpdateModel.unitId ? false:true//工作區域狀態
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
            this.departFlag = this.assetsDetailUpdateModel.departId ? false:true//工作區域狀態
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
        //查詢
        searchDetails(val){
            let params = {
                pageIndex: val ? val.pageIndex :1,
                pageSize: val ? val.pageSize :10,
            }
            this.$store.dispatch('saveComelninsert',this.assetsDetailUpdateModel)
            .then(res => {
                if(res.code == 100){
                    this.rep = res.data  
                    Object.keys(res).map(key => (this.table[key] = res.data[key]))
                    this.table.data = this.rep
                    this.table.totalSize = res.dataSecond.totalSize
                    this.table.totalPages = res.dataSecond.totalPages
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
        padding:3% 0 0 8%;
        height: 100%;
        background-color: #1bcbae;
        width: 100%;
        position: fixed;
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
        width: 88px;
        height: 38px;
        font-size:1.25em;
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
        width: 100px;
        height: 25px;
        font-size:13px;
    }
</style>