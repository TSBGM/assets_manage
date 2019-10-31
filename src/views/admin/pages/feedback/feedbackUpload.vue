<template>
    <div class="register-l">
        <div class="content">
            <h1 align="center">问题反馈</h1>
            <el-form :rules="rules" :model="UploadModel" ref="UploadModel">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="系統名稱：" label-width="300px" >
                            <span class="sys-name" >合作夥伴管理系統</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="問題名稱："  label-width="300px" >
                            <el-input v-model.trim="UploadModel.questionName" style="padding-left: 1%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="問題描述：" label-width="300px" >
                           <el-input 
                                v-model.trim="UploadModel.questionDescribe" 
                                style="padding-left: 1%;"
                                rows="5"
                                type="textarea">
                                </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="反饋人賬號：" label-width="300px" >
                            <el-input v-model.trim="UploadModel.userCode" style="padding-left: 1%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="反饋人姓名：" prop="coProgress" label-width="130px" >
                            <el-input v-model.trim="UploadModel.userName" style="padding-left: 1%;"></el-input>
                         </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="反饋人分機：" label-width="300px" >
                            <el-input v-model.trim="UploadModel.userExt" style="padding-left: 1%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="反饋人郵箱：" prop="coProgress" label-width="130px" >
                            <el-input v-model.trim="UploadModel.userEmailAddress" style="padding-left: 1%;"></el-input>
                         </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="反饋人部門：" label-width="300px" >
                            <el-input v-model.trim="UploadModel.userDepartment" style="padding-left: 1%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                        <el-col :span="50">
                            <el-form-item label="附件：" label-width="300px" >
                                
                                <el-upload
                                    ref="upload"
                                    :action="`${FILE_URL}/tsbg/upload/importmore`"
                                    :headers="headers"
                                    :file-list="fileList"
                                    :data="otherData"
                                    :on-remove="fileRemvoeFunc"
                                    :on-error="fileErrorFunc"
                                    :before-upload="beforeUploadFunc"
                                    :on-change="handleUploadChange"
                                    :on-success="uploadCtrlFunc"
                                    :on-exceed="handleExceed"
                                    :limit="15" multiple
                                    accept=".pdf, .doc, .docx, .xlsx, .xls, .xlsm,.jpg, .png, .ppt, .pptx, .jpeg "
                                    
                                    :auto-upload="false"
                                    :http-request="uploadSectionFile">
                                    <div class="name_1">
                                        <el-button slot="trigger" type="plain">
                                            選擇文件
                                        </el-button>
                                        <span>只能上傳jpg、png、pdf、word、excel、txt、ppt文件，單次上傳附件大小不能超過30M。</span>
                                    </div>
                                </el-upload>
                                <template v-for="(file, id) in this.qhfileLst" >
                                    <div class="flex-space-between file-item" :key="id">
                                        <div>
                                            <i class="el-icon-document"></i>
                                            <a class="icon" :href="getDownload(file)" @click="download(file);" >{{file}}</a>
                                            <i class="el-icon-close closeFile" @click.stop="closeFile(file);"></i>
                                        </div>
                                    </div>
                                </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-form-item style="text-align:center;margin-top:25px;">
                    <el-button type="primary" style="border-radius:5px;" @click = "uploadQuestion('UploadModel')"  :disabled="isDisable">提交</el-button>
                    <el-button type="primary" style="border-radius:5px;" @click = "gotoLogin">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
   
</template>


