<template>
    <el-container style="min-height: 100vh; max-width: 100%;">
        <el-aside width="auto">
            <Sidebar></Sidebar>
        </el-aside>
        <el-main style="width: stretch; padding: 0;">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
const Sidebar = () => import('./components/Sidebar');
export default {
    components: {
        Sidebar
    },
    created() {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            let name = localStorage.getItem('name');
            this.$store.state.token = token;
            this.$store.state.name = name;
        }
    }
};
</script>
