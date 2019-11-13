<template>
    <div>您访问的頁面不存在
        <br>
        <!-- <router-link to="/">返回首頁</router-link> -->
        <!-- <br> -->
        <a @click="See()">返回登錄頁</a>
    </div>
</template>
<script>
export default {
    methods: {
        See () {
            window.location.replace(`http://`+window.location.host)   
        }
        
    }
}
</script>

