<template>    
    <div>
        
        <div class="register" >
            <div class="search-bar" >
                <h1 align="center">问题列表</h1>
                <i-layout :toolbar="bottomButton" :title="title" destroyedWhenClose size="large">
                    <el-button @click="exportExcel" id="exportCrew" style="float:right;border-radius:5px;">導出</el-button>
                    <i-table :table="table" @pageSizeChange="handleSizeChange" @pageIndexChange="handleCurrentChange" @Mounted="componentMounted">
                        <template slot="table" slot-scope="tableScope">
                            <el-table
                                class="testFather"
                                ref="multipleTable"
                                :data="table.data"      
                                style="width: 100%"
                                highlight-current-row
                                @current-change="handleChange22"
                                @selection-change="handleChange">
                                <el-table-column label="序号" width="50">
                                    <template slot-scope="scope">{{scope.$index + 1}}</template>
                                </el-table-column>
                                <el-table-column label="系統名稱" width="150" prop="proName">
                                </el-table-column>
                                <el-table-column label="問題名稱" width="150" prop="questionName">
                                </el-table-column>
                                <el-table-column label="問題描述" width="200px" align="center">
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top" :visible-arrow="false">
                                            <p class="popover-p">{{ scope.row.questionDescribe }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium">
                                                    {{ scope.row.questionDescribe}}
                                                </el-tag>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="(item, idx) in table.columns"
                                    :key="idx"
                                    :prop="item.prop"
                                    :label="item.label"
                                    :min-width="item.width"
                                    :formatter="tableScope.formatter"
                                    :align="item.align">
                                </el-table-column>
                                <el-table-column label="反饋時間" width="200px" align="center">
                                    <template slot-scope="scope">
                                        <span v-html="dateFormatTime(scope.row.applicationDate)"></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="處理狀態" width="200px" align="center"  :formatter="statusType">
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    fixed="right"
                                    align="center"
                                    min-width="50"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button 
                                            @click.native.prevent="seeQuestionUnEdit(scope.row.questionFeedbackId)"
                                            v-if="scope.row.applyStatusId==3
                                                ||scope.row.applyStatusId==4
                                                ||scope.row.applyStatusId==5"
                                            type="text"
                                            size="small"
                                            >詳情
                                        </el-button>
                                        <el-button 
                                            @click.native.prevent="seeQuestion(scope.row.questionFeedbackId)"
                                            v-if="scope.row.applyStatusId==1
                                                ||scope.row.applyStatusId==2"
                                            type="text"
                                            size="small"
                                            >詳情
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template> 
                    </i-table>
                </i-layout>
            </div>
        </div>
    </div>  
</template>
<script> 
import config from '@/store/common/actions'
import { BASE_URL } from '@/store/api'
import moment from 'moment'

export default {
    data(){
      return {   
        firName:localStorage.getItem('FIRNAME'),
        secName:localStorage.getItem('SECNAME'),
        rep:[],
        table: {
            columns: [
                { prop:'userName', label: '反餽人姓名', width: 200, align: 'center', },
                { prop:'userCode', label: '反餽人賬號', width: 200, align: 'center' },
            ],
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
    components: {
    //   Home
    },
    mounted () {
        let params = {
            pageRequest:{
                pageIndex: 1,
                pageSize: 8,
            }
        }  
        this.getData (params)
    },
    methods: {
    //申請單狀態類型
    statusType: function(row, column) {

        return row.applyStatusId == '1' ? "待接單" :
        row.applyStatusId == '2' ? "待作業" 
        :  row.applyStatusId == '3' ? "作業完成" 
        : row.applyStatusId == '4' ? "申請單關閉" 
        : row.applyStatusId == '5' ? "被駁回" : "";
    },
    // 监听每页显示条数变化
    handleSizeChange (val) {
        let params = {
            "pageRequest":{
                pageIndex: val.pageIndex,
                pageSize: val.pageSize,
            }
        }   
        this.table.info = val
        this.getData(params)
    },
    // 监听页数变化
    handleCurrentChange (val) {
        let params = {
            "pageRequest":{
                pageIndex: val.pageIndex,
                pageSize: val.pageSize,
            }
        }
        this.table.info = val
        this.getData(params)
    },
    // 获取表格数据
    getData (val) {
        let params = {
            "pageRequest":{
                pageIndex: val.pageRequest.pageIndex,
                pageSize: val.pageRequest.pageSize,
            }
        }
        this.$store.dispatch('getquestionall',params).then(res => {
            if(res.code == 0){
                this.rep = res.data.content  //content/
                Object.keys(res).map(key => (this.table[key] = res.data[key]))
                this.table.data = this.rep
                this.table.totalSize = res.data.totalSize
                this.table.totalPages = res.data.totalPages
            } 
            else{
                alert(res.message)
            }
        })
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

    seeQuestionUnEdit(questionFeedbackId){
        localStorage.setItem('QUESTIONFEEDBACKID', questionFeedbackId);
        this.$store.dispatch('getQuestionFeedBackById', {questionFeedbackId:questionFeedbackId})
        .then(res => {
            // if(res.data.code == 0){
                // window.open("http://localhost:8080/#/feedbackHandleDetails")
                window.open(`${BASE_URL}/#/feedbackHandleDetails`)
            // }else{

            // }
        })
    },

    seeQuestion(questionFeedbackId){
        localStorage.setItem('QUESTIONFEEDBACKID', questionFeedbackId);
        this.$store.dispatch('getQuestionFeedBackById', {questionFeedbackId:questionFeedbackId})
        .then(res => {
            // if(res.data.code == 0){
                // window.open("http://localhost:8080/#/feedbackHandle")
                window.open(`${BASE_URL}/#/feedbackHandle`)
            // }else{

            // }
        })
    
    },
    exportExcel() {
        this.postparams = new FormData()
            let date = moment(new Date()).format('YYYYMMDD')//今日時間
            this.$store.dispatch('excelAll').then((json) => {  
                if (json) {
                    const blob = new Blob([json],{type: 'application/vnd.openxmlformats-  officedocument.spreadsheetml.sheet;charset=utf-8'});
                    const fileName = date+'問題反饋信息處理文檔.xlsx';
                    // const fileName ='問題反饋信息處理文檔.xlsx';
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                }
            }).catch(err => {
                this.$message({
                    message:'下载失败！',
                    type:'error',
                    showClose:true
                })
            })
        // })

    }

}
}

</script>
<style lang="scss" scoped>
@import "../../../../assets/css/base-table.less";
.el-form-item {
    width: 50%;
}
.testFather {
    // background: black;
    table {
        thead {
            tr {
                th:nth-child(1) {
                    display: none !important;
                }
            }
        }
    }
}
.i-table {
    .xuhao{
        .el-table tr td{ 
            text-align: center;   
        }  
    }
}
.popover-p{
    margin:3px;
    width:200px;
    height:auto;
}
</style>