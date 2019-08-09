<template>
    <div id="sidebar">
        <div class="avatar">
            <img src="../static/img/avatar.jpg" />
        </div>
        <div class="routers">
            <router-link to="/home" tag="div" class="bar-item" title="首页"
                ><i class="iconfont icon-RectangleCopy7"></i
            ></router-link>

            <router-link to="/archive" tag="div" class="bar-item" title="归档"
                ><i class="iconfont icon-RectangleCopy13"></i
            ></router-link>

            <router-link to="/classify" tag="div" class="bar-item" title="分类"
                ><i class="iconfont icon-RectangleCopy11"></i
            ></router-link>

            <router-link to="/about" tag="div" class="bar-item" title="关于"
                ><i class="iconfont icon-RectangleCopy3"></i
            ></router-link>

            <router-link to="/login" tag="div" class="bar-item" title="登陆" v-if="!this.$store.state.token"
                ><i class="iconfont icon-RectangleCopy2"></i
            ></router-link>

            <router-link to="/admin" tag="div" class="bar-item" title="管理" v-else
                ><i class="iconfont icon-RectangleCopy5"></i
            ></router-link>
        </div>
    </div>
</template>

<script>
import store from '../vuex/store';
export default {
    data() {
        return {
            
        }
    },
    store,
};
</script>

<style lang="scss" scoped>
.router-link-active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
}

.avatar img {
    display: block;
    margin: 2em auto;
    height: 10rem;
    width: 10rem;
    border-radius: 5rem;
    text-align: center;
    align-items: center;
}

.iconfont {
    font-size: 2.5rem;
}

.bar-item {
    margin: 2rem auto;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: white; //冲突router-link-active
}

.bar-item:hover,
.bar-item:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
    transition: all 0.5s;
}

.bar-item:last-child {
    margin-top: 5rem;
}
</style>
