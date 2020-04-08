<template>
    <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical clearfix"
        :collapse="true"
        active-text-color="#00d090"
    >
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
        <!-- <footer class="beian" v-show="!isCollapse">
            <el-link
                href="http://beian.miitbeian.gov.cn"
                target="_blank"
                class="link"
                >粤ICP备19111987号-1</el-link
            >
        </footer> -->
    </el-menu>
</template>

<style lang="scss" scoped>
.beian {
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-menu-vertical {
    height: 100%;
}

.el-menu-vertical:not(.el-menu--collapse) {
    min-width: 150px;
}

/deep/ .el-submenu .el-menu-item {
    min-width: 0;
}
</style>
