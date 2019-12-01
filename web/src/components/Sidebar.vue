<template>
    <!-- <div class="routers">
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
            <Timer></Timer>
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
                >粤ICP备19111987号-1</a
            >
        </footer> -->
    <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical clearfix"
        :collapse="isCollapse"
        active-text-color="#74b9ff"
    >
        <li class="menu-btn">
            <el-button
                @click="isCollapse = !isCollapse"
                circle
                :title="isCollapse ? '展开' : '收起'"
                ><i class="el-icon-arrow-left" v-show="!isCollapse"></i
                ><i class="el-icon-arrow-right" v-show="isCollapse"></i
            ></el-button>
        </li>
        <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首 页</span>
        </el-menu-item>
        <el-menu-item index="/archive">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">归 档</span>
        </el-menu-item>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">分 类</span>
            </template>
            <el-menu-item-group>
                <span slot="title">文章类型</span>
                <el-menu-item index="/type"
                    ><i class="el-icon-s-grid"></i>
                    <span slot="title">类型</span></el-menu-item
                >
            </el-menu-item-group>
            <el-menu-item-group title="文章标签">
                <el-menu-item index="/tag"
                    ><i class="el-icon-price-tag"></i>标签</el-menu-item
                >
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
        </el-submenu>

        <!-- <el-menu-item index="/update">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">开发日志</span>
        </el-menu-item>
        <el-menu-item index="/about">
            <i class="el-icon-info"></i>
            <span slot="title">关 于</span>
        </el-menu-item> -->
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-more-outline"></i>
                <span slot="title">其 它</span>
            </template>
            <el-menu-item-group title="博客相关">
                <el-menu-item index="/about"
                    ><i class="el-icon-info"></i>关于</el-menu-item
                >
            </el-menu-item-group>
            <el-menu-item-group>
                <span slot="title">开发相关</span>
                <el-menu-item index="/update"
                    ><i class="el-icon-chat-line-square"></i>
                    <span slot="title">日 志</span></el-menu-item
                >
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/login" v-if="!this.$store.state.token">
            <i class="el-icon-user"></i>
            <span slot="title">登 陆</span>
        </el-menu-item>
        <el-menu-item index="/admin" v-else>
            <i class="el-icon-s-tools"></i>
            <span slot="title">管 理</span>
        </el-menu-item>
        <footer class="beian" v-show="!isCollapse">
            <a href="http://beian.miitbeian.gov.cn" target="_blank"
                >粤ICP备19111987号-1</a
            >
        </footer>
    </el-menu>
</template>
<script>
// const Timer = () => import("../components/Time");
export default {
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        // back() {
        //     this.$router.go(-1);
        // },
        // top() {
        //     document.documentElement.scrollTop = 0;
        //     document.body.scrollTop = 0;
        // },
        // toUpdate() {
        //     this.$router.push("/update");
        // }
    }
    // components: {
    //     Timer
    // }
};
</script>
<style lang="scss" scoped>
// #sidebar {
//     width: 15%;
//     position: fixed;
//     left: 0;
//     top: 0;
//     bottom: 0;
//     box-shadow: 0.6rem 0 0.6rem -0.6rem #aaa;
//     background-color: #ddd;
// }
// .router-link-active {
//     background-color: rgba(96, 126, 121, 0.4);
//     box-shadow: 0 0 1rem #aaa;
//     border-radius: 9999rem;
// }
// .iconfont {
//     font-size: 1.6rem;
//     color: rgb(96, 126, 121);
// }
// .routers {
//     display: flex;
//     flex-direction: column;
// }
// .bar-item {
//     margin: 1rem auto;
//     width: 6rem;
//     height: 2rem;
//     cursor: pointer;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border: none;
//     outline: none;
// }
// .routers > .bar-item:first-child {
//     margin-top: 50%;
// }
// .bar-item:hover,
// .bar-item:active {
//     background-color: rgba(96, 126, 121, 0.4);
//     box-shadow: 0 0 1rem #aaa;
//     border-radius: 9999rem;
//     transition: all 0.8s;
// }
// .other-btn {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-top: 60%;
//     flex-wrap: wrap;
// }
// .other-btn > .bar-item {
//     width: 3.5rem;
//     height: 3.5rem;
// }
.beian {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 0.6rem;
}
.el-menu-vertical {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 10%;
    min-height: 400px;
}

/deep/ .menu-btn {
    margin: 20px auto;
    text-align: center;
}
/deep/ .el-submenu .el-menu-item {
    min-width: 0;
}
</style>
