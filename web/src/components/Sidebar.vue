<template>
    <div id="sidebar">
        <div class="left-bar">
            <div class="avatar">
                <img src="../static/img/avatar.jpg" />
            </div>
            <div class="routers">
                <router-link to="/home" tag="div" class="bar-item" title="首页"
                    ><i class="iconfont icon-cangku"></i
                ></router-link>

                <router-link
                    to="/archive"
                    tag="div"
                    class="bar-item"
                    title="归档"
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
                    to="/update"
                    tag="div"
                    class="bar-item small-screen"
                    title="开发日志"
                    ><i class="iconfont icon-custom-update"></i
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
        <div class="right-bar">
            <button class="bar-item" @click="back" title="返回">
                <i class="iconfont icon-chexiaofanhuichehuishangyibu"></i>
            </button>

            <button class="bar-item" @click="top" title="回到顶部">
                <i class="iconfont icon-zhiding"></i>
            </button>

            <router-link
                to="/update"
                tag="div"
                class="bar-item"
                title="开发日志"
                ><i class="iconfont icon-custom-update"></i
            ></router-link>
        </div>
        <div class="beian">
            <a href="http://beian.miitbeian.gov.cn" target="_blank"
                >粤ICP备19111987</a
            >
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1);
        },
        top() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        },
        toUpdate() {
            this.$router.push("/update");
        }
    }
};
</script>

<style lang="scss" scoped>
/* 整个组件的 */
.router-link-active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
}

.iconfont {
    font-size: 1.6rem;
    color: rgb(96, 126, 121);
}

.bar-item,
.bar-item:link,
.bar-item:visited {
    margin: 1rem auto;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
}

.bar-item:hover,
.bar-item:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 50%;
    transition: all 0.5s;
}

/* 左边的bar */
.left-bar {
    width: 15%;
    min-width: 10%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0.6rem 0 0.6rem -0.6rem #aaa;
    background-color: #ddd;
}

.avatar img {
    display: block;
    margin: 2rem auto;
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
}

.left-bar .bar-item:last-child {
    margin-top: 4rem;
}

.small-screen {
    display: none;
}

/* 右边的bar */
.right-bar {
    width: 5%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #ddd;
    box-shadow: -0.6rem 0 0.6rem -0.6rem #aaa;
}

.right-bar .bar-item:first-child {
    margin-top: 600%;
}

.right-bar .bar-item:nth-child(n + 2) {
    margin-top: 80%;
}

.beian {
    text-align: center;
    font-size: .6rem;
    position: fixed;
    bottom: 0;
    left: 3%;
    height: 2%;
}
</style>
