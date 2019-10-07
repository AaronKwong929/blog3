<template>
    <nav id="sidebar">
        <!-- <div class="avatar">
            <img src="@/static/img/avatar.jpg" />
        </div> -->
        <div class="routers">
            <router-link to="/home" tag="div" class="bar-item" title="首页"
                ><i class="iconfont icon-cangku"></i> 首 页
            </router-link>

            <router-link to="/archive" tag="div" class="bar-item" title="归档"
                ><i class="iconfont icon-liebiao1"></i> 归 档
            </router-link>

            <router-link to="/type" tag="div" class="bar-item" title="分类"
                ><i class="iconfont icon-yingyongAPP"></i> 分 类
            </router-link>

            <router-link to="/tag" tag="div" class="bar-item" title="标签"
                ><i class="iconfont icon-biaoqian"></i> 标 签
            </router-link>

            <div class="other-btn">
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

                <router-link
                    to="/update"
                    tag="div"
                    class="bar-item"
                    title="开发日志"
                    ><i class="iconfont icon-custom-update"></i
                ></router-link>

                <router-link to="/about" tag="div" class="bar-item" title="关于"
                    ><i class="iconfont icon-guanyu"></i
                ></router-link>

                <button class="bar-item" @click="top" title="回到顶部">
                    <i class="iconfont icon-zhiding"></i>
                </button>

                <button class="bar-item" @click="back" title="返回">
                    <i class="iconfont icon-chexiaofanhuichehuishangyibu"></i>
                </button>
            </div>
        </div>
        <footer class="beian">
            <a href="http://beian.miitbeian.gov.cn" target="_blank"
                >粤ICP备19111987</a
            >
        </footer>
    </nav>
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
#sidebar {
    width: 15%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0.6rem 0 0.6rem -0.6rem #aaa;
    background-color: #ddd;
}

.router-link-active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 9999rem;
}

.iconfont {
    font-size: 1.6rem;
    color: rgb(96, 126, 121);
}

.routers {
    display: flex;
    flex-direction: column;
}

.bar-item {
    margin: 1rem auto;
    width: 6rem;
    height: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
}

.routers > .bar-item:first-child {
    margin-top: 50%;
}

.bar-item:hover,
.bar-item:active {
    background-color: rgba(96, 126, 121, 0.4);
    box-shadow: 0 0 1rem #aaa;
    border-radius: 9999rem;
    transition: all 0.8s;
}

// .avatar {
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// .avatar img {
//     max-height: 10rem;
//     max-width: 10rem;
//     height: auto;
//     width: auto;
//     border-radius: 50%;
// }

.other-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60%;
    flex-wrap: wrap;
}

.other-btn > .bar-item {
    width: 3.5rem;
    height: 3.5rem;
}

.beian {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 0.6rem;
}
</style>
