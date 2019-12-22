<template>
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
        <el-menu-item index="/classification"
            ><i class="el-icon-menu"></i
            ><span slot="title">分 类</span></el-menu-item
        >
        <el-menu-item index="/update"
            ><i class="el-icon-chat-line-square"></i
            ><span slot="title">日 志</span></el-menu-item
        >
        <el-menu-item index="/about"
            ><i class="el-icon-info"></i
            ><span slot="title">关 于</span></el-menu-item
        >
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
export default {
    data() {
        return {
            isCollapse: false
        };
    }
};
</script>
<style lang="scss" scoped>
.beian {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 0.6rem;
}

.el-menu-vertical {
    height: 100%;
}

.el-menu-vertical:not(.el-menu--collapse) {
    min-width: 150px;
}

/deep/ .menu-btn {
    margin: 20px auto;
    text-align: center;
}
/deep/ .el-submenu .el-menu-item {
    min-width: 0;
}
</style>
