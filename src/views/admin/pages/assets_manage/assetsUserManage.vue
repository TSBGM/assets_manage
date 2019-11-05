<template>
    <div>
        <div>
            <el-form>
                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-input 
                                class="input"
                                placeholder="可輸入工號、姓名查看擁有的權限"
                                clearable="true"
                                >
                                    <el-button class="button" slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .input{
        width: 20%;
        margin-top: 5px;
        margin-left: 39%;
        text-align: center;
    }
</style>