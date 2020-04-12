<template>
    <div id="app">
        <el-container
            style="min-height: 100vh; max-width: 100%;"
            v-if="$route.meta.isAdmin"
        >
            <el-aside>
                <Sidebar></Sidebar>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <div v-if="!$route.meta.isAdmin" class="common">
            <Header></Header>
            <el-container class="container">
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
const Sidebar = () => import('./components/Sidebar');
const Header = () => import('./components/CommonHeader');
const Footer = () => import('./components/CommonFooter');
export default {
    components: {
        Sidebar,
        Header,
        Footer
    }
};
</script>

<style lang="scss" scoped>
.container {
    height: calc(100vh - 130px);
}
</style>
