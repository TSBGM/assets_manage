<template>
    <div id="app" @click = "moveEvent">
        <!-- <home-form  @mousemove = "moveEvent" @click = "moveEvent"></home-form> -->
        <router-view></router-view>
    </div>
</template>

<script>
import { debug } from 'util';
export default {
    name: 'app',
    components: {
        
    },
    data(){
        return {
            currentTime: null, // 当前时间
            lastTime: null, //最后一次点击的时间
            timeOut: 2 * 60 * 60 * 1000   //超时时间1小時
        }
    },
    mounted () {
    },

    methods: {
        moveEvent() {

            this.currentTime = new Date().getTime(); //记录这次点击的时间
            // console.log(this.currentTime - this.lastTime)
            // console.log(this.timeOut)
            if(this.currentTime - this.lastTime > this.timeOut) {  //判断上次最后一次点击的时间和这次点击的时间间隔是否大于2小時
               //跳往登录页面
                this.$router.push({
                    path: "/",
                });
                localStorage.clear();
            } else {
                this.lastTime = new Date().getTime(); //如果在2小時内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
            }

        }
    },
    created(){
        this.lastTime = new Date().getTime();   //网页第一次打开时，记录当前时间
    }

}

</script>

<style>
#app {
    font-family: HelveticaNeue Regular, PingFangSC-Regular, Helvetica, Arial, sans-serif;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
