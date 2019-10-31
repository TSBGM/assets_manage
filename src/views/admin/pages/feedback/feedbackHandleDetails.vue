<template>
    <div class="register-l">
        <div class="content">
            <el-form>
                <div class="borderh1">
                    <h1 align="center" class="title-style">问题反馈處理</h1>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="系統名稱：" label-width="300px" >
                                <span class="sys-name" >合作夥伴管理系統</span>
                            </el-form-item>
                            <span></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="問題名稱：" label-width="300px" >
                            <span class="sys-name" readonly>
                                {{UploadModel.questionName}}
                            </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="問題描述：" label-width="300px" >
                            <span
                                class="sys-name"
                                readonly
                                rows="5"
                                type="textarea"
                            >
                                {{UploadModel.questionDescribe}}
                            </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="附件：" prop="dataThird" label-width="300px">
                                <el-upload
                                    class="sys-name"
                                    ref="upload"
                                    :action="`${FILE_URL}/tsbg/upload/import`"
                                    :headers="headers"
                                    :file-list="fileList"
                                    :data="otherData"
                                    :on-remove="fileRemvoeFunc"
                                    :on-error="fileErrorFunc"
                                    :before-upload="beforeUploadFunc"
                                    :on-change="handleUploadChange"
                                    :on-success="uploadCtrlFunc"
                                    :on-exceed="handleExceed"
                                    :limit="15" 
                                    multiple
                                    show-file-list="true"
                                    accept=".pdf, .doc, .docx, .xlsx, .xls, .xlsm,.jpg, .png, .ppt, .pptx, .jpeg "
                                    
                                    :auto-upload="false"
                                    :http-request="uploadSectionFile"
                                    > 
                                </el-upload>
                                <template v-for="(file, id) in this.fileExistLists" >
                                            <div class="flex-space-between file-item" :key="id">
                                                <div>
                                                    <i class="el-icon-document"></i>
                                                        <a class="icon" :href="getDownload2(file)" @click="download2(file);" >{{file}}</a>
                                                </div>
                                            </div>
                                        </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="反饋人賬號：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.userCode}}
                                </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="反饋人姓名：" prop="coProgress" label-width="130px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.userName}}
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="反饋人分機：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.userExt}}
                                </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="反饋人郵箱：" prop="coProgress" label-width="130px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.userEmailAddress}}
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="反饋人部門：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.userDepartment}}
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="borderh1">
                    <h1 align="center" class="title-style">處理結果反饋</h1>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="處理人賬號：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.handleCode}}
                                </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="處理人姓名：" prop="coProgress" label-width="130px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.handleName}}
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">     
                            <el-form-item label="問題類別：" label-width="300px" >
                                <span class="sys-name" readonly>
                                {{UploadModel.questionType}}
                            </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12"> 
                            <el-form-item label="問題狀態：" label-width="130px" >
                            <span class="sys-name" readonly>
                                {{UploadModel.applyStatusId}}
                            </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否接單：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.isHandle}}
                                </span>
                            </el-form-item>
                        </el-col>    
                        <el-col :span="12">
                            <el-form-item label="計劃修改時間："  label-width="130px" >
                                <!-- <span class="sys-name" readonly>
                                    {{UploadModel.handleTime}}
                                </span> -->
                                <el-date-picker
                                    readonly
                                    type="date"
                                    v-model.trim="UploadModel.handleTime"
                                    style="width: 50%;padding-left: 1%;"
                                    :editable="true"
                                    :picker-options="birthOptions"
                                    @change="getSTime">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row><el-col :span="12">
                            <el-form-item label="附件：" label-width="300px" readonly>
                                <template v-for="(file, id) in this.qhfileLst" >
                                    <div class="flex-space-between file-item" :key="id">
                                        <div>
                                            <i class="el-icon-document"></i>
                                                <a class="icon" :href="getDownload(file)" @click="download(file);" >{{file}}</a>
                                            <!-- <i class="el-icon-close closeFile" @click.stop="closeFile(file);"></i> -->
                                        </div>
                                    </div>
                                </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="備注：" label-width="300px" >
                                <span class="sys-name" readonly>
                                    {{UploadModel.remark}}
                                </span>
                                <!-- <el-input 
                                    v-model.trim="UploadModel.remark" 
                                    style="padding-left: 1%;" 
                                    rows="5"
                                    type="textarea"
                                    readonly
                                >
                                </el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
   
</template>


