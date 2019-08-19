<template>
    <div id="sidebar">
        <div class="avatar">
            <img src="../static/img/avatar.jpg" />
        </div>
        <div class="routers">
            <router-link to="/home" tag="div" class="bar-item" title="首页"
                ><i class="iconfont icon-cangku"></i
            ></router-link>

            <router-link to="/archive" tag="div" class="bar-item" title="归档"
                ><i class="iconfont icon-liebiao1"></i
            ></router-link>

            <router-link to="/type" tag="div" class="bar-item" title="分类"
                ><i class="iconfont icon-yingyongAPP"></i
            ></router-link>

            <router-link to="/tag" tag="div" class="bar-item" title="标签"
                ><i class="iconfont icon-biaoqian"></i
            ></router-link>

            <router-link to="/about" tag="div" class="bar-item" title="关于"
                ><i class="iconfont icon-guanyu"></i
            ></router-link>

            <router-link
                to="/login"
                tag="div"
                class="bar-item"
                title="登陆"
                v-if="!this.$store.state.token"
                ><i class="iconfont icon-login"></i
            ></router-link>

            <router-link
                to="/admin"
                tag="div"
                class="bar-item"
                title="管理"
                v-else
                ><i class="iconfont icon-gerentouxiang"></i
            ></router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.router-link-active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
}

.avatar img {
    display: block;
    margin: 2rem auto;
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
}

.iconfont {
    font-size: 1.6rem;
}

.bar-item {
    margin: 1rem auto;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bar-item:hover,
.bar-item:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
    transition: all 0.5s;
}

.bar-item:last-child {
    margin-top: 4rem;
}
</style>