<script>
import { BASE_URL ,FILE_URL} from '@/store/api'
export default {
    data(){
        return {
            UploadModel: {             
                questionName: '',
                questionDescribe: '',
                userCode: '',
                userName: '',
                userExt: '',
                userEmailAddress: '',
                userDepartment: '',
                applyStatusId:'',
                projId:'4',
            },
            applyStatustype: [                //選擇反饋問題類型
                {label: '待接單', value: 1 },
                {label: '待作業', value: 2 },
                {label: '作業完成', value: 3 },
                {label: '申請單關閉', value: 4 },
                {label: '被駁回', value: 5 },
            ],
            rules: {
                questionNname: [{ required: true, message: '請输入問題名稱' }],
                questionDescribe: [{ required: true, message: '請输入問題描述' }],
                userCode: [{ required: true, message: '請输入反餽人賬號'}],
                userName: [{ required: true, message: '請输入反餽人姓名'}],
                userExt: [{ required: true, message: '請输入反餽人分機'}],
                userEmailAddress: [{ required: true, message: '請输入反餽人郵箱'}],
                userDepartment: [{required: true,  message: '請输入反餽人部門'}],
            },
            // 上传文件列表
            fileList: [],
            // 上传地址
            uploadApi: '',
            // 其他数据
            otherData: null,
            isDisable: false, 
        }
    },
    components: {
    
    },
    mounted () {
     
    },
    methods: {
        // 删除文件钩子
        fileRemvoeFunc (file, fl) {
        // this.fileList = fl
        fl.length === 0 && (this.tipFlag = true)
        },
        // 文件成功时钩子
        uploadCtrlFunc (res, file, fl) {
            this.fileList = fl
            this.loading = false
            this.$emit('confirm')
            // this.done()
            this.$message({
                type: 'success',
                message: '文件发布成功'
            })
            this.$refs.upload.clearFiles()
        },
        // 文件失败时钩子
        fileErrorFunc (err, file, fileList) {
            this.loading = false
            console.log('error: ', err, file, fileList)
            this.$message({
                type: 'error',
                message: '文件发布失败'
            })
        },
        // 上传前增加loading
        beforeUploadFunc (file) {
            if (file) {
                this.loading = true
                let fileLimitSize = 30
                if (file.size) {
                    const limitSize = file.size / 1024 / 1024 < fileLimitSize
                    // const limitSize
                    if (!limitSize)  {
                        // debugger
                    this.$message.warning(`上传文件大小不能超过 ${fileLimitSize} MB!`)
                    }
                    return  limitSize && fileLimitSize
                }
            }
        },

        // 上传文件数量超出的钩子
        handleExceed (file, fileList) {
            this.$message({
                message: '最多保留15個附件，請刪除不要附件后再上傳新附件',
                type: 'warning'
            })
        },
        // 文件上传到浏览器的钩子
        handleUploadChange (file, fl) {
            fl.length > 0 && (this.tipFlag = false)
        // this.fileList = JSON.parse(JSON.stringify(fl))
        },
        // 附件和參數
        uploadSectionFile(file){
            this.postparams.append('file', file.file);
        },
        uploadQuestion(UploadModel) {
        this.isDisable = true
            let postparam = {
                questionFeedback : {
                    questionName:this.UploadModel.questionName,
                    questionDescribe:this.UploadModel.questionDescribe,
                    userCode:this.UploadModel.userCode,
                    userName:this.UploadModel.userName,
                    userExt:this.UploadModel.userExt,
                    userEmailAddress:this.UploadModel.userEmailAddress,
                    userDepartment:this.UploadModel.userDepartment,
                    projId:'4',//用印projId為4
                },
            }
            // 附件和參數
            this.postparams = new FormData()
            this.postparams.append('questionFeedback',JSON.stringify(postparam.questionFeedback));

            this.$refs[UploadModel].validate(valid => {
            if (valid) {
                this.$refs.upload.submit()
                this.$store.dispatch('uploadQuestion',this.postparams).then((rep) => {
                    if(rep.code == 100){
                        // alert('新增成功')
                        this.$alert(rep.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                        setTimeout(() => {
                            this.isDisable = false
                        }, 1000)
                        this.UploadModel = {};
                        this.$refs.upload.clearFiles()//清除文件列表
                    }else {
                        // alert(rep.message)
                        this.$alert(rep.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                        this.isDisable = false
                        return false;
                    }
                });
                
            } else {
                console.log("error submit!!");
                alert("有必填信息未填写，请检查！")
                this.isDisable = false
                return false;
            }
        })
        
        },

        // <!--返回-->
        gotoLogin() {
            this.$router.go(-1);
        },
            // <!--问题反馈列表-->
        gotofeedbackSelect() {
            this.$router.replace({
                path: '/feedbackSelect',
                
            })
        },
        
        // 验证手機
        checkMobile(str) {
            let re = /^1\d{10}$/
            if (re.test(str)) {
                return true;
            }else {
                return false;
            }
        },

    }
    
}
</script>

<style scoped>

    .el-upload__tip_1{
        float: right;
    }
    .register-l{
        float: left;
        width: 95%;
        margin: 30px;
    }  
    .el-input{
        width: 50%;
    }
    .el-select{
        width: 50%;
    }
    .sys-name{
        width: 50%;
        height: 30px;
        display: block;
        margin-left: 5px;
        margin-top: 5px;
        font-size: 15px;
    }

</style>