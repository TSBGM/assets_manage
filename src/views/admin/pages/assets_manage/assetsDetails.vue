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
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工作樓棟："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
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
                        <el-form-item label="資產狀態："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產分類："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產名稱："  label-width="90px" >
                            <el-input v-model.trim="assetsDetailsModel.assetsName" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產編號："  label-width="90px" >
                            <el-input v-model.trim="assetsDetailsModel.assetsNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <el-form-item label="部門信息："  label-width="90px" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="事業群："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="事業處："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="部："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="課："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
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
                           <el-input v-model.trim="assetsDetailsModel.ownerName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工號："  label-width="90px" >
                            <el-input v-model.trim="assetsDetailsModel.ownerCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="幹部類型："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="是否在職："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
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
                                    placeholder="Time1">
                            </el-date-picker>
                            <span>—</span>
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time2">
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
                                    placeholder="Time1">
                            </el-date-picker>
                            <span>—</span>
                            <el-date-picker
                                    type="date"
                                    style="width: 35%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time2">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <div class="topline"></div>
        <el-button class="button1" type="text">查詢</el-button>
        <div>
            <span class="title_1">查詢結果：</span>
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
                                    <el-table-column type="selection" label="全選" width="45" >
                                        <template slot-scope="scope">{{scope.$index + 1}}</template>
                                    </el-table-column>
                                    <el-table-column label="序号" width="45">
                                        <template slot-scope="scope">{{scope.$index + 1}}</template>
                                    </el-table-column>
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
                                    <el-table-column label="操作" width="50" >
                                        <template slot-scope="scope">
                                            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
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
        <el-button class="button2" type="text">導出到Excel</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            tableData: [],
            multipleSelection: [],

            assetsDetailsModel:{
                factoryId:'',//厰區
                ownerCode:'',
                ownerName:'',
                assetsName:'', //資產名稱
                assetsNumber:'', //資產編號
                ownerCode:'',
                ownerCode:'',
            },
            factoryList:[],
      }
    },
    mounted () {
        this.selectFactory()
        // this.selectUnit(),
        // this.selectFactory(),
        // this.selectDepart(),
        // this.selectTypeName()
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
        width: 100px;
        height: 25px;
        font-size:13px;
    }
</style>