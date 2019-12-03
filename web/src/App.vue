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
import { mapActions } from 'vuex';
export default {
    components: {
        Sidebar
    },
    methods: {
        ...mapActions({
            getArticles: 'COMMON_GET_ARTICLES'
        })
    },
    created() {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            this.$store.state.token = token;
        }
        if (!this.$store.state.articleList.length) {
            this.getArticles();
        }
    }
};
</script>

<style lang="scss" scoped>
// .router-views {
//     margin-left: 10%;
//     height: 100vh;
//     overflow-x: hidden;
// }
</style>
