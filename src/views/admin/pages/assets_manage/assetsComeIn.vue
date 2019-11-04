<template>
    <div class="register-l">
        <div class="radio">
            <el-radio v-model="radio" label="1">單條錄入新增</el-radio>
            <el-radio v-model="radio" label="2">通過excel批量導入</el-radio>
        </div>
        <div class="topline"></div>
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
                            <el-select v-model="value" clearable class="select"> <!-- clearable屬性表示選擇框可清空 -->
                               <el-option
                                    v-for="item in options"
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
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="資產編號："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
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
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="工號："  label-width="90px" >
                            <el-select class="select">
                                <el-option>
                                </el-option>
                            </el-select>
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
    </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
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
    .radio{
        margin-left: 32%;
        font-size: 14px;
        font-weight: 500;
    }
    .el-col{
        height: 35px;
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