<script>
import { FILE_URL ,FILE_URL_79} from '@/store/api'
export default {
    data(){
        return {
            questionFeedbackId:localStorage.getItem('QUESTIONFEEDBACKID'),
            UploadModel: {             
                questionName: '',
                questionDescribe: '',
                userCode: '',
                userName: '',
                userExt: '',
                userEmailAddress: '',
                userDepartment: '',
                handleCode:'',    
                handleName:'',       
                remark:'',
                isHandle:'',  
                questionType:'',
                handleTime:'',
                questionFeedbackId:'',
                deadlineDate:'',          
                isComplete:'',
                projId:'',
                questionHandleId:'',
                applyStatusId:'',
            },
            quesList: [                //選擇反饋問題類型
                {label: '咨詢', value: 1 },
                {label: '需求', value: 2 },
                {label: 'BUG', value: 3 }
            ],
            handleList: [                //選擇處理狀態類型
                {label: '接單', value: 1 },
                {label: '駁回', value: 2 }
            ],
            applystatusList: [                //選擇問題狀態
                {label: '待接單', value: 1 },
                {label: '待作業', value: 2 },
                {label: '作業完成', value: 3 },
                {label: '申請單關閉', value: 4 },
                {label: '被駁回', value: 5 }
            ],
            rules: {
                handleCode: [{ required: true, message: '請输入處理人工號' }],
                handleName: [{ required: true, message: '請输入處理人名稱' }],
                isHandle: [{ required: true, message: '請選擇是否接單'}],
                questionType: [{ required: true, message: '請選擇問題類型'}],
                applyStatusId:[{ required: true, message: '請選擇問題當前狀態'}],
            },
            // 上传文件列表
            fileList: [],
            // 上传地址
            uploadApi: '',
            // 其他数据
            otherData: null,
            isDisable: false, 
            fileExistLists:[],
            qhfileLst:[],

        }
    },
    components: {
    
    },
    mounted () {
        this.open()
        // this.filedetail()
    },
    
    methods: {
    //查询申請詳情頁面信息詳情
    open(){
        this.$store.dispatch('particulars', {applyNum:'20191021001'})
        // this.$store.dispatch('particulars', {applyNum:this.applyNum})
        .then(res => {
            if(res.data.code == 0){
                let dataContet = res.data.data
                this.qhfileLst = res.data[0].files.qhfileLst//问题反馈附件
                this.UploadModel = {
                    //问题详情
                    questionName: dataContet ? dataContet.questionName:'',
                    questionDescribe: dataContet ? dataContet.questionDescribe:'',
                    userCode: dataContet ?dataContet.userCode:'',
                    userName: dataContet ?dataContet.userName:'',
                    userExt: dataContet ?dataContet.userExt:'',
                    userEmailAddress: dataContet ?dataContet.userEmailAddress:'',
                    userDepartment: dataContet ?dataContet.userDepartment:'',

                    applyStatusId: dataContet = "" ? null :dataContet.applyStatusId == 1 ? '待接單'
                    :dataContet.applyStatusId == 2 ? '待作業' :dataContet.applyStatusId == 3 ? '作業完成'
                    :dataContet.applyStatusId == 4 ? '申請單關閉' :dataContet.applyStatusId == 5 ? '被駁回':'',

                } 
            }
        })
    },

    filedetail(){
            this.$store.dispatch('filedetail', {questionFeedbackId:this.questionFeedbackId})
            .then(res => {
                if(res.code == 0){
                    this.fileLists = res.dataSecond
                    this.fileAll = res.dataSecond//做文件是否有刪除對比用
                    if(this.fileLists.length <= 0){
                        this.fileListshow = true
                    }else if(this.fileLists.length < 15){
                        this.fileListshow = false
                    }
                    
                }
            })
    },
    //處理結果反饋附件下载
    getDownload (file) {
        // return `http://10.177.118.28:8080/tsbg/upload/testdownload1?fileName=`+file+`&questionHandleId=`+this.UploadModel.questionHandleId
        return `${FILE_URL_79}/tsbg/upload/testdownload1?fileName=`+file+`&questionHandleId=`+this.UploadModel.questionHandleId
    },
    download (file) {
        const form = document.createElement('form')
        const formConfig = {
            action: this.getDownload(file),
            method: 'get',
        }
        Object.entries(formConfig).map(
            ([key, val]) => form.setAttribute(key, val)
            )
        form.submit()
    },
    //问题反馈處理附件下载
    getDownload2 (file) {
        // return `http://10.139.199.167:8080/tsbg/upload/testdownload2?fileName=`+file+`&questionFeedbackId=`+this.UploadModel.questionFeedbackId
        return `${FILE_URL_79}/tsbg/upload/testdownload2?fileName=`+file+`&questionFeedbackId=`+this.UploadModel.questionFeedbackId
    },
    download2 (file) {
        const form = document.createElement('form')
        const formConfig = {
            action: this.getDownload2(file),
            method: 'get',
        }
        Object.entries(formConfig).map(
            ([key, val]) => form.setAttribute(key, val)
            )
        form.submit()
    },
    closeFile(file) {
        this.newfileList = []
        for(let i = 0;i<this.qhfileLst.length;i++){
            if(this.qhfileLst[i] == file){
                // console.log(this.qhfileLst[i])
            }else{
                this.newfileList.push(this.qhfileLst[i])
            }
        }
        this.qhfileLst = this.newfileList
        //處理結果反饋文件删除
        this.$store.dispatch('deleteFile',{fileName:file,questionHandleId:this.UploadModel.questionHandleId}).then((rep) => {

        })

    },
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
    questionHandle(UploadModel) {
       this.isDisable = true
       
        // 附件和參數
        this.postparams = new FormData()
        this.postparams.append('questionHandle',JSON.stringify(this.UploadModel));

        // this.$refs[UploadModel].validate(valid => {
        //     if (valid) {
                this.$refs.upload.submit()
                this.$store.dispatch('questionHandle',this.postparams).then((rep) => {
                    if(rep.data.code == 0){
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
                        // alert(rep.data.message)
                        this.$alert(rep.data.message, '提示', {
                            confirmButtonText: '确定',
                            showClose: false
                            }).then(() => {
                        })
                        this.isDisable = false
                        return false;
                    }
                });
                
        //     } else {
        //         console.log("error submit!!");
        //         alert("有必填信息未填写，请检查！")
        //         this.isDisable = false
        //         return false;
        //     }
        // })
    
    
    },
    

    // <!--返回-->
    gotoLogin() {
        this.$router.go(-1);
    },
    }
}
</script>

<style scoped>

    .borderh1{
        border:1px #ddd solid;
        width:80%;
        margin: 0 0 20px 10%;
    }
    .title-style{
        height:32px;
        width:100%;
        margin-bottom:20px;
        display:inline-block;
        background: #DDD;
    }
    .register-l{
        float: left;
        width: 95%;
        margin: 30px;
    }  
    .el-input{
        width: 50%;
        /* height: 50%; */
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