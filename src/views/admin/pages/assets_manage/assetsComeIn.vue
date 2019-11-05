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
                    <el-col :span="5">
                        <el-form-item label="使用位置：" label-width="90px" >
                            <el-input class="input" placeholder="使用位置至少具體到辦公室"></el-input>
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
                            <el-input class="input"></el-input>
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
                            <el-input class="input"></el-input>
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
                                    style="width: 70%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime"
                                    placeholder="Time1">
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
                                v-model="textarea">
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
                                v-model="remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="topline1"></div>
            <el-row>
                <el-col :span="8">
                    <el-form-item>
                        <el-button class="button1" type="text">保存</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button class="button2" type="text">新增下一條</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-button class="button3" type="text">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1',
        textarea: '',
        remark:'',
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
    .button1{
        margin: 10px 110%;
        color: #000080;
        background-color: #88C700;
        width: 35px;
        height: 38px;
        font-size:14px;
    }
    .button2{
        margin: 10px 75%;
        color: #000080;
        background-color: #88C700;
        width: 80px;
        height: 38px;
        font-size:14px;
    }
    .button3{
        margin: 10px 10%;
        color: #000080;
        background-color: #88C700;
        width: 35px;
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
</style>