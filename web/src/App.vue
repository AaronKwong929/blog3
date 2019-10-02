<template>
    <div id="app">
        <Sidebar></Sidebar>
        <div class="router-views">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
const Sidebar = () => import('./components/Sidebar');
export default {
    components: {
        Sidebar
    },
    created() {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            this.$store.state.token = token;
        }
    }
};
</script>

<style lang="scss" scoped>
.router-views {
    margin-left: 15%;
}
</style>